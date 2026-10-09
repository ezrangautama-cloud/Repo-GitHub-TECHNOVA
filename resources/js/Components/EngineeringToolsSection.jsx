import React, { useState } from 'react';

export default function EngineeringToolsSection() {
    const [voltage, setVoltage] = useState(220);
    const [current, setCurrent] = useState(2.5);
    const [activeTool, setActiveTool] = useState(0);

    const resultPower = (parseFloat(voltage) || 0) * (parseFloat(current) || 0);

    return (
        <section id="tools" class="bg-[#E6F8F6] py-24 px-6 md:px-12 lg:px-20 text-slate-900 border-t border-slate-100">
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column */}
                    <div class="lg:col-span-5 flex flex-col justify-center">
                        <span class="text-slate-600 text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                            ENGINEERING TOOLS
                        </span>
                        <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1727] tracking-tight leading-none mb-2">
                            Calculate with
                        </h2>
                        <h3 class="font-serif italic text-cyan-400 text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6">
                            confidence.
                        </h3>
                        <p class="text-slate-600 text-sm max-w-md mb-10 leading-relaxed font-normal">
                            Free, practical tools made for students, educators, and engineers. Quick answers, clear results&mdash;right in your browser.
                        </p>

                        <div class="space-y-3 max-w-sm">
                            <div
                                onClick={() => setActiveTool(0)}
                                class={`p-4 rounded-xl flex items-center gap-3.5 font-bold text-sm cursor-pointer transition ${activeTool === 0 ? 'bg-white shadow-xs border border-slate-200/60 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
                            >
                                <div class="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                </div>
                                <span>Electrical Power</span>
                            </div>

                            <div
                                onClick={() => setActiveTool(1)}
                                class={`p-4 rounded-xl flex items-center gap-3.5 font-medium text-sm cursor-pointer transition ${activeTool === 1 ? 'bg-white shadow-xs border border-slate-200/60 text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
                            >
                                <div class="w-9 h-9 rounded-lg text-slate-600 flex items-center justify-center">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                                    </svg>
                                </div>
                                <span>Solar PV Sizing</span>
                            </div>

                            <div
                                onClick={() => setActiveTool(2)}
                                class={`p-4 rounded-xl flex items-center gap-3.5 font-medium text-sm cursor-pointer transition ${activeTool === 2 ? 'bg-white shadow-xs border border-slate-200/60 text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
                            >
                                <div class="w-9 h-9 rounded-lg text-slate-600 flex items-center justify-center">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                    </svg>
                                </div>
                                <span>LED Resistor</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Live Calculator */}
                    <div class="lg:col-span-7 flex justify-center lg:justify-end">
                        <div class="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 max-w-xl w-full">
                            <div class="flex items-start justify-between mb-4">
                                <div>
                                    <span class="text-slate-400 text-[10px] font-bold tracking-wider uppercase block mb-1">
                                        LIVE CALCULATOR
                                    </span>
                                    <h4 class="text-2xl font-bold text-slate-900 mb-1">Electrical Power</h4>
                                    <p class="text-slate-500 text-xs">Calculate power using voltage and current.</p>
                                </div>
                                <div class="w-8 h-8 text-slate-700 flex items-center justify-center">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                                <div>
                                    <label class="block text-xs font-bold text-slate-700 mb-2">Voltage (V)</label>
                                    <div class="relative flex items-center">
                                        <input
                                            type="number"
                                            value={voltage}
                                            onChange={(e) => setVoltage(e.target.value)}
                                            class="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-14"
                                        />
                                        <span class="absolute right-4 text-xs font-bold text-slate-400 pointer-events-none">Volt</span>
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 mb-2">Current (I)</label>
                                    <div class="relative flex items-center">
                                        <input
                                            type="number"
                                            value={current}
                                            onChange={(e) => setCurrent(e.target.value)}
                                            class="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-16"
                                        />
                                        <span class="absolute right-4 text-xs font-bold text-slate-400 pointer-events-none">Ampere</span>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center my-6 text-slate-700 font-serif italic text-base">
                                P = V &times; I
                            </div>

                            <div class="bg-[#0B1727] text-white p-6 rounded-2xl">
                                <span class="text-cyan-400 text-[10px] font-bold tracking-wider uppercase block mb-1">
                                    CALCULATED RESULT
                                </span>
                                <div class="flex items-baseline gap-1.5">
                                    <span class="text-4xl md:text-5xl font-black text-white">
                                        {resultPower.toLocaleString('id-ID', { maximumFractionDigits: 2 })}
                                    </span>
                                    <span class="text-xl font-bold text-cyan-400">W</span>
                                </div>
                                <p class="text-slate-400 text-xs mt-1">Power in watts</p>
                            </div>

                            <div class="mt-6">
                                <a href="#calculators" class="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-cyan-500 transition">
                                    <span>Explore all calculators</span>
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
