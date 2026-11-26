import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Konsultasi() {
    const [consultations, setConsultations] = useState([
        {
            id: 1,
            title: 'Konsultasi IoT',
            meta: 'Nadia Putri - REQ-00842 - Diajukan 16 Mar 2026',
            body: 'Saya ingin menghubungkan ESP32 dengan sensor suhu dan kelembapan, lalu menampilkan hasilnya pada dasbor. Bagaimana alur pembacaan sensor dan pengiriman data yang disarankan? Mohon arahan untuk langkah awal dan komponen yang diperlukan.',
            email: 'nadia.putri@example.com',
            status: 'sudah', // 'belum' | 'sudah'
        },
        {
            id: 2,
            title: 'Pendampingan kalibrasi sensor',
            meta: 'Nadia Putri - Permintaan pendampingan',
            body: 'Hasil pembacaan sensor belum konsisten ketika dibandingkan dengan alat acuan. Bagaimana cara menentukan titik kalibrasi, mencatat penyimpangan, dan melakukan koreksi agar pengukuran lebih andal?',
            email: 'nadia.putri@example.com',
            status: 'belum',
        },
        {
            id: 3,
            title: 'Konsultasi dasar elektronika',
            meta: 'Nadia Putri - Permintaan konsultasi',
            body: 'Mohon bantuan untuk memeriksa susunan resistor dan LED, cara memilih nilai resistor pembatas arus, serta langkah pemeriksaan sebelum rangkaian diberi tegangan.',
            email: 'nadia.putri@example.com',
            status: 'sudah',
        },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setConsultations((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
    };

    return (
        <AdminLayout activeMenu="konsultasi" pageTitle="Konsultasi & Layanan">
            <Head title="Admin — Konsultasi & Layanan" />

            <div className="space-y-6">
                {/* Page Heading */}
                <div>
                    <h1 className="text-[28px] font-semibold text-[#0A1D33] leading-tight">
                        Konsultasi &amp; Layanan
                    </h1>
                    <p className="text-sm text-[#5A6B7F] mt-1">
                        Baca teks konsultasi peserta, lalu tandai status pengiriman balasan.
                    </p>
                </div>

                {/* Consultation Cards */}
                <div className="space-y-4">
                    {consultations.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-[#CFE0EE] rounded-lg p-5 sm:p-6 flex flex-col lg:flex-row gap-6 justify-between"
                        >
                            {/* Left: Consultation Details */}
                            <div className="flex-1 flex flex-col justify-between space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-[#0A1D33]">
                                        {item.title}
                                    </h2>
                                    <p className="text-xs text-[#5A6B7F] mt-1">
                                        {item.meta}
                                    </p>

                                    <div className="mt-4 space-y-1.5">
                                        <p className="text-[13px] font-semibold text-[#0A1D33]">
                                            Teks konsultasi
                                        </p>
                                        <p className="text-sm text-[#0A1D33] leading-relaxed">
                                            {item.body}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-[11px] text-[#5A6B7F] pt-2">
                                    {item.email}
                                </p>
                            </div>

                            {/* Right: Reply Status Box */}
                            <div className="w-full lg:w-[324px] bg-[#F4F8FC] rounded-lg p-4 flex flex-col justify-between shrink-0">
                                <div className="space-y-3">
                                    <h3 className="text-[13px] font-semibold text-[#0A1D33]">
                                        Status pengiriman balasan
                                    </h3>

                                    <div className="space-y-2.5">
                                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                            <input
                                                type="radio"
                                                name={`status-${item.id}`}
                                                checked={item.status === 'belum'}
                                                onChange={() => handleStatusChange(item.id, 'belum')}
                                                className="w-4 h-4 text-[#071A2F] border-[#CFE0EE] focus:ring-[#3AE7DF]"
                                            />
                                            <span className="text-sm text-[#0A1D33]">
                                                Belum dikirim
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                            <input
                                                type="radio"
                                                name={`status-${item.id}`}
                                                checked={item.status === 'sudah'}
                                                onChange={() => handleStatusChange(item.id, 'sudah')}
                                                className="w-4 h-4 text-[#071A2F] border-[#CFE0EE] focus:ring-[#3AE7DF]"
                                            />
                                            <span className="text-sm text-[#0A1D33]">
                                                Sudah dikirim
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <p className="text-xs text-[#5A6B7F] mt-4">
                                    Tandai setelah email balasan dikirim.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
