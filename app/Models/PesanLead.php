<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PesanLead extends Model
{
    protected $fillable = [
        'kode_permintaan',
        'id_user',
        'nama_pengirim',
        'email',
        'no_whatsapp',
        'pesan',
        'status_lead',
        'admin_response',
        'responded_by',
        'responded_at',
        'tipe_konsultasi',
        'data_tambahan',
        'tanggal_pesan',
    ];

    /**
     * Atribut yang perlu di-cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'data_tambahan' => 'array',
            'tanggal_pesan' => 'datetime',
            'responded_at' => 'datetime',
        ];
    }

    /**
     * User yang mengirim pesan lead.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    /**
     * Admin yang merespons pesan lead.
     */
    public function responder(): BelongsTo
    {
        return $this->belongsTo(User::class, 'responded_by');
    }
}
