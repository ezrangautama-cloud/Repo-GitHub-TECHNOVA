<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'id_kategori' => ['required', 'integer', 'exists:kategori_produks,id'],
            'nama_produk' => ['required', 'string', 'max:150'],
            'level' => ['nullable', 'string', 'max:100'],
            'format' => ['nullable', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
            'harga' => ['required', 'numeric', 'min:0'],
            'file_url' => ['nullable', 'string', 'max:500'],
            'file' => ['nullable', 'file', 'mimes:pdf,zip,rar,slx,doc,docx,csv,txt', 'max:51200'],
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
            'id_kategori.required' => 'Kategori produk wajib dipilih.',
            'id_kategori.exists' => 'Kategori produk tidak ditemukan.',
            'nama_produk.required' => 'Nama produk/kursus wajib diisi.',
            'harga.required' => 'Harga produk/kursus wajib diisi.',
            'harga.numeric' => 'Harga harus berupa angka.',
            'harga.min' => 'Harga minimal 0.',
            'file.mimes' => 'Format file harus berupa PDF, ZIP, RAR, SLX, DOC/DOCX, CSV, atau TXT.',
            'file.max' => 'Ukuran file maksimal 50 MB.',
        ];
    }
}
