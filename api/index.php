<?php

// 1. Inisialisasi direktori penyimpanan writable di /tmp untuk lingkungan serverless Vercel
$storagePath = '/tmp/storage';
$dirs = [
    $storagePath . '/framework/views',
    $storagePath . '/framework/cache/data',
    $storagePath . '/framework/sessions',
    $storagePath . '/logs',
];

foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

// 2. Persiapkan database SQLite lokal jika aplikasi menggunakan SQLite
$databaseFile = __DIR__ . '/../database/database.sqlite';
$tmpDatabase = '/tmp/database.sqlite';

if (!file_exists($tmpDatabase)) {
    if (file_exists($databaseFile)) {
        copy($databaseFile, $tmpDatabase);
    } else {
        touch($tmpDatabase);
    }
}

// Set environment storage dan database
putenv("APP_STORAGE={$storagePath}");
putenv("VIEW_COMPILED_PATH={$storagePath}/framework/views");

if (!getenv('DB_CONNECTION') || getenv('DB_CONNECTION') === 'sqlite') {
    if (!getenv('DB_DATABASE')) {
        putenv("DB_DATABASE={$tmpDatabase}");
        $_ENV['DB_DATABASE'] = $tmpDatabase;
        $_SERVER['DB_DATABASE'] = $tmpDatabase;
    }
}

// 3. Arahkan eksekusi ke file entrypoint Laravel
require __DIR__ . '/../public/index.php';
