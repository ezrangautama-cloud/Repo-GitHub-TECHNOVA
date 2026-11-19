<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaksis', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique();
            $table->foreignId('id_user')->constrained('users')->cascadeOnDelete();
            $table->decimal('total_harga', 15, 2)->default(0);
            $table->string('status_pembayaran')->default('pending');
            $table->string('metode_pembayaran')->nullable();
            $table->string('snap_token')->nullable();
            $table->text('snap_redirect_url')->nullable();
            $table->json('payload_midtrans')->nullable();
            $table->timestamp('tanggal_transaksi')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksis');
    }
};
