<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Models\Portofolio;

class HomeController extends Controller
{
    /**
     * Tampilkan data beranda (top 3 portofolio).
     */
    public function index(): JsonResponse
    {
        // Get top 3 portofolios for homepage
        $portofolios = Portofolio::latest()->take(3)->get();

        return response()->json([
            'message' => 'Homepage data retrieved successfully',
            'data' => [
                'featured_portofolios' => $portofolios
            ]
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
