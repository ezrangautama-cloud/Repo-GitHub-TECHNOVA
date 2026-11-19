<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CalculateSolarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Mempersiapkan data untuk validasi.
     */
    protected function prepareForValidation(): void
    {
        // jika diberikan input kWh, ubah menjadi Wh jika Wh tidak diset.
        if (! $this->filled('energi_harian_wh') && $this->filled('energi_harian_kwh')) {
            $this->merge([
                'energi_harian_wh' => ((float) $this->input('energi_harian_kwh')) * 1000,
            ]);
        }
    }

    /**
     * Get validation rules.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'energi_harian_wh' => ['required', 'numeric', 'min:1'],
            'energi_harian_kwh' => ['nullable', 'numeric', 'min:0.001'],
            'psh' => ['nullable', 'numeric', 'min:1', 'max:12'],
            'v_sys' => ['nullable', 'integer', 'in:12,24,48'],
            'jenis_baterai' => ['nullable', 'string', 'in:lithium,lead_acid'],
            'daya_panel_unit' => ['nullable', 'integer', 'min:50', 'max:1000'],
            'total_beban_watt' => ['nullable', 'numeric', 'min:1'],
        ];
    }

    /**
     * Pesan custom validation.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'energi_harian_wh.required' => 'Nilai konsumsi energi harian (Wh atau kWh) wajib diisi.',
            'energi_harian_wh.min' => 'Konsumsi energi harian minimal 1 Wh.',
            'v_sys.in' => 'Pilihan tegangan sistem baterai harus 12, 24, atau 48 Volt.',
            'jenis_baterai.in' => 'Jenis baterai harus berupa lithium atau lead_acid.',
        ];
    }
}
