<?php

namespace Tests\Feature;

use App\Models\AksesProduk;
use App\Models\DetailTransaksi;
use App\Models\KategoriProduk;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected User $otherUser;

    protected KategoriProduk $category;

    protected Produk $paidProduct;

    protected Produk $freeProduct;

    protected function setUp(): void
    {
        parent::setUp();

        Config::set('midtrans.server_key', 'SB-Mid-server-TESTKEY123456');
        Config::set('midtrans.client_key', 'SB-Mid-client-TESTKEY123456');

        $this->user = User::factory()->create([
            'name' => 'Budi Santoso',
            'email' => 'budi@test.com',
            'no_whatsapp' => '081234567890',
            'role' => 'Customer',
        ]);

        $this->otherUser = User::factory()->create([
            'name' => 'Doni Siregar',
            'email' => 'doni@test.com',
            'role' => 'Customer',
        ]);

        $this->category = KategoriProduk::create(['nama_kategori' => 'Digital Products']);

        $this->paidProduct = Produk::create([
            'id_kategori' => $this->category->id,
            'nama_produk' => 'Modul IoT ESP32 Advance',
            'level' => 'INTERMEDIATE',
            'format' => 'PDF + Code',
            'deskripsi' => 'Panduan lengkap ESP32.',
            'harga' => 100000,
            'file_url' => 'digital-products/esp32.zip',
        ]);

        $this->freeProduct = Produk::create([
            'id_kategori' => $this->category->id,
            'nama_produk' => 'Cheat Sheet Komponen Elektronika',
            'level' => 'BEGINNER',
            'format' => 'PDF',
            'deskripsi' => 'Cheat sheet gratis dasar elektronika.',
            'harga' => 0,
            'file_url' => 'digital-products/cheatsheet.pdf',
        ]);
    }

    public function test_guest_cannot_checkout(): void
    {
        $response = $this->postJson('/api/checkout', [
            'id_produk' => $this->paidProduct->id,
        ]);

        $response->assertStatus(401);
    }

    public function test_user_cannot_checkout_without_selecting_products(): void
    {
        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/checkout', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['id_produk']);
    }

    public function test_checkout_free_product_auto_unlocks_directly_without_midtrans(): void
    {
        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/checkout', [
            'id_produk' => $this->freeProduct->id,
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.is_free', true)
            ->assertJsonPath('data.status_pembayaran', 'success');

        $this->assertDatabaseHas('akses_produks', [
            'id_user' => $this->user->id,
            'id_produk' => $this->freeProduct->id,
            'status_akses' => 'Unlocked',
        ]);
    }

    public function test_checkout_paid_product_calls_midtrans_snap_and_creates_transaction(): void
    {
        Sanctum::actingAs($this->user);

        Http::fake([
            config('midtrans.snap_url') => Http::response([
                'token' => 'mock-snap-token-xyz789',
                'redirect_url' => 'https://app.sandbox.midtrans.com/snap/v2/vtweb/mock-snap-token-xyz789',
            ], 201),
        ]);

        $response = $this->postJson('/api/checkout', [
            'id_produk' => $this->paidProduct->id,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.total_harga', 100000)
            ->assertJsonPath('data.status_pembayaran', 'pending')
            ->assertJsonPath('data.snap_token', 'mock-snap-token-xyz789');

        $orderId = $response->json('data.order_id');

        $this->assertDatabaseHas('transaksis', [
            'order_id' => $orderId,
            'id_user' => $this->user->id,
            'total_harga' => 100000,
            'status_pembayaran' => 'pending',
            'snap_token' => 'mock-snap-token-xyz789',
        ]);

        $this->assertDatabaseHas('detail_transaksis', [
            'id_produk' => $this->paidProduct->id,
            'harga_satuan' => 100000,
        ]);
    }

    public function test_user_cannot_checkout_product_they_already_unlocked(): void
    {
        Sanctum::actingAs($this->user);

        AksesProduk::create([
            'id_user' => $this->user->id,
            'id_produk' => $this->paidProduct->id,
            'status_akses' => 'Unlocked',
        ]);

        $response = $this->postJson('/api/checkout', [
            'id_produk' => $this->paidProduct->id,
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('message', 'Anda sudah memiliki akses penuh ke seluruh produk yang dipilih.');
    }

    public function test_webhook_with_invalid_signature_is_rejected(): void
    {
        $response = $this->postJson('/api/payment/notification', [
            'order_id' => 'TRX-SAMPLE-001',
            'status_code' => '200',
            'gross_amount' => '100000.00',
            'signature_key' => 'invalid-hash-string',
            'transaction_status' => 'settlement',
        ]);

        $response->assertStatus(400)
            ->assertJsonPath('message', 'Invalid Midtrans notification signature.');
    }

    public function test_webhook_settlement_updates_transaction_and_unlocks_content(): void
    {
        $orderId = 'TRX-TEST-20261119-001';
        $grossAmount = '100000.00';
        $statusCode = '200';
        $serverKey = config('midtrans.server_key');

        $transaksi = Transaksi::create([
            'order_id' => $orderId,
            'id_user' => $this->user->id,
            'total_harga' => 100000,
            'status_pembayaran' => 'pending',
            'tanggal_transaksi' => now(),
        ]);

        DetailTransaksi::create([
            'id_transaksi' => $transaksi->id,
            'id_produk' => $this->paidProduct->id,
            'harga_satuan' => 100000,
        ]);

        $validSignature = hash('sha512', $orderId.$statusCode.$grossAmount.$serverKey);

        $response = $this->postJson('/api/payment/notification', [
            'order_id' => $orderId,
            'status_code' => $statusCode,
            'gross_amount' => $grossAmount,
            'signature_key' => $validSignature,
            'transaction_status' => 'settlement',
            'payment_type' => 'qris',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('status_pembayaran', 'success');

        $this->assertDatabaseHas('transaksis', [
            'order_id' => $orderId,
            'status_pembayaran' => 'success',
            'metode_pembayaran' => 'qris',
        ]);

        // Pastikan konten otomatis ter-unlock
        $this->assertDatabaseHas('akses_produks', [
            'id_user' => $this->user->id,
            'id_produk' => $this->paidProduct->id,
            'status_akses' => 'Unlocked',
        ]);
    }

    public function test_webhook_expire_updates_status_to_expired(): void
    {
        $orderId = 'TRX-TEST-EXPIRE-001';
        $grossAmount = '100000.00';
        $statusCode = '200';
        $serverKey = config('midtrans.server_key');

        $transaksi = Transaksi::create([
            'order_id' => $orderId,
            'id_user' => $this->user->id,
            'total_harga' => 100000,
            'status_pembayaran' => 'pending',
            'tanggal_transaksi' => now(),
        ]);

        DetailTransaksi::create([
            'id_transaksi' => $transaksi->id,
            'id_produk' => $this->paidProduct->id,
            'harga_satuan' => 100000,
        ]);

        $validSignature = hash('sha512', $orderId.$statusCode.$grossAmount.$serverKey);

        $response = $this->postJson('/api/payment/notification', [
            'order_id' => $orderId,
            'status_code' => $statusCode,
            'gross_amount' => $grossAmount,
            'signature_key' => $validSignature,
            'transaction_status' => 'expire',
            'payment_type' => 'bank_transfer',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('status_pembayaran', 'expired');

        $this->assertDatabaseHas('transaksis', [
            'order_id' => $orderId,
            'status_pembayaran' => 'expired',
        ]);

        $this->assertDatabaseMissing('akses_produks', [
            'id_user' => $this->user->id,
            'id_produk' => $this->paidProduct->id,
            'status_akses' => 'Unlocked',
        ]);
    }

    public function test_user_can_view_transaction_history_and_details(): void
    {
        Sanctum::actingAs($this->user);

        $transaksi = Transaksi::create([
            'order_id' => 'TRX-HISTORY-001',
            'id_user' => $this->user->id,
            'total_harga' => 100000,
            'status_pembayaran' => 'pending',
            'snap_token' => 'dummy-snap-token',
            'tanggal_transaksi' => now(),
        ]);

        DetailTransaksi::create([
            'id_transaksi' => $transaksi->id,
            'id_produk' => $this->paidProduct->id,
            'harga_satuan' => 100000,
        ]);

        // History list
        $responseList = $this->getJson('/api/transactions');
        $responseList->assertStatus(200)
            ->assertJsonPath('data.data.0.order_id', 'TRX-HISTORY-001');

        // Single detail
        $responseDetail = $this->getJson('/api/transactions/TRX-HISTORY-001');
        $responseDetail->assertStatus(200)
            ->assertJsonPath('data.order_id', 'TRX-HISTORY-001')
            ->assertJsonPath('data.items.0.nama_produk', 'Modul IoT ESP32 Advance');
    }

    public function test_other_user_cannot_view_someone_elses_transaction(): void
    {
        Sanctum::actingAs($this->otherUser);

        $transaksi = Transaksi::create([
            'order_id' => 'TRX-PRIVATE-001',
            'id_user' => $this->user->id,
            'total_harga' => 100000,
            'status_pembayaran' => 'pending',
            'tanggal_transaksi' => now(),
        ]);

        $response = $this->getJson('/api/transactions/TRX-PRIVATE-001');
        $response->assertStatus(403);
    }
}
