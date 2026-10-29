<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin
        User::updateOrCreate(
            ['email' => 'admin@technova.id'],
            [
                'name' => 'Admin Technova',
                'password' => Hash::make('password'),
                'role' => 'Admin',
                'no_whatsapp' => '081234567890',
            ]
        );

        // Customer
        User::updateOrCreate(
            ['email' => 'user@technova.id'],
            [
                'name' => 'Mahasiswa Teknik',
                'password' => Hash::make('password'),
                'role' => 'Customer',
                'no_whatsapp' => '089876543210',
            ]
        );
    }
}
