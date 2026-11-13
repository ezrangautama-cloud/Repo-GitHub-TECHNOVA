import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function PortalLayout({ 
    children, 
    activeMenu = 'profil', 
    user = {
        name: 'Jaa Nurul',
        track: 'Jalur Teknik',
        role: 'Peserta',
        subRole: 'Peserta IoT & Instrumentasi'
    }
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const menuItems = [
        {
            key: 'dasbor',
            label: 'Dasbor',
            href: '/dashboard',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
            )
        },
        {
            key: 'kursus-saya',
            label: 'Kursus Saya',
            href: '/kursus-saya',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            )
        },
        {
            key: 'layanan-saya',
            label: 'Layanan Saya',
            href: '/layanan-saya',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
                </svg>
            )
        },
        {
            key: 'permintaan-layanan',
            label: 'Permintaan Layanan',
            href: '/permintaan-layanan',
            badge: 3,
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="2.5" />
                    <circle cx="18" cy="6" r="2.5" />
                    <circle cx="18" cy="18" r="2.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 8.5v7A2.5 2.5 0 008.5 18H15.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 8.5V15.5" />
                </svg>
            )
        },
        {
            key: 'notifikasi',
            label: 'Notifikasi',
            href: '/notifikasi',
            badge: 12,
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            )
        },
        {
            key: 'profil',
            label: 'Profil',
            href: '/admin/profil',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="16" rx="3" />
                    <circle cx="9" cy="10" r="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 9h4M14 13h4M7 16c0-1.5 1.5-2.5 3-2.5h0c1.5 0 3 1 3 2.5" />
                </svg>
            )
        },
        {
            key: 'pengaturan',
            label: 'Pengaturan',
            href: '/admin/pengaturan',
            icon: (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            )
        },
    ];

    return (
        <div className="font-sans antialiased bg-[#F8FAFC] text-slate-900 min-h-screen flex">
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
                            {user.name} - {user.track}
                        </span>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = activeMenu === item.key;
                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                                        isActive
                                            ? 'bg-[#D4EDE6] text-[#061426] font-bold shadow-xs'
                                            : 'text-[#8E9CAE] hover:text-white hover:bg-slate-800/50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={isActive ? 'text-[#061426]' : 'text-slate-400'}>
                                            {item.icon}
                                        </span>
                                        <span className="leading-tight">{item.label}</span>
                                    </div>

                                    {item.badge && (
                                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                            isActive
                                                ? 'bg-[#061426] text-white'
                                                : 'bg-[#072B3B] text-cyan-300 border border-cyan-700/40'
                                        }`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Target Mingguan Widget */}
                <div className="pt-6 mt-6 border-t border-slate-800/80">
                    <div className="bg-[#0B1E34] border border-[#17304D] rounded-xl p-3.5">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold tracking-wider text-[#00F0FF] uppercase">
                                TARGET MINGGUAN
                            </span>
                            <span className="text-xs font-bold text-white">
                                72%
                            </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden mb-2">
                            <div 
                                className="bg-[#00F0FF] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,240,255,0.7)]" 
                                style={{ width: '72%' }}
                            />
                        </div>

                        <p className="text-[11px] text-slate-400 font-medium">
                            TECHNOVA portal · v2.4
                        </p>
                    </div>
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
                                placeholder="Cari kursus, layanan, atau materi..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-50/80 focus:bg-white text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
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
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-500 ring-2 ring-white"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                className="flex items-center gap-2.5 py-1 pl-1 pr-2 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#0B1F3A] text-[#00F0FF] font-bold text-xs flex items-center justify-center shadow-xs">
                                    JN
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
                                        <p className="text-[11px] text-slate-400 truncate">{user.subRole}</p>
                                    </div>
                                    <Link 
                                        href="/admin/profil" 
                                        onClick={() => setUserDropdownOpen(false)}
                                        className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                                    >
                                        Profil Saya
                                    </Link>
                                    <Link 
                                        href="/admin/pengaturan" 
                                        onClick={() => setUserDropdownOpen(false)}
                                        className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                                    >
                                        Pengaturan
                                    </Link>
                                    <div className="border-t border-slate-100 my-1"></div>
                                    <Link 
                                        href="/login" 
                                        className="block px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium"
                                    >
                                        Keluar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
