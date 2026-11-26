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
        Schema::create('produk_materis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_produk')->constrained('produks')->cascadeOnDelete();
            $table->string('judul_modul')->nullable();
            $table->string('judul_materi');
            $table->text('deskripsi')->nullable();
            $table->string('tipe')->default('video');
            $table->string('konten_url')->nullable();
            $table->string('durasi')->nullable();
            $table->unsignedInteger('urutan')->default(1);
            $table->boolean('is_preview')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produk_materis');
    }
};
