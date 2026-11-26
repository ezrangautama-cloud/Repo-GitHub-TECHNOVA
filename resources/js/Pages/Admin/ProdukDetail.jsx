import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ProdukDetail({ course = null }) {
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [enrolled, setEnrolled] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const courseTitle = course?.nama_produk || 'Pengantar IoT';
    const courseDesc = course?.deskripsi || 'Kenali cara perangkat, sensor, dan internet saling terhubung. Mulai dari konsep dasar sebelum melangkah ke pemrograman ESP32.';
    const isFree = !course || Number(course.harga || 0) === 0;
    const priceDisplay = isFree ? 'Rp0' : `Rp ${Number(course.harga).toLocaleString('id-ID')}`;
    const levelDisplay = course?.level || (isFree ? 'Gratis' : 'Berbayar');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const handleAccess = () => {
        setEnrolled(true);
        showToast('Berhasil mengakses kursus! Materi telah ditambahkan ke akun Anda.');
    };

    const modules = [
        {
            num: '01',
            title: 'Mengenal Internet of Things',
            desc: 'Pengantar · Konsep dan contoh sehari-hari',
            badge: 'Termasuk'
        },
        {
            num: '02',
            title: 'Perangkat, sensor, dan konektivitas',
            desc: 'Materi ringkas · Komponen utama sistem',
            badge: 'Termasuk'
        },
        {
            num: '03',
            title: 'Dari pengukuran menjadi informasi',
            desc: 'Ilustrasi alur · Sensor hingga dasbor',
            badge: 'Termasuk'
        },
        {
            num: '04',
            title: 'Latihan memetakan ide IoT',
            desc: 'Latihan mandiri · Rangkuman konsep',
            badge: 'Termasuk'
        }
    ];

    const learningPoints = [
        'Memahami alur sensor, perangkat, jaringan, dan data.',
        'Membedakan fungsi perangkat keras dan perangkat lunak IoT.',
        'Menyusun gambaran sederhana sistem pemantauan.'
    ];

    const perks = [
        '4 materi pengantar',
        'Rangkuman konsep IoT',
        'Latihan pemetaan sistem'
    ];

    return (
        <div className="font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col selection:bg-cyan-500 selection:text-white">
            <Head title="Pengantar IoT - Detail Kursus & Produk - TECHNOVA" />

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#061426] text-white px-5 py-3 rounded-xl shadow-xl border border-cyan-500/40 flex items-center gap-3 animate-fade-in">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]"></span>
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* ===================== TOPBAR NAVBAR ===================== */}
            <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 relative flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,240,255,0.85)]">
                                <polygon points="40,30 60,20 80,30 80,50 60,60 40,50" fill="#00F0FF" />
                                <polygon points="120,30 140,20 160,30 160,50 140,60 120,50" fill="#00F0FF" />
                                <path d="M 60 40 H 140 L 100 110 L 80 80 L 120 140 L 100 170 L 60 110" stroke="#00F0FF" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-xl font-black tracking-widest text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                            TECHNOVA
                        </span>
                    </Link>

                    {/* Navigation Menu Links */}
                    <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-700">
                        <Link href="/" className="hover:text-cyan-600 transition">Beranda</Link>
                        <Link href="/layanan" className="hover:text-cyan-600 transition">Layanan</Link>
                        <Link href="/kursus" className="text-slate-900 font-bold hover:text-cyan-600 transition">Kursus</Link>
                        <Link href="/produk-digital" className="hover:text-cyan-600 transition">Produk Digital</Link>
                        <Link href="/proyek" className="hover:text-cyan-600 transition">Proyek</Link>
                        <Link href="/tentang" className="hover:text-cyan-600 transition">Tentang</Link>
                    </nav>

                    {/* User Profile Badge (NP Nadia Putri) */}
                    <div className="relative">
                        <button
                            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            className="flex items-center gap-3 py-1 pl-1 pr-2 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                        >
                            <div className="w-9 h-9 rounded-full bg-[#E0F7FA] text-[#00838F] font-bold text-xs flex items-center justify-center border border-cyan-100">
                                NP
                            </div>
                            <div className="text-left hidden sm:block">
                                <span className="text-xs font-bold text-slate-900 block leading-tight">
                                    Nadia Putri
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium block leading-tight">
                                    Akun saya
                                </span>
                            </div>
                            <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {userDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                                <div className="px-4 py-2 border-b border-slate-100">
                                    <p className="text-xs font-bold text-slate-800">Nadia Putri</p>
                                    <p className="text-[11px] text-slate-400">nadia@technova.id</p>
                                </div>
                                <Link 
                                    href="/admin/materi" 
                                    onClick={() => setUserDropdownOpen(false)}
                                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                                >
                                    Konsol Admin
                                </Link>
                                <Link 
                                    href="/admin/profil" 
                                    onClick={() => setUserDropdownOpen(false)}
                                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                                >
                                    Profil Peserta
                                </Link>
                                <Link 
                                    href="/admin/pengaturan" 
                                    onClick={() => setUserDropdownOpen(false)}
                                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                                >
                                    Pengaturan
                                </Link>
                                <div className="border-t border-slate-100 my-1"></div>
                                <Link 
                                    href="/login" 
                                    className="block px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                                >
                                    Keluar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ===================== HERO / BANNER SECTION ===================== */}
            <section className="bg-[#061426] text-white pt-8 pb-14 px-6 border-b border-slate-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    {/* Top Breadcrumb & Back Link */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-8">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-slate-400">
                            <Link href="/" className="hover:text-white transition">Beranda</Link>
                            <span>/</span>
                            <Link href="/kursus" className="hover:text-white transition">Kursus</Link>
                            <span>/</span>
                            <span className="text-slate-200">{courseTitle}</span>
                        </div>

                        {/* Back Link */}
                        <Link
                            href="/kursus"
                            className="text-xs font-semibold text-[#00F0FF] hover:underline flex items-center gap-1.5 self-start sm:self-auto group"
                        >
                            <span className="group-hover:-translate-x-0.5 transition-transform">&larr;</span>
                            <span>Kembali ke katalog kursus</span>
                        </Link>
                    </div>

                    {/* Main Hero Content (2 columns) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Left Info */}
                        <div className="lg:col-span-7">
                            {/* Pills */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-white/10 text-white text-xs font-semibold px-3 py-0.5 rounded-full backdrop-blur-xs border border-white/10">
                                    Kursus
                                </span>
                                <span className="bg-white/10 text-white text-xs font-semibold px-3 py-0.5 rounded-full backdrop-blur-xs border border-white/10">
                                    {levelDisplay}
                                </span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                                {courseTitle}
                            </h1>

                            {/* Subtitle */}
                            <p className="text-sm md:text-base text-slate-300 mt-4 leading-relaxed max-w-xl font-normal">
                                {courseDesc}
                            </p>

                            {/* Highlights Meta Row */}
                            <div className="mt-8 text-xs font-semibold text-[#00F0FF] tracking-wide flex items-center gap-2">
                                <span>Materi pengantar</span>
                                <span>&middot;</span>
                                <span>4 materi</span>
                                <span>&middot;</span>
                                <span>Belajar mandiri</span>
                            </div>
                        </div>

                        {/* Right: Hardware Image Card */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-md w-full border border-slate-700/50">
                                {/* Hardware Illustration representing ESP32 Breadboard & Tools */}
                                <div className="relative bg-gradient-to-br from-slate-100 via-[#E4EDF5] to-slate-200 p-5 flex items-center justify-center min-h-[220px]">
                                    {/* Breadboard Visual Mockup */}
                                    <div className="w-full bg-[#FAFAFA] rounded-xl border border-slate-300 shadow-md p-4 relative overflow-hidden">
                                        {/* Breadboard tie points pattern */}
                                        <div className="absolute inset-x-3 top-2 flex justify-between">
                                            <div className="h-0.5 w-full bg-red-400 opacity-60"></div>
                                        </div>
                                        <div className="absolute inset-x-3 top-3.5 flex justify-between">
                                            <div className="h-0.5 w-full bg-blue-400 opacity-60"></div>
                                        </div>

                                        {/* Components Layout */}
                                        <div className="grid grid-cols-3 gap-3 items-center py-2 relative z-10">
                                            {/* Ultrasonic Sensor HC-SR04 */}
                                            <div className="bg-[#1976D2] text-white p-2 rounded-lg text-center shadow-xs border border-blue-400">
                                                <div className="flex justify-center gap-1.5 my-1">
                                                    <div className="w-3.5 h-3.5 rounded-full bg-slate-300 border border-slate-500"></div>
                                                    <div className="w-3.5 h-3.5 rounded-full bg-slate-300 border border-slate-500"></div>
                                                </div>
                                                <span className="text-[8px] font-bold tracking-tighter block uppercase">HC-SR04</span>
                                            </div>

                                            {/* ESP32 Microcontroller Module */}
                                            <div className="bg-[#1E293B] text-[#00F0FF] p-2.5 rounded-lg text-center shadow-lg border border-slate-600">
                                                <div className="w-5 h-6 mx-auto bg-slate-400 rounded-xs mb-1 opacity-80 border border-slate-500"></div>
                                                <span className="text-[9px] font-black tracking-widest block">ESP32</span>
                                                <div className="flex justify-center gap-0.5 mt-1">
                                                    <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping"></span>
                                                    <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                                                </div>
                                            </div>

                                            {/* OLED 0.96 Display & DHT */}
                                            <div className="space-y-1.5">
                                                <div className="bg-black text-[#00F0FF] p-1.5 rounded-md text-center border border-slate-700 shadow-xs">
                                                    <span className="text-[7px] font-mono block">TEMP 28°C</span>
                                                    <span className="text-[7px] font-mono block">HUM 65%</span>
                                                </div>
                                                <div className="bg-[#0288D1] text-white py-1 px-1.5 rounded text-center text-[7px] font-bold">
                                                    DHT11
                                                </div>
                                            </div>
                                        </div>

                                        {/* Colorful Jumper wires illustration */}
                                        <div className="flex justify-around pt-1">
                                            <span className="h-1 w-8 bg-amber-400 rounded-full"></span>
                                            <span className="h-1 w-10 bg-emerald-500 rounded-full"></span>
                                            <span className="h-1 w-6 bg-cyan-400 rounded-full"></span>
                                            <span className="h-1 w-8 bg-purple-400 rounded-full"></span>
                                        </div>
                                    </div>

                                    {/* Small tool badge */}
                                    <div className="absolute top-2 right-2 bg-slate-800/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md border border-slate-700">
                                        Hardware Kit
                                    </div>
                                </div>

                                {/* Caption Bar */}
                                <div className="p-3.5 bg-white border-t border-slate-100">
                                    <p className="text-xs text-slate-700 font-semibold">
                                        Pengantar konsep - Tidak memerlukan perangkat
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== BODY CONTENT SECTION ===================== */}
            <main className="flex-1 py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* ================= LEFT COLUMN (8 cols) ================= */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Card 1: Yang akan Anda kuasai */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                                <h2 className="text-base font-bold text-slate-900 mb-4">
                                    Yang akan Anda kuasai
                                </h2>

                                <div className="space-y-3">
                                    {learningPoints.map((point, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <span className="text-[#00B8D9] font-bold text-sm shrink-0 leading-tight">
                                                &#10003;
                                            </span>
                                            <span className="text-xs text-slate-700 font-medium leading-relaxed">
                                                {point}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card 2: Materi yang dipelajari */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                                <h2 className="text-base font-bold text-slate-900">
                                    Materi yang dipelajari
                                </h2>
                                <p className="text-xs text-slate-500 mt-0.5 mb-5">
                                    Periksa cakupan materi sebelum mengakses.
                                </p>

                                <div className="space-y-3">
                                    {modules.map((item) => (
                                        <div
                                            key={item.num}
                                            className="border border-slate-200/70 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-300 transition group bg-white"
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-cyan-50 group-hover:text-cyan-700 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0 transition">
                                                    {item.num}
                                                </div>
                                                <div>
                                                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-cyan-700 transition">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-[11px] text-slate-500 mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="text-[10px] font-bold text-[#0A5450] bg-[#DDF7F2] border border-[#BCEEE4] px-2.5 py-0.5 rounded-full shrink-0">
                                                {item.badge}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card 3: Persyaratan & akses */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                                <h2 className="text-base font-bold text-slate-900 mb-3">
                                    Persyaratan & akses
                                </h2>

                                <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
                                    Cukup siapkan komputer atau ponsel dengan koneksi internet. Tidak diperlukan pengalaman pemrograman maupun perangkat ESP32.
                                </p>

                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    Akses melalui akun TECHNOVA. Materi ini merupakan pengantar terpisah, bukan akses penuh ke kursus berbayar ESP32 untuk IoT.
                                </p>
                            </div>
                        </div>

                        {/* ================= RIGHT COLUMN (4 cols) ================= */}
                        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                            {/* Card 4: Pricing & CTA Box */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                    {isFree ? 'AKSES GRATIS' : 'AKSES KURSUS'}
                                </span>
                                <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
                                    {priceDisplay}
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5 pb-4 border-b border-slate-100">
                                    {isFree ? 'Tanpa pembayaran. Gunakan akun Anda.' : 'Akses penuh materi & studi kasus.'}
                                </p>

                                <div className="mt-4">
                                    <span className="text-xs font-bold text-slate-800 block mb-3">
                                        Yang Anda dapatkan
                                    </span>

                                    <div className="space-y-2.5">
                                        {perks.map((perk, idx) => (
                                            <div key={idx} className="flex items-center gap-2.5">
                                                <span className="text-[#00B8D9] font-bold text-xs shrink-0">
                                                    &#10003;
                                                </span>
                                                <span className="text-xs text-slate-700 font-medium">
                                                    {perk}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleAccess}
                                    className={`w-full font-bold text-xs py-2.5 rounded-xl transition shadow-xs mt-6 cursor-pointer active:scale-95 ${
                                        enrolled
                                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                            : 'bg-[#00F0FF] hover:bg-cyan-300 text-[#061426]'
                                    }`}
                                >
                                    {enrolled ? 'Materi Terbuka ✓' : 'Akses'}
                                </button>

                                <span className="text-[11px] text-slate-400 text-center block mt-3 leading-tight">
                                    Materi tersedia di akun setelah Anda memilih Akses.
                                </span>
                            </div>

                            {/* Card 5: Langsung mulai belajar */}
                            <div className="bg-[#DDF7F2] border border-[#BCEEE4] rounded-2xl p-5">
                                <span className="text-xs font-bold text-[#0A5450] block mb-1">
                                    Langsung mulai belajar
                                </span>
                                <p className="text-xs text-[#136A63] leading-relaxed">
                                    Tidak ada proses checkout. Buka materi dari akun TECHNOVA Anda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ===================== FOOTER SECTION ===================== */}
            <footer className="bg-[#061426] text-white pt-12 pb-10 px-6 border-t border-slate-800 mt-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
                        {/* Column 1: Brand Info */}
                        <div className="space-y-2">
                            <span className="text-base font-black tracking-widest text-white">
                                TECHNOVA
                            </span>
                            <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-normal">
                                Pendidikan teknik praktis, IoT, instrumentasi, energi terbarukan, dan solusi laboratorium.
                            </p>
                        </div>

                        {/* Column 2: Jelajahi */}
                        <div>
                            <span className="text-xs font-bold text-white block mb-2.5">
                                Jelajahi
                            </span>
                            <p className="text-xs text-slate-400 font-medium">
                                Layanan &middot; Kursus &middot; Produk &middot; Alat &middot; Proyek
                            </p>
                        </div>

                        {/* Column 3: Kontak */}
                        <div>
                            <span className="text-xs font-bold text-white block mb-2.5">
                                Kontak
                            </span>
                            <p className="text-xs text-slate-400 block font-medium">
                                Konsultasi WhatsApp
                            </p>
                            <p className="text-xs text-slate-400 block font-mono mt-0.5">
                                halo@technova.id
                            </p>
                        </div>

                        {/* Column 4: Slogan & Copyright */}
                        <div className="md:text-right">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                                TEKNIK &bull; PENDIDIKAN &bull; INOVASI
                            </span>
                            <p className="text-[11px] text-slate-400 font-medium">
                                &copy; TECHNOVA. Hak cipta dilindungi.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
