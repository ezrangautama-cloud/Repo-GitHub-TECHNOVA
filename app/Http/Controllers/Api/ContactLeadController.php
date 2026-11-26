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
     * Menyimpan contact message / consultation lead dan membuat WhatsApp URL.
     */
    public function store(StoreContactLeadRequest $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $nama = (string) $request->validated('nama_pengirim');
        $email = $request->filled('email') ? (string) $request->validated('email') : $user?->email;
        $rawWa = $request->validated('no_whatsapp');
        $normalizedWa = ! empty($rawWa) ? $this->whatsAppService->normalizePhoneNumber((string) $rawWa) : null;
        $pesan = (string) $request->validated('pesan');
        $tipe = (string) ($request->validated('tipe_konsultasi') ?? 'general');

        $dataTambahan = [];

        if ($request->filled('jenis_pertanyaan')) {
            $dataTambahan['jenis_pertanyaan'] = (string) $request->validated('jenis_pertanyaan');
        }

        if ($request->filled('service_id')) {
            $service = Produk::find($request->validated('service_id'));
            if ($service !== null) {
                $dataTambahan['service_id'] = $service->id;
                $dataTambahan['service_name'] = $service->nama_produk;
            }
        } elseif ($request->filled('service_name')) {
            $dataTambahan['service_name'] = $request->validated('service_name');
        }

        if ($request->filled('calculator_data')) {
            $calcData = (array) $request->validated('calculator_data');
            $dataTambahan = array_merge($dataTambahan, $calcData);
        }

        $nextNumber = (int) (PesanLead::max('id') ?? 0) + 1;
        $kodePermintaan = 'REQ-'.str_pad((string) $nextNumber, 5, '0', STR_PAD_LEFT);
        while (PesanLead::where('kode_permintaan', $kodePermintaan)->exists()) {
            $nextNumber++;
            $kodePermintaan = 'REQ-'.str_pad((string) $nextNumber, 5, '0', STR_PAD_LEFT);
        }

        $lead = PesanLead::create([
            'kode_permintaan' => $kodePermintaan,
            'id_user' => $user?->id,
            'nama_pengirim' => $nama,
            'email' => $email,
            'no_whatsapp' => $normalizedWa,
            'pesan' => $pesan,
            'status_lead' => 'New',
            'tipe_konsultasi' => $tipe,
            'data_tambahan' => ! empty($dataTambahan) ? $dataTambahan : null,
            'tanggal_pesan' => now(),
        ]);

        $formattedMessage = $this->whatsAppService->generateFormattedMessage(
            tipeKonsultasi: $tipe,
            nama: $nama,
            pesan: $pesan,
            dataTambahan: $dataTambahan
        );

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
     * Membuat WhatsApp URL tanpa menyimpan ke database.
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

    /**
     * Tampilkan daftar permintaan layanan & pesan kontak milik user yang sedang login ("Layanan Saya").
     */
    public function myServices(Request $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $leads = PesanLead::with('responder:id,name,email')
            ->where(function ($query) use ($user): void {
                $query->where('id_user', $user->id);

                if (! empty($user->email)) {
                    $query->orWhere('email', $user->email);
                }
            })
            ->latest()
            ->get()
            ->map(function (PesanLead $lead): array {
                return [
                    'id' => $lead->id,
                    'kode_permintaan' => $lead->kode_permintaan,
                    'nama_pengirim' => $lead->nama_pengirim,
                    'email' => $lead->email,
                    'no_whatsapp' => $lead->no_whatsapp,
                    'pesan' => $lead->pesan,
                    'tipe_konsultasi' => $lead->tipe_konsultasi,
                    'data_tambahan' => $lead->data_tambahan,
                    'status_lead' => $lead->status_lead,
                    'status_label' => match ($lead->status_lead) {
                        'New' => 'Menunggu balasan',
                        'Follow Up' => 'Dalam tinjauan',
                        'Closed' => 'Selesai',
                        default => $lead->status_lead,
                    },
                    'admin_response' => $lead->admin_response,
                    'responded_by' => $lead->responder?->name,
                    'responded_at' => $lead->responded_at?->toIso8601String(),
                    'tanggal_pesan' => ($lead->tanggal_pesan ?? $lead->created_at)?->toIso8601String(),
                ];
            });

        return response()->json([
            'message' => 'Daftar permintaan layanan saya berhasil diambil.',
            'data' => $leads,
        ]);
    }

    /**
     * Tampilkan detail satu permintaan layanan beserta balasan admin milik user yang sedang login.
     */
    public function showMyService(Request $request, int|string $id): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $lead = PesanLead::with('responder:id,name,email')->find($id);

        if ($lead === null) {
            return response()->json([
                'message' => 'Permintaan layanan tidak ditemukan.',
            ], 404);
        }

        $isOwner = ($lead->id_user === $user->id) || (! empty($user->email) && $lead->email === $user->email);

        if (! $user->isAdmin() && ! $isOwner) {
            return response()->json([
                'message' => 'Akses ditolak. Permintaan layanan ini bukan milik Anda.',
            ], 403);
        }

        return response()->json([
            'message' => 'Detail permintaan layanan berhasil diambil.',
            'data' => [
                'id' => $lead->id,
                'kode_permintaan' => $lead->kode_permintaan,
                'nama_pengirim' => $lead->nama_pengirim,
                'email' => $lead->email,
                'no_whatsapp' => $lead->no_whatsapp,
                'pesan' => $lead->pesan,
                'tipe_konsultasi' => $lead->tipe_konsultasi,
                'data_tambahan' => $lead->data_tambahan,
                'status_lead' => $lead->status_lead,
                'status_label' => match ($lead->status_lead) {
                    'New' => 'Menunggu balasan',
                    'Follow Up' => 'Dalam tinjauan',
                    'Closed' => 'Selesai',
                    default => $lead->status_lead,
                },
                'admin_response' => $lead->admin_response,
                'responded_by' => $lead->responder?->name,
                'responded_at' => $lead->responded_at?->toIso8601String(),
                'tanggal_pesan' => ($lead->tanggal_pesan ?? $lead->created_at)?->toIso8601String(),
            ],
        ]);
    }
}
