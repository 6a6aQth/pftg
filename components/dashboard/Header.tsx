'use client';

import { motion } from 'framer-motion';
import { Bell, ChevronDown, Satellite, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(n.toTimeString().slice(0, 8));
      setDate(n.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-between px-4 h-12 border-b flex-shrink-0"
      style={{ background: '#080F22', borderColor: 'rgba(255,255,255,0.08)' }}>

      {/* Left: Logo + status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#059669,#10B981)' }}>
            <span className="text-xs">🌾</span>
          </div>
          <span className="text-white font-bold text-sm tracking-wide">AgriVerse</span>
          <span className="text-slate-600 text-xs font-mono">|</span>
          <span className="text-slate-400 text-xs font-mono">Chitedze Farm Complex</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
          style={{ borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.05)' }}>
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-emerald-400 font-mono tracking-wider">SYSTEMS OPERATIONAL</span>
        </div>
      </div>

      {/* Center: Farm selector */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#CBD5E1' }}>
          <span>Chitedze Farm</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono"
          style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60A5FA' }}>
          <Satellite className="w-3 h-3" />
          <span>Next pass 14:32 UTC</span>
        </div>
      </div>

      {/* Right: Clock + alerts + user */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
          <Clock className="w-3 h-3" />
          <span className="text-slate-300">{time}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
        <button className="relative p-1.5 rounded-lg transition-colors hover:bg-white/5">
          <Bell className="w-4 h-4 text-slate-400" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 border border-[#080F22]" />
        </button>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#3B82F6,#6366F1)' }}>
            JD
          </div>
          <span className="text-xs text-slate-300 hidden sm:inline">John Doe</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </div>
      </div>
    </div>
  );
}
