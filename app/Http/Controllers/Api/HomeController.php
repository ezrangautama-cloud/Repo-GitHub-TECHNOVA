<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Portofolio;

class HomeController extends Controller
{
    public function index()
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
}
