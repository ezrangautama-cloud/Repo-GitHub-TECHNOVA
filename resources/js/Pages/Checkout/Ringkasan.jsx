import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Ringkasan() {
    const [buyerName, setBuyerName] = useState('Nadia Putri');
    const [buyerEmail, setBuyerEmail] = useState('nadia.putri@example.com');
    const [method, setMethod] = useState('qris'); // 'qris' | 'bank'
    const [agreed, setAgreed] = useState(true);

    const handleContinue = () => {
        if (!agreed) return;
        router.visit('/checkout/qris');
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F4F8FC] text-[#0A1D33] font-sans">
            <Head title="Checkout — Ringkasan Pesanan" />
            <Navbar active="kursus" />

            {/* Dark Stepper Header */}
            <section className="bg-[#071A2F] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-14 py-8 space-y-5">
                    <div className="space-y-1.5">
                        <p className="text-[11px] text-[#8FA8C2]">
                            <Link href="/kursus" className="hover:text-white">Kursus</Link> / ESP32 untuk IoT / Pembayaran
                        </p>
                        <h1 className="text-3xl font-bold text-white">Tinjau pesanan Anda</h1>
                        <p className="text-sm text-[#AFC4D8]">
                            Periksa produk dan data pembeli, lalu pilih cara pembayaran.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10 text-xs">
                        <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-[#3AE7DF] text-[#071A2F] font-bold flex items-center justify-center">1</span>
                            <span className="font-bold text-white">Ringkasan pesanan</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[#8FA8C2]">
                            <span className="w-6 h-6 rounded-full bg-white/10 text-white font-bold flex items-center justify-center">2</span>
                            <span>Pembayaran</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[#8FA8C2]">
                            <span className="w-6 h-6 rounded-full bg-white/10 text-white font-bold flex items-center justify-center">3</span>
                            <span>Selesai</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-14 py-8 space-y-6">
                <div className="bg-[#E6F8F6] border border-[#3AE7DF]/40 rounded-xl px-4 py-3 text-xs">
                    <p className="font-bold text-[#0D7377]">Pratinjau desain &middot; bukan transaksi aktif</p>
                    <p className="text-[#5A6B7F] mt-0.5">
                        Seluruh data pesanan dan status di halaman ini adalah contoh. Tidak ada pembayaran yang diproses.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Buyer & Payment Method */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-4">
                            <div>
                                <h2 className="text-lg font-bold text-[#0A1D33]">Data pembeli</h2>
                                <p className="text-xs text-[#5A6B7F] mt-0.5">
                                    Akses kursus akan terhubung dengan akun ini.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#0A1D33]">Nama lengkap</label>
                                    <input
                                        type="text"
                                        value={buyerName}
                                        onChange={(e) => setBuyerName(e.target.value)}
                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md px-3 text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#0A1D33]">Email</label>
                                    <input
                                        type="email"
                                        value={buyerEmail}
                                        onChange={(e) => setBuyerEmail(e.target.value)}
                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md px-3 text-sm"
                                    />
                                </div>
                            </div>
                            <p className="text-[11px] text-[#5A6B7F]">Ringkasan pesanan dikirim ke email di atas.</p>
                        </div>

                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-4">
                            <div>
                                <h2 className="text-lg font-bold text-[#0A1D33]">Metode pembayaran</h2>
                                <p className="text-xs text-[#5A6B7F] mt-0.5">
                                    Pilih satu metode. Tidak perlu memasukkan data kartu.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label
                                    onClick={() => setMethod('qris')}
                                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                                        method === 'qris'
                                            ? 'bg-[#E6F8F6]/50 border-[#0D7377]'
                                            : 'bg-white border-[#CFE0EE]'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="method"
                                            checked={method === 'qris'}
                                            onChange={() => setMethod('qris')}
                                            className="w-4 h-4 accent-[#0D7377]"
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-[#0A1D33]">QRIS</p>
                                            <p className="text-xs text-[#5A6B7F]">m-banking atau dompet digital yang mendukung QRIS</p>
                                        </div>
                                    </div>
                                    {method === 'qris' && (
                                        <span className="text-xs font-bold text-[#0D7377]">Dipilih</span>
                                    )}
                                </label>

                                <label
                                    onClick={() => setMethod('bank')}
                                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${
                                        method === 'bank'
                                            ? 'bg-[#E6F8F6]/50 border-[#0D7377]'
                                            : 'bg-white border-[#CFE0EE]'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="method"
                                            checked={method === 'bank'}
                                            onChange={() => setMethod('bank')}
                                            className="w-4 h-4 accent-[#0D7377]"
                                        />
                                        <div>
                                            <p className="text-sm font-bold text-[#0A1D33]">Transfer bank</p>
                                            <p className="text-xs text-[#5A6B7F]">Transfer melalui rekening bank</p>
                                        </div>
                                    </div>
                                    {method === 'bank' && (
                                        <span className="text-xs font-bold text-[#0D7377]">Dipilih</span>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-4">
                            <h2 className="text-lg font-bold text-[#0A1D33]">Ringkasan pesanan</h2>
                            <p className="text-[11px] text-[#5A6B7F]">TN-20261030-001 &middot; Contoh</p>

                            <div className="flex items-center gap-3.5 pb-4 border-b border-[#CFE0EE]">
                                <img
                                    src="/images/figma/hero-about.png"
                                    alt="ESP32 untuk IoT"
                                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                                />
                                <div>
                                    <p className="text-[11px] font-bold text-[#0D7377]">Kursus</p>
                                    <p className="text-sm font-bold text-[#0A1D33]">ESP32 untuk IoT</p>
                                    <p className="text-[11px] text-[#5A6B7F]">Pemula &middot; 18 materi &middot; Video + Proyek</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs pb-4 border-b border-[#CFE0EE]">
                                <div className="flex justify-between">
                                    <span className="text-[#5A6B7F]">Harga kursus</span>
                                    <span className="font-bold">Rp149.000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#5A6B7F]">Biaya tambahan</span>
                                    <span className="font-bold">Rp0</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-xs text-[#5A6B7F]">Total pembayaran</span>
                                <span className="text-xl font-bold text-[#0A1D33]">Rp149.000</span>
                            </div>

                            <label className="flex items-start gap-2.5 text-[11px] text-[#5A6B7F] cursor-pointer pt-1">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="mt-0.5 accent-[#3AE7DF]"
                                />
                                <span>
                                    Saya telah meninjau produk, data pembeli, serta menyetujui ketentuan pembelian dan kebijakan privasi.
                                </span>
                            </label>

                            <button
                                type="button"
                                disabled={!agreed}
                                onClick={handleContinue}
                                className="w-full h-11 bg-[#3AE7DF] hover:bg-cyan-300 disabled:opacity-50 text-[#0B1F3A] text-xs font-bold rounded-lg transition cursor-pointer"
                            >
                                Lanjut ke Pembayaran
                            </button>

                            <p className="text-[11px] text-center text-[#5A6B7F]">
                                Berikutnya: petunjuk pembayaran QRIS.
                            </p>
                        </div>

                        <Link
                            href="/kursus/pengantar-iot"
                            className="inline-block text-xs font-bold text-[#0D7377] hover:underline"
                        >
                            &larr; Kembali ke detail kursus
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
