import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function MateriBelajar() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(32); // 32% ~ 05:15 of 16:42
    const [currentTime, setCurrentTime] = useState('05:15');
    const [youtubeModalOpen, setYoutubeModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying) {
            showToast('Memutar video materi: Kalibrasi sensor suhu dan kelembapan DHT22');
        }
    };

    return (
        <PortalLayout activeMenu="kursus-saya">
            <Head title="Kalibrasi Sensor - ESP32 untuk IoT - TECHNOVA" />

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#061426] text-white px-5 py-3 rounded-xl shadow-xl border border-cyan-500/40 flex items-center gap-3 animate-fade-in">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]"></span>
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* YouTube Link Modal */}
            {youtubeModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                Tautan Materi YouTube Eksternal
                            </h3>
                            <button
                                onClick={() => setYoutubeModalOpen(false)}
                                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="py-4">
                            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                                Video materi ini juga dapat diakses langsung pada platform video streaming dengan resolusi penuh:
                            </p>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
                                <span className="truncate">https://youtu.be/technova-esp32-dht22-cal</span>
                                <button
                                    onClick={() => showToast('Tautan YouTube disalin ke clipboard')}
                                    className="bg-[#00F0FF] text-[#061426] font-bold text-[11px] px-3 py-1 rounded-lg hover:bg-cyan-300 ml-2 shrink-0"
                                >
                                    Salin
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end pt-3 border-t border-slate-100">
                            <button
                                onClick={() => setYoutubeModalOpen(false)}
                                className="bg-[#0B1E34] text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-800"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Navigation Row: Breadcrumb & Back Link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-4">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-slate-400">
                    <Link href="/kursus-saya" className="hover:text-cyan-600 transition font-medium">
                        Kursus Saya
                    </Link>
                    <span>&rsaquo;</span>
                    <span className="text-slate-500 font-medium">ESP32 untuk IoT</span>
                    <span>&rsaquo;</span>
                    <span className="text-slate-900 font-bold">Kalibrasi Sensor</span>
                </div>

                {/* Back to Kursus Saya Button */}
                <Link
                    href="/kursus-saya"
                    className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shadow-2xs self-start sm:self-auto group"
                >
                    <span className="group-hover:-translate-x-0.5 transition-transform">&larr;</span>
                    <span>Kembali ke Kursus Saya</span>
                </Link>
            </div>

            {/* Page Title & Subtitle Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#E0F7FA] text-[#00838F] text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-wider uppercase border border-cyan-100">
                        ESP32 UNTUK IOT
                    </span>
                    <span className="bg-[#DEF7EC] text-[#0E9F6E] text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-wider uppercase border border-emerald-100">
                        SEDANG BERJALAN
                    </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0B1727] tracking-tight">
                    Kalibrasi Sensor
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                    Pelajari cara mengkalibrasi sensor suhu dan kelembapan DHT22 pada ESP32 untuk pembacaan akurat.
                </p>
            </div>

            {/* Main Content: 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* ================= LEFT COLUMN: VIDEO PLAYER (8 cols) ================= */}
                <div className="lg:col-span-8">
                    <div className="bg-[#071322] rounded-2xl overflow-hidden shadow-xl border border-slate-800/80 relative flex flex-col justify-between aspect-video md:aspect-[16/9] min-h-[380px] sm:min-h-[440px]">
                        {/* Realistic Electronics Workbench Background */}
                        <div className="absolute inset-0 z-0 bg-[#0A1828] overflow-hidden">
                            {/* SVG Workbench Illustration */}
                            <svg className="w-full h-full object-cover" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="benchBg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#1e293b" />
                                        <stop offset="60%" stopColor="#0f172a" />
                                        <stop offset="100%" stopColor="#090d16" />
                                    </linearGradient>
                                    <pattern id="esdMat" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                                    </pattern>
                                </defs>

                                {/* Workbench Table Mat */}
                                <rect width="800" height="480" fill="url(#benchBg)" />
                                <rect x="40" y="80" width="720" height="360" rx="12" fill="#0b131f" stroke="#1e293b" strokeWidth="2" />
                                <rect x="40" y="80" width="720" height="360" fill="url(#esdMat)" opacity="0.3" />

                                {/* Background Tools (Laptop Screen on left) */}
                                <g transform="translate(70, 100)">
                                    {/* Laptop base */}
                                    <rect x="0" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                                    {/* Screen bezel */}
                                    <rect x="8" y="8" width="164" height="104" rx="3" fill="#06101e" />
                                    {/* IDE Code mock lines */}
                                    <rect x="14" y="16" width="60" height="4" rx="2" fill="#00F0FF" opacity="0.8" />
                                    <rect x="14" y="24" width="90" height="3" rx="1.5" fill="#94a3b8" opacity="0.6" />
                                    <rect x="24" y="31" width="110" height="3" rx="1.5" fill="#38bdf8" opacity="0.7" />
                                    <rect x="24" y="38" width="80" height="3" rx="1.5" fill="#94a3b8" opacity="0.5" />
                                    <rect x="14" y="46" width="45" height="3" rx="1.5" fill="#a855f7" opacity="0.7" />
                                    <rect x="24" y="54" width="100" height="3" rx="1.5" fill="#4ade80" opacity="0.7" />
                                    <rect x="24" y="61" width="70" height="3" rx="1.5" fill="#94a3b8" opacity="0.5" />
                                    <rect x="14" y="72" width="130" height="28" rx="3" fill="#030712" />
                                    <text x="20" y="88" fill="#00F0FF" fontSize="7" fontFamily="monospace">ESP32 DHT22: 26.8 C | 58.2 %</text>
                                    <text x="20" y="96" fill="#4ade80" fontSize="6" fontFamily="monospace">[CALIBRATION READY] Offset: -0.4C</text>
                                </g>

                                {/* Oscilloscope in middle background */}
                                <g transform="translate(280, 95)">
                                    <rect x="0" y="0" width="170" height="105" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                                    <rect x="10" y="10" width="95" height="65" rx="4" fill="#022c22" stroke="#047857" strokeWidth="1.5" />
                                    {/* Oscilloscope Grid & Waveform */}
                                    <path d="M 12 42 Q 25 15, 38 42 T 64 42 T 90 42" fill="none" stroke="#10b981" strokeWidth="2" />
                                    <text x="14" y="20" fill="#34d399" fontSize="6" fontFamily="monospace">CH1: 3.3V 100Hz</text>
                                    {/* Dials & Knobs */}
                                    <circle cx="125" cy="25" r="9" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
                                    <circle cx="150" cy="25" r="7" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
                                    <circle cx="125" cy="52" r="9" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
                                    <circle cx="150" cy="52" r="7" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
                                    <rect x="10" y="82" width="150" height="14" rx="2" fill="#94a3b8" />
                                </g>

                                {/* Soldering Stand on right background */}
                                <g transform="translate(480, 110)">
                                    <rect x="0" y="20" width="70" height="60" rx="8" fill="#1e3a8a" stroke="#172554" strokeWidth="2" />
                                    <circle cx="35" cy="45" r="14" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
                                    <rect x="60" y="0" width="8" height="70" rx="4" fill="#cbd5e1" transform="rotate(35 60 0)" />
                                    <circle cx="100" cy="55" r="10" fill="#f97316" opacity="0.8" />
                                </g>

                                {/* Multimeter on far right */}
                                <g transform="translate(580, 100)">
                                    <rect x="0" y="0" width="80" height="120" rx="10" fill="#ea580c" stroke="#c2410c" strokeWidth="3" />
                                    <rect x="10" y="12" width="60" height="30" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                                    <text x="16" y="32" fill="#1e293b" fontSize="13" fontFamily="monospace" fontWeight="bold">3.308 V</text>
                                    <circle cx="40" cy="65" r="14" fill="#1e293b" />
                                    <rect x="38" y="55" width="4" height="10" fill="#ffffff" />
                                    <circle cx="22" cy="100" r="5" fill="#dc2626" />
                                    <circle cx="40" cy="100" r="5" fill="#1e293b" />
                                    <circle cx="58" cy="100" r="5" fill="#dc2626" />
                                </g>

                                {/* Foreground: Hands holding Tweezers & DHT22 / ESP32 */}
                                <g transform="translate(240, 240)">
                                    {/* Breadboard */}
                                    <rect x="60" y="20" width="220" height="140" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                                    <line x1="70" y1="28" x2="270" y2="28" stroke="#ef4444" strokeWidth="2" opacity="0.6" />
                                    <line x1="70" y1="36" x2="270" y2="36" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />

                                    {/* ESP32 Module mounted */}
                                    <rect x="90" y="50" width="65" height="90" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                                    <rect x="98" y="58" width="48" height="35" rx="2" fill="#94a3b8" />
                                    <text x="106" y="78" fill="#0f172a" fontSize="7" fontWeight="bold">ESP32</text>
                                    <circle cx="102" cy="102" r="2" fill="#00F0FF" />
                                    <circle cx="108" cy="102" r="2" fill="#ef4444" />

                                    {/* DHT22 Sensor (White grid casing) */}
                                    <g transform="translate(180, 55)">
                                        <rect x="0" y="0" width="40" height="50" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                                        {/* DHT grid slots */}
                                        <line x1="8" y1="12" x2="32" y2="12" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                                        <line x1="8" y1="18" x2="32" y2="18" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                                        <line x1="8" y1="24" x2="32" y2="24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                                        <line x1="8" y1="30" x2="32" y2="30" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                                        <line x1="8" y1="36" x2="32" y2="36" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                                        <text x="7" y="45" fill="#475569" fontSize="6" fontWeight="bold">DHT22</text>
                                    </g>

                                    {/* Jumper Wires connecting sensor to ESP32 */}
                                    <path d="M 155 70 C 165 40, 175 40, 185 65" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                                    <path d="M 155 80 C 165 50, 175 50, 192 65" fill="none" stroke="#00F0FF" strokeWidth="2.5" />
                                    <path d="M 155 90 C 165 60, 175 60, 200 65" fill="none" stroke="#10b981" strokeWidth="2.5" />
                                    <path d="M 155 100 C 165 70, 175 70, 208 65" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

                                    {/* Stylized Hands holding calibration probe/tweezers */}
                                    {/* Left hand sleeve & fingers */}
                                    <path d="M -80 160 C -40 140, -10 110, 50 110 C 60 110, 70 120, 50 135 C 30 150, -30 180, -70 200 Z" fill="#d4a373" opacity="0.9" />
                                    {/* Right hand sleeve & probe */}
                                    <path d="M 380 170 C 340 145, 290 120, 240 100 C 230 95, 220 105, 240 120 C 270 140, 320 180, 360 210 Z" fill="#d4a373" opacity="0.9" />
                                    {/* Precision Tweezers / Probe */}
                                    <path d="M 240 100 L 200 70 L 235 90" fill="#64748b" stroke="#334155" strokeWidth="2" />
                                </g>
                            </svg>

                            {/* Dark gradient overlay for video control readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40 pointer-events-none"></div>
                        </div>

                        {/* Top Bar inside Video: 1080P Badge */}
                        <div className="relative z-10 p-5 flex items-center justify-between">
                            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-white/20 tracking-wider">
                                1080P
                            </span>
                            <span className="text-[10px] font-bold text-white/70 bg-slate-900/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                                TECHNOVA Workshop Lab
                            </span>
                        </div>

                        {/* Center Play Button Overlay */}
                        <div className="relative z-10 flex items-center justify-center my-auto">
                            <button
                                onClick={togglePlay}
                                className="w-16 h-16 rounded-full bg-[#00F0FF] text-[#061426] flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:scale-110 active:scale-95 transition-all cursor-pointer group"
                                aria-label={isPlaying ? 'Jeda video' : 'Putar video'}
                            >
                                {isPlaying ? (
                                    <svg className="w-7 h-7 text-[#061426]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-7 h-7 text-[#061426] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Bottom Overlay: Title, Progress Scrubber, and Video Controls */}
                        <div className="relative z-10 p-5 pt-0">
                            {/* Video Title */}
                            <h2 className="text-white text-sm sm:text-base font-bold drop-shadow-md mb-2.5 tracking-wide">
                                Kalibrasi sensor suhu dan kelembapan DHT22
                            </h2>

                            {/* Progress Bar Scrubber */}
                            <div
                                onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const clickX = e.clientX - rect.left;
                                    const newPct = Math.round((clickX / rect.width) * 100);
                                    setProgress(newPct);
                                    showToast(`Diposisikan ke menit ${(newPct * 0.16).toFixed(1)}`);
                                }}
                                className="w-full h-1.5 bg-white/25 hover:h-2 rounded-full cursor-pointer relative overflow-hidden transition-all group mb-2.5"
                            >
                                <div
                                    className="h-full bg-[#00F0FF] rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>

                            {/* Bottom Controls Row */}
                            <div className="flex items-center justify-between text-white/90 text-xs font-mono">
                                {/* Timecode */}
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={togglePlay}
                                        className="text-white hover:text-cyan-400 p-0.5 transition cursor-pointer"
                                        aria-label={isPlaying ? 'Jeda' : 'Putar'}
                                    >
                                        {isPlaying ? (
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        )}
                                    </button>
                                    <span className="font-semibold tracking-wider">{currentTime} / 16:42</span>
                                </div>

                                {/* Right Controls: CC, Settings, Fullscreen */}
                                <div className="flex items-center gap-3 text-white/80">
                                    {/* Subtitle / CC */}
                                    <button
                                        onClick={() => showToast('Subtitle Bahasa Indonesia aktif')}
                                        className="hover:text-cyan-400 font-bold text-[10px] border border-white/40 px-1.5 py-0.5 rounded transition cursor-pointer"
                                        title="Teks Terjemahan / CC"
                                    >
                                        CC
                                    </button>

                                    {/* Settings */}
                                    <button
                                        onClick={() => showToast('Kualitas video: 1080p 60fps')}
                                        className="hover:text-cyan-400 transition cursor-pointer"
                                        title="Pengaturan Kualitas"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>

                                    {/* Fullscreen */}
                                    <button
                                        onClick={() => showToast('Beralih ke mode layar penuh')}
                                        className="hover:text-cyan-400 transition cursor-pointer"
                                        title="Layar Penuh"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT COLUMN: PLAYLIST & CONTROLS (4 cols) ================= */}
                <div className="lg:col-span-4 space-y-4">
                    {/* Active Lesson Playlist Card */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
                        {/* Aktif Badge */}
                        <div className="mb-3">
                            <span className="text-[10px] font-extrabold text-[#00838F] bg-[#E0F7FA] px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-cyan-100">
                                Aktif
                            </span>
                        </div>

                        {/* Active Lesson Box */}
                        <div className="bg-[#EAF6F8] rounded-xl p-3.5 border border-cyan-200/70 flex items-start gap-3">
                            {/* Cyan play circle icon */}
                            <div className="w-6 h-6 rounded-full bg-[#00F0FF] text-[#061426] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                <svg className="w-3.5 h-3.5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-xs font-bold text-slate-900 leading-snug">
                                    Kalibrasi sensor suhu & kelembapan DHT22
                                </h3>
                                <button
                                    onClick={() => setYoutubeModalOpen(true)}
                                    className="text-[11px] text-slate-500 hover:text-cyan-700 block mt-1 hover:underline cursor-pointer font-medium"
                                >
                                    link youtube
                                </button>
                            </div>
                        </div>

                        {/* Extra Course Materials list for rich user experience */}
                        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                            <div className="flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 py-1.5 px-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <span className="flex items-center gap-2">
                                    <span className="w-4 text-center text-slate-400 font-bold text-[10px]">01</span>
                                    <span>Instalasi Library DHT pada ESP32</span>
                                </span>
                                <span className="text-[10px] text-emerald-600 font-bold">&#10003; Selesai</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 py-1.5 px-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <span className="flex items-center gap-2">
                                    <span className="w-4 text-center text-slate-400 font-bold text-[10px]">03</span>
                                    <span>Penanganan Jeda Pembacaan (Non-blocking)</span>
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">12 min</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons Row: Sebelumnya & Berikutnya */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => showToast('Membuka materi sebelumnya: Instalasi Library DHT')}
                            className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <span>&lsaquo;</span>
                            <span>Sebelumnya</span>
                        </button>
                        <button
                            onClick={() => showToast('Membuka materi berikutnya: Penanganan Jeda Pembacaan')}
                            className="flex-1 bg-[#0B1E34] hover:bg-[#122C4A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <span>Berikutnya</span>
                            <span>&rsaquo;</span>
                        </button>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}
