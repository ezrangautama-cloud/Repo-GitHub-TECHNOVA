<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactLeadRequest extends FormRequest
{
    /**
     * Autorisasi request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Siapkan alias field dari form Figma (nama, konteks_proyek) sebelum validasi.
     */
    protected function prepareForValidation(): void
    {
        $merges = [];

        if (! $this->filled('nama_pengirim') && $this->filled('nama')) {
            $merges['nama_pengirim'] = (string) $this->input('nama');
        }

        if (! $this->filled('pesan') && $this->filled('konteks_proyek')) {
            $merges['pesan'] = (string) $this->input('konteks_proyek');
        }

        if (! empty($merges)) {
            $this->merge($merges);
        }
    }

    /**
     * Aturan validasi input form kontak & konsultasi.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_pengirim' => ['required', 'string', 'min:2', 'max:100'],
            'email' => ['required_without:no_whatsapp', 'nullable', 'email', 'max:150'],
            'no_whatsapp' => ['required_without:email', 'nullable', 'string', 'min:8', 'max:20'],
            'pesan' => ['required', 'string', 'min:3', 'max:2500'],
            'jenis_pertanyaan' => ['nullable', 'string', 'max:150'],
            'tipe_konsultasi' => ['nullable', 'string', 'in:general,service,calculator_electrical,calculator_solar'],
            'service_id' => ['nullable', 'integer', 'exists:produks,id'],
            'service_name' => ['nullable', 'string', 'max:150'],
            'calculator_data' => ['nullable', 'array'],
        ];
    }

    /**
     * Pesan validasi khusus bahasa Indonesia.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nama_pengirim.required' => 'Nama lengkap pengirim wajib diisi.',
            'nama_pengirim.min' => 'Nama pengirim minimal 2 karakter.',
            'email.required_without' => 'Email atau nomor WhatsApp wajib diisi.',
            'email.email' => 'Format alamat email tidak valid.',
            'no_whatsapp.required_without' => 'Nomor WhatsApp atau email wajib diisi.',
            'no_whatsapp.min' => 'Nomor WhatsApp minimal 8 digit.',
            'pesan.required' => 'Pesan atau pertanyaan konsultasi wajib diisi.',
            'pesan.min' => 'Pesan minimal 3 karakter.',
            'tipe_konsultasi.in' => 'Tipe konsultasi tidak valid.',
            'service_id.exists' => 'Layanan yang dipilih tidak terdaftar di sistem.',
        ];
    }
}
