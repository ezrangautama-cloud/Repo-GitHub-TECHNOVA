<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    /**
     * Display a listing of engineering services (excluding Courses, Digital Products, and Projects).
     */
    public function index(): JsonResponse
    {
        $services = Produk::with('kategori')
            ->whereHas('kategori', function ($query): void {
                $query->whereNotIn('nama_kategori', ['Courses', 'Digital Products', 'Projects']);
            })
            ->get();

        return response()->json([
            'message' => 'Services retrieved successfully',
            'data' => $services,
        ]);
    }

    /**
     * Display the specified engineering service.
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
}
