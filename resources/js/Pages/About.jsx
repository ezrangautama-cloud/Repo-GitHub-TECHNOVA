import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function About() {
    const principles = [
        'Berbasis keahlian, bukan tren',
        'Cakupan teknis dan dokumentasi yang jelas',
        'Materi praktis untuk penggunaan nyata',
        'Contoh bukti dengan label transparan',
        'Metode pembelajaran interaktif untuk keterlibatan maksimal',
    ];

    const expertise = [
        { title: 'Instrumentasi', subtitle: 'Pengukuran & DAQ' },
        { title: 'Sistem IoT', subtitle: 'Sensor & konektivitas' },
        { title: 'Energi Terbarukan', subtitle: 'PLTS & pemantauan' },
        { title: 'Pembelajaran Teknik', subtitle: 'Kursus & praktik' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#F4F8FC] text-[#0A1D33] font-sans">
            <Head title="Tentang TECHNOVA" />

            <Navbar active="tentang" />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-[#071A2F] text-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-14 py-11 flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-4">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-[#19C6E7]">
                                Pendekatan TECHNOVA
                            </p>
                            <h1 className="text-3xl sm:text-4xl lg:text-[43px] font-bold leading-[1.06] text-white">
                                Ketelitian akademis. Kepraktisan teknik.
                            </h1>
                            <p className="text-sm text-[#AFC4D8] leading-[1.55] max-w-2xl">
                                TECHNOVA memadukan instrumentasi, IoT, energi terbarukan, dan kebutuhan laboratorium dalam pembelajaran dan pekerjaan teknik yang mudah dipahami.
                            </p>
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <Link
                                    href="/kursus"
                                    className="inline-flex items-center gap-2 bg-white text-[#071A2F] hover:bg-slate-100 px-5 h-[42px] rounded-md text-xs font-bold transition"
                                >
                                    <span>Jelajahi solusi</span>
                                    <span className="text-sm">&rarr;</span>
                                </Link>
                                <Link
                                    href="/kontak"
                                    className="inline-flex items-center gap-2 border border-[#3AE7DF] text-[#3AE7DF] hover:bg-[#3AE7DF]/10 px-5 h-[42px] rounded-md text-xs font-bold transition"
                                >
                                    <span>Hubungi TECHNOVA</span>
                                    <span className="text-sm">&rarr;</span>
                                </Link>
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

                {/* About Story & Principles */}
                <section className="max-w-7xl mx-auto px-6 md:px-14 py-10 flex flex-col lg:flex-row items-start gap-10">
                    <div className="flex-1 space-y-4">
                        <h2 className="text-2xl sm:text-[28px] font-bold leading-[1.15] text-[#0A1D33]">
                            Pengetahuan bernilai ketika menghasilkan keputusan yang mantap
                        </h2>
                        <p className="text-xs sm:text-sm text-[#5A6B7F] leading-[1.6]">
                            Kami menerjemahkan kedalaman teknis menjadi langkah praktis: pahami prinsip, bangun sistem, periksa hasil, dan dokumentasikan hal penting.
                        </p>
                        <p className="text-xs text-[#5A6B7F] leading-[1.6]">
                            Karya kami didasari pengajaran, pengembangan laboratorium, instrumentasi lapangan, integrasi sensor, dan sistem energi terbarukan, bukan sekadar mengikuti tren.
                        </p>
                    </div>

                    <div className="w-full lg:w-[440px] bg-white border border-[#CFE0EE] rounded-[20px] p-6 space-y-3.5 shrink-0">
                        {principles.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <span className="w-[22px] h-[22px] rounded-full bg-[#DDF8FC] shrink-0 flex items-center justify-center text-[#071A2F] text-[10px] font-bold">
                                    &#10003;
                                </span>
                                <span className="text-xs text-[#0A1D33] leading-snug">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Expertise Strip */}
                <section className="bg-white border-t border-b border-[#CFE0EE]/60 mt-4 mb-16">
                    <div className="max-w-7xl mx-auto px-6 md:px-14 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {expertise.map((item, idx) => (
                            <div key={idx} className="space-y-1">
                                <h3 className="text-[15px] font-bold text-[#0A1D33]">
                                    {item.title}
                                </h3>
                                <p className="text-[11px] text-[#5A6B7F]">
                                    {item.subtitle}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
