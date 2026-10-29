<?php

namespace Database\Seeders;

use App\Models\KategoriProduk;
use App\Models\Portofolio;
use App\Models\Produk;
use Illuminate\Database\Seeder;

class TechnovaDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Categories
        $katIot = KategoriProduk::firstOrCreate(['nama_kategori' => 'IoT & Electronics']);
        $katInstrumen = KategoriProduk::firstOrCreate(['nama_kategori' => 'Instrumentation']);
        $katEnergy = KategoriProduk::firstOrCreate(['nama_kategori' => 'Renewable Energy']);
        $katLab = KategoriProduk::firstOrCreate(['nama_kategori' => 'Laboratory Solutions']);
        $katCourses = KategoriProduk::firstOrCreate(['nama_kategori' => 'Courses']);
        $katDigital = KategoriProduk::firstOrCreate(['nama_kategori' => 'Digital Products']);

        // 2. Services (dibawah categories)
        $services = [
            [
                'id_kategori' => $katIot->id,
                'nama_produk' => 'IoT & Electronics Prototyping',
                'level' => null,
                'format' => 'Consultation & Development',
                'deskripsi' => 'Connected systems, sensor integration, and rapid electronics prototyping built for real applications.',
                'harga' => 0,
                'file_url' => null,
            ],
            [
                'id_kategori' => $katInstrumen->id,
                'nama_produk' => 'Instrumentation & DAQ System',
                'level' => null,
                'format' => 'Consultation & Integration',
                'deskripsi' => 'Accurate measurement, data acquisition, and custom monitoring systems for research and industry.',
                'harga' => 0,
                'file_url' => null,
            ],
            [
                'id_kategori' => $katEnergy->id,
                'nama_produk' => 'Renewable Energy & Solar PV Planning',
                'level' => null,
                'format' => 'Design & Sizing',
                'deskripsi' => 'Solar PV design, smart energy monitoring, and dependable battery system planning.',
                'harga' => 0,
                'file_url' => null,
            ],
            [
                'id_kategori' => $katLab->id,
                'nama_produk' => 'Digital Laboratory Solutions',
                'level' => null,
                'format' => 'Educational Modules',
                'deskripsi' => 'Digital laboratories, practical modules, and connected monitoring for modern engineering education.',
                'harga' => 0,
                'file_url' => null,
            ],
        ];

        foreach ($services as $srv) {
            Produk::updateOrCreate(
                ['nama_produk' => $srv['nama_produk']],
                $srv
            );
        }

        // 3. Courses (dibawah Courses category)
        $courses = [
            [
                'id_kategori' => $katCourses->id,
                'nama_produk' => 'Electronics Fundamentals',
                'level' => 'BEGINNER',
                'format' => 'Video + PDF',
                'deskripsi' => 'Dasar-dasar komponen elektronika, analisis rangkaian listrik, dan teknik pengukuran instrumen praktis.',
                'harga' => 99000,
                'file_url' => null,
            ],
            [
                'id_kategori' => $katCourses->id,
                'nama_produk' => 'ESP32 for IoT',
                'level' => 'BEGINNER, INTERMEDIATE',
                'format' => 'Video + Project',
                'deskripsi' => 'Pemrograman mikrokontroler ESP32, integrasi sensor digital/analog, protokol MQTT, dan dashboard cloud.',
                'harga' => 149000,
                'file_url' => null,
            ],
            [
                'id_kategori' => $katCourses->id,
                'nama_produk' => 'IoT Monitoring System',
                'level' => 'INTERMEDIATE',
                'format' => 'Video + Project',
                'deskripsi' => 'Arsitektur end-to-end monitoring sistem industri secara real-time dengan database time-series.',
                'harga' => 199000,
                'file_url' => null,
            ],
            [
                'id_kategori' => $katCourses->id,
                'nama_produk' => 'Solar PV Fundamentals',
                'level' => 'BEGINNER',
                'format' => 'Video + Workbook',
                'deskripsi' => 'Prinsip kerja sel surya, perhitungan beban listrik, dimensi panel, solar charge controller, dan baterai.',
                'harga' => 149000,
                'file_url' => null,
            ],
        ];

        foreach ($courses as $crs) {
            Produk::updateOrCreate(
                ['nama_produk' => $crs['nama_produk']],
                $crs
            );
        }

        // 4. Portfolios
        $portofolios = [
            [
                'judul_proyek' => 'Sistem Monitoring Energi PLTS Kampus',
                'kategori' => 'Renewable Energy',
                'deskripsi' => 'Pengembangan sistem pemantauan daya listrik dan efisiensi panel surya berbasis IoT dengan logging data real-time.',
                'teknologi' => 'ESP32, PZEM-004T, MQTT, InfluxDB, Grafana',
                'file_url' => '/images/portofolio/plts.jpg',
            ],
            [
                'judul_proyek' => 'Digitalisasi Modul Praktikum Lab Instrumentasi',
                'kategori' => 'Laboratory Solutions',
                'deskripsi' => 'Perancangan jobsheet interaktif dan modul data acquisition untuk laboratorium teknik elektro dan fisika instrumen.',
                'teknologi' => 'DAQ, LabVIEW, Python, Modbus RS485',
                'file_url' => '/images/portofolio/lab.jpg',
            ],
            [
                'judul_proyek' => 'Smart Greenhouse Monitoring & Automation',
                'kategori' => 'IoT & Electronics',
                'deskripsi' => 'Sistem pemantauan mikroklimat greenhouse otomatis untuk pengendalian kelembaban tanah, suhu, dan intensitas cahaya.',
                'teknologi' => 'NodeMCU, DHT22, Capacitive Sensor, Cloud Dashboard',
                'file_url' => '/images/portofolio/greenhouse.jpg',
            ],
        ];

        foreach ($portofolios as $porto) {
            Portofolio::updateOrCreate(
                ['judul_proyek' => $porto['judul_proyek']],
                $porto
            );
        }
    }
}
