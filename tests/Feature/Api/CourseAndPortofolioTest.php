<?php

namespace Tests\Feature\Api;

use App\Models\AksesProduk;
use App\Models\KategoriProduk;
use App\Models\Portofolio;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CourseAndPortofolioTest extends TestCase
{
    use RefreshDatabase;

    protected KategoriProduk $katCourse;

    protected KategoriProduk $katDigital;

    protected KategoriProduk $katService;

    protected Produk $courseBeginner;

    protected Produk $courseIntermediate;

    protected Produk $serviceIot;

    protected Produk $digitalModule;

    protected Portofolio $portoPlts;

    protected Portofolio $portoIot;

    protected function setUp(): void
    {
        parent::setUp();

        $this->katCourse = KategoriProduk::create(['nama_kategori' => 'Courses']);
        $this->katDigital = KategoriProduk::create(['nama_kategori' => 'Digital Products']);
        $this->katService = KategoriProduk::create(['nama_kategori' => 'IoT & Electronics']);

        $this->courseBeginner = Produk::create([
            'id_kategori' => $this->katCourse->id,
            'nama_produk' => 'Electronics Fundamentals',
            'level' => 'BEGINNER',
            'format' => 'Video + PDF',
            'deskripsi' => 'Dasar elektronika.',
            'harga' => 99000,
            'file_url' => 'https://www.youtube.com/watch?v=electronics-101',
        ]);

        $this->courseIntermediate = Produk::create([
            'id_kategori' => $this->katCourse->id,
            'nama_produk' => 'IoT Monitoring System',
            'level' => 'INTERMEDIATE',
            'format' => 'Video + Project',
            'deskripsi' => 'Monitoring industri real-time.',
            'harga' => 199000,
            'file_url' => 'https://www.youtube.com/watch?v=iot-monitoring',
        ]);

        $this->serviceIot = Produk::create([
            'id_kategori' => $this->katService->id,
            'nama_produk' => 'IoT & Electronics Prototyping',
            'format' => 'Consultation & Development',
            'deskripsi' => 'Prototipe IoT.',
            'harga' => 0,
        ]);

        $this->digitalModule = Produk::create([
            'id_kategori' => $this->katDigital->id,
            'nama_produk' => 'Jobsheet Sensor',
            'level' => 'BEGINNER',
            'format' => 'PDF',
            'deskripsi' => 'Jobsheet PDF.',
            'harga' => 50000,
            'file_url' => 'digital-products/jobsheet.pdf',
        ]);

        $this->portoPlts = Portofolio::create([
            'judul_proyek' => 'Sistem Monitoring PLTS',
            'kategori' => 'Renewable Energy',
            'deskripsi' => 'Pemantauan daya panel surya.',
            'teknologi' => 'ESP32, MQTT, Grafana',
            'file_url' => '/images/plts.jpg',
        ]);

        $this->portoIot = Portofolio::create([
            'judul_proyek' => 'Smart Greenhouse IoT',
            'kategori' => 'IoT & Electronics',
            'deskripsi' => 'Otomatisasi penyiraman greenhouse.',
            'teknologi' => 'NodeMCU, DHT22',
            'file_url' => '/images/greenhouse.jpg',
        ]);
    }

    public function test_can_list_and_filter_courses_without_exposing_locked_video_url(): void
    {
        $response = $this->getJson('/api/courses');

        $response->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonFragment(['nama_produk' => 'Electronics Fundamentals', 'video_url' => null])
            ->assertJsonMissing(['nama_produk' => 'IoT & Electronics Prototyping'])
            ->assertJsonMissing(['nama_produk' => 'Jobsheet Sensor']);

        // Filter by level
        $filtered = $this->getJson('/api/courses?level=INTERMEDIATE');
        $filtered->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['nama_produk' => 'IoT Monitoring System']);

        // Sort price low to high
        $sorted = $this->getJson('/api/courses?sort=price_low');
        $sorted->assertOk();
        $this->assertSame('Electronics Fundamentals', $sorted->json('data.0.nama_produk'));
    }

    public function test_course_detail_reveals_video_url_only_when_unlocked(): void
    {
        $customer = User::factory()->create(['role' => 'Customer']);
        Sanctum::actingAs($customer);

        // Before unlock
        $lockedRes = $this->getJson("/api/courses/{$this->courseBeginner->id}");
        $lockedRes->assertOk()
            ->assertJson([
                'data' => [
                    'access_status' => 'None',
                    'is_unlocked' => false,
                    'video_url' => null,
                ],
            ]);

        // After unlock
        AksesProduk::create([
            'id_user' => $customer->id,
            'id_produk' => $this->courseBeginner->id,
            'status_akses' => 'Unlocked',
        ]);

        $unlockedRes = $this->getJson("/api/courses/{$this->courseBeginner->id}");
        $unlockedRes->assertOk()
            ->assertJson([
                'data' => [
                    'access_status' => 'Unlocked',
                    'is_unlocked' => true,
                    'video_url' => 'https://www.youtube.com/watch?v=electronics-101',
                ],
            ]);

        // Non-course product ID returns 404
        $wrongTypeRes = $this->getJson("/api/courses/{$this->serviceIot->id}");
        $wrongTypeRes->assertStatus(404);
    }

    public function test_can_list_filter_and_view_portofolios(): void
    {
        $listRes = $this->getJson('/api/portofolios');
        $listRes->assertOk()
            ->assertJsonCount(2, 'data');

        $filteredRes = $this->getJson('/api/portofolios?kategori=Renewable');
        $filteredRes->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['judul_proyek' => 'Sistem Monitoring PLTS']);

        $techRes = $this->getJson('/api/portofolios?teknologi=DHT22');
        $techRes->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['judul_proyek' => 'Smart Greenhouse IoT']);

        $showRes = $this->getJson("/api/portofolios/{$this->portoPlts->id}");
        $showRes->assertOk()
            ->assertJsonFragment(['judul_proyek' => 'Sistem Monitoring PLTS']);

        $notFoundRes = $this->getJson('/api/portofolios/99999');
        $notFoundRes->assertStatus(404);
    }

    public function test_services_endpoint_excludes_courses_and_digital_products(): void
    {
        $response = $this->getJson('/api/services');

        $response->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['nama_produk' => 'IoT & Electronics Prototyping'])
            ->assertJsonMissing(['nama_produk' => 'Electronics Fundamentals'])
            ->assertJsonMissing(['nama_produk' => 'Jobsheet Sensor']);

        $this->getJson("/api/services/{$this->serviceIot->id}")->assertOk();
        $this->getJson("/api/services/{$this->courseBeginner->id}")->assertStatus(404);
    }

    public function test_homepage_returns_featured_portofolios_services_and_courses(): void
    {
        $response = $this->getJson('/api/home');

        $response->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => [
                    'featured_portofolios',
                    'featured_services',
                    'featured_courses',
                ],
            ])
            ->assertJsonCount(2, 'data.featured_portofolios')
            ->assertJsonCount(1, 'data.featured_services')
            ->assertJsonCount(2, 'data.featured_courses');
    }
}
