<?php

namespace Tests\Feature\Api;

use App\Models\AksesProduk;
use App\Models\KategoriProduk;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_as_customer_and_receive_token(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Siti Rahmawati',
            'email' => 'siti@technova.id',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'no_whatsapp' => '081234567890',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'data' => [
                    'user' => ['id', 'name', 'email', 'role', 'no_whatsapp'],
                    'token',
                    'token_type',
                ],
            ])
            ->assertJson([
                'data' => [
                    'user' => [
                        'name' => 'Siti Rahmawati',
                        'email' => 'siti@technova.id',
                        'role' => 'Customer',
                    ],
                    'token_type' => 'Bearer',
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'siti@technova.id',
            'role' => 'Customer',
        ]);
    }

    public function test_register_rejects_duplicate_email(): void
    {
        User::factory()->create([
            'email' => 'duplicate@technova.id',
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'User Lain',
            'email' => 'duplicate@technova.id',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_user_and_admin_can_login_with_email_or_username(): void
    {
        User::factory()->create([
            'name' => 'MahasiswaUji',
            'email' => 'mhs@technova.id',
            'password' => bcrypt('secret123'),
            'role' => 'Customer',
        ]);

        User::factory()->create([
            'name' => 'AdminUtama',
            'email' => 'admin@technova.id',
            'password' => bcrypt('admin123'),
            'role' => 'Admin',
        ]);

        // Login with email
        $resEmail = $this->postJson('/api/login', [
            'email' => 'mhs@technova.id',
            'password' => 'secret123',
        ]);

        $resEmail->assertOk()
            ->assertJson([
                'data' => [
                    'role' => 'Customer',
                    'is_admin' => false,
                    'token_type' => 'Bearer',
                ],
            ]);

        // Login with username field
        $resUsername = $this->postJson('/api/login', [
            'username' => 'AdminUtama',
            'password' => 'admin123',
        ]);

        $resUsername->assertOk()
            ->assertJson([
                'data' => [
                    'role' => 'Admin',
                    'is_admin' => true,
                    'token_type' => 'Bearer',
                ],
            ]);
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'valid@technova.id',
            'password' => bcrypt('correct-password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'valid@technova.id',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'message' => 'Email/username atau password salah.',
            ]);
    }

    public function test_authenticated_user_can_get_profile_and_logout(): void
    {
        $user = User::factory()->create([
            'email' => 'profile@technova.id',
            'password' => bcrypt('password123'),
            'role' => 'Customer',
        ]);

        $token = $user->createToken('test_token')->plainTextToken;

        $meResponse = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/me');

        $meResponse->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $user->id,
                    'email' => 'profile@technova.id',
                    'role' => 'Customer',
                    'is_admin' => false,
                    'unlocked_products_count' => 0,
                    'transactions_count' => 0,
                ],
            ]);

        $logoutResponse = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/logout');

        $logoutResponse->assertOk()
            ->assertJson(['message' => 'Logout berhasil.']);

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

    public function test_authenticated_user_can_view_my_contents(): void
    {
        $user = User::factory()->create(['role' => 'Customer']);

        $katCourses = KategoriProduk::create(['nama_kategori' => 'Courses']);
        $katDigital = KategoriProduk::create(['nama_kategori' => 'Digital Products']);

        $unlockedCourse = Produk::create([
            'id_kategori' => $katCourses->id,
            'nama_produk' => 'ESP32 for IoT',
            'level' => 'BEGINNER',
            'format' => 'Video + Project',
            'deskripsi' => 'Belajar ESP32.',
            'harga' => 149000,
            'file_url' => 'https://www.youtube.com/watch?v=esp32-course',
        ]);

        $lockedCourse = Produk::create([
            'id_kategori' => $katCourses->id,
            'nama_produk' => 'Solar PV Fundamentals',
            'level' => 'BEGINNER',
            'format' => 'Video + Workbook',
            'deskripsi' => 'Belajar PLTS.',
            'harga' => 149000,
            'file_url' => 'https://www.youtube.com/watch?v=solar-course',
        ]);

        $unlockedDigital = Produk::create([
            'id_kategori' => $katDigital->id,
            'nama_produk' => 'Modul Praktikum IoT',
            'level' => 'BEGINNER',
            'format' => 'PDF + Code',
            'deskripsi' => 'Modul praktikum.',
            'harga' => 49000,
            'file_url' => 'digital-products/modul-iot.zip',
        ]);

        AksesProduk::create([
            'id_user' => $user->id,
            'id_produk' => $unlockedCourse->id,
            'status_akses' => 'Unlocked',
        ]);

        AksesProduk::create([
            'id_user' => $user->id,
            'id_produk' => $lockedCourse->id,
            'status_akses' => 'Locked',
        ]);

        AksesProduk::create([
            'id_user' => $user->id,
            'id_produk' => $unlockedDigital->id,
            'status_akses' => 'Unlocked',
        ]);

        Transaksi::factory()->create([
            'id_user' => $user->id,
            'status_pembayaran' => 'settlement',
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/my-contents');

        $response->assertOk()
            ->assertJson([
                'data' => [
                    'summary' => [
                        'courses_count' => 1,
                        'digital_products_count' => 1,
                        'total_unlocked' => 2,
                    ],
                ],
            ])
            ->assertJsonFragment([
                'nama_produk' => 'ESP32 for IoT',
                'video_url' => 'https://www.youtube.com/watch?v=esp32-course',
            ])
            ->assertJsonFragment([
                'nama_produk' => 'Modul Praktikum IoT',
            ])
            ->assertJsonMissing([
                'nama_produk' => 'Solar PV Fundamentals',
            ]);
    }
}
