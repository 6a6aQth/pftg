'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, Tooltip as RechartTooltip, XAxis } from 'recharts';
import { AlertTriangle, CheckCircle2, Eye, Radio, FileText, Leaf, Droplets, Zap, Sliders } from 'lucide-react';
import type { Plot } from '@/lib/plotData';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Props { selectedPlot: Plot | null }

const statusConfig = {
  green: { label: 'Healthy', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.35)', text: '#10B981', Icon: CheckCircle2 },
  red: { label: 'Stress Detected', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', text: '#EF4444', Icon: AlertTriangle },
  yellow: { label: 'Good Condition', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', text: '#F59E0B', Icon: Eye },
};

const urgencyConfig = {
  normal: { label: 'RECOMMENDATION', color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' },
  watch: { label: 'MONITOR', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
  urgent: { label: '⚠ URGENT ACTION', color: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)' },
};

export function DataPanel({ selectedPlot }: Props) {
  const [showSMS, setShowSMS] = useState(false);

  useEffect(() => {
    if (showSMS) {
      const t = setTimeout(() => setShowSMS(false), 5000);
      return () => clearTimeout(t);
    }
  }, [showSMS]);

  if (!selectedPlot) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 bg-card border-l border-border"
        style={{ width: 280 }}>
        <Leaf className="w-8 h-8 text-muted-foreground/40 mb-3" />
        <p className="text-muted-foreground text-xs">Click a plot on the map to view details</p>
      </div>
    );
  }

  const s = statusConfig[selectedPlot.statusColor];
  const u = urgencyConfig[selectedPlot.urgency];
  const ndviColor = selectedPlot.ndvi > 0.65 ? '#10B981' : selectedPlot.ndvi > 0.50 ? '#F59E0B' : '#EF4444';
  const SIcon = s.Icon;

  // Mock yield forecast: 4.8t - 6.2t per ha
  const yieldVal = (4.8 + (selectedPlot.ndvi * 1.8)).toFixed(1);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={selectedPlot.id}
        initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col h-full overflow-y-auto flex-shrink-0 relative bg-card border-l border-border"
        style={{ width: 280 }}>

        {/* SMS Simulation Overlay */}
        <AnimatePresence>
          {showSMS && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-4 left-4 right-4 z-[100] bg-white dark:bg-slate-900 rounded-xl p-3 shadow-2xl flex gap-3 border border-slate-200 dark:border-slate-800"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">AV</div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-bold text-slate-900 dark:text-white">DIMBA Agent</p>
                  <span className="text-[8px] text-slate-400 uppercase font-mono">Now</span>
                </div>
                <p className="text-[10px] text-slate-700 dark:text-slate-300 leading-tight">ALERT: {selectedPlot.recommendation}</p>
                <p className="text-[8px] text-slate-400 mt-1 uppercase font-mono">Sent via Twilio Gateway</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="px-4 py-3 border-b sticky top-0 z-10 bg-card border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">Selection</span>
            <div className="flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-500" />
              <span className="text-[10px] text-emerald-500 font-mono">LIVE</span>
            </div>
          </div>
          <h2 className="text-foreground font-bold text-sm leading-tight">Salima Farm · {selectedPlot.name}</h2>
          <p className="text-muted-foreground text-[10px] font-mono mt-0.5">{selectedPlot.coordinates}</p>
        </div>

        <div className="flex-1 px-4 py-4 space-y-4">
          {/* Status badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <SIcon className="w-4 h-4 flex-shrink-0" style={{ color: s.text }} />
            <div>
              <div className="text-xs font-bold leading-none mb-0.5" style={{ color: s.text }}>{selectedPlot.status}</div>
              <div className="text-[10px] text-muted-foreground opacity-80">{selectedPlot.crop} · {selectedPlot.area}</div>
            </div>
          </div>

          {/* NDVI + Health + Yield metrics */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'NDVI', value: selectedPlot.ndvi.toFixed(2), color: ndviColor },
              { label: 'Health', value: `${selectedPlot.health}%`, color: selectedPlot.health > 70 ? '#10B981' : selectedPlot.health > 45 ? '#F59E0B' : '#EF4444' },
              { label: 'Yield Est.', value: `${yieldVal}t/h`, color: '#A855F7' },
            ].map(m => (
              <div key={m.label} className="rounded-xl px-2 text-center py-2 bg-secondary/50 border border-border">
                <div className="text-[9px] text-muted-foreground font-mono leading-tight uppercase">{m.label}</div>
                <div className="text-sm font-bold mt-0.5" style={{ color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Yield Forecast Visual */}
          <div className="rounded-xl px-3 py-3 bg-secondary/40 border border-border">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">Annual Yield Forecast</div>
              <div className="text-[10px] font-bold text-emerald-500">+12.4%</div>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(Number(yieldVal) / 8) * 100}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
              />
            </div>
            <div className="flex justify-between mt-1 text-[9px] font-mono text-muted-foreground uppercase tracking-tighter">
              <span>Min: 3.2t</span>
              <span>Max: 8.0t</span>
            </div>
          </div>

          {/* NDVI Trend Chart */}
          <div className="rounded-xl px-3 py-3 bg-secondary/30 border border-border">
            <div className="text-[10px] font-mono text-muted-foreground mb-2 tracking-wider">7-DAY NDVI TREND</div>
            <ResponsiveContainer width="100%" height={52}>
              <LineChart data={selectedPlot.ndviTrend} margin={{ top: 2, right: 2, bottom: 0, left: 2 }}>
                <XAxis dataKey="day" hide />
                <RechartTooltip
                  contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 10 }}
                  labelStyle={{ color: 'var(--muted-foreground)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  formatter={(v: number) => [v.toFixed(2), 'NDVI']}
                />
                <Line type="monotone" dataKey="ndvi" stroke={ndviColor} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Properties */}
          <div className="space-y-0.5">
            <div className="text-[10px] font-mono text-muted-foreground tracking-widest mb-2 px-1">PROPERTIES</div>
            {[
              { label: 'Growth Stage', value: selectedPlot.growthStage },
              { label: 'Soil Type', value: selectedPlot.soilType },
              { label: 'Soil pH', value: selectedPlot.pH.toFixed(1) },
              { label: 'Last Fertilizer', value: selectedPlot.lastFertilizer },
              { label: 'Satellite', value: selectedPlot.satellite },
              { label: 'Last Scan', value: selectedPlot.lastScan },
            ].map(p => (
              <div key={p.label} className="flex items-start justify-between py-1.5 border-b border-border/50 gap-2 px-1">
                <span className="text-[11px] text-muted-foreground flex-shrink-0">{p.label}</span>
                <span className="text-[11px] text-foreground font-medium text-right leading-tight">{p.value}</span>
              </div>
            ))}
          </div>

          {/* AI Recommendation */}
          <div className="rounded-xl px-3 py-3" style={{ background: u.bg, border: `1px solid ${u.border}` }}>
            <div className="text-[10px] font-bold mb-2 tracking-wider" style={{ color: u.color }}>{u.label}</div>
            <p className="text-[11px] leading-relaxed text-foreground">
              {selectedPlot.recommendation}
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all bg-primary hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/10"
            >
              <Sliders className="w-3.5 h-3.5" />
              Calibrate Plot
            </button>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/dashboard/soil-scan" className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-semibold text-foreground bg-secondary/50 border border-border hover:bg-secondary transition-colors">
                <Droplets className="w-3.5 h-3.5" />
                Soil Scan
              </Link>
              <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-semibold text-foreground bg-secondary/50 border border-border hover:bg-secondary transition-colors">
                <FileText className="w-3.5 h-3.5" />
                Report
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
