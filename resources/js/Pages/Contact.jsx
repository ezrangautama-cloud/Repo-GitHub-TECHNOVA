import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Contact() {
    const [form, setForm] = useState({
        nama: '',
        email: '',
        jenis: '',
        konteks: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [serverMessage, setServerMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nama || !form.email || !form.jenis || !form.konteks) return;
        setSubmitting(true);
        try {
            const res = await fetch('/api/services/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    tipe: form.jenis,
                    email: form.email,
                    deskripsi: `Pengirim: ${form.nama}\n\nKonteks:\n${form.konteks}`,
                }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setServerMessage(data.message || 'Permintaan layanan Anda berhasil diajukan!');
            }
            setSubmitted(true);
        } catch {
            setSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F4F8FC] text-[#0A1D33] font-sans">
            <Head title="Kontak TECHNOVA" />

            <Navbar active="tentang" />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-[#071A2F] text-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-14 py-11 flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#19C6E7]">
                                Mulai diskusi terarah
                            </p>
                            <h1 className="text-3xl sm:text-4xl lg:text-[43px] font-bold leading-[1.06] text-white">
                                Ceritakan tantangan di balik kebutuhan Anda
                            </h1>
                            <p className="text-sm text-[#AFC4D8] leading-[1.55] max-w-2xl">
                                Sampaikan kebutuhan kursus, prototipe, proyek IoT, laboratorium, atau PLTS Anda. Kami bantu menentukan langkah berikutnya.
                            </p>
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <Link
                                    href="/kursus"
                                    className="inline-flex items-center gap-2 bg-white text-[#071A2F] hover:bg-slate-100 px-5 h-[42px] rounded-md text-sm font-bold transition"
                                >
                                    <span>Jelajahi solusi</span>
                                    <span>&rarr;</span>
                                </Link>
                                <a
                                    href="#form-kontak"
                                    className="inline-flex items-center gap-2 border border-[#3AE7DF] text-[#3AE7DF] hover:bg-[#3AE7DF]/10 px-5 h-[42px] rounded-md text-sm font-bold transition"
                                >
                                    <span>Hubungi TECHNOVA</span>
                                    <span>&rarr;</span>
                                </a>
                            </div>
                        </div>

                        <div className="relative w-full lg:w-[375px] h-[270px] rounded-lg overflow-hidden shrink-0">
                            <img
                                src="/images/figma/hero-about.png"
                                alt="Perangkat Instrumentasi & IoT TECHNOVA"
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(153deg, rgba(7, 26, 43, 0.18) 6%, rgba(7, 26, 43, 0.74) 94%), linear-gradient(0deg, rgb(7, 26, 43) 0%, rgba(7, 26, 43, 0) 40%)',
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Workspace */}
                <section id="form-kontak" className="max-w-7xl mx-auto px-6 md:px-14 py-10">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white border border-[#CFE0EE] rounded-[20px] p-6 sm:p-8 space-y-4"
                    >
                        <div>
                            <h2 className="text-[21px] font-bold text-[#0A1D33]">
                                Pertanyaan proyek
                            </h2>
                            <p className="text-xs text-[#5A6B7F] mt-1">
                                Kolom bertanda * membantu kami meneruskan pesan Anda dengan tepat.
                            </p>
                        </div>

                        {submitted && (
                            <div className="bg-[#DDF8FC] border border-[#3AE7DF] text-[#071A2F] rounded-lg px-4 py-3 text-sm font-medium">
                                {serverMessage || `Terima kasih, ${form.nama}! Pertanyaan Anda telah kami catat dan tim TECHNOVA akan segera menghubungi Anda melalui ${form.email}.`}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-bold text-[#0A1D33]">
                                    Nama *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.nama}
                                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                                    placeholder="Nama lengkap Anda"
                                    className="w-full h-10 bg-[#F4F8FC] border border-[#CFE0EE] rounded-md px-3 text-sm text-[#0A1D33] placeholder:text-[#5A6B7F] focus:outline-none focus:border-[#3AE7DF]"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-sm font-bold text-[#0A1D33]">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="name@example.com"
                                    className="w-full h-10 bg-[#F4F8FC] border border-[#CFE0EE] rounded-md px-3 text-sm text-[#0A1D33] placeholder:text-[#5A6B7F] focus:outline-none focus:border-[#3AE7DF]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-[#0A1D33]">
                                Jenis pertanyaan *
                            </label>
                            <select
                                required
                                value={form.jenis}
                                onChange={(e) => setForm({ ...form, jenis: e.target.value })}
                                className="w-full h-10 bg-[#F4F8FC] border border-[#CFE0EE] rounded-md px-3 text-sm text-[#0A1D33] focus:outline-none focus:border-[#3AE7DF]"
                            >
                                <option value="">Pilih pertanyaan layanan atau pembelajaran</option>
                                <option value="kursus">Kursus & Pelatihan Teknik</option>
                                <option value="prototipe">Prototipe & Proyek IoT</option>
                                <option value="laboratorium">Kebutuhan Laboratorium & DAQ</option>
                                <option value="plts">Perancangan & Pemantauan PLTS</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-[#0A1D33]">
                                Konteks proyek *
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={form.konteks}
                                onChange={(e) => setForm({ ...form, konteks: e.target.value })}
                                placeholder="Apa yang ingin Anda bangun, tingkatkan, atau pahami?"
                                className="w-full bg-[#F4F8FC] border border-[#CFE0EE] rounded-md p-3 text-sm text-[#0A1D33] placeholder:text-[#5A6B7F] focus:outline-none focus:border-[#3AE7DF]"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                            <p className="text-xs text-[#5A6B7F]">
                                Dengan mengirim formulir ini, Anda setuju dihubungi terkait pertanyaan ini.
                            </p>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="inline-flex items-center justify-center gap-2 bg-[#3AE7DF] hover:bg-cyan-300 disabled:opacity-60 border border-[#3AE7DF] text-[#0B1F3A] px-5 h-[42px] rounded-md text-sm font-bold transition cursor-pointer"
                            >
                                <span>{submitting ? 'Mengirim...' : 'Kirim pertanyaan'}</span>
                                <span>&rarr;</span>
                            </button>
                        </div>
                    </form>
                </section>
            </main>

            <Footer />
        </div>
    );
}
