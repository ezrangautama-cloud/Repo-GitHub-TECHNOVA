import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ active = 'beranda' }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { key: 'beranda', label: 'Beranda', href: '/' },
        { key: 'layanan', label: 'Layanan', href: '/#layanan' },
        { key: 'kursus', label: 'Kursus', href: '/kursus' },
        { key: 'produk-digital', label: 'Produk Digital', href: '/produk-digital' },
        { key: 'proyek', label: 'Proyek', href: '/proyek' },
        { key: 'tentang', label: 'Tentang', href: '/tentang' },
    ];

    return (
        <header className="bg-white text-slate-900 border-b border-slate-200/80 sticky top-0 z-50 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 relative flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_10px_rgba(0,240,255,0.85)]">
                            <polygon points="40,30 60,20 80,30 80,50 60,60 40,50" fill="#00F0FF" />
                            <polygon points="120,30 140,20 160,30 160,50 140,60 120,50" fill="#00F0FF" />
                            <path d="M 60 40 H 140 L 100 110 L 80 80 L 120 140 L 100 170 L 60 110" stroke="#00F0FF" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-xl font-black tracking-widest text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                        TECHNOVA
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-700">
                    {navLinks.map((item) => {
                        const isActive = active === item.key;
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`transition ${
                                    isActive
                                        ? 'text-[#00F0FF] font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]'
                                        : 'hover:text-cyan-600'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Action Buttons: Masuk & Daftar */}
                <div className="hidden sm:flex items-center gap-3">
                    <Link
                        href="/login"
                        className="flex items-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition shadow-2xs"
                    >
                        <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Masuk</span>
                    </Link>

                    <Link
                        href="/login"
                        className="bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs active:scale-95"
                    >
                        Daftar
                    </Link>
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden text-slate-700 p-1"
                    aria-label="Toggle Menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-3 shadow-lg">
                    {navLinks.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block text-sm font-semibold py-1.5 ${
                                active === item.key ? 'text-cyan-600 font-bold' : 'text-slate-700'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                        <Link
                            href="/login"
                            className="w-1/2 text-center border border-slate-200 py-2 rounded-xl text-xs font-bold"
                        >
                            Masuk
                        </Link>
                        <Link
                            href="/login"
                            className="w-1/2 text-center bg-[#00F0FF] text-[#061426] py-2 rounded-xl text-xs font-bold"
                        >
                            Daftar
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
