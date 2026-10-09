import React from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
    return (
        <header class="bg-white text-slate-900 border-b border-slate-100 sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                
                {/* Brand Logo */}
                <Link href="/" class="flex items-center gap-3">
                    <div class="w-9 h-9 relative flex items-center justify-center">
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                            <polygon points="40,30 60,20 80,30 80,50 60,60 40,50" fill="#00F0FF" />
                            <polygon points="120,30 140,20 160,30 160,50 140,60 120,50" fill="#00F0FF" />
                            <path d="M 60 40 H 140 L 100 110 L 80 80 L 120 140 L 100 170 L 60 110" stroke="#00F0FF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <span class="text-2xl font-black tracking-wider text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
                        TECHNOVA
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav class="hidden lg:flex items-center gap-7 text-xs md:text-sm font-semibold text-slate-700">
                    <a href="#home" class="hover:text-cyan-500 transition">Home</a>
                    <a href="#services" class="hover:text-cyan-500 transition">Services</a>
                    <a href="#courses" class="hover:text-cyan-500 transition">Courses</a>
                    <a href="#products" class="hover:text-cyan-500 transition">Products</a>
                    <a href="#tools" class="hover:text-cyan-500 transition">Tools</a>
                    <a href="#projects" class="hover:text-cyan-500 transition">Projects</a>
                    <a href="#about" class="hover:text-cyan-500 transition">About</a>
                    <Link href="/login" class="hover:text-cyan-500 transition">Admin Login</Link>
                </nav>

                {/* Consultation Button */}
                <div class="flex items-center gap-3">
                    <a href="#consultation" class="bg-[#0B1727] hover:bg-slate-800 text-white px-5 py-2.5 rounded-full flex items-center gap-2.5 text-xs md:text-sm font-medium transition shadow-xs">
                        <span>Consultation</span>
                        <div class="w-6 h-6 rounded-full border border-slate-400 flex items-center justify-center text-slate-300">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                        </div>
                    </a>
                </div>

            </div>
        </header>
    );
}
