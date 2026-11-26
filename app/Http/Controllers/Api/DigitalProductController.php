<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use App\Models\ProdukMateri;
use App\Support\LevelNormalizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class DigitalProductController extends Controller
{
    /**
     * Tampilkan daftar produk digital.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $query = Produk::withCount('materis')
            ->whereHas('kategori', function ($q): void {
                $q->where('nama_kategori', 'Digital Products');
            });

        if ($request->filled('q')) {
            $searchTerm = (string) $request->input('q');
            $query->where(function ($q) use ($searchTerm): void {
                $q->where('nama_produk', 'like', "%{$searchTerm}%")
                    ->orWhere('deskripsi', 'like', "%{$searchTerm}%");
            });
        }

        if ($request->filled('level')) {
            LevelNormalizer::applyFilter($query, (string) $request->input('level'));
        }

        $sort = $request->input('sort', 'latest');
        match ($sort) {
            'price_low' => $query->orderBy('harga', 'asc'),
            'price_high' => $query->orderBy('harga', 'desc'),
            'oldest' => $query->oldest(),
            default => $query->latest(),
        };

        $products = $query->get();

        $unlockedProductIds = [];
        if ($user !== null) {
            if ($user->isAdmin()) {
                $unlockedProductIds = $products->pluck('id')->all();
            } else {
                $unlockedProductIds = $user->aksesProduks()
                    ->where('status_akses', 'Unlocked')
                    ->pluck('id_produk')
                    ->all();
            }
        }

        $formatted = $products->map(function (Produk $product) use ($unlockedProductIds): array {
            $isUnlocked = in_array($product->id, $unlockedProductIds, true);
            $harga = (float) $product->harga;

            return [
                'id' => $product->id,
                'nama_produk' => $product->nama_produk,
                'level' => $product->level,
                'format' => $product->format,
                'deskripsi' => $product->deskripsi,
                'harga' => $harga,
                'is_free' => $harga <= 0,
                'thumbnail_url' => $product->thumbnail_url,
                'materis_count' => $product->materis_count ?? 0,
                'is_unlocked' => $isUnlocked,
                'download_url' => $isUnlocked ? url("/api/digital-products/{$product->id}/download") : null,
            ];
        });

        return response()->json([
            'message' => 'Digital products retrieved successfully.',
            'data' => $formatted,
        ]);
    }

    /**
     * Tampilkan detail digital product.
     */
    public function show(Request $request, int|string $id): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $product = Produk::with('materis')
            ->where('id', $id)
            ->whereHas('kategori', function ($q): void {
                $q->where('nama_kategori', 'Digital Products');
            })
            ->first();

        if ($product === null) {
            return response()->json([
                'message' => 'Produk digital tidak ditemukan.',
            ], 404);
        }

        $accessStatus = 'None';
        $isUnlocked = false;

        if ($user !== null) {
            if ($user->isAdmin()) {
                $accessStatus = 'Unlocked';
                $isUnlocked = true;
            } else {
                $userAccess = $user->aksesProduks()
                    ->where('id_produk', $product->id)
                    ->first();

                if ($userAccess !== null) {
                    $accessStatus = $userAccess->status_akses;
                    $isUnlocked = ($accessStatus === 'Unlocked');
                }
            }
        }

        $fileExists = ! empty($product->file_url) && Storage::disk('local')->exists($product->file_url);
        $harga = (float) $product->harga;

        $materis = $product->materis->map(function (ProdukMateri $materi) use ($isUnlocked): array {
            $canAccess = $isUnlocked || $materi->is_preview;

            return [
                'id' => $materi->id,
                'judul_modul' => $materi->judul_modul,
                'judul_materi' => $materi->judul_materi,
                'deskripsi' => $materi->deskripsi,
                'tipe' => $materi->tipe,
                'durasi' => $materi->durasi,
                'urutan' => $materi->urutan,
                'is_preview' => $materi->is_preview,
                'is_locked' => ! $canAccess,
                'konten_url' => $canAccess ? $materi->konten_url : null,
            ];
        });

        return response()->json([
            'message' => 'Digital product detail retrieved successfully.',
            'data' => [
                'id' => $product->id,
                'nama_produk' => $product->nama_produk,
                'level' => $product->level,
                'format' => $product->format,
                'deskripsi' => $product->deskripsi,
                'manfaat' => $product->manfaat,
                'yang_didapatkan' => $product->yang_didapatkan,
                'persyaratan' => $product->persyaratan,
                'harga' => $harga,
                'is_free' => $harga <= 0,
                'thumbnail_url' => $product->thumbnail_url,
                'access_status' => $accessStatus,
                'is_unlocked' => $isUnlocked,
                'is_file_ready' => $fileExists,
                'download_url' => $isUnlocked ? url("/api/digital-products/{$product->id}/download") : null,
                'materis_count' => $materis->count(),
                'materis' => $materis,
            ],
        ]);
    }

    /**
     * Unduh file produk digital secara aman.
     */
    public function download(Request $request, int|string $id): BinaryFileResponse|JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated. Silakan login terlebih dahulu untuk mengunduh produk digital.',
            ], 401);
        }

        $product = Produk::where('id', $id)
            ->whereHas('kategori', function ($q): void {
                $q->where('nama_kategori', 'Digital Products');
            })
            ->first();

        if ($product === null) {
            return response()->json([
                'message' => 'Produk digital tidak ditemukan.',
            ], 404);
        }

        $hasAccess = $user->isAdmin() || $user->aksesProduks()
            ->where('id_produk', $product->id)
            ->where('status_akses', 'Unlocked')
            ->exists();

        if (! $hasAccess) {
            return response()->json([
                'message' => 'Akses ditolak. Anda belum memiliki akses ke produk digital ini atau pembayaran belum diverifikasi.',
            ], 403);
        }

        if (empty($product->file_url) || ! Storage::disk('local')->exists($product->file_url)) {
            return response()->json([
                'message' => 'Berkas fisik produk belum tersedia di server.',
            ], 404);
        }

        $extension = pathinfo($product->file_url, PATHINFO_EXTENSION);
        $safeFilename = Str::slug($product->nama_produk).($extension ? '.'.$extension : '');
        $filePath = Storage::disk('local')->path($product->file_url);

        return response()->download($filePath, $safeFilename);
    }
}
