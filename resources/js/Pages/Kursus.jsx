import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import HardwareIllustration from '@/Components/HardwareIllustration';

export default function Kursus() {
    const [selectedLevel, setSelectedLevel] = useState('Semua kursus');
    const [searchQuery, setSearchQuery] = useState('');

    const courses = [
        {
            id: 1,
            nama: 'ESP32 untuk IoT',
            tingkat: 'PEMULA',
            harga: 'Rp 149.000',
            meta: 'PEMULA · 18 MATERI · Video + Proyek',
            deskripsi: 'Materi terstruktur, penjelasan teknis yang jelas, dan proyek praktik IoT.',
            href: '/kursus/pengantar-iot'
        },
        {
            id: 2,
            nama: 'Sistem Pemantauan IoT',
            tingkat: 'MENENGAH',
            harga: 'Rp 199.000',
            meta: 'MENENGAH · 24 MATERI · Video + Proyek',
            deskripsi: 'Bangun sensor, konektivitas, dasbor, dan alur pemantauan yang andal.',
            href: '/kursus/pengantar-iot'
        },
        {
            id: 3,
            nama: 'Dasar Elektronika',
            tingkat: 'PEMULA',
            harga: 'Rp 99.000',
            meta: 'PEMULA · 14 MATERI · Video + PDF',
            deskripsi: 'Komponen dasar, pengukuran, rangkaian, dan praktik elektronika langsung.',
            href: '/kursus/pengantar-iot'
        },
        {
            id: 4,
            nama: 'Dasar PLTS',
            tingkat: 'PEMULA',
            harga: 'Rp 149.000',
            meta: 'PEMULA · 14 MATERI · Video + Buku Kerja',
            deskripsi: 'Pahami kapasitas PLTS, aliran energi, baterai, dan keputusan sistem yang aman.',
            href: '/kursus/pengantar-iot'
        }
    ];

    const filteredCourses = courses.filter((item) => {
        const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = selectedLevel === 'Semua kursus' || item.tingkat.toLowerCase() === selectedLevel.toLowerCase();
        return matchesSearch && matchesLevel;
    });

    return (
        <div className="font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col selection:bg-cyan-500 selection:text-white">
            <Head title="Katalog Kursus Teknik & IoT - TECHNOVA" />

            {/* Navbar with active="kursus" */}
            <Navbar active="kursus" />

            {/* ===================== HERO SECTION ===================== */}
            <section className="bg-[#061426] text-white pt-16 pb-20 px-6 border-b border-slate-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Left text */}
                    <div className="lg:col-span-7">
                        <span className="text-[11px] font-bold tracking-wider text-[#00F0FF] uppercase block mb-3">
                            PEMBELAJARAN BERBASIS PROYEK
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                            Kursus untuk keterampilan teknik yang mantap
                        </h1>
                        <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-8">
                            Pelajari konsep, keputusan, dan tahapan penerapan sistem teknis yang berfungsi.
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href="#katalog"
                                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#061426] font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
                            >
                                <span>Jelajahi solusi</span>
                                <span>&rarr;</span>
                            </a>
                            <a
                                href="#hubungi"
                                className="inline-flex items-center gap-2 bg-transparent hover:bg-cyan-950/40 text-[#00F0FF] border border-cyan-500/50 font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
                            >
                                <span>Hubungi TECHNOVA</span>
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

            {/* ===================== CATALOG SECTION ===================== */}
            <section id="katalog" className="py-14 px-6 max-w-7xl mx-auto w-full flex-1">
                {/* Header */}
                <div className="mb-8">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        KATALOG PEMBELAJARAN
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0B1727] tracking-tight">
                        Pilih jalur belajar terstruktur
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Teori ringkas, rumus jelas, dan proyek yang dapat dipelajari.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
                    {/* Level Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {['Semua kursus', 'Pemula', 'Menengah', 'Lanjutan'].map((lvl) => {
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
                                placeholder="Cari kursus..."
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

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition group"
                        >
                            <div>
                                {/* Level & Price Tag */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                        item.tingkat === 'MENENGAH'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                            : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                                    }`}>
                                        {item.tingkat}
                                    </span>
                                    <span className="text-xs font-bold text-slate-500">
                                        {item.harga}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition leading-snug">
                                    {item.nama}
                                </h3>

                                {/* Meta */}
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1.5">
                                    {item.meta}
                                </span>

                                {/* Description */}
                                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-normal">
                                    {item.deskripsi}
                                </p>
                            </div>

                            {/* Bottom Link */}
                            <div className="mt-5 pt-4 border-t border-slate-100">
                                <Link
                                    href={item.href}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition"
                                >
                                    <span>Lihat kursus</span>
                                    <span>&mdash;</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===================== BOTTOM BANNER STRIP ===================== */}
            <div className="bg-[#F1F5F9] border-t border-b border-slate-200/80 py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="font-bold text-slate-800">
                        Setiap kursus dilengkapi konteks praktik dan materi yang dapat digunakan kembali.
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                        VIDEO &middot; PDF &middot; PROYEK &middot; SERTIFIKAT
                    </span>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
