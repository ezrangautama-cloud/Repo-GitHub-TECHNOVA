<?php

namespace App\Services;

use App\Models\AksesProduk;
use App\Models\DetailTransaksi;
use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use RuntimeException;

class MidtransService
{
    /**
     * Dapatkan server key dari konfigurasi.
     */
    public function getServerKey(): string
    {
        return (string) config('midtrans.server_key', '');
    }

    /**
     * Dapatkan URL endpoint Snap API.
     */
    public function getSnapUrl(): string
    {
        return (string) config(
            'midtrans.snap_url',
            config('midtrans.is_production', false)
                ? 'https://app.midtrans.com/snap/v1/transactions'
                : 'https://app.sandbox.midtrans.com/snap/v1/transactions'
        );
    }

    /**
     * Dapatkan URL endpoint API status transaksi (Core API).
     */
    public function getApiBaseUrl(): string
    {
        return (string) config(
            'midtrans.api_url',
            config('midtrans.is_production', false)
                ? 'https://api.midtrans.com'
                : 'https://api.sandbox.midtrans.com'
        );
    }

    /**
     * Buat Snap Transaction token untuk model Transaksi yang diberikan.
     *
     * @return array{token: string, redirect_url: string}
     *
     * @throws RuntimeException
     */
    public function createSnapTransaction(Transaksi $transaksi, ?string $preferredMethod = null): array
    {
        $serverKey = $this->getServerKey();

        if (empty($serverKey)) {
            Log::warning('Midtrans server key is empty. Snap transaction cannot be initialized properly.');
        }

        $transaksi->loadMissing(['user', 'detailTransaksis.produk']);

        $itemDetails = $transaksi->detailTransaksis->map(function (DetailTransaksi $detail): array {
            $productName = $detail->produk?->nama_produk ?? 'Produk #'.$detail->id_produk;

            return [
                'id' => (string) $detail->id_produk,
                'price' => (int) round((float) $detail->harga_satuan),
                'quantity' => 1,
                'name' => Str::limit($productName, 45),
            ];
        })->values()->all();

        $grossAmount = (int) round((float) $transaksi->total_harga);

        $customerDetails = [
            'first_name' => $transaksi->user?->name ?? 'Customer',
            'email' => $transaksi->user?->email ?? '',
            'phone' => $transaksi->user?->no_whatsapp ?? '',
        ];

        $payload = [
            'transaction_details' => [
                'order_id' => $transaksi->order_id,
                'gross_amount' => $grossAmount,
            ],
            'item_details' => $itemDetails,
            'customer_details' => $customerDetails,
        ];

        if ($preferredMethod === 'qris') {
            $payload['enabled_payments'] = ['other_qris', 'gopay', 'shopeepay'];
        } elseif ($preferredMethod === 'bank_transfer') {
            $payload['enabled_payments'] = ['bca_va', 'bni_va', 'bri_va', 'permata_va', 'echannel', 'cimb_va'];
        }

        $response = Http::withHeaders([
            'Authorization' => 'Basic '.base64_encode($serverKey.':'),
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])
            ->connectTimeout(5)
            ->timeout(15)
            ->post($this->getSnapUrl(), $payload);

        if ($response->failed()) {
            Log::error('Gagal membuat transaksi Midtrans Snap', [
                'order_id' => $transaksi->order_id,
                'status' => $response->status(),
                'response' => $response->body(),
            ]);

            throw new RuntimeException('Midtrans Snap error: '.$response->body(), $response->status());
        }

        $result = $response->json();
        $token = (string) ($result['token'] ?? '');
        $redirectUrl = (string) ($result['redirect_url'] ?? '');

        $transaksi->update([
            'snap_token' => $token,
            'snap_redirect_url' => $redirectUrl,
        ]);

        return [
            'token' => $token,
            'redirect_url' => $redirectUrl,
        ];
    }

