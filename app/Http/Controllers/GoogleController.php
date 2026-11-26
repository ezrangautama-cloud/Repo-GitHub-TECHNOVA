<?php

namespace App\Http\Controllers;

use App\Jobs\KirimEmailSelamatDatang;
use App\Models\User;
use App\Notifications\UserBaruNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    /**
     * Arahkan user ke halaman login Google OAuth.
     */
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Google mengembalikan user ke callback setelah login berhasil.
     */
    public function callback(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable $e) {
            return redirect()->route('login')
                ->with('error', 'Login dengan Google gagal atau dibatalkan. Silakan coba lagi.');
        }

        // Cari user berdasarkan google_id atau email jika sebelumnya sudah terdaftar
        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $googleUser->getEmail())
            ->first();

        $userBaru = false;

        if (! $user) {
            // Pengguna baru -> buat akun
            $user = User::create([
                'name'              => $googleUser->getName(),
                'email'             => $googleUser->getEmail(),
                'google_id'         => $googleUser->getId(),
                'avatar'            => $googleUser->getAvatar(),
                'email_verified_at' => now(),
                'role'              => 'Customer',
            ]);
            $userBaru = true;
        } else {
            // Sudah terdaftar -> update google_id dan avatar
            $user->update([
                'google_id' => $googleUser->getId(),
                'avatar'    => $googleUser->getAvatar(),
            ]);
        }

        // Autentikasikan pengguna ke sesi Laravel
        Auth::login($user, remember: true);
        $request->session()->regenerate();

        // Khusus user baru: kirim email selamat datang & notifikasi admin
        if ($userBaru) {
            try {
                KirimEmailSelamatDatang::dispatch($user);

                $admin = User::where('role', 'Admin')->first();
                $admin?->notify(new UserBaruNotification($user));
            } catch (\Throwable $th) {
                // Abaikan error queue/mail pada mode lokal/dev
            }
        }

        return redirect()->intended(route('dashboard'))
            ->with('success', 'Selamat datang, ' . $user->name . '!');
    }
}
