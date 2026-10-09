import React, { useState } from 'react';

export default function DigitalLearningSection() {
    const [activeTab, setActiveTab] = useState('courses');

    const courses = [
        {
            level: 'BEGINNER',
            title: 'Electronics Fundamentals',
            format: 'Video + PDF',
            price: 'Rp 99.000',
            icon: (
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
            )
        },
        {
            level: 'BEGINNER, INTERMEDIATE',
            title: 'ESP32 for IoT',
            format: 'Video + Project',
            price: 'Rp 149.000',
            icon: (
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                </svg>
            )
        },
        {
            level: 'INTERMEDIATE',
            title: 'IoT Monitoring System',
            format: 'Video + Project',
            price: 'Rp 199.000',
            icon: (
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
            )
        },
        {
            level: 'BEGINNER',
            title: 'Solar PV Fundamentals',
            format: 'Video + Workbook',
            price: 'Rp 149.000',
            icon: (
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
            )
        }
    ];

    return (
        <section id="courses" class="bg-white py-24 px-6 md:px-12 lg:px-20 text-slate-900 border-t border-slate-100">
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span class="text-slate-400 text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                            DIGITAL LEARNING
                        </span>
                        <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1727] tracking-tight leading-none mb-2">
                            Knowledge made
                        </h2>
                        <h3 class="font-serif italic text-cyan-400 text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
                            practical.
                        </h3>
                    </div>

                    <div class="bg-slate-100 p-1.5 rounded-xl inline-flex items-center gap-1 border border-slate-200/80">
                        <button
                            type="button"
                            onClick={() => setActiveTab('courses')}
                            class={`text-xs font-bold px-5 py-2 rounded-lg transition ${activeTab === 'courses' ? 'bg-[#00F0FF] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            Courses
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('products')}
                            class={`text-xs font-medium px-5 py-2 rounded-lg transition ${activeTab === 'products' ? 'bg-[#00F0FF] text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            Digital products
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {courses.map((item, idx) => (
                        <div key={idx} class="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between min-h-[340px] group">
                            <div>
                                <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <span class="text-slate-400 text-[10px] font-bold tracking-wider uppercase block mb-2">
                                    {item.level}
                                </span>
                                <h4 class="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                <p class="text-slate-400 text-xs font-medium mb-6">{item.format}</p>
                            </div>

                            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span class="text-slate-900 font-extrabold text-base">{item.price}</span>
                                <a href={`#course-${idx}`} class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-500 transition group-hover:translate-x-1 duration-200">
                                    <span>Details</span>
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
