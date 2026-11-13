import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Prospek() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua status');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    const initialLeads = [
        {
            id: 1,
            prospek: 'Rina Pratama',
            perusahaan: 'Pribadi',
            minat: 'Prototipe IoT',
            penanggungJawab: 'Dimas',
            status: 'Baru',
            email: 'rina.pratama@gmail.com',
            telepon: '+62 813 2345 6789',
            catatan: 'Tertarik membuat prototype monitoring suhu & kelembaban berbasis ESP32.'
        },
        {
            id: 2,
            prospek: 'Lab Teknik UNS',
            perusahaan: 'Universitas',
            minat: 'Modernisasi laboratorium',
            penanggungJawab: 'Nadia',
            email: 'lab.elektro@uns.ac.id',
            telepon: '+62 271 646994',
            status: 'Terkualifikasi',
            catatan: 'Pengadaan modul praktikum instrumentasi industri dan IoT untuk 40 workstation.'
        },
        {
            id: 3,
            prospek: 'PT Surya Energi',
            perusahaan: 'Industri',
            minat: 'Pemantauan PLTS',
            penanggungJawab: 'Dimas',
            email: 'procurement@suryaenergi.co.id',
            telepon: '+62 21 5567 8900',
            status: 'Tindak lanjut',
            catatan: 'Proposal sistem SCADA dan dashboard analitik PLTS rooftop kapasitas 500kWp.'
        },
        {
            id: 4,
            prospek: 'Fahmi Akbar',
            perusahaan: 'Pribadi',
            minat: 'Kursus ESP32',
            penanggungJawab: 'Ayu',
            email: 'fahmi.akbar@student.id',
            telepon: '+62 857 1234 5678',
            status: 'Terkualifikasi',
            catatan: 'Mendaftar kursus intensif ESP32 tingkat lanjut untuk persiapan tugas akhir.'
        },
        {
            id: 5,
            prospek: 'SMK Teknologi',
            perusahaan: 'Sekolah',
            minat: 'Modul Instrumentasi',
            penanggungJawab: 'Nadia',
            email: 'info@smkteknologi.sch.id',
            telepon: '+62 22 7800 1234',
            status: 'Tindak lanjut',
            catatan: 'Pelatihan guru vokasi dan pengadaan 15 kit sensor otomasi industri.'
        },
        {
            id: 6,
            prospek: 'Aruna Systems',
            perusahaan: 'Industri',
            minat: 'Konsultasi DAQ',
            penanggungJawab: 'Dimas',
            email: 'contact@arunasystems.tech',
            telepon: '+62 21 8899 7766',
            status: 'Baru',
            catatan: 'Kebutuhan data acquisition kecepatan tinggi dengan sampling rate 100kS/s.'
        },
    ];

    const [leads, setLeads] = useState(initialLeads);

    const metrics = [
        {
            key: 'baru',
            label: 'PROSPEK BARU',
            value: '12',
            sub: '+4 hari ini',
        },
        {
            key: 'terkualifikasi',
            label: 'TERKUALIFIKASI',
            value: '36',
            sub: '28%',
        },
        {
            key: 'tindak_lanjut',
            label: 'TINDAK LANJUT',
            value: '18',
            sub: '6 terlambat',
        },
        {
            key: 'konversi',
            label: 'KONVERSI',
            value: '22%',
            sub: '+3.1%',
        },
    ];

    const filteredLeads = leads.filter((item) => {
        const matchesSearch =
            item.prospek.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.perusahaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.minat.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.penanggungJawab.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'Semua status' || item.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const handleCreateLead = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newLead = {
            id: leads.length + 1,
            prospek: formData.get('prospek') || 'Prospek Baru',
            perusahaan: formData.get('perusahaan') || 'Pribadi',
            minat: formData.get('minat') || 'Konsultasi IoT',
            penanggungJawab: formData.get('penanggungJawab') || 'Dimas',
            status: formData.get('status') || 'Baru',
            email: formData.get('email') || '-',
            telepon: formData.get('telepon') || '-',
            catatan: formData.get('catatan') || 'Catatan prospek baru.'
        };
        setLeads([newLead, ...leads]);
        setIsAddModalOpen(false);
        showToast('Prospek baru berhasil ditambahkan!');
    };

    return (
        <AdminLayout activeMenu="prospek" pageTitle="Pengelolaan prospek">
            <Head title="Pengelolaan Prospek - TECHNOVA" />

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#061426] text-white px-5 py-3 rounded-xl shadow-xl border border-cyan-500/40 flex items-center gap-3 animate-fade-in">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0B1727] tracking-tight">
                        Pengelolaan prospek
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Kualifikasi pertanyaan dari layanan, kursus, produk, dan kanal konsultasi.
                    </p>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-xs cursor-pointer self-start md:self-auto active:scale-95"
                >
                    <span className="text-sm font-bold leading-none">+</span>
                    <span>Tambah prospek</span>
                </button>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {metrics.map((metric) => (
                    <div
                        key={metric.key}
                        className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs"
                    >
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            {metric.label}
                        </span>
                        <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
                            {metric.value}
                        </div>
                        <span className="text-xs font-semibold text-slate-500 block mt-1">
                            {metric.sub}
                        </span>
                    </div>
                ))}
            </div>

            {/* Search & Filter Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
                {/* Search Input Bar */}
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari prospek..."
                        className="w-full px-4 py-2.5 bg-white text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 shadow-xs transition"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Right Filter Actions */}
                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                    {/* Status Select Dropdown */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-9 text-xs font-bold text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-400/40 cursor-pointer transition hover:border-slate-300"
                        >
                            <option value="Semua status">Semua status</option>
                            <option value="Baru">Baru</option>
                            <option value="Terkualifikasi">Terkualifikasi</option>
                            <option value="Tindak lanjut">Tindak lanjut</option>
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={() => {
                            if (statusFilter !== 'Semua status' || searchQuery) {
                                setStatusFilter('Semua status');
                                setSearchQuery('');
                                showToast('Filter direset');
                            } else {
                                showToast('Menampilkan seluruh data prospek aktif');
                            }
                        }}
                        className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition cursor-pointer"
                    >
                        <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M10 18h4" />
                        </svg>
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Main Data Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs overflow-hidden">
                {/* Table Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Semua prospek
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Catatan operasional dengan status terkini dan tindakan pengelolaan
                        </p>
                    </div>
                    <span className="text-[11px] font-bold tracking-wider text-cyan-600 uppercase self-start sm:self-auto">
                        {filteredLeads.length} DATA DITAMPILKAN
                    </span>
                </div>

                {/* Table Area */}
                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 rounded-xl text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                                <th className="py-3 px-4 rounded-l-xl">PROSPEK</th>
                                <th className="py-3 px-4">PERUSAHAAN</th>
                                <th className="py-3 px-4">MINAT</th>
                                <th className="py-3 px-4">PENANGGUNG JAWAB</th>
                                <th className="py-3 px-4">STATUS</th>
                                <th className="py-3 px-4 text-right rounded-r-xl">TINDAKAN</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                            {filteredLeads.length > 0 ? (
                                filteredLeads.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/60 transition group">
                                        <td className="py-4 px-4 font-bold text-slate-900">
                                            {item.prospek}
                                        </td>
                                        <td className="py-4 px-4 text-slate-600 font-medium">
                                            {item.perusahaan}
                                        </td>
                                        <td className="py-4 px-4 text-slate-700 font-medium">
                                            {item.minat}
                                        </td>
                                        <td className="py-4 px-4 text-slate-600 font-medium">
                                            {item.penanggungJawab}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="font-medium text-slate-800">
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <button
                                                onClick={() => setSelectedLead(item)}
                                                className="inline-flex items-center gap-1 font-bold text-slate-900 hover:text-cyan-600 transition cursor-pointer"
                                            >
                                                <span>Buka</span>
                                                <span className="text-sm leading-none">&rarr;</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                                        Tidak ada prospek yang sesuai dengan kriteria pencarian.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Detail Prospek ("Buka ->") */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    Detail Prospek
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Informasi lengkap dan catatan kualifikasi
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="text-slate-400 hover:text-slate-600 p-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                        Nama Prospek
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 block mt-1">
                                        {selectedLead.prospek}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                        Perusahaan / Kategori
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 block mt-1">
                                        {selectedLead.perusahaan}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                        Minat Layanan
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 block mt-1">
                                        {selectedLead.minat}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                        Penanggung Jawab
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 block mt-1">
                                        {selectedLead.penanggungJawab}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                        Email
                                    </span>
                                    <span className="text-xs font-mono text-slate-800 block mt-1">
                                        {selectedLead.email}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                        Status
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 block mt-1">
                                        {selectedLead.status}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    Catatan Operasional
                                </span>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {selectedLead.catatan}
                                </p>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    onClick={() => setSelectedLead(null)}
                                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                                >
                                    Tutup
                                </button>
                                <button
                                    onClick={() => {
                                        showToast(`Status prospek ${selectedLead.prospek} diperbarui`);
                                        setSelectedLead(null);
                                    }}
                                    className="px-4 py-2 text-xs font-bold text-[#061426] bg-[#00F0FF] hover:bg-cyan-300 rounded-xl shadow-xs"
                                >
                                    Perbarui Status
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Tambah Prospek */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900">
                                Tambah Prospek Baru
                            </h3>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleCreateLead} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Nama Prospek
                                    </label>
                                    <input
                                        name="prospek"
                                        required
                                        placeholder="contoh: PT Maju Bersama"
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Perusahaan / Kategori
                                    </label>
                                    <select
                                        name="perusahaan"
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
                                    >
                                        <option value="Industri">Industri</option>
                                        <option value="Universitas">Universitas</option>
                                        <option value="Sekolah">Sekolah</option>
                                        <option value="Pribadi">Pribadi</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Minat Layanan
                                    </label>
                                    <input
                                        name="minat"
                                        required
                                        placeholder="contoh: Prototipe IoT"
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Penanggung Jawab
                                    </label>
                                    <select
                                        name="penanggungJawab"
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
                                    >
                                        <option value="Dimas">Dimas</option>
                                        <option value="Nadia">Nadia</option>
                                        <option value="Ayu">Ayu</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="email@domain.com"
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
                                    >
                                        <option value="Baru">Baru</option>
                                        <option value="Terkualifikasi">Terkualifikasi</option>
                                        <option value="Tindak lanjut">Tindak lanjut</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Catatan Kualifikasi
                                </label>
                                <textarea
                                    name="catatan"
                                    rows="3"
                                    placeholder="Tuliskan catatan kebutuhan proyek atau konsultasi..."
                                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-xs font-bold text-[#061426] bg-[#00F0FF] hover:bg-cyan-300 rounded-xl shadow-xs"
                                >
                                    Simpan Prospek
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
