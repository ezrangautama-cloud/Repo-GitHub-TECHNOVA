<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\PesanLead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadManagementController extends Controller
{
    /**
     * Tampilkan daftar consultation leads dengan paginasi dan filter opsional.
     */
    public function index(Request $request): JsonResponse
    {
        $query = PesanLead::with(['user:id,name,email', 'responder:id,name,email']);

        if ($request->filled('status_lead')) {
            $query->where('status_lead', (string) $request->input('status_lead'));
        }

        if ($request->filled('tipe_konsultasi')) {
            $query->where('tipe_konsultasi', (string) $request->input('tipe_konsultasi'));
        }

        if ($request->filled('q')) {
            $searchTerm = (string) $request->input('q');
            $query->where(function ($q) use ($searchTerm): void {
                $q->where('kode_permintaan', 'like', "%{$searchTerm}%")
                    ->orWhere('nama_pengirim', 'like', "%{$searchTerm}%")
                    ->orWhere('email', 'like', "%{$searchTerm}%")
                    ->orWhere('no_whatsapp', 'like', "%{$searchTerm}%")
                    ->orWhere('pesan', 'like', "%{$searchTerm}%");
            });
        }

        $leads = $query->latest()->paginate($request->integer('per_page', 15));

        return response()->json([
            'message' => 'Daftar pesan lead berhasil diambil.',
            'data' => $leads,
        ]);
    }

    /**
     * Tampilkan detail pesan lead yang ditentukan.
     */
    public function show(int|string $id): JsonResponse
    {
        $lead = PesanLead::with(['user:id,name,email,no_whatsapp', 'responder:id,name,email'])->find($id);

        if ($lead === null) {
            return response()->json([
                'message' => 'Pesan lead tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail pesan lead berhasil diambil.',
            'data' => $lead,
        ]);
    }

    /**
     * Update follow-up status dari consultation lead.
     */
    public function updateStatus(Request $request, int|string $id): JsonResponse
    {
        $lead = PesanLead::find($id);

        if ($lead === null) {
            return response()->json([
                'message' => 'Pesan lead tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'status_lead' => ['required', 'string', 'in:New,Follow Up,Closed'],
        ], [
            'status_lead.required' => 'Status lead wajib diisi.',
            'status_lead.in' => 'Status lead harus berupa New, Follow Up, atau Closed.',
        ]);

        $lead->update([
            'status_lead' => $validated['status_lead'],
        ]);

        return response()->json([
            'message' => 'Status lead berhasil diperbarui.',
            'data' => $lead,
        ]);
    }

    /**
     * Simpan balasan admin terhadap pesan lead/permintaan layanan dari user.
     */
    public function respond(Request $request, int|string $id): JsonResponse
    {
        $lead = PesanLead::find($id);

        if ($lead === null) {
            return response()->json([
                'message' => 'Pesan lead tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'admin_response' => ['required', 'string', 'min:2', 'max:5000'],
            'status_lead' => ['nullable', 'string', 'in:Follow Up,Closed'],
        ], [
            'admin_response.required' => 'Isi balasan admin wajib diisi.',
            'admin_response.min' => 'Isi balasan minimal 2 karakter.',
            'status_lead.in' => 'Status lead harus berupa Follow Up atau Closed.',
        ]);

        $admin = $request->user('sanctum') ?? $request->user();

        $lead->update([
            'admin_response' => $validated['admin_response'],
            'responded_by' => $admin?->id,
            'responded_at' => now(),
            'status_lead' => $validated['status_lead'] ?? 'Closed',
        ]);

        $lead->load(['user:id,name,email,no_whatsapp', 'responder:id,name,email']);

        return response()->json([
            'message' => 'Balasan admin berhasil disimpan.',
            'data' => $lead,
        ]);
    }

    /**
     * Menghapus consultation lead yang ditentukan.
     */
    public function destroy(int|string $id): JsonResponse
    {
        $lead = PesanLead::find($id);

        if ($lead === null) {
            return response()->json([
                'message' => 'Pesan lead tidak ditemukan.',
            ], 404);
        }

        $lead->delete();

        return response()->json([
            'message' => 'Pesan lead berhasil dihapus.',
        ]);
    }
}
