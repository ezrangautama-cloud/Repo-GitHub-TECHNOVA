<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CalculateElectricalRequest;
use App\Http\Requests\CalculateLedResistorRequest;
use App\Http\Requests\CalculateSolarRequest;
use App\Services\CalculatorService;
use Illuminate\Http\JsonResponse;

class CalculatorController extends Controller
{
    /**
     * CalculatorController constructor.
     */
    public function __construct(
        private readonly CalculatorService $calculatorService
    ) {}

    /**
     * Get default appliance presets untuk electrical calculator.
     */
    public function electricalPresets(): JsonResponse
    {
        $presets = $this->calculatorService->getElectricalPresets();

        return response()->json([
            'message' => 'Electrical calculator presets berhasil diambil.',
            'data' => $presets,
        ]);
    }

    /**
     * Get default config presets untuk solar PV calculator.
     */
    public function solarPresets(): JsonResponse
    {
        $presets = $this->calculatorService->getSolarPresets();

        return response()->json([
            'message' => 'Solar PV calculator presets berhasil diambil.',
            'data' => $presets,
        ]);
    }

    /**
     * Get default config presets untuk resistor calculator.
     */
    public function ledResistorPresets(): JsonResponse
    {
        $presets = $this->calculatorService->getLedResistorPresets();

        return response()->json([
            'message' => 'LED Resistor calculator presets berhasil diambil.',
            'data' => $presets,
        ]);
    }

    /**
     * untuk electrical calc.
     */
    public function calculateElectrical(CalculateElectricalRequest $request): JsonResponse
    {
        $appliances = $request->validated('appliances');
        $result = $this->calculatorService->calculateElectrical($appliances);

        return response()->json([
            'message' => 'Electrical calculation completed successfully.',
            'data' => $result,
        ]);
    }

    /**
     * untuk solar PV.
     */
    public function calculateSolar(CalculateSolarRequest $request): JsonResponse
    {
        $energiHarianWh = (float) $request->validated('energi_harian_wh');
        $psh = (float) ($request->validated('psh') ?? 4.5);
        $vSys = (int) ($request->validated('v_sys') ?? 24);
        $jenisBaterai = (string) ($request->validated('jenis_baterai') ?? 'lithium');
        $dayaPanelUnit = (int) ($request->validated('daya_panel_unit') ?? 400);
        $totalBebanWatt = $request->filled('total_beban_watt')
            ? (float) $request->validated('total_beban_watt')
            : null;

        $result = $this->calculatorService->calculateSolar(
            energiHarianWh: $energiHarianWh,
            psh: $psh,
            vSys: $vSys,
            jenisBaterai: $jenisBaterai,
            dayaPanelUnit: $dayaPanelUnit,
            totalBebanWatt: $totalBebanWatt
        );

        return response()->json([
            'message' => 'Solar PV calculation completed successfully.',
            'data' => $result,
        ]);
    }

    /**
     * untuk resistor calc.
     */
    public function calculateLedResistor(CalculateLedResistorRequest $request): JsonResponse
    {
        $supplyVoltage = (float) $request->validated('supply_voltage');
        $ledForwardVoltage = (float) $request->validated('led_forward_voltage');
        $ledCurrentMa = (float) $request->validated('led_current_ma');

        $result = $this->calculatorService->calculateLedResistor(
            supplyVoltage: $supplyVoltage,
            ledForwardVoltage: $ledForwardVoltage,
            ledCurrentMa: $ledCurrentMa
        );

        return response()->json([
            'message' => 'LED Resistor calculation completed successfully.',
            'data' => $result,
        ]);
    }
}
