'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Database, Cpu, Activity, Zap, ShieldCheck } from 'lucide-react';

const LOG_MESSAGES = [
    "INITIALIZING TWIN_ENGINE_V2...",
    "LINKING IOT_GATEWAY_SALIMA_01...",
    "PULLING SOIL_MOISTURE_ARRAY...",
    "SYNCING SATELLITE_VEGETATION_INDEX...",
    "CALIBRATING PREDICTIVE_MODEL_ALPHA...",
    "ESTABLISHING REAL_TIME_STREAM...",
    "DATA_INTEGRITY_CHECK: 100%",
    "NPK_LEVELS: STABLE",
    "HYDRATION_DELTA: -0.02%",
    "THERMAL_FLUX: NORMAL",
];

export function SimulationMetrics() {
    const [logs, setLogs] = useState<string[]>([]);
    const [metrics, setMetrics] = useState({
        moisture: 42.8,
        temp: 24.5,
        nutrient: 88,
        integrity: 99.9
    });

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setLogs(prev => [...prev, LOG_MESSAGES[i % LOG_MESSAGES.length]].slice(-6));
            i++;

            // Simulate slight metric fluctuations
            setMetrics(prev => ({
                moisture: +(prev.moisture + (Math.random() - 0.5) * 0.1).toFixed(1),
                temp: +(prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1),
                nutrient: prev.nutrient,
                integrity: +(prev.integrity + (Math.random() - 0.5) * 0.01).toFixed(2)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-4 w-72 h-full pointer-events-auto">
            {/* Engine Status Header */}
            <div className="p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-mono font-bold text-white tracking-widest">TWIN_ENGINE</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                        <span className="text-[10px] text-blue-500 font-mono">STABLE</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[11px] text-white/60">
                            <Activity className="w-3 h-3" />
                            <span>Moisture Level</span>
                        </div>
                        <span className="text-xs font-mono text-blue-400">{metrics.moisture}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-500"
                            animate={{ width: `${metrics.moisture}%` }}
                            transition={{ duration: 1 }}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[11px] text-white/60">
                            <Zap className="w-3 h-3" />
                            <span>Engine Load</span>
                        </div>
                        <span className="text-xs font-mono text-emerald-400">12%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-emerald-500"
                            initial={{ width: '0%' }}
                            animate={{ width: '12%' }}
                        />
                    </div>
                </div>
            </div>

            {/* Terminal Log */}
            <div className="flex-1 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Terminal className="w-3 h-3 text-white/40" />
                    <span className="text-[10px] font-mono text-white/40 uppercase">System Stream</span>
                </div>
                <div className="flex-1 font-mono text-[10px] space-y-1.5 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                        {logs.map((log, idx) => (
                            <motion.div
                                key={`${log}-${idx}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-start gap-2"
                            >
                                <span className="text-blue-500/50">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                                <span className={log.includes('INTEGRITY') ? 'text-emerald-500' : 'text-white/80'}>{log}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Security/Integrity */}
            <div className="p-3 bg-white/5 border border-white/5 rounded-lg flex items-center gap-3">
                <div className="p-2 rounded bg-black/40">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                    <div className="text-[10px] text-white/40 uppercase tracking-tighter">Chain Integrity</div>
                    <div className="text-xs font-mono text-white">{metrics.integrity}% Valid</div>
                </div>
            </div>
        </div>
    );
}
