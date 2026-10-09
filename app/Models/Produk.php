<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $fillable = ['id_kategori', 'nama_produk', 'deskripsi', 'harga', 'file_url'];

    public function kategori()
    {
        return $this->belongsTo(KategoriProduk::class, 'id_kategori');
    }
}
