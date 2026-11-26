import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Detail({ id = null, initialProduct = null }) {
    const [product, setProduct] = useState(initialProduct);
    const [loading, setLoading] = useState(!initialProduct);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    useEffect(() => {
        const productId = id || new URLSearchParams(window.location.search).get('id') || 1;
        fetch(`/api/digital-products/${productId}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((json) => {
                if (json?.data) {
                    setProduct(json.data);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [id]);

    const displayProduct = product || {
        id: 1,
        nama_produk: 'Modul Praktikum IoT ESP32 (Jobsheet & Skematik)',
        level: 'BEGINNER, INTERMEDIATE',
        format: 'PDF + Code (ZIP)',
        deskripsi: 'Kumpulan 12 modul jobsheet praktikum IoT lengkap dengan skematik Fritzing, diagram pengkabelan, dan source code Arduino IDE siap pakai.',
        harga: 49000,
        access_status: 'None',
        is_unlocked: false,
        is_file_ready: true,
        download_url: '/api/digital-products/1/download',
    };

    const modulesList = [
        { no: '01', title: 'Setup Toolchain Arduino IDE & Board Manager ESP32', format: 'PDF + Kode Awal' },
        { no: '02', title: 'Akuisisi Sensor Analog & Kalibrasi Nilai ADC 12-bit', format: 'PDF + Skematik' },
        { no: '03', title: 'Komunikasi Sensor Digital I2C & Tampilan OLED 0.96"', format: 'PDF + Source Code' },
        { no: '04', title: 'Konektivitas Wi-Fi & Pengiriman Data Protokol MQTT', format: 'PDF + Broker Config' },
        { no: '05', title: 'Visualisasi Data Real-time & Dashboard Kontrol Cloud', format: 'PDF + Full Project' },
    ];

    return (
        <div className="font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col selection:bg-cyan-500 selection:text-white">
            <Head title={`${displayProduct.nama_produk} - TECHNOVA`} />

            <Navbar active="produk-digital" />

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#061426] text-white px-5 py-3 rounded-xl shadow-xl border border-cyan-500/40 flex items-center gap-3 animate-fade-in">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]"></span>
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Hero Banner Section */}
            <section className="bg-[#061426] text-white pt-10 pb-16 px-6 border-b border-slate-800">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-8">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Link href="/" className="hover:text-white transition">Beranda</Link>
                            <span>/</span>
                            <Link href="/produk-digital" className="hover:text-white transition">Produk Digital</Link>
                            <span>/</span>
                            <span className="text-slate-200 truncate max-w-xs">{displayProduct.nama_produk}</span>
                        </div>

                        <Link
                            href="/produk-digital"
                            className="text-xs font-semibold text-[#00F0FF] hover:underline flex items-center gap-1.5 self-start sm:self-auto group"
                        >
                            <span className="group-hover:-translate-x-0.5 transition-transform">&larr;</span>
                            <span>Kembali ke katalog produk</span>
                        </Link>
                    </div>

                    {/* Product Main Header */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-[#00F0FF]/15 text-[#00F0FF] text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/30 uppercase tracking-wider">
                                    {displayProduct.format || 'DIGITAL PRODUCT'}
                                </span>
                                <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {displayProduct.level || 'SEMUA TINGKAT'}
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                                {displayProduct.nama_produk}
                            </h1>

                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                                {displayProduct.deskripsi}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-cyan-400 font-bold">&#10003;</span>
                                    <span>Format file terverifikasi</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-cyan-400 font-bold">&#10003;</span>
                                    <span>Skematik &amp; diagram koneksi</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-cyan-400 font-bold">&#10003;</span>
                                    <span>Akses unduh instan</span>
                                </div>
                            </div>
                        </div>

                        {/* Pricing / Download Card */}
                        <div className="lg:col-span-4 bg-[#0A1A2F] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                HARGA PRODUK
                            </span>
                            <div className="text-3xl font-black text-white">
                                Rp {Number(displayProduct.harga || 0).toLocaleString('id-ID')}
                            </div>

                            <div className="pt-3 border-t border-slate-800 text-xs space-y-2">
                                <div className="flex items-center justify-between text-slate-400">
                                    <span>Format Berkas:</span>
                                    <span className="text-white font-mono">{displayProduct.format}</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-400">
                                    <span>Status Akses:</span>
                                    <span className={displayProduct.is_unlocked ? 'text-emerald-400 font-bold' : 'text-amber-400 font-semibold'}>
                                        {displayProduct.is_unlocked ? 'Akses Aktif (Unlocked)' : 'Belum Dibeli'}
                                    </span>
                                </div>
                            </div>

                            {displayProduct.is_unlocked ? (
                                <a
                                    href={displayProduct.download_url || `/api/digital-products/${displayProduct.id}/download`}
                                    onClick={() => showToast('Mengunduh berkas produk...')}
                                    className="w-full bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold text-xs py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span>Unduh Berkas Sekarang</span>
                                </a>
                            ) : (
                                <Link
                                    href="/checkout"
                                    className="w-full bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold text-xs py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                                >
                                    <span>Dapatkan Akses Berkas</span>
                                    <span>&rarr;</span>
                                </Link>
                            )}

                            <p className="text-[11px] text-slate-400 text-center leading-tight">
                                Berkas siap diunduh dalam format arsip yang terstruktur.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Body Content: Modules & Breakdown */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                            <h2 className="text-base font-bold text-slate-900 mb-4">
                                Cakupan Berkas &amp; Jobsheet
                            </h2>
                            <div className="divide-y divide-slate-100">
                                {modulesList.map((m) => (
                                    <div key={m.no} className="py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center">
                                                {m.no}
                                            </span>
                                            <span className="text-xs font-bold text-slate-900">{m.title}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-[#0A5450] bg-[#DDF7F2] px-2.5 py-0.5 rounded-full">
                                            {m.format}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                            <h2 className="text-base font-bold text-slate-900 mb-2">
                                Cara Menggunakan Berkas
                            </h2>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Ekstrak berkas ZIP yang telah diunduh. Buka berkas jobsheet PDF sebagai panduan langkah demi langkah, dan buka folder skematik serta kode sumber menggunakan Arduino IDE / Visual Studio Code / MATLAB sesuai peruntukan modul.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#DDF7F2] border border-[#BCEEE4] rounded-2xl p-5">
                            <h3 className="text-xs font-bold text-[#0A5450] block mb-1">
                                Garansi Kesesuaian Kode
                            </h3>
                            <p className="text-xs text-[#136A63] leading-relaxed">
                                Seluruh skematik dan kode pendamping telah diuji secara fisik pada laboratorium instrumen TECHNOVA sebelum dipublikasikan.
                            </p>
                        </div>

                        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                            <h3 className="text-xs font-bold text-slate-900 mb-2">
                                Butuh Pendampingan Tambahan?
                            </h3>
                            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                Jika Anda membutuhkan bantuan integrasi sensor atau pemrograman lanjutan, ajukan konsultasi bersama tim teknis kami.
                            </p>
                            <Link
                                href="/layanan"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-700"
                            >
                                <span>Lihat Layanan Konsultasi</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
