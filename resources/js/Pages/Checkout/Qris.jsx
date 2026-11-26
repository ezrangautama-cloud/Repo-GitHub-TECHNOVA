import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Qris() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F4F8FC] text-[#0A1D33] font-sans">
            <Head title="Menunggu Pembayaran QRIS — TECHNOVA" />
            <Navbar active="kursus" />

            {/* Dark Stepper Header */}
            <section className="bg-[#071A2F] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-14 py-8 space-y-5">
                    <div className="space-y-1.5">
                        <p className="text-[11px] text-[#8FA8C2]">
                            <Link href="/kursus" className="hover:text-white">Kursus</Link> / ESP32 untuk IoT / Pembayaran
                        </p>
                        <h1 className="text-3xl font-bold text-white">Selesaikan pembayaran QRIS</h1>
                        <p className="text-sm text-[#AFC4D8]">
                            Pesanan Anda menunggu pembayaran. Akses kursus terbuka setelah pembayaran terverifikasi.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10 text-xs">
                        <div className="flex items-center gap-2.5 text-[#AFC4D8]">
                            <span className="w-6 h-6 rounded-full bg-[#3AE7DF] text-[#071A2F] font-bold flex items-center justify-center">&#10003;</span>
                            <span>Ringkasan pesanan</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-[#3AE7DF] text-[#071A2F] font-bold flex items-center justify-center">2</span>
                            <span className="font-bold text-white">Pembayaran</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[#8FA8C2]">
                            <span className="w-6 h-6 rounded-full bg-white/10 text-white font-bold flex items-center justify-center">3</span>
                            <span>Selesai</span>
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
                    {/* Left: QRIS Card & Guide */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-[#0A1D33]">Pembayaran QRIS</h2>
                                <span className="bg-[#FEF3C7] text-[#92400E] text-[11px] font-bold px-3 py-1 rounded-full">
                                    Menunggu Pembayaran
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                                <div className="sm:col-span-5 bg-[#F4F8FC] border border-[#CFE0EE] rounded-xl p-6 text-center space-y-2">
                                    <div className="w-12 h-12 mx-auto border-2 border-dashed border-[#5A6B7F] rounded-lg flex items-center justify-center text-[#5A6B7F] font-bold">
                                        QR
                                    </div>
                                    <p className="text-sm font-bold text-[#0A1D33]">QRIS</p>
                                    <p className="text-[10px] font-bold text-[#92400E]">PRATINJAU &middot; NON-AKTIF</p>
                                    <p className="text-[11px] text-[#5A6B7F]">
                                        Bukan kode bayar nyata. Tidak dapat dipindai atau digunakan membayar.
                                    </p>
                                </div>

                                <div className="sm:col-span-7 space-y-4">
                                    <div>
                                        <p className="text-xs text-[#5A6B7F]">Jumlah yang dibayar</p>
                                        <p className="text-3xl font-bold text-[#0A1D33] mt-0.5">Rp149.000</p>
                                        <p className="text-[11px] text-[#5A6B7F]">Sudah termasuk biaya tambahan Rp0.</p>
                                    </div>
                                    <div className="border-t border-[#CFE0EE] pt-3">
                                        <p className="text-xs font-bold text-[#0A1D33]">Tenggat contoh: 30 Oktober 2026, 15.00 WIB</p>
                                        <p className="text-[11px] text-[#5A6B7F] mt-0.5">
                                            Dibuat 30 Oktober 2026, 14.00 WIB. Contoh masa pembayaran 1 jam.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 text-center">
                                <button
                                    type="button"
                                    onClick={() => router.visit('/checkout/sukses')}
                                    className="w-full h-11 bg-[#3AE7DF] hover:bg-cyan-300 text-[#0B1F3A] text-xs font-bold rounded-lg transition cursor-pointer"
                                >
                                    Cek Status Pembayaran
                                </button>
                                <Link
                                    href="/checkout"
                                    className="inline-block text-xs font-bold text-[#0D7377] hover:underline"
                                >
                                    &larr; Kembali / ganti metode pembayaran
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-4">
                            <h2 className="text-base font-bold text-[#0A1D33]">Cara membayar</h2>
                            <div className="space-y-3 text-xs">
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#E6F8F6] text-[#0D7377] font-bold flex items-center justify-center shrink-0">1</span>
                                    <div>
                                        <p className="font-bold text-[#0A1D33]">Buka aplikasi pembayaran</p>
                                        <p className="text-[#5A6B7F]">Gunakan m-banking atau dompet digital yang mendukung QRIS.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#E6F8F6] text-[#0D7377] font-bold flex items-center justify-center shrink-0">2</span>
                                    <div>
                                        <p className="font-bold text-[#0A1D33]">Pindai QRIS dan periksa jumlah</p>
                                        <p className="text-[#5A6B7F]">Pada transaksi aktif, pastikan totalnya Rp149.000 sebelum mengonfirmasi.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#E6F8F6] text-[#0D7377] font-bold flex items-center justify-center shrink-0">3</span>
                                    <div>
                                        <p className="font-bold text-[#0A1D33]">Selesaikan dan periksa status</p>
                                        <p className="text-[#5A6B7F]">Setelah membayar, pilih Cek Status Pembayaran untuk melihat hasilnya.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Box */}
                    <div className="lg:col-span-4 space-y-3">
                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-4">
                            <h2 className="text-lg font-bold text-[#0A1D33]">Pesanan Anda</h2>
                            <p className="text-xs font-bold text-[#0D7377]">TN-20261030-001</p>

                            <div className="flex items-center gap-3 pb-4 border-b border-[#CFE0EE]">
                                <img
                                    src="/images/figma/hero-about.png"
                                    alt="ESP32 untuk IoT"
                                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                                />
                                <div>
                                    <p className="text-[11px] font-bold text-[#0D7377]">Kursus</p>
                                    <p className="text-sm font-bold text-[#0A1D33]">ESP32 untuk IoT</p>
                                    <p className="text-[11px] text-[#5A6B7F]">Pemula &middot; 18 materi</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs pb-4 border-b border-[#CFE0EE]">
                                <div className="flex justify-between"><span className="text-[#5A6B7F]">Harga kursus</span><span className="font-bold">Rp149.000</span></div>
                                <div className="flex justify-between"><span className="text-[#5A6B7F]">Biaya tambahan</span><span className="font-bold">Rp0</span></div>
                                <div className="flex justify-between pt-1"><span className="text-[#5A6B7F]">Total</span><span className="text-base font-bold">Rp149.000</span></div>
                            </div>

                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between"><span className="text-[#5A6B7F]">Pembeli</span><span className="font-bold">Nadia Putri</span></div>
                                <p className="text-[11px] text-[#5A6B7F]">nadia.putri@example.com</p>
                                <div className="flex justify-between pt-1"><span className="text-[#5A6B7F]">Metode</span><span className="font-bold">QRIS</span></div>
                            </div>
                        </div>
                        <p className="text-xs text-[#5A6B7F]">
                            Belum membayar? Anda dapat kembali untuk mengganti metode tanpa mengubah produk pesanan.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
