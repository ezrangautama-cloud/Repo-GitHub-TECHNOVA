<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Produk extends Model
{
    protected $fillable = [
        'id_kategori',
        'nama_produk',
        'level',
        'format',
        'deskripsi',
        'manfaat',
        'yang_didapatkan',
        'persyaratan',
        'harga',
        'file_url',
        'thumbnail_url',
    ];

    /**
     * Atribut yang di-cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'manfaat' => 'array',
            'yang_didapatkan' => 'array',
        ];
    }

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(KategoriProduk::class, 'id_kategori');
    }

    public function aksesProduks(): HasMany
    {
        return $this->hasMany(AksesProduk::class, 'id_produk');
    }

    public function detailTransaksis(): HasMany
    {
        return $this->hasMany(DetailTransaksi::class, 'id_produk');
    }

    public function materis(): HasMany
    {
        return $this->hasMany(ProdukMateri::class, 'id_produk')->orderBy('urutan');
    }
}
