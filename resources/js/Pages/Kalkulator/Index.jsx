import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Index() {
    const [quickV, setQuickV] = useState(220);
    const [quickI, setQuickI] = useState(2.5);

    const quickPower = (Number(quickV) || 0) * (Number(quickI) || 0);

    const tools = [
        {
            id: 'daya-listrik',
            title: 'Kalkulator Beban Daya Listrik',
            badge: 'DAYA & ENERGI',
            desc: 'Hitung total daya beban alat listrik (Watt), akumulasi energi harian (kWh), dan rekomendasi daya sambungan PLN yang tepat.',
            href: '/alat/daya-listrik',
            formula: 'P = V × I · Energi = Watt × Jam',
            icon: (
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            features: [
                'Pilihan preset peralatan rumah & lab',
                'Perhitungan energi harian (kWh)',
                'Rekomendasi daya kontrak PLN (VA)',
            ],
        },
        {
            id: 'plts',
            title: 'Kalkulator Kebutuhan PLTS',
            badge: 'ENERGI SURYA',
            desc: 'Rencanakan kapasitas sistem PLTS off-grid / on-grid, perkiraan jumlah panel surya (Wp), kapasitas baterai (Ah), dan ukuran inverter.',
            href: '/alat/plts',
            formula: 'Wp = Wh / (PSH × 0.75) · Ah = Wh / (Vsys × DoD)',
            icon: (
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            features: [
                'Dukungan baterai Lithium & Lead-Acid',
                'Perhitungan Peak Sun Hours (PSH)',
                'Sizing inverter dengan margin lonjakan daya',
            ],
        },
        {
            id: 'resistor-led',
            title: 'Kalkulator Resistor LED',
            badge: 'ELEKTRONIKA DASAR',
            desc: 'Tentukan nilai hambatan resistor pembatas arus LED dan pembagi tegangan, lengkap dengan pilihan nilai deret standar E12 / E24.',
            href: '/alat/resistor-led',
            formula: 'R = (V_s - V_f) / I_f · P = I² × R',
            icon: (
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            ),
            features: [
                'Pilihan warna LED (Merah, Hijau, Biru, Putih)',
                'Nilai terdekat deret standar komersial',
                'Analisis rating daya minimum resistor (Watt)',
            ],
        },
    ];

    return (
        <div className="font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col selection:bg-cyan-500 selection:text-white">
            <Head title="Alat Rekayasa & Kalkulator Teknik - TECHNOVA" />

            <Navbar active="layanan" />

            {/* ===================== HERO SECTION ===================== */}
            <section className="bg-[#061426] text-white pt-16 pb-20 px-6 border-b border-slate-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7">
                        <span className="text-[11px] font-bold tracking-wider text-[#00F0FF] uppercase block mb-3">
                            ENGINEERING TOOLS &amp; CALCULATORS
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                            Hitung cepat dengan dasar rumus yang transparan
                        </h1>
                        <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-8">
                            Alat bantu teknik bebas biaya untuk mahasiswa, praktisi, dan edukator. Dapatkan kalkulasi daya, estimasi PLTS, dan perhitungan komponen elektronik secara instan langsung di peramban Anda.
                        </p>
                    </div>

                    {/* Quick Calculator Widget */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="bg-[#0A1A2F] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl max-w-md w-full">
                            <span className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-wider block mb-1">
                                KALKULASI CEPAT DAYA LISTRIK
                            </span>
                            <p className="text-xs text-slate-400 mb-4">P = Tegangan (V) &times; Arus (I)</p>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Tegangan (V)</label>
                                    <input
                                        type="number"
                                        value={quickV}
                                        onChange={(e) => setQuickV(e.target.value)}
                                        className="w-full bg-[#061426] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Arus (Ampere)</label>
                                    <input
                                        type="number"
                                        value={quickI}
                                        onChange={(e) => setQuickI(e.target.value)}
                                        className="w-full bg-[#061426] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                                    />
                                </div>
                            </div>

                            <div className="bg-[#05111F] border border-cyan-900/40 rounded-xl p-4 flex items-center justify-between">
                                <span className="text-xs text-slate-400">Total Daya (P):</span>
                                <span className="text-2xl font-black text-[#00F0FF]">
                                    {quickPower.toLocaleString('id-ID', { maximumFractionDigits: 1 })} W
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== TOOLS GRID ===================== */}
            <main className="flex-1 py-14 px-6 max-w-7xl mx-auto w-full">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0B1727] tracking-tight">
                        Pilih Alat Rekayasa
                    </h2>
                    <p className="text-xs text-slate-500 mt-1.5">
                        Kalkulator terintegrasi dengan rumus standar teknik elektro dan energi terbarukan.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tools.map((t) => (
                        <div
                            key={t.id}
                            className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:shadow-xl hover:border-cyan-500/40 transition duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                                        {t.icon}
                                    </div>
                                    <span className="text-[10px] font-bold text-[#00838F] bg-[#E0F7FA] px-2.5 py-1 rounded-md uppercase tracking-wider">
                                        {t.badge}
                                    </span>
                                </div>

                                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-cyan-700 transition mb-2">
                                    {t.title}
                                </h3>

                                <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 font-mono text-[11px] text-slate-600 mb-3">
                                    {t.formula}
                                </div>

                                <p className="text-xs text-slate-600 leading-relaxed mb-5 font-normal">
                                    {t.desc}
                                </p>

                                <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                                    {t.features.map((f, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                                            <span className="text-cyan-500 font-bold">&#10003;</span>
                                            <span>{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href={t.href}
                                className="w-full bg-[#07172B] hover:bg-[#0B213E] text-white font-bold text-xs py-3 rounded-xl transition text-center shadow-xs group-hover:bg-[#00F0FF] group-hover:text-[#061426] transition-colors flex items-center justify-center gap-2"
                            >
                                <span>Buka Kalkulator</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
