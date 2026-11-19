<?php

namespace Database\Factories;

use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Transaksi>
 */
class TransaksiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => 'TRX-'.now()->format('Ymd').'-'.strtoupper(fake()->bothify('??###')),
            'id_user' => User::factory(),
            'total_harga' => fake()->randomElement([50000, 99000, 149000, 199000, 299000]),
            'status_pembayaran' => 'pending',
            'metode_pembayaran' => fake()->randomElement(['qris', 'bank_transfer', 'gopay']),
            'snap_token' => fake()->uuid(),
            'snap_redirect_url' => fake()->url(),
            'payload_midtrans' => null,
            'tanggal_transaksi' => now(),
            'paid_at' => null,
        ];
    }

    /**
     * State untuk transaksi yang sudah sukses dibayar.
     */
    public function success(): static
    {
        return $this->state(fn (array $attributes) => [
            'status_pembayaran' => 'success',
            'paid_at' => now(),
        ]);
    }

    /**
     * State untuk transaksi yang gagal.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status_pembayaran' => 'failed',
        ]);
    }

    /**
     * State untuk transaksi yang expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'status_pembayaran' => 'expired',
        ]);
    }
}
