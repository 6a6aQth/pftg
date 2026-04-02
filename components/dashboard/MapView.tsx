'use client';

import dynamic from 'next/dynamic';
import type { ActiveLayers } from './Sidebar';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false, loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#07102A' }}>
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 text-xs font-mono">Loading satellite imagery…</p>
      </div>
    </div>
  )
});

interface Props {
  onSelectPlot: (name: string) => void;
  activeLayers: ActiveLayers;
  selectedPlotId: string;
}

export function MapView({ onSelectPlot, activeLayers, selectedPlotId }: Props) {
  return (
    <div className="flex-1 relative overflow-hidden">
      <LeafletMap onSelectPlot={onSelectPlot} activeLayers={activeLayers} selectedPlotId={selectedPlotId} />

      {/* NDVI Legend overlay */}
      <div className="absolute bottom-8 left-4 z-[1000] px-3 py-2.5 rounded-lg text-xs"
        style={{ background: 'rgba(7,16,42,0.88)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="text-[10px] font-mono text-slate-500 mb-2 tracking-wider">NDVI INDEX</div>
        <div className="flex items-center gap-1 mb-1">
          <div className="w-24 h-2.5 rounded-sm" style={{ background: 'linear-gradient(to right, #EF4444, #F59E0B, #84CC16, #10B981)' }} />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-slate-500 w-24">
          <span>0.0</span><span>0.5</span><span>1.0</span>
        </div>
      </div>

      {/* Mini weather widget */}
      <div className="absolute top-4 right-4 z-[1000] px-3 py-3 rounded-lg min-w-[160px]"
        style={{ background: 'rgba(7,16,42,0.88)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="text-[10px] font-mono text-slate-500 mb-2 tracking-wider">LIVE WEATHER</div>
        <div className="space-y-1.5 text-xs">
          {[
            { label: 'Temp', val: '28°C', color: '#F97316' },
            { label: 'Rainfall', val: '12mm', color: '#3B82F6' },
            { label: 'Humidity', val: '65%', color: '#06B6D4' },
            { label: 'Wind', val: '14 km/h', color: '#94A3B8' },
          ].map(r => (
            <div key={r.label} className="flex justify-between items-center">
              <span className="text-slate-500">{r.label}</span>
              <span className="font-mono font-semibold" style={{ color: r.color }}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-8 right-4 z-[1000] flex flex-col rounded-lg overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
        {['+', '−'].map(c => (
          <button key={c}
            className="w-8 h-8 text-slate-300 text-lg font-light flex items-center justify-center hover:bg-white/10 transition-colors font-mono"
            style={{ background: 'rgba(7,16,42,0.9)' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Scale bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] flex items-end gap-1">
        <div className="h-2 border-l border-b border-r border-slate-500" style={{ width: 80 }} />
        <span className="text-[10px] font-mono text-slate-500 mb-0.5">500 m</span>
      </div>
    </div>
  );
}
