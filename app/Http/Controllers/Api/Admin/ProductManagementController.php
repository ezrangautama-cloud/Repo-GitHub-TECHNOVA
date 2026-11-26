<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Produk;
use App\Models\ProdukMateri;
use App\Support\LevelNormalizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductManagementController extends Controller
{
    /**
     * Display a listing of all products/courses/projects/services for Admin.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Produk::with('kategori')->withCount('materis');

        if ($request->filled('id_kategori')) {
            $query->where('id_kategori', $request->integer('id_kategori'));
        }

        if ($request->filled('kategori')) {
            $kategoriName = (string) $request->input('kategori');
            $query->whereHas('kategori', function ($q) use ($kategoriName): void {
                $q->where('nama_kategori', 'like', "%{$kategoriName}%");
            });
        }

        if ($request->filled('level')) {
            LevelNormalizer::applyFilter($query, (string) $request->input('level'));
        }

        if ($request->filled('q')) {
            $searchTerm = (string) $request->input('q');
            $query->where(function ($q) use ($searchTerm): void {
                $q->where('nama_produk', 'like', "%{$searchTerm}%")
                    ->orWhere('deskripsi', 'like', "%{$searchTerm}%");
            });
        }

        $products = $query->latest()->paginate($request->integer('per_page', 15));

        return response()->json([
            'message' => 'Daftar produk berhasil diambil.',
            'data' => $products,
        ]);
    }

    /**
     * Store a newly created product/course/project/service (with optional private file upload).
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        $data = $request->safe()->except(['file']);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = Str::slug((string) $data['nama_produk']).'-'.time().'.'.$file->getClientOriginalExtension();
            $path = Storage::disk('local')->putFileAs('digital-products', $file, $filename);
            $data['file_url'] = $path;
        }

        $product = Produk::create($data);
        $product->load(['kategori', 'materis']);

        return response()->json([
            'message' => 'Produk berhasil ditambahkan.',
            'data' => $product,
        ], 201);
    }

    /**
     * Display the specified product details for Admin.
     */
    public function show(int|string $id): JsonResponse
    {
        $product = Produk::with(['kategori', 'materis'])->find($id);

        if ($product === null) {
            return response()->json([
                'message' => 'Produk tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'message' => 'Detail produk berhasil diambil.',
            'data' => $product,
        ]);
    }

    /**
     * Update the specified product/course/project/service.
     */
    public function update(UpdateProductRequest $request, int|string $id): JsonResponse
    {
        $product = Produk::find($id);

        if ($product === null) {
            return response()->json([
                'message' => 'Produk tidak ditemukan.',
            ], 404);
        }

        $data = $request->safe()->except(['file']);

        if ($request->hasFile('file')) {
            $this->deleteLocalFileIfExists($product->file_url);

            $file = $request->file('file');
            $baseName = (string) ($data['nama_produk'] ?? $product->nama_produk);
            $filename = Str::slug($baseName).'-'.time().'.'.$file->getClientOriginalExtension();
            $path = Storage::disk('local')->putFileAs('digital-products', $file, $filename);
            $data['file_url'] = $path;
        }

        $product->update($data);
        $product->load(['kategori', 'materis']);

        return response()->json([
            'message' => 'Produk berhasil diperbarui.',
            'data' => $product,
        ]);
    }

    /**
     * Remove the specified product from database and clean up local file if present.
     */
    public function destroy(int|string $id): JsonResponse
    {
        $product = Produk::find($id);

        if ($product === null) {
            return response()->json([
                'message' => 'Produk tidak ditemukan.',
            ], 404);
        }

        $this->deleteLocalFileIfExists($product->file_url);
        $product->delete();

        return response()->json([
            'message' => 'Produk berhasil dihapus.',
        ]);
    }

    /**
     * Add a lesson/file curriculum item to a product/course/project.
     */
    public function storeMateri(Request $request, int|string $productId): JsonResponse
    {
        $product = Produk::find($productId);

        if ($product === null) {
            return response()->json([
                'message' => 'Produk tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'judul_modul' => ['nullable', 'string', 'max:150'],
            'judul_materi' => ['required', 'string', 'max:150'],
            'deskripsi' => ['nullable', 'string'],
            'tipe' => ['nullable', 'string', 'in:video,pdf,code,document'],
            'konten_url' => ['nullable', 'string', 'max:500'],
            'durasi' => ['nullable', 'string', 'max:50'],
            'urutan' => ['nullable', 'integer', 'min:1'],
            'is_preview' => ['nullable', 'boolean'],
        ]);

        $nextUrutan = ($product->materis()->max('urutan') ?? 0) + 1;

        $materi = ProdukMateri::create([
            'id_produk' => $product->id,
            'judul_modul' => $validated['judul_modul'] ?? null,
            'judul_materi' => $validated['judul_materi'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'tipe' => $validated['tipe'] ?? 'video',
            'konten_url' => $validated['konten_url'] ?? null,
            'durasi' => $validated['durasi'] ?? null,
            'urutan' => $validated['urutan'] ?? $nextUrutan,
            'is_preview' => (bool) ($validated['is_preview'] ?? false),
        ]);

        return response()->json([
            'message' => 'Materi produk berhasil ditambahkan.',
            'data' => $materi,
        ], 201);
    }

    /**
     * Update a lesson/file curriculum item for a product.
     */
    public function updateMateri(Request $request, int|string $productId, int|string $materiId): JsonResponse
    {
        $materi = ProdukMateri::where('id', $materiId)
            ->where('id_produk', $productId)
            ->first();

        if ($materi === null) {
            return response()->json([
                'message' => 'Materi produk tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'judul_modul' => ['nullable', 'string', 'max:150'],
            'judul_materi' => ['sometimes', 'required', 'string', 'max:150'],
            'deskripsi' => ['nullable', 'string'],
            'tipe' => ['nullable', 'string', 'in:video,pdf,code,document'],
            'konten_url' => ['nullable', 'string', 'max:500'],
            'durasi' => ['nullable', 'string', 'max:50'],
            'urutan' => ['nullable', 'integer', 'min:1'],
            'is_preview' => ['nullable', 'boolean'],
        ]);

        $materi->update($validated);

        return response()->json([
            'message' => 'Materi produk berhasil diperbarui.',
            'data' => $materi,
        ]);
    }

    /**
     * Delete a lesson/file curriculum item from a product.
     */
    public function destroyMateri(int|string $productId, int|string $materiId): JsonResponse
    {
        $materi = ProdukMateri::where('id', $materiId)
            ->where('id_produk', $productId)
            ->first();

        if ($materi === null) {
            return response()->json([
                'message' => 'Materi produk tidak ditemukan.',
            ], 404);
        }

        $materi->delete();

        return response()->json([
            'message' => 'Materi produk berhasil dihapus.',
        ]);
    }

    /**
     * Delete a private file from local disk if it exists and is not an external URL.
     */
    private function deleteLocalFileIfExists(?string $fileUrl): void
    {
        if (empty($fileUrl) || str_starts_with($fileUrl, 'http://') || str_starts_with($fileUrl, 'https://')) {
            return;
        }

        if (Storage::disk('local')->exists($fileUrl)) {
            Storage::disk('local')->delete($fileUrl);
        }
    }
}
