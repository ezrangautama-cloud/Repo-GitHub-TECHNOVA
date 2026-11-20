import React from 'react';

export default function HardwareIllustration() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-md w-full border border-slate-700/50">
            <div className="relative bg-gradient-to-br from-slate-100 via-[#E8EFF5] to-slate-200 p-5 min-h-[220px]">
                {/* Circuit Grid pattern */}
                <div className="w-full bg-[#FAFAFA] rounded-xl border border-slate-300 shadow-md p-4 relative overflow-hidden">
                    {/* Power rails */}
                    <div className="absolute inset-x-3 top-2 h-0.5 bg-red-400 opacity-60"></div>
                    <div className="absolute inset-x-3 top-3.5 h-0.5 bg-blue-400 opacity-60"></div>

                    {/* Components Grid */}
                    <div className="grid grid-cols-4 gap-2 items-center py-2 relative z-10">
                        {/* LEDs & Resistors */}
                        <div className="space-y-1">
                            <div className="flex gap-1 justify-center">
                                <span className="w-2 h-2.5 rounded-t-full bg-red-500 shadow-xs"></span>
                                <span className="w-2 h-2.5 rounded-t-full bg-emerald-400 shadow-xs"></span>
                                <span className="w-2 h-2.5 rounded-t-full bg-blue-400 shadow-xs"></span>
                            </div>
                            <span className="text-[7px] text-slate-500 font-mono block text-center">R: 220Ω</span>
                        </div>

                        {/* Analog Joystick Module */}
                        <div className="bg-[#1E293B] p-1.5 rounded-lg text-center border border-slate-600 shadow-xs">
                            <div className="w-4 h-4 mx-auto rounded-full bg-slate-900 border-2 border-slate-500 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                            </div>
                            <span className="text-[7px] text-cyan-300 font-bold block mt-0.5">JOYSTICK</span>
                        </div>

                        {/* OLED 0.96 Display */}
                        <div className="bg-black text-[#00F0FF] p-1.5 rounded-md text-center border border-slate-700 shadow-xs col-span-2">
                            <div className="bg-[#05111D] px-1 py-0.5 rounded border border-cyan-900/60 text-left font-mono">
                                <span className="text-[7px] text-cyan-400 block font-bold">TECHNOVA IoT</span>
                                <span className="text-[6px] text-slate-400 block">SENS: OK | NET: 2.4G</span>
                            </div>
                        </div>
                    </div>

                    {/* Lower components row */}
                    <div className="grid grid-cols-3 gap-2 mt-2 items-center">
                        {/* HC-SR04 Ultrasonic */}
                        <div className="bg-[#1976D2] text-white p-1.5 rounded-md text-center border border-blue-400">
                            <div className="flex justify-center gap-1 my-0.5">
                                <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-400"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-400"></div>
                            </div>
                            <span className="text-[7px] font-bold block uppercase">HC-SR04</span>
                        </div>

                        {/* ESP32 Controller */}
                        <div className="bg-[#0F172A] text-cyan-400 p-1.5 rounded-md text-center border border-slate-700">
                            <span className="text-[8px] font-black block tracking-wider">ESP-WROOM-32</span>
                            <div className="flex justify-center gap-1 mt-0.5">
                                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping"></span>
                                <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                            </div>
                        </div>

                        {/* Battery Pack / Power */}
                        <div className="bg-slate-800 text-white p-1.5 rounded-md text-center border border-slate-700">
                            <div className="flex justify-center gap-0.5">
                                <span className="w-2 h-4 bg-blue-500 rounded-2xs"></span>
                                <span className="w-2 h-4 bg-blue-500 rounded-2xs"></span>
                            </div>
                            <span className="text-[6px] text-slate-300 font-mono block mt-0.5">3.7V Li-Ion</span>
                        </div>
                    </div>

                    {/* Colorful Jumper wires */}
                    <div className="flex justify-around pt-2">
                        <span className="h-0.5 w-8 bg-amber-400 rounded-full"></span>
                        <span className="h-0.5 w-10 bg-emerald-500 rounded-full"></span>
                        <span className="h-0.5 w-6 bg-cyan-400 rounded-full"></span>
                        <span className="h-0.5 w-8 bg-purple-400 rounded-full"></span>
                    </div>
                </div>

                {/* Badge top right */}
                <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-[#00F0FF] text-[8px] font-bold px-2 py-0.5 rounded-md border border-slate-700">
                    Sistem Fisik & Sensor
                </div>
            </div>
        </div>
    );
}
