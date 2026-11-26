import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

const FALLBACK_PRESETS = [
    { nama_alat: 'Lampu LED', daya_watt: 10 },
    { nama_alat: 'AC 1/2 PK', daya_watt: 400 },
    { nama_alat: 'Kulkas', daya_watt: 150 },
    { nama_alat: 'TV LED', daya_watt: 80 },
    { nama_alat: 'Kipas Angin', daya_watt: 45 },
    { nama_alat: 'Mesin Cuci', daya_watt: 350 },
    { nama_alat: 'Laptop / Workstation', daya_watt: 65 },
];

export default function DayaListrik() {
    const [presets, setPresets] = useState(FALLBACK_PRESETS);
    const [items, setItems] = useState([
        { id: 1, name: 'Lampu LED', watt: 10, qty: 5, hours: 10 },
        { id: 2, name: 'AC 1/2 PK', watt: 400, qty: 1, hours: 8 },
        { id: 3, name: 'Kulkas', watt: 150, qty: 1, hours: 24 },
    ]);

    const [voltage, setVoltage] = useState(220);
    const [current, setCurrent] = useState(2);
    const [apiResult, setApiResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetch('/api/tools/electrical/presets')
            .then((res) => (res.ok ? res.json() : null))
            .then((json) => {
                if (json?.data?.length) {
                    setPresets(json.data);
                }
            })
            .catch(() => {});
    }, []);

    const calculateViaApi = async (currentItems = items) => {
        setLoading(true);
        setErrorMsg('');
        try {
            const response = await fetch('/api/tools/calculate/electrical', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    appliances: currentItems.map((item) => ({
                        nama_alat: item.name,
                        daya_watt: Math.max(0.1, Number(item.watt) || 0.1),
                        jumlah: Math.max(1, parseInt(item.qty, 10) || 1),
                        durasi_jam: Math.max(0.1, Math.min(24, Number(item.hours) || 1)),
                    })),
                }),
            });
            const json = await response.json();
            if (!response.ok) {
                setErrorMsg(json?.message || 'Gagal menghitung lewat API.');
            } else if (json?.data) {
                setApiResult(json.data);
            }
        } catch {
            setErrorMsg('Tidak dapat terhubung ke endpoint kalkulator.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        calculateViaApi();
    }, []);

    const updateItem = (id, field, value) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id !== id) return item;
                if (field === 'name') {
                    const preset = presets.find((p) => p.nama_alat === value);
                    return { ...item, name: value, watt: preset ? preset.daya_watt : item.watt };
                }
                const num = Math.max(0, Number(value) || 0);
                return { ...item, [field]: field === 'hours' ? Math.min(24, num) : num };
            })
        );
    };

    const addItem = (name = presets[0]?.nama_alat || 'TV LED', watt = presets[0]?.daya_watt || 80) => {
        setItems((prev) => [
            ...prev,
            { id: Date.now(), name, watt, qty: 1, hours: 4 },
        ]);
    };

    const removeItem = (id) => {
        setItems((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
    };

    const localWatt = items.reduce((sum, item) => sum + item.watt * item.qty, 0);
    const localWh = items.reduce((sum, item) => sum + item.watt * item.qty * item.hours, 0);

    const totalWatt = apiResult?.total_daya_watt ?? localWatt;
    const totalWh = apiResult?.energi_harian_wh ?? localWh;
    const totalKwh = apiResult?.energi_harian_kwh ?? totalWh / 1000;
    const safetyAcuan = apiResult?.daya_terhitung_dengan_safety_watt ?? totalWatt * 1.2;
    const plnLabel = apiResult?.rekomendasi_pln ?? (safetyAcuan <= 450 ? '450 VA' : safetyAcuan <= 900 ? '900 VA' : safetyAcuan <= 1300 ? '1.300 VA' : '2.200 VA atau lebih');

    const helperWatt = Math.round((Number(voltage) || 0) * (Number(current) || 0));

    const formatIdNumber = (val, decimals = 1) =>
        Number(val).toLocaleString('id-ID', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });

    return (
        <div className="min-h-screen flex flex-col bg-[#F4F8FC] text-[#0A1D33] font-sans">
            <Head title="Kalkulator Daya Beban Listrik — TECHNOVA" />
            <Navbar active="layanan" />

            {/* Dark Header */}
            <section className="bg-[#071A2F] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-14 py-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <p className="text-[11px] text-[#8FA8C2]">
                            <Link href="/" className="hover:text-white">Beranda</Link> / Alat / Daya beban listrik
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#19C6E7]">
                            ALAT TEKNIK TECHNOVA
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">
                            Kalkulator Daya Beban Listrik
                        </h1>
                        <p className="text-sm text-[#AFC4D8]">
                            Kenali total beban terpasang, energi harian, dan estimasi daya PLN rumah Anda.
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
                            Terhubung ke API <code>/api/tools/calculate/electrical</code>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Workspace */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-14 py-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-bold text-[#0A1D33]">
                                        Daftar peralatan listrik
                                    </h2>
                                    <p className="text-xs text-[#5A6B7F] mt-0.5">
                                        Masukkan daya pada label alat dan pola pemakaian harian.
                                    </p>
                                </div>
                                <span className="bg-[#E6F8F6] text-[#0D7377] text-[11px] font-bold px-3 py-1 rounded-full shrink-0">
                                    {items.length} peralatan
                                </span>
                            </div>

                            {errorMsg && (
                                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-4 py-2.5">
                                    {errorMsg}
                                </div>
                            )}

                            <div className="space-y-3">
                                <div className="hidden sm:grid grid-cols-12 gap-3 text-[11px] font-semibold text-[#5A6B7F] px-1">
                                    <span className="col-span-4">Nama alat</span>
                                    <span className="col-span-2">Daya / unit</span>
                                    <span className="col-span-2">Jumlah</span>
                                    <span className="col-span-2">Durasi / hari</span>
                                    <span className="col-span-2 text-right">Wh / hari</span>
                                </div>

                                {items.map((item) => {
                                    const rowWh = item.watt * item.qty * item.hours;
                                    const rowWatt = item.watt * item.qty;
                                    return (
                                        <div key={item.id} className="border-b border-[#CFE0EE]/60 pb-3 space-y-1.5">
                                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                                                <div className="sm:col-span-4">
                                                    <select
                                                        value={item.name}
                                                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md px-3 text-sm text-[#0A1D33]"
                                                    >
                                                        {!presets.some((p) => p.nama_alat === item.name) && (
                                                            <option value={item.name}>{item.name}</option>
                                                        )}
                                                        {presets.map((p) => (
                                                            <option key={p.nama_alat} value={p.nama_alat}>
                                                                {p.nama_alat}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="sm:col-span-2 relative">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.watt}
                                                        onChange={(e) => updateItem(item.id, 'watt', e.target.value)}
                                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md pl-3 pr-7 text-sm text-[#0A1D33]"
                                                    />
                                                    <span className="absolute right-2.5 top-2.5 text-xs text-[#5A6B7F]">W</span>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={item.qty}
                                                        onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md px-3 text-sm text-[#0A1D33]"
                                                    />
                                                </div>
                                                <div className="sm:col-span-2 relative">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="24"
                                                        value={item.hours}
                                                        onChange={(e) => updateItem(item.id, 'hours', e.target.value)}
                                                        className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md pl-3 pr-9 text-sm text-[#0A1D33]"
                                                    />
                                                    <span className="absolute right-2.5 top-2.5 text-xs text-[#5A6B7F]">jam</span>
                                                </div>
                                                <div className="sm:col-span-2 flex items-center justify-end gap-2">
                                                    <span className="text-sm font-bold text-[#0A1D33]">
                                                        {rowWh.toLocaleString('id-ID')}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        title="Hapus alat"
                                                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                                                    >
                                                        &#128465;
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-[#5A6B7F]">
                                                {item.watt} W &times; {item.qty} unit = {rowWatt.toLocaleString('id-ID')} W terpasang &middot; {item.hours} jam/hari
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={() => addItem()}
                                    className="border border-[#CFE0EE] hover:bg-slate-50 text-[#0A1D33] text-xs font-bold px-4 h-9 rounded-md transition cursor-pointer"
                                >
                                    + Tambah alat
                                </button>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => calculateViaApi()}
                                    className="bg-[#3AE7DF] hover:bg-cyan-300 disabled:opacity-60 text-[#0B1F3A] text-xs font-bold px-5 h-9 rounded-md transition cursor-pointer"
                                >
                                    {loading ? 'Menghitung...' : 'Hitung Daya Beban'}
                                </button>
                            </div>
                        </div>

                        {/* Alternatif V x I */}
                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-6 space-y-4">
                            <div>
                                <h2 className="text-base font-bold text-[#0A1D33]">
                                    Alternatif: hitung daya dari tegangan &times; arus
                                </h2>
                                <p className="text-xs text-[#5A6B7F] mt-0.5">
                                    Gunakan nilai tegangan dan arus alat untuk mendapatkan estimasi daya per unit.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                                <div className="sm:col-span-4 space-y-1">
                                    <label className="text-xs font-bold text-[#0A1D33]">Tegangan (V)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="1"
                                            value={voltage}
                                            onChange={(e) => setVoltage(e.target.value)}
                                            className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md pl-3 pr-8 text-sm"
                                        />
                                        <span className="absolute right-3 top-2.5 text-xs text-[#5A6B7F]">V</span>
                                    </div>
                                </div>
                                <div className="sm:col-span-4 space-y-1">
                                    <label className="text-xs font-bold text-[#0A1D33]">Arus (I)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0.1"
                                            step="0.1"
                                            value={current}
                                            onChange={(e) => setCurrent(e.target.value)}
                                            className="w-full h-10 bg-white border border-[#CFE0EE] rounded-md pl-3 pr-8 text-sm"
                                        />
                                        <span className="absolute right-3 top-2.5 text-xs text-[#5A6B7F]">A</span>
                                    </div>
                                </div>
                                <div className="sm:col-span-4 bg-[#EEF3F8] rounded-lg px-4 py-2">
                                    <span className="text-[10px] text-[#5A6B7F] block">P = V &times; I</span>
                                    <span className="text-lg font-bold text-[#0A1D33]">{helperWatt} W</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <span className="text-[11px] text-[#5A6B7F]">
                                    Pratinjau saja &middot; belum dimasukkan ke daftar di atas.
                                </span>
                                <button
                                    type="button"
                                    onClick={() => addItem('Laptop / Komputer Kerja', Math.max(1, helperWatt))}
                                    className="border border-[#CFE0EE] hover:bg-slate-50 text-[#0A1D33] text-xs font-bold px-4 h-9 rounded-md transition cursor-pointer"
                                >
                                    + Tambah sebagai alat
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Results */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-[#071A2F] text-white rounded-2xl p-6 space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white">Hasil perhitungan</span>
                                <span className="bg-[#0E314D] text-[#3AE7DF] text-[10px] font-bold px-2.5 py-1 rounded-full">
                                    {apiResult ? 'API Terhubung' : 'Lokal'}
                                </span>
                            </div>

                            <div className="border-b border-white/10 pb-4">
                                <p className="text-xs text-[#AFC4D8]">Total beban terpasang</p>
                                <p className="text-4xl font-bold text-white mt-1">
                                    {Number(totalWatt).toLocaleString('id-ID')} <span className="text-lg font-normal">W</span>
                                </p>
                                <p className="text-xs text-[#8FA8C2] mt-1">
                                    = {formatIdNumber(totalWatt / 1000, 2)} kW
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-[#AFC4D8]">Estimasi energi harian</p>
                                <p className="text-3xl font-bold text-[#3AE7DF] mt-1">
                                    {formatIdNumber(totalKwh, 1)} <span className="text-base font-bold">kWh/hari</span>
                                </p>
                                <p className="text-xs text-[#8FA8C2] mt-1">
                                    = {Number(totalWh).toLocaleString('id-ID')} Wh/hari
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#CFE0EE] rounded-2xl p-5 space-y-2">
                            <p className="text-xs font-bold text-[#0A1D33]">Rekomendasi PLN minimal</p>
                            <p className="text-2xl font-bold text-[#0A1D33]">{plnLabel}</p>
                            <p className="text-xs text-[#5A6B7F] leading-relaxed">
                                Beban {Number(totalWatt).toLocaleString('id-ID')} W + keamanan 20% = {Math.round(safetyAcuan).toLocaleString('id-ID')} W.
                            </p>
                        </div>

                        <div className="bg-[#E6F8F6] border border-[#3AE7DF]/40 rounded-2xl p-5 space-y-3">
                            <p className="text-xs font-bold text-[#0A1D33]">Lanjutkan perencanaan energi</p>
                            <p className="text-xs text-[#5A6B7F]">
                                Data yang dibawa ke kalkulator PLTS: energi {formatIdNumber(totalKwh, 1)} kWh/hari dan beban {Number(totalWatt).toLocaleString('id-ID')} W.
                            </p>
                            <Link
                                href={`/alat/plts?energi=${Number(totalKwh).toFixed(1)}&beban=${Math.round(totalWatt)}`}
                                className="w-full inline-flex items-center justify-center gap-2 bg-[#3AE7DF] hover:bg-cyan-300 text-[#0B1F3A] text-xs font-bold h-10 rounded-md transition"
                            >
                                <span>Gunakan Hasil untuk PLTS &rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
