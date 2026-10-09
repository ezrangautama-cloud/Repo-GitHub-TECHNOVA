<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard - TECHNOVA</title>

    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Vite Styles and Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-[#FAFCFF] text-slate-900 min-h-screen flex m-0 p-0 overflow-x-hidden">

    <!-- Left Sidebar -->
    <aside class="w-64 md:w-72 bg-[#0B1727] text-white min-h-screen p-6 flex flex-col justify-between shrink-0">
        
        <div>
            <!-- Sidebar Header / Logo -->
            <a href="/" class="flex items-center gap-3 mb-10 px-2 pt-2">
                <div class="w-8 h-8 relative flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-[0_0_10px_rgba(0,240,255,0.85)]">
                        <polygon points="40,30 60,20 80,30 80,50 60,60 40,50" fill="#00F0FF" />
                        <polygon points="120,30 140,20 160,30 160,50 140,60 120,50" fill="#00F0FF" />
                        <path d="M 60 40 H 140 L 100 110 L 80 80 L 120 140 L 100 170 L 60 110" stroke="#00F0FF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <span class="text-xl font-black tracking-wider text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                    TECHNOVA
                </span>
            </a>

            <!-- Navigation Links -->
            <nav class="space-y-2">
                <!-- Dashboard (Active) -->
                <a href="{{ route('dashboard') }}" class="bg-cyan-100/90 text-[#0B1727] font-extrabold rounded-xl px-4 py-3 flex items-center gap-3 shadow-xs">
                    <svg class="w-5 h-5 text-[#0B1727]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                    </svg>
                    <span>Dashboard</span>
                </a>

                <!-- My Courses -->
                <a href="#my-courses" class="text-cyan-400 hover:text-cyan-300 font-semibold px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800/60 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    </svg>
                    <span>My Courses</span>
                </a>

                <!-- My Services -->
                <a href="#my-services" class="text-cyan-400 hover:text-cyan-300 font-semibold px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800/60 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    <span>My Services</span>
                </a>

                <!-- Service Requests -->
                <a href="#service-requests" class="text-cyan-400 hover:text-cyan-300 font-semibold px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800/60 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                    </svg>
                    <span>Service Requests</span>
                </a>

                <!-- Notification -->
                <a href="#notifications" class="text-cyan-400 hover:text-cyan-300 font-semibold px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800/60 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                    <span>Notification</span>
                </a>

                <!-- Profile -->
                <a href="#profile" class="text-cyan-400 hover:text-cyan-300 font-semibold px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800/60 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    <span>Profile</span>
                </a>

                <!-- Settings -->
                <a href="#settings" class="text-cyan-400 hover:text-cyan-300 font-semibold px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800/60 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>Settings</span>
                </a>
            </nav>
        </div>

        <!-- Sidebar Footer / Logout -->
        <div class="px-2 pt-6 border-t border-slate-800/80">
            <a href="{{ route('login') }}" class="text-slate-400 hover:text-white font-medium text-sm flex items-center gap-2 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                <span>Log Out</span>
            </a>
        </div>

    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 p-8 md:p-12 overflow-y-auto">
        <div class="max-w-6xl mx-auto">
            
            <!-- Welcome Header -->
            <div class="mb-8">
                <h1 class="text-3xl md:text-4xl font-black text-[#0B1727] mb-1">
                    Welcome, Jaa! 👋
                </h1>
                <p class="text-slate-500 text-sm">
                    Keep learning, keep growing!
                </p>
            </div>

            <!-- Stat Summary Cards Row -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <!-- Card 1: My Courses -->
                <div class="bg-[#F0F7FF] border border-cyan-100/60 p-6 rounded-2xl">
                    <span class="text-slate-700 font-bold text-sm block mb-3">My Courses</span>
                    <span class="text-3xl font-black text-[#0B1727]">2</span>
                </div>

                <!-- Card 2: My Services -->
                <div class="bg-[#F0F7FF] border border-cyan-100/60 p-6 rounded-2xl">
                    <span class="text-slate-700 font-bold text-sm block mb-3">My Services</span>
                    <span class="text-3xl font-black text-[#0B1727]">3</span>
                </div>

                <!-- Card 3: Total -->
                <div class="bg-[#F0F7FF] border border-cyan-100/60 p-6 rounded-2xl">
                    <span class="text-slate-700 font-bold text-sm block mb-3">Total</span>
                    <span class="text-3xl font-black text-[#0B1727]">5</span>
                </div>
            </div>

            <!-- My Courses Cards Section -->
            <div class="mb-12">
                <h2 class="text-lg font-bold text-[#0B1727] mb-4">
                    My Courses
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Course Card 1 -->
                    <div class="bg-[#0B1727] p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 min-h-[120px] flex flex-col justify-between group cursor-pointer">
                        <h3 class="text-cyan-400 font-bold text-lg leading-snug group-hover:text-cyan-300 transition">
                            ESP32 for IoT
                        </h3>
                        <span class="text-slate-400 text-xs font-mono mt-4">...</span>
                    </div>

                    <!-- Course Card 2 -->
                    <div class="bg-[#0B1727] p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 min-h-[120px] flex flex-col justify-between group cursor-pointer">
                        <h3 class="text-cyan-400 font-bold text-lg leading-snug group-hover:text-cyan-300 transition">
                            IoT Monitoring System
                        </h3>
                        <span class="text-slate-400 text-xs font-mono mt-4">...</span>
                    </div>

                    <!-- Course Card 3 -->
                    <div class="bg-[#0B1727] p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 min-h-[120px] flex flex-col justify-between group cursor-pointer">
                        <h3 class="text-cyan-400 font-bold text-lg leading-snug group-hover:text-cyan-300 transition">
                            Solar PV Fundamentals
                        </h3>
                        <span class="text-slate-400 text-xs font-mono mt-4">...</span>
                    </div>
                </div>
            </div>

            <!-- Recent Transactions Table Section -->
            <div>
                <h2 class="text-lg font-bold text-[#0B1727] mb-4">
                    Recent Transactions
                </h2>

                <div class="w-full bg-white rounded-2xl shadow-xs border border-slate-100 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-100/70 text-slate-700 text-xs font-extrabold uppercase tracking-wider">
                                    <th class="px-6 py-4">Date</th>
                                    <th class="px-6 py-4">Description</th>
                                    <th class="px-6 py-4">Amount</th>
                                    <th class="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-sm font-semibold text-slate-800">
                                <!-- Row 1 -->
                                <tr class="hover:bg-slate-50/80 transition">
                                    <td class="px-6 py-4 whitespace-nowrap text-slate-900 font-medium">02/10/2026</td>
                                    <td class="px-6 py-4 font-bold text-slate-900">ESP32 for IoT</td>
                                    <td class="px-6 py-4 font-bold text-slate-900">Rp149.000</td>
                                    <td class="px-6 py-4">
                                        <span class="text-emerald-500 font-extrabold">Paid</span>
                                    </td>
                                </tr>
                                <!-- Row 2 -->
                                <tr class="hover:bg-slate-50/80 transition">
                                    <td class="px-6 py-4 whitespace-nowrap text-slate-900 font-medium">02/10/2026</td>
                                    <td class="px-6 py-4 font-bold text-slate-900">ESP32 for IoT</td>
                                    <td class="px-6 py-4 font-bold text-slate-900">Rp149.000</td>
                                    <td class="px-6 py-4">
                                        <span class="text-emerald-500 font-extrabold">Paid</span>
                                    </td>
                                </tr>
                                <!-- Row 3 -->
                                <tr class="hover:bg-slate-50/80 transition">
                                    <td class="px-6 py-4 whitespace-nowrap text-slate-900 font-medium">02/10/2026</td>
                                    <td class="px-6 py-4 font-bold text-slate-900">ESP32 for IoT</td>
                                    <td class="px-6 py-4 font-bold text-slate-900">Rp149.000</td>
                                    <td class="px-6 py-4">
                                        <span class="text-amber-500 font-extrabold">Pending</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </main>

</body>
</html>
