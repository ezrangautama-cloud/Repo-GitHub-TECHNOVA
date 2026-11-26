<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\GoogleProvider;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class GoogleSsoTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_page_loads_and_has_google_sso_route(): void
    {
        $response = $this->get('/login');

        $response->assertOk();
    }

    public function test_redirect_to_google_returns_redirect(): void
    {
        $response = $this->get('/auth/google');

        $response->assertRedirect();
        $this->assertStringContainsString('accounts.google.com', $response->getTargetUrl());
    }

    public function test_google_callback_registers_new_user_and_logs_in(): void
    {
        $abstractUser = Mockery::mock(SocialiteUser::class);
        $abstractUser->shouldReceive('getId')->andReturn('google_unique_98765');
        $abstractUser->shouldReceive('getName')->andReturn('Peserta Baru TECHNOVA');
        $abstractUser->shouldReceive('getEmail')->andReturn('peserta.baru@technova.id');
        $abstractUser->shouldReceive('getAvatar')->andReturn('https://google.com/avatar.png');

        $provider = Mockery::mock(GoogleProvider::class);
        $provider->shouldReceive('user')->andReturn($abstractUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get('/auth/google/callback');

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('users', [
            'email' => 'peserta.baru@technova.id',
            'google_id' => 'google_unique_98765',
            'role' => 'Customer',
        ]);

        $this->assertTrue(Auth::check());
        $this->assertEquals('peserta.baru@technova.id', Auth::user()->email);
    }

    public function test_google_callback_updates_existing_user_by_email(): void
    {
        $existing = User::create([
            'name' => 'Existing User',
            'email' => 'existing@technova.id',
            'password' => bcrypt('password123'),
            'role' => 'Admin',
        ]);

        $abstractUser = Mockery::mock(SocialiteUser::class);
        $abstractUser->shouldReceive('getId')->andReturn('google_existing_111');
        $abstractUser->shouldReceive('getName')->andReturn('Existing User Updated');
        $abstractUser->shouldReceive('getEmail')->andReturn('existing@technova.id');
        $abstractUser->shouldReceive('getAvatar')->andReturn('https://google.com/avatar_new.png');

        $provider = Mockery::mock(GoogleProvider::class);
        $provider->shouldReceive('user')->andReturn($abstractUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get('/auth/google/callback');

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('users', [
            'id' => $existing->id,
            'email' => 'existing@technova.id',
            'google_id' => 'google_existing_111',
            'avatar' => 'https://google.com/avatar_new.png',
        ]);

        $this->assertTrue(Auth::check());
        $this->assertEquals($existing->id, Auth::id());
    }
}
