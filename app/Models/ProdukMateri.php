<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProdukMateri extends Model
{
    protected $fillable = [
        'id_produk',
        'judul_modul',
        'judul_materi',
        'deskripsi',
        'tipe',
        'konten_url',
        'durasi',
        'urutan',
        'is_preview',
    ];

    /**
     * Atribut yang di-cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'urutan' => 'integer',
            'is_preview' => 'boolean',
        ];
    }

    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'id_produk');
    }
}
