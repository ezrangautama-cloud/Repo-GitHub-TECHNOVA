import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function LayananSaya() {
    const [requests, setRequests] = useState([
        {
            id: 'REQ-00842',
            title: 'Konsultasi IoT',
            subtitle: 'REQ-00842 · Diajukan 16 Mar 2026',
            status: 'Selesai',
            statusType: 'success', // 'success' | 'pending'
            actionText: null,
            detail: 'Konsultasi perancangan arsitektur IoT MQTT dengan broker cloud dan visualisasi data real-time.'
        },
        {
            id: 'REQ-00843',
            title: 'Pendampingan kalibrasi sensor',
            subtitle: 'Diskusi kebutuhan dan kendala pembacaan sensor.',
            status: 'Menunggu balasan',
            statusType: 'pending',
            actionText: 'Balasan akan dikirim melalui email',
            detail: 'Kendala drift pembacaan sensor DHT22 dan kebutuhan kalibrasi presisi dengan probe digital.'
        },
        {
            id: 'REQ-00841',
            title: 'Konsultasi dasar elektronika',
            subtitle: 'Tinjauan rangkaian dan panduan langkah berikutnya.',
            status: 'Selesai',
            statusType: 'success',
            actionText: 'Sudah dibalas melalui email',
            detail: 'Evaluasi pemilihan resistor pembagi tegangan dan perlindungan input analog ESP32.'
        }
    ]);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    // Form state for Ajukan Layanan
    const [formData, setFormData] = useState({
        tipe: 'Konsultasi IoT',
        deskripsi: '',
        whatsapp: '081234567890',
        email: 'nadia@technova.id'
    });

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!formData.deskripsi.trim()) {
            showToast('Harap isi deskripsi kebutuhan layanan Anda.');
            return;
        }

        const newReq = {
            id: `REQ-0084${requests.length + 2}`,
            title: formData.tipe,
            subtitle: `Diajukan hari ini · ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}`,
            status: 'Menunggu balasan',
            statusType: 'pending',
            actionText: 'Balasan akan dikirim melalui email',
            detail: formData.deskripsi
        };

        setRequests([newReq, ...requests]);
        setModalOpen(false);
        setFormData({ ...formData, deskripsi: '' });
        showToast('Permintaan layanan berhasil diajukan! Tim TECHNOVA akan segera menghubungi Anda.');
    };

    return (
        <PortalLayout activeMenu="layanan-saya">
            <Head title="Layanan Saya - TECHNOVA" />

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#061426] text-white px-5 py-3 rounded-xl shadow-xl border border-cyan-500/40 flex items-center gap-3 animate-fade-in">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]"></span>
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Modal: Ajukan Layanan */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scale-up">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="font-extrabold text-base text-[#0B1727]">
                                    Ajukan Layanan Baru
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Konsultasikan kebutuhan teknis, IoT, dan kalibrasi dengan tim ahli TECHNOVA.
                                </p>
                            </div>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Jenis Layanan
                                </label>
                                <select
                                    value={formData.tipe}
                                    onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 font-medium"
                                >
                                    <option value="Konsultasi IoT">Konsultasi IoT & ESP32</option>
                                    <option value="Pendampingan kalibrasi sensor">Pendampingan Kalibrasi Sensor</option>
                                    <option value="Konsultasi dasar elektronika">Konsultasi Dasar Elektronika & PCB</option>
                                    <option value="Modernisasi Laboratorium">Modernisasi Laboratorium Digital</option>
                                    <option value="Audit Kapasitas PLTS">Audit Kapasitas PLTS</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                    Deskripsi Kebutuhan & Kendala
                                </label>
                                <textarea
                                    rows="4"
                                    value={formData.deskripsi}
                                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                                    placeholder="Jelaskan kebutuhan teknis Anda secara ringkas..."
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 resize-none font-medium placeholder-slate-400"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Email Pemohon
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        WhatsApp
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono"
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
                                    className="bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer active:scale-95"
                                >
                                    Kirim Permintaan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Detail Permintaan */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div>
                                <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider block">
                                    {selectedRequest.id}
                                </span>
                                <h3 className="font-extrabold text-base text-slate-900 mt-0.5">
                                    {selectedRequest.title}
                                </h3>
                            </div>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="py-4 space-y-3">
                            <div>
                                <span className="text-xs font-bold text-slate-500 block mb-1">Catatan Kebutuhan</span>
                                <p className="text-xs text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 font-medium">
                                    {selectedRequest.detail}
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-xs pt-2">
                                <span className="text-slate-500">Status Permintaan:</span>
                                <span className={`font-bold px-3 py-1 rounded-full text-xs ${
                                    selectedRequest.statusType === 'success'
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                        : 'bg-sky-50 text-sky-700 border border-sky-100'
                                }`}>
                                    {selectedRequest.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end pt-3 border-t border-slate-100">
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="bg-[#0B1E34] text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-800 cursor-pointer"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0B1727] tracking-tight">
                        Layanan Saya
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Pantau permintaan layanan dan konsultasi Anda.
                    </p>
                </div>

                {/* Ajukan Layanan Button (Cyan) */}
                <button
                    onClick={() => setModalOpen(true)}
                    className="bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs self-start sm:self-auto cursor-pointer active:scale-95"
                >
                    Ajukan Layanan
                </button>
            </div>

            {/* Main Card: Permintaan layanan */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-sm font-bold text-slate-900">
                        Permintaan layanan
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Lihat perkembangan permintaan atau hubungi tim TECHNOVA.
                    </p>
                </div>

                {/* Service Request List Items */}
                <div className="divide-y divide-slate-100">
                    {requests.map((item, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedRequest(item)}
                            className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition cursor-pointer group"
                        >
                            {/* Left info with Icon */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:border-cyan-400 group-hover:text-cyan-600 transition shrink-0">
                                    {/* Support / Service hand icon */}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 0A9 9 0 013 12a9 9 0 019-9m0 0a9 9 0 019 9 9 9 0 01-9 9m-6.364-5.636l3.536-3.536" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
                                    </svg>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-cyan-700 transition">
                                        {item.title}
                                    </h3>
                                    <p className="text-[11px] text-slate-400 mt-0.5 font-normal">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* Right Status Badge & Optional Action Note */}
                            <div className="flex items-center gap-4 sm:justify-end">
                                {/* Status Pill Badge */}
                                <span className={`text-[11px] font-bold px-3 py-1 rounded-full shrink-0 ${
                                    item.statusType === 'success'
                                        ? 'bg-[#DEF7EC] text-[#0E9F6E] border border-emerald-100'
                                        : 'bg-[#E0F7FA] text-[#00838F] border border-cyan-100'
                                }`}>
                                    {item.status}
                                </span>

                                {/* Optional Action Link text */}
                                {item.actionText && (
                                    <span 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            showToast(`Informasi: ${item.actionText}`);
                                        }}
                                        className="text-xs font-medium text-cyan-600 hover:text-cyan-700 hover:underline cursor-pointer hidden md:inline-block shrink-0"
                                    >
                                        {item.actionText}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footnote text */}
            <p className="text-xs text-slate-400 mt-4 font-normal">
                Detail kebutuhan dan balasan tim dapat dilihat pada masing-masing permintaan.
            </p>
        </PortalLayout>
    );
}
