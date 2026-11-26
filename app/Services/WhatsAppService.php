<?php

namespace App\Services;

class WhatsAppService
{
    /**
     * normalisasi nomor telepon Indonesia ke dalam format internasional WhatsApp (misalnya 6281234567890).
     */
    public function normalizePhoneNumber(string $number): string
    {
        // menghilangkan karakter non-digit
        $clean = preg_replace('/[^\d]/', '', $number) ?? '';

        if (str_starts_with($clean, '0')) {
            $clean = '62'.substr($clean, 1);
        } elseif (str_starts_with($clean, '8')) {
            $clean = '62'.$clean;
        }

        return $clean;
    }

    /**
     * Get default TECHNOVA admin WhatsApp number.
     */
    public function getTargetNumber(): string
    {
        $target = (string) config('services.whatsapp.target_number', '6281234567890');

        return $this->normalizePhoneNumber($target);
    }

    /**
     * Build official WhatsApp URL.
     */
    public function buildWhatsAppUrl(string $message, ?string $recipientNumber = null): string
    {
        $destination = $recipientNumber !== null
            ? $this->normalizePhoneNumber($recipientNumber)
            : $this->getTargetNumber();

        return 'https://wa.me/'.$destination.'?text='.rawurlencode($message);
    }

    /**
     * Format pesan konsultasi berdasarkan tipe konsultasi dan data tambahan.
     *
     * @param  array<string, mixed>|null  $dataTambahan
     */
    public function generateFormattedMessage(
        string $tipeKonsultasi,
        string $nama,
        string $pesan,
        ?array $dataTambahan = null
    ): string {
        return match ($tipeKonsultasi) {
            'service' => $this->formatServiceMessage($nama, $pesan, $dataTambahan),
            'calculator_electrical' => $this->formatElectricalCalculatorMessage($nama, $pesan, $dataTambahan),
            'calculator_solar' => $this->formatSolarCalculatorMessage($nama, $pesan, $dataTambahan),
            default => $this->formatGeneralMessage($nama, $pesan),
        };
    }

    /**
     * format pesan umum.
     */
    public function formatGeneralMessage(string $nama, string $pesan): string
    {
        $lines = [
            "Halo TECHNOVA, nama saya {$nama}.",
            '',
            'Pesan / Pertanyaan:',
            $pesan,
        ];

        return implode("\n", $lines);
    }

    /**
     * format pesan konsultasi mengenai layanan.
     *
     * @param  array<string, mixed>|null  $data
     */
    public function formatServiceMessage(string $nama, string $pesan, ?array $data = null): string
    {
        $serviceName = (string) ($data['service_name'] ?? 'Layanan Rekayasa Teknik');

        $lines = [
            "Halo TECHNOVA, nama saya {$nama}.",
            "Saya tertarik dan ingin berkonsultasi mengenai layanan: *{$serviceName}*.",
            '',
            'Kebutuhan / Detail Proyek:',
            $pesan,
        ];

        return implode("\n", $lines);
    }

    /**
     * Format pesan konsultasi mengenai kalkulator elektrik.
     *
     * @param  array<string, mixed>|null  $data
     */
    public function formatElectricalCalculatorMessage(string $nama, string $pesan, ?array $data = null): string
    {
        $totalWatt = $data['total_daya_watt'] ?? '-';
        $dailyKwh = $data['energi_harian_kwh'] ?? '-';
        $pln = $data['rekomendasi_pln'] ?? '-';

        $lines = [
            "Halo TECHNOVA, nama saya {$nama}.",
            'Saya ingin berkonsultasi mengenai sistem kelistrikan berdasarkan hasil perhitungan Electrical Calculator website:',
            "- Total Daya Beban Terpasang: {$totalWatt} Watt",
            "- Estimasi Konsumsi Harian: {$dailyKwh} kWh/hari",
            "- Rekomendasi Daya Sambungan PLN: {$pln}",
            '',
            'Catatan Tambahan:',
            $pesan,
        ];

        return implode("\n", $lines);
    }

    /**
     * Format pesan konsultasi mengenai kalkulator solar pv
     *
     * @param  array<string, mixed>|null  $data
     */
    public function formatSolarCalculatorMessage(string $nama, string $pesan, ?array $data = null): string
    {
        $dailyKwh = $data['energi_harian_kwh'] ?? '-';
        $pvWp = $data['kapasitas_pv_teoritis_wp'] ?? '-';
        $panelLabel = $data['estimasi_modul_label'] ?? ($data['jumlah_panel'] ?? '-').' Panel';
        $battery = ($data['kapasitas_baterai_ah'] ?? '-').' Ah ('.($data['tegangan_sistem_v'] ?? '24').'V)';
        $inverter = ($data['rekomendasi_inverter_watt'] ?? '-').' Watt';

        $lines = [
            "Halo TECHNOVA, nama saya {$nama}.",
            'Saya ingin berkonsultasi mengenai sistem PLTS berdasarkan hasil Solar PV Calculator website:',
            "- Konsumsi Energi Harian: {$dailyKwh} kWh/hari",
            "- Estimasi Kebutuhan Panel Surya: {$pvWp} Wp ({$panelLabel})",
            "- Kapasitas Baterai: {$battery}",
            "- Rekomendasi Kapasitas Inverter: {$inverter}",
            '',
            'Catatan Tambahan:',
            $pesan,
        ];

        return implode("\n", $lines);
    }

    /**
     * Format pesan konsultasi mengenai kalkulator resistor
     */
}
