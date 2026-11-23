<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * menentukan apakah pengguna diizinkan untuk membuat permintaan ini.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * menyiapkan data untuk validasi.
     */
    protected function prepareForValidation(): void
    {
        if (! $this->filled('email') && $this->filled('username')) {
            $this->merge([
                'login_identifier' => (string) $this->input('username'),
            ]);
        } elseif ($this->filled('email')) {
            $this->merge([
                'login_identifier' => (string) $this->input('email'),
            ]);
        }
    }

    /**
     * Get aturan validation yang berlaku untuk permintaan ini.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required_without:username', 'nullable', 'string', 'max:150'],
            'username' => ['required_without:email', 'nullable', 'string', 'max:150'],
            'login_identifier' => ['nullable', 'string', 'max:150'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * pesan validasi kustom.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.required_without' => 'Email atau username wajib diisi.',
            'username.required_without' => 'Email atau username wajib diisi.',
            'password.required' => 'Password wajib diisi.',
        ];
    }

    /**
     * mendapatkan identifier login yang dinormalisasi (email atau username).
     */
    public function getLoginIdentifier(): string
    {
        return (string) ($this->input('login_identifier') ?? $this->input('email') ?? $this->input('username') ?? '');
    }
}
