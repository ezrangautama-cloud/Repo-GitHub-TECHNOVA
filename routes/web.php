<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/login', function () {
    return redirect()->route('dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// Participant Portal direct routes
Route::get('/profil', function () {
    return Inertia::render('Admin/Profil');
})->name('profil');

Route::get('/kursus-saya', function () {
    $courses = \App\Models\Produk::with('kategori')
        ->whereHas('kategori', fn($q) => $q->where('nama_kategori', 'Courses'))
        ->latest()
        ->get();
    $digitalProducts = \App\Models\Produk::with('kategori')
        ->whereHas('kategori', fn($q) => $q->where('nama_kategori', 'Digital Products'))
        ->latest()
        ->get();
    $portofolios = \App\Models\Portofolio::latest()->get();

    return Inertia::render('KursusSaya', [
        'initialCourses' => $courses,
        'initialProducts' => $digitalProducts,
        'initialProjects' => $portofolios,
    ]);
})->name('kursus-saya');

Route::get('/kursus-saya/materi', function () {
    return Inertia::render('MateriBelajar');
})->name('kursus-saya.materi');

Route::get('/layanan-saya', function () {
    return Inertia::render('LayananSaya');
})->name('layanan-saya');

Route::get('/permintaan-layanan', function () {
    return redirect()->route('profil');
});

Route::get('/notifikasi', function () {
    return redirect()->route('profil');
});

Route::get('/pengaturan', function () {
    return redirect()->route('admin.pengaturan');
});

// Public Catalog Routes
Route::get('/kursus', function () {
    $courses = \App\Models\Produk::with('kategori')
        ->whereHas('kategori', fn($q) => $q->where('nama_kategori', 'Courses'))
        ->latest()
        ->get();

    return Inertia::render('Kursus', [
        'initialCourses' => $courses,
    ]);
})->name('kursus');

Route::get('/proyek', function () {
    $portofolios = \App\Models\Portofolio::latest()->get();

    return Inertia::render('Proyek', [
        'initialProjects' => $portofolios,
    ]);
})->name('proyek');

Route::get('/produk-digital', function () {
    $products = \App\Models\Produk::with('kategori')
        ->whereHas('kategori', fn($q) => $q->where('nama_kategori', 'Digital Products'))
        ->latest()
        ->get();

    return Inertia::render('ProdukDigital', [
        'initialProducts' => $products,
    ]);
})->name('produk-digital');

Route::get('/tentang', function () {
    return Inertia::render('About');
})->name('tentang');

Route::get('/kontak', function () {
    return Inertia::render('Contact');
})->name('kontak');

Route::get('/layanan', function () {
    $services = \App\Models\Produk::with('kategori')
        ->whereHas('kategori', function ($q) {
            $q->whereNotIn('nama_kategori', ['Digital Products', 'Courses']);
        })
        ->latest()
        ->get();

    return Inertia::render('Layanan', [
        'initialServices' => $services,
    ]);
})->name('layanan');

// Engineering Calculators (Section 6)
Route::get('/alat', function () {
    return Inertia::render('Kalkulator/Index');
})->name('alat.index');
Route::get('/alat/daya-listrik', function () {
    return Inertia::render('Kalkulator/DayaListrik');
})->name('alat.daya-listrik');

Route::get('/alat/plts', function () {
    return Inertia::render('Kalkulator/Plts', [
        'initialEnergi' => (float) request()->query('energi', 7.3),
        'initialBeban'  => (int) request()->query('beban', 600),
    ]);
})->name('alat.plts');

Route::get('/alat/resistor-led', function () {
    return Inertia::render('Kalkulator/ResistorLed');
})->name('alat.resistor-led');

// Checkout Flow (Section 6)
Route::get('/checkout', function () {
    return Inertia::render('Checkout/Ringkasan');
})->name('checkout.ringkasan');

Route::get('/checkout/qris', function () {
    return Inertia::render('Checkout/Qris');
})->name('checkout.qris');

Route::get('/checkout/sukses', function () {
    return Inertia::render('Checkout/Sukses');
})->name('checkout.sukses');

// Course and Product Detail Routes
Route::get('/kursus/pengantar-iot', function () {
    return Inertia::render('Admin/ProdukDetail');
})->name('kursus.detail');

Route::get('/kursus/{id}', function ($id) {
    if ($id === 'pengantar-iot') {
        return Inertia::render('Admin/ProdukDetail');
    }
    $course = is_numeric($id) ? \App\Models\Produk::with('kategori')->find($id) : null;
    return Inertia::render('Admin/ProdukDetail', [
        'course' => $course,
    ]);
})->name('kursus.show');

Route::get('/produk-digital/{id}', function ($id) {
    $product = is_numeric($id) ? \App\Models\Produk::with('kategori')->find($id) : null;
    return Inertia::render('ProdukDigital/Detail', [
        'id' => $id,
        'initialProduct' => $product,
    ]);
})->name('produk-digital.detail');

Route::get('/produk/pengantar-iot', function () {
    return Inertia::render('Admin/ProdukDetail');
})->name('produk.detail');

Route::get('/detail-produk', function () {
    return Inertia::render('Admin/ProdukDetail');
});

// Admin Console Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.kursus');
    });

    Route::get('/kursus', function () {
        return Inertia::render('Admin/Kursus');
    })->name('kursus');

    Route::get('/materi', function () {
        return Inertia::render('Admin/Materi');
    })->name('materi');

    Route::get('/prospek', function () {
        return Inertia::render('Admin/Prospek');
    })->name('prospek');

    Route::get('/profil', function () {
        return Inertia::render('Admin/Profil');
    })->name('profil');

    Route::get('/pengaturan', function () {
        return Inertia::render('Admin/Pengaturan');
    })->name('pengaturan');

    Route::get('/produk-detail', function () {
        return Inertia::render('Admin/ProdukDetail');
    })->name('produk-detail');

    Route::get('/produk-digital', function () {
        return Inertia::render('Admin/ProdukDigital');
    })->name('produk-digital');

    Route::get('/proyek', function () {
        return Inertia::render('Admin/Proyek');
    })->name('proyek');

    Route::get('/pesanan', function () {
        return Inertia::render('Admin/Pesanan');
    })->name('pesanan');

    Route::get('/konsultasi', function () {
        return Inertia::render('Admin/Konsultasi');
    })->name('konsultasi');

    // Fallbacks for other sidebar menu links in development
    Route::get('/{menu}', function ($menu) {
        if ($menu === 'kursus') {
            return Inertia::render('Admin/Kursus');
        }
        if ($menu === 'produk-digital') {
            return Inertia::render('Admin/ProdukDigital');
        }
        if ($menu === 'proyek') {
            return Inertia::render('Admin/Proyek');
        }
        if ($menu === 'pesanan') {
            return Inertia::render('Admin/Pesanan');
        }
        if ($menu === 'prospek') {
            return Inertia::render('Admin/Prospek');
        }
        if ($menu === 'profil') {
            return Inertia::render('Admin/Profil');
        }
        if ($menu === 'pengaturan') {
            return Inertia::render('Admin/Pengaturan');
        }
        if ($menu === 'produk-detail') {
            return Inertia::render('Admin/ProdukDetail');
        }
        return redirect()->route('admin.kursus');
    });
});
