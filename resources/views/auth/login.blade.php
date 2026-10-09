<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login - TECHNOVA</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />

    <!-- Vite Styles and Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-white min-h-screen w-full m-0 p-0 overflow-x-hidden">

    <!-- Fullscreen Edge-to-Edge Split Layout -->
    <div class="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 m-0 p-0">
        
        <!-- Left Half: White Login Form Area -->
        <div class="w-full min-h-screen bg-white flex flex-col justify-center items-center px-6 py-12 md:px-16">
            
            <div class="w-full max-w-sm mx-auto">
                <!-- Form Header Title -->
                <h1 class="text-3xl font-extrabold text-[#0B1727] text-center mb-10">
                    Login
                </h1>

                <form method="POST" action="{{ route('login') }}" class="space-y-6">
                    @csrf

                    <!-- User Name Field -->
                    <div>
                        <label for="username" class="block text-sm font-semibold text-slate-700 mb-2">
                            User Name
                        </label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            required 
                            autofocus 
                            class="w-full bg-slate-200 border border-transparent rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white transition"
                        />
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label for="password" class="block text-sm font-semibold text-slate-700 mb-2">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            class="w-full bg-slate-200 border border-transparent rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white transition"
                        />
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between text-xs text-slate-600 pt-1">
                        <label class="flex items-center gap-2 cursor-pointer select-none">
                            <input 
                                type="checkbox" 
                                name="remember" 
                                class="w-4 h-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-400"
                            />
                            <span>Remember Me</span>
                        </label>

                        <a href="#" class="text-slate-500 hover:text-cyan-600 transition">
                            Forgot Password?
                        </a>
                    </div>

                    <!-- Login Submit Button -->
                    <div class="pt-2">
                        <button 
                            type="submit" 
                            class="w-full bg-slate-300 hover:bg-slate-400 text-[#0B1727] font-bold py-3 px-6 rounded-lg transition duration-200 shadow-xs cursor-pointer"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <!-- Footer Sign Up Link -->
                <div class="mt-8 text-xs text-slate-500 text-left">
                    <span>New User? </span>
                    <a href="#" class="text-slate-600 hover:text-cyan-600 font-semibold transition">
                        Sign Up
                    </a>
                </div>
            </div>

        </div>

        <!-- Right Half: Dark Navy Brand Section (Edge-to-Edge) -->
        <div class="w-full min-h-screen bg-[#0B1727] hidden md:flex flex-col items-center justify-center relative overflow-hidden">
            <!-- Glowing background radial effect -->
            <div class="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <!-- Technova Circuit Logo SVG -->
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-48 h-48 mb-8 relative flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-[0_0_20px_rgba(0,240,255,0.85)]">
                        <!-- Hexagon Top Left -->
                        <polygon points="40,30 60,20 80,30 80,50 60,60 40,50" fill="#00F0FF" />
                        <!-- Hexagon Top Right -->
                        <polygon points="120,30 140,20 160,30 160,50 140,60 120,50" fill="#00F0FF" />
                        
                        <!-- Main T-Shape & IoT Node Circuits -->
                        <path d="M 60 40 H 140 L 100 110 L 80 80 L 120 140 L 100 170 L 60 110" stroke="#00F0FF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
                        
                        <!-- Circuit Nodes & Lines -->
                        <line x1="140" y1="40" x2="100" y2="110" stroke="#1E293B" stroke-width="4" />
                        <circle cx="140" cy="40" r="5" fill="#1E293B" />
                        <circle cx="100" cy="110" r="5" fill="#1E293B" />
                        
                        <line x1="75" y1="90" x2="115" y2="135" stroke="#1E293B" stroke-width="4" />
                        <circle cx="75" cy="90" r="5" fill="#1E293B" />
                        <circle cx="115" cy="135" r="5" fill="#1E293B" />
                    </svg>
                </div>

                <!-- Glowing Brand Typography -->
                <h2 class="text-4xl font-black text-cyan-400 tracking-wider drop-shadow-[0_0_14px_rgba(0,240,255,0.7)]">
                    TECHNOVA
                </h2>
            </div>
        </div>

    </div>

</body>
</html>
