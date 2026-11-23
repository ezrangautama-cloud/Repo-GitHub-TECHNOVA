<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePortofolioRequest extends FormRequest
{
    /**
     * menentukan apakah pengguna diizinkan untuk membuat permintaan ini.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * mendapatkan aturan validasi yang berlaku untuk permintaan ini.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'judul_proyek' => ['sometimes', 'required', 'string', 'max:150'],
            'kategori' => ['nullable', 'string', 'max:100'],
            'deskripsi' => ['sometimes', 'required', 'string'],
            'teknologi' => ['nullable', 'string', 'max:255'],
            'file_url' => ['nullable', 'string', 'max:500'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
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
            'judul_proyek.required' => 'Judul proyek tidak boleh kosong.',
            'deskripsi.required' => 'Deskripsi proyek tidak boleh kosong.',
            'image.image' => 'File harus berupa gambar.',
            'image.mimes' => 'Format gambar harus JPG, JPEG, PNG, atau WEBP.',
            'image.max' => 'Ukuran gambar maksimal 10 MB.',
        ];
    }
}
