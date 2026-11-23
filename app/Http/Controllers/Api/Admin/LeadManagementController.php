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
        $query = PesanLead::with('user:id,name,email');

        if ($request->filled('status_lead')) {
            $query->where('status_lead', (string) $request->input('status_lead'));
        }

        if ($request->filled('tipe_konsultasi')) {
            $query->where('tipe_konsultasi', (string) $request->input('tipe_konsultasi'));
        }

        if ($request->filled('q')) {
            $searchTerm = (string) $request->input('q');
            $query->where(function ($q) use ($searchTerm): void {
                $q->where('nama_pengirim', 'like', "%{$searchTerm}%")
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
        $lead = PesanLead::with('user:id,name,email,no_whatsapp')->find($id);

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
     * Menghapus consultaion lead yang ditentukan.
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
