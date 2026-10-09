import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div class="font-sans antialiased bg-white min-h-screen w-full m-0 p-0 overflow-x-hidden">
            <div class="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 m-0 p-0">
                {/* Left Half: Login Form */}
                <div class="w-full min-h-screen bg-white flex flex-col justify-center items-center px-6 py-12 md:px-16">
                    <div class="w-full max-w-sm mx-auto">
                        <h1 class="text-3xl font-extrabold text-[#0B1727] text-center mb-10">
                            Login
                        </h1>

                        <form onSubmit={submit} class="space-y-6">
                            <div>
                                <label htmlFor="username" class="block text-sm font-semibold text-slate-700 mb-2">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    required
                                    autoFocus
                                    class="w-full bg-slate-200 border border-transparent rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white transition"
                                />
                                {errors.username && <div class="text-red-500 text-xs mt-1">{errors.username}</div>}
                            </div>

                            <div>
                                <label htmlFor="password" class="block text-sm font-semibold text-slate-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    class="w-full bg-slate-200 border border-transparent rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white transition"
                                />
                                {errors.password && <div class="text-red-500 text-xs mt-1">{errors.password}</div>}
                            </div>

                            <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                                <label class="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        class="w-4 h-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-400"
                                    />
                                    <span>Remember Me</span>
                                </label>

                                <a href="#" class="text-slate-500 hover:text-cyan-600 transition">
                                    Forgot Password?
                                </a>
                            </div>

                            <div class="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    class="w-full bg-slate-300 hover:bg-slate-400 text-[#0B1727] font-bold py-3 px-6 rounded-lg transition duration-200 shadow-xs cursor-pointer"
                                >
                                    Login
                                </button>
                            </div>
                        </form>

                        <div class="mt-8 text-xs text-slate-500 text-left">
                            <span>New User? </span>
                            <a href="#" class="text-slate-600 hover:text-cyan-600 font-semibold transition">
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Half: Technova Banner */}
                <div class="w-full min-h-screen bg-[#0B1727] hidden md:flex flex-col items-center justify-center relative overflow-hidden">
                    <div class="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div class="relative z-10 flex flex-col items-center">
                        <div class="w-48 h-48 mb-8 relative flex items-center justify-center">
                            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-[0_0_20px_rgba(0,240,255,0.85)]">
                                <polygon points="40,30 60,20 80,30 80,50 60,60 40,50" fill="#00F0FF" />
                                <polygon points="120,30 140,20 160,30 160,50 140,60 120,50" fill="#00F0FF" />
                                <path d="M 60 40 H 140 L 100 110 L 80 80 L 120 140 L 100 170 L 60 110" stroke="#00F0FF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
                                <line x1="140" y1="40" x2="100" y2="110" stroke="#1E293B" stroke-width="4" />
                                <circle cx="140" cy="40" r="5" fill="#1E293B" />
                                <circle cx="100" cy="110" r="5" fill="#1E293B" />
                                <line x1="75" y1="90" x2="115" y2="135" stroke="#1E293B" stroke-width="4" />
                                <circle cx="75" cy="90" r="5" fill="#1E293B" />
                                <circle cx="115" cy="135" r="5" fill="#1E293B" />
                            </svg>
                        </div>

                        <h2 class="text-4xl font-black text-cyan-400 tracking-wider drop-shadow-[0_0_14px_rgba(0,240,255,0.7)]">
                            TECHNOVA
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
