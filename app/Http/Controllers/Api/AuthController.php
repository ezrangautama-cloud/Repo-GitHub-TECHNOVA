<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\AksesProduk;
use App\Models\PesanLead;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    /**
     * Register a new Customer account and issue a Sanctum token.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => (string) $request->validated('name'),
            'email' => (string) $request->validated('email'),
            'password' => Hash::make((string) $request->validated('password')),
            'role' => 'Customer',
            'no_whatsapp' => $request->validated('no_whatsapp'),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi berhasil.',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'no_whatsapp' => $user->no_whatsapp,
                ],
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ], 201);
    }

    /**
     * Authenticate user (by email or name/username) and issue a Sanctum token.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $identifier = $request->getLoginIdentifier();
        $password = (string) $request->validated('password');
        $loginAs = $request->validated('login_as');

        $user = User::where('email', $identifier)
            ->orWhere('name', $identifier)
            ->first();

        if ($user === null || ! Hash::check($password, $user->password)) {
            return response()->json([
                'message' => 'Email/username atau password salah.',
            ], 401);
        }

        if ($loginAs === 'admin' && ! $user->isAdmin()) {
            return response()->json([
                'message' => 'Akun ini tidak memiliki akses Administrator.',
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'no_whatsapp' => $user->no_whatsapp,
                ],
                'role' => $user->role,
                'is_admin' => $user->isAdmin(),
                'token' => $token,
                'token_type' => 'Bearer',
            ],
        ]);
    }

    /**
     * Generate a password reset token for a registered email and return neutral confirmation.
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email', 'max:150'],
        ], [
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format alamat email tidak valid.',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($user !== null) {
            Password::createToken($user);
        }

        return response()->json([
            'message' => 'Tautan pemulihan dikirim jika email terdaftar.',
        ]);
    }

    /**
     * Verify password reset token and update user password.
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $passwordRules = ['required', 'string', 'min:8'];
        if ($request->has('password_confirmation')) {
            $passwordRules[] = 'confirmed';
        }

        $validated = $request->validate([
            'email' => ['required', 'string', 'email', 'max:150'],
            'token' => ['required', 'string'],
            'password' => $passwordRules,
        ], [
            'email.required' => 'Alamat email wajib diisi.',
            'token.required' => 'Token reset password wajib diisi.',
            'password.required' => 'Password baru wajib diisi.',
            'password.min' => 'Password baru minimal 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if ($user === null || ! Password::tokenExists($user, $validated['token'])) {
            return response()->json([
                'message' => 'Token pemulihan kata sandi tidak valid atau sudah kedaluwarsa.',
            ], 422);
        }

        $user->forceFill([
            'password' => Hash::make($validated['password']),
            'remember_token' => Str::random(60),
        ])->save();

        Password::deleteToken($user);
        $user->tokens()->delete();

        return response()->json([
            'message' => 'Kata sandi berhasil diperbarui. Silakan login kembali.',
        ]);
    }

    /**
     * Revoke the current access token and log the user out.
     */
    public function logout(Request $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user !== null) {
            $token = $user->currentAccessToken();

            if ($token instanceof PersonalAccessToken) {
                $token->delete();
            }
        }

        return response()->json([
            'message' => 'Logout berhasil.',
        ]);
    }

    /**
     * Get the authenticated user's profile and summary counts.
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $unlockedCount = $user->aksesProduks()
            ->where('status_akses', 'Unlocked')
            ->count();

        $transactionsCount = $user->transaksis()->count();

        return response()->json([
            'message' => 'Profil pengguna berhasil diambil.',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'is_admin' => $user->isAdmin(),
                'no_whatsapp' => $user->no_whatsapp,
                'unlocked_products_count' => $unlockedCount,
                'transactions_count' => $transactionsCount,
            ],
        ]);
    }

    /**
     * Get unified dashboard data for the Participant Portal ("Dasbor").
     */
    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $unlockedAccesses = AksesProduk::with(['produk.kategori'])
            ->where('id_user', $user->id)
            ->where('status_akses', 'Unlocked')
            ->get();

        $activeCoursesCount = $unlockedAccesses->filter(
            fn (AksesProduk $a): bool => $a->produk?->kategori?->nama_kategori === 'Courses'
        )->count();

        $digitalProductsCount = $unlockedAccesses->filter(
            fn (AksesProduk $a): bool => $a->produk?->kategori?->nama_kategori === 'Digital Products'
        )->count();

        $projectsCount = $unlockedAccesses->filter(
            fn (AksesProduk $a): bool => $a->produk?->kategori?->nama_kategori === 'Projects'
        )->count();

        $recentTransactions = Transaksi::with(['detailTransaksis.produk:id,nama_produk,harga'])
            ->where('id_user', $user->id)
            ->latest('tanggal_transaksi')
            ->take(5)
            ->get();

        $serviceRequestsQuery = PesanLead::where(function ($query) use ($user): void {
            $query->where('id_user', $user->id);

            if (! empty($user->email)) {
                $query->orWhere('email', $user->email);
            }
        });

        $serviceRequestsCount = (clone $serviceRequestsQuery)->count();
        $recentServiceRequests = $serviceRequestsQuery->latest()->take(5)->get();

        $activities = collect();

        foreach ($recentTransactions as $trx) {
            $firstItemName = $trx->detailTransaksis->first()?->produk?->nama_produk ?? 'Pembelian Konten';
            $activities->push([
                'type' => 'transaction',
                'code' => $trx->order_id,
                'title' => $firstItemName,
                'date' => ($trx->tanggal_transaksi ?? $trx->created_at)?->toIso8601String(),
                'amount' => (float) $trx->total_harga,
                'status' => $trx->status_pembayaran,
                'status_label' => match (true) {
                    $trx->isSuccess() => 'Dibayar',
                    $trx->isFailed() => 'Gagal',
                    default => 'Tertunda',
                },
            ]);
        }

        foreach ($recentServiceRequests as $req) {
            $activities->push([
                'type' => 'service_request',
                'code' => $req->kode_permintaan ?? ('REQ-'.$req->id),
                'title' => $req->data_tambahan['service_name'] ?? $req->data_tambahan['jenis_pertanyaan'] ?? 'Permintaan Layanan',
                'date' => ($req->tanggal_pesan ?? $req->created_at)?->toIso8601String(),
                'amount' => null,
                'status' => $req->status_lead,
                'status_label' => match ($req->status_lead) {
                    'New' => 'Menunggu balasan',
                    'Follow Up' => 'Dalam tinjauan',
                    'Closed' => 'Selesai',
                    default => $req->status_lead,
                },
            ]);
        }

        $recentActivities = $activities
            ->sortByDesc('date')
            ->values()
            ->take(10)
            ->all();

        return response()->json([
            'message' => 'Dashboard peserta berhasil diambil.',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'summary' => [
                    'active_courses_count' => $activeCoursesCount,
                    'digital_products_count' => $digitalProductsCount,
                    'projects_count' => $projectsCount,
                    'service_requests_count' => $serviceRequestsCount,
                    'transactions_count' => $user->transaksis()->count(),
                ],
                'recent_transactions' => $recentTransactions,
                'recent_service_requests' => $recentServiceRequests,
                'recent_activities' => $recentActivities,
            ],
        ]);
    }

    /**
     * Get unlocked courses, digital products, and projects owned by the authenticated user ("Konten Saya").
     */
    public function myContents(Request $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $search = trim((string) $request->input('q', ''));
        $typeFilter = trim((string) $request->input('type', ''));

        $unlockedQuery = AksesProduk::with(['produk.kategori'])
            ->with(['produk' => fn ($q) => $q->withCount('materis')])
            ->where('id_user', $user->id)
            ->where('status_akses', 'Unlocked');

        if ($search !== '') {
            $unlockedQuery->whereHas('produk', function ($q) use ($search): void {
                $q->where('nama_produk', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%");
            });
        }

        $unlockedAccesses = $unlockedQuery->latest()->get();

        $courses = [];
        $digitalProducts = [];
        $projects = [];
        $otherItems = [];

        foreach ($unlockedAccesses as $access) {
            $produk = $access->produk;

            if ($produk === null) {
                continue;
            }

            $categoryName = $produk->kategori?->nama_kategori;

            $downloadUrl = match ($categoryName) {
                'Digital Products' => url("/api/digital-products/{$produk->id}/download"),
                'Projects' => ! empty($produk->file_url) ? url("/api/projects/{$produk->id}/download") : null,
                default => null,
            };

            $itemData = [
                'id' => $produk->id,
                'nama_produk' => $produk->nama_produk,
                'kategori' => $categoryName,
                'level' => $produk->level,
                'format' => $produk->format,
                'deskripsi' => $produk->deskripsi,
                'thumbnail_url' => $produk->thumbnail_url,
                'materis_count' => $produk->materis_count ?? 0,
                'status_akses' => $access->status_akses,
                'unlocked_at' => $access->updated_at?->toIso8601String(),
                'download_url' => $downloadUrl,
                'video_url' => $categoryName === 'Courses' ? $produk->file_url : null,
            ];

            if ($categoryName === 'Courses') {
                $courses[] = $itemData;
            } elseif ($categoryName === 'Digital Products') {
                $digitalProducts[] = $itemData;
            } elseif ($categoryName === 'Projects') {
                $projects[] = $itemData;
            } else {
                $otherItems[] = $itemData;
            }
        }

        $summary = [
            'courses_count' => count($courses),
            'digital_products_count' => count($digitalProducts),
            'projects_count' => count($projects),
            'total_unlocked' => count($courses) + count($digitalProducts) + count($projects) + count($otherItems),
        ];

        return response()->json([
            'message' => 'Daftar konten saya berhasil diambil.',
            'data' => [
                'summary' => $summary,
                'courses' => ($typeFilter === '' || $typeFilter === 'courses') ? $courses : [],
                'digital_products' => ($typeFilter === '' || $typeFilter === 'digital_products') ? $digitalProducts : [],
                'projects' => ($typeFilter === '' || $typeFilter === 'projects') ? $projects : [],
                'other_items' => ($typeFilter === '' || $typeFilter === 'other') ? $otherItems : [],
            ],
        ]);
    }
}
