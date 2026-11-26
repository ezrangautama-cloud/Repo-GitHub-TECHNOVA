<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CalculateLedResistorRequest extends FormRequest
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
            'supply_voltage' => ['required', 'numeric', 'min:0.1', 'max:1000', 'gt:led_forward_voltage'],
            'led_forward_voltage' => ['required', 'numeric', 'min:0.1', 'max:100'],
            'led_current_ma' => ['required', 'numeric', 'min:0.1', 'max:5000'],
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
            'supply_voltage.required' => 'Tegangan sumber (Vs) wajib diisi.',
            'supply_voltage.numeric' => 'Tegangan sumber (Vs) harus berupa angka.',
            'supply_voltage.gt' => 'Tegangan sumber (Vs) harus lebih besar daripada tegangan maju LED (Vf).',
            'led_forward_voltage.required' => 'Tegangan maju LED (Vf) wajib diisi.',
            'led_forward_voltage.numeric' => 'Tegangan maju LED (Vf) harus berupa angka.',
            'led_forward_voltage.min' => 'Tegangan maju LED (Vf) minimal 0.1 Volt.',
            'led_current_ma.required' => 'Arus kerja LED (If) wajib diisi.',
            'led_current_ma.numeric' => 'Arus kerja LED (If) harus berupa angka.',
            'led_current_ma.min' => 'Arus kerja LED (If) minimal 0.1 mA.',
        ];
    }
}
