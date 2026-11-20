<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'role', 'no_whatsapp'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * menentukan apakah user adalah administrator.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'Admin';
    }

    /**
     * menentukan apakah user adalah customer.
     */
    public function isCustomer(): bool
    {
        return $this->role === 'Customer';
    }

    /**
     * product access untuk user.
     */
    public function aksesProduks()
    {
        return $this->hasMany(AksesProduk::class, 'id_user');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
