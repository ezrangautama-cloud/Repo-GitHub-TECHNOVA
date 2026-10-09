import React from 'react';

export default function Footer() {
    return (
        <footer class="bg-[#0B1727] text-slate-400 py-10 px-6 border-t border-slate-800 text-center text-xs">
            <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p>&copy; {new Date().getFullYear()} TECHNOVA. All rights reserved.</p>
                <div class="flex items-center gap-6">
                    <a href="#privacy" class="hover:text-cyan-400 transition">Privacy Policy</a>
                    <a href="#terms" class="hover:text-cyan-400 transition">Terms of Service</a>
                    <a href="#contact" class="hover:text-cyan-400 transition">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}
