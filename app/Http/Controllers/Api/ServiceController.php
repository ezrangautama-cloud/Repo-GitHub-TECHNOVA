<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;

class ServiceController extends Controller
{
    public function index()
    {
        // Return all products
        $services = Produk::with('kategori')->get();

        return response()->json([
            'message' => 'Services retrieved successfully',
            'data' => $services,
        ]);
    }

    public function show($id)
    {
        $service = Produk::with('kategori')->find($id);

        if (! $service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        return response()->json([
            'message' => 'Service detail retrieved successfully',
            'data' => $service,
        ]);
    }
}
