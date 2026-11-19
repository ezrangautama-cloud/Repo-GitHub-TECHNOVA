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
        Schema::create('pesan_leads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')->nullable()->constrained('users')->nullOnDelete();
            $table->string('nama_pengirim');
            $table->string('no_whatsapp');
            $table->text('pesan');
            $table->string('status_lead')->default('New'); // 'New', 'Follow Up', 'Closed'
            $table->string('tipe_konsultasi')->nullable(); // 'general', 'service', 'calculator_electrical', 'calculator_solar'
            $table->json('data_tambahan')->nullable();
            $table->timestamp('tanggal_pesan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesan_leads');
    }
};
