<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\AksesProduk;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    /**
     * Register akun baru customer dan memberi token Sanctum.
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
     * Authenticate user dan memberi token Sanctum.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $identifier = $request->getLoginIdentifier();
        $password = (string) $request->validated('password');

        $user = User::where('email', $identifier)
            ->orWhere('name', $identifier)
            ->first();

        if ($user === null || ! Hash::check($password, $user->password)) {
            return response()->json([
                'message' => 'Email/username atau password salah.',
            ], 401);
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
     * Menghapus token akses saat ini dan log out pengguna.
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
     * Mengambil profil pengguna yang terautentikasi dan ringkasan jumlah.
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
     * Mengambil courses dan digital products yang di unlock yang dimiliki oleh pengguna yang terautentikasi.
     */
    public function myContents(Request $request): JsonResponse
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
            ->latest()
            ->get();

        $courses = [];
        $digitalProducts = [];
        $otherItems = [];

        foreach ($unlockedAccesses as $access) {
            $produk = $access->produk;

            if ($produk === null) {
                continue;
            }

            $categoryName = $produk->kategori?->nama_kategori;

            $itemData = [
                'id' => $produk->id,
                'nama_produk' => $produk->nama_produk,
                'kategori' => $categoryName,
                'level' => $produk->level,
                'format' => $produk->format,
                'deskripsi' => $produk->deskripsi,
                'status_akses' => $access->status_akses,
                'unlocked_at' => $access->updated_at?->toIso8601String(),
                'download_url' => $categoryName === 'Digital Products'
                    ? url("/api/digital-products/{$produk->id}/download")
                    : null,
                'video_url' => $categoryName === 'Courses' ? $produk->file_url : null,
            ];

            if ($categoryName === 'Courses') {
                $courses[] = $itemData;
            } elseif ($categoryName === 'Digital Products') {
                $digitalProducts[] = $itemData;
            } else {
                $otherItems[] = $itemData;
            }
        }

        return response()->json([
            'message' => 'Daftar konten saya berhasil diambil.',
            'data' => [
                'summary' => [
                    'courses_count' => count($courses),
                    'digital_products_count' => count($digitalProducts),
                    'total_unlocked' => count($courses) + count($digitalProducts) + count($otherItems),
                ],
                'courses' => $courses,
                'digital_products' => $digitalProducts,
                'other_items' => $otherItems,
            ],
        ]);
    }
}
