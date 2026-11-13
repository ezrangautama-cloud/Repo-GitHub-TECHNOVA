import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Pesanan() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua status');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    const initialOrders = [
        {
            id: 1,
            pesanan: '#TN-1048',
            pelanggan: 'Rizky A.',
            item: 'ESP32 untuk IoT',
            total: 'Rp 149.000',
            status: 'Dibayar',
            metode: 'Transfer Bank (BCA)',
            tanggal: '13 Nov 2026, 10:24 WIB',
            email: 'rizky.a@example.com'
        },
        {
            id: 2,
            pesanan: '#TN-1047',
            pelanggan: 'Lab Teknik UNS',
            item: 'Paket Lembar Kerja IoT',
            total: 'Rp 349.000',
            status: 'Tertunda',
            metode: 'Invoice Institusi',
            tanggal: '13 Nov 2026, 09:15 WIB',
            email: 'lab.elektro@uns.ac.id'
        },
        {
            id: 3,
            pesanan: '#TN-1046',
            pelanggan: 'Dewi Putri',
            item: 'Dasar Elektronika',
            total: 'Rp 99.000',
            status: 'Terkirim',
            metode: 'QRIS / GoPay',
            tanggal: '12 Nov 2026, 16:40 WIB',
            email: 'dewi.putri@gmail.com'
        },
        {
            id: 4,
            pesanan: '#TN-1045',
            pelanggan: 'Arif Setiawan',
            item: 'Buku Kerja PLTS',
            total: 'Rp 69.000',
            status: 'Dibayar',
            metode: 'Transfer Bank (Mandiri)',
            tanggal: '12 Nov 2026, 14:12 WIB',
            email: 'arif.setiawan@gmail.com'
        },
        {
            id: 5,
            pesanan: '#TN-1044',
            pelanggan: 'SMK Teknologi',
            item: 'Paket Templat Laboratorium',
            total: 'Rp 299.000',
            status: 'Terkirim',
            metode: 'Virtual Account BNI',
            tanggal: '11 Nov 2026, 11:05 WIB',
            email: 'smkteknologi@sch.id'
        },
        {
            id: 6,
            pesanan: '#TN-1043',
            pelanggan: 'Nadia Rahma',
            item: 'Sistem Pemantauan IoT',
            total: 'Rp 199.000',
            status: 'Gagal',
            metode: 'Kartu Kredit (Timeout)',
            tanggal: '10 Nov 2026, 18:30 WIB',
            email: 'nadia.rahma@yahoo.com'
        },
    ];

    const [orders, setOrders] = useState(initialOrders);

    const filteredOrders = orders.filter((item) => {
        const matchesSearch =
            item.pesanan.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.pelanggan.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.item.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'Semua status' || item.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const handleExport = () => {
        showToast('Data pesanan berhasil diekspor (CSV/Excel)!');
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Dibayar':
                return 'bg-[#D4EDE6] text-[#065F46]';
            case 'Tertunda':
                return 'bg-[#FEE2E2] text-[#991B1B]';
            case 'Terkirim':
                return 'bg-slate-100 text-slate-700';
            case 'Gagal':
                return 'bg-[#FFE4E6] text-[#BE123C]';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    const handleUpdateStatus = (newStatus) => {
        if (!selectedOrder) return;
        setOrders(
            orders.map((o) =>
                o.id === selectedOrder.id ? { ...o, status: newStatus } : o
            )
        );
        setSelectedOrder({ ...selectedOrder, status: newStatus });
        showToast(`Status pesanan ${selectedOrder.pesanan} diubah menjadi "${newStatus}"`);
    };

    return (
        <AdminLayout activeMenu="pesanan" pageTitle="Pesanan & pengiriman">
            <Head title="Pesanan & Pengiriman - TECHNOVA" />

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
                        Pesanan & pengiriman
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Verifikasi pembayaran, berikan akses, dan pantau setiap pengiriman digital.
                    </p>
                </div>

                <button
                    onClick={handleExport}
                    className="inline-flex items-center justify-center bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-xs cursor-pointer self-start md:self-auto active:scale-95"
                >
                    Ekspor pesanan
                </button>
            </div>

            {/* 2 Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Metric 1: TOTAL PRODUK */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        TOTAL PRODUK
                    </span>
                    <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
                        6
                    </div>
                </div>

                {/* Metric 2: TOTAL UANG DITERIMA */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        TOTAL UANG DITERIMA
                    </span>
                    <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
                        Rp218.000
                    </div>
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
                        placeholder="Cari pesanan..."
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
                    {/* Status Select Dropdown */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-9 text-xs font-bold text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-cyan-400/40 cursor-pointer transition hover:border-slate-300"
                        >
                            <option value="Semua status">Semua status</option>
                            <option value="Dibayar">Dibayar</option>
                            <option value="Tertunda">Tertunda</option>
                            <option value="Terkirim">Terkirim</option>
                            <option value="Gagal">Gagal</option>
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
                            setStatusFilter('Semua status');
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

            {/* Main Data Table Card: Semua pesanan */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs mb-6 overflow-hidden">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Semua pesanan
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
                                <th className="py-3 px-4 rounded-l-xl">Pesanan</th>
                                <th className="py-3 px-4">Pelanggan</th>
                                <th className="py-3 px-4">Item</th>
                                <th className="py-3 px-4">Total</th>
                                <th className="py-3 px-4 text-right rounded-r-xl">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((item) => (
                                    <tr 
                                        key={item.id} 
                                        onClick={() => setSelectedOrder(item)}
                                        className="hover:bg-slate-50/60 transition group cursor-pointer"
                                    >
                                        <td className="py-4 px-4 font-mono font-bold text-slate-800">
                                            {item.pesanan}
                                        </td>
                                        <td className="py-4 px-4 font-bold text-slate-900">
                                            {item.pelanggan}
                                        </td>
                                        <td className="py-4 px-4 text-slate-700 font-medium">
                                            {item.item}
                                        </td>
                                        <td className="py-4 px-4 font-medium text-slate-900">
                                            {item.total}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className={`inline-block font-bold text-xs px-3 py-1 rounded-lg ${getStatusStyle(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-slate-400 text-xs">
                                        Tidak ada pesanan yang sesuai dengan kriteria pencarian.
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
                    2
                </div>
            </div>

            {/* ===================== MODAL DETAIL PESANAN ===================== */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    Detail Pesanan {selectedOrder.pesanan}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Informasi transaksi dan pengiriman digital
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
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
                                        Pelanggan
                                    </span>
                                    <span className="text-xs font-bold text-slate-900 block mt-1">
                                        {selectedOrder.pelanggan}
                                    </span>
                                    <span className="text-[11px] text-slate-500 block">
                                        {selectedOrder.email}
                                    </span>
                                </div>
                                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                        Status Saat Ini
                                    </span>
                                    <span className={`inline-block font-bold text-xs px-2.5 py-1 rounded-md mt-1 ${getStatusStyle(selectedOrder.status)}`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                    Item Dibeli
                                </span>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs font-bold text-slate-900">
                                        {selectedOrder.item}
                                    </span>
                                    <span className="text-xs font-black text-slate-900">
                                        {selectedOrder.total}
                                    </span>
                                </div>
                                <span className="text-[11px] text-slate-500 block mt-1">
                                    Metode: {selectedOrder.metode} &middot; {selectedOrder.tanggal}
                                </span>
                            </div>

                            <div>
                                <span className="text-xs font-bold text-slate-700 block mb-2">
                                    Ubah Status Transaksi:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {['Dibayar', 'Tertunda', 'Terkirim', 'Gagal'].map((st) => (
                                        <button
                                            key={st}
                                            onClick={() => handleUpdateStatus(st)}
                                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                                                selectedOrder.status === st
                                                    ? 'bg-slate-900 text-white border-slate-900'
                                                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                                            }`}
                                        >
                                            {st}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="px-4 py-2 text-xs font-bold text-[#061426] bg-[#00F0FF] hover:bg-cyan-300 rounded-xl shadow-xs"
                                >
                                    Selesai
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
