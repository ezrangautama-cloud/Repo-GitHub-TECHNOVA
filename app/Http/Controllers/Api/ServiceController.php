<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Tampilkan daftar layanan atau produk berdasarkan kategori.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Produk::with('kategori');

        // Filter by category
        if ($request->filled('category')) {
            $cat = (string) $request->input('category');
            if (strtolower($cat) === 'services') {
                $query->whereHas('kategori', function ($q) {
                    $q->whereNotIn('nama_kategori', ['Digital Products', 'Courses', 'Projects']);
                });
            } else {
                $query->whereHas('kategori', function ($q) use ($cat) {
                    $q->where('nama_kategori', 'like', "%{$cat}%");
                });
            }
        } else {
            // Default: tampilkan hanya layanan (bukan Kursus, Produk Digital, atau Projects)
            $query->whereHas('kategori', function ($q) {
                $q->whereNotIn('nama_kategori', ['Digital Products', 'Courses', 'Projects']);
            });
        }

        // Search query
        if ($request->filled('q')) {
            $searchTerm = (string) $request->input('q');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('nama_produk', 'like', "%{$searchTerm}%")
                    ->orWhere('deskripsi', 'like', "%{$searchTerm}%");
            });
        }

        // Filter by level
        if ($request->filled('level')) {
            $query->where('level', 'like', '%' . $request->input('level') . '%');
        }

        $services = $query->latest()->get();

        return response()->json([
            'message' => 'Services retrieved successfully',
            'data' => $services,
        ]);
    }

    /**
     * Tampilkan daftar kursus.
     */
    public function courses(Request $request): JsonResponse
    {
        $query = Produk::with('kategori')
            ->whereHas('kategori', function ($q) {
                $q->where('nama_kategori', 'Courses');
            });

        if ($request->filled('q')) {
            $searchTerm = (string) $request->input('q');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('nama_produk', 'like', "%{$searchTerm}%")
                    ->orWhere('deskripsi', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('level')) {
            $query->where('level', 'like', '%' . $request->input('level') . '%');
        }

        $courses = $query->latest()->get();

        return response()->json([
            'message' => 'Courses retrieved successfully',
            'data' => $courses
        ]);
    }

    /**
     * Tampilkan detail layanan atau kursus.
     */
    public function show(int|string $id): JsonResponse
    {
        $service = Produk::with('kategori')
            ->where('id', $id)
            ->whereHas('kategori', function ($query): void {
                $query->whereNotIn('nama_kategori', ['Courses', 'Digital Products', 'Projects']);
            })
            ->first();

        if ($service === null) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        return response()->json([
            'message' => 'Service detail retrieved successfully',
            'data' => $service,
        ]);
    }

    /**
     * Simpan pengajuan permintaan layanan baru.
     */
    public function requestService(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tipe' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'email' => 'nullable|email|max:255',
            'whatsapp' => 'nullable|string|max:50',
        ]);

        $requestId = 'REQ-' . strtoupper(substr(uniqid(), -5));

        return response()->json([
            'message' => 'Permintaan layanan berhasil diajukan.',
            'data' => [
                'id' => $requestId,
                'tipe' => $validated['tipe'],
                'deskripsi' => $validated['deskripsi'],
                'email' => $validated['email'] ?? null,
                'whatsapp' => $validated['whatsapp'] ?? null,
                'status' => 'Menunggu balasan',
                'created_at' => now()->toIso8601String(),
            ]
        ], 201);
    }
}
