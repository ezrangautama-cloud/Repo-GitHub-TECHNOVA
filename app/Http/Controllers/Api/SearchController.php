<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PesanLead;
use App\Models\Portofolio;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Global search across courses, digital products, projects, portfolios, and services for public/participant portal.
     */
    public function publicSearch(Request $request): JsonResponse
    {
        $q = trim((string) $request->input('q', ''));
        $limit = max(1, min(20, $request->integer('limit', 10)));

        if ($q === '') {
            return response()->json([
                'message' => 'Kata kunci pencarian kosong.',
                'data' => [
                    'query' => $q,
                    'total_results' => 0,
                    'courses' => [],
                    'digital_products' => [],
                    'projects' => [],
                    'portofolios' => [],
                    'services' => [],
                ],
            ]);
        }

        $courses = Produk::with('kategori')
            ->whereHas('kategori', fn ($query) => $query->where('nama_kategori', 'Courses'))
            ->where(function ($query) use ($q): void {
                $query->where('nama_produk', 'like', "%{$q}%")
                    ->orWhere('deskripsi', 'like', "%{$q}%")
                    ->orWhere('level', 'like', "%{$q}%");
            })
            ->latest()
            ->take($limit)
            ->get()
            ->map(fn (Produk $p): array => [
                'id' => $p->id,
                'nama_produk' => $p->nama_produk,
                'level' => $p->level,
                'format' => $p->format,
                'harga' => (float) $p->harga,
                'thumbnail_url' => $p->thumbnail_url,
            ]);

        $digitalProducts = Produk::with('kategori')
            ->whereHas('kategori', fn ($query) => $query->where('nama_kategori', 'Digital Products'))
            ->where(function ($query) use ($q): void {
                $query->where('nama_produk', 'like', "%{$q}%")
                    ->orWhere('deskripsi', 'like', "%{$q}%")
                    ->orWhere('format', 'like', "%{$q}%");
            })
            ->latest()
            ->take($limit)
            ->get()
            ->map(fn (Produk $p): array => [
                'id' => $p->id,
                'nama_produk' => $p->nama_produk,
                'level' => $p->level,
                'format' => $p->format,
                'harga' => (float) $p->harga,
                'thumbnail_url' => $p->thumbnail_url,
            ]);

        $projects = Produk::with('kategori')
            ->whereHas('kategori', fn ($query) => $query->where('nama_kategori', 'Projects'))
            ->where(function ($query) use ($q): void {
                $query->where('nama_produk', 'like', "%{$q}%")
                    ->orWhere('deskripsi', 'like', "%{$q}%")
                    ->orWhere('level', 'like', "%{$q}%");
            })
            ->latest()
            ->take($limit)
            ->get()
            ->map(fn (Produk $p): array => [
                'id' => $p->id,
                'nama_produk' => $p->nama_produk,
                'level' => $p->level,
                'format' => $p->format,
                'harga' => (float) $p->harga,
                'thumbnail_url' => $p->thumbnail_url,
            ]);

        $portofolios = Portofolio::where(function ($query) use ($q): void {
            $query->where('judul_proyek', 'like', "%{$q}%")
                ->orWhere('deskripsi', 'like', "%{$q}%")
                ->orWhere('kategori', 'like', "%{$q}%")
                ->orWhere('teknologi', 'like', "%{$q}%");
        })
            ->latest()
            ->take($limit)
            ->get();

        $services = Produk::with('kategori')
            ->whereHas('kategori', fn ($query) => $query->whereNotIn('nama_kategori', ['Courses', 'Digital Products', 'Projects']))
            ->where(function ($query) use ($q): void {
                $query->where('nama_produk', 'like', "%{$q}%")
                    ->orWhere('deskripsi', 'like', "%{$q}%");
            })
            ->latest()
            ->take($limit)
            ->get();

        $totalResults = $courses->count() + $digitalProducts->count() + $projects->count() + $portofolios->count() + $services->count();

        return response()->json([
            'message' => 'Pencarian global berhasil.',
            'data' => [
                'query' => $q,
                'total_results' => $totalResults,
                'courses' => $courses,
                'digital_products' => $digitalProducts,
                'projects' => $projects,
                'portofolios' => $portofolios,
                'services' => $services,
            ],
        ]);
    }

    /**
     * Global search across products, portfolios, orders, leads, and users for Admin Console.
     */
    public function adminSearch(Request $request): JsonResponse
    {
        $q = trim((string) $request->input('q', ''));
        $limit = max(1, min(20, $request->integer('limit', 10)));

        if ($q === '') {
            return response()->json([
                'message' => 'Kata kunci pencarian kosong.',
                'data' => [
                    'query' => $q,
                    'total_results' => 0,
                    'products' => [],
                    'portofolios' => [],
                    'transactions' => [],
                    'leads' => [],
                    'users' => [],
                ],
            ]);
        }

        $products = Produk::with('kategori')
            ->where(function ($query) use ($q): void {
                $query->where('nama_produk', 'like', "%{$q}%")
                    ->orWhere('deskripsi', 'like', "%{$q}%");
            })
            ->latest()
            ->take($limit)
            ->get();

        $portofolios = Portofolio::where(function ($query) use ($q): void {
            $query->where('judul_proyek', 'like', "%{$q}%")
                ->orWhere('kategori', 'like', "%{$q}%")
                ->orWhere('teknologi', 'like', "%{$q}%");
        })
            ->latest()
            ->take($limit)
            ->get();

        $transactions = Transaksi::with(['user:id,name,email'])
            ->where(function ($query) use ($q): void {
                $query->where('order_id', 'like', "%{$q}%")
                    ->orWhereHas('user', function ($uq) use ($q): void {
                        $uq->where('name', 'like', "%{$q}%")
                            ->orWhere('email', 'like', "%{$q}%");
                    });
            })
            ->latest('tanggal_transaksi')
            ->take($limit)
            ->get();

        $leads = PesanLead::where(function ($query) use ($q): void {
            $query->where('kode_permintaan', 'like', "%{$q}%")
                ->orWhere('nama_pengirim', 'like', "%{$q}%")
                ->orWhere('email', 'like', "%{$q}%")
                ->orWhere('no_whatsapp', 'like', "%{$q}%")
                ->orWhere('pesan', 'like', "%{$q}%");
        })
            ->latest()
            ->take($limit)
            ->get();

        $users = User::select(['id', 'name', 'email', 'role', 'no_whatsapp', 'created_at'])
            ->where(function ($query) use ($q): void {
                $query->where('name', 'like', "%{$q}%")
                    ->orWhere('email', 'like', "%{$q}%");
            })
            ->latest()
            ->take($limit)
            ->get();

        $totalResults = $products->count() + $portofolios->count() + $transactions->count() + $leads->count() + $users->count();

        return response()->json([
            'message' => 'Pencarian admin berhasil.',
            'data' => [
                'query' => $q,
                'total_results' => $totalResults,
                'products' => $products,
                'portofolios' => $portofolios,
                'transactions' => $transactions,
                'leads' => $leads,
                'users' => $users,
            ],
        ]);
    }
}
