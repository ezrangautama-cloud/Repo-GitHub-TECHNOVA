<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PesanLead extends Model
{
    protected $fillable = [
        'id_user',
        'nama_pengirim',
        'no_whatsapp',
        'pesan',
        'status_lead',
        'tipe_konsultasi',
        'data_tambahan',
        'tanggal_pesan',
    ];

    /**
     * atribut yang perlu di cast
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'data_tambahan' => 'array',
            'tanggal_pesan' => 'datetime',
        ];
    }

    /**
     * get user yang mengirim pesan lead
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
