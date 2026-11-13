import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Pengaturan() {
    // Form state corresponding to the mockup
    const [settings, setSettings] = useState({
        workspaceName: 'TECHNOVA',
        tagline: 'Teknik • Pendidikan • Inovasi',
        currency: 'IDR — Rupiah',
        paymentReview: 'Verifikasi manual',
        invoicePrefix: 'TN-',
        whatsappChannel: 'Terhubung · berakhiran 7812',
        cloudStorage: 'Terhubung · 18.4 GB terpakai',
    });

    // Notification toggle states
    const [notifications, setNotifications] = useState({
        prospekBaru: true,
        pembayaranVerifikasi: true,
        proyekJatuhTempo: true,
        kendalaUnduhan: false,
    });

    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const handleSave = (e) => {
        e.preventDefault();
        showToast('Perubahan pengaturan berhasil disimpan!');
    };

    const toggleNotification = (key) => {
        setNotifications((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <AdminLayout activeMenu="pengaturan" pageTitle="Pengaturan">
            <Head title="Pengaturan - TECHNOVA" />

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#061426] text-white px-5 py-3 rounded-xl shadow-xl border border-cyan-500/40 flex items-center gap-3 animate-fade-in">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            <form onSubmit={handleSave}>
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0B1727] tracking-tight">
                            Pengaturan
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Atur merek, transaksi, notifikasi, integrasi, dan keamanan.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-xs cursor-pointer self-start md:self-auto active:scale-95"
                    >
                        Simpan perubahan
                    </button>
                </div>

                {/* 2 Columns Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* ================= LEFT COLUMN ================= */}
                    <div className="space-y-6">
                        {/* Card 1: Merek & ruang kerja */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                            <h2 className="text-base font-bold text-slate-900 leading-tight">
                                Merek & ruang kerja
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5 mb-5">
                                Identitas publik dan pengaturan operasional standar.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Nama ruang kerja
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.workspaceName}
                                        onChange={(e) =>
                                            setSettings({ ...settings, workspaceName: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-medium text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Slogan publik
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.tagline}
                                        onChange={(e) =>
                                            setSettings({ ...settings, tagline: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-medium text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Transaksi */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                            <h2 className="text-base font-bold text-slate-900 mb-5 leading-tight">
                                Transaksi
                            </h2>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                            Mata uang
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.currency}
                                            onChange={(e) =>
                                                setSettings({ ...settings, currency: e.target.value })
                                            }
                                            className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-medium text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                            Tinjauan pembayaran
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.paymentReview}
                                            onChange={(e) =>
                                                setSettings({ ...settings, paymentReview: e.target.value })
                                            }
                                            className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-medium text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Awalan tagihan
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.invoicePrefix}
                                        onChange={(e) =>
                                            setSettings({ ...settings, invoicePrefix: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-medium text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT COLUMN ================= */}
                    <div className="space-y-6">
                        {/* Card 3: Notifikasi */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                            <h2 className="text-base font-bold text-slate-900 mb-4 leading-tight">
                                Notifikasi
                            </h2>

                            <div className="space-y-4">
                                {/* Item 1 */}
                                <div className="flex items-center justify-between py-1">
                                    <span className="text-xs font-medium text-slate-700">
                                        Prospek baru diterima
                                    </span>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={notifications.prospekBaru}
                                        onClick={() => toggleNotification('prospekBaru')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                            notifications.prospekBaru ? 'bg-[#0070F3]' : 'bg-slate-200'
                                        }`}
                                    >
                                        <span
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                                notifications.prospekBaru ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Item 2 */}
                                <div className="flex items-center justify-between py-1">
                                    <span className="text-xs font-medium text-slate-700">
                                        Pembayaran perlu diverifikasi
                                    </span>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={notifications.pembayaranVerifikasi}
                                        onClick={() => toggleNotification('pembayaranVerifikasi')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                            notifications.pembayaranVerifikasi ? 'bg-[#0070F3]' : 'bg-slate-200'
                                        }`}
                                    >
                                        <span
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                                notifications.pembayaranVerifikasi ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Item 3 */}
                                <div className="flex items-center justify-between py-1">
                                    <span className="text-xs font-medium text-slate-700">
                                        Proyek jatuh tempo dalam 3 hari
                                    </span>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={notifications.proyekJatuhTempo}
                                        onClick={() => toggleNotification('proyekJatuhTempo')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                            notifications.proyekJatuhTempo ? 'bg-[#0070F3]' : 'bg-slate-200'
                                        }`}
                                    >
                                        <span
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                                notifications.proyekJatuhTempo ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>

                                {/* Item 4 */}
                                <div className="flex items-center justify-between py-1">
                                    <span className="text-xs font-medium text-slate-700">
                                        Kendala unduhan materi
                                    </span>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={notifications.kendalaUnduhan}
                                        onClick={() => toggleNotification('kendalaUnduhan')}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                            notifications.kendalaUnduhan ? 'bg-[#0070F3]' : 'bg-slate-200'
                                        }`}
                                    >
                                        <span
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                                notifications.kendalaUnduhan ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Keamanan & integrasi */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
                            <h2 className="text-base font-bold text-slate-900 mb-5 leading-tight">
                                Keamanan & integrasi
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Kanal WhatsApp
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.whatsappChannel}
                                        onChange={(e) =>
                                            setSettings({ ...settings, whatsappChannel: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-medium text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                        Penyimpanan awan
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.cloudStorage}
                                        onChange={(e) =>
                                            setSettings({ ...settings, cloudStorage: e.target.value })
                                        }
                                        className="w-full px-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white text-xs font-medium text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
                                    />
                                </div>

                                {/* Soft Mint/Cyan Information Banner */}
                                <div className="bg-[#DFF6F2] border border-[#BCEEE4] rounded-xl p-3.5 mt-5">
                                    <p className="text-xs font-medium text-[#0A5450] leading-relaxed">
                                        Autentikasi dua faktor wajib bagi semua administrator.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
