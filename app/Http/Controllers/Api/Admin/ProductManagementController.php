<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Produk;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductManagementController extends Controller
{
    /**
     * Menampilkan daftar semua produk/kursus/layanan untuk Admin.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Produk::with('kategori');

        if ($request->filled('id_kategori')) {
            $query->where('id_kategori', $request->integer('id_kategori'));
        }

        if ($request->filled('kategori')) {
            $kategoriName = (string) $request->input('kategori');
            $query->whereHas('kategori', function ($q) use ($kategoriName): void {
                $q->where('nama_kategori', 'like', "%{$kategoriName}%");
            });
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
     * Menyimpan produk/kursus/layanan yang baru dibuat (dengan unggahan file pribadi opsional).
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
        $product->load('kategori');

        return response()->json([
            'message' => 'Produk berhasil ditambahkan.',
            'data' => $product,
        ], 201);
    }

    /**
     * Menampilkan detail produk yang ditentukan untuk Admin.
     */
    public function show(int|string $id): JsonResponse
    {
        $product = Produk::with('kategori')->find($id);

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
     * Mengupdate produk/kursus/layanan yang ditentukan.
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
        $product->load('kategori');

        return response()->json([
            'message' => 'Produk berhasil diperbarui.',
            'data' => $product,
        ]);
    }

    /**
     * Menghapus produk yang ditentukan dari database dan membersihkan file lokal jika ada.
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
     * Menghapus file pribadi dari disk lokal jika ada dan bukan URL eksternal.
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
