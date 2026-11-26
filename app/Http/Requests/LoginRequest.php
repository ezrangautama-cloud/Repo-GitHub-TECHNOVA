<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
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
     * Get the validation rules that apply to the request.
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
            'login_as' => ['nullable', 'string', 'in:customer,peserta,admin'],
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
            'email.required_without' => 'Email atau username wajib diisi.',
            'username.required_without' => 'Email atau username wajib diisi.',
            'password.required' => 'Password wajib diisi.',
            'login_as.in' => 'Tipe login harus berupa customer, peserta, atau admin.',
        ];
    }

    /**
     * Get the normalized login identifier (email or username).
     */
    public function getLoginIdentifier(): string
    {
        return (string) ($this->input('login_identifier') ?? $this->input('email') ?? $this->input('username') ?? '');
    }
}
