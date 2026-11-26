<?php

namespace App\Models;

use Database\Factories\TransaksiFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaksi extends Model
{
    /** @use HasFactory<TransaksiFactory> */
    use HasFactory;

    protected $fillable = [
        'order_id',
        'id_user',
        'total_harga',
        'status_pembayaran',
        'metode_pembayaran',
        'snap_token',
        'snap_redirect_url',
        'payload_midtrans',
        'tanggal_transaksi',
        'expired_at',
        'paid_at',
    ];

    /**
     * Atribut yang di-cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'total_harga' => 'decimal:2',
            'payload_midtrans' => 'array',
            'tanggal_transaksi' => 'datetime',
            'expired_at' => 'datetime',
            'paid_at' => 'datetime',
        ];
    }

    /**
     * User yang melakukan transaksi.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    /**
     * Item detail yang dibeli dalam transaksi ini.
     */
    public function detailTransaksis(): HasMany
    {
        return $this->hasMany(DetailTransaksi::class, 'id_transaksi');
    }

    /**
     * Cek apakah status pembayaran masih pending.
     */
    public function isPending(): bool
    {
        return $this->status_pembayaran === 'pending';
    }

    /**
     * Cek apakah pembayaran sudah berhasil/selesai.
     */
    public function isSuccess(): bool
    {
        return in_array($this->status_pembayaran, ['success', 'settlement', 'capture'], true);
    }

    /**
     * Cek apakah transaksi gagal, kedaluwarsa, atau dibatalkan.
     */
    public function isFailed(): bool
    {
        return in_array($this->status_pembayaran, ['failed', 'expire', 'expired', 'cancel', 'cancelled', 'deny'], true);
    }
}
