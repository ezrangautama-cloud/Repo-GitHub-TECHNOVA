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

class ProjectController extends Controller
{
    /**
     * Display a listing of purchasable/free projects (category: Projects).
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $query = Produk::withCount('materis')
            ->whereHas('kategori', function ($q): void {
                $q->where('nama_kategori', 'Projects');
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

        $projects = $query->get();

        $unlockedIds = [];
        if ($user !== null) {
            if ($user->isAdmin()) {
                $unlockedIds = $projects->pluck('id')->all();
            } else {
                $unlockedIds = $user->aksesProduks()
                    ->where('status_akses', 'Unlocked')
                    ->pluck('id_produk')
                    ->all();
            }
        }

        $formatted = $projects->map(function (Produk $project) use ($unlockedIds): array {
            $isUnlocked = in_array($project->id, $unlockedIds, true);
            $harga = (float) $project->harga;

            return [
                'id' => $project->id,
                'nama_produk' => $project->nama_produk,
                'level' => $project->level,
                'format' => $project->format,
                'deskripsi' => $project->deskripsi,
                'harga' => $harga,
                'is_free' => $harga <= 0,
                'thumbnail_url' => $project->thumbnail_url,
                'materis_count' => $project->materis_count ?? 0,
                'is_unlocked' => $isUnlocked,
                'download_url' => $isUnlocked && ! empty($project->file_url)
                    ? url("/api/projects/{$project->id}/download")
                    : null,
            ];
        });

        return response()->json([
            'message' => 'Projects retrieved successfully.',
            'data' => $formatted,
        ]);
    }

    /**
     * Display the specified project details and access status.
     */
    public function show(Request $request, int|string $id): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $project = Produk::with('materis')
            ->where('id', $id)
            ->whereHas('kategori', function ($q): void {
                $q->where('nama_kategori', 'Projects');
            })
            ->first();

        if ($project === null) {
            return response()->json([
                'message' => 'Proyek tidak ditemukan.',
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
                    ->where('id_produk', $project->id)
                    ->first();

                if ($userAccess !== null) {
                    $accessStatus = $userAccess->status_akses;
                    $isUnlocked = ($accessStatus === 'Unlocked');
                }
            }
        }

        $fileExists = ! empty($project->file_url) && Storage::disk('local')->exists($project->file_url);
        $harga = (float) $project->harga;

        $materis = $project->materis->map(function (ProdukMateri $materi) use ($isUnlocked): array {
            $canAccessMateri = $isUnlocked || $materi->is_preview;

            return [
                'id' => $materi->id,
                'judul_modul' => $materi->judul_modul,
                'judul_materi' => $materi->judul_materi,
                'deskripsi' => $materi->deskripsi,
                'tipe' => $materi->tipe,
                'durasi' => $materi->durasi,
                'urutan' => $materi->urutan,
                'is_preview' => $materi->is_preview,
                'is_locked' => ! $canAccessMateri,
                'konten_url' => $canAccessMateri ? $materi->konten_url : null,
            ];
        });

        return response()->json([
            'message' => 'Project detail retrieved successfully.',
            'data' => [
                'id' => $project->id,
                'nama_produk' => $project->nama_produk,
                'level' => $project->level,
                'format' => $project->format,
                'deskripsi' => $project->deskripsi,
                'manfaat' => $project->manfaat,
                'yang_didapatkan' => $project->yang_didapatkan,
                'persyaratan' => $project->persyaratan,
                'harga' => $harga,
                'is_free' => $harga <= 0,
                'thumbnail_url' => $project->thumbnail_url,
                'access_status' => $accessStatus,
                'is_unlocked' => $isUnlocked,
                'is_file_ready' => $fileExists,
                'download_url' => $isUnlocked && $fileExists
                    ? url("/api/projects/{$project->id}/download")
                    : null,
                'materis_count' => $materis->count(),
                'materis' => $materis,
            ],
        ]);
    }

    /**
     * Securely download the project file package.
     */
    public function download(Request $request, int|string $id): BinaryFileResponse|JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        if ($user === null) {
            return response()->json([
                'message' => 'Unauthenticated. Silakan login terlebih dahulu untuk mengunduh berkas proyek.',
            ], 401);
        }

        $project = Produk::where('id', $id)
            ->whereHas('kategori', function ($q): void {
                $q->where('nama_kategori', 'Projects');
            })
            ->first();

        if ($project === null) {
            return response()->json([
                'message' => 'Proyek tidak ditemukan.',
            ], 404);
        }

        $hasAccess = $user->isAdmin() || $user->aksesProduks()
            ->where('id_produk', $project->id)
            ->where('status_akses', 'Unlocked')
            ->exists();

        if (! $hasAccess) {
            return response()->json([
                'message' => 'Akses ditolak. Anda belum memiliki akses ke proyek ini.',
            ], 403);
        }

        if (empty($project->file_url) || ! Storage::disk('local')->exists($project->file_url)) {
            return response()->json([
                'message' => 'Berkas fisik proyek belum tersedia di server.',
            ], 404);
        }

        $extension = pathinfo($project->file_url, PATHINFO_EXTENSION);
        $safeFilename = Str::slug($project->nama_produk).($extension ? '.'.$extension : '');
        $filePath = Storage::disk('local')->path($project->file_url);

        return response()->download($filePath, $safeFilename);
    }
}
