<?php

namespace Tests\Feature\Api;

use App\Models\KategoriProduk;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactLeadTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_submit_general_contact_lead_and_receive_whatsapp_url(): void
    {
        $payload = [
            'nama_pengirim' => 'Ahmad Fauzi',
            'no_whatsapp' => '081234567890',
            'pesan' => 'Halo, saya ingin menanyakan jadwal bimbingan dan konsultasi langsung dengan Dr. Fitri.',
            'tipe_konsultasi' => 'general',
        ];

        $response = $this->postJson('/api/contact', $payload);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'data' => [
                    'lead' => [
                        'id',
                        'nama_pengirim',
                        'no_whatsapp',
                        'pesan',
                        'status_lead',
                        'tipe_konsultasi',
                        'tanggal_pesan',
                    ],
                    'target_whatsapp_number',
                    'formatted_message',
                    'whatsapp_url',
                ],
            ])
            ->assertJson([
                'data' => [
                    'lead' => [
                        'nama_pengirim' => 'Ahmad Fauzi',
                        'no_whatsapp' => '6281234567890',
                        'status_lead' => 'New',
                        'tipe_konsultasi' => 'general',
                    ],
                ],
            ]);

        $this->assertDatabaseHas('pesan_leads', [
            'nama_pengirim' => 'Ahmad Fauzi',
            'no_whatsapp' => '6281234567890',
            'status_lead' => 'New',
        ]);

        $responseData = $response->json('data');
        $this->assertStringContainsString('https://wa.me/', $responseData['whatsapp_url']);
        $this->assertStringContainsString(rawurlencode('Ahmad Fauzi'), $responseData['whatsapp_url']);
    }

    public function test_authenticated_user_links_id_user_to_lead(): void
    {
        $user = User::create([
            'name' => 'Budi Mahasiswa',
            'email' => 'budi@example.com',
            'password' => bcrypt('password'),
            'role' => 'Customer',
            'no_whatsapp' => '08987654321',
        ]);

        $payload = [
            'nama_pengirim' => 'Budi Mahasiswa',
            'no_whatsapp' => '08987654321',
            'pesan' => 'Konsultasi mengenai tugas akhir PLTS.',
        ];

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/contact', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'data' => [
                    'lead' => [
                        'id_user' => $user->id,
                        'nama_pengirim' => 'Budi Mahasiswa',
                    ],
                ],
            ]);

        $this->assertDatabaseHas('pesan_leads', [
            'id_user' => $user->id,
            'nama_pengirim' => 'Budi Mahasiswa',
        ]);
    }

    public function test_can_submit_service_consultation_lead(): void
    {
        $category = KategoriProduk::create(['nama_kategori' => 'IoT & Electronics']);
        $service = Produk::create([
            'id_kategori' => $category->id,
            'nama_produk' => 'IoT & Electronics Prototyping',
            'deskripsi' => 'Pengembangan prototipe cepat.',
            'harga' => 0,
        ]);

        $payload = [
            'nama_pengirim' => 'Reza Pratama',
            'no_whatsapp' => '085712345678',
            'pesan' => 'Kami butuh prototipe akuisisi data suhu industri.',
            'tipe_konsultasi' => 'service',
            'service_id' => $service->id,
        ];

        $response = $this->postJson('/api/contact', $payload);

        $response->assertStatus(201);

        $responseData = $response->json('data');
        $this->assertStringContainsString('IoT & Electronics Prototyping', $responseData['formatted_message']);
        $this->assertDatabaseHas('pesan_leads', [
            'nama_pengirim' => 'Reza Pratama',
            'tipe_konsultasi' => 'service',
        ]);
    }

    public function test_can_submit_solar_calculator_lead(): void
    {
        $payload = [
            'nama_pengirim' => 'Dian Sastro',
            'no_whatsapp' => '081399887766',
            'pesan' => 'Tolong berikan estimasi biaya instalasi paket PLTS sesuai simulasi ini.',
            'tipe_konsultasi' => 'calculator_solar',
            'calculator_data' => [
                'energi_harian_kwh' => 7.3,
                'kapasitas_pv_teoritis_wp' => 2162.96,
                'estimasi_modul_label' => '6x Panel 400 Wp',
                'kapasitas_baterai_ah' => 380.2,
                'tegangan_sistem_v' => 24,
                'jenis_baterai' => 'Lithium LiFePO4',
                'rekomendasi_inverter_watt' => 1000,
            ],
        ];

        $response = $this->postJson('/api/contact', $payload);

        $response->assertStatus(201);

        $responseData = $response->json('data');
        $this->assertStringContainsString('2162.96 Wp', $responseData['formatted_message']);
        $this->assertStringContainsString('380.2 Ah', $responseData['formatted_message']);
        $this->assertStringContainsString('1000 Watt', $responseData['formatted_message']);

        $this->assertDatabaseHas('pesan_leads', [
            'nama_pengirim' => 'Dian Sastro',
            'tipe_konsultasi' => 'calculator_solar',
        ]);
    }

    public function test_can_submit_electrical_calculator_lead(): void
    {
        $payload = [
            'nama_pengirim' => 'Hendro',
            'no_whatsapp' => '081211223344',
            'pesan' => 'Apakah daya listrik rumah saya cukup untuk beban ini?',
            'tipe_konsultasi' => 'calculator_electrical',
            'calculator_data' => [
                'total_daya_watt' => 600,
                'energi_harian_kwh' => 7.3,
                'rekomendasi_pln' => '900 VA (Disarankan 1.300 VA)',
            ],
        ];

        $response = $this->postJson('/api/contact', $payload);

        $response->assertStatus(201);

        $responseData = $response->json('data');
        $this->assertStringContainsString('600 Watt', $responseData['formatted_message']);
        $this->assertStringContainsString('7.3 kWh/hari', $responseData['formatted_message']);
        $this->assertStringContainsString('900 VA (Disarankan 1.300 VA)', $responseData['formatted_message']);
    }

    public function test_contact_lead_validation_rules(): void
    {
        $response = $this->postJson('/api/contact', [
            'nama_pengirim' => '',
            'no_whatsapp' => '123',
            'pesan' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['nama_pengirim', 'no_whatsapp', 'pesan']);
    }

    public function test_can_generate_quick_whatsapp_preview_url_without_saving(): void
    {
        $payload = [
            'nama_pengirim' => 'Tamu Preview',
            'pesan' => 'Hanya ingin mengetes link WhatsApp.',
            'tipe_konsultasi' => 'general',
        ];

        $response = $this->postJson('/api/contact/quick-whatsapp', $payload);

        $response->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => [
                    'target_whatsapp_number',
                    'formatted_message',
                    'whatsapp_url',
                ],
            ]);

        $this->assertDatabaseMissing('pesan_leads', [
            'nama_pengirim' => 'Tamu Preview',
        ]);
    }
}
