import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Plts({ initialEnergi = 7.3, initialBeban = 600 }) {
    const [sourceMode, setSourceMode] = useState('kalkulator');
    const [unit, setUnit] = useState('kWh');
    const [energiInput, setEnergiInput] = useState(initialEnergi);
    const [bebanWatt, setBebanWatt] = useState(initialBeban);
    const [psh, setPsh] = useState(4.5);
    const [systemVoltage, setSystemVoltage] = useState(24);
    const [panelWp, setPanelWp] = useState(400);
    const [batteryType, setBatteryType] = useState('lithium'); // 'lithium' | 'lead_acid'
    const [apiResult, setApiResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const energiWh = unit === 'kWh' ? (Number(energiInput) || 0) * 1000 : Number(energiInput) || 0;
    const energiKwh = energiWh / 1000;

    const calculateViaApi = async () => {
        if (energiWh < 1) return;
        setLoading(true);
        try {
            const res = await fetch('/api/tools/calculate/solar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    energi_harian_wh: Math.max(1, energiWh),
                    psh: Number(psh) || 4.5,
                    v_sys: Number(systemVoltage) || 24,
                    jenis_baterai: batteryType,
                    daya_panel_unit: Number(panelWp) || 400,
                    total_beban_watt: Math.max(1, Number(bebanWatt) || 600),
                }),
            });
            const json = await res.json();
            if (res.ok && json?.data) {
                setApiResult(json.data);
            }
        } catch {
            // fallback to local calculation
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch('/api/tools/solar/presets').catch(() => {});
        calculateViaApi();
    }, []);

    const dod = batteryType === 'lead_acid' ? 0.5 : 0.8;
    const minPanelWp = apiResult?.kapasitas_pv_teoritis_wp ?? Math.round(energiWh / ((Number(psh) || 1) * 0.75));
    const panelCount = apiResult?.jumlah_panel ?? Math.max(1, Math.ceil(minPanelWp / (Number(panelWp) || 400)));
    const installedWp = apiResult?.kapasitas_pv_terpasang_wp ?? panelCount * (Number(panelWp) || 400);
    const batteryAhExact = apiResult?.kapasitas_baterai_ah ?? energiWh / ((Number(systemVoltage) || 24) * dod);
    const batteryAhPractical = Math.ceil(batteryAhExact / 50) * 50;
    const inverterRec = apiResult?.rekomendasi_inverter_watt ?? Math.max(1000, Math.ceil(((Number(bebanWatt) || 0) * 1.5) / 500) * 500);

    const handleUnitChange = (newUnit) => {
        if (newUnit === unit) return;
        if (newUnit === 'Wh') {
            setEnergiInput(Math.round((Number(energiInput) || 0) * 1000));
        } else {
            setEnergiInput(Number(((Number(energiInput) || 0) / 1000).toFixed(2)));
        }
        setUnit(newUnit);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F4F8FC] text-[#0A1D33] font-sans">
            <Head title="Kalkulator Kebutuhan PLTS — TECHNOVA" />
            <Navbar active="layanan" />

            {/* Dark Header */}
            <section className="bg-[#071A2F] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-14 py-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <p className="text-[11px] text-[#8FA8C2]">
                            <Link href="/" className="hover:text-white">Beranda</Link> / Alat / Kebutuhan PLTS
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#19C6E7]">
                            ALAT TEKNIK TECHNOVA
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">
                            Kalkulator Kebutuhan PLTS
                        </h1>
                        <p className="text-sm text-[#AFC4D8]">
                            Ubah kebutuhan energi harian menjadi estimasi panel, baterai, dan inverter.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-[#25435E] rounded-xl p-4 w-full lg:w-72 shrink-0 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#19C6E7]">
                            RENCANAKAN DARI DATA
                        </p>
                        <p className="text-sm font-bold text-white">
                            01 Beban listrik &rarr; 02 PLTS
                        </p>
                        <p className="text-[11px] text-[#AFC4D8]">
                            Terhubung ke API <code>/api/tools/calculate/solar</code>.
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
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-[#0A1D33]">Kebutuhan energi &amp; beban</h2>
                                <span className="bg-[#E6F8F6] text-[#0D7377] text-[11px] font-bold px-3 py-1 rounded-full">
                                    {sourceMode === 'kalkulator' ? 'Data terhubung' : 'Input manual'}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSourceMode('kalkulator')}
                                    className={`h-9 rounded-md text-xs font-bold border px-3 text-left transition cursor-pointer ${
                                        sourceMode === 'kalkulator'
                                            ? 'bg-[#E6F8F6] border-[#3AE7DF] text-[#0A1D33]'
                                            : 'bg-white border-[#CFE0EE] text-[#5A6B7F]'
                                    }`}
                                >
                                    &bull; Dari kalkulator listrik
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSourceMode('manual')}
                                    className={`h-9 rounded-md text-xs font-bold border px-3 text-left transition cursor-pointer ${
                                        sourceMode === 'manual'
                                            ? 'bg-[#E6F8F6] border-[#3AE7DF] text-[#0A1D33]'
                                            : 'bg-white border-[#CFE0EE] text-[#5A6B7F]'
                                    }`}
                                >
                                    &#9675; Input manual
                                </button>
                            </div>

                            {sourceMode === 'kalkulator' && (
                                <div className="bg-[#F4F8FC] border border-[#CFE0EE] rounded-lg px-4 py-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-[11px] text-[#5A6B7F]">Dari Kalkulator Daya Beban Listrik</p>
                                        <p className="text-sm font-bold text-[#0A1D33]">
                                            {energiKwh.toLocaleString('id-ID')} kWh/hari &middot; {Number(bebanWatt).toLocaleString('id-ID')} W
                                        </p>
                                    </div>
                                    <Link href="/alat/daya-listrik" className="text-xs font-bold text-[#0D7377] hover:underline">
                                        Ubah daftar alat &rarr;
                                    </Link>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                                <div className="sm:col-span-8 space-y-1">
                                    <label className="text-xs font-bold text-[#0A1D33]">Energi harian</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0.1"
                                            value={energiInput}
                                            onChange={(e) => setEnergiInput(e.target.value)}
                                            className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md pl-3 pr-12 text-sm"
                                        />
                                        <span className="absolute right-3 top-2.5 text-xs text-[#5A6B7F]">/ hari</span>
                                    </div>
                                </div>
                                <div className="sm:col-span-4 space-y-1">
                                    <label className="text-xs font-bold text-[#0A1D33]">Satuan</label>
                                    <div className="grid grid-cols-2 border border-[#CFE0EE] rounded-md overflow-hidden h-10">
                                        <button
                                            type="button"
                                            onClick={() => handleUnitChange('Wh')}
                                            className={`text-xs font-bold cursor-pointer ${unit === 'Wh' ? 'bg-[#0D7377] text-white' : 'bg-white text-[#5A6B7F]'}`}
                                        >
                                            Wh
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleUnitChange('kWh')}
                                            className={`text-xs font-bold cursor-pointer ${unit === 'kWh' ? 'bg-[#0D7377] text-white' : 'bg-white text-[#5A6B7F]'}`}
                                        >
                                            kWh
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#0A1D33]">Beban daya bersamaan (P_total)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="10"
                                        value={bebanWatt}
                                        onChange={(e) => setBebanWatt(e.target.value)}
                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md pl-3 pr-8 text-sm"
                                    />
                                    <span className="absolute right-3 top-2.5 text-xs text-[#5A6B7F]">W</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-4">
                            <h2 className="text-lg font-bold text-[#0A1D33]">Parameter sistem PLTS</h2>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-[#0A1D33]">Jam matahari efektif (PSH)</label>
                                    <div className="bg-[#F4F8FC] border border-[#CFE0EE] rounded-md px-3 py-1 text-xs font-bold">
                                        {Number(psh).toLocaleString('id-ID')} jam/hari
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="8"
                                    step="0.5"
                                    value={psh}
                                    onChange={(e) => setPsh(e.target.value)}
                                    className="w-full accent-[#0D7377]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#0A1D33]">Tegangan nominal sistem</label>
                                    <select
                                        value={systemVoltage}
                                        onChange={(e) => setSystemVoltage(Number(e.target.value))}
                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md px-3 text-sm"
                                    >
                                        <option value={12}>12 V</option>
                                        <option value={24}>24 V</option>
                                        <option value={48}>48 V</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-[#0A1D33]">Daya panel per keping</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="50"
                                            step="50"
                                            value={panelWp}
                                            onChange={(e) => setPanelWp(e.target.value)}
                                            className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md pl-3 pr-10 text-sm"
                                        />
                                        <span className="absolute right-3 top-2.5 text-xs text-[#5A6B7F]">Wp</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#0A1D33]">Jenis baterai &amp; kedalaman pengosongan (DoD)</label>
                                <select
                                    value={batteryType}
                                    onChange={(e) => setBatteryType(e.target.value)}
                                    className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md px-3 text-sm"
                                >
                                    <option value="lithium">Lithium LiFePO4 — DoD 80%</option>
                                    <option value="lead_acid">Lead-Acid / GEL — DoD 50%</option>
                                </select>
                            </div>

                            <div className="flex justify-end pt-1">
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={calculateViaApi}
                                    className="bg-[#3AE7DF] hover:bg-cyan-300 disabled:opacity-60 text-[#0B1F3A] text-xs font-bold px-5 h-10 rounded-md transition cursor-pointer"
                                >
                                    {loading ? 'Menghitung...' : 'Hitung Sistem PLTS'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Estimates */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="bg-[#071A2F] text-white rounded-2xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold">Estimasi sistem Anda</span>
                                <span className="bg-[#0E314D] text-[#3AE7DF] text-[10px] font-bold px-2.5 py-1 rounded-full">
                                    {apiResult ? 'API Terhubung' : `${energiKwh.toLocaleString('id-ID')} kWh / hari`}
                                </span>
                            </div>

                            <div>
                                <p className="text-xs text-[#AFC4D8]">Kebutuhan minimum panel surya</p>
                                <p className="text-4xl font-bold text-white mt-1">
                                    &approx; {Math.round(minPanelWp).toLocaleString('id-ID')} <span className="text-lg font-normal">Wp</span>
                                </p>
                            </div>

                            <div className="bg-[#0E2742] border border-[#25435E] rounded-xl p-4 flex items-center gap-4">
                                <span className="text-3xl font-bold text-[#3AE7DF]">{panelCount}</span>
                                <div>
                                    <p className="text-sm font-bold text-white">panel &times; {panelWp} Wp</p>
                                    <p className="text-xs text-[#AFC4D8]">{installedWp.toLocaleString('id-ID')} Wp kapasitas terpasang</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-5 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#0A1D33]">Kapasitas baterai</span>
                                <span className="bg-[#E6F8F6] text-[#0D7377] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                    Pilihan praktis
                                </span>
                            </div>
                            <p className="text-3xl font-bold text-[#0A1D33]">
                                {batteryAhPractical.toLocaleString('id-ID')} Ah <span className="text-sm font-normal text-[#5A6B7F]">pada {systemVoltage} V</span>
                            </p>
                            <p className="text-xs font-bold text-[#0D7377]">
                                Teoritis: {Number(batteryAhExact).toFixed(1).replace('.', ',')} Ah
                            </p>
                        </div>

                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-5 space-y-2">
                            <p className="text-xs font-bold text-[#0A1D33]">Rekomendasi inverter</p>
                            <p className="text-2xl font-bold text-[#0A1D33]">
                                Minimal {inverterRec.toLocaleString('id-ID')} W <span className="text-sm font-normal text-[#5A6B7F]">&middot; {systemVoltage} V</span>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
