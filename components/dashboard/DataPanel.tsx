'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, Tooltip as RechartTooltip, XAxis } from 'recharts';
import { AlertTriangle, CheckCircle2, Eye, Radio, MessageSquare, FileText, Leaf, Droplets } from 'lucide-react';
import type { Plot } from '@/lib/plotData';

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
  if (!selectedPlot) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4"
        style={{ width: 280, background: '#07102A', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
        <Leaf className="w-8 h-8 text-slate-600 mb-3" />
        <p className="text-slate-500 text-xs">Click a plot on the map to view details</p>
      </div>
    );
  }

  const s = statusConfig[selectedPlot.statusColor];
  const u = urgencyConfig[selectedPlot.urgency];
  const ndviColor = selectedPlot.ndvi > 0.65 ? '#10B981' : selectedPlot.ndvi > 0.50 ? '#F59E0B' : '#EF4444';
  const SIcon = s.Icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div key={selectedPlot.id}
        initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col h-full overflow-y-auto flex-shrink-0"
        style={{ width: 280, background: '#07102A', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>

        {/* Header */}
        <div className="px-4 py-3 border-b sticky top-0 z-10"
          style={{ background: '#07102A', borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Selection</span>
            <div className="flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-mono">LIVE</span>
            </div>
          </div>
          <h2 className="text-white font-bold text-sm">Chitedze Farm · {selectedPlot.name}</h2>
          <p className="text-slate-500 text-[11px] font-mono mt-0.5">{selectedPlot.coordinates}</p>
        </div>

        <div className="flex-1 px-4 py-4 space-y-4">
          {/* Status badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <SIcon className="w-4 h-4 flex-shrink-0" style={{ color: s.text }} />
            <div>
              <div className="text-xs font-semibold" style={{ color: s.text }}>{selectedPlot.status}</div>
              <div className="text-[10px] text-slate-500">{selectedPlot.crop} · {selectedPlot.area}</div>
            </div>
          </div>

          {/* NDVI + Health metrics */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'NDVI', value: selectedPlot.ndvi.toFixed(2), color: ndviColor },
              { label: 'Health', value: `${selectedPlot.health}%`, color: selectedPlot.health > 70 ? '#10B981' : selectedPlot.health > 45 ? '#F59E0B' : '#EF4444' },
              { label: 'Humidity', value: `${selectedPlot.humidity}%`, color: '#06B6D4' },
            ].map(m => (
              <div key={m.label} className="rounded-lg px-2.5 py-2.5 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-[10px] text-slate-500 font-mono leading-tight">{m.label}</div>
                <div className="text-base font-bold mt-0.5" style={{ color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* NDVI Trend Chart */}
          <div className="rounded-lg px-3 py-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-[10px] font-mono text-slate-500 mb-2 tracking-wider">7-DAY NDVI TREND</div>
            <ResponsiveContainer width="100%" height={52}>
              <LineChart data={selectedPlot.ndviTrend} margin={{ top: 2, right: 2, bottom: 0, left: 2 }}>
                <XAxis dataKey="day" hide />
                <RechartTooltip
                  contentStyle={{ background: '#0D1629', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, fontSize: 10 }}
                  labelStyle={{ color: '#94A3B8' }}
                  formatter={(v: number) => [v.toFixed(2), 'NDVI']}
                />
                <Line type="monotone" dataKey="ndvi" stroke={ndviColor} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Properties */}
          <div className="space-y-0.5">
            <div className="text-[10px] font-mono text-slate-500 tracking-widest mb-2">PROPERTIES</div>
            {[
              { label: 'Growth Stage', value: selectedPlot.growthStage },
              { label: 'Soil Type', value: selectedPlot.soilType },
              { label: 'Soil pH', value: selectedPlot.pH.toFixed(1) },
              { label: 'Last Fertilizer', value: selectedPlot.lastFertilizer },
              { label: 'Satellite', value: selectedPlot.satellite },
              { label: 'Last Scan', value: selectedPlot.lastScan },
            ].map(p => (
              <div key={p.label} className="flex items-start justify-between py-1.5 border-b gap-2"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-[11px] text-slate-500 flex-shrink-0">{p.label}</span>
                <span className="text-[11px] text-slate-300 text-right leading-tight">{p.value}</span>
              </div>
            ))}
          </div>

          {/* AI Recommendation */}
          <div className="rounded-lg px-3 py-3" style={{ background: u.bg, border: `1px solid ${u.border}` }}>
            <div className="text-[10px] font-mono mb-2 tracking-wider" style={{ color: u.color }}>{u.label}</div>
            <p className="text-[11px] leading-relaxed" style={{ color: selectedPlot.urgency === 'urgent' ? '#FCA5A5' : '#CBD5E1' }}>
              {selectedPlot.recommendation}
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#059669,#10B981)', boxShadow: '0 0 16px rgba(16,185,129,0.2)' }}>
              <MessageSquare className="w-3.5 h-3.5" />
              Send SMS Alert
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs text-slate-300 hover:bg-white/[0.06] transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <FileText className="w-3.5 h-3.5" />
                Full Report
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs text-slate-300 hover:bg-white/[0.06] transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <Droplets className="w-3.5 h-3.5" />
                Soil Scan
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
