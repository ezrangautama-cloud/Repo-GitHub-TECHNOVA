<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class CalculatorTest extends TestCase
{
    public function test_can_get_electrical_presets(): void
    {
        $response = $this->getJson('/api/tools/electrical/presets');

        $response->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => [
                    '*' => [
                        'kategori',
                        'nama_alat',
                        'daya_watt',
                        'durasi_jam',
                        'jumlah_default',
                    ],
                ],
            ])
            ->assertJsonFragment(['nama_alat' => 'AC 1/2 PK'])
            ->assertJsonFragment(['nama_alat' => 'Kulkas 2 Pintu']);
    }

    public function test_can_get_solar_presets(): void
    {
        $response = $this->getJson('/api/tools/solar/presets');

        $response->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => [
                    'default_psh',
                    'opsi_tegangan_sistem',
                    'opsi_jenis_baterai',
                    'opsi_panel_surya',
                    'derating_factor',
                ],
            ])
            ->assertJsonFragment(['default_psh' => 4.5])
            ->assertJsonFragment(['derating_factor' => 0.75]);
    }

    public function test_can_calculate_electrical_load_matching_pdf_example(): void
    {
        $payload = [
            'appliances' => [
                [
                    'nama_alat' => 'Lampu LED',
                    'daya_watt' => 10,
                    'jumlah' => 5,
                    'durasi_jam' => 10,
                ],
                [
                    'nama_alat' => 'AC 1/2 PK',
                    'daya_watt' => 400,
                    'jumlah' => 1,
                    'durasi_jam' => 8,
                ],
                [
                    'nama_alat' => 'Kulkas',
                    'daya_watt' => 150,
                    'jumlah' => 1,
                    'durasi_jam' => 24,
                ],
            ],
        ];

        $response = $this->postJson('/api/tools/calculate/electrical', $payload);

        $response->assertOk()
            ->assertJson([
                'data' => [
                    'total_daya_watt' => 600,
                    'total_daya_kw' => 0.6,
                    'energi_harian_wh' => 7300,
                    'energi_harian_kwh' => 7.3,
                    'rekomendasi_pln' => '900 VA (Disarankan 1.300 VA)',
                    'rekomendasi_pln_va' => 900,
                    'jumlah_alat' => 3,
                ],
            ]);
    }

    public function test_electrical_calculation_validates_required_fields(): void
    {
        $response = $this->postJson('/api/tools/calculate/electrical', [
            'appliances' => [],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['appliances']);

        $responseNegative = $this->postJson('/api/tools/calculate/electrical', [
            'appliances' => [
                ['daya_watt' => -10],
            ],
        ]);

        $responseNegative->assertStatus(422)
            ->assertJsonValidationErrors(['appliances.0.daya_watt']);
    }

    public function test_can_calculate_solar_pv_matching_pdf_example(): void
    {
        $payload = [
            'energi_harian_wh' => 7300,
            'psh' => 4.5,
            'v_sys' => 24,
            'jenis_baterai' => 'lithium',
            'daya_panel_unit' => 400,
            'total_beban_watt' => 600,
        ];

        $response = $this->postJson('/api/tools/calculate/solar', $payload);

        $response->assertOk()
            ->assertJson([
                'data' => [
                    'energi_harian_wh' => 7300,
                    'energi_harian_kwh' => 7.3,
                    'psh' => 4.5,
                    'tegangan_sistem_v' => 24,
                    'jenis_baterai' => 'Lithium LiFePO4',
                    'dod_percentage' => 80,
                    'kapasitas_pv_teoritis_wp' => 2162.96,
                    'kapasitas_pv_terpasang_wp' => 2400,
                    'jumlah_panel' => 6,
                    'kapasitas_baterai_ah' => 380.2,
                    'rekomendasi_inverter_watt' => 1000,
                ],
            ]);
    }

    public function test_solar_calculation_supports_kwh_input_and_lead_acid(): void
    {
        $payload = [
            'energi_harian_kwh' => 2.4, // 2400 Wh
            'psh' => 4.0,
            'v_sys' => 12,
            'jenis_baterai' => 'lead_acid', // DoD 50%
            'daya_panel_unit' => 200,
        ];

        $response = $this->postJson('/api/tools/calculate/solar', $payload);

        $response->assertOk()
            ->assertJson([
                'data' => [
                    'energi_harian_wh' => 2400,
                    'energi_harian_kwh' => 2.4,
                    'tegangan_sistem_v' => 12,
                    'jenis_baterai' => 'Lead-Acid / GEL',
                    'dod_percentage' => 50,
                    'kapasitas_pv_teoritis_wp' => 800,
                    'jumlah_panel' => 4,
                    'kapasitas_baterai_ah' => 400,
                ],
            ]);
    }

    public function test_solar_calculation_validates_inputs(): void
    {
        $response = $this->postJson('/api/tools/calculate/solar', [
            'v_sys' => 99, // invalid voltage
            'jenis_baterai' => 'unknown', // invalid battery
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['energi_harian_wh', 'v_sys', 'jenis_baterai']);
    }
}
