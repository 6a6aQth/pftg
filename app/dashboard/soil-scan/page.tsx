'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, CheckCircle2, Upload, Microscope,
    Droplets, Zap, Info, FileText, RefreshCcw,
    ChevronRight, Beaker, PieChart, FlaskConical,
    Activity, ShieldCheck, Database, History,
    LayoutDashboard, Map as MapIcon, Image as ImageIcon,
    FileSearch, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const ANALYZING_STEPS = [
    "Processing high-resolution chromatography...",
    "Estimating Nitrogen (N) levels via spectral analysis...",
    "Calculating Phosphorus (P) & Potassium (K) density...",
    "Calibrating pH and moisture gradients...",
    "Generating AI fertilizer recommendation...",
];

export default function SoilScanPage() {
    const { resolvedTheme } = useTheme();
    const [status, setStatus] = useState<'upload' | 'analyzing' | 'results'>('upload');
    const [progress, setProgress] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const [refId, setRefId] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Simulated data
    const metrics = [
        { label: 'Soil pH', value: '6.4', sub: 'Optimal Range', color: 'text-amber-500', icon: Beaker },
        { label: 'Moisture', value: '42%', sub: 'Healthy (40-60%)', color: 'text-blue-500', icon: Droplets },
        { label: 'Nitrogen (N)', value: 'Medium', sub: 'Apply Urea (25%)', color: 'text-emerald-500', icon: Zap },
        { label: 'Phosphorus (P)', value: 'High', sub: 'No action needed', color: 'text-purple-500', icon: PieChart },
    ];

    useEffect(() => {
        setRefId('DB-' + Math.floor(Math.random() * 90000 + 10000));
    }, []);

    useEffect(() => {
        if (status === 'analyzing') {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setStatus('results'), 500);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 40);

            const stepInterval = setInterval(() => {
                setActiveStep(prev => (prev < ANALYZING_STEPS.length - 1 ? prev + 1 : prev));
            }, 1000);

            return () => {
                clearInterval(interval);
                clearInterval(stepInterval);
            };
        }
    }, [status]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (f) => setUploadImage(f.target?.result as string);
            reader.readAsDataURL(e.target.files[0]);
            setTimeout(() => setStatus('analyzing'), 800);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-500 flex flex-col">
            {/* Professional Top Bar */}
            <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <img src="/Dimba White Logo bg removed.png" alt="DIMBA" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500 leading-none mb-1">Precision Intelligence</span>
                        <h1 className="text-sm font-black tracking-tight uppercase">DIMBA Analysis Hub</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
                        <Database className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">{refId || '----'}</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
                {/* Left Side: Interaction / Result */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-16">
                    <AnimatePresence mode="wait">
                        {status === 'upload' && (
                            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto h-full flex flex-col justify-center">
                                <div className="space-y-4 mb-10">
                                    <h2 className="text-4xl font-black tracking-tighter leading-none">START NEW ANALYSIS</h2>
                                    <p className="text-muted-foreground text-lg font-medium leading-relaxed">Upload a clear photo of your soil sample to receive immediate AI-driven nutrient reports and recommendations.</p>
                                </div>

                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="group relative h-96 rounded-[2rem] border-2 border-dashed border-border bg-card/30 hover:bg-card/50 hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col items-center justify-center p-12 text-center"
                                >
                                    <div className="w-20 h-20 rounded-3xl bg-secondary/80 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all">
                                        <Upload className="w-10 h-10 text-muted-foreground group-hover:text-emerald-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xl font-bold">Click or drag image here</p>
                                        <p className="text-sm text-muted-foreground max-w-xs mx-auto">Supported formats: JPG, PNG, WEBP. Max file size: 10MB.</p>
                                    </div>
                                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                                </div>

                                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-5 rounded-2xl bg-secondary/20 border border-border flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-emerald-500/10"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
                                        <div>
                                            <p className="text-[11px] font-black uppercase text-foreground mb-1">Instant Results</p>
                                            <p className="text-[11px] text-muted-foreground leading-relaxed">Analysis completes in under 10 seconds using local edge AI.</p>
                                        </div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-secondary/20 border border-border flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-blue-500/10"><ShieldCheck className="w-4 h-4 text-blue-500" /></div>
                                        <div>
                                            <p className="text-[11px] font-black uppercase text-foreground mb-1">Enterprise-Grade</p>
                                            <p className="text-[11px] text-muted-foreground leading-relaxed">Data calibrated against ISRIC SoilGrids for 98% accuracy.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {status === 'analyzing' && (
                            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto h-full flex flex-col justify-center items-center">
                                <div className="relative w-48 h-48 mb-12">
                                    {uploadImage ? (
                                        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-border shadow-2xl scale-125">
                                            <img src={uploadImage} alt="Sample" className="w-full h-full object-cover grayscale opacity-50" />
                                            <motion.div
                                                animate={{ y: [-100, 100, -100] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-500/30 to-transparent h-1"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-secondary animate-pulse rounded-full" />
                                    )}
                                    <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] -rotate-90">
                                        <circle
                                            cx="50%" cy="50%" r="48%"
                                            stroke="currentColor" strokeWidth="2" fill="transparent"
                                            className="text-emerald-500/10"
                                        />
                                        <motion.circle
                                            cx="50%" cy="50%" r="48%"
                                            stroke="currentColor" strokeWidth="4" fill="transparent"
                                            strokeDasharray="100 100"
                                            initial={{ strokeDashoffset: 100 }}
                                            animate={{ strokeDashoffset: 100 - progress }}
                                            className="text-emerald-500"
                                        />
                                    </svg>
                                </div>

                                <div className="text-center space-y-4">
                                    <div className="text-6xl font-black tracking-tighter tabular-nums">{Math.floor(progress)}%</div>
                                    <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.4em] animate-pulse">
                                        {ANALYZING_STEPS[activeStep]}
                                    </p>
                                </div>
                                <div className="mt-12 w-full max-w-xs h-1 bg-secondary rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-emerald-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                                </div>
                            </motion.div>
                        )}

                        {status === 'results' && (
                            <motion.div key="results" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto pb-20">
                                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-500 uppercase">Analysis Complete</span>
                                            <span className="text-muted-foreground text-[10px] font-mono tracking-tighter uppercase">ID: {refId}</span>
                                        </div>
                                        <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none">Sandy Loam</h2>
                                        <p className="text-muted-foreground font-medium">Sample analyzed at 14:02 UTC • Substrate Density Verified</p>
                                    </div>
                                    <button
                                        onClick={() => { setStatus('upload'); setProgress(0); setUploadImage(null); }}
                                        className="px-6 py-3 rounded-xl border border-border hover:bg-secondary transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-widest"
                                    >
                                        <RefreshCcw className="w-4 h-4" />
                                        New Scan
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                    {metrics.map(m => (
                                        <div key={m.label} className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                                            <m.icon className="w-8 h-8 absolute -bottom-2 -right-2 opacity-5 scale-150 rotate-12 group-hover:scale-200 transition-transform" />
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <m.icon className="w-3 h-3" /> {m.label}
                                            </p>
                                            <div className="text-3xl font-black mb-1 tabular-nums">{m.value}</div>
                                            <p className={`text-[10px] font-bold uppercase tracking-tighter ${m.color}`}>{m.sub}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 p-10 rounded-[2.5rem] bg-card border border-border shadow-sm space-y-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                                            <Beaker className="w-32 h-32" />
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.25em] flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-emerald-500" /> AI Diagnostic
                                            </h3>
                                            <span className="text-[10px] font-bold text-emerald-500 uppercase bg-emerald-500/10 px-2 py-0.5 rounded">98% Accuracy</span>
                                        </div>
                                        <p className="text-2xl font-bold leading-tight tracking-tight text-foreground/90">
                                            The sample profile is highly consistent with optimal tobacco substrate. Current pH levels are balanced, but Nitrogen (N) is slightly below the target threshold for maximum yield.
                                        </p>
                                        <div className="flex flex-wrap gap-3 pt-4">
                                            <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold border border-orange-500/20">Action: Apply Urea 46% (50kg/ha)</div>
                                            <div className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">Moisture: Optimal for Tilling</div>
                                        </div>
                                    </div>
                                    <div className="p-8 rounded-[2rem] bg-card border border-border shadow-sm flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-widest italic">Sync with Map</h3>
                                            <p className="text-xs text-muted-foreground leading-relaxed">Update the digital twin of Plot B with this latest chemical analysis to refine your global farm metrics.</p>
                                        </div>
                                        <button className="mt-8 w-full py-4 rounded-xl bg-primary text-white font-bold text-sm uppercase tracking-widest hover:scale-[1.02] shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3">
                                            <Zap className="w-4 h-4 fill-white" />
                                            Update Plot
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Panel: Side Stats / Info */}
                <div className="hidden lg:flex w-80 xl:w-96 border-l border-border bg-card/10 flex-col overflow-y-auto">
                    <div className="p-8 space-y-10">
                        <section className="space-y-5">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Analysis History</h3>
                            <div className="space-y-4">
                                {[
                                    { date: '12 Mar', time: '09:12', result: 'Loamy Sand', id: 'AV-41221' },
                                    { date: '01 Mar', time: '14:45', result: 'Sandy Loam', id: 'AV-29188' },
                                ].map((h, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                                            <History className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold group-hover:text-foreground transition-colors">{h.result}</p>
                                            <p className="text-[10px] text-muted-foreground">{h.date} • {h.time}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-5">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">Best Practices</h3>
                            <div className="space-y-4">
                                {[
                                    { title: 'Sample Depth', desc: 'Ensure samples are taken from the top 15-20cm of topsoil.', icon: Microscope },
                                    { title: 'Neutral Background', desc: 'Place soil on a white or neutral gray surface for best spectral results.', icon: ImageIcon },
                                    { title: 'Even Lighting', desc: 'Avoid harsh shadows by using indirect sunlight or a ring light.', icon: Zap },
                                ].map((p, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex-shrink-0 flex items-center justify-center">
                                            <p.icon className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-bold">{p.title}</p>
                                            <p className="text-[11px] text-muted-foreground leading-snug">{p.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                <AlertCircle className="w-4 h-4" /> Calibration Note
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                Current models are calibrated for Southern African soil types (Chitedze, Vertisols). Accuracy may vary in other regions.
                            </p>
                        </section>
                    </div>

                    <div className="mt-auto p-8 border-t border-border bg-card/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                <ShieldCheck className="w-4 h-4" /> SECURE AI
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground">v2.1.0</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
