<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CheckoutRequest;
use App\Models\AksesProduk;
use App\Models\DetailTransaksi;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Services\MidtransService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    /**
     * Inisialisasi controller dengan MidtransService.
     */
    public function __construct(
        private readonly MidtransService $midtransService
    ) {}

    /**
     * Endpoint checkout untuk membuat order dan token Snap Midtrans.
     */
    public function checkout(CheckoutRequest $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated. Silakan login terlebih dahulu untuk melakukan checkout.',
            ], 401);
        }

        $productIds = $request->getProductIds();
        $products = Produk::with('kategori')->whereIn('id', $productIds)->get();

        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'Produk yang dipilih tidak ditemukan.',
            ], 404);
        }

        $alreadyUnlockedIds = $user->aksesProduks()
            ->whereIn('id_produk', $products->pluck('id'))
            ->where('status_akses', 'Unlocked')
            ->pluck('id_produk')
            ->all();

        $payableProducts = $products->reject(
            fn (Produk $product): bool => in_array($product->id, $alreadyUnlockedIds, true)
        )->values();

        if ($payableProducts->isEmpty()) {
            return response()->json([
                'message' => 'Anda sudah memiliki akses penuh ke seluruh produk yang dipilih.',
            ], 422);
        }

        $totalHarga = (float) $payableProducts->sum('harga');

        if ($totalHarga <= 0) {
            DB::transaction(function () use ($user, $payableProducts): void {
                foreach ($payableProducts as $product) {
                    AksesProduk::updateOrCreate(
                        [
                            'id_user' => $user->id,
                            'id_produk' => $product->id,
                        ],
                        [
                            'status_akses' => 'Unlocked',
                        ]
                    );
                }
            });

            return response()->json([
                'message' => 'Produk gratis berhasil diaktifkan ke akun Anda.',
                'data' => [
                    'order_id' => null,
                    'is_free' => true,
                    'total_harga' => 0,
                    'status_pembayaran' => 'success',
                    'items' => $payableProducts->map(fn (Produk $p): array => [
                        'id_produk' => $p->id,
                        'nama_produk' => $p->nama_produk,
                        'kategori' => $p->kategori?->nama_kategori,
                        'harga' => 0,
                    ]),
                ],
            ]);
        }

        $orderId = 'TRX-'.now()->format('YmdHis').'-'.strtoupper(Str::random(5));
        $preferredMethod = $request->validated('metode_pembayaran');
        $expiredAt = now()->addHour();

        $transaksi = DB::transaction(function () use ($user, $payableProducts, $totalHarga, $orderId, $preferredMethod, $expiredAt): Transaksi {
            $trx = Transaksi::create([
                'order_id' => $orderId,
                'id_user' => $user->id,
                'total_harga' => $totalHarga,
                'status_pembayaran' => 'pending',
                'metode_pembayaran' => $preferredMethod,
                'tanggal_transaksi' => now(),
                'expired_at' => $expiredAt,
            ]);

            foreach ($payableProducts as $product) {
                DetailTransaksi::create([
                    'id_transaksi' => $trx->id,
                    'id_produk' => $product->id,
                    'harga_satuan' => (float) $product->harga,
                ]);
            }

            return $trx;
        });

        try {
            $snapResult = $this->midtransService->createSnapTransaction($transaksi, $preferredMethod);
        } catch (Exception $e) {
            Log::error('Checkout Midtrans error', [
                'order_id' => $transaksi->order_id,
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Gagal memproses gateway pembayaran Midtrans: '.$e->getMessage(),
                'order_id' => $transaksi->order_id,
            ], 502);
        }

        return response()->json([
            'message' => 'Checkout berhasil. Silakan selesaikan pembayaran.',
            'data' => [
                'order_id' => $transaksi->order_id,
                'total_harga' => (float) $transaksi->total_harga,
                'status_pembayaran' => $transaksi->status_pembayaran,
                'metode_pembayaran' => $transaksi->metode_pembayaran,
                'expired_at' => $transaksi->expired_at?->toIso8601String(),
                'snap_token' => $snapResult['token'],
                'snap_redirect_url' => $snapResult['redirect_url'],
                'client_key' => config('midtrans.client_key'),
                'snap_js_url' => config('midtrans.snap_js_url'),
                'items' => $payableProducts->map(fn (Produk $p): array => [
                    'id_produk' => $p->id,
                    'nama_produk' => $p->nama_produk,
                    'kategori' => $p->kategori?->nama_kategori,
                    'level' => $p->level,
                    'format' => $p->format,
                    'harga' => (float) $p->harga,
                ]),
            ],
        ], 201);
    }

    /**
     * Klaim dan aktifkan produk/kursus/proyek gratis (harga <= 0) langsung tanpa gateway pembayaran.
     */
    public function claimFree(Request $request, int|string $id): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated. Silakan login terlebih dahulu untuk mengakses konten gratis.',
            ], 401);
        }

        $product = Produk::with('kategori')->find($id);

        if ($product === null) {
            return response()->json([
                'message' => 'Konten tidak ditemukan.',
            ], 404);
        }

        if ((float) $product->harga > 0) {
            return response()->json([
                'message' => 'Produk ini berbayar. Silakan lanjutkan melalui proses checkout.',
            ], 422);
        }

        $akses = AksesProduk::updateOrCreate(
            [
                'id_user' => $user->id,
                'id_produk' => $product->id,
            ],
            [
                'status_akses' => 'Unlocked',
            ]
        );

        $categoryName = $product->kategori?->nama_kategori;

        return response()->json([
            'message' => 'Konten gratis berhasil diaktifkan ke akun Anda.',
            'data' => [
                'id_produk' => $product->id,
                'nama_produk' => $product->nama_produk,
                'kategori' => $categoryName,
                'status_akses' => $akses->status_akses,
                'is_unlocked' => true,
                'download_url' => $this->resolveDownloadUrl($product->id, $categoryName),
                'video_url' => $categoryName === 'Courses' ? $product->file_url : null,
            ],
        ]);
    }

    /**
     * Webhook notification callback endpoint dari Midtrans.
     */
    public function notification(Request $request): JsonResponse
    {
        if ($request->isMethod('get')) {
            return response()->json([
                'status' => 'ok',
                'message' => 'Notification endpoint is active and ready.',
            ], 200);
        }

        $payload = $request->all();

        if (empty($payload)) {
            return response()->json([
                'status' => 'ok',
                'message' => 'Notification endpoint is active.',
            ], 200);
        }

        if (isset($payload['order_id']) && (str_starts_with((string) $payload['order_id'], 'test-') || str_contains((string) $payload['order_id'], 'test'))) {
            return response()->json([
                'status' => 'ok',
                'message' => 'Test notification received successfully.',
            ], 200);
        }

        try {
            $transaksi = $this->midtransService->handleNotification($payload);

            return response()->json([
                'message' => 'Notifikasi pembayaran berhasil diproses.',
                'order_id' => $transaksi->order_id,
                'status_pembayaran' => $transaksi->status_pembayaran,
            ]);
        } catch (Exception $e) {
            Log::warning('Midtrans webhook processing failed', [
                'error' => $e->getMessage(),
                'payload' => $payload,
            ]);

            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Riwayat transaksi user yang sedang login.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $query = $user->isAdmin()
            ? Transaksi::with(['user:id,name,email', 'detailTransaksis.produk.kategori'])
            : $user->transaksis()->with(['detailTransaksis.produk.kategori']);

        $transaksis = $query->latest('tanggal_transaksi')
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'message' => 'Daftar riwayat transaksi berhasil diambil.',
            'data' => $transaksis,
        ]);
    }

    /**
     * Detail satu transaksi berdasarkan order_id (lengkap untuk halaman Selesai Pembayaran & Bukti Bayar).
     */
    public function show(Request $request, string $orderId): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $transaksi = Transaksi::with([
            'user:id,name,email,no_whatsapp',
            'detailTransaksis.produk.kategori',
            'detailTransaksis.produk.materis',
        ])
            ->where('order_id', $orderId)
            ->first();

        if ($transaksi === null) {
            return response()->json([
                'message' => 'Transaksi tidak ditemukan.',
            ], 404);
        }

        if (! $user->isAdmin() && $transaksi->id_user !== $user->id) {
            return response()->json([
                'message' => 'Akses ditolak. Transaksi ini bukan milik Anda.',
            ], 403);
        }

        return response()->json([
            'message' => 'Detail transaksi berhasil diambil.',
            'data' => $this->formatTransactionReceipt($transaksi),
        ]);
    }

    /**
     * Cek dan sinkronisasi status transaksi langsung ke server Midtrans (tombol "Cek Status Pembayaran").
     */
    public function syncStatus(Request $request, string $orderId): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $transaksi = Transaksi::with(['user:id,name,email,no_whatsapp', 'detailTransaksis.produk'])
            ->where('order_id', $orderId)
            ->first();

        if ($transaksi === null) {
            return response()->json([
                'message' => 'Transaksi tidak ditemukan.',
            ], 404);
        }

        if (! $user->isAdmin() && $transaksi->id_user !== $user->id) {
            return response()->json([
                'message' => 'Akses ditolak. Transaksi ini bukan milik Anda.',
            ], 403);
        }

        try {
            $updated = $this->midtransService->syncTransactionStatus($transaksi);
        } catch (Exception $e) {
            Log::warning('Sync status Midtrans error', [
                'order_id' => $orderId,
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Gagal memeriksa status pembayaran ke Midtrans: '.$e->getMessage(),
            ], 502);
        }

        return response()->json([
            'message' => 'Status pembayaran berhasil disinkronkan.',
            'data' => $this->formatTransactionReceipt($updated),
        ]);
    }

    /**
     * Format data transaksi lengkap beserta informasi pembeli dan status akses item.
     *
     * @return array<string, mixed>
     */
    private function formatTransactionReceipt(Transaksi $transaksi): array
    {
        $unlockedProductIds = AksesProduk::where('id_user', $transaksi->id_user)
            ->where('status_akses', 'Unlocked')
            ->pluck('id_produk')
            ->all();

        return [
            'id' => $transaksi->id,
            'order_id' => $transaksi->order_id,
            'total_harga' => (float) $transaksi->total_harga,
            'biaya_tambahan' => 0.0,
            'status_pembayaran' => $transaksi->status_pembayaran,
            'is_paid' => $transaksi->isSuccess(),
            'metode_pembayaran' => $transaksi->metode_pembayaran,
            'snap_token' => $transaksi->snap_token,
            'snap_redirect_url' => $transaksi->snap_redirect_url,
            'tanggal_transaksi' => $transaksi->tanggal_transaksi?->toIso8601String(),
            'expired_at' => $transaksi->expired_at?->toIso8601String(),
            'paid_at' => $transaksi->paid_at?->toIso8601String(),
            'buyer' => [
                'id' => $transaksi->user?->id,
                'name' => $transaksi->user?->name,
                'email' => $transaksi->user?->email,
                'no_whatsapp' => $transaksi->user?->no_whatsapp,
            ],
            'items' => $transaksi->detailTransaksis->map(function (DetailTransaksi $dt) use ($unlockedProductIds): array {
                $produk = $dt->produk;
                $categoryName = $produk?->kategori?->nama_kategori;
                $isUnlocked = $produk !== null && in_array($produk->id, $unlockedProductIds, true);

                return [
                    'id_produk' => $dt->id_produk,
                    'nama_produk' => $produk?->nama_produk,
                    'kategori' => $categoryName,
                    'level' => $produk?->level,
                    'format' => $produk?->format,
                    'thumbnail_url' => $produk?->thumbnail_url,
                    'materis_count' => $produk?->materis?->count() ?? 0,
                    'yang_didapatkan' => $produk?->yang_didapatkan,
                    'harga_satuan' => (float) $dt->harga_satuan,
                    'is_unlocked' => $isUnlocked,
                    'download_url' => $isUnlocked ? $this->resolveDownloadUrl($dt->id_produk, $categoryName) : null,
                    'video_url' => ($isUnlocked && $categoryName === 'Courses') ? $produk?->file_url : null,
                ];
            }),
        ];
    }

    /**
     * Resolve secure download endpoint URL based on product category.
     */
    private function resolveDownloadUrl(int $productId, ?string $categoryName): ?string
    {
        return match ($categoryName) {
            'Digital Products' => url("/api/digital-products/{$productId}/download"),
            'Projects' => url("/api/projects/{$productId}/download"),
            default => null,
        };
    }
}
