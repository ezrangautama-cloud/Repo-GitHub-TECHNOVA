import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function PortalLayout({ 
    children, 
    activeMenu = 'dasbor', 
    searchPlaceholder = 'Cari kursus, layanan, atau materi...',
    user = {
        name: 'Nadia Putri',
        track: 'Peserta',
        role: 'Peserta',
        subRole: 'Peserta'
    }
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const defaultMenuItems = [
        {
            key: 'dasbor',
            label: 'Dasbor',
            href: '/dashboard',
        },
        {
            key: 'kursus-saya',
            label: 'Kursus Saya',
            href: '/kursus-saya',
        },
        {
            key: 'layanan-saya',
            label: 'Layanan Saya',
            href: '/layanan-saya',
        },
    ];

    // Support additional items if active (e.g. profil)
    let menuItems = [...defaultMenuItems];
    if (activeMenu === 'profil') {
        menuItems.push({ key: 'profil', label: 'Profil', href: '/admin/profil' });
    }

    return (
        <div className="font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen flex selection:bg-cyan-500 selection:text-white">
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div 
                    onClick={() => setSidebarOpen(false)} 
                    className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 md:w-72 bg-[#061426] text-white flex flex-col justify-between p-6 transform transition-transform duration-200 ease-in-out shrink-0 overflow-y-auto ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <div className="flex flex-col">
                    {/* Brand Logo */}
                    <div className="flex items-center justify-between mb-8 px-1 pt-1">
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
                        <button 
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-slate-400 hover:text-white p-1"
                            aria-label="Tutup menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Portal Peserta Badge Card */}
                    <div className="bg-[#0B1E34] border border-[#17304D] rounded-xl px-4 py-3 mb-6 shadow-inner">
                        <span className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-wider block">
                            PORTAL PESERTA
                        </span>
                        <span className="text-sm font-bold text-white block mt-0.5 truncate">
                            {user.name}
                        </span>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-1.5">
                        {menuItems.map((item) => {
                            const isActive = activeMenu === item.key;
                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={`w-full block px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                                        isActive
                                            ? 'bg-[#D4EDE6] text-[#061426] shadow-xs'
                                            : 'text-[#8E9CAE] hover:text-white hover:bg-slate-800/50'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        {/* Logout Button (Cyan) */}
                        <div className="pt-2">
                            <Link
                                href="/login"
                                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-[#00F0FF] hover:bg-cyan-300 text-[#061426] transition shadow-xs cursor-pointer active:scale-95"
                            >
                                <span>Logout</span>
                                <span className="text-sm leading-none">&rarr;</span>
                            </Link>
                        </div>
                    </nav>
                </div>

                {/* Footer status */}
                <div className="pt-6 mt-6 border-t border-slate-800/80">
                    <p className="text-[11px] text-slate-400 font-medium">
                        TECHNOVA portal · v2.4
                    </p>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header / Topbar */}
                <header className="bg-white border-b border-slate-200/80 px-6 lg:px-10 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-slate-600 hover:text-slate-900 focus:outline-none p-1"
                            aria-label="Buka menu navigasi"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Search Input Bar */}
                        <div className="relative w-full max-w-md">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-50/80 focus:bg-white text-xs text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
                            />
                        </div>
                    </div>

                    {/* Right Action Icons & User Dropdown */}
                    <div className="flex items-center gap-3">
                        {/* Notification Bell */}
                        <button 
                            className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition relative"
                            aria-label="Lihat notifikasi"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                className="flex items-center gap-2.5 py-1 pl-1 pr-2 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#0B1F3A] text-[#00F0FF] font-bold text-xs flex items-center justify-center shadow-xs">
                                    NP
                                </div>
                                <div className="text-left hidden sm:block">
                                    <span className="text-xs font-bold text-slate-800 block leading-tight">
                                        {user.name}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-medium block leading-tight">
                                        {user.role}
                                    </span>
                                </div>
                                <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {userDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                                    <div className="px-4 py-2 border-b border-slate-100">
                                        <p className="text-xs font-bold text-slate-800">{user.name}</p>
                                        <p className="text-[11px] text-slate-400">{user.subRole}</p>
                                    </div>
                                    <Link 
                                        href="/dashboard" 
                                        onClick={() => setUserDropdownOpen(false)}
                                        className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                                    >
                                        Dasbor
                                    </Link>
                                    <Link 
                                        href="/kursus-saya" 
                                        onClick={() => setUserDropdownOpen(false)}
                                        className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                                    >
                                        Kursus Saya
                                    </Link>
                                    <Link 
                                        href="/layanan-saya" 
                                        onClick={() => setUserDropdownOpen(false)}
                                        className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                                    >
                                        Layanan Saya
                                    </Link>
                                    <div className="border-t border-slate-100 my-1"></div>
                                    <Link 
                                        href="/login" 
                                        className="block px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
