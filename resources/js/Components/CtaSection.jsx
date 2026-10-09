import React from 'react';

export default function CtaSection() {
    return (
        <section id="contact" class="bg-[#E6F8F6] py-28 px-6 text-center text-slate-900 border-t border-slate-200/60">
            <div class="max-w-4xl mx-auto flex flex-col items-center">
                <span class="text-slate-500 text-xs font-bold tracking-[0.25em] uppercase block mb-4">
                    HAVE AN IDEA?
                </span>

                <h2 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0B1727] tracking-tight leading-tight mb-2">
                    Let's engineer
                </h2>
                <h3 class="font-serif italic text-cyan-400 text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight mb-6">
                    what's next.
                </h3>

                <p class="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-normal">
                    From a first concept to a working system, our team is ready to help turn your engineering challenge into a practical solution.
                </p>

                <a href="https://wa.me/" target="_blank" rel="noreferrer" class="bg-white hover:bg-slate-50 text-[#0B1727] font-bold text-base sm:text-lg px-8 py-4 rounded-2xl inline-flex items-center gap-6 shadow-md border border-slate-200/60 transition duration-200 group">
                    <span>Start a conversation</span>
                    <svg class="w-8 h-8 text-[#0B1727] shrink-0 group-hover:scale-105 transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        <path d="M9.5 9.5a2.5 2.5 0 0 1 3 0l1 1a1 1 0 0 1 0 1.5l-1.5 1.5a8 8 0 0 1-3.5-3.5L10 8.5a1 1 0 0 1 1.5 0l1 1"/>
                    </svg>
                </a>
            </div>
        </section>
    );
}
