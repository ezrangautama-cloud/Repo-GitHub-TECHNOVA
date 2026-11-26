<?php

namespace Tests\Feature\Api;

use App\Models\AksesProduk;
use App\Models\DetailTransaksi;
use App\Models\KategoriProduk;
use App\Models\PesanLead;
use App\Models\Portofolio;
use App\Models\Produk;
use App\Models\ProdukMateri;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FigmaAlignmentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
        Config::set('midtrans.server_key', 'SB-Mid-server-TESTKEY123456');
        Config::set('midtrans.client_key', 'SB-Mid-client-TESTKEY123456');
    }

    public function test_bilingual_level_filter_and_global_search_work_across_catalogs(): void
    {
        $katCourse = KategoriProduk::create(['nama_kategori' => 'Courses']);
        $katDigital = KategoriProduk::create(['nama_kategori' => 'Digital Products']);
        $katProjects = KategoriProduk::create(['nama_kategori' => 'Projects']);

        Produk::create([
            'id_kategori' => $katCourse->id,
            'nama_produk' => 'ESP32 untuk IoT',
            'level' => 'BEGINNER',
            'format' => 'Video + Proyek',
            'deskripsi' => 'Belajar dasar IoT ESP32.',
            'harga' => 149000,
        ]);

        Produk::create([
            'id_kategori' => $katDigital->id,
            'nama_produk' => 'Modul Elektronika Dasar',
            'level' => 'Pemula',
            'format' => 'PDF',
            'deskripsi' => 'Konsep rangkaian dasar.',
            'harga' => 49000,
        ]);

        Produk::create([
            'id_kategori' => $katProjects->id,
            'nama_produk' => 'Pemantauan Lingkungan ESP32',
            'level' => 'INTERMEDIATE',
            'format' => 'IoT • Sensor',
            'deskripsi' => 'Studi kasus pemantauan suhu.',
            'harga' => 99000,
        ]);

        Portofolio::create([
            'judul_proyek' => 'Audit Kapasitas PLTS',
            'kategori' => 'Energi',
            'level' => 'Pemula',
            'harga' => 0,
            'deskripsi' => 'Studi kasus PLTS pemula.',
            'teknologi' => 'Solar PV',
        ]);

        // Indonesian filter "Pemula" matches "BEGINNER" and "Pemula"
        $this->getJson('/api/courses?level=Pemula')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['nama_produk' => 'ESP32 untuk IoT']);

        $this->getJson('/api/digital-products?level=beginner')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['nama_produk' => 'Modul Elektronika Dasar']);

        $this->getJson('/api/projects?level=Menengah')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['nama_produk' => 'Pemantauan Lingkungan ESP32']);

        $this->getJson('/api/portofolios?level=Pemula')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['judul_proyek' => 'Audit Kapasitas PLTS']);

        // Global search for "ESP32" finds both course and project
        $searchRes = $this->getJson('/api/search?q=ESP32');
        $searchRes->assertOk()
            ->assertJson([
                'data' => [
                    'query' => 'ESP32',
                    'total_results' => 2,
                ],
            ])
            ->assertJsonCount(1, 'data.courses')
            ->assertJsonCount(1, 'data.projects');

        // Admin global search
        $admin = User::factory()->create(['role' => 'Admin']);
        $customer = User::factory()->create(['name' => 'Nadia Putri', 'email' => 'nadia@example.com', 'role' => 'Customer']);
        Sanctum::actingAs($admin);

        $this->getJson('/api/admin/search?q=Nadia')
            ->assertOk()
            ->assertJsonCount(1, 'data.users')
            ->assertJsonFragment(['email' => 'nadia@example.com']);
    }

    public function test_contact_form_accepts_email_without_whatsapp_and_supports_admin_response_and_my_services(): void
    {
        $user = User::factory()->create([
            'name' => 'Nadia Putri',
            'email' => 'nadia.putri@example.com',
            'role' => 'Customer',
        ]);

        $admin = User::factory()->create([
            'name' => 'Admin TECHNOVA',
            'email' => 'admin@technova.id',
            'role' => 'Admin',
        ]);

        // Submit Figma contact form with Email & without no_whatsapp
        Sanctum::actingAs($user);
        $contactRes = $this->postJson('/api/contact', [
            'nama' => 'Nadia Putri',
            'email' => 'nadia.putri@example.com',
            'jenis_pertanyaan' => 'Konsultasi IoT',
            'konteks_proyek' => 'Ingin mendiskusikan kalibrasi sensor DHT22.',
        ]);

        $contactRes->assertStatus(201)
            ->assertJsonFragment([
                'nama_pengirim' => 'Nadia Putri',
                'email' => 'nadia.putri@example.com',
                'status_lead' => 'New',
            ]);

        $leadId = $contactRes->json('data.lead.id');
        $kode = $contactRes->json('data.lead.kode_permintaan');
        $this->assertStringStartsWith('REQ-', (string) $kode);

        // User checks "Layanan Saya" before admin responds
        $this->getJson('/api/my-services')
            ->assertOk()
            ->assertJsonFragment([
                'kode_permintaan' => $kode,
                'status_label' => 'Menunggu balasan',
                'admin_response' => null,
            ]);

        // Admin responds to lead
        Sanctum::actingAs($admin);
        $respondRes = $this->postJson("/api/admin/leads/{$leadId}/respond", [
            'admin_response' => 'Terima kasih Nadia, silakan cek jadwal bimbingan pada link yang kami kirim ke email.',
            'status_lead' => 'Closed',
        ]);

        $respondRes->assertOk()
            ->assertJsonFragment([
                'status_lead' => 'Closed',
                'admin_response' => 'Terima kasih Nadia, silakan cek jadwal bimbingan pada link yang kami kirim ke email.',
            ]);

        // User views updated status & admin response on "Layanan Saya"
        Sanctum::actingAs($user);
        $this->getJson("/api/my-services/{$leadId}")
            ->assertOk()
            ->assertJson([
                'data' => [
                    'kode_permintaan' => $kode,
                    'status_lead' => 'Closed',
                    'status_label' => 'Selesai',
                    'admin_response' => 'Terima kasih Nadia, silakan cek jadwal bimbingan pada link yang kami kirim ke email.',
                    'responded_by' => 'Admin TECHNOVA',
                ],
            ]);
    }

    public function test_enriched_order_receipt_payment_method_and_sync_status(): void
    {
        $user = User::factory()->create([
            'name' => 'Nadia Putri',
            'email' => 'nadia.putri@example.com',
            'role' => 'Customer',
        ]);

        $katCourse = KategoriProduk::create(['nama_kategori' => 'Courses']);
        $course = Produk::create([
            'id_kategori' => $katCourse->id,
            'nama_produk' => 'ESP32 untuk IoT',
            'level' => 'Pemula',
            'format' => 'Video + Proyek',
            'yang_didapatkan' => ['18 materi siap dipelajari', 'Video dan proyek praktik'],
            'harga' => 149000,
            'file_url' => 'https://www.youtube.com/watch?v=esp32-course',
        ]);

        ProdukMateri::create([
            'id_produk' => $course->id,
            'judul_modul' => 'Modul 1',
            'judul_materi' => 'Pengenalan ESP32',
            'konten_url' => 'https://www.youtube.com/watch?v=lesson-1',
            'urutan' => 1,
            'is_preview' => true,
        ]);

        Http::fake([
            'https://app.sandbox.midtrans.com/snap/v1/transactions' => Http::response([
                'token' => 'SNAP-TOKEN-QRIS',
                'redirect_url' => 'https://app.sandbox.midtrans.com/snap/v2/vtweb/SNAP-TOKEN-QRIS',
            ], 201),
            'https://api.sandbox.midtrans.com/v2/*/status' => Http::response([
                'status_code' => '200',
                'transaction_status' => 'settlement',
                'payment_type' => 'qris',
                'gross_amount' => '149000.00',
            ], 200),
        ]);

        Sanctum::actingAs($user);

        // Checkout with selected payment method 'qris'
        $checkoutRes = $this->postJson('/api/checkout', [
            'id_produk' => $course->id,
            'metode_pembayaran' => 'qris',
        ]);

        $checkoutRes->assertStatus(201)
            ->assertJson([
                'data' => [
                    'metode_pembayaran' => 'qris',
                    'status_pembayaran' => 'pending',
                ],
            ]);

        $orderId = $checkoutRes->json('data.order_id');
        $this->assertNotNull($checkoutRes->json('data.expired_at'));

        Http::assertSent(function ($request) {
            if (str_contains($request->url(), 'snap/v1/transactions')) {
                return ($request['enabled_payments'] ?? []) === ['other_qris', 'gopay', 'shopeepay'];
            }

            return true;
        });

        // Sync status ("Cek Status Pembayaran") updates to success, unlocks course, and returns rich receipt
        $syncRes = $this->getJson("/api/transactions/{$orderId}/sync-status");
        $syncRes->assertOk()
            ->assertJson([
                'data' => [
                    'order_id' => $orderId,
                    'status_pembayaran' => 'success',
                    'is_paid' => true,
                    'biaya_tambahan' => 0,
                    'buyer' => [
                        'name' => 'Nadia Putri',
                        'email' => 'nadia.putri@example.com',
                    ],
                ],
            ])
            ->assertJsonFragment([
                'id_produk' => $course->id,
                'nama_produk' => 'ESP32 untuk IoT',
                'kategori' => 'Courses',
                'is_unlocked' => true,
                'video_url' => 'https://www.youtube.com/watch?v=esp32-course',
                'materis_count' => 1,
            ]);
    }

    public function test_projects_catalog_free_claim_download_and_my_contents_projects_tab(): void
    {
        $user = User::factory()->create(['role' => 'Customer']);
        $katProjects = KategoriProduk::create(['nama_kategori' => 'Projects']);

        Storage::disk('local')->put('digital-products/panduan-sensor-dasar.zip', 'FREE PROJECT ARCHIVE');

        $freeProject = Produk::create([
            'id_kategori' => $katProjects->id,
            'nama_produk' => 'Panduan Sensor Dasar',
            'level' => 'Pemula',
            'format' => 'Rangkaian + Kode contoh',
            'deskripsi' => 'Panduan sensor gratis.',
            'harga' => 0,
            'file_url' => 'digital-products/panduan-sensor-dasar.zip',
        ]);

        $this->getJson('/api/projects')
            ->assertOk()
            ->assertJsonFragment([
                'nama_produk' => 'Panduan Sensor Dasar',
                'is_free' => true,
                'is_unlocked' => false,
            ]);

        Sanctum::actingAs($user);

        // Claim free project
        $claimRes = $this->postJson("/api/products/{$freeProject->id}/claim-free");
        $claimRes->assertOk()
            ->assertJson([
                'data' => [
                    'id_produk' => $freeProject->id,
                    'status_akses' => 'Unlocked',
                    'is_unlocked' => true,
                ],
            ]);

        // Download unlocked project file
        $downloadRes = $this->get("/api/projects/{$freeProject->id}/download");
        $downloadRes->assertOk();
        $this->assertEquals('FREE PROJECT ARCHIVE', $downloadRes->streamedContent());

        // Check my-contents "projects" tab
        $this->getJson('/api/my-contents?type=projects')
            ->assertOk()
            ->assertJson([
                'data' => [
                    'summary' => [
                        'projects_count' => 1,
                    ],
                ],
            ])
            ->assertJsonFragment(['nama_produk' => 'Panduan Sensor Dasar']);
    }

    public function test_course_lesson_player_respects_preview_and_lock_and_admin_can_crud_materi(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $customer = User::factory()->create(['role' => 'Customer']);
        $katCourses = KategoriProduk::create(['nama_kategori' => 'Courses']);

        $course = Produk::create([
            'id_kategori' => $katCourses->id,
            'nama_produk' => 'ESP32 untuk IoT',
            'level' => 'Pemula',
            'harga' => 149000,
        ]);

        // Admin creates two lessons via API
        Sanctum::actingAs($admin);
        $m1Res = $this->postJson("/api/admin/products/{$course->id}/materis", [
            'judul_modul' => 'Modul 1',
            'judul_materi' => 'Pengenalan ESP32',
            'konten_url' => 'https://www.youtube.com/watch?v=preview-1',
            'durasi' => '10:00',
            'is_preview' => true,
        ]);
        $m1Res->assertStatus(201);
        $m1Id = $m1Res->json('data.id');

        $m2Res = $this->postJson("/api/admin/products/{$course->id}/materis", [
            'judul_modul' => 'Modul 2',
            'judul_materi' => 'Kalibrasi Sensor DHT22',
            'konten_url' => 'https://www.youtube.com/watch?v=paid-2',
            'durasi' => '18:42',
            'is_preview' => false,
        ]);
        $m2Res->assertStatus(201);
        $m2Id = $m2Res->json('data.id');

        // Customer without purchase can open preview lesson 1, but gets 403 on locked lesson 2
        Sanctum::actingAs($customer);
        $this->getJson("/api/courses/{$course->id}/lessons/{$m1Id}")
            ->assertOk()
            ->assertJsonPath('data.lesson.judul_materi', 'Pengenalan ESP32')
            ->assertJsonPath('data.next_lesson.id', $m2Id);

        $this->getJson("/api/courses/{$course->id}/lessons/{$m2Id}")
            ->assertStatus(403);

        // Unlock course for customer
        AksesProduk::create([
            'id_user' => $customer->id,
            'id_produk' => $course->id,
            'status_akses' => 'Unlocked',
        ]);

        $this->getJson("/api/courses/{$course->id}/lessons/{$m2Id}")
            ->assertOk()
            ->assertJsonPath('data.lesson.konten_url', 'https://www.youtube.com/watch?v=paid-2')
            ->assertJsonPath('data.previous_lesson.id', $m1Id);
    }

    public function test_account_logic_register_without_confirmation_login_as_forgot_reset_and_user_dashboard(): void
    {
        // Register without password_confirmation (matches Figma register.png)
        $regRes = $this->postJson('/api/register', [
            'name' => 'Nadia Putri',
            'email' => 'nadia.putri@example.com',
            'password' => 'password123',
        ]);
        $regRes->assertStatus(201);

        $user = User::where('email', 'nadia.putri@example.com')->firstOrFail();

        // Customer blocked if trying login_as=admin
        $this->postJson('/api/login', [
            'email' => 'nadia.putri@example.com',
            'password' => 'password123',
            'login_as' => 'admin',
        ])->assertStatus(403);

        // Forgot & Reset Password flow
        $this->postJson('/api/forgot-password', [
            'email' => 'nadia.putri@example.com',
        ])->assertOk();

        $token = Password::broker()->createToken($user);

        $this->postJson('/api/reset-password', [
            'email' => 'nadia.putri@example.com',
            'token' => $token,
            'password' => 'newpassword999',
        ])->assertOk();

        $this->assertTrue(Hash::check('newpassword999', $user->fresh()->password));

        // Login with new password succeeds
        $this->postJson('/api/login', [
            'email' => 'nadia.putri@example.com',
            'password' => 'newpassword999',
            'login_as' => 'peserta',
        ])->assertOk();

        // Unified User Dashboard + Admin CSV export
        $katCourse = KategoriProduk::create(['nama_kategori' => 'Courses']);
        $course = Produk::create([
            'id_kategori' => $katCourse->id,
            'nama_produk' => 'Dasar PLTS',
            'harga' => 99000,
        ]);

        $trx = Transaksi::factory()->create([
            'order_id' => 'INV-240307',
            'id_user' => $user->id,
            'total_harga' => 99000,
            'status_pembayaran' => 'settlement',
        ]);

        DetailTransaksi::create([
            'id_transaksi' => $trx->id,
            'id_produk' => $course->id,
            'harga_satuan' => 99000,
        ]);

        PesanLead::create([
            'kode_permintaan' => 'REQ-00842',
            'id_user' => $user->id,
            'nama_pengirim' => $user->name,
            'email' => $user->email,
            'pesan' => 'Konsultasi IoT',
            'status_lead' => 'Follow Up',
            'tanggal_pesan' => now(),
        ]);

        Sanctum::actingAs($user);
        $this->getJson('/api/user/dashboard')
            ->assertOk()
            ->assertJson([
                'data' => [
                    'summary' => [
                        'service_requests_count' => 1,
                        'transactions_count' => 1,
                    ],
                ],
            ])
            ->assertJsonFragment(['code' => 'INV-240307'])
            ->assertJsonFragment(['code' => 'REQ-00842']);

        $admin = User::factory()->create(['role' => 'Admin']);
        Sanctum::actingAs($admin);
        $exportRes = $this->get('/api/admin/transactions/export');
        $exportRes->assertOk();
        $this->assertStringContainsString('INV-240307', $exportRes->streamedContent());
    }

    public function test_solar_pv_calculator_returns_practical_battery_and_series_parallel_config(): void
    {
        $response = $this->postJson('/api/tools/calculate/solar', [
            'energi_harian_wh' => 7300,
            'psh' => 4.5,
            'v_sys' => 24,
            'jenis_baterai' => 'lithium',
            'daya_panel_unit' => 400,
            'total_beban_watt' => 600,
        ]);

        $response->assertOk()
            ->assertJson([
                'data' => [
                    'kapasitas_baterai_ah' => 380.2,
                    'kapasitas_baterai_praktis_ah' => 400,
                    'konfigurasi_baterai' => [
                        'tegangan_unit_v' => 12,
                        'kapasitas_unit_ah' => 200,
                        'jumlah_seri' => 2,
                        'jumlah_paralel' => 2,
                        'total_unit' => 4,
                        'label' => '4 baterai 12 V 200 Ah (2 seri × 2 paralel)',
                    ],
                    'rekomendasi_inverter_watt' => 1000,
                    'rekomendasi_inverter_rentang' => '1000 - 1500 W pada 24 V',
                ],
            ]);
    }
}
