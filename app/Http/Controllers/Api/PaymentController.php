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
        $products = Produk::whereIn('id', $productIds)->get();

        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'Produk yang dipilih tidak ditemukan.',
            ], 404);
        }

        // Cek apakah produk sudah di-unlock oleh user
        $alreadyUnlockedIds = $user->aksesProduks()
            ->whereIn('id_produk', $products->pluck('id'))
            ->where('status_akses', 'Unlocked')
            ->pluck('id_produk')
            ->all();

        // Filter produk yang belum dimiliki
        $payableProducts = $products->reject(
            fn (Produk $product): bool => in_array($product->id, $alreadyUnlockedIds, true)
        )->values();

        if ($payableProducts->isEmpty()) {
            return response()->json([
                'message' => 'Anda sudah memiliki akses penuh ke seluruh produk yang dipilih.',
            ], 422);
        }

        $totalHarga = (float) $payableProducts->sum('harga');

        // Jika semua produk gratis (harga = 0), langsung buka akses tanpa Midtrans
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
                        'harga' => 0,
                    ]),
                ],
            ]);
        }

        $orderId = 'TRX-'.now()->format('YmdHis').'-'.strtoupper(Str::random(5));

        // Buat record Transaksi dan DetailTransaksi di database
        $transaksi = DB::transaction(function () use ($user, $payableProducts, $totalHarga, $orderId): Transaksi {
            $trx = Transaksi::create([
                'order_id' => $orderId,
                'id_user' => $user->id,
                'total_harga' => $totalHarga,
                'status_pembayaran' => 'pending',
                'tanggal_transaksi' => now(),
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

        // Request Snap Token ke Midtrans
        try {
            $snapResult = $this->midtransService->createSnapTransaction($transaksi);
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
                'snap_token' => $snapResult['token'],
                'snap_redirect_url' => $snapResult['redirect_url'],
                'client_key' => config('midtrans.client_key'),
                'snap_js_url' => config('midtrans.snap_js_url'),
                'items' => $payableProducts->map(fn (Produk $p): array => [
                    'id_produk' => $p->id,
                    'nama_produk' => $p->nama_produk,
                    'harga' => (float) $p->harga,
                ]),
            ],
        ], 201);
    }

    /**
     * Webhook notification callback endpoint dari Midtrans.
     */
    public function notification(Request $request): JsonResponse
    {
        // Mendukung ping GET dari browser atau webhook validator
        if ($request->isMethod('get')) {
            return response()->json([
                'status' => 'ok',
                'message' => 'Notification endpoint is active and ready.',
            ], 200);
        }

        $payload = $request->all();

        // Jika ping test tanpa payload (misalnya probe koneksi dari Midtrans)
        if (empty($payload)) {
            return response()->json([
                'status' => 'ok',
                'message' => 'Notification endpoint is active.',
            ], 200);
        }

        // Jika ping test dari tombol "Test notification URL" di Dashboard Midtrans
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
            ? Transaksi::with(['user:id,name,email', 'detailTransaksis.produk:id,nama_produk,harga'])
            : $user->transaksis()->with(['detailTransaksis.produk:id,nama_produk,harga']);

        $transaksis = $query->latest('tanggal_transaksi')
            ->paginate($request->integer('per_page', 10));

        return response()->json([
            'message' => 'Daftar riwayat transaksi berhasil diambil.',
            'data' => $transaksis,
        ]);
    }

    /**
     * Detail satu transaksi berdasarkan order_id.
     */
    public function show(Request $request, string $orderId): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $transaksi = Transaksi::with(['detailTransaksis.produk'])
            ->where('order_id', $orderId)
            ->first();

        if ($transaksi === null) {
            return response()->json([
                'message' => 'Transaksi tidak ditemukan.',
            ], 404);
        }

        // Pastikan hanya pemilik transaksi atau admin yang bisa melihat
        if (! $user->isAdmin() && $transaksi->id_user !== $user->id) {
            return response()->json([
                'message' => 'Akses ditolak. Transaksi ini bukan milik Anda.',
            ], 403);
        }

        return response()->json([
            'message' => 'Detail transaksi berhasil diambil.',
            'data' => [
                'id' => $transaksi->id,
                'order_id' => $transaksi->order_id,
                'total_harga' => (float) $transaksi->total_harga,
                'status_pembayaran' => $transaksi->status_pembayaran,
                'metode_pembayaran' => $transaksi->metode_pembayaran,
                'snap_token' => $transaksi->snap_token,
                'snap_redirect_url' => $transaksi->snap_redirect_url,
                'tanggal_transaksi' => $transaksi->tanggal_transaksi?->toIso8601String(),
                'paid_at' => $transaksi->paid_at?->toIso8601String(),
                'items' => $transaksi->detailTransaksis->map(fn (DetailTransaksi $dt): array => [
                    'id_produk' => $dt->id_produk,
                    'nama_produk' => $dt->produk?->nama_produk,
                    'harga_satuan' => (float) $dt->harga_satuan,
                ]),
            ],
        ]);
    }
}
