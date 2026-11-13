import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function Profil() {
    // User profile state so user can edit and see live changes
    const [profile, setProfile] = useState({
        name: 'Jaa Nurul',
        role: 'Peserta',
        track: 'Jalur Teknik',
        subRole: 'Peserta IoT & Instrumentasi',
        completion: '86%',
        bio: 'Membangun sistem sensor praktis dan belajar mendokumentasikan keputusan teknik dengan jelas.',
        longBio: 'Pelajar elektronika dan energi yang berfokus pada integrasi sensor andal, dasbor IoT, dan solusi lapangan terdokumentasi.',
        location: 'Bandung, Indonesia',
        joinedDate: 'Bergabung Jan 2025',
        memberId: 'TN-LRN-24817',
        studyTrack: 'IoT & Instrumentasi',
        experience: 'Menengah',
        email: 'jaa.nurul@example.com',
        phone: '+62 812 8844 2109'
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({ ...profile });
    const [toastMessage, setToastMessage] = useState('');
    const [showAllCertificates, setShowAllCertificates] = useState(false);

    const stats = [
        {
            key: 'selesai',
            label: 'SELESAI',
            value: '12',
            unit: 'Kursus',
            highlight: true,
            unitColor: 'text-emerald-700'
        },
        {
            key: 'aktif',
            label: 'AKTIF',
            value: '4',
            unit: 'Kursus',
            highlight: false,
            unitColor: 'text-cyan-600'
        },
        {
            key: 'sertifikat',
            label: 'SERTIFIKAT',
            value: '6',
            unit: 'Diterbitkan',
            highlight: false,
            unitColor: 'text-slate-500'
        },
        {
            key: 'waktu_belajar',
            label: 'WAKTU BELAJAR',
            value: '98 jam',
            unit: 'Total',
            highlight: false,
            unitColor: 'text-cyan-600'
        },
        {
            key: 'proyek',
            label: 'PROYEK',
            value: '2.4k',
            unit: 'Poin',
            highlight: false,
            unitColor: 'text-cyan-600'
        },
        {
            key: 'permintaan_layanan',
            label: 'PERMINTAAN LAYANAN',
            value: '5',
            unit: 'Selesai',
            highlight: false,
            unitColor: 'text-cyan-600'
        }
    ];

    const certificates = [
        { name: 'ESP32 untuk IoT', year: '2026' },
        { name: 'Dasar Elektronika', year: '2025' },
        { name: 'Dasar PLTS', year: '2025' },
        { name: 'Sensor & Transduser Industri', year: '2025' },
        { name: 'Protokol MQTT & Modbus', year: '2024' },
        { name: 'Mikrokontroler STM32 Tingkat Dasar', year: '2024' }
    ];

    const achievements = [
        'Penjelajah IoT',
        'Pengembang Proyek',
        'Pendukung Komunitas',
        'Nilai Tugas 92%'
    ];

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setProfile({ ...editFormData });
        setIsEditModalOpen(false);
        showToast('Profil berhasil diperbarui!');
    };

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3500);
    };

    const handleExport = () => {
        showToast('Riwayat belajar sedang diunduh (PDF)...');
    };

    return (
        <PortalLayout activeMenu="profil" user={profile}>
            <Head title="Profil Peserta - TECHNOVA" />

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#061426] text-white px-5 py-3 rounded-xl shadow-xl border border-cyan-500/40 flex items-center gap-3 animate-fade-in">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Profil
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Tinjau identitas, riwayat belajar, pencapaian, dan profil publik Anda.
                    </p>
                </div>

                {/* Top Right Action Button */}
                <Link
                    href="/admin/pengaturan"
                    className="inline-flex items-center gap-2.5 bg-[#07172B] hover:bg-[#0B213E] text-white px-4 py-2.5 rounded-xl border border-slate-800 transition shadow-xs group self-start md:self-auto"
                >
                    <span className="text-[10px] font-extrabold text-[#00F0FF] uppercase tracking-wider">
                        LANGKAH BERIKUTNYA
                    </span>
                    <span className="text-xs font-semibold text-slate-200">
                        Buka Pengaturan untuk mengelola preferensi
                    </span>
                    <span className="text-cyan-400 text-sm font-bold group-hover:translate-x-0.5 transition-transform">
                        &rarr;
                    </span>
                </Link>
            </div>

            {/* Grid Layout Rows */}
            <div className="space-y-6">
                {/* ===================== ROW 1: Identity Card + Learning Stats ===================== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Left: User Identity Card */}
                    <div className="lg:col-span-4 bg-[#0B1F3A] rounded-2xl p-6 text-white flex flex-col justify-between shadow-xs border border-slate-800/80">
                        <div>
                            {/* Avatar & Title Row */}
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-full bg-[#00F0FF] shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                                    <span className="text-[#061426] font-black text-xl">JN</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-lg font-bold text-white leading-tight truncate">
                                        {profile.name}
                                    </h2>
                                    <p className="text-xs text-cyan-300 font-medium mt-0.5">
                                        {profile.subRole}
                                    </p>
                                    <div className="mt-1.5">
                                        <span className="inline-flex items-center text-[10px] font-bold text-cyan-300 bg-[#06182B] border border-cyan-500/30 px-2.5 py-0.5 rounded-full tracking-wide">
                                            PROFIL {profile.completion}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bio Paragraph */}
                            <p className="text-xs text-slate-300 mt-4 leading-relaxed font-normal">
                                {profile.bio}
                            </p>
                        </div>

                        {/* Bottom Meta & Button */}
                        <div className="mt-6 pt-4 border-t border-slate-800/80">
                            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-medium">
                                <span>{profile.location}</span>
                                <span>{profile.joinedDate}</span>
                            </div>

                            <button
                                onClick={() => {
                                    setEditFormData({ ...profile });
                                    setIsEditModalOpen(true);
                                }}
                                className="bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                            >
                                Ubah profil
                            </button>
                        </div>
                    </div>

                    {/* Right: Statistik belajar & layanan */}
                    <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                        <div>
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                                        Statistik belajar & layanan
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Ringkasan aktivitas TECHNOVA Anda
                                    </p>
                                </div>

                                <button
                                    onClick={handleExport}
                                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 hover:underline transition cursor-pointer"
                                >
                                    Ekspor riwayat belajar
                                </button>
                            </div>

                            {/* 6 Statistic Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
                                {stats.map((item) => (
                                    <div
                                        key={item.key}
                                        className={`rounded-xl p-4 transition ${
                                            item.highlight
                                                ? 'bg-[#EEF8F4] border border-[#CDEAE0]'
                                                : 'bg-white border border-slate-200/80 hover:border-slate-300'
                                        }`}
                                    >
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                                            {item.label}
                                        </span>
                                        <span className="text-2xl lg:text-3xl font-black text-slate-900 block mt-1 tracking-tight">
                                            {item.value}
                                        </span>
                                        <span className={`text-xs font-semibold block mt-1 ${item.unitColor}`}>
                                            {item.unit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===================== ROW 2: Pribadi Information + Kontak & Bio ===================== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Left: Pribadi Information */}
                    <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 mb-4">
                                Pribadi information
                            </h3>

                            <div className="space-y-3.5 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 font-medium">Nama lengkap</span>
                                    <span className="text-slate-900 font-bold">{profile.name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 font-medium">ID Anggota</span>
                                    <span className="text-slate-900 font-bold font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded-md">
                                        {profile.memberId}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 font-medium">Jalur belajar</span>
                                    <span className="text-slate-900 font-bold">{profile.studyTrack}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 font-medium">Pengalaman</span>
                                    <span className="text-slate-900 font-bold">{profile.experience}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Kontak & bio */}
                    <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 mb-4">
                                Kontak & bio
                            </h3>

                            {/* Contact Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                        EMAIL
                                    </span>
                                    <span className="text-xs font-bold text-slate-800 block mt-0.5 font-mono">
                                        {profile.email}
                                    </span>
                                </div>

                                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                        TELEPON
                                    </span>
                                    <span className="text-xs font-bold text-slate-800 block mt-0.5 font-mono">
                                        {profile.phone}
                                    </span>
                                </div>
                            </div>

                            {/* Bio Paragraph */}
                            <p className="text-xs text-slate-600 mt-4 leading-relaxed font-normal">
                                {profile.longBio}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ===================== ROW 3: Sertifikat + Pencapaian ===================== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Left: Sertifikat */}
                    <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-base font-bold text-slate-900">
                                    Sertifikat
                                </h3>

                                <button
                                    onClick={() => setShowAllCertificates(!showAllCertificates)}
                                    className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 hover:underline transition cursor-pointer"
                                >
                                    {showAllCertificates ? 'Tutup' : 'Lihat semua'}
                                </button>
                            </div>

                            <ul className="space-y-2 text-xs text-slate-700 mt-2">
                                {(showAllCertificates ? certificates : certificates.slice(0, 3)).map((cert, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <span className="text-slate-400 font-bold">-</span>
                                        <span className="font-medium text-slate-800">{cert.name}</span>
                                        <span className="text-slate-400">-</span>
                                        <span className="text-slate-500 font-mono text-[11px]">{cert.year}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right: Pencapaian */}
                    <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 leading-tight">
                                Pencapaian
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5 mb-4">
                                Pencapaian dari kegiatan belajar dan layanan
                            </p>

                            <div className="flex flex-wrap gap-2.5">
                                {achievements.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-slate-100 hover:bg-slate-200/70 border border-slate-200/60 rounded-xl px-3.5 py-1.5 text-xs font-medium text-slate-800 transition shadow-2xs"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===================== EDIT PROFILE MODAL ===================== */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h4 className="text-base font-bold text-slate-900">Ubah Profil Pengguna</h4>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    value={editFormData.name}
                                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Jalur Belajar
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.studyTrack}
                                        onChange={(e) => setEditFormData({ ...editFormData, studyTrack: e.target.value })}
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Lokasi
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.location}
                                        onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={editFormData.email}
                                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Telepon
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.phone}
                                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Bio Singkat (Kartu)
                                </label>
                                <textarea
                                    rows="2"
                                    value={editFormData.bio}
                                    onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Bio Lengkap
                                </label>
                                <textarea
                                    rows="3"
                                    value={editFormData.longBio}
                                    onChange={(e) => setEditFormData({ ...editFormData, longBio: e.target.value })}
                                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
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
        </PortalLayout>
    );
}
