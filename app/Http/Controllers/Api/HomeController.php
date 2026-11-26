<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portofolio;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Display dynamic featured data for the Homepage.
     */
    public function index(): JsonResponse
    {
        $portofolios = Portofolio::latest()->take(3)->get();

        $services = Produk::with('kategori')
            ->whereHas('kategori', function ($query): void {
                $query->whereNotIn('nama_kategori', ['Courses', 'Digital Products', 'Projects']);
            })
            ->latest()
            ->take(4)
            ->get();

        $courses = Produk::with('kategori')
            ->whereHas('kategori', function ($query): void {
                $query->where('nama_kategori', 'Courses');
            })
            ->latest()
            ->take(4)
            ->get()
            ->map(function (Produk $course): array {
                return [
                    'id' => $course->id,
                    'nama_produk' => $course->nama_produk,
                    'level' => $course->level,
                    'format' => $course->format,
                    'deskripsi' => $course->deskripsi,
                    'harga' => (float) $course->harga,
                    'thumbnail_url' => $course->thumbnail_url,
                    'kategori' => $course->kategori?->nama_kategori,
                ];
            });

        return response()->json([
            'message' => 'Homepage data retrieved successfully',
            'data' => [
                'featured_portofolios' => $portofolios,
                'featured_services' => $services,
                'featured_courses' => $courses,
            ],
        ]);
    }

    /**
     * Tampilkan seluruh daftar portofolio / proyek.
     */
    public function portfolios(Request $request): JsonResponse
    {
        $query = Portofolio::query();

        if ($request->filled('q')) {
            $searchTerm = (string) $request->input('q');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('judul_proyek', 'like', "%{$searchTerm}%")
                    ->orWhere('deskripsi', 'like', "%{$searchTerm}%")
                    ->orWhere('teknologi', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('kategori', 'like', '%' . $request->input('category') . '%');
        }

        $portofolios = $query->latest()->get();

        return response()->json([
            'message' => 'Portfolios retrieved successfully',
            'data' => $portofolios
        ]);
    }
}
