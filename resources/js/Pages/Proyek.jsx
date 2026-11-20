import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import HardwareIllustration from '@/Components/HardwareIllustration';

export default function Proyek() {
    const [selectedLevel, setSelectedLevel] = useState('Semua proyek');
    const [searchQuery, setSearchQuery] = useState('');

    const projects = [
        {
            id: 1,
            code: '01 IOT',
            nama: 'Pemantauan Lingkungan ESP32',
            meta: 'IoT · Sensor · Wi-Fi · Dasbor',
            tingkat: 'Belum ditetapkan',
            deskripsi: 'Sistem akuisisi data suhu, kelembaban, dan kualitas udara dengan sinkronisasi cloud real-time.'
        },
        {
            id: 2,
            code: '02 ENERGI',
            nama: 'Pemantauan Energi PLTS',
            meta: 'Pengukuran energi · Pencatatan data · PLTS',
            tingkat: 'Belum ditetapkan',
            deskripsi: 'Pencatatan produksi energi harian, efisiensi inverter, dan kalkulasi ROI pembangkit surya.'
        },
        {
            id: 3,
            code: '03 LAB',
            nama: 'Instrumentasi Laboratorium Digital',
            meta: 'DAQ · Sensor · Alur pembelajaran',
            tingkat: 'Belum ditetapkan',
            deskripsi: 'Modernisasi bangku praktikum teknik elektro dan instrumentasi dengan antarmuka digital terpusat.'
        }
    ];

    const filteredProjects = projects.filter((item) => {
        const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.meta.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = selectedLevel === 'Semua proyek' || item.tingkat.toLowerCase() === selectedLevel.toLowerCase();
        return matchesSearch && matchesLevel;
    });

    const workflowSteps = [
        { num: '01', title: 'Rumuskan masalah' },
        { num: '02', title: 'Siapkan instrumentasi sistem' },
        { num: '03', title: 'Validasi hasil' },
        { num: '04', title: 'Dokumentasikan serah terima' }
    ];

    return (
        <div className="font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col selection:bg-cyan-500 selection:text-white">
            <Head title="Katalog Proyek & Studi Kasus Teknik - TECHNOVA" />

            {/* Navbar with active="proyek" */}
            <Navbar active="proyek" />

            {/* ===================== HERO SECTION ===================== */}
            <section className="bg-[#061426] text-white pt-16 pb-20 px-6 border-b border-slate-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Left text */}
                    <div className="lg:col-span-7">
                        <span className="text-[11px] font-bold tracking-wider text-[#00F0FF] uppercase block mb-3">
                            CONTOH KARYA PROYEK
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                            Keputusan teknik yang transparan
                        </h1>
                        <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-8">
                            Studi kasus menunjukkan proses dari masalah teknis hingga sistem terdokumentasi yang siap pakai.
                        </p>

                        <div>
                            <a
                                href="#proyek"
                                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#061426] font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
                            >
                                <span>Diskusikan proyek</span>
                                <span>&rarr;</span>
                            </a>
                        </div>
                    </div>

                    {/* Right hardware illustration */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <HardwareIllustration />
                    </div>
                </div>
            </section>

            {/* ===================== PROJECTS CATALOG ===================== */}
            <section id="proyek" className="py-14 px-6 max-w-7xl mx-auto w-full flex-1">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0B1727] tracking-tight">
                        Sistem yang dirancang sesuai batasan nyata
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Contoh representatif diberi label jelas tanpa klaim kinerja yang direkayasa.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
                    {/* Level Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {['Semua proyek', 'Pemula', 'Menengah', 'Lanjutan'].map((lvl) => {
                            const isActive = selectedLevel === lvl;
                            return (
                                <button
                                    key={lvl}
                                    onClick={() => setSelectedLevel(lvl)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                                        isActive
                                            ? 'bg-[#0B1727] text-white shadow-xs font-bold'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                                    }`}
                                >
                                    {lvl}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search & Sort */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-full sm:w-60">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari proyek..."
                                className="w-full pl-9 pr-3.5 py-1.5 bg-white text-xs text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 shadow-xs"
                            />
                        </div>

                        <div className="flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 shadow-2xs shrink-0">
                            <span>Urutkan: Terbaru</span>
                            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 3 Large Dark Navy Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredProjects.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#0B1F3A] rounded-2xl p-6 text-white flex flex-col justify-between shadow-md border border-slate-800 hover:border-cyan-500/50 transition group"
                        >
                            <div>
                                {/* Status badge */}
                                <span className="inline-block text-[10px] font-bold tracking-wider text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-md uppercase">
                                    {item.tingkat}
                                </span>

                                {/* Code / Category */}
                                <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider block mt-4">
                                    {item.code}
                                </span>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-cyan-300 transition">
                                    {item.nama}
                                </h3>

                                {/* Meta */}
                                <p className="text-xs text-slate-400 mt-2 font-medium">
                                    {item.meta}
                                </p>
                            </div>

                            {/* Link Bottom */}
                            <div className="mt-8 pt-4 border-t border-slate-800/80">
                                <a
                                    href="#detail"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00F0FF] hover:underline"
                                >
                                    <span>Lihat studi kasus</span>
                                    <span>&mdash;</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===================== CYAN WORKFLOW BANNER ===================== */}
            <div className="bg-[#00F0FF] py-4 px-6 border-t border-cyan-400">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-[#061426]">
                    {workflowSteps.map((step) => (
                        <div key={step.num} className="flex items-center gap-2">
                            <span className="text-[#061426] font-black">{step.num}</span>
                            <span>{step.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
