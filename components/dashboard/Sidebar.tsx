'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Satellite, CloudRain, Droplets, Thermometer, AlertTriangle,
  Leaf, Ruler, PenLine, FileDown, LogOut, ChevronRight, Database,
} from 'lucide-react';

export interface ActiveLayers {
  ndvi: boolean; rainfall: boolean; soilMoisture: boolean;
  temperature: boolean; alerts: boolean; cropHealth: boolean;
}

interface Props {
  activeLayers: ActiveLayers;
  setActiveLayers: (l: ActiveLayers) => void;
}

const LAYER_DEFS = [
  { key: 'ndvi', icon: Satellite, label: 'NDVI Vegetation Index', color: '#10B981', badge: 'LIVE' },
  { key: 'rainfall', icon: CloudRain, label: 'Rainfall Intensity', color: '#3B82F6', badge: '45mm' },
  { key: 'soilMoisture', icon: Droplets, label: 'Soil Moisture', color: '#06B6D4', badge: null },
  { key: 'temperature', icon: Thermometer, label: 'Temperature Zones', color: '#F97316', badge: null },
  { key: 'alerts', icon: AlertTriangle, label: 'Alert Zones', color: '#EF4444', badge: '1' },
  { key: 'cropHealth', icon: Leaf, label: 'Crop Health Overlay', color: '#84CC16', badge: null },
] as const;

const DATA_SOURCES = [
  { label: 'ESA Sentinel-2', sub: 'Last pass: 06:14 UTC', dot: '#10B981' },
  { label: 'OpenWeather API', sub: 'Updated 5 min ago', dot: '#3B82F6' },
  { label: 'SoilGrids (ISRIC)', sub: 'Static calibration', dot: '#F59E0B' },
];

const TOOLS = [
  { icon: Ruler, label: 'Measure Distance' },
  { icon: PenLine, label: 'Draw Zone' },
  { icon: FileDown, label: 'Export Report' },
];

function Toggle({ on, onToggle, color }: { on: boolean; onToggle: () => void; color: string }) {
  return (
    <button onClick={onToggle}
      className="relative w-8 h-4 rounded-full flex-shrink-0 transition-all duration-300"
      style={{ background: on ? color + '60' : 'rgba(255,255,255,0.08)', border: `1px solid ${on ? color : 'rgba(255,255,255,0.1)'}` }}>
      <motion.div animate={{ x: on ? 14 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-3 h-3 rounded-full"
        style={{ background: on ? color : '#475569' }} />
    </button>
  );
}

export function Sidebar({ activeLayers, setActiveLayers }: Props) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const toggle = (key: keyof ActiveLayers) =>
    setActiveLayers({ ...activeLayers, [key]: !activeLayers[key] });

  return (
    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      className="flex flex-col flex-shrink-0 h-full overflow-y-auto"
      style={{ width: 248, background: '#07102A', borderRight: '1px solid rgba(255,255,255,0.07)' }}>

      {/* Map Layers Section */}
      <div className="px-3 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Map Layers</span>
          <Database className="w-3 h-3 text-slate-600" />
        </div>
        <div className="space-y-0.5">
          {LAYER_DEFS.map(({ key, icon: Icon, label, color, badge }) => {
            const on = activeLayers[key];
            return (
              <div key={key}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-colors"
                style={{ background: on ? 'rgba(255,255,255,0.04)' : 'transparent' }}
                onClick={() => toggle(key)}>
                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: on ? color : '#475569' }} />
                <span className="flex-1 text-xs font-medium" style={{ color: on ? '#CBD5E1' : '#475569' }}>{label}</span>
                {badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded leading-none"
                    style={{ background: color + '25', color, border: `1px solid ${color}50` }}>
                    {badge}
                  </span>
                )}
                <Toggle on={on} onToggle={() => toggle(key)} color={color} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-3 my-2" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      {/* Data Sources */}
      <div className="px-3 py-2">
        <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Data Sources</span>
        <div className="mt-2 space-y-1">
          {DATA_SOURCES.map(s => (
            <div key={s.label} className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-colors">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-300 leading-tight">{s.label}</div>
                <div className="text-[10px] text-slate-600 leading-tight">{s.sub}</div>
              </div>
              <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-3 my-2" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      {/* Tools */}
      <div className="px-3 py-2">
        <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Tools</span>
        <div className="mt-2 space-y-0.5">
          {TOOLS.map(({ icon: Icon, label }) => (
            <button key={label}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:bg-white/[0.04] transition-colors text-left">
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom: version + logout */}
      <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="text-[10px] font-mono text-slate-600 mb-3 space-y-0.5">
          <div>AgriVerse v2.1.0 · Malawi</div>
          <div>Last Calibration: Apr 1, 2026</div>
        </div>
        <button onClick={() => router.push('/login')}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </motion.div>
  );
}
