<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portofolio extends Model
{
    protected $fillable = ['judul_proyek', 'deskripsi', 'file_url'];
}
