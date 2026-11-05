<?php

namespace App\Services;

class CalculatorService
{
    /**
     * Get default electrical appliance presets for quick UI selection.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getElectricalPresets(): array
    {
        return [
            [
                'kategori' => 'Pendingin & Tata Udara',
                'nama_alat' => 'AC 1/2 PK',
                'daya_watt' => 400,
                'durasi_jam' => 8,
                'jumlah_default' => 1,
            ],
            [
                'kategori' => 'Pendingin & Tata Udara',
                'nama_alat' => 'AC 1 PK',
                'daya_watt' => 800,
                'durasi_jam' => 8,
                'jumlah_default' => 1,
            ],
            [
                'kategori' => 'Pendingin & Tata Udara',
                'nama_alat' => 'Kipas Angin',
                'daya_watt' => 50,
                'durasi_jam' => 10,
                'jumlah_default' => 1,
            ],
            [
                'kategori' => 'Peralatan Dapur & Rumah Tangga',
                'nama_alat' => 'Kulkas 1 Pintu',
                'daya_watt' => 100,
                'durasi_jam' => 24,
                'jumlah_default' => 1,
            ],
            [
                'kategori' => 'Peralatan Dapur & Rumah Tangga',
                'nama_alat' => 'Kulkas 2 Pintu',
                'daya_watt' => 150,
                'durasi_jam' => 24,
                'jumlah_default' => 1,
            ],
            [
                'kategori' => 'Peralatan Dapur & Rumah Tangga',
                'nama_alat' => 'Rice Cooker (Memasak)',
                'daya_watt' => 350,
                'durasi_jam' => 2,
                'jumlah_default' => 1,
            ],
            [
                'kategori' => 'Peralatan Dapur & Rumah Tangga',
                'nama_alat' => 'Pompa Air Sumur Dangkal',
                'daya_watt' => 125,
                'durasi_jam' => 3,
                'jumlah_default' => 1,
            ],
            [
                'kategori' => 'Peralatan Dapur & Rumah Tangga',
                'nama_alat' => 'Mesin Cuci',
                'daya_watt' => 300,
                'durasi_jam' => 2,
                'jumlah_default' => 1,
            ],
            [
                'kategori' => 'Penerangan',
                'nama_alat' => 'Lampu LED Kamar/Ruang',
                'daya_watt' => 10,
                'durasi_jam' => 10,
                'jumlah_default' => 5,
            ],
            [
                'kategori' => 'Penerangan',
                'nama_alat' => 'Lampu LED Watt Kecil',
                'daya_watt' => 5,
                'durasi_jam' => 12,
                'jumlah_default' => 3,
            ],
            [
                'kategori' => 'Elektronik & Hiburan',
                'nama_alat' => 'Smart TV 43 Inch',
                'daya_watt' => 75,
                'durasi_jam' => 6,
                'jumlah_default' => 1,
            ],
            [
                'kategori' => 'Elektronik & Hiburan',
                'nama_alat' => 'Laptop / Komputer Kerja',
                'daya_watt' => 65,
                'durasi_jam' => 8,
                'jumlah_default' => 1,
            ],
            [
                'kategori' => 'Elektronik & Hiburan',
                'nama_alat' => 'WiFi Router / Modem',
                'daya_watt' => 15,
                'durasi_jam' => 24,
                'jumlah_default' => 1,
            ],
        ];
    }

    /**
     * Get Solar PV configuration presets.
     *
     * @return array<string, mixed>
     */
    public function getSolarPresets(): array
    {
        return [
            'default_psh' => 4.5,
            'psh_keterangan' => 'Rata-rata jam penyinaran efektif matahari di wilayah Indonesia (4.0 - 5.0 jam)',
            'opsi_tegangan_sistem' => [
                ['label' => '12 Volt (Kapasitas kecil < 1.000 Wh)', 'value' => 12],
                ['label' => '24 Volt (Standar rumah tangga 1.000 - 5.000 Wh)', 'value' => 24],
                ['label' => '48 Volt (Kapasitas besar > 5.000 Wh)', 'value' => 48],
            ],
            'opsi_jenis_baterai' => [
                [
                    'key' => 'lithium',
                    'nama' => 'Lithium LiFePO4',
                    'dod_percentage' => 80,
                    'dod_factor' => 0.80,
                    'keterangan' => 'Siklus hidup panjang (3.000+ siklus), efisiensi tinggi, DoD 80%',
                ],
                [
                    'key' => 'lead_acid',
                    'nama' => 'Lead-Acid / VRLA / GEL',
                    'dod_percentage' => 50,
                    'dod_factor' => 0.50,
                    'keterangan' => 'Biaya awal lebih ekonomis, DoD aman maksimal 50%',
                ],
            ],
            'opsi_panel_surya' => [
                ['label' => 'Panel 100 Wp (Polycrystalline / Monocrystalline)', 'value' => 100],
                ['label' => 'Panel 200 Wp (Monocrystalline)', 'value' => 200],
                ['label' => 'Panel 400 Wp (Monocrystalline Half-Cut - Standar)', 'value' => 400],
                ['label' => 'Panel 550 Wp (Tier-1 Monocrystalline)', 'value' => 550],
            ],
            'derating_factor' => 0.75,
            'derating_factor_keterangan' => 'Rugi-rugi sistem (rugi kabel, suhu, debu, efisiensi MPPT)',
        ];
    }

