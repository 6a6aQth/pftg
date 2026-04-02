'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Camera, ArrowLeft, Info, CheckCircle2,
    RefreshCcw, FileText, Upload, Shield,
    Zap, Microscope, Droplets, Thermometer,
    Maximize, HelpCircle, Database, LayoutGrid,
    Crosshair, Target, Scan, Activity, Eye,
    Lock, Globe, Cpu, Radio
} from 'lucide-react';
import Link from 'next/link';

// MISSION PROTOCOLS - Integrated as a checklist
const PROTOCOLS = [
    { id: 'ALPHA', text: "Drill sample to 20cm depth", icon: <Target className="w-4 h-4 text-emerald-400" /> },
    { id: 'BETA', text: "Natural solar illumination", icon: <Globe className="w-4 h-4 text-blue-400" /> },
    { id: 'GAMMA', text: "Filter debris and organic matter", icon: <Lock className="w-4 h-4 text-amber-400" /> },
    { id: 'DELTA', text: "High-contrast neutral canvas", icon: <Maximize className="w-4 h-4 text-purple-400" /> },
];

export default function SoilScanPage() {
    const [step, setStep] = useState<'camera' | 'scanning' | 'result'>('camera');
    const [scanProgress, setScanProgress] = useState(0);
    const [showProtocols, setShowProtocols] = useState(false);
    const [refId, setRefId] = useState<string>('');

    // New high-fidelity soil image artifact
    const SOIL_IMAGE = "file:///home/baron/.gemini/antigravity/brain/13a29c7c-5314-4e85-8d46-0d38868cd326/precision_soil_sample_hd_1775134669538.png";

    useEffect(() => {
        // Generate random reference ID on mount (client-side only to prevent hydration mismatch)
        setRefId(Math.floor(Math.random() * 9000 + 1000).toString());
    }, []);

    useEffect(() => {
        if (step === 'scanning') {
            const interval = setInterval(() => {
                setScanProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setStep('result'), 1000);
                        return 100;
                    }
                    return prev + 1.8;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [step]);

    return (
        <div className="flex flex-col h-screen overflow-hidden text-foreground font-sans bg-background transition-colors duration-500">
            {/* Immersive HUD Header */}
            <header className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-black/40 backdrop-blur-2xl z-50">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
                        <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-white" />
                    </Link>
                    <div className="space-y-0.5">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-black text-emerald-500 font-mono tracking-[0.3em] uppercase">Tactical Feed</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Salima Farm Hub</span>
                        </div>
                        <h1 className="text-lg font-black text-white tracking-widest uppercase italic leading-none">Soil AI Intelligence</h1>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-8 px-8 border-r border-white/10">
                        <div className="space-y-1">
                            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Neural Load</p>
                            <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-emerald-500/50" />
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Latency</p>
                            <p className="text-[11px] font-bold text-blue-400 font-mono italic tracking-tighter">18.4ms</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        <Cpu className="w-4 h-4 text-emerald-400 animate-[spin_4s_linear_infinite]" />
                        <span className="text-xs text-white font-black font-mono tracking-widest uppercase">Agent Online</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 relative overflow-hidden flex bg-black">
                {/* VIEW AREA */}
                <div className="flex-1 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {step === 'camera' && (
                            <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                                {/* Visual Placeholder (Generated Image) */}
                                <div className="absolute inset-0 scale-105">
                                    <img src={SOIL_IMAGE} alt="Live Soil Feed" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-[#07102A]/10 contrast-125 saturate-[1.2]" />
                                </div>

                                {/* HUD Viewfinder Elements */}
                                <div className="absolute inset-0 pointer-events-none p-10 md:p-20">
                                    {/* Alignment Grid Line */}
                                    <div className="absolute inset-0 border border-white/5">
                                        <div className="absolute top-[45%] left-0 right-0 h-[1px] bg-white/10" />
                                        <div className="absolute left-[45%] top-0 bottom-0 w-[1px] bg-white/10" />
                                    </div>

                                    {/* Corner Angles */}
                                    <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-xl" />
                                    <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-emerald-500/40 rounded-tr-xl" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-emerald-500/40 rounded-bl-xl" />
                                    <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-emerald-500/40 rounded-br-xl" />

                                    {/* Central Intelligent Reticle */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 5, repeat: Infinity }}
                                            className="w-80 h-80 rounded-full border border-emerald-400/10 flex items-center justify-center" />
                                        <div className="absolute w-40 h-40 border border-white/10 rounded-full backdrop-blur-[2px]" />
                                        <div className="absolute w-[1px] h-64 bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent" />
                                        <div className="absolute h-[1px] w-64 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                                        <Target className="absolute w-10 h-10 text-emerald-400/80 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    </div>

                                    {/* Data Waterfalls */}
                                    <div className="absolute top-12 left-12 space-y-2 font-mono text-[10px] text-emerald-500/60 uppercase tracking-widest">
                                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-px" /> SCAN_LOCK: READY</div>
                                        <div className="flex items-center gap-2 font-black text-emerald-400"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-px animate-pulse" /> SENSOR_FUSION: ON</div>
                                        <p className="mt-4 text-slate-500 tracking-tighter font-black">REF: S-MAL-{refId || '....'}</p>
                                    </div>
                                    <div className="absolute bottom-12 right-12 text-right space-y-1 font-mono text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">
                                        <p>SATELLITE_LINK: SENTINEL-2B</p>
                                        <p>COORDINATES: -13.654, 34.484</p>
                                        <p className="text-blue-400 italic">AUTO_EXPOSURE: ACTIVE</p>
                                    </div>
                                </div>

                                {/* Shutter UI */}
                                <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center pointer-events-auto">
                                    <div className="flex items-center gap-16 px-12 py-6 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                        <button onClick={() => setShowProtocols(!showProtocols)} className="p-4 rounded-full border border-white/10 hover:bg-white/10 transition-all text-white group">
                                            <LayoutGrid className="w-7 h-7 opacity-60 group-hover:opacity-100" />
                                        </button>

                                        <div className="relative group/btn">
                                            <button onClick={() => setStep('scanning')} className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_80px_rgba(255,255,255,0.2)]">
                                                <div className="w-20 h-20 rounded-full border-2 border-slate-900" />
                                                <Scan className="absolute w-8 h-8 text-slate-900" />
                                            </button>
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black text-white bg-emerald-600 px-3 py-1 rounded tracking-widest uppercase italic animate-bounce">Initiate Analysis</div>
                                        </div>

                                        <button className="p-4 rounded-full border border-white/10 hover:bg-white/10 transition-all text-white opacity-40">
                                            <Radio className="w-7 h-7" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 'scanning' && (
                            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center space-y-16 bg-[#050A18]">
                                {/* Blurred backdrop of soil */}
                                <div className="absolute inset-0 blur-3xl opacity-30">
                                    <img src={SOIL_IMAGE} alt="Scanning" className="w-full h-full object-cover" />
                                </div>

                                <div className="relative w-96 h-96 z-10 flex items-center justify-center">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                                        className="absolute inset-0 border-2 border-emerald-500/20 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.1)]" />
                                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                                        className="absolute inset-8 border-[1px] border-dashed border-blue-500/20 rounded-full" />

                                    <div className="text-center">
                                        <motion.div key={Math.floor(scanProgress)} initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                            className="text-8xl font-black text-white font-mono tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                            {Math.floor(scanProgress)}%
                                        </motion.div>
                                        <p className="text-[12px] font-black text-emerald-500 tracking-[0.8em] mt-4 uppercase animate-pulse">Neural Mapping</p>
                                    </div>

                                    {/* Cyber Scan Bar */}
                                    <motion.div animate={{ y: [-150, 150, -150] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                        className="absolute left-16 right-16 h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee,0_0_40px_rgba(34,211,238,0.5)] z-20" />
                                </div>

                                <div className="flex items-center gap-12 font-mono text-[10px] text-slate-500 uppercase tracking-widest z-10 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/5">
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Spectrum Array</div>
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Horizon Calc</div>
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Texture Lab</div>
                                </div>
                            </motion.div>
                        )}

                        {step === 'result' && (
                            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-[#050A18] overflow-y-auto p-12 lg:p-20">
                                <div className="max-w-4xl mx-auto space-y-12 pb-20">
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[12px] font-black text-emerald-500 font-mono tracking-[0.4em] uppercase">Scan Resolved</span>
                                                <div className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-[10px] text-blue-400 font-mono tracking-tighter">ID: S-MAL-{refId}</div>
                                            </div>
                                            <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">Substrate: Sandy Loam</h2>
                                            <p className="text-slate-400 font-medium">Salima Farm Site (Plot B) • Precision Alpha-Scan</p>
                                        </div>
                                        <div className="w-24 h-24 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                                            <CheckCircle2 className="w-12 h-12 text-slate-900" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {[
                                            { label: 'Soil pH', val: '6.4', sub: 'Balanced', icon: Zap, color: '#FCD34D' },
                                            { label: 'Moisture', val: '42%', sub: 'Healthy', icon: Droplets, color: '#3B82F6' },
                                            { label: 'Density', val: '1.45', sub: 'Low Comp.', icon: Maximize, color: '#A855F7' },
                                            { label: 'Carbon', val: '2.8%', sub: 'Premium', icon: Target, color: '#10B981' },
                                        ].map(m => (
                                            <div key={m.label} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all group overflow-hidden relative">
                                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><m.icon className="w-16 h-16" /></div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <m.icon className="w-4 h-4 opacity-50" style={{ color: m.color }} />
                                                    <span className="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest">{m.label}</span>
                                                </div>
                                                <div className="text-4xl font-black text-white mb-1 leading-none">{m.val}</div>
                                                <p className="text-xs font-bold uppercase tracking-tighter" style={{ color: m.color }}>{m.sub}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 space-y-6">
                                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">AI Tactical Recommendations</h3>
                                            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black font-mono tracking-widest border border-emerald-400/20 px-3 py-1 rounded-full uppercase">98.2% Confidence</div>
                                        </div>
                                        <p className="text-xl leading-relaxed text-slate-200 font-medium italic">
                                            "The horizon profiling confirms high granularity. Your Chitedze profile is ideal for immediate 23:21:0 NPK application. Leaching risk is negligible."
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                                        <button onClick={() => setStep('camera')} className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm uppercase italic tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                            <RefreshCcw className="w-5 h-5" />
                                            Recalibrate
                                        </button>
                                        <Link href="/dashboard" className="flex-1 w-full px-12 py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black text-sm uppercase italic tracking-[0.2em] hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-4">
                                            <Zap className="w-5 h-5 fill-white" />
                                            Finalize Sync with Map
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* HUD RIGHT PANEL: SYSTEM CHECKLIST & ANALOG IMPORT */}
                <div className="hidden xl:flex w-[420px] bg-[#070D1D] border-l border-white/5 flex-col overflow-y-auto">
                    <div className="p-10 space-y-12">
                        <div className="space-y-2">
                            <h2 className="text-[11px] font-black text-white tracking-[0.4em] uppercase italic">Scan Protocols</h2>
                            <p className="text-[12px] text-slate-500 font-medium leading-relaxed italic">Verification required for neural lock engagement.</p>
                        </div>

                        <div className="space-y-6">
                            {PROTOCOLS.map((p) => (
                                <div key={p.id} className="flex items-start gap-5 group cursor-default">
                                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/20 transition-all">
                                        {p.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-emerald-500 font-mono tracking-widest uppercase italic">Logic Node: {p.id}</div>
                                        <p className="text-[13px] font-bold text-slate-300 group-hover:text-white transition-colors">{p.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-white/5 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-black text-blue-400 tracking-[0.3em] uppercase italic">Analog Import</h3>
                                <span className="text-[9px] font-mono text-slate-600 uppercase">Legacy Support</span>
                            </div>
                            <div className="p-10 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                                    <FileText className="w-8 h-8 text-slate-500 group-hover:text-blue-400" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-black text-white uppercase tracking-widest italic">Link Lab PDF</p>
                                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Combine computer vision with precise chemical lab telemetry.</p>
                                </div>
                                <button className="mt-4 px-6 py-2.5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-3">
                                    <Upload className="w-4 h-4" />
                                    Select File
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto p-10 border-t border-white/5 bg-black/40">
                        <div className="flex items-center gap-4 text-slate-600 font-mono text-[10px] uppercase tracking-widest italic">
                            <Shield className="w-5 h-5 flex-shrink-0" />
                            <span>GS1 Intelligence Standards • v4.2.0</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* MOBILE PROTOCOL OVERLAY */}
            <AnimatePresence>
                {showProtocols && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowProtocols(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md z-[60] xl:hidden" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            className="absolute top-0 right-0 bottom-0 w-80 bg-[#070C1D] z-[70] p-10 xl:hidden border-l border-white/10"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-xs font-black text-white tracking-[0.2em] uppercase italic">Protocols</h2>
                                <button onClick={() => setShowProtocols(false)} className="p-2 border border-white/10 rounded-full hover:bg-white/10"><RefreshCcw className="w-4 h-4" /></button>
                            </div>
                            <div className="space-y-8">
                                {PROTOCOLS.map(p => (
                                    <div key={p.id} className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">{p.icon}</div>
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-mono text-emerald-500 tracking-widest uppercase">{p.id}</div>
                                            <p className="text-xs font-bold text-slate-300 italic">{p.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
