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
    return Inertia::render('KursusSaya');
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
    return Inertia::render('Kursus');
})->name('kursus');

Route::get('/proyek', function () {
    return Inertia::render('Proyek');
})->name('proyek');

Route::get('/produk-digital', function () {
    return Inertia::render('ProdukDigital');
})->name('produk-digital');

// Course and Product Detail Routes
Route::get('/kursus/pengantar-iot', function () {
    return Inertia::render('Admin/ProdukDetail');
})->name('kursus.detail');

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
