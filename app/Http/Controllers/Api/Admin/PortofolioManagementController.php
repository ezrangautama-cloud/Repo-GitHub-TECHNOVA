<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePortofolioRequest;
use App\Http\Requests\Admin\UpdatePortofolioRequest;
use App\Models\Portofolio;
use App\Support\LevelNormalizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PortofolioManagementController extends Controller
{
    /**
     * Display a listing of all portfolio projects for Admin.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Portofolio::query();

        if ($request->filled('kategori')) {
            $query->where('kategori', 'like', '%'.(string) $request->input('kategori').'%');
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

        $portofolios = $query->latest()->paginate($request->integer('per_page', 15));

        return response()->json([
            'message' => 'Daftar portofolio berhasil diambil.',
            'data' => $portofolios,
        ]);
    }

    /**
     * Store a newly created portfolio project (with optional public thumbnail image upload).
     */
    public function store(StorePortofolioRequest $request): JsonResponse
    {
        $data = $request->safe()->except(['image']);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = Str::slug((string) $data['judul_proyek']).'-'.time().'.'.$image->getClientOriginalExtension();
            $path = Storage::disk('public')->putFileAs('portofolios', $image, $filename);
            $data['file_url'] = '/storage/'.$path;
        }

        $portofolio = Portofolio::create($data);

        return response()->json([
            'message' => 'Portofolio berhasil ditambahkan.',
            'data' => $portofolio,
        ], 201);
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
            'message' => 'Detail portofolio berhasil diambil.',
            'data' => $portofolio,
        ]);
    }

    /**
     * Update the specified portfolio project.
     */
    public function update(UpdatePortofolioRequest $request, int|string $id): JsonResponse
    {
        $portofolio = Portofolio::find($id);

        if ($portofolio === null) {
            return response()->json([
                'message' => 'Portofolio tidak ditemukan.',
            ], 404);
        }

        $data = $request->safe()->except(['image']);

        if ($request->hasFile('image')) {
            $this->deletePublicImageIfExists($portofolio->file_url);

            $image = $request->file('image');
            $baseName = (string) ($data['judul_proyek'] ?? $portofolio->judul_proyek);
            $filename = Str::slug($baseName).'-'.time().'.'.$image->getClientOriginalExtension();
            $path = Storage::disk('public')->putFileAs('portofolios', $image, $filename);
            $data['file_url'] = '/storage/'.$path;
        }

        $portofolio->update($data);

        return response()->json([
            'message' => 'Portofolio berhasil diperbarui.',
            'data' => $portofolio,
        ]);
    }

    /**
     * Remove the specified portfolio project.
     */
    public function destroy(int|string $id): JsonResponse
    {
        $portofolio = Portofolio::find($id);

        if ($portofolio === null) {
            return response()->json([
                'message' => 'Portofolio tidak ditemukan.',
            ], 404);
        }

        $this->deletePublicImageIfExists($portofolio->file_url);
        $portofolio->delete();

        return response()->json([
            'message' => 'Portofolio berhasil dihapus.',
        ]);
    }

    /**
     * Delete uploaded portfolio image from public storage disk if present.
     */
    private function deletePublicImageIfExists(?string $fileUrl): void
    {
        if (empty($fileUrl) || ! str_starts_with($fileUrl, '/storage/')) {
            return;
        }

        $relativePath = Str::after($fileUrl, '/storage/');
        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }
    }
}
