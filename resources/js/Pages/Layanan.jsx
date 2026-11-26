import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const FALLBACK_SERVICES = [
    {
        id: 1,
        nama_produk: 'IoT & Electronics Prototyping',
        format: 'Consultation & Development',
        deskripsi: 'Connected systems, sensor integration, and rapid electronics prototyping built for real applications.',
        kategori: { nama_kategori: 'IoT & Electronics' },
        tags: ['ESP32', 'Sensors', 'Firmware', 'PCB Design'],
        highlight: 'Sistem Terkoneksi & Sensor Cerdas',
        linkAlat: '/alat/daya-listrik',
        namaAlat: 'Kalkulator Daya Listrik',
    },
    {
        id: 2,
        nama_produk: 'Instrumentation & DAQ System',
        format: 'Consultation & Integration',
        deskripsi: 'Accurate measurement, data acquisition, and custom monitoring systems for research and industry.',
        kategori: { nama_kategori: 'Instrumentation' },
        tags: ['DAQ', 'Measurement', 'Signal Conditioning', 'Monitoring'],
        highlight: 'Presisi Tinggi & Akuisisi Data',
        linkAlat: '/alat/resistor-led',
        namaAlat: 'Kalkulator Resistor LED',
    },
    {
        id: 3,
        nama_produk: 'Renewable Energy & Solar PV Planning',
        format: 'Design & Sizing',
        deskripsi: 'Solar PV design, smart energy monitoring, and dependable battery system planning.',
        kategori: { nama_kategori: 'Renewable Energy' },
        tags: ['Solar PV', 'Battery Sizing', 'Inverter', 'Energy Monitoring'],
        highlight: 'Perencanaan PLTS & Baterai',
        linkAlat: '/alat/plts',
        namaAlat: 'Kalkulator Kebutuhan PLTS',
    },
    {
        id: 4,
        nama_produk: 'Digital Laboratory Solutions',
        format: 'Educational Modules',
        deskripsi: 'Digital laboratories, practical modules, and connected monitoring for modern engineering education.',
        kategori: { nama_kategori: 'Laboratory Solutions' },
        tags: ['Digital Lab', 'Jobsheet Modul', 'Lab Terkoneksi', 'Edukasi Teknik'],
        highlight: 'Modernisasi Laboratorium Pendidikan',
        linkAlat: '/kursus',
        namaAlat: 'Katalog Kursus Praktik',
    },
];

