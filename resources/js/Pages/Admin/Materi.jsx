import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Materi() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua status');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const initialData = [
        {
            id: 1,
            berkas: 'esp32-iot-monitoring-v2.zip',
            konten: 'Lembar Kerja IoT ESP32',
            versi: 'v2.0',
            ukuran: '8.4 MB',
            status: 'Aktif',
        },
        {
            id: 2,
            berkas: 'electronics-fundamentals.pdf',
            konten: 'Dasar Elektronika',
            versi: 'v1.4',
            ukuran: '4.7 MB',
            status: 'Aktif',
        },
        {
            id: 3,
            berkas: 'lab-report-template.zip',
            konten: 'Paket Templat Laboratorium',
            versi: 'v3.1',
            ukuran: '1.2 MB',
            status: 'Aktif',
        },
        {
            id: 4,
            berkas: 'solar-pv-workbook.pdf',
            konten: 'Buku Kerja PLTS',
            versi: 'v1.0',
            ukuran: '6.1 MB',
            status: 'Tinjau',
        },
        {
            id: 5,
            berkas: 'sensor-calibration.xlsx',
            konten: 'Paket Kalibrasi',
            versi: 'v2.2',
            ukuran: '2.8 MB',
            status: 'Aktif',
        },
        {
            id: 6,
            berkas: 'daq-firmware.bin',
            konten: 'Dasar DAQ',
            versi: 'v0.9',
            ukuran: '820 KB',
            status: 'Draf',
        },
    ];

    const [materials, setMaterials] = useState(initialData);

    const filteredMaterials = materials.filter((item) => {
        const matchesSearch =
            item.berkas.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.konten.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'Semua status' || item.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Aktif':
                return 'text-emerald-700 bg-emerald-50 border border-emerald-200/60';
            case 'Tinjau':
                return 'text-amber-700 bg-amber-50 border border-amber-200/60';
            case 'Draf':
                return 'text-slate-600 bg-slate-100 border border-slate-200';
            default:
                return 'text-slate-700 bg-slate-50';
        }
    };

    return (
        <AdminLayout activeMenu="materi" pageTitle="Materi & unduhan">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0B1727] tracking-tight">
                        Materi & unduhan
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Kelola versi aset pengiriman untuk kursus, produk, dan serah terima proyek.
                    </p>
                </div>

                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-[#00D9C8] hover:bg-[#00c5b5] text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm cursor-pointer self-start md:self-auto"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Unggah materi</span>
                </button>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {/* Metric 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        PENYIMPANAN TERPAKAI
                    </span>
                    <div className="text-2xl font-black text-[#0B1727] mt-2 tracking-tight">
                        18.4 GB
                    </div>
                    <span className="text-xs text-slate-400 font-medium block mt-1">
                        81% kapasitas
                    </span>
                </div>

                {/* Metric 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        UNDUHAN
                    </span>
                    <div className="text-2xl font-black text-[#0B1727] mt-2 tracking-tight">
                        1.8k
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold block mt-1">
                        +15%
                    </span>
                </div>

                {/* Metric 3 */}
                <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        ASET AKTIF
                    </span>
                    <div className="text-2xl font-black text-[#0B1727] mt-2 tracking-tight">
                        64
                    </div>
                    <span className="text-xs text-slate-400 font-medium block mt-1">
                        5 diperbarui
                    </span>
                </div>

                {/* Metric 4 */}
                <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        TAUTAN HILANG
                    </span>
                    <div className="text-2xl font-black text-[#0B1727] mt-2 tracking-tight">
                        2
                    </div>
                    <span className="text-xs text-amber-600 font-medium block mt-1">
                        Perlu tindakan
                    </span>
                </div>
            </div>

            {/* Filter & Search Bar Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari materi..."
                        className="w-full pl-4 pr-10 py-2.5 bg-white text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 shadow-xs"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2.5">
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-9 text-sm text-slate-700 font-medium shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-400/40 cursor-pointer"
                        >
                            <option>Semua status</option>
                            <option>Aktif</option>
                            <option>Tinjau</option>
                            <option>Draf</option>
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </div>

                    <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-medium shadow-xs transition">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Data Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-xs overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-xl font-bold text-[#0B1727]">
                            Semua materi
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Catatan operasional dengan status terkini dan tindakan pengelolaan
                        </p>
                    </div>
                    <span className="text-xs font-bold tracking-wider text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                        {filteredMaterials.length} DATA DITAMPILKAN
                    </span>
                </div>

                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 rounded-xl text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                                <th className="py-3 px-4 rounded-l-xl">BERKAS</th>
                                <th className="py-3 px-4">KONTEN TERKAIT</th>
                                <th className="py-3 px-4">VERSI</th>
                                <th className="py-3 px-4">UKURAN</th>
                                <th className="py-3 px-4">STATUS</th>
                                <th className="py-3 px-4 text-right rounded-r-xl">TINDAKAN</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredMaterials.length > 0 ? (
                                filteredMaterials.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/60 transition group">
                                        <td className="py-4 px-4 font-mono text-xs font-semibold text-slate-800">
                                            {item.berkas}
                                        </td>
                                        <td className="py-4 px-4 text-slate-600 font-medium">
                                            {item.konten}
                                        </td>
                                        <td className="py-4 px-4 text-slate-500 font-mono text-xs">
                                            {item.versi}
                                        </td>
                                        <td className="py-4 px-4 text-slate-500 text-xs">
                                            {item.ukuran}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusBadge(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <button className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-8 text-center text-slate-400 text-sm">
                                        Tidak ada materi yang sesuai dengan pencarian atau filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Unggah Materi */}
            {isUploadModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900">
                                Unggah Materi Baru
                            </h3>
                            <button
                                onClick={() => setIsUploadModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const newMaterial = {
                                    id: materials.length + 1,
                                    berkas: formData.get('berkas') || 'file-tambahan.pdf',
                                    konten: formData.get('konten') || 'Materi Pelengkap',
                                    versi: formData.get('versi') || 'v1.0',
                                    ukuran: '2.5 MB',
                                    status: 'Aktif',
                                };
                                setMaterials([newMaterial, ...materials]);
                                setIsUploadModalOpen(false);
                            }}
                            className="space-y-4 mt-4"
                        >
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                    Nama Berkas
                                </label>
                                <input
                                    name="berkas"
                                    required
                                    placeholder="contoh: iot-cloud-intro.pdf"
                                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-400/40 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                    Konten Terkait
                                </label>
                                <input
                                    name="konten"
                                    required
                                    placeholder="contoh: Pengantar Cloud IoT"
                                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-400/40 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                    Versi
                                </label>
                                <input
                                    name="versi"
                                    defaultValue="v1.0"
                                    required
                                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-400/40 focus:outline-none"
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 text-sm font-bold bg-[#00D9C8] hover:bg-[#00c5b5] text-slate-900 rounded-xl shadow-xs"
                                >
                                    Simpan & Unggah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
