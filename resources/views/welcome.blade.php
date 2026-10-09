<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TECHNOVA - Ideas Engineered Into Impact</title>

    <!-- Google Fonts: Inter & Playfair Display -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,400;1,600;1,700&display=swap" rel="stylesheet">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-slate-900 text-slate-100 min-h-screen flex flex-col m-0 p-0 overflow-x-hidden">

    <header class="bg-white text-slate-900 border-b border-slate-100 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            
            <a href="/" class="flex items-center gap-3">
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
            </a>

            <!-- Navigation -->
            <nav class="hidden lg:flex items-center gap-7 text-xs md:text-sm font-semibold text-slate-700">
                <a href="#home" class="hover:text-cyan-500 transition">Home</a>
                <a href="#services" class="hover:text-cyan-500 transition">Services</a>
                <a href="#courses" class="hover:text-cyan-500 transition">Courses</a>
                <a href="#products" class="hover:text-cyan-500 transition">Products</a>
                <a href="#tools" class="hover:text-cyan-500 transition">Tools</a>
                <a href="#projects" class="hover:text-cyan-500 transition">Projects</a>
                <a href="#about" class="hover:text-cyan-500 transition">About</a>
                <a href="{{ route('login') }}" class="hover:text-cyan-500 transition">Admin Login</a>
            </nav>

            <!-- Consultation -->
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

    <!-- Hero Section -->
    <section id="home" class="w-full flex-1 grid grid-cols-1 lg:grid-cols-2 m-0 p-0">
        
        <!-- Hero Left Column -->
        <div class="bg-[#0B1727] p-8 md:p-16 lg:p-20 flex flex-col justify-center items-start text-white">
            
            <!-- Category Badge -->
            <span class="text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase mb-6">
                ENGINEERING &bull; EDUCATION &bull; INNOVATION
            </span>

            <!-- Main Heading -->
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.06] mb-8">
                Ideas<br>
                engineered<br>
                into <span class="font-serif italic text-cyan-400 font-normal">impact.</span>
            </h1>

            <!-- Subtitle Description -->
            <p class="text-slate-300 text-base lg:text-lg mb-10 max-w-lg leading-relaxed font-normal">
                Empowering engineering education, innovation, and smart technology through practical solutions.
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4 items-center">
                <a href="#courses" class="bg-[#00F0FF] hover:bg-[#00d8e6] text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg transition text-sm">
                    <span>Explore Courses</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                </a>

                <a href="#services" class="border border-slate-600 hover:border-slate-300 text-slate-200 font-semibold px-6 py-3 rounded-lg transition text-sm">
                    Engineering Services
                </a>

                <a href="#tools" class="border border-slate-600 hover:border-slate-300 text-slate-200 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition text-sm">
                    <span>Explore Tools</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                </a>
            </div>

        </div>

        <!-- Hero Right Column: Hardware / IoT Image Section -->
        <div class="relative min-h-[400px] lg:min-h-full bg-slate-900 bg-cover bg-center flex flex-col justify-end" style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80');">
            <!-- Overlay Gradient for text readability at bottom right -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B1727]/95 via-[#0B1727]/30 to-transparent pointer-events-none"></div>

            <!-- Overlay Text Bottom Right -->
            <div class="relative z-10 p-8 md:p-12 text-right flex justify-end">
                <p class="text-slate-100 font-serif italic text-2xl md:text-3xl max-w-sm drop-shadow-xl leading-snug">
                    Precision engineering at every connection.
                </p>
            </div>
        </div>

    </section>

    <!-- What We Do Section -->
    <section id="services" class="bg-[#F8FAFC] py-20 px-6 md:px-12 lg:px-20 text-slate-900 border-t border-slate-100">
        <div class="max-w-7xl mx-auto">
            
            <div class="mb-16">
                <span class="text-slate-400 text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                    WHAT WE DO
                </span>
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1727] tracking-tight leading-none mb-2">
                    Learn the theory.
                </h2>
                <h3 class="font-serif italic text-cyan-400 text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
                    Build the future.
                </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch border-t border-b md:border-l md:border-r border-slate-200">
                
                <div class="bg-white border-b md:border-b-0 md:border-r border-slate-200 p-8 flex flex-col justify-between group rounded-none min-h-[340px]">
                    <div>
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                </svg>
                            </div>
                            <span class="text-slate-400 text-xs font-medium tracking-wider">01</span>
                        </div>

                        <h4 class="text-2xl font-bold text-slate-900 mb-3">Learn</h4>
                        <p class="text-slate-500 text-sm leading-relaxed mb-8">
                            Practical learning in electronics, IoT, instrumentation, and renewable energy.
                        </p>
                    </div>

                    <a href="#courses" class="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-cyan-500 transition group-hover:translate-x-1 duration-200">
                        <span>Browse courses</span>
                        <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>

                <div class="bg-[#0B1727] text-white p-8 md:p-10 shadow-2xl flex flex-col justify-between transform lg:-translate-y-5 rounded-none z-10 border border-slate-800 min-h-[360px] group">
                    <div>
                        <!-- Header: Icon & Number -->
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                                </svg>
                            </div>
                            <span class="text-cyan-400 text-xs font-semibold tracking-wider">02</span>
                        </div>

                        <!-- Content -->
                        <h4 class="text-2xl font-bold text-white mb-3">Build</h4>
                        <p class="text-slate-300 text-sm leading-relaxed mb-8">
                            Engineering solutions, IoT prototypes, monitoring systems, and laboratory solutions.
                        </p>
                    </div>

                    <!-- Action Link -->
                    <a href="#services" class="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition group-hover:translate-x-1 duration-200">
                        <span>Our services</span>
                        <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>

                <div class="bg-white p-8 flex flex-col justify-between group rounded-none min-h-[340px]">
                    <div>
                        <!-- Header: Icon & Number -->
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <span class="text-slate-400 text-xs font-medium tracking-wider">03</span>
                        </div>

                        <!-- Content -->
                        <h4 class="text-2xl font-bold text-slate-900 mb-3">Solve</h4>
                        <p class="text-slate-500 text-sm leading-relaxed mb-8">
                            Engineering calculators and digital tools for students, educators, and engineers.
                        </p>
                    </div>

                    <!-- Action Link -->
                    <a href="#tools" class="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-cyan-500 transition group-hover:translate-x-1 duration-200">
                        <span>Open tools</span>
                        <svg class="w-3.5 h-3.5 text-slate-900 group-hover:text-cyan-500" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>

            </div>

        </div>
    </section>

    <!-- Featured Services Section -->
    <section id="featured-services" class="bg-[#0A1628] py-24 px-6 md:px-12 lg:px-20 text-white border-t border-slate-800">
        <div class="max-w-7xl mx-auto">
            
            <!-- Section Header Row -->
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <span class="text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                        FEATURED SERVICES
                    </span>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-2">
                        Engineering solutions
                    </h2>
                    <h3 class="font-serif italic text-cyan-400 text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
                        that work.
                    </h3>
                </div>

                <!-- Top Right View All Services Button -->
                <div>
                    <a href="#all-services" class="border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 text-slate-300 text-xs font-semibold px-5 py-3 rounded-full inline-flex items-center gap-2 transition duration-200">
                        <span>View all services</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- 4 Grid Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <!-- Service 01: IoT & Electronics -->
                <div class="bg-[#0E1E34]/90 border border-slate-800/90 p-8 rounded-none flex flex-col justify-between hover:border-cyan-500/50 hover:bg-[#11243E] transition duration-300 min-h-[380px] group">
                    <div>
                        <!-- Header: Icon & Number -->
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.25)]">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                                </svg>
                            </div>
                            <span class="text-slate-500 text-xs font-mono">01</span>
                        </div>

                        <!-- Content -->
                        <h4 class="text-xl font-bold text-white mb-3">IoT & Electronics</h4>
                        <p class="text-slate-400 text-sm leading-relaxed mb-6">
                            Connected systems, sensor integration, and rapid electronics prototyping built for real applications.
                        </p>

                        <!-- Tech Tags -->
                        <div class="flex flex-wrap gap-2 mb-6">
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">ESP32</span>
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">Sensors</span>
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">Prototyping</span>
                        </div>
                    </div>

                    <!-- Action Link -->
                    <a href="#consultation" class="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition group-hover:translate-x-1 duration-200">
                        <span>Request consultation</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>

                <!-- Service 02: Instrumentation -->
                <div class="bg-[#0E1E34]/90 border border-slate-800/90 p-8 rounded-none flex flex-col justify-between hover:border-cyan-500/50 hover:bg-[#11243E] transition duration-300 min-h-[380px] group">
                    <div>
                        <!-- Header: Icon & Number -->
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.25)]">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                                </svg>
                            </div>
                            <span class="text-slate-500 text-xs font-mono">02</span>
                        </div>

                        <!-- Content -->
                        <h4 class="text-xl font-bold text-white mb-3">Instrumentation</h4>
                        <p class="text-slate-400 text-sm leading-relaxed mb-6">
                            Accurate measurement, data acquisition, and custom monitoring systems for research and industry.
                        </p>

                        <!-- Tech Tags -->
                        <div class="flex flex-wrap gap-2 mb-6">
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">DAQ</span>
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">Measurement</span>
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">Monitoring</span>
                        </div>
                    </div>

                    <!-- Action Link -->
                    <a href="#consultation" class="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition group-hover:translate-x-1 duration-200">
                        <span>Request consultation</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>

                <!-- Service 03: Renewable Energy -->
                <div class="bg-[#0E1E34]/90 border border-slate-800/90 p-8 rounded-none flex flex-col justify-between hover:border-cyan-500/50 hover:bg-[#11243E] transition duration-300 min-h-[380px] group">
                    <div>
                        <!-- Header: Icon & Number -->
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.25)]">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                            </div>
                            <span class="text-slate-500 text-xs font-mono">03</span>
                        </div>

                        <!-- Content -->
                        <h4 class="text-xl font-bold text-white mb-3">Renewable Energy</h4>
                        <p class="text-slate-400 text-sm leading-relaxed mb-6">
                            Solar PV design, smart energy monitoring, and dependable battery system planning.
                        </p>

                        <!-- Tech Tags -->
                        <div class="flex flex-wrap gap-2 mb-6">
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">Solar PV</span>
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">Battery</span>
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">Energy</span>
                        </div>
                    </div>

                    <!-- Action Link -->
                    <a href="#consultation" class="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition group-hover:translate-x-1 duration-200">
                        <span>Request consultation</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>

                <!-- Service 04: Laboratory Solutions -->
                <div class="bg-[#0E1E34]/90 border border-slate-800/90 p-8 rounded-none flex flex-col justify-between hover:border-cyan-500/50 hover:bg-[#11243E] transition duration-300 min-h-[380px] group">
                    <div>
                        <!-- Header: Icon & Number -->
                        <div class="flex items-center justify-between mb-8">
                            <div class="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.25)]">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                                </svg>
                            </div>
                            <span class="text-slate-500 text-xs font-mono">04</span>
                        </div>

                        <!-- Content -->
                        <h4 class="text-xl font-bold text-white mb-3">Laboratory Solutions</h4>
                        <p class="text-slate-400 text-sm leading-relaxed mb-6">
                            Digital laboratories, practical modules, and connected monitoring for modern engineering education.
                        </p>

                        <!-- Tech Tags -->
                        <div class="flex flex-wrap gap-2 mb-6">
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">Digital Lab</span>
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">Modules</span>
                            <span class="border border-slate-800 bg-slate-900/60 text-slate-400 text-[11px] font-medium px-3 py-1 rounded-full">Integration</span>
                        </div>
                    </div>

                    <!-- Action Link -->
                    <a href="#consultation" class="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition group-hover:translate-x-1 duration-200">
                        <span>Request consultation</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>

            </div>

        </div>
    </section>

    <!-- Digital Learning Section -->
    <section id="courses" class="bg-white py-24 px-6 md:px-12 lg:px-20 text-slate-900 border-t border-slate-100">
        <div class="max-w-7xl mx-auto">
            
            <!-- Section Header Row -->
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <span class="text-slate-400 text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                        DIGITAL LEARNING
                    </span>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1727] tracking-tight leading-none mb-2">
                        Knowledge made
                    </h2>
                    <h3 class="font-serif italic text-cyan-400 text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
                        practical.
                    </h3>
                </div>

                <!-- Top Right Tab Switch -->
                <div class="bg-slate-100 p-1.5 rounded-xl inline-flex items-center gap-1 border border-slate-200/80">
                    <button type="button" class="bg-[#00F0FF] text-slate-950 font-bold text-xs px-5 py-2 rounded-lg shadow-xs">
                        Courses
                    </button>
                    <button type="button" class="text-slate-600 hover:text-slate-900 font-medium text-xs px-5 py-2 rounded-lg transition">
                        Digital products
                    </button>
                </div>
            </div>

            <!-- Courses Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                
                <!-- Course 01: Electronics Fundamentals -->
                <div class="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between min-h-[340px] group">
                    <div>
                        <!-- Icon -->
                        <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                        </div>

                        <!-- Level Tag -->
                        <span class="text-slate-400 text-[10px] font-bold tracking-wider uppercase block mb-2">
                            BEGINNER
                        </span>

                        <!-- Title & Format -->
                        <h4 class="text-xl font-bold text-slate-900 mb-2">Electronics Fundamentals</h4>
                        <p class="text-slate-400 text-xs font-medium mb-6">Video + PDF</p>
                    </div>

                    <!-- Footer: Price & Link -->
                    <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span class="text-slate-900 font-extrabold text-base">Rp 99.000</span>
                        <a href="#course-1" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-500 transition group-hover:translate-x-1 duration-200">
                            <span>Details</span>
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Course 02: ESP32 for IoT -->
                <div class="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between min-h-[340px] group">
                    <div>
                        <!-- Icon -->
                        <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
                            </svg>
                        </div>

                        <!-- Level Tag -->
                        <span class="text-slate-400 text-[10px] font-bold tracking-wider uppercase block mb-2">
                            BEGINNER, INTERMEDIATE
                        </span>

                        <!-- Title & Format -->
                        <h4 class="text-xl font-bold text-slate-900 mb-2">ESP32 for IoT</h4>
                        <p class="text-slate-400 text-xs font-medium mb-6">Video + Project</p>
                    </div>

                    <!-- Footer: Price & Link -->
                    <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span class="text-slate-900 font-extrabold text-base">Rp 149.000</span>
                        <a href="#course-2" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-500 transition group-hover:translate-x-1 duration-200">
                            <span>Details</span>
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Course 03: IoT Monitoring System -->
                <div class="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between min-h-[340px] group">
                    <div>
                        <!-- Icon -->
                        <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                            </svg>
                        </div>

                        <!-- Level Tag -->
                        <span class="text-slate-400 text-[10px] font-bold tracking-wider uppercase block mb-2">
                            INTERMEDIATE
                        </span>

                        <!-- Title & Format -->
                        <h4 class="text-xl font-bold text-slate-900 mb-2">IoT Monitoring System</h4>
                        <p class="text-slate-400 text-xs font-medium mb-6">Video + Project</p>
                    </div>

                    <!-- Footer: Price & Link -->
                    <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span class="text-slate-900 font-extrabold text-base">Rp 199.000</span>
                        <a href="#course-3" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-500 transition group-hover:translate-x-1 duration-200">
                            <span>Details</span>
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Course 04: Solar PV Fundamentals -->
                <div class="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between min-h-[340px] group">
                    <div>
                        <!-- Icon -->
                        <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                        </div>

                        <!-- Level Tag -->
                        <span class="text-slate-400 text-[10px] font-bold tracking-wider uppercase block mb-2">
                            BEGINNER
                        </span>

                        <!-- Title & Format -->
                        <h4 class="text-xl font-bold text-slate-900 mb-2">Solar PV Fundamentals</h4>
                        <p class="text-slate-400 text-xs font-medium mb-6">Video + Workbook</p>
                    </div>

                    <!-- Footer: Price & Link -->
                    <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span class="text-slate-900 font-extrabold text-base">Rp 149.000</span>
                        <a href="#course-4" class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-500 transition group-hover:translate-x-1 duration-200">
                            <span>Details</span>
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>
                </div>

            </div>

        </div>
    </section>

    <!-- Engineering Tools Section -->
    <section id="tools" class="bg-[#E6F8F6] py-24 px-6 md:px-12 lg:px-20 text-slate-900 border-t border-slate-100">
        <div class="max-w-7xl mx-auto">
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <!-- Left Column: Header, Description & Tool Selection Menu -->
                <div class="lg:col-span-5 flex flex-col justify-center">
                    
                    <span class="text-slate-600 text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                        ENGINEERING TOOLS
                    </span>
                    
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1727] tracking-tight leading-none mb-2">
                        Calculate with
                    </h2>
                    <h3 class="font-serif italic text-cyan-400 text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-6">
                        confidence.
                    </h3>

                    <p class="text-slate-600 text-sm max-w-md mb-10 leading-relaxed font-normal">
                        Free, practical tools made for students, educators, and engineers. Quick answers, clear results&mdash;right in your browser.
                    </p>

                    <!-- Tool Menu List -->
                    <div class="space-y-3 max-w-sm">
                        <!-- Active Item 1: Electrical Power -->
                        <div class="bg-white shadow-xs border border-slate-200/60 p-4 rounded-xl flex items-center gap-3.5 font-bold text-slate-900 text-sm cursor-pointer transition">
                            <div class="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                            <span>Electrical Power</span>
                        </div>

                        <!-- Inactive Item 2: Solar PV Sizing -->
                        <div class="p-4 rounded-xl flex items-center gap-3.5 font-medium text-slate-600 hover:text-slate-900 hover:bg-white/50 text-sm cursor-pointer transition">
                            <div class="w-9 h-9 rounded-lg text-slate-600 flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                            </div>
                            <span>Solar PV Sizing</span>
                        </div>

                        <!-- Inactive Item 3: LED Resistor -->
                        <div class="p-4 rounded-xl flex items-center gap-3.5 font-medium text-slate-600 hover:text-slate-900 hover:bg-white/50 text-sm cursor-pointer transition">
                            <div class="w-9 h-9 rounded-lg text-slate-600 flex items-center justify-center">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                </svg>
                            </div>
                            <span>LED Resistor</span>
                        </div>
                    </div>

                </div>

                <!-- Right Column: Interactive Live Calculator Card -->
                <div class="lg:col-span-7 flex justify-center lg:justify-end">
                    <div class="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 max-w-xl w-full">
                        
                        <!-- Card Header -->
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <span class="text-slate-400 text-[10px] font-bold tracking-wider uppercase block mb-1">
                                    LIVE CALCULATOR
                                </span>
                                <h4 class="text-2xl font-bold text-slate-900 mb-1">Electrical Power</h4>
                                <p class="text-slate-500 text-xs">Calculate power using voltage and current.</p>
                            </div>
                            <div class="w-8 h-8 text-slate-700 flex items-center justify-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                        </div>

                        <!-- Calculator Input Fields -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                            <!-- Voltage Field -->
                            <div>
                                <label for="calc-voltage" class="block text-xs font-bold text-slate-700 mb-2">
                                    Voltage (V)
                                </label>
                                <div class="relative flex items-center">
                                    <input 
                                        type="number" 
                                        id="calc-voltage" 
                                        value="220" 
                                        step="any"
                                        class="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-14"
                                        oninput="calculatePower()"
                                    />
                                    <span class="absolute right-4 text-xs font-bold text-slate-400 pointer-events-none">Volt</span>
                                </div>
                            </div>

                            <!-- Current Field -->
                            <div>
                                <label for="calc-current" class="block text-xs font-bold text-slate-700 mb-2">
                                    Current (I)
                                </label>
                                <div class="relative flex items-center">
                                    <input 
                                        type="number" 
                                        id="calc-current" 
                                        value="2.5" 
                                        step="any"
                                        class="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-16"
                                        oninput="calculatePower()"
                                    />
                                    <span class="absolute right-4 text-xs font-bold text-slate-400 pointer-events-none">Ampere</span>
                                </div>
                            </div>
                        </div>

                        <!-- Formula Box -->
                        <div class="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center my-6 text-slate-700 font-serif italic text-base">
                            P = V &times; I
                        </div>

                        <!-- Calculated Result Box -->
                        <div class="bg-[#0B1727] text-white p-6 rounded-2xl">
                            <span class="text-cyan-400 text-[10px] font-bold tracking-wider uppercase block mb-1">
                                CALCULATED RESULT
                            </span>
                            <div class="flex items-baseline gap-1.5">
                                <span id="calc-result" class="text-4xl md:text-5xl font-black text-white">550</span>
                                <span class="text-xl font-bold text-cyan-400">W</span>
                            </div>
                            <p class="text-slate-400 text-xs mt-1">Power in watts</p>
                        </div>

                        <!-- Footer Link -->
                        <div class="mt-6">
                            <a href="#calculators" class="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-cyan-500 transition">
                                <span>Explore all calculators</span>
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </a>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </section>

    <!-- Call to Action Section -->
    <section id="contact" class="bg-[#E6F8F6] py-28 px-6 text-center text-slate-900 border-t border-slate-200/60">
        <div class="max-w-4xl mx-auto flex flex-col items-center">
            
            <!-- Category Tagline -->
            <span class="text-slate-500 text-xs font-bold tracking-[0.25em] uppercase block mb-4">
                HAVE AN IDEA?
            </span>

            <!-- Heading -->
            <h2 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0B1727] tracking-tight leading-tight mb-2">
                Let's engineer
            </h2>
            <h3 class="font-serif italic text-cyan-400 text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight mb-6">
                what's next.
            </h3>

            <!-- Description -->
            <p class="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-normal">
                From a first concept to a working system, our team is ready to help turn your engineering challenge into a practical solution.
            </p>

            <!-- Conversation Button -->
            <a href="https://wa.me/" target="_blank" class="bg-white hover:bg-slate-50 text-[#0B1727] font-bold text-base sm:text-lg px-8 py-4 rounded-2xl inline-flex items-center gap-6 shadow-md border border-slate-200/60 transition duration-200 group">
                <span>Start a conversation</span>
                <svg class="w-8 h-8 text-[#0B1727] shrink-0 group-hover:scale-105 transition duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    <path d="M9.5 9.5a2.5 2.5 0 0 1 3 0l1 1a1 1 0 0 1 0 1.5l-1.5 1.5a8 8 0 0 1-3.5-3.5L10 8.5a1 1 0 0 1 1.5 0l1 1"/>
                </svg>
            </a>

        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0B1727] text-slate-400 py-10 px-6 border-t border-slate-800 text-center text-xs">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; {{ date('Y') }} TECHNOVA. All rights reserved.</p>
            <div class="flex items-center gap-6">
                <a href="#privacy" class="hover:text-cyan-400 transition">Privacy Policy</a>
                <a href="#terms" class="hover:text-cyan-400 transition">Terms of Service</a>
                <a href="#contact" class="hover:text-cyan-400 transition">Contact Us</a>
            </div>
        </div>
    </footer>

    <!-- Inline Script for Live Calculator -->
    <script>
        function calculatePower() {
            const v = parseFloat(document.getElementById('calc-voltage').value) || 0;
            const i = parseFloat(document.getElementById('calc-current').value) || 0;
            const res = (v * i).toLocaleString('id-ID', { maximumFractionDigits: 2 });
            document.getElementById('calc-result').innerText = res;
        }
    </script>

</body>
</html>
