<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CalculateElectricalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'appliances' => ['required', 'array', 'min:1'],
            'appliances.*.nama_alat' => ['nullable', 'string', 'max:100'],
            'appliances.*.daya_watt' => ['required', 'numeric', 'min:0.1', 'max:100000'],
            'appliances.*.jumlah' => ['nullable', 'integer', 'min:1', 'max:1000'],
            'appliances.*.durasi_jam' => ['nullable', 'numeric', 'min:0.1', 'max:24'],
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
            'appliances.required' => 'Daftar peralatan listrik wajib diisi.',
            'appliances.array' => 'Format daftar peralatan listrik harus berupa array.',
            'appliances.min' => 'Minimal masukkan 1 peralatan listrik.',
            'appliances.*.daya_watt.required' => 'Daya listrik peralatan (Watt) wajib diisi.',
            'appliances.*.daya_watt.numeric' => 'Daya listrik harus berupa angka.',
            'appliances.*.daya_watt.min' => 'Daya listrik minimal 0.1 Watt.',
            'appliances.*.jumlah.integer' => 'Jumlah unit harus berupa bilangan bulat.',
            'appliances.*.durasi_jam.max' => 'Durasi pemakaian harian maksimal 24 jam.',
        ];
    }
}
