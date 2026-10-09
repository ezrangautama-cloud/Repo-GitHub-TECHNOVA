import React from 'react';

export default function FeaturedServicesSection() {
    const services = [
        {
            num: '01',
            title: 'IoT & Electronics',
            desc: 'Connected systems, sensor integration, and rapid electronics prototyping built for real applications.',
            tags: ['ESP32', 'Sensors', 'Prototyping'],
            icon: (
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                </svg>
            )
        },
        {
            num: '02',
            title: 'Instrumentation',
            desc: 'Accurate measurement, data acquisition, and custom monitoring systems for research and industry.',
            tags: ['DAQ', 'Measurement', 'Monitoring'],
            icon: (
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
            )
        },
        {
            num: '03',
            title: 'Renewable Energy',
            desc: 'Solar PV design, smart energy monitoring, and dependable battery system planning.',
            tags: ['Solar PV', 'Battery', 'Energy'],
            icon: (
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
            )
        },
        {
            num: '04',
            title: 'Laboratory Solutions',
            desc: 'Digital laboratories, practical modules, and connected monitoring for modern engineering education.',
            tags: ['Digital Lab', 'Modules', 'Integration'],
            icon: (
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
            )
        }
    ];

    return (
        <section id="featured-services" class="bg-[#0A1628] py-24 px-6 md:px-12 lg:px-20 text-white border-t border-slate-800">
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span class="text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                            FEATURED SERVICES
                        </span>
                        <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-2">
                            Engineering solutions
                        </h2>
                        <h3 class="font-serif italic text-cyan-400 text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
                            that work.
                        </h3>
                    </div>

                    <div>
                        <a href="#all-services" class="border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 text-xs font-semibold px-5 py-3 rounded-full inline-flex items-center gap-2 transition duration-200">
                            <span>View all services</span>
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((item, idx) => (
                        <div key={idx} class="bg-[#0E1E34]/90 border border-slate-800/90 p-8 rounded-none flex flex-col justify-between hover:border-cyan-500/50 hover:bg-[#11243E] transition duration-300 min-h-[380px] group">
                            <div>
                                <div class="flex items-center justify-between mb-8">
                                    <div class="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.25)]">
                                        {item.icon}
                                    </div>
                                    <span class="text-slate-500 text-xs font-mono">{item.num}</span>
                                </div>

                                <h4 class="text-xl font-bold text-white mb-3">{item.title}</h4>
                                <p class="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>

                                <div class="flex flex-wrap gap-2 mb-6">
                                    {item.tags.map((tag, i) => (
                                        <span key={i} class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <a href="#consultation" class="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition group-hover:translate-x-1 duration-200">
                                <span>Request consultation</span>
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
