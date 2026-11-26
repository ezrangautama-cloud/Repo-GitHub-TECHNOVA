<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePortofolioRequest extends FormRequest
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
            'judul_proyek' => ['sometimes', 'required', 'string', 'max:150'],
            'kategori' => ['nullable', 'string', 'max:100'],
            'level' => ['nullable', 'string', 'max:100'],
            'harga' => ['nullable', 'numeric', 'min:0'],
            'deskripsi' => ['sometimes', 'required', 'string'],
            'teknologi' => ['nullable', 'string', 'max:255'],
            'file_url' => ['nullable', 'string', 'max:500'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
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
            'judul_proyek.required' => 'Judul proyek tidak boleh kosong.',
            'deskripsi.required' => 'Deskripsi proyek tidak boleh kosong.',
            'harga.numeric' => 'Harga proyek harus berupa angka.',
            'image.image' => 'File harus berupa gambar.',
            'image.mimes' => 'Format gambar harus JPG, JPEG, PNG, atau WEBP.',
            'image.max' => 'Ukuran gambar maksimal 10 MB.',
        ];
    }
}