    /**
     * Calculate electrical load and daily energy consumption.
     *
     * @param array<int, array<string, mixed>> $appliances
     * @return array<string, mixed>
     */
    public function calculateElectrical(array $appliances): array
    {
        $totalWatt = 0.0;
        $totalDailyWh = 0.0;
        $items = [];

        foreach ($appliances as $index => $appliance) {
            $nama = (string) ($appliance['nama_alat'] ?? 'Alat #' . ($index + 1));
            $daya = (float) ($appliance['daya_watt'] ?? 0);
            $jumlah = max(1, (int) ($appliance['jumlah'] ?? 1));
            $durasi = max(0.1, min(24.0, (float) ($appliance['durasi_jam'] ?? 1)));

            $subtotalWatt = $daya * $jumlah;
            $subtotalWh = $subtotalWatt * $durasi;

            $totalWatt += $subtotalWatt;
            $totalDailyWh += $subtotalWh;

            $items[] = [
                'nama_alat' => $nama,
                'daya_watt' => $daya,
                'jumlah' => $jumlah,
                'durasi_jam' => $durasi,
                'subtotal_watt' => round($subtotalWatt, 2),
                'subtotal_wh' => round($subtotalWh, 2),
                'subtotal_kwh' => round($subtotalWh / 1000, 3),
            ];
        }

        foreach ($items as &$item) {
            $item['persentase_daya'] = $totalWatt > 0
                ? round(($item['subtotal_watt'] / $totalWatt) * 100, 1)
                : 0.0;
            $item['persentase_energi'] = $totalDailyWh > 0
                ? round(($item['subtotal_wh'] / $totalDailyWh) * 100, 1)
                : 0.0;
        }
        unset($item);

        $totalDailyKwh = $totalDailyWh / 1000;
        $safetyFactor = 1.2;
        $requiredWattWithSafety = $totalWatt * $safetyFactor;

        $rekomendasiPln = match (true) {
            $requiredWattWithSafety <= 450 => '450 VA',
            $requiredWattWithSafety <= 900 => '900 VA (Disarankan 1.300 VA)',
            $requiredWattWithSafety <= 1300 => '1.300 VA',
            $requiredWattWithSafety <= 2200 => '2.200 VA',
            $requiredWattWithSafety <= 3500 => '3.500 VA',
            $requiredWattWithSafety <= 4400 => '4.400 VA',
            $requiredWattWithSafety <= 5500 => '5.500 VA',
            default => '6.600 VA atau lebih',
        };

        $rekomendasiPlnVa = match (true) {
            $requiredWattWithSafety <= 450 => 450,
            $requiredWattWithSafety <= 900 => 900,
            $requiredWattWithSafety <= 1300 => 1300,
            $requiredWattWithSafety <= 2200 => 2200,
            $requiredWattWithSafety <= 3500 => 3500,
            $requiredWattWithSafety <= 4400 => 4400,
            $requiredWattWithSafety <= 5500 => 5500,
            default => 6600,
        };

        return [
            'total_daya_watt' => round($totalWatt, 2),
            'total_daya_kw' => round($totalWatt / 1000, 3),
            'energi_harian_wh' => round($totalDailyWh, 2),
            'energi_harian_kwh' => round($totalDailyKwh, 3),
            'safety_factor' => $safetyFactor,
            'daya_terhitung_dengan_safety_watt' => round($requiredWattWithSafety, 2),
            'rekomendasi_pln' => $rekomendasiPln,
            'rekomendasi_pln_va' => $rekomendasiPlnVa,
            'jumlah_alat' => count($items),
            'rincian_alat' => $items,
        ];
    }

