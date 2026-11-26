<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portofolio extends Model
{
    protected $fillable = [
        'judul_proyek',
        'kategori',
        'level',
        'harga',
        'deskripsi',
        'teknologi',
        'file_url',
    ];
}
