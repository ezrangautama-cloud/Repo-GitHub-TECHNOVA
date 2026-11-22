<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CheckoutRequest extends FormRequest
{
    /**
     * Otorisasi request (autentikasi ditangani oleh middleware sanctum).
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Aturan validasi input checkout.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id_produk' => ['nullable', 'integer', 'exists:produks,id'],
            'product_ids' => ['nullable', 'array', 'min:1'],
            'product_ids.*' => ['integer', 'exists:produks,id'],
            'items' => ['nullable', 'array', 'min:1'],
            'items.*.id_produk' => ['required_with:items', 'integer', 'exists:produks,id'],
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
            'id_produk.exists' => 'Produk yang dipilih tidak ditemukan dalam katalog.',
            'product_ids.array' => 'Daftar ID produk harus berupa array.',
            'product_ids.*.exists' => 'Salah satu produk yang dipilih tidak ditemukan dalam katalog.',
            'items.*.id_produk.exists' => 'Salah satu produk dalam item tidak valid.',
        ];
    }

    /**
     * Dapatkan daftar ID produk unik dari input request (mendukung single atau multiple).
     *
     * @return array<int>
     */
    public function getProductIds(): array
    {
        $ids = [];

        if ($this->filled('id_produk')) {
            $ids[] = (int) $this->input('id_produk');
        }

        if ($this->filled('product_ids') && is_array($this->input('product_ids'))) {
            $ids = array_merge($ids, array_map('intval', $this->input('product_ids')));
        }

        if ($this->filled('items') && is_array($this->input('items'))) {
            foreach ($this->input('items') as $item) {
                if (isset($item['id_produk'])) {
                    $ids[] = (int) $item['id_produk'];
                }
            }
        }

        return array_values(array_unique($ids));
    }

    /**
     * Konfigurasi validator tambahan.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            if (empty($this->getProductIds())) {
                $validator->errors()->add('id_produk', 'Harap pilih minimal satu produk untuk di-checkout.');
            }
        });
    }
}
