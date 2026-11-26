<?php

namespace Database\Seeders;

use App\Models\DetailTransaksi;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Database\Seeder;

class TransaksiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customer = User::where('role', 'Customer')->first() ?? User::first();
        $produkPaid = Produk::where('harga', '>', 0)->get();

        if (! $customer || $produkPaid->isEmpty()) {
            return;
        }

        $p1 = $produkPaid->first();

        // 1. Transaksi Sukses
        $trxSuccess = Transaksi::updateOrCreate(
            ['order_id' => 'TRX-SAMPLE-SUCCESS-001'],
            [
                'id_user' => $customer->id,
                'total_harga' => $p1->harga,
                'status_pembayaran' => 'success',
                'metode_pembayaran' => 'qris',
                'snap_token' => 'dummy-snap-token-success',
                'snap_redirect_url' => 'https://app.sandbox.midtrans.com/snap/v2/vtweb/dummy-success',
                'tanggal_transaksi' => now()->subDay(),
                'paid_at' => now()->subDay(),
            ]
        );

        DetailTransaksi::updateOrCreate(
            ['id_transaksi' => $trxSuccess->id, 'id_produk' => $p1->id],
            ['harga_satuan' => $p1->harga]
        );

        // 2. Transaksi Pending
        if ($produkPaid->count() > 1) {
            $p2 = $produkPaid->skip(1)->first();
            $trxPending = Transaksi::updateOrCreate(
                ['order_id' => 'TRX-SAMPLE-PENDING-002'],
                [
                    'id_user' => $customer->id,
                    'total_harga' => $p2->harga,
                    'status_pembayaran' => 'pending',
                    'metode_pembayaran' => 'bank_transfer',
                    'snap_token' => 'dummy-snap-token-pending',
                    'snap_redirect_url' => 'https://app.sandbox.midtrans.com/snap/v2/vtweb/dummy-pending',
                    'tanggal_transaksi' => now(),
                    'paid_at' => null,
                ]
            );

            DetailTransaksi::updateOrCreate(
                ['id_transaksi' => $trxPending->id, 'id_produk' => $p2->id],
                ['harga_satuan' => $p2->harga]
            );
        }
    }
}
