import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-[#061426] text-white pt-14 pb-10 px-6 border-t border-slate-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
                    {/* Column 1: Brand Info */}
                    <div className="space-y-2">
                        <Link href="/" className="text-base font-black tracking-widest text-white inline-block">
                            TECHNOVA
                        </Link>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-normal">
                            Pendidikan teknik praktis, IoT, instrumentasi, energi terbarukan, dan solusi laboratorium.
                        </p>
                    </div>

                    {/* Column 2: Jelajahi */}
                    <div>
                        <span className="text-xs font-bold text-white block mb-2.5">
                            Jelajahi
                        </span>
                        <p className="text-xs text-slate-400 font-medium">
                            Layanan &middot; Kursus &middot; Produk &middot; Alat &middot; Proyek
                        </p>
                    </div>

                    {/* Column 3: Kontak */}
                    <div>
                        <span className="text-xs font-bold text-white block mb-2.5">
                            Kontak
                        </span>
                        <p className="text-xs text-slate-400 block font-medium">
                            Konsultasi WhatsApp
                        </p>
                        <p className="text-xs text-slate-400 block font-mono mt-0.5">
                            hello@technova.id
                        </p>
                    </div>

                    {/* Column 4: Slogan & Copyright */}
                    <div className="md:text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                            TEKNIK &bull; PENDIDIKAN &bull; INOVASI
                        </span>
                        <p className="text-[11px] text-slate-400 font-medium">
                            &copy; TECHNOVA. Hak cipta dilindungi.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
