<?php

namespace Tests\Feature\Api;

use App\Models\DetailTransaksi;
use App\Models\KategoriProduk;
use App\Models\PesanLead;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected User $customer;

    protected KategoriProduk $katCourse;

    protected KategoriProduk $katDigital;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
        Storage::fake('public');

        $this->admin = User::factory()->create([
            'name' => 'Admin Technova',
            'email' => 'admin@technova.id',
            'role' => 'Admin',
        ]);

        $this->customer = User::factory()->create([
            'name' => 'Customer Biasa',
            'email' => 'customer@technova.id',
            'role' => 'Customer',
        ]);

        $this->katCourse = KategoriProduk::create(['nama_kategori' => 'Courses']);
        $this->katDigital = KategoriProduk::create(['nama_kategori' => 'Digital Products']);
    }

    public function test_non_admin_cannot_access_admin_endpoints(): void
    {
        // Unauthenticated -> 401
        $this->getJson('/api/admin/dashboard')->assertStatus(401);

        // Customer -> 403
        Sanctum::actingAs($this->customer);
        $this->getJson('/api/admin/dashboard')->assertStatus(403);
        $this->getJson('/api/admin/leads')->assertStatus(403);
        $this->postJson('/api/admin/products', [])->assertStatus(403);
    }

    public function test_admin_can_view_dashboard_summary(): void
    {
        PesanLead::create([
            'nama_pengirim' => 'Lead Baru',
            'no_whatsapp' => '62812345678',
            'pesan' => 'Tanya layanan IoT.',
            'status_lead' => 'New',
            'tanggal_pesan' => now(),
        ]);

        PesanLead::create([
            'nama_pengirim' => 'Lead Follow Up',
            'no_whatsapp' => '62812345679',
            'pesan' => 'Tanya PLTS.',
            'status_lead' => 'Follow Up',
            'tanggal_pesan' => now(),
        ]);

        Transaksi::factory()->create([
            'id_user' => $this->customer->id,
            'total_harga' => 150000,
            'status_pembayaran' => 'settlement',
        ]);

        Produk::create([
            'id_kategori' => $this->katCourse->id,
            'nama_produk' => 'Kursus IoT',
            'harga' => 150000,
        ]);

        Sanctum::actingAs($this->admin);

        $response = $this->getJson('/api/admin/dashboard');

        $response->assertOk()
            ->assertJson([
                'data' => [
                    'leads' => [
                        'total' => 2,
                        'new' => 1,
                        'follow_up' => 1,
                        'closed' => 0,
                    ],
                    'transactions' => [
                        'total' => 1,
                        'paid' => 1,
                        'pending' => 0,
                        'failed' => 0,
                        'total_revenue' => 150000,
                    ],
                    'catalog' => [
                        'total_courses' => 1,
                        'total_digital_products' => 0,
                    ],
                    'users' => [
                        'total_customers' => 1,
                        'total_admins' => 1,
                    ],
                ],
            ]);
    }

    public function test_admin_can_crud_products_with_private_file_upload_and_reject_exe(): void
    {
        Sanctum::actingAs($this->admin);

        // 1. Reject disallowed file (.exe)
        $exeFile = UploadedFile::fake()->create('malware.exe', 100);
        $rejectedRes = $this->postJson('/api/admin/products', [
            'id_kategori' => $this->katDigital->id,
            'nama_produk' => 'Produk Terlarang',
            'harga' => 50000,
            'file' => $exeFile,
        ]);
        $rejectedRes->assertStatus(422)
            ->assertJsonValidationErrors(['file']);

        // 2. Store valid PDF product
        $pdfFile = UploadedFile::fake()->create('modul-sensor.pdf', 500, 'application/pdf');
        $storeRes = $this->postJson('/api/admin/products', [
            'id_kategori' => $this->katDigital->id,
            'nama_produk' => 'Modul Sensor Presisi',
            'level' => 'INTERMEDIATE',
            'format' => 'PDF',
            'deskripsi' => 'Panduan lengkap kalibrasi sensor.',
            'harga' => 75000,
            'file' => $pdfFile,
        ]);

        $storeRes->assertStatus(201)
            ->assertJsonFragment(['nama_produk' => 'Modul Sensor Presisi']);

        $productId = $storeRes->json('data.id');
        $storedPath = $storeRes->json('data.file_url');
        $this->assertNotNull($storedPath);
        Storage::disk('local')->assertExists($storedPath);

        // 3. List & show
        $this->getJson('/api/admin/products?kategori=Digital')->assertOk()->assertJsonFragment(['id' => $productId]);
        $showRes = $this->getJson("/api/admin/products/{$productId}")->assertOk();
        $this->assertEquals(75000, $showRes->json('data.harga'));

        // 4. Update price and replace file
        $newZipFile = UploadedFile::fake()->create('modul-sensor-v2.zip', 600, 'application/zip');
        $updateRes = $this->putJson("/api/admin/products/{$productId}", [
            'harga' => 85000,
            'file' => $newZipFile,
        ]);

        $updateRes->assertOk();
        $newPath = $updateRes->json('data.file_url');
        $this->assertNotSame($storedPath, $newPath);
        Storage::disk('local')->assertMissing($storedPath);
        Storage::disk('local')->assertExists($newPath);

        // 5. Destroy cleans up file and record
        $this->deleteJson("/api/admin/products/{$productId}")->assertOk();
        Storage::disk('local')->assertMissing($newPath);
        $this->assertDatabaseMissing('produks', ['id' => $productId]);
    }

    public function test_admin_can_crud_portofolios(): void
    {
        Sanctum::actingAs($this->admin);

        $image = UploadedFile::fake()->image('plts-project.jpg', 800, 600);

        $storeRes = $this->postJson('/api/admin/portofolios', [
            'judul_proyek' => 'PLTS Off-Grid 5 kWp',
            'kategori' => 'Renewable Energy',
            'deskripsi' => 'Instalasi PLTS sekolah.',
            'teknologi' => 'Inverter Hybrid, LiFePO4',
            'image' => $image,
        ]);

        $storeRes->assertStatus(201)
            ->assertJsonFragment(['judul_proyek' => 'PLTS Off-Grid 5 kWp']);

        $portoId = $storeRes->json('data.id');
        $fileUrl = $storeRes->json('data.file_url');
        $this->assertStringStartsWith('/storage/portofolios/', $fileUrl);

        $this->getJson('/api/admin/portofolios')->assertOk();
        $this->getJson("/api/admin/portofolios/{$portoId}")->assertOk();

        $this->putJson("/api/admin/portofolios/{$portoId}", [
            'judul_proyek' => 'PLTS Off-Grid 10 kWp',
        ])->assertOk()->assertJsonFragment(['judul_proyek' => 'PLTS Off-Grid 10 kWp']);

        $this->deleteJson("/api/admin/portofolios/{$portoId}")->assertOk();
        $this->assertDatabaseMissing('portofolios', ['id' => $portoId]);
    }

    public function test_admin_can_track_and_manage_leads(): void
    {
        $lead = PesanLead::create([
            'id_user' => $this->customer->id,
            'nama_pengirim' => 'Klien Potensial',
            'no_whatsapp' => '628111222333',
            'pesan' => 'Ingin membuat alat monitoring suhu.',
            'status_lead' => 'New',
            'tipe_konsultasi' => 'service',
            'tanggal_pesan' => now(),
        ]);

        Sanctum::actingAs($this->admin);

        $this->getJson('/api/admin/leads?status_lead=New')
            ->assertOk()
            ->assertJsonFragment(['nama_pengirim' => 'Klien Potensial']);

        $this->getJson("/api/admin/leads/{$lead->id}")
            ->assertOk()
            ->assertJsonFragment(['no_whatsapp' => '628111222333']);

        // Invalid status rejected
        $this->patchJson("/api/admin/leads/{$lead->id}/status", [
            'status_lead' => 'InvalidStatus',
        ])->assertStatus(422);

        // Update status to Follow Up
        $this->patchJson("/api/admin/leads/{$lead->id}/status", [
            'status_lead' => 'Follow Up',
        ])->assertOk()->assertJsonFragment(['status_lead' => 'Follow Up']);

        $this->assertDatabaseHas('pesan_leads', [
            'id' => $lead->id,
            'status_lead' => 'Follow Up',
        ]);

        $this->deleteJson("/api/admin/leads/{$lead->id}")->assertOk();
        $this->assertDatabaseMissing('pesan_leads', ['id' => $lead->id]);
    }

    public function test_admin_can_verify_transaction_and_grant_manual_access(): void
    {
        $course = Produk::create([
            'id_kategori' => $this->katCourse->id,
            'nama_produk' => 'Kursus Solar PV',
            'harga' => 149000,
        ]);

        $transaksi = Transaksi::factory()->create([
            'order_id' => 'TRX-MANUAL-TEST-01',
            'id_user' => $this->customer->id,
            'total_harga' => 149000,
            'status_pembayaran' => 'pending',
        ]);

        DetailTransaksi::create([
            'id_transaksi' => $transaksi->id,
            'id_produk' => $course->id,
            'harga_satuan' => 149000,
        ]);

        Sanctum::actingAs($this->admin);

        // List and show transactions
        $this->getJson('/api/admin/transactions?status_pembayaran=pending')
            ->assertOk()
            ->assertJsonFragment(['order_id' => 'TRX-MANUAL-TEST-01']);

        $this->getJson('/api/admin/transactions/TRX-MANUAL-TEST-01')
            ->assertOk();

        // Manually verify & unlock
        $verifyRes = $this->postJson('/api/admin/transactions/TRX-MANUAL-TEST-01/verify-unlock');
        $verifyRes->assertOk()
            ->assertJsonFragment(['status_pembayaran' => 'settlement']);

        $this->assertDatabaseHas('akses_produks', [
            'id_user' => $this->customer->id,
            'id_produk' => $course->id,
            'status_akses' => 'Unlocked',
        ]);

        // Revoke access manually
        $revokeRes = $this->postJson('/api/admin/access-rights', [
            'id_user' => $this->customer->id,
            'id_produk' => $course->id,
            'status_akses' => 'Locked',
        ]);
        $revokeRes->assertOk()
            ->assertJsonFragment(['status_akses' => 'Locked']);

        $this->assertDatabaseHas('akses_produks', [
            'id_user' => $this->customer->id,
            'id_produk' => $course->id,
            'status_akses' => 'Locked',
        ]);
    }
}
