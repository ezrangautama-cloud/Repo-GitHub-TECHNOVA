import React from 'react';

export default function HeroSection() {
    return (
        <section id="home" class="w-full flex-1 grid grid-cols-1 lg:grid-cols-2 m-0 p-0">
            {/* Hero Left Column */}
            <div class="bg-[#0B1727] p-8 md:p-16 lg:p-20 flex flex-col justify-center items-start text-white">
                <span class="text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase mb-6">
                    ENGINEERING &bull; EDUCATION &bull; INNOVATION
                </span>

                <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.06] mb-8">
                    Ideas<br />
                    engineered<br />
                    into <span class="font-serif italic text-cyan-400 font-normal">impact.</span>
                </h1>

                <p class="text-slate-300 text-base lg:text-lg mb-10 max-w-lg leading-relaxed font-normal">
                    Empowering engineering education, innovation, and smart technology through practical solutions.
                </p>

                <div class="flex flex-wrap gap-4 items-center">
                    <a href="#courses" class="bg-[#00F0FF] hover:bg-[#00d8e6] text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg transition text-sm">
                        <span>Explore Courses</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>

                    <a href="#services" class="border border-slate-600 hover:border-slate-300 text-slate-200 font-semibold px-6 py-3 rounded-lg transition text-sm">
                        Engineering Services
                    </a>

                    <a href="#tools" class="border border-slate-600 hover:border-slate-300 text-slate-200 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition text-sm">
                        <span>Explore Tools</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>
            </div>

            {/* Hero Right Column: Hardware Image */}
            <div class="relative min-h-[400px] lg:min-h-full bg-slate-900 bg-cover bg-center flex flex-col justify-end" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')" }}>
                <div class="absolute inset-0 bg-gradient-to-t from-[#0B1727]/95 via-[#0B1727]/30 to-transparent pointer-events-none"></div>
                <div class="relative z-10 p-8 md:p-12 text-right flex justify-end">
                    <p class="text-slate-100 font-serif italic text-2xl md:text-3xl max-w-sm drop-shadow-xl leading-snug">
                        Precision engineering at every connection.
                    </p>
                </div>
            </div>
        </section>
    );
}
