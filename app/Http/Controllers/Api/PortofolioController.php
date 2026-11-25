<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portofolio;
use App\Support\LevelNormalizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortofolioController extends Controller
{
    /**
     * Display a listing of portfolio projects with optional category, technology, level, and search filters.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Portofolio::query();

        if ($request->filled('kategori')) {
            $query->where('kategori', 'like', '%'.(string) $request->input('kategori').'%');
        }

        if ($request->filled('teknologi')) {
            $query->where('teknologi', 'like', '%'.(string) $request->input('teknologi').'%');
        }

        if ($request->filled('level')) {
            LevelNormalizer::applyFilter($query, (string) $request->input('level'));
        }

        if ($request->filled('q')) {
            $searchTerm = (string) $request->input('q');
            $query->where(function ($q) use ($searchTerm): void {
                $q->where('judul_proyek', 'like', "%{$searchTerm}%")
                    ->orWhere('deskripsi', 'like', "%{$searchTerm}%")
                    ->orWhere('teknologi', 'like', "%{$searchTerm}%");
            });
        }

        $portofolios = $query->latest()->get();

        return response()->json([
            'message' => 'Portofolios retrieved successfully.',
            'data' => $portofolios,
        ]);
    }

    /**
     * Display the specified portfolio project details.
     */
    public function show(int|string $id): JsonResponse
    {
        $portofolio = Portofolio::find($id);

        if ($portofolio === null) {
            return response()->json([
                'message' => 'Portofolio tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Portofolio detail retrieved successfully.',
            'data' => $portofolio,
        ]);
    }
}
