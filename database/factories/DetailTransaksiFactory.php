<?php

namespace Database\Factories;

use App\Models\DetailTransaksi;
use App\Models\Produk;
use App\Models\Transaksi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DetailTransaksi>
 */
class DetailTransaksiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_transaksi' => Transaksi::factory(),
            'id_produk' => Produk::inRandomOrder()->first()?->id ?? 1,
            'harga_satuan' => fake()->randomElement([50000, 99000, 149000]),
        ];
    }
}
