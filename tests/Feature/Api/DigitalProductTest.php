<?php

namespace Tests\Feature\Api;

use App\Models\AksesProduk;
use App\Models\KategoriProduk;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DigitalProductTest extends TestCase
{
    use RefreshDatabase;

    protected KategoriProduk $category;

    protected Produk $product;

    protected User $customer;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');

        $this->category = KategoriProduk::create(['nama_kategori' => 'Digital Products']);

        Storage::disk('local')->put('digital-products/sample-test.zip', 'SAMPLE TEST FILE CONTENT');

        $this->product = Produk::create([
            'id_kategori' => $this->category->id,
            'nama_produk' => 'Modul Praktikum IoT ESP32',
            'level' => 'BEGINNER',
            'format' => 'PDF + Code (ZIP)',
            'deskripsi' => 'Deskripsi modul praktikum ESP32.',
            'harga' => 50000,
            'file_url' => 'digital-products/sample-test.zip',
        ]);

        $this->customer = User::create([
            'name' => 'Budi Mahasiswa',
            'email' => 'budi@test.com',
            'password' => bcrypt('password'),
            'role' => 'Customer',
        ]);

        $this->admin = User::create([
            'name' => 'Admin Technova',
            'email' => 'admin@test.com',
            'password' => bcrypt('password'),
            'role' => 'Admin',
        ]);
    }

    public function test_can_get_digital_products_list(): void
    {
        $response = $this->getJson('/api/digital-products');

        $response->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'nama_produk',
                        'level',
                        'format',
                        'deskripsi',
                        'harga',
                        'is_unlocked',
                        'download_url',
                    ],
                ],
            ])
            ->assertJsonFragment([
                'nama_produk' => 'Modul Praktikum IoT ESP32',
                'is_unlocked' => false,
            ]);
    }

    public function test_can_search_and_filter_digital_products(): void
    {
        $response = $this->getJson('/api/digital-products?q=ESP32&level=BEGINNER');

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['nama_produk' => 'Modul Praktikum IoT ESP32']);

        $responseEmpty = $this->getJson('/api/digital-products?q=NonExistentKeyword');
        $responseEmpty->assertOk()
            ->assertJsonCount(0, 'data');
    }

    public function test_can_get_digital_product_detail(): void
    {
        $response = $this->getJson("/api/digital-products/{$this->product->id}");

        $response->assertOk()
            ->assertJsonFragment([
                'id' => $this->product->id,
                'nama_produk' => 'Modul Praktikum IoT ESP32',
                'access_status' => 'None',
                'is_unlocked' => false,
                'is_file_ready' => true,
            ]);
    }

    public function test_cannot_download_without_authentication(): void
    {
        $response = $this->getJson("/api/digital-products/{$this->product->id}/download");

        $response->assertStatus(401)
            ->assertJsonFragment([
                'message' => 'Unauthenticated. Silakan login terlebih dahulu untuk mengunduh produk digital.',
            ]);
    }

    public function test_cannot_download_if_access_is_locked_or_none(): void
    {
        // user tidak memiliki record in akses_produks
        $responseNoAccess = $this->actingAs($this->customer, 'sanctum')
            ->getJson("/api/digital-products/{$this->product->id}/download");

        $responseNoAccess->assertStatus(403);

        // user memiliki record dengan status 'Locked'
        AksesProduk::create([
            'id_user' => $this->customer->id,
            'id_produk' => $this->product->id,
            'status_akses' => 'Locked',
        ]);

        $responseLocked = $this->actingAs($this->customer, 'sanctum')
            ->getJson("/api/digital-products/{$this->product->id}/download");

        $responseLocked->assertStatus(403);
    }

    public function test_can_download_if_access_is_unlocked(): void
    {
        AksesProduk::create([
            'id_user' => $this->customer->id,
            'id_produk' => $this->product->id,
            'status_akses' => 'Unlocked',
        ]);

        $response = $this->actingAs($this->customer, 'sanctum')
            ->get("/api/digital-products/{$this->product->id}/download");

        $response->assertOk();
        $this->assertEquals('SAMPLE TEST FILE CONTENT', $response->streamedContent());
    }

    public function test_admin_can_download_any_digital_product(): void
    {
        $response = $this->actingAs($this->admin, 'sanctum')
            ->get("/api/digital-products/{$this->product->id}/download");

        $response->assertOk();
        $this->assertEquals('SAMPLE TEST FILE CONTENT', $response->streamedContent());
    }
}