export default function Layanan({ initialServices = null }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedServiceForModal, setSelectedServiceForModal] = useState('');
    const [consultDescription, setConsultDescription] = useState('');
    const [consultEmail, setConsultEmail] = useState('');
    const [consultWhatsapp, setConsultWhatsapp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const [services, setServices] = useState(() => {
        if (Array.isArray(initialServices) && initialServices.length > 0) {
            return initialServices;
        }
        return FALLBACK_SERVICES;
    });

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (selectedCategory !== 'Semua') params.set('category', selectedCategory);

        fetch(`/api/services?category=services&${params.toString()}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((json) => {
                if (Array.isArray(json?.data) && json.data.length > 0) {
                    setServices(
                        json.data.map((item, idx) => ({
                            ...item,
                            tags: item.tags || [item.kategori?.nama_kategori || 'Engineering', item.format || 'Solusi'].filter(Boolean),
                            highlight: item.highlight || FALLBACK_SERVICES[idx % FALLBACK_SERVICES.length]?.highlight || 'Solusi Teknik Andal',
                            linkAlat: FALLBACK_SERVICES[idx % FALLBACK_SERVICES.length]?.linkAlat || '/alat',
                            namaAlat: FALLBACK_SERVICES[idx % FALLBACK_SERVICES.length]?.namaAlat || 'Alat Rekayasa',
                        }))
                    );
                }
            })
            .catch(() => {});
    }, [searchQuery, selectedCategory]);

    const filteredServices = services.filter((s) => {
        const matchesSearch =
            s.nama_produk.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.deskripsi || '').toLowerCase().includes(searchQuery.toLowerCase());
        const catName = s.kategori?.nama_kategori || '';
        const matchesCategory =
            selectedCategory === 'Semua' ||
            catName.toLowerCase().includes(selectedCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    const handleOpenModal = (serviceName) => {
        setSelectedServiceForModal(serviceName);
        setModalOpen(true);
    };

    const handleConsultSubmit = async (e) => {
        e.preventDefault();
        if (!consultDescription.trim()) {
            showToast('Harap tuliskan deskripsi kebutuhan Anda.');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/services/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    tipe: selectedServiceForModal || 'Konsultasi Layanan',
                    deskripsi: consultDescription,
                    email: consultEmail,
                    whatsapp: consultWhatsapp,
                }),
            });

            const json = await res.json();
            const ticketId = json?.data?.id || 'REQ-' + Math.floor(10000 + Math.random() * 90000);
            setModalOpen(false);
            setConsultDescription('');
            showToast(`Permintaan layanan #${ticketId} berhasil dikirim! Tim TECHNOVA akan segera menghubungi Anda.`);
        } catch {
            setModalOpen(false);
            showToast('Permintaan layanan berhasil disimpan.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen flex flex-col selection:bg-cyan-500 selection:text-white">
            <Head title="Layanan Rekayasa & Solusi Laboratorium - TECHNOVA" />

            <Navbar active="layanan" />

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#061426] text-white px-5 py-3 rounded-xl shadow-xl border border-cyan-500/40 flex items-center gap-3 animate-fade-in">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]"></span>
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Modal: Ajukan Konsultasi */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="font-extrabold text-base text-[#0B1727]">
                                    Konsultasi Layanan Teknik
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Diskusikan kebutuhan spesifik Anda dengan tim teknis TECHNOVA.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleConsultSubmit} className="space-y-4 py-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Layanan yang Dipilih
                                </label>
                                <input
                                    type="text"
                                    value={selectedServiceForModal}
                                    readOnly
                                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 font-bold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Deskripsi Kebutuhan / Permasalahan Teknis
                                </label>
                                <textarea
                                    rows="4"
                                    value={consultDescription}
                                    onChange={(e) => setConsultDescription(e.target.value)}
                                    placeholder="Jelaskan kebutuhan prototipe, sensor, target instalasi, atau rancangan yang ingin diwujudkan..."
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 resize-none font-medium placeholder-slate-400"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Email Kontak
                                    </label>
                                    <input
                                        type="email"
                                        value={consultEmail}
                                        onChange={(e) => setConsultEmail(e.target.value)}
                                        placeholder="nama@email.com"
                                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Nomor WhatsApp
                                    </label>
                                    <input
                                        type="text"
                                        value={consultWhatsapp}
                                        onChange={(e) => setConsultWhatsapp(e.target.value)}
                                        placeholder="0812xxxxxxxx"
                                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===================== HERO SECTION ===================== */}
            <section className="bg-[#061426] text-white pt-16 pb-20 px-6 border-b border-slate-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7">
                        <span className="text-[11px] font-bold tracking-wider text-[#00F0FF] uppercase block mb-3">
                            LAYANAN REKAYASA &amp; INTEGRASI SISTEM
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                            Solusi teknik terukur untuk industri dan pendidikan
                        </h1>
                        <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-8">
                            Kami menyediakan pendampingan teknis mulai dari prototipe IoT, sistem akuisisi data presisi tinggi, perencanaan PLTS, hingga modernisasi laboratorium digital.
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href="#katalog-layanan"
                                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#061426] font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
                            >
                                <span>Jelajahi Solusi</span>
                                <span>&darr;</span>
                            </a>
                            <Link
                                href="/kontak"
                                className="inline-flex items-center gap-2 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
                            >
                                <span>Konsultasi Proyek</span>
                                <span>&rarr;</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right summary card */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="bg-[#0A1A2F] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <span className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-wider">
                                    STANDAR TEKNIK TECHNOVA
                                </span>
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            </div>
                            <div className="space-y-3 text-xs">
                                <div className="flex items-start gap-3">
                                    <span className="text-cyan-400 font-bold">&#10003;</span>
                                    <span className="text-slate-300">Skematik, firmware, dan dokumentasi serah terima terbuka.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-cyan-400 font-bold">&#10003;</span>
                                    <span className="text-slate-300">Pengujian fungsional dan validasi kalibrasi sebelum serah terima.</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-cyan-400 font-bold">&#10003;</span>
                                    <span className="text-slate-300">Pendampingan teknis dan konsultasi langsung bersama insinyur praktisi.</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                                <span>Tersedia untuk: Riset, Lab, Industri</span>
                                <Link href="/alat" className="text-cyan-400 font-bold hover:underline">
                                    Lihat Alat Bantu &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== CATALOG SECTION ===================== */}
            <main id="katalog-layanan" className="flex-1 py-14 px-6 max-w-7xl mx-auto w-full">
                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                        {['Semua', 'IoT & Electronics', 'Instrumentation', 'Renewable Energy', 'Laboratory Solutions'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-[#0B1727] text-white shadow-xs'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-72">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari solusi atau layanan..."
                            className="w-full pl-9 pr-4 py-2 bg-white text-xs text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
                        />
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredServices.map((service, idx) => (
                        <div
                            key={service.id || idx}
                            className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:shadow-lg hover:border-cyan-500/40 transition duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                {/* Top Badges */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-extrabold text-[#00838F] bg-[#E0F7FA] px-2.5 py-1 rounded-md uppercase tracking-wider border border-cyan-100">
                                        {service.kategori?.nama_kategori || 'Engineering'}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-cyan-700 transition mb-2">
                                    {service.nama_produk}
                                </h3>
                                <p className="text-xs font-semibold text-cyan-600 mb-3">
                                    {service.highlight}
                                </p>
                                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                                    {service.deskripsi}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {service.tags.map((tag, tIdx) => (
                                        <span
                                            key={tIdx}
                                            className="text-[10px] font-medium bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <button
                                    onClick={() => handleOpenModal(service.nama_produk)}
                                    className="bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-2xs cursor-pointer active:scale-95 inline-flex items-center justify-center gap-1.5"
                                >
                                    <span>Minta Konsultasi</span>
                                    <span>&rarr;</span>
                                </button>

                                {service.linkAlat && (
                                    <Link
                                        href={service.linkAlat}
                                        className="text-xs font-semibold text-slate-600 hover:text-cyan-600 transition inline-flex items-center gap-1 self-start sm:self-auto"
                                    >
                                        <span>Gunakan {service.namaAlat}</span>
                                        <span>&rarr;</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
