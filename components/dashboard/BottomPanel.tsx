'use client';

import { MapPin, Satellite, AlertTriangle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Plot } from '@/lib/plotData';

interface Props { selectedPlot: Plot | null }

export function BottomPanel({ selectedPlot }: Props) {
  return (
    <footer className="flex items-center justify-between px-4 h-8 flex-shrink-0 text-[10px] font-mono bg-card border-t border-border text-muted-foreground">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 px-1">
          <MapPin className="w-3 h-3 text-emerald-500" />
          <span className="text-foreground/80">{selectedPlot?.coordinates ?? '-13.655°S, 34.484°E'}</span>
        </div>
        <div className="w-[1px] h-3 bg-border" />
        <div className="flex items-center gap-1.5 px-1">
          <Satellite className="w-3 h-3 text-blue-500" />
          <span>ESA Sentinel-2 · Next pass: 14:32 UTC</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 px-1">
          <AlertTriangle className="w-3 h-3 text-red-500" />
          <span className="text-red-500 font-bold">1 Alert Active</span>
          <span className="text-muted-foreground/30 mx-1">·</span>
          <span>3 Zones Monitored</span>
        </div>
        <div className="w-[1px] h-3 bg-border" />
        <div className="flex items-center gap-1.5 px-1">
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-emerald-500 font-bold">LIVE · Updated 2 min ago</span>
        </div>
        <div className="w-[1px] h-3 bg-border" />
        <div className="flex items-center gap-1.5 px-1">
          <Activity className="w-3 h-3" />
          <span>DIMBA v2.1.0</span>
        </div>
      </div>
    </footer>
  );
}
