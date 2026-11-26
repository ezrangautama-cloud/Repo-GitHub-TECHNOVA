import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Sukses() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F4F8FC] text-[#0A1D33] font-sans">
            <Head title="Pembayaran Berhasil — TECHNOVA" />
            <Navbar active="kursus" />

            {/* Dark Stepper Header */}
            <section className="bg-[#071A2F] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-14 py-8 space-y-5">
                    <div className="space-y-1.5">
                        <p className="text-[11px] text-[#8FA8C2]">
                            <Link href="/kursus" className="hover:text-white">Kursus</Link> / ESP32 untuk IoT / Pembayaran
                        </p>
                        <h1 className="text-3xl font-bold text-white">Pembayaran berhasil</h1>
                        <p className="text-sm text-[#AFC4D8]">
                            Terima kasih, Nadia. Kursus ESP32 untuk IoT kini siap Anda akses.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10 text-xs">
                        <div className="flex items-center gap-2.5 text-[#AFC4D8]">
                            <span className="w-6 h-6 rounded-full bg-[#3AE7DF] text-[#071A2F] font-bold flex items-center justify-center">&#10003;</span>
                            <span>Ringkasan pesanan</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[#AFC4D8]">
                            <span className="w-6 h-6 rounded-full bg-[#3AE7DF] text-[#071A2F] font-bold flex items-center justify-center">&#10003;</span>
                            <span>Pembayaran</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-[#3AE7DF] text-[#071A2F] font-bold flex items-center justify-center">3</span>
                            <span className="font-bold text-white">Selesai</span>
                        </div>
                    </div>
                </div>
            </section>

            <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-14 py-8 space-y-6">
                <div className="bg-[#E6F8F6] border border-[#3AE7DF]/40 rounded-xl px-4 py-3 text-xs">
                    <p className="font-bold text-[#0D7377]">Pratinjau desain &middot; bukan transaksi aktif</p>
                    <p className="text-[#5A6B7F] mt-0.5">
                        Seluruh data pesanan dan status di halaman ini adalah contoh. Tidak ada pembayaran yang diproses.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Receipt */}
                    <div className="lg:col-span-7 space-y-3">
                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-5">
                            <div className="flex items-center justify-between border-b border-[#CFE0EE] pb-4">
                                <div>
                                    <h2 className="text-lg font-bold text-[#0A1D33]">Bukti pembayaran</h2>
                                    <p className="text-xs text-[#5A6B7F]">TN-20261030-001</p>
                                </div>
                                <span className="bg-[#E7F8F1] text-[#139C72] text-xs font-bold px-3 py-1 rounded-full">
                                    Berhasil
                                </span>
                            </div>

                            <div className="flex items-center gap-4 pb-4 border-b border-[#CFE0EE]">
                                <img
                                    src="/images/figma/hero-about.png"
                                    alt="ESP32 untuk IoT"
                                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                                />
                                <div>
                                    <p className="text-[11px] font-bold text-[#0D7377]">Kursus</p>
                                    <p className="text-base font-bold text-[#0A1D33]">ESP32 untuk IoT</p>
                                    <p className="text-xs text-[#5A6B7F]">Pemula &middot; 18 materi &middot; Video + Proyek</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#CFE0EE] text-xs">
                                <div>
                                    <p className="text-[#5A6B7F]">Pembeli</p>
                                    <p className="font-bold text-[#0A1D33] mt-0.5">Nadia Putri</p>
                                    <p className="text-[#5A6B7F]">nadia.putri@example.com</p>
                                </div>
                                <div>
                                    <p className="text-[#5A6B7F]">Metode &amp; waktu pembayaran</p>
                                    <p className="font-bold text-[#0A1D33] mt-0.5">QRIS</p>
                                    <p className="text-[#5A6B7F]">30 Oktober 2026, 14.12 WIB</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between"><span className="text-[#5A6B7F]">Harga kursus</span><span className="font-bold">Rp149.000</span></div>
                                <div className="flex justify-between"><span className="text-[#5A6B7F]">Biaya tambahan</span><span className="font-bold">Rp0</span></div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-[#5A6B7F]">Jumlah dibayar</span>
                                    <span className="text-xl font-bold text-[#0A1D33]">Rp149.000</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-[#5A6B7F]">
                            Butuh bantuan terkait pesanan? Hubungi hello@technova.id.
                        </p>
                    </div>

                    {/* Right: Next Step Card */}
                    <div className="lg:col-span-5">
                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-4">
                            <span className="inline-block bg-[#E7F8F1] text-[#139C72] text-[11px] font-bold px-3 py-1 rounded-full">
                                Akses kursus terbuka
                            </span>
                            <h2 className="text-xl font-bold text-[#0A1D33]">Mulai langkah pertama Anda</h2>
                            <p className="text-xs text-[#5A6B7F]">
                                Buka materi dari akun TECHNOVA yang terhubung dengan email pembeli.
                            </p>

                            <ul className="space-y-2 text-xs text-[#0A1D33]">
                                <li className="flex items-center gap-2"><span className="text-[#139C72] font-bold">&#10003;</span> 18 materi siap dipelajari</li>
                                <li className="flex items-center gap-2"><span className="text-[#139C72] font-bold">&#10003;</span> Video dan proyek praktik</li>
                                <li className="flex items-center gap-2"><span className="text-[#139C72] font-bold">&#10003;</span> Mulai dari modul pengantar</li>
                            </ul>

                            <div className="space-y-2.5 pt-2">
                                <Link
                                    href="/kursus-saya"
                                    className="w-full h-11 bg-[#3AE7DF] hover:bg-cyan-300 text-[#0B1F3A] text-xs font-bold rounded-lg flex items-center justify-center transition"
                                >
                                    Akses Kursus
                                </Link>
                                <Link
                                    href="/admin/pesanan"
                                    className="w-full h-11 bg-white border border-[#CFE0EE] hover:bg-slate-50 text-[#0A1D33] text-xs font-bold rounded-lg flex items-center justify-center transition"
                                >
                                    Lihat Pesanan
                                </Link>
                            </div>

                            <p className="text-[11px] text-center text-[#5A6B7F]">
                                Kursus juga tersedia pada menu Kursus Saya di profil Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
