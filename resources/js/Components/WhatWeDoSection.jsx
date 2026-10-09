import React from 'react';

export default function WhatWeDoSection() {
    return (
        <section id="services" class="bg-[#F8FAFC] py-20 px-6 md:px-12 lg:px-20 text-slate-900 border-t border-slate-100">
            <div class="max-w-7xl mx-auto">
                <div class="mb-16">
                    <span class="text-slate-400 text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                        WHAT WE DO
                    </span>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1727] tracking-tight leading-none mb-2">
                        Learn the theory.
                    </h2>
                    <h3 class="font-serif italic text-cyan-400 text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
                        Build the future.
                    </h3>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch border-t border-b md:border-l md:border-r border-slate-200">
                    {/* Card 01: Learn */}
                    <div class="bg-white border-b md:border-b-0 md:border-r border-slate-200 p-8 flex flex-col justify-between group rounded-none min-h-[340px]">
                        <div>
                            <div class="flex items-center justify-between mb-8">
                                <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                    </svg>
                                </div>
                                <span class="text-slate-400 text-xs font-medium tracking-wider">01</span>
                            </div>
                            <h4 class="text-2xl font-bold text-slate-900 mb-3">Learn</h4>
                            <p class="text-slate-500 text-sm leading-relaxed mb-8">
                                Practical learning in electronics, IoT, instrumentation, and renewable energy.
                            </p>
                        </div>
                        <a href="#courses" class="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-cyan-500 transition group-hover:translate-x-1 duration-200">
                            <span>Browse courses</span>
                            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>

                    {/* Card 02: Build */}
                    <div class="bg-[#0B1727] text-white p-8 md:p-10 shadow-2xl flex flex-col justify-between transform lg:-translate-y-5 rounded-none z-10 border border-slate-800 min-h-[360px] group">
                        <div>
                            <div class="flex items-center justify-between mb-8">
                                <div class="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                                    </svg>
                                </div>
                                <span class="text-cyan-400 text-xs font-semibold tracking-wider">02</span>
                            </div>
                            <h4 class="text-2xl font-bold text-white mb-3">Build</h4>
                            <p class="text-slate-300 text-sm leading-relaxed mb-8">
                                Engineering solutions, IoT prototypes, monitoring systems, and laboratory solutions.
                            </p>
                        </div>
                        <a href="#services" class="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition group-hover:translate-x-1 duration-200">
                            <span>Our services</span>
                            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>

                    {/* Card 03: Solve */}
                    <div class="bg-white p-8 flex flex-col justify-between group rounded-none min-h-[340px]">
                        <div>
                            <div class="flex items-center justify-between mb-8">
                                <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <span class="text-slate-400 text-xs font-medium tracking-wider">03</span>
                            </div>
                            <h4 class="text-2xl font-bold text-slate-900 mb-3">Solve</h4>
                            <p class="text-slate-500 text-sm leading-relaxed mb-8">
                                Engineering calculators and digital tools for students, educators, and engineers.
                            </p>
                        </div>
                        <a href="#tools" class="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-cyan-500 transition group-hover:translate-x-1 duration-200">
                            <span>Open tools</span>
                            <svg class="w-3.5 h-3.5 text-slate-900 group-hover:text-cyan-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
