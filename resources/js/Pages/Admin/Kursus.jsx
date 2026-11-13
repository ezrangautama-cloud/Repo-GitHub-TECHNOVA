import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Kursus() {
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState('Semua tingkat');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    const initialCourses = [
        {
            id: 1,
            nama: 'ESP32 untuk IoT',
            tingkat: 'Pemula',
            harga: 'Rp 149.000',
        },
        {
            id: 2,
            nama: 'Sistem Pemantauan IoT',
            tingkat: 'Menengah',
            harga: 'Rp 199.000',
        },
        {
            id: 3,
            nama: 'Dasar Elektronika',
            tingkat: 'Pemula',
            harga: 'Rp 99.000',
        },
        {
            id: 4,
            nama: 'Dasar PLTS',
            tingkat: 'Pemula',
            harga: 'Rp 149.000',
        },
        {
            id: 5,
            nama: 'Praktikum Integrasi Sensor',
            tingkat: 'Lanjutan',
            harga: 'Rp 229.000',
        },
        {
            id: 6,
            nama: 'Dasar DAQ',
            tingkat: 'Menengah',
            harga: 'Rp 129.000',
        },
    ];

    const [courses, setCourses] = useState(initialCourses);

    const filteredCourses = courses.filter((item) => {
        const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = levelFilter === 'Semua tingkat' || item.tingkat.toLowerCase() === levelFilter.toLowerCase();
        return matchesSearch && matchesLevel;
    });

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const handleDelete = (id, name) => {
        if (confirm(`Apakah Anda yakin ingin menghapus kursus "${name}"?`)) {
            setCourses(courses.filter((c) => c.id !== id));
            showToast(`Kursus "${name}" berhasil dihapus.`);
        }
    };

    const handleCreateCourse = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCourse = {
            id: courses.length + 1,
            nama: formData.get('nama') || 'Kursus Baru',
            tingkat: formData.get('tingkat') || 'Pemula',
            harga: formData.get('harga') || 'Rp 149.000',
        };
        setCourses([newCourse, ...courses]);
        setIsAddModalOpen(false);
        showToast(`Kursus "${newCourse.nama}" berhasil ditambahkan!`);
    };

    const handleUpdateCourse = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setCourses(
            courses.map((c) =>
                c.id === editItem.id
                    ? {
                          ...c,
                          nama: formData.get('nama'),
                          tingkat: formData.get('tingkat'),
                          harga: formData.get('harga'),
                      }
                    : c
            )
        );
        setEditItem(null);
        showToast('Kursus berhasil diperbarui!');
    };

    return (
        <AdminLayout activeMenu="kursus" pageTitle="Pengelolaan kursus">
            <Head title="Pengelolaan Kursus - TECHNOVA" />

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
                        Pengelolaan kursus
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Buat, terbitkan, dan pantau program pembelajaran teknik terstruktur.
                    </p>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-xs cursor-pointer self-start md:self-auto active:scale-95"
                >
                    <span className="text-sm font-bold leading-none">+</span>
                    <span>Tambah kursus</span>
                </button>
            </div>

            {/* Metric Card 1: TOTAL KURSUS */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs mb-6">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    TOTAL KURSUS
                </span>
                <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
                    8
                </div>
            </div>

            {/* Search & Filter Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
                {/* Search Input Bar */}
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari kursus..."
                        className="w-full px-4 py-2.5 bg-white text-xs text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 shadow-xs transition"
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
                    {/* Level Select Dropdown */}
                    <div className="relative">
                        <select
                            value={levelFilter}
                            onChange={(e) => setLevelFilter(e.target.value)}
                            className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-9 text-xs font-bold text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-400/40 cursor-pointer transition hover:border-slate-300"
                        >
                            <option value="Semua tingkat">Semua tingkat</option>
                            <option value="Pemula">Pemula</option>
                            <option value="Menengah">Menengah</option>
                            <option value="Lanjutan">Lanjutan</option>
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
                            setLevelFilter('Semua tingkat');
                            setSearchQuery('');
                            showToast('Filter direset');
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

            {/* Main Data Table Card: Semua kursus */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs mb-6 overflow-hidden">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Semua kursus
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Catatan operasional dengan status terkini dan tindakan pengelolaan
                        </p>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-cyan-600 uppercase self-start sm:self-auto">
                        6 DATA DITAMPILKAN
                    </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 rounded-xl text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                                <th className="py-3 px-4 rounded-l-xl">Kursus</th>
                                <th className="py-3 px-4">Tingkat</th>
                                <th className="py-3 px-4">Harga</th>
                                <th className="py-3 px-4 text-right rounded-r-xl">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/60 transition group">
                                        <td className="py-4 px-4 font-bold text-slate-900">
                                            <Link 
                                                href={`/kursus/pengantar-iot`} 
                                                className="hover:text-cyan-600 transition"
                                            >
                                                {item.nama}
                                            </Link>
                                        </td>
                                        <td className="py-4 px-4 text-slate-700 font-medium">
                                            {item.tingkat}
                                        </td>
                                        <td className="py-4 px-4 text-slate-900 font-medium">
                                            {item.harga}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setEditItem(item)}
                                                    className="bg-[#D4EDE6] hover:bg-[#c2e7dc] text-[#061426] font-bold px-3 py-1 rounded-lg text-xs transition cursor-pointer shadow-2xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.nama)}
                                                    className="bg-[#FEE2E2] hover:bg-[#fcd0d0] text-[#991B1B] font-bold px-3 py-1 rounded-lg text-xs transition cursor-pointer shadow-2xs"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-slate-400 text-xs">
                                        Tidak ada kursus yang sesuai dengan kriteria pencarian.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Card: consultation */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <span className="text-xs font-bold text-slate-800 block">
                    consultation
                </span>
                <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
                    3
                </div>
            </div>

            {/* ===================== MODAL TAMBAH KURSUS ===================== */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900">
                                Tambah Kursus Baru
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

                        <form onSubmit={handleCreateCourse} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Nama Kursus
                                </label>
                                <input
                                    name="nama"
                                    required
                                    placeholder="contoh: Dasar Instrumentasi Industri"
                                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Tingkat
                                    </label>
                                    <select
                                        name="tingkat"
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
                                    >
                                        <option value="Pemula">Pemula</option>
                                        <option value="Menengah">Menengah</option>
                                        <option value="Lanjutan">Lanjutan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Harga
                                    </label>
                                    <input
                                        name="harga"
                                        required
                                        placeholder="Rp 149.000"
                                        defaultValue="Rp 149.000"
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
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
                                    Simpan Kursus
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ===================== MODAL EDIT KURSUS ===================== */}
            {editItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900">
                                Edit Kursus
                            </h3>
                            <button
                                onClick={() => setEditItem(null)}
                                className="text-slate-400 hover:text-slate-600 p-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleUpdateCourse} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Nama Kursus
                                </label>
                                <input
                                    name="nama"
                                    defaultValue={editItem.nama}
                                    required
                                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Tingkat
                                    </label>
                                    <select
                                        name="tingkat"
                                        defaultValue={editItem.tingkat}
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
                                    >
                                        <option value="Pemula">Pemula</option>
                                        <option value="Menengah">Menengah</option>
                                        <option value="Lanjutan">Lanjutan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Harga
                                    </label>
                                    <input
                                        name="harga"
                                        defaultValue={editItem.harga}
                                        required
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditItem(null)}
                                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-xs font-bold text-[#061426] bg-[#00F0FF] hover:bg-cyan-300 rounded-xl shadow-xs"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
