<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portofolio;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{
    public function index(): JsonResponse
    {
        $portofolios = Portofolio::latest()->take(3)->get();

        $services = Produk::with('kategori')
            ->whereHas('kategori', function ($query): void {
                $query->whereNotIn('nama_kategori', ['Courses', 'Digital Products']);
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
}
