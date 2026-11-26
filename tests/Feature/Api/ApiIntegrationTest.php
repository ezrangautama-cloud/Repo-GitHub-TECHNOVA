<?php

namespace Tests\Feature\Api;

use App\Models\KategoriProduk;
use App\Models\Portofolio;
use App\Models\Produk;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiIntegrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $katServices = KategoriProduk::create(['nama_kategori' => 'IoT & Electronics']);
        $katCourses = KategoriProduk::create(['nama_kategori' => 'Courses']);
        $katDigital = KategoriProduk::create(['nama_kategori' => 'Digital Products']);

        Produk::create([
            'id_kategori' => $katServices->id,
            'nama_produk' => 'IoT & Electronics Prototyping',
            'level' => null,
            'format' => 'Consultation',
            'deskripsi' => 'Connected systems prototyping.',
            'harga' => 0,
        ]);

        Produk::create([
            'id_kategori' => $katCourses->id,
            'nama_produk' => 'ESP32 for IoT',
            'level' => 'BEGINNER',
            'format' => 'Video + Project',
            'deskripsi' => 'Belajar ESP32 dari nol.',
            'harga' => 149000,
        ]);

        Produk::create([
            'id_kategori' => $katDigital->id,
            'nama_produk' => 'Modul Praktikum IoT ESP32',
            'level' => 'BEGINNER',
            'format' => 'PDF + Code',
            'deskripsi' => 'File modul praktikum.',
            'harga' => 49000,
        ]);

        Portofolio::create([
            'judul_proyek' => 'Sistem Monitoring Energi PLTS',
            'kategori' => 'Renewable Energy',
            'deskripsi' => 'Pemantauan panel surya.',
            'teknologi' => 'ESP32, PZEM-004T',
            'file_url' => '/images/plts.jpg',
        ]);
    }

    public function test_can_get_home_featured_portfolios(): void
    {
        $response = $this->getJson('/api/home');

        $response->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => [
                    'featured_portofolios' => [
                        '*' => ['id', 'judul_proyek', 'kategori', 'deskripsi', 'teknologi'],
                    ],
                ],
            ])
            ->assertJsonFragment(['judul_proyek' => 'Sistem Monitoring Energi PLTS']);
    }

    public function test_can_get_all_portfolios_and_filter(): void
    {
        $response = $this->getJson('/api/portfolios?q=PLTS');

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['judul_proyek' => 'Sistem Monitoring Energi PLTS']);
    }

    public function test_can_get_services_and_filter_by_category(): void
    {
        $responseAll = $this->getJson('/api/services');
        $responseAll->assertOk();

        $responseServices = $this->getJson('/api/services?category=services');
        $responseServices->assertOk()
            ->assertJsonFragment(['nama_produk' => 'IoT & Electronics Prototyping']);

        $responseCourses = $this->getJson('/api/services?category=Courses');
        $responseCourses->assertOk()
            ->assertJsonFragment(['nama_produk' => 'ESP32 for IoT']);
    }

    public function test_can_get_courses_endpoint(): void
    {
        $response = $this->getJson('/api/courses');

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['nama_produk' => 'ESP32 for IoT']);
    }

    public function test_can_submit_service_request(): void
    {
        $payload = [
            'tipe' => 'Konsultasi IoT',
            'deskripsi' => 'Saya butuh bantuan kalibrasi sensor DHT22.',
            'email' => 'peserta@technova.id',
            'whatsapp' => '081234567890',
        ];

        $response = $this->postJson('/api/services/request', $payload);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'data' => [
                    'id',
                    'tipe',
                    'deskripsi',
                    'email',
                    'whatsapp',
                    'status',
                    'created_at',
                ],
            ])
            ->assertJsonFragment(['tipe' => 'Konsultasi IoT']);
    }
}
