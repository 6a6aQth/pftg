'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/dashboard/Header';
import DigitalTwinScene from '@/components/dashboard/DigitalTwinScene';
import { SimulationMetrics } from '@/components/dashboard/SimulationMetrics';
import { PredictionModule } from '@/components/dashboard/PredictionModule';
import { LayoutGrid, Maximize2, Share2, Settings, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DigitalTwinPage() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-black text-white">
            <Header />

            <main className="flex-1 relative flex overflow-hidden p-4 gap-4">
                {/* Back Button Overlay */}
                <div className="absolute top-8 left-8 z-50 pointer-events-auto">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group"
                    >
                        <ArrowLeft className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                        <span className="text-[10px] font-mono text-white/40 group-hover:text-white uppercase tracking-widest">Back to Dashboard</span>
                    </Link>
                </div>
                {/* Left HUD: Simulation Metrics */}
                <div className="z-10 h-full">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full"
                    >
                        <SimulationMetrics />
                    </motion.div>
                </div>

                {/* Center: 3D Scene */}
                <div className="flex-1 relative rounded-xl overflow-hidden border border-white/5 bg-zinc-950/50">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        <DigitalTwinScene />
                    </motion.div>

                    {/* 3D Scene Controls Overlay */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                        {[LayoutGrid, Maximize2, Share2, Settings].map((Icon, i) => (
                            <button
                                key={i}
                                className="p-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                            >
                                <Icon className="w-4 h-4" />
                            </button>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-6 z-20">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                            <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">G-Sensor Active</span>
                        </div>
                        <div className="w-[1px] h-3 bg-white/10" />
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-white/40 uppercase">Resolution</span>
                            <span className="text-[10px] font-mono text-white/80">0.5m/PX</span>
                        </div>
                    </div>
                </div>

                {/* Right HUD: Predictions */}
                <div className="z-10 h-full">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="h-full"
                    >
                        <PredictionModule />
                    </motion.div>
                </div>
            </main>

            {/* Decorative background glows */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
            </div>
        </div>
    );
}
