<?php

namespace Tests\Feature;

use App\Models\DetailTransaksi;
use App\Models\KategoriProduk;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TransaksiTest extends TestCase
{
    use RefreshDatabase;

    public function test_transaksi_belongs_to_user_and_has_many_details(): void
    {
        $user = User::factory()->create();
        $kategori = KategoriProduk::create(['nama_kategori' => 'Digital Products']);
        $produk = Produk::create([
            'id_kategori' => $kategori->id,
            'nama_produk' => 'Modul IoT',
            'harga' => 100000,
        ]);

        $transaksi = Transaksi::factory()->create([
            'id_user' => $user->id,
            'total_harga' => 100000,
            'status_pembayaran' => 'pending',
        ]);

        $detail = DetailTransaksi::create([
            'id_transaksi' => $transaksi->id,
            'id_produk' => $produk->id,
            'harga_satuan' => 100000,
        ]);

        $this->assertEquals($user->id, $transaksi->user->id);
        $this->assertCount(1, $transaksi->detailTransaksis);
        $this->assertEquals($produk->id, $detail->produk->id);
        $this->assertEquals($transaksi->id, $detail->transaksi->id);
        $this->assertTrue($transaksi->isPending());
        $this->assertFalse($transaksi->isSuccess());
        $this->assertFalse($transaksi->isFailed());
    }

    public function test_transaksi_status_helpers(): void
    {
        $successTrx = Transaksi::factory()->success()->create();
        $this->assertTrue($successTrx->isSuccess());
        $this->assertFalse($successTrx->isPending());

        $failedTrx = Transaksi::factory()->failed()->create();
        $this->assertTrue($failedTrx->isFailed());

        $expiredTrx = Transaksi::factory()->expired()->create();
        $this->assertTrue($expiredTrx->isFailed());
    }

    public function test_midtrans_configuration_is_loaded(): void
    {
        $this->assertFalse(config('midtrans.is_production'));
        $this->assertTrue(config('midtrans.is_sanitized'));
        $this->assertTrue(config('midtrans.is_3ds'));
        $this->assertNotEmpty(config('midtrans.snap_url'));
        $this->assertStringContainsString('sandbox', config('midtrans.snap_url'));
    }
}
