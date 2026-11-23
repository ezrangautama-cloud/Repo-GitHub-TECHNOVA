<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Listing courses dengan search, level filter, dan sorting opsional.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $query = Produk::query()
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
            $query->where('level', 'like', '%'.(string) $request->input('level').'%');
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

            return [
                'id' => $course->id,
                'nama_produk' => $course->nama_produk,
                'level' => $course->level,
                'format' => $course->format,
                'deskripsi' => $course->deskripsi,
                'harga' => (float) $course->harga,
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
     * Display the specified course details and access status.
     */
    public function show(Request $request, int|string $id): JsonResponse
    {
        $user = $request->user('sanctum') ?? $request->user();

        $course = Produk::where('id', $id)
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

        return response()->json([
            'message' => 'Course detail retrieved successfully.',
            'data' => [
                'id' => $course->id,
                'nama_produk' => $course->nama_produk,
                'level' => $course->level,
                'format' => $course->format,
                'deskripsi' => $course->deskripsi,
                'harga' => (float) $course->harga,
                'access_status' => $accessStatus,
                'is_unlocked' => $isUnlocked,
                'video_url' => $isUnlocked ? $course->file_url : null,
            ],
        ]);
    }
}
