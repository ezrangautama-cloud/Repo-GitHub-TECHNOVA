import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function Dashboard() {
    const transactions = [
        {
            id: 'INV-240318',
            item: 'ESP32 untuk IoT',
            tanggal: '16 Mar 2026',
            harga: 'Rp 149.000',
            status: 'Dibayar',
            statusType: 'success',
        },
        {
            id: 'REQ-00842',
            item: 'Konsultasi IoT',
            tanggal: '16 Mar 2026',
            harga: 'Dalam tinjauan',
            status: 'Buka',
            statusType: 'info',
        },
        {
            id: 'INV-240307',
            item: 'Dasar PLTS',
            tanggal: '07 Mar 2026',
            harga: 'Rp 99.000',
            status: 'Dibayar',
            statusType: 'success',
        },
    ];

    return (
        <PortalLayout activeMenu="dasbor">
            <Head title="Dasbor Peserta - TECHNOVA" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0B1727] tracking-tight">
                        Selamat datang kembali, Nadia!
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Terus belajar, berkarya, dan pantau permintaan Anda.
                    </p>
                </div>

                {/* Top Right Action Button */}
                <Link
                    href="/kursus-saya"
                    className="inline-flex items-center gap-2.5 bg-[#07172B] hover:bg-[#0B213E] text-white px-4 py-2.5 rounded-xl border border-slate-800 transition shadow-xs group self-start md:self-auto"
                >
                    <span className="text-[10px] font-extrabold text-[#00F0FF] uppercase tracking-wider">
                        LANGKAH BERIKUTNYA
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                        Buka Kursus Saya
                    </span>
                    <span className="text-cyan-400 text-sm font-bold group-hover:translate-x-0.5 transition-transform">
                        &rarr;
                    </span>
                </Link>
            </div>

            {/* Metric Card: KURSUS AKTIF */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs mb-6">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    KURSUS AKTIF
                </span>
                <div className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
                    4
                </div>
            </div>

            {/* Main Table Card: Transaksi terbaru */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs overflow-hidden">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Transaksi terbaru
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Kursus, layanan, dan pembayaran
                        </p>
                    </div>

                    <Link
                        href="/kursus-saya"
                        className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 hover:underline"
                    >
                        Lihat semua
                    </Link>
                </div>

                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-left border-collapse">
                        <tbody className="divide-y divide-slate-100 text-xs">
                            {transactions.map((trx) => (
                                <tr key={trx.id} className="hover:bg-slate-50/60 transition group">
                                    <td className="py-4 px-4 font-mono font-bold text-slate-800">
                                        {trx.id}
                                    </td>
                                    <td className="py-4 px-4 font-bold text-slate-900">
                                        {trx.item}
                                    </td>
                                    <td className="py-4 px-4 text-slate-500 font-medium">
                                        {trx.tanggal}
                                    </td>
                                    <td className="py-4 px-4 text-slate-700 font-medium">
                                        {trx.harga}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                                            trx.statusType === 'success'
                                                ? 'bg-[#D4EDE6] text-[#065F46]'
                                                : 'bg-[#E0F2FE] text-[#0369A1]'
                                        }`}>
                                            {trx.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <Link
                                            href="/kursus-saya"
                                            className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-cyan-600 transition"
                                        >
                                            <span>Lihat</span>
                                            <span className="text-sm leading-none">&rarr;</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PortalLayout>
    );
}
