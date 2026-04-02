'use client';

import { MapPin, Satellite, AlertTriangle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Plot } from '@/lib/plotData';

interface Props { selectedPlot: Plot | null }

export function BottomPanel({ selectedPlot }: Props) {
  return (
    <div className="flex items-center justify-between px-4 h-8 flex-shrink-0 text-[10px] font-mono"
      style={{ background: '#04091A', borderTop: '1px solid rgba(255,255,255,0.07)', color: '#475569' }}>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-emerald-400" />
          <span className="text-slate-400">{selectedPlot?.coordinates ?? '-13.956°S, 33.757°E'}</span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="flex items-center gap-1.5">
          <Satellite className="w-3 h-3 text-blue-400" />
          <span>ESA Sentinel-2 · Next pass: 14:32 UTC</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3 text-red-400" />
          <span className="text-red-400">1 Alert Active</span>
          <span className="text-slate-700">·</span>
          <span>3 Zones Monitored</span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="flex items-center gap-1.5">
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-emerald-400">LIVE · Updated 2 min ago</span>
        </div>
        <span className="text-slate-700">|</span>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3" />
          <span>AgriVerse v2.1.0</span>
        </div>
      </div>
    </div>
  );
}
