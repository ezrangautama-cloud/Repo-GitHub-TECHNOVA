<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AksesProduk;
use App\Models\Transaksi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TransactionManagementController extends Controller
{
    /**
     * Display a paginated listing of all transactions for Admin monitoring.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Transaksi::with([
            'user:id,name,email',
            'detailTransaksis.produk:id,nama_produk,harga',
        ]);

        if ($request->filled('status_pembayaran')) {
            $query->where('status_pembayaran', (string) $request->input('status_pembayaran'));
        }

        if ($request->filled('q')) {
            $searchTerm = (string) $request->input('q');
            $query->where(function ($q) use ($searchTerm): void {
                $q->where('order_id', 'like', "%{$searchTerm}%")
                    ->orWhereHas('user', function ($userQuery) use ($searchTerm): void {
                        $userQuery->where('name', 'like', "%{$searchTerm}%")
                            ->orWhere('email', 'like', "%{$searchTerm}%");
                    });
            });
        }

        $transactions = $query->latest('tanggal_transaksi')->paginate($request->integer('per_page', 15));

        return response()->json([
            'message' => 'Daftar transaksi admin berhasil diambil.',
            'data' => $transactions,
        ]);
    }

    /**
     * Export filtered transactions as CSV file for Admin ("Ekspor pesanan").
     */
    public function export(Request $request): StreamedResponse
    {
        $query = Transaksi::with([
            'user:id,name,email',
            'detailTransaksis.produk:id,nama_produk',
        ]);

        if ($request->filled('status_pembayaran')) {
            $query->where('status_pembayaran', (string) $request->input('status_pembayaran'));
        }

        $transactions = $query->latest('tanggal_transaksi')->get();
        $filename = 'pesanan-technova-'.now()->format('Ymd-His').'.csv';

        return response()->streamDownload(function () use ($transactions): void {
            $handle = fopen('php://output', 'w');

            if ($handle === false) {
                return;
            }

            fputcsv($handle, [
                'Order ID',
                'Tanggal',
                'Pelanggan',
                'Email',
                'Item',
                'Total',
                'Metode',
                'Status',
                'Waktu Bayar',
            ]);

            foreach ($transactions as $trx) {
                $itemsLabel = $trx->detailTransaksis
                    ->map(fn ($dt): string => $dt->produk?->nama_produk ?? ('Produk #'.$dt->id_produk))
                    ->implode('; ');

                fputcsv($handle, [
                    $trx->order_id,
                    $trx->tanggal_transaksi?->toDateTimeString() ?? '',
                    $trx->user?->name ?? '',
                    $trx->user?->email ?? '',
                    $itemsLabel,
                    (string) $trx->total_harga,
                    $trx->metode_pembayaran ?? '-',
                    $trx->status_pembayaran,
                    $trx->paid_at?->toDateTimeString() ?? '-',
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    /**
     * Display full details of a transaction including raw webhook payload.
     */
    public function show(string $orderId): JsonResponse
    {
        $transaksi = Transaksi::with([
            'user:id,name,email,no_whatsapp',
            'detailTransaksis.produk:id,nama_produk,harga,id_kategori',
        ])
            ->where('order_id', $orderId)
            ->first();

        if ($transaksi === null) {
            return response()->json([
                'message' => 'Transaksi tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail transaksi admin berhasil diambil.',
            'data' => $transaksi,
        ]);
    }

    /**
     * Manually verify a transaction as settled and unlock all purchased items for the user.
     */
    public function verifyAndUnlock(string $orderId): JsonResponse
    {
        $transaksi = Transaksi::with('detailTransaksis')
            ->where('order_id', $orderId)
            ->first();

        if ($transaksi === null) {
            return response()->json([
                'message' => 'Transaksi tidak ditemukan.',
            ], 404);
        }

        DB::transaction(function () use ($transaksi): void {
            $transaksi->update([
                'status_pembayaran' => 'settlement',
                'paid_at' => $transaksi->paid_at ?? now(),
            ]);

            foreach ($transaksi->detailTransaksis as $detail) {
                AksesProduk::updateOrCreate(
                    [
                        'id_user' => $transaksi->id_user,
                        'id_produk' => $detail->id_produk,
                    ],
                    [
                        'status_akses' => 'Unlocked',
                    ]
                );
            }
        });

        $transaksi->refresh()->load('detailTransaksis.produk:id,nama_produk,harga');

        return response()->json([
            'message' => 'Transaksi berhasil diverifikasi secara manual dan akses produk telah dibuka.',
            'data' => $transaksi,
        ]);
    }

    /**
     * Manually grant or revoke product/course access for a specific user.
     */
    public function grantManualAccess(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id_user' => ['required', 'integer', 'exists:users,id'],
            'id_produk' => ['required', 'integer', 'exists:produks,id'],
            'status_akses' => ['nullable', 'string', 'in:Unlocked,Locked'],
        ], [
            'id_user.required' => 'User wajib dipilih.',
            'id_user.exists' => 'User tidak ditemukan.',
            'id_produk.required' => 'Produk/kursus wajib dipilih.',
            'id_produk.exists' => 'Produk/kursus tidak ditemukan.',
            'status_akses.in' => 'Status akses harus berupa Unlocked atau Locked.',
        ]);

        $statusAkses = $validated['status_akses'] ?? 'Unlocked';

        $akses = AksesProduk::updateOrCreate(
            [
                'id_user' => (int) $validated['id_user'],
                'id_produk' => (int) $validated['id_produk'],
            ],
            [
                'status_akses' => $statusAkses,
            ]
        );

        $akses->load(['user:id,name,email', 'produk:id,nama_produk']);

        return response()->json([
            'message' => 'Hak akses konten berhasil diperbarui secara manual.',
            'data' => $akses,
        ]);
    }
}
