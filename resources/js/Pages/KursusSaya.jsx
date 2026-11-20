import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function KursusSaya() {
    const [activeTab, setActiveTab] = useState('kursus'); // 'kursus' | 'produk' | 'proyek'
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    // Tab 1: Kursus (4)
    const courses = [
        {
            id: 1,
            nama: 'ESP32 untuk IoT',
            tag: 'IOT · PEMULA',
            materi: '12 materi',
            deskripsi: 'Materi terstruktur dan proyek praktik IoT.',
            imageBg: 'from-slate-700 to-slate-900',
            label: 'Breadboard ESP32'
        },
        {
            id: 2,
            nama: 'Sistem Pemantauan IoT',
            tag: 'IOT · MONITORING',
            materi: '18 materi',
            deskripsi: 'Bangun sensor, konektivitas, dasbor, dan alur pemantauan yang andal.',
            imageBg: 'from-cyan-900 to-slate-900',
            label: 'Monitoring Workstation'
        },
        {
            id: 3,
            nama: 'Dasar PLTS',
            tag: 'ENERGI TERBARUKAN · PEMULA',
            materi: '8 materi',
            deskripsi: 'Pahami kapasitas PLTS, aliran energi, baterai, dan keputusan sistem.',
            imageBg: 'from-amber-900 to-slate-900',
            label: 'Solar PV Inspection'
        },
        {
            id: 4,
            nama: 'Dasar Elektronika',
            tag: 'ELEKTRONIKA · PEMULA',
            materi: '14 materi',
            deskripsi: 'Komponen dasar, pengukuran, rangkaian, dan praktik elektronika langsung.',
            imageBg: 'from-indigo-900 to-slate-900',
            label: 'Lab Workbench'
        }
    ];

    // Tab 2: Produk (6)
    const products = [
        {
            id: 1,
            headerBadge: 'PDF + KODE',
            category: 'IOT · ESP32',
            title: 'Lembar Kerja Pemantauan IoT ESP32',
            desc: 'PDF v2.0 + kode pendamping · Urutan praktik sensor hingga dasbor',
            btnAction: 'Akses Berkas',
        },
        {
            id: 2,
            headerBadge: 'PDF · 86 HAL',
            category: 'ELEKTRONIKA · PEMULA',
            title: 'Modul Elektronika Dasar',
            desc: 'PDF · Catatan konsep, contoh penyelesaian, dan latihan praktik',
            btnAction: 'Akses Berkas',
        },
        {
            id: 3,
            headerBadge: 'PDF + KODE · 12 PRAKTIKUM',
            category: 'ARDUINO · MIKROKONTROLER',
            title: 'Lembar Kerja Arduino Interaktif',
            desc: 'PDF + kode · Aktivitas mikrokontroler terpandu dengan kode awal',
            btnAction: 'Akses Berkas',
        },
        {
            id: 4,
            headerBadge: 'PDF · SIAP CETAK',
            category: 'PRAKTIKUM · TEMPLAT',
            title: 'Templat Laporan Praktikum',
            desc: 'PDF · Format pencatatan tujuan, alat, data, dan kesimpulan',
            btnAction: 'Unduh PDF',
        },
        {
            id: 5,
            headerBadge: 'PDF · BUKU KERJA',
            category: 'ENERGI TERBARUKAN · PLTS',
            title: 'Buku Kerja PLTS',
            desc: 'PDF · Kapasitas PLTS, aliran energi, baterai, dan keputusan sistem',
            btnAction: 'Unduh PDF',
        },
        {
            id: 6,
            headerBadge: 'PDF + KODE',
            category: 'SENSOR · KALIBRASI',
            title: 'Paket Kalibrasi Sensor',
            desc: 'PDF + kode · Diagram koneksi, pembacaan sensor, dan lembar pengamatan',
            btnAction: 'Akses Berkas',
        },
    ];

    // Tab 3: Proyek (3)
    const projects = [
        {
            id: 1,
            category: 'IOT · SENSOR · WI-FI',
            title: 'Pemantauan Lingkungan ESP32',
            desc: 'Panduan alur proyek - Integrasi sensor, konektivitas, dan tampilan dasbor',
            items: [
                'Dokumentasi rancangan sistem',
                'Panduan integrasi ESP32 & sensor',
                'Lembar validasi & dokumentasi',
            ]
        },
        {
            id: 2,
            category: 'ENERGI · PLTS · DAQ',
            title: 'Pemantauan Energi PLTS',
            desc: 'Pengukuran energi, pencatatan data, dan pemantauan sistem PLTS',
            items: [
                'Diagram rancangan sistem PLTS',
                'Panduan konfigurasi DAQ',
                'Lembar validasi hasil pengukuran',
            ]
        },
        {
            id: 3,
            category: 'INSTRUMENTASI · LAB DIGITAL',
            title: 'Instrumentasi Laboratorium Digital',
            desc: 'DAQ, sensor, dan alur pembelajaran laboratorium digital modern',
            items: [
                'Panduan instrumentasi & sensor',
                'Alur pengumpulan data laboratorium',
                'Lembar dokumentasi & validasi',
            ]
        },
    ];

    const currentSearchPlaceholder = 
        activeTab === 'produk' 
            ? 'Cari produk digital...' 
            : activeTab === 'proyek' 
                ? 'Cari proyek...' 
                : 'Cari kursus, layanan, atau materi...';

    return (
        <PortalLayout activeMenu="kursus-saya" searchPlaceholder={currentSearchPlaceholder}>
            <Head title="Kursus Saya - TECHNOVA" />

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#061426] text-white px-5 py-3 rounded-xl shadow-xl border border-cyan-500/40 flex items-center gap-3 animate-fade-in">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]"></span>
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0B1727] tracking-tight">
                        Kursus Saya
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        {activeTab === 'kursus' && 'Lanjutkan pembelajaran, unduh modul atau jelajahi materi tersimpan.'}
                        {activeTab === 'produk' && '6 produk digital yang telah Anda miliki — akses dan unduh kapan saja.'}
                        {activeTab === 'proyek' && '3 proyek yang telah Anda miliki — akses panduan dan berkas teknis kapan saja.'}
                    </p>
                </div>

                {/* Top Right Action Button */}
                {activeTab === 'kursus' && (
                    <Link
                        href="/kursus-saya/materi"
                        className="inline-flex items-center gap-2.5 bg-[#07172B] hover:bg-[#0B213E] text-white px-4 py-2.5 rounded-xl border border-slate-800 transition shadow-xs group self-start md:self-auto"
                    >
                        <span className="text-[10px] font-extrabold text-[#00F0FF] uppercase tracking-wider">
                            LANGKAH BERIKUTNYA
                        </span>
                        <span className="text-xs font-semibold text-slate-200">
                            Pilih ESP32 untuk IoT
                        </span>
                        <span className="text-cyan-400 text-sm font-bold group-hover:translate-x-0.5 transition-transform">
                            &rarr;
                        </span>
                    </Link>
                )}
            </div>

            {/* Tabs Filter Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
                {/* 3 Pills */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setActiveTab('kursus')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                            activeTab === 'kursus'
                                ? 'bg-[#0B1727] text-white shadow-xs'
                                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                    >
                        Kursus · 4
                    </button>
                    <button
                        onClick={() => setActiveTab('produk')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                            activeTab === 'produk'
                                ? 'bg-[#0B1727] text-white shadow-xs'
                                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                    >
                        Produk · 6
                    </button>
                    <button
                        onClick={() => setActiveTab('proyek')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                            activeTab === 'proyek'
                                ? 'bg-[#0B1727] text-white shadow-xs'
                                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                    >
                        Proyek · 3
                    </button>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2.5">
                    {activeTab === 'kursus' && (
                        <Link
                            href="/kursus"
                            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-medium transition shadow-2xs"
                        >
                            Jelajahi katalog
                        </Link>
                    )}
                    <button 
                        onClick={() => showToast('Filter diterapkan')}
                        className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-medium transition shadow-2xs"
                    >
                        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* ===================== TAB 1: KURSUS (4) ===================== */}
            {activeTab === 'kursus' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((c) => (
                        <Link
                            key={c.id}
                            href="/kursus-saya/materi"
                            className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-cyan-500/50 transition group block"
                        >
                            {/* Course Image Header */}
                            <div className={`h-40 bg-gradient-to-r ${c.imageBg} relative p-4 flex flex-col justify-end overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/30"></div>
                                <div className="relative z-10 flex items-center justify-between text-white text-xs">
                                    <span className="font-bold tracking-wide uppercase">{c.label}</span>
                                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                        Mulai Belajar
                                    </span>
                                </div>
                            </div>

                            {/* Course Content */}
                            <div className="p-5">
                                <div className="flex items-center justify-between text-[11px] mb-2 font-medium">
                                    <span className="text-cyan-600 font-bold uppercase">{c.tag}</span>
                                    <span className="text-slate-400">{c.materi}</span>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition">
                                    {c.nama}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 font-normal">
                                    {c.deskripsi}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* ===================== TAB 2: PRODUK DIGITAL (6) ===================== */}
            {activeTab === 'produk' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition"
                        >
                            <div>
                                {/* Top Dark Header Bar */}
                                <div className="bg-[#0B1F3A] text-white px-4 py-2.5 flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                                        {p.headerBadge}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="p-5">
                                    <div className="flex items-center justify-between text-[10px] mb-2">
                                        <span className="text-cyan-600 font-bold uppercase">{p.category}</span>
                                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                                            Dimiliki
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                                        {p.title}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
                                        {p.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="px-5 pb-5 pt-3 flex items-center gap-2 border-t border-slate-100">
                                <button
                                    onClick={() => showToast(`Mengunduh berkas ${p.title}...`)}
                                    className="bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold text-xs px-3.5 py-1.5 rounded-xl transition shadow-2xs cursor-pointer active:scale-95"
                                >
                                    {p.btnAction}
                                </button>
                                <button
                                    onClick={() => showToast(`Detail ${p.title}`)}
                                    className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-3.5 py-1.5 rounded-xl transition shadow-2xs cursor-pointer"
                                >
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ===================== TAB 3: PROYEK (3) ===================== */}
            {activeTab === 'proyek' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((proj) => (
                        <div
                            key={proj.id}
                            className="bg-[#0B1F3A] rounded-2xl overflow-hidden shadow-md text-white flex flex-col justify-between border border-slate-800"
                        >
                            <div>
                                {/* Project Image Header */}
                                <div className="h-36 bg-gradient-to-r from-slate-800 via-cyan-950 to-slate-900 relative p-4 flex items-end">
                                    <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                                        {proj.category}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-bold text-white">
                                            {proj.title}
                                        </h3>
                                        <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0">
                                            Akses Aktif
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4">
                                        {proj.desc}
                                    </p>

                                    {/* Checklist items */}
                                    <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                                        {proj.items.map((it, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-[11px]">{it}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="px-5 pb-5 pt-3 flex items-center gap-2 border-t border-slate-800/80">
                                <button
                                    onClick={() => showToast(`Mengunduh berkas panduan ${proj.title}...`)}
                                    className="bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold text-xs px-3.5 py-1.5 rounded-xl transition shadow-2xs cursor-pointer active:scale-95"
                                >
                                    Akses Berkas
                                </button>
                                <button
                                    onClick={() => showToast(`Membuka studi kasus ${proj.title}`)}
                                    className="bg-transparent border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition cursor-pointer"
                                >
                                    Lihat Proyek
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </PortalLayout>
    );
}
