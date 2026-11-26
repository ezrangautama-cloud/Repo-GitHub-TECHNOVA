<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id_kategori' => ['sometimes', 'required', 'integer', 'exists:kategori_produks,id'],
            'nama_produk' => ['sometimes', 'required', 'string', 'max:150'],
            'level' => ['nullable', 'string', 'max:100'],
            'format' => ['nullable', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
            'manfaat' => ['nullable', 'array'],
            'manfaat.*' => ['string', 'max:255'],
            'yang_didapatkan' => ['nullable', 'array'],
            'yang_didapatkan.*' => ['string', 'max:255'],
            'persyaratan' => ['nullable', 'string'],
            'harga' => ['sometimes', 'required', 'numeric', 'min:0'],
            'file_url' => ['nullable', 'string', 'max:500'],
            'thumbnail_url' => ['nullable', 'string', 'max:500'],
            'file' => ['nullable', 'file', 'mimes:pdf,zip,rar,slx,doc,docx,csv,txt', 'max:51200'],
        ];
    }

    /**
     * Custom validation messages in Indonesian.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'id_kategori.exists' => 'Kategori produk tidak ditemukan.',
            'nama_produk.required' => 'Nama produk/kursus tidak boleh kosong.',
            'harga.numeric' => 'Harga harus berupa angka.',
            'harga.min' => 'Harga minimal 0.',
            'file.mimes' => 'Format file harus berupa PDF, ZIP, RAR, SLX, DOC/DOCX, CSV, atau TXT.',
            'file.max' => 'Ukuran file maksimal 50 MB.',
        ];
    }
}
