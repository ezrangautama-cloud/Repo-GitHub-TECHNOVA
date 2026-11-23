<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AksesProduk;
use App\Models\Transaksi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionManagementController extends Controller
{
    /**
     * menampilkan daftar transaksi yang dipaginasikan untuk pemantauan Admin.
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
     * menampilkan detail lengkap dari transaksi termasuk payload webhook mentah.
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
     * secara manual memverifikasi transaksi sebagai settled dan membuka semua item yang dibeli untuk pengguna.
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
     * Secara manual memberikan atau mencabut akses produk/kursus untuk pengguna tertentu.
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
