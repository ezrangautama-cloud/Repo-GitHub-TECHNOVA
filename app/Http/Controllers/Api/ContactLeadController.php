<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactLeadRequest;
use App\Models\PesanLead;
use App\Models\Produk;
use App\Services\WhatsAppService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactLeadController extends Controller
{
    /**
     * ContactLeadController constructor.
     */
    public function __construct(
        private readonly WhatsAppService $whatsAppService
    ) {}

    /**
     * menyimpan contact message / consultation lead dan membuat WhatsApp URL.
     */
    public function store(StoreContactLeadRequest $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $nama = (string) $request->validated('nama_pengirim');
        $noWa = (string) $request->validated('no_whatsapp');
        $pesan = (string) $request->validated('pesan');
        $tipe = (string) ($request->validated('tipe_konsultasi') ?? 'general');

        $dataTambahan = [];

        // jika konsul tentang layanan tertentu
        if ($request->filled('service_id')) {
            $service = Produk::find($request->validated('service_id'));
            if ($service !== null) {
                $dataTambahan['service_id'] = $service->id;
                $dataTambahan['service_name'] = $service->nama_produk;
            }
        } elseif ($request->filled('service_name')) {
            $dataTambahan['service_name'] = $request->validated('service_name');
        }

        // jika konsul dari kalkulator
        if ($request->filled('calculator_data')) {
            $calcData = (array) $request->validated('calculator_data');
            $dataTambahan = array_merge($dataTambahan, $calcData);
        }

        // 1. Simpan Lead ke dalam database (DS8 D8_PESAN_LEAD)
        $lead = PesanLead::create([
            'id_user' => $user?->id,
            'nama_pengirim' => $nama,
            'no_whatsapp' => $this->whatsAppService->normalizePhoneNumber($noWa),
            'pesan' => $pesan,
            'status_lead' => 'New',
            'tipe_konsultasi' => $tipe,
            'data_tambahan' => ! empty($dataTambahan) ? $dataTambahan : null,
            'tanggal_pesan' => now(),
        ]);

        // 2. Format WhatsApp message
        $formattedMessage = $this->whatsAppService->generateFormattedMessage(
            tipeKonsultasi: $tipe,
            nama: $nama,
            pesan: $pesan,
            dataTambahan: $dataTambahan
        );

        // 3. WhatsApp click-to-chat URL
        $whatsAppUrl = $this->whatsAppService->buildWhatsAppUrl($formattedMessage);

        return response()->json([
            'message' => 'Pesan konsultasi berhasil dicatat.',
            'data' => [
                'lead' => $lead,
                'target_whatsapp_number' => $this->whatsAppService->getTargetNumber(),
                'formatted_message' => $formattedMessage,
                'whatsapp_url' => $whatsAppUrl,
            ],
        ], 201);
    }

    /**
     * membuat WhatsApp URL tanpa menyimpan ke database.
     */
    public function quickUrl(Request $request): JsonResponse
    {
        $nama = (string) ($request->input('nama_pengirim') ?? 'Calon Klien');
        $pesan = (string) ($request->input('pesan') ?? 'Saya ingin berkonsultasi mengenai layanan TECHNOVA.');
        $tipe = (string) ($request->input('tipe_konsultasi') ?? 'general');
        $dataTambahan = (array) ($request->input('data_tambahan') ?? []);

        $formattedMessage = $this->whatsAppService->generateFormattedMessage(
            tipeKonsultasi: $tipe,
            nama: $nama,
            pesan: $pesan,
            dataTambahan: $dataTambahan
        );

        $whatsAppUrl = $this->whatsAppService->buildWhatsAppUrl($formattedMessage);

        return response()->json([
            'message' => 'WhatsApp link generated successfully.',
            'data' => [
                'target_whatsapp_number' => $this->whatsAppService->getTargetNumber(),
                'formatted_message' => $formattedMessage,
                'whatsapp_url' => $whatsAppUrl,
            ],
        ]);
    }
}