    /**
     * Calculate Solar PV requirements.
     *
     * @param float $energiHarianWh
     * @param float $psh
     * @param int $vSys
     * @param string $jenisBaterai
     * @param int $dayaPanelUnit
     * @param float|null $totalBebanWatt
     * @return array<string, mixed>
     */
    public function calculateSolar(
        float $energiHarianWh,
        float $psh = 4.5,
        int $vSys = 24,
        string $jenisBaterai = 'lithium',
        int $dayaPanelUnit = 400,
        ?float $totalBebanWatt = null
    ): array {
        $deratingFactor = 0.75;
        $dayaPanelUnit = max(50, $dayaPanelUnit);
        $psh = max(1.0, $psh);
        $vSys = in_array($vSys, [12, 24, 48], true) ? $vSys : 24;

        // Kapasitas Panel Surya (Wp)
        $pvWp = $energiHarianWh / ($psh * $deratingFactor);
        $jumlahPanel = (int) ceil($pvWp / $dayaPanelUnit);
        $pvWpTerpasang = $jumlahPanel * $dayaPanelUnit;

        // Kapasitas Baterai (Ah)
        $isLeadAcid = strtolower($jenisBaterai) === 'lead_acid';
        $dod = $isLeadAcid ? 0.50 : 0.80;
        $bateraiAh = $energiHarianWh / ($vSys * $dod);

        // Rekomendasi Inverter (Watt)
        $bebanWatt = $totalBebanWatt !== null && $totalBebanWatt > 0
            ? $totalBebanWatt
            : max(600.0, $pvWp * 0.5);

        $surgeFactor = 1.5;
        $inverterWattCalc = $bebanWatt * $surgeFactor;

        // Market standard inverter sizes (Watt)
        $marketInverterRatings = [500, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 10000];
        $inverterWattRekomendasi = 1000;
        foreach ($marketInverterRatings as $rating) {
            if ($rating >= $inverterWattCalc) {
                $inverterWattRekomendasi = $rating;
                break;
            }
        }

        return [
            'energi_harian_wh' => round($energiHarianWh, 2),
            'energi_harian_kwh' => round($energiHarianWh / 1000, 3),
            'psh' => round($psh, 2),
            'derating_factor' => $deratingFactor,
            'tegangan_sistem_v' => $vSys,
            'jenis_baterai' => $isLeadAcid ? 'Lead-Acid / GEL' : 'Lithium LiFePO4',
            'dod_percentage' => (int) ($dod * 100),
            'kapasitas_pv_teoritis_wp' => round($pvWp, 2),
            'kapasitas_pv_terpasang_wp' => $pvWpTerpasang,
            'daya_panel_satuan_wp' => $dayaPanelUnit,
            'jumlah_panel' => $jumlahPanel,
            'estimasi_modul_label' => "{$jumlahPanel}x Panel {$dayaPanelUnit} Wp",
            'kapasitas_baterai_ah' => round($bateraiAh, 1),
            'kapasitas_baterai_kwh' => round(($bateraiAh * $vSys) / 1000, 2),
            'total_beban_bersamaan_watt' => round($bebanWatt, 2),
            'surge_factor' => $surgeFactor,
            'rekomendasi_inverter_watt' => $inverterWattRekomendasi,
            'rekomendasi_inverter_label' => "Minimal {$inverterWattRekomendasi} Watt ({$vSys}V)",
        ];
    }
}
