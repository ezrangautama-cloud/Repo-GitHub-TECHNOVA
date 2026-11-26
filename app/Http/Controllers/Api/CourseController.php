<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use App\Models\ProdukMateri;
use App\Support\LevelNormalizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of courses with optional search, level filter, and sorting.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $query = Produk::withCount('materis')
            ->whereHas('kategori', function ($q): void {
                $q->where('nama_kategori', 'Courses');
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

        $courses = $query->get();

        $unlockedCourseIds = [];
        if ($user !== null) {
            if ($user->isAdmin()) {
                $unlockedCourseIds = $courses->pluck('id')->all();
            } else {
                $unlockedCourseIds = $user->aksesProduks()
                    ->where('status_akses', 'Unlocked')
                    ->pluck('id_produk')
                    ->all();
            }
        }

        $formatted = $courses->map(function (Produk $course) use ($unlockedCourseIds): array {
            $isUnlocked = in_array($course->id, $unlockedCourseIds, true);
            $harga = (float) $course->harga;

            return [
                'id' => $course->id,
                'nama_produk' => $course->nama_produk,
                'level' => $course->level,
                'format' => $course->format,
                'deskripsi' => $course->deskripsi,
                'harga' => $harga,
                'is_free' => $harga <= 0,
                'thumbnail_url' => $course->thumbnail_url,
                'materis_count' => $course->materis_count ?? 0,
                'is_unlocked' => $isUnlocked,
                'video_url' => $isUnlocked ? $course->file_url : null,
            ];
        });

        return response()->json([
            'message' => 'Courses retrieved successfully.',
            'data' => $formatted,
        ]);
    }

    /**
     * Display the specified course details, curriculum, and access status.
     */
    public function show(Request $request, int|string $id): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $course = Produk::with('materis')
            ->where('id', $id)
            ->whereHas('kategori', function ($q): void {
                $q->where('nama_kategori', 'Courses');
            })
            ->first();

        if ($course === null) {
            return response()->json([
                'message' => 'Kursus tidak ditemukan.',
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
                    ->where('id_produk', $course->id)
                    ->first();

                if ($userAccess !== null) {
                    $accessStatus = $userAccess->status_akses;
                    $isUnlocked = ($accessStatus === 'Unlocked');
                }
            }
        }

        $harga = (float) $course->harga;
        $materis = $course->materis->map(function (ProdukMateri $materi) use ($isUnlocked): array {
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
            'message' => 'Course detail retrieved successfully.',
            'data' => [
                'id' => $course->id,
                'nama_produk' => $course->nama_produk,
                'level' => $course->level,
                'format' => $course->format,
                'deskripsi' => $course->deskripsi,
                'manfaat' => $course->manfaat,
                'yang_didapatkan' => $course->yang_didapatkan,
                'persyaratan' => $course->persyaratan,
                'harga' => $harga,
                'is_free' => $harga <= 0,
                'thumbnail_url' => $course->thumbnail_url,
                'access_status' => $accessStatus,
                'is_unlocked' => $isUnlocked,
                'video_url' => $isUnlocked ? $course->file_url : null,
                'materis_count' => $materis->count(),
                'materis' => $materis,
            ],
        ]);
    }

    /**
     * Display a specific lesson inside a course (for the course lesson player page).
     */
    public function lesson(Request $request, int|string $courseId, int|string $lessonId): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $course = Produk::with('materis')
            ->where('id', $courseId)
            ->whereHas('kategori', function ($q): void {
                $q->where('nama_kategori', 'Courses');
            })
            ->first();

        if ($course === null) {
            return response()->json([
                'message' => 'Kursus tidak ditemukan.',
            ], 404);
        }

        $lesson = $course->materis->firstWhere('id', (int) $lessonId);

        if ($lesson === null) {
            return response()->json([
                'message' => 'Materi kursus tidak ditemukan.',
            ], 404);
        }

        $isUnlocked = false;
        if ($user !== null) {
            $isUnlocked = $user->isAdmin() || $user->aksesProduks()
                ->where('id_produk', $course->id)
                ->where('status_akses', 'Unlocked')
                ->exists();
        }

        if (! $lesson->is_preview && ! $isUnlocked) {
            return response()->json([
                'message' => 'Akses ditolak. Silakan beli atau aktifkan kursus terlebih dahulu untuk membuka materi ini.',
            ], 403);
        }

        $orderedLessons = $course->materis->values();
        $currentIndex = $orderedLessons->search(fn (ProdukMateri $item): bool => $item->id === $lesson->id);

        $previousLesson = ($currentIndex !== false && $currentIndex > 0) ? $orderedLessons[$currentIndex - 1] : null;
        $nextLesson = ($currentIndex !== false && $currentIndex < $orderedLessons->count() - 1) ? $orderedLessons[$currentIndex + 1] : null;

        return response()->json([
            'message' => 'Materi kursus berhasil diambil.',
            'data' => [
                'course' => [
                    'id' => $course->id,
                    'nama_produk' => $course->nama_produk,
                    'level' => $course->level,
                    'format' => $course->format,
                ],
                'lesson' => [
                    'id' => $lesson->id,
                    'judul_modul' => $lesson->judul_modul,
                    'judul_materi' => $lesson->judul_materi,
                    'deskripsi' => $lesson->deskripsi,
                    'tipe' => $lesson->tipe,
                    'konten_url' => $lesson->konten_url,
                    'durasi' => $lesson->durasi,
                    'urutan' => $lesson->urutan,
                    'is_preview' => $lesson->is_preview,
                ],
                'previous_lesson' => $previousLesson !== null ? [
                    'id' => $previousLesson->id,
                    'judul_materi' => $previousLesson->judul_materi,
                ] : null,
                'next_lesson' => $nextLesson !== null ? [
                    'id' => $nextLesson->id,
                    'judul_materi' => $nextLesson->judul_materi,
                ] : null,
                'all_lessons' => $orderedLessons->map(function (ProdukMateri $item) use ($isUnlocked): array {
                    $canAccess = $isUnlocked || $item->is_preview;

                    return [
                        'id' => $item->id,
                        'judul_modul' => $item->judul_modul,
                        'judul_materi' => $item->judul_materi,
                        'durasi' => $item->durasi,
                        'urutan' => $item->urutan,
                        'is_preview' => $item->is_preview,
                        'is_locked' => ! $canAccess,
                    ];
                }),
            ],
        ]);
    }
}
