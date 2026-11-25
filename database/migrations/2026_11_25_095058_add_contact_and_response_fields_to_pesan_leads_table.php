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
        Schema::table('pesan_leads', function (Blueprint $table) {
            $table->string('kode_permintaan')->nullable()->unique()->after('id');
            $table->string('email')->nullable()->after('nama_pengirim');
            $table->string('no_whatsapp')->nullable()->change();
            $table->text('admin_response')->nullable()->after('status_lead');
            $table->foreignId('responded_by')->nullable()->after('admin_response')->constrained('users')->nullOnDelete();
            $table->timestamp('responded_at')->nullable()->after('responded_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pesan_leads', function (Blueprint $table) {
            $table->dropConstrainedForeignId('responded_by');
            $table->dropColumn(['kode_permintaan', 'email', 'admin_response', 'responded_at']);
            $table->string('no_whatsapp')->nullable(false)->change();
        });
    }
};
