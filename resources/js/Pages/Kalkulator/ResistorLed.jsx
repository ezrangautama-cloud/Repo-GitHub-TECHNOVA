import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const E12_BASE = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];

function findNearestE12(ohms) {
    if (!ohms || ohms <= 0) return 0;
    const candidates = [];
    for (let exp = 0; exp <= 6; exp++) {
        const mult = Math.pow(10, exp);
        for (const base of E12_BASE) {
            candidates.push(Math.round(base * mult));
        }
    }
    const found = candidates.find((c) => c >= ohms);
    return found || candidates[candidates.length - 1];
}

export default function ResistorLed() {
    const [vs, setVs] = useState(5);
    const [vf, setVf] = useState(2);
    const [ifMa, setIfMa] = useState(10);

    const vsNum = Number(vs) || 0;
    const vfNum = Number(vf) || 0;
    const ifNum = Number(ifMa) || 0;

    const valid = vsNum > vfNum && ifNum > 0;
    const rTeoritis = valid ? (vsNum - vfNum) / (ifNum * 0.001) : 0;
    const rStandar = valid ? findNearestE12(rTeoritis) : 0;
    const iAktualMa = valid && rStandar > 0 ? ((vsNum - vfNum) / rStandar) * 1000 : 0;
    const powerWatt = valid && rStandar > 0 ? Math.pow(vsNum - vfNum, 2) / rStandar : 0;
    const recommendedPower = powerWatt * 2 <= 0.25 ? '0,25 W / ¼ watt' : powerWatt * 2 <= 0.5 ? '0,5 W / ½ watt' : '1 W atau lebih';

    const applyExample = () => {
        setVs(5);
        setVf(2);
        setIfMa(10);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F4F8FC] text-[#0A1D33] font-sans">
            <Head title="Kalkulator Resistor LED — TECHNOVA" />
            <Navbar active="layanan" />

            {/* Dark Header */}
            <section className="bg-[#071A2F] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-14 py-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <p className="text-[11px] text-[#8FA8C2]">
                            <Link href="/" className="hover:text-white">Beranda</Link> / Alat / Resistor LED
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#19C6E7]">
                            ALAT TEKNIK TECHNOVA
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">
                            Kalkulator Resistor LED
                        </h1>
                        <p className="text-sm text-[#AFC4D8]">
                            Tentukan resistor dan daya yang tepat untuk membatasi arus LED.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-[#25435E] rounded-xl p-4 w-full lg:w-72 shrink-0 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#19C6E7]">
                            DARI PARAMETER KE KOMPONEN
                        </p>
                        <p className="text-sm font-bold text-white">
                            01 Rangkaian &rarr; 02 Resistor
                        </p>
                        <p className="text-[11px] text-[#AFC4D8]">
                            Hitung hambatan, pilih nilai standar, lalu cek disipasi daya.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Workspace */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-14 py-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-4">
                            <div>
                                <h2 className="text-lg font-bold text-[#0A1D33]">Parameter rangkaian</h2>
                                <p className="text-xs text-[#5A6B7F] mt-0.5">
                                    Masukkan spesifikasi sumber dan LED untuk satu rangkaian seri.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#0A1D33]">Tegangan sumber (Vs)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={vs}
                                        onChange={(e) => setVs(e.target.value)}
                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md pl-3 pr-8 text-sm"
                                    />
                                    <span className="absolute right-3 top-2.5 text-xs text-[#5A6B7F]">V</span>
                                </div>
                                <p className="text-[11px] text-[#5A6B7F]">Supply voltage &middot; Tegangan DC yang digunakan.</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#0A1D33]">Tegangan maju LED (Vf)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={vf}
                                        onChange={(e) => setVf(e.target.value)}
                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md pl-3 pr-8 text-sm"
                                    />
                                    <span className="absolute right-3 top-2.5 text-xs text-[#5A6B7F]">V</span>
                                </div>
                                <p className="text-[11px] text-[#5A6B7F]">LED forward voltage &middot; Lihat datasheet LED.</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#0A1D33]">Arus LED (If)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="1"
                                        value={ifMa}
                                        onChange={(e) => setIfMa(e.target.value)}
                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md pl-3 pr-10 text-sm"
                                    />
                                    <span className="absolute right-3 top-2.5 text-xs text-[#5A6B7F]">mA</span>
                                </div>
                                <p className="text-[11px] text-[#5A6B7F]">
                                    Target arus LED &middot; {ifNum} mA = {(ifNum * 0.001).toFixed(3).replace('.', ',')} A.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={applyExample}
                                    className="border border-[#CFE0EE] hover:bg-slate-50 text-xs font-bold px-4 h-10 rounded-md cursor-pointer"
                                >
                                    Reset
                                </button>
                                <div className="flex-1 bg-[#3AE7DF] text-[#0B1F3A] text-xs font-bold h-10 rounded-md flex items-center justify-center">
                                    Hitung Resistor (Otomatis)
                                </div>
                            </div>
                        </div>

                        {/* Contoh box */}
                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-3">
                            <h3 className="text-base font-bold text-[#0A1D33]">Contoh: menyalakan LED merah</h3>
                            <p className="text-xs text-[#5A6B7F]">
                                Sumber 5 V dengan LED 2 V dan target arus 10 mA.
                            </p>
                            <div className="bg-[#EEF4F8] rounded-xl p-4 space-y-1">
                                <p className="text-sm font-bold text-[#0D7377]">R = (5 &minus; 2) / (10 &times; 0,001)</p>
                                <p className="text-xs font-bold text-[#0A1D33]">R = 300 &Omega; &rarr; Pilih resistor standar 330 &Omega;</p>
                            </div>
                            <button
                                type="button"
                                onClick={applyExample}
                                className="border border-[#CFE0EE] hover:bg-slate-50 text-xs font-bold px-4 h-9 rounded-md cursor-pointer"
                            >
                                Gunakan contoh ini
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Results */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-[#071A2F] text-white rounded-2xl p-6 space-y-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#19C6E7]">HASIL PERHITUNGAN</p>
                            <div>
                                <p className="text-xs text-[#AFC4D8]">Resistor yang disarankan</p>
                                <p className="text-5xl font-bold text-[#3AE7DF] mt-1">
                                    {valid ? `${rStandar.toLocaleString('id-ID')} Ω` : '—'}
                                </p>
                                <p className="text-xs text-[#8FA8C2] mt-1">Nilai standar E12 &middot; dibulatkan ke atas</p>
                            </div>

                            <div className="bg-[#0E2742] border border-[#25435E] rounded-xl p-4">
                                <p className="text-xs text-[#AFC4D8]">Hambatan hasil rumus</p>
                                <p className="text-2xl font-bold text-white mt-0.5">
                                    {valid ? `${Math.round(rTeoritis).toLocaleString('id-ID')} Ω` : '—'}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-5 space-y-1">
                            <p className="text-xs font-bold text-[#0A1D33]">Rating daya resistor</p>
                            <p className="text-2xl font-bold text-[#0A1D33]">{recommendedPower}</p>
                            <p className="text-[11px] text-[#5A6B7F]">
                                Disipasi pada {rStandar} &Omega; &approx; {powerWatt.toFixed(3).replace('.', ',')} W. Margin 2&times; &approx; {(powerWatt * 2).toFixed(3).replace('.', ',')} W.
                            </p>
                        </div>

                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-5 space-y-1">
                            <p className="text-xs font-bold text-[#0A1D33]">Arus aktual dengan {rStandar} &Omega;</p>
                            <p className="text-2xl font-bold text-[#0D7377]">&approx; {iAktualMa.toFixed(1).replace('.', ',')} mA</p>
                            <p className="text-[11px] text-[#5A6B7F]">
                                I = ({vsNum} &minus; {vfNum}) / {rStandar} = {(iAktualMa / 1000).toFixed(5).replace('.', ',')} A
                            </p>
                        </div>

                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-5 space-y-1">
                            <p className="text-xs font-bold text-[#0A1D33]">Satu LED, satu resistor seri</p>
                            <p className="text-xs font-bold text-[#0D7377]">Vs &rarr; Resistor &rarr; LED &rarr; GND</p>
                            <p className="text-[11px] text-[#5A6B7F]">Pastikan polaritas LED terpasang dengan benar.</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
