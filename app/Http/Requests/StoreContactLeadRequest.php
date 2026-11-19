<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactLeadRequest extends FormRequest
{
    /**
     * autorisasi
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * validasi
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_pengirim' => ['required', 'string', 'min:2', 'max:100'],
            'no_whatsapp' => ['required', 'string', 'min:8', 'max:20'],
            'pesan' => ['required', 'string', 'min:3', 'max:2500'],
            'tipe_konsultasi' => ['nullable', 'string', 'in:general,service,calculator_electrical,calculator_solar'],
            'service_id' => ['nullable', 'integer', 'exists:produks,id'],
            'service_name' => ['nullable', 'string', 'max:150'],
            'calculator_data' => ['nullable', 'array'],
        ];
    }

    /**
     * pesan validation custom
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nama_pengirim.required' => 'Nama lengkap pengirim wajib diisi.',
            'nama_pengirim.min' => 'Nama pengirim minimal 2 karakter.',
            'no_whatsapp.required' => 'Nomor WhatsApp wajib diisi.',
            'no_whatsapp.min' => 'Nomor WhatsApp minimal 8 digit.',
            'pesan.required' => 'Pesan atau pertanyaan konsultasi wajib diisi.',
            'pesan.min' => 'Pesan minimal 3 karakter.',
            'tipe_konsultasi.in' => 'Tipe konsultasi tidak valid.',
            'service_id.exists' => 'Layanan yang dipilih tidak terdaftar di sistem.',
        ];
    }
}
