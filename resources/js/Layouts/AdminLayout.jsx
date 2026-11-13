import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PortalLayout from './PortalLayout';

export default function AdminLayout({ 
    children, 
    activeMenu = 'kursus', 
    pageTitle = 'Pengelolaan kursus',
    variant = 'admin',
    customMenuItems = null,
    ...props 
}) {
    // If layout is requested as portal or for profil, render PortalLayout
    if (variant === 'portal' || activeMenu === 'profil') {
        return (
            <PortalLayout activeMenu={activeMenu} {...props}>
                {children}
            </PortalLayout>
        );
    }

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Primary admin menu items matching Figma design
    const defaultMenuItems = [
        { key: 'kursus', label: 'Kursus', href: '/admin/kursus' },
        { key: 'produk-digital', label: 'Produk Digital', href: '/admin/produk-digital' },
        { key: 'proyek', label: 'Proyek', href: '/admin/proyek' },
        { key: 'pesanan', label: 'Pesanan', href: '/admin/pesanan' },
    ];

    // Additional admin pages if currently active
    const extraItems = {
        'prospek': { key: 'prospek', label: 'Prospek', href: '/admin/prospek' },
        'materi': { key: 'materi', label: 'Materi', href: '/admin/materi' },
        'pengaturan': { key: 'pengaturan', label: 'Pengaturan', href: '/admin/pengaturan' },
    };

    let menuItems = customMenuItems || [...defaultMenuItems];
    if (!customMenuItems && extraItems[activeMenu]) {
        menuItems.push(extraItems[activeMenu]);
    }

    return (
        <div className="font-sans antialiased bg-[#F4F7FB] text-slate-900 min-h-screen flex">
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div 
                    onClick={() => setSidebarOpen(false)} 
                    className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 md:w-72 bg-[#061426] text-white flex flex-col justify-between p-6 transform transition-transform duration-200 ease-in-out shrink-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <div>
                    {/* Logo */}
                    <div className="flex items-center justify-between mb-8 px-2 pt-1">
                        <Link href="/" className="flex items-center gap-3">
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
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Konsol Admin Card */}
                    <div className="bg-[#0B1E34] border border-slate-700/60 rounded-xl px-4 py-3 mb-6 shadow-inner">
                        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                            KONSOL ADMIN
                        </span>
                        <span className="text-sm font-bold text-white block mt-0.5">
                            Konten & Operasional
                        </span>
                    </div>

                    {/* Navigation Items */}
                    <nav className="space-y-1.5">
                        {menuItems.map((item) => {
                            const isActive = activeMenu === item.key;
                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={`w-full block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                                        isActive
                                            ? 'bg-[#D4EDE6] text-[#061426] font-bold shadow-xs'
                                            : 'text-[#8E9CAE] hover:text-white hover:bg-slate-800/50'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer Status Widget */}
                <div className="pt-6 border-t border-slate-800/80">
                    <div className="bg-[#0B1E34] border border-slate-700/60 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                            <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase">
                                SISTEM AKTIF
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">
                            Ruang kerja TECHNOVA · v2.4
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="bg-white border-b border-slate-200/80 px-6 lg:px-10 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-slate-600 hover:text-slate-900 focus:outline-none p-1"
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
                                placeholder="Cari catatan, konten, atau pengguna..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50/80 hover:bg-slate-50 focus:bg-white text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400 transition"
                            />
                        </div>
                    </div>

                    {/* Profile Dropdown Badge */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 hover:border-slate-300 rounded-full py-1.5 pl-1.5 pr-3.5 cursor-pointer transition shadow-xs">
                            <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center">
                                TA
                            </div>
                            <span className="text-xs font-bold text-slate-800">
                                Admin TECHNOVA
                            </span>
                            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
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
