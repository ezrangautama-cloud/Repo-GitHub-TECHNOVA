<?php

namespace Database\Seeders;

use App\Models\AksesProduk;
use App\Models\KategoriProduk;
use App\Models\Portofolio;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

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

        // 4. Digital Products (dibawah Digital Products category)
        // private directory ada di storage/app/private/digital-products
        $digitalFiles = [
            'digital-products/modul-praktikum-iot-esp32.zip' => "TECHNOVA DIGITAL PRODUCT\nJudul: Modul Praktikum IoT ESP32\nFormat: PDF + Source Code ZIP\nVersi: 1.0\nHak Cipta: TECHNOVA Team",
            'digital-products/template-simulasi-daq-matlab.zip' => "TECHNOVA DIGITAL PRODUCT\nJudul: Template Simulasi Sistem Kendali & DAQ\nFormat: Simulink .slx + Guide PDF\nVersi: 2.1\nHak Cipta: TECHNOVA Team",
            'digital-products/jobsheet-instrumentasi-sensor.pdf' => "TECHNOVA DIGITAL PRODUCT\nJudul: Jobsheet Praktikum Instrumentasi & Sensor\nFormat: PDF Guidebook\nVersi: 1.2\nHak Cipta: TECHNOVA Team",
            'digital-products/gerber-smart-energy-meter.zip' => "TECHNOVA DIGITAL PRODUCT\nJudul: Schematic & Gerber Smart Energy Meter\nFormat: Gerber PCB + BOM CSV\nVersi: Rev B\nHak Cipta: TECHNOVA Team",
        ];

        foreach ($digitalFiles as $filePath => $content) {
            Storage::disk('local')->put($filePath, $content);
        }

        $digitalProducts = [
            [
                'id_kategori' => $katDigital->id,
                'nama_produk' => 'Modul Praktikum IoT ESP32 (Jobsheet & Skematik)',
                'level' => 'BEGINNER, INTERMEDIATE',
                'format' => 'PDF + Code (ZIP)',
                'deskripsi' => 'Kumpulan 12 modul jobsheet praktikum IoT lengkap dengan skematik Fritzing, diagram pengkabelan, dan source code Arduino IDE siap pakai.',
                'harga' => 49000,
                'file_url' => 'digital-products/modul-praktikum-iot-esp32.zip',
            ],
            [
                'id_kategori' => $katDigital->id,
                'nama_produk' => 'Template Simulasi Sistem Kendali & DAQ (MATLAB / Simulink)',
                'level' => 'INTERMEDIATE',
                'format' => 'Simulink Model (.slx) + Guide (PDF)',
                'deskripsi' => 'Model simulasi akuisisi data dan kendali PID untuk sistem instrumentasi industri, pemodelan filter digital, dan kalibrasi sensor.',
                'harga' => 75000,
                'file_url' => 'digital-products/template-simulasi-daq-matlab.zip',
            ],
            [
                'id_kategori' => $katDigital->id,
                'nama_produk' => 'Jobsheet Praktikum Instrumentasi & Sensor Presisi',
                'level' => 'INTERMEDIATE, ADVANCED',
                'format' => 'PDF + Datasheet',
                'deskripsi' => 'Panduan laboratorium untuk eksperimen penguat sinyal instrumentasi (INA128), pengkondisi sinyal jembatan Wheatstone, dan kalibrasi presisi.',
                'harga' => 59000,
                'file_url' => 'digital-products/jobsheet-instrumentasi-sensor.pdf',
            ],
            [
                'id_kategori' => $katDigital->id,
                'nama_produk' => 'Schematic & Gerber Files: Smart Energy Meter PLTS',
                'level' => 'ADVANCED',
                'format' => 'Eagle / EasyEDA / Gerber (ZIP)',
                'deskripsi' => 'Desain PCB 2-layer siap fabrikasi untuk modul monitoring daya listrik AC/DC dengan sensor PZEM-004T dan antarmuka komunikasi LoRa/WiFi.',
                'harga' => 89000,
                'file_url' => 'digital-products/gerber-smart-energy-meter.zip',
            ],
        ];

        foreach ($digitalProducts as $dp) {
            $created = Produk::updateOrCreate(
                ['nama_produk' => $dp['nama_produk']],
                $dp
            );
        }

        // Testing akses produk
        // memberi test customer akses Unlocked product 1, dan Locked product 2
        $testCustomer = User::where('email', 'user@technova.id')->first();
        if ($testCustomer !== null) {
            $unlockedProduct = Produk::where('nama_produk', 'Modul Praktikum IoT ESP32 (Jobsheet & Skematik)')->first();
            if ($unlockedProduct !== null) {
                AksesProduk::updateOrCreate(
                    [
                        'id_user' => $testCustomer->id,
                        'id_produk' => $unlockedProduct->id,
                    ],
                    [
                        'status_akses' => 'Unlocked',
                    ]
                );
            }

            $lockedProduct = Produk::where('nama_produk', 'Template Simulasi Sistem Kendali & DAQ (MATLAB / Simulink)')->first();
            if ($lockedProduct !== null) {
                AksesProduk::updateOrCreate(
                    [
                        'id_user' => $testCustomer->id,
                        'id_produk' => $lockedProduct->id,
                    ],
                    [
                        'status_akses' => 'Locked',
                    ]
                );
            }
        }

        // Portfolios
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