    /**
     * Verifikasi signature key webhook Midtrans (SHA-512).
     */
    public function verifySignature(string $orderId, string $statusCode, string $grossAmount, string $signatureKey): bool
    {
        $keys = array_filter(array_unique([
            $this->getServerKey(),
            (string) config('midtrans.production_server_key', ''),
            (string) env('MIDTRANS_PRODUCTION_SERVER_KEY', ''),
        ]));

        foreach ($keys as $key) {
            $expectedSignature = hash('sha512', $orderId.$statusCode.$grossAmount.$key);

            if (hash_equals($expectedSignature, $signatureKey)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Terjemahkan status transaksi Midtrans ke status aplikasi TECHNOVA.
     */
    public function mapTransactionStatus(string $transactionStatus, ?string $fraudStatus = null): string
    {
        return match ($transactionStatus) {
            'capture' => ($fraudStatus === 'challenge') ? 'challenge' : 'success',
            'settlement' => 'success',
            'pending' => 'pending',
            'deny' => 'failed',
            'expire', 'expired' => 'expired',
            'cancel', 'cancelled' => 'cancelled',
            default => 'pending',
        };
    }

    /**
     * Proses payload notifikasi webhook dari Midtrans dan lakukan auto-unlock akses konten.
     *
     * @param  array<string, mixed>  $payload
     *
     * @throws RuntimeException
     */
    public function handleNotification(array $payload): Transaksi
    {
        $orderId = (string) ($payload['order_id'] ?? '');
        $statusCode = (string) ($payload['status_code'] ?? '');
        $grossAmount = (string) ($payload['gross_amount'] ?? '');
        $signatureKey = (string) ($payload['signature_key'] ?? '');

        if (! $this->verifySignature($orderId, $statusCode, $grossAmount, $signatureKey)) {
            Log::warning('Midtrans webhook invalid signature', [
                'order_id' => $orderId,
                'signature_key' => $signatureKey,
            ]);

            throw new RuntimeException('Invalid Midtrans notification signature.');
        }

        $transaksi = Transaksi::with(['detailTransaksis.produk'])
            ->where('order_id', $orderId)
            ->first();

        if ($transaksi === null) {
            Log::warning('Midtrans webhook: transaksi tidak ditemukan', ['order_id' => $orderId]);
            throw new RuntimeException("Transaksi dengan order_id '{$orderId}' tidak ditemukan.");
        }

        $transactionStatus = (string) ($payload['transaction_status'] ?? '');
        $fraudStatus = isset($payload['fraud_status']) ? (string) $payload['fraud_status'] : null;
        $paymentType = isset($payload['payment_type']) ? (string) $payload['payment_type'] : null;

        $newStatus = $this->mapTransactionStatus($transactionStatus, $fraudStatus);

        DB::transaction(function () use ($transaksi, $newStatus, $paymentType, $payload): void {
            $updateData = [
                'status_pembayaran' => $newStatus,
                'payload_midtrans' => $payload,
            ];

            if ($paymentType !== null) {
                $updateData['metode_pembayaran'] = $paymentType;
            }

            if ($newStatus === 'success') {
                $updateData['paid_at'] = now();

                // Auto-unlock akses konten untuk setiap produk dalam detail transaksi
                foreach ($transaksi->detailTransaksis as $detail) {
                    AksesProduk::updateOrCreate(
                        [
                            'id_user' => $transaksi->id_user,
                            'id_produk' => $detail->id_produk,
                        ],
                        [
                            'status_akses' => 'Unlocked',
                        ]
                    );
                }
            }

            $transaksi->update($updateData);
        });

        return $transaksi->fresh(['detailTransaksis.produk']);
    }

    /**
     * Cek status transaksi langsung ke server Midtrans (Core API).
     *
     * @return array<string, mixed>
     */
    public function checkTransactionStatus(string $orderId): array
    {
        $serverKey = $this->getServerKey();
        $url = rtrim($this->getApiBaseUrl(), '/').'/v2/'.$orderId.'/status';

        $response = Http::withHeaders([
            'Authorization' => 'Basic '.base64_encode($serverKey.':'),
            'Accept' => 'application/json',
        ])
            ->connectTimeout(5)
            ->timeout(10)
            ->get($url);

        return $response->json() ?? [];
    }

    /**
     * Sinkronisasi status transaksi langsung dari Midtrans Core API dan buka akses bila sukses.
     */
    public function syncTransactionStatus(Transaksi $transaksi): Transaksi
    {
        $statusPayload = $this->checkTransactionStatus($transaksi->order_id);

        if (isset($statusPayload['transaction_status'])) {
            $transactionStatus = (string) $statusPayload['transaction_status'];
            $fraudStatus = isset($statusPayload['fraud_status']) ? (string) $statusPayload['fraud_status'] : null;
            $paymentType = isset($statusPayload['payment_type']) ? (string) $statusPayload['payment_type'] : null;

            $newStatus = $this->mapTransactionStatus($transactionStatus, $fraudStatus);

            DB::transaction(function () use ($transaksi, $newStatus, $paymentType, $statusPayload): void {
                $updateData = [
                    'status_pembayaran' => $newStatus,
                    'payload_midtrans' => $statusPayload,
                ];

                if ($paymentType !== null) {
                    $updateData['metode_pembayaran'] = $paymentType;
                }

                if ($newStatus === 'success') {
                    $updateData['paid_at'] = $transaksi->paid_at ?? now();

                    $transaksi->loadMissing('detailTransaksis');
                    foreach ($transaksi->detailTransaksis as $detail) {
                        AksesProduk::updateOrCreate(
                            [
                                'id_user' => $transaksi->id_user,
                                'id_produk' => $detail->id_produk,
                            ],
                            [
                                'status_akses' => 'Unlocked',
                            ]
                        );
                    }
                }

                $transaksi->update($updateData);
            });
        }

        return $transaksi->fresh(['user:id,name,email,no_whatsapp', 'detailTransaksis.produk.kategori', 'detailTransaksis.produk.materis']);
    }
}
