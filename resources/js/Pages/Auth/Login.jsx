import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Login({ error = null, success = null }) {
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
                        <h1 className="text-3xl font-extrabold text-[#0B1727] text-center mb-6">
                            Login
                        </h1>

                        {error && (
                            <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2.5 rounded-lg text-xs font-semibold">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-lg text-xs font-semibold">
                                {success}
                            </div>
                        )}

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

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-slate-300 hover:bg-slate-400 text-[#0B1727] font-bold py-3 px-6 rounded-lg transition duration-200 shadow-xs cursor-pointer"
                                >
                                    Login
                                </button>
                            </div>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-3 text-slate-400 font-semibold">
                                        Atau masuk dengan
                                    </span>
                                </div>
                            </div>

                            <a
                                href="/auth/google"
                                className="w-full border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-3 transition shadow-xs cursor-pointer text-sm"
                            >
                                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                    />
                                </svg>
                                <span>Login dengan Google</span>
                            </a>
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
