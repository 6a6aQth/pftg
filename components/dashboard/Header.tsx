'use client';

import { motion } from 'framer-motion';
import { Bell, ChevronDown, Satellite, Clock, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function Header() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const n = new Date();
      setTime(n.toTimeString().slice(0, 8));
      setDate(n.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex items-center justify-between px-4 h-12 border-b flex-shrink-0 bg-card/95 backdrop-blur-md border-border sticky top-0 z-[1001]">
      {/* Left: Logo + status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/Dimba White Logo bg removed.png" alt="DIMBA" className="w-full h-full object-contain" />
          </div>
          <span className="font-bold text-sm tracking-wide text-foreground uppercase tracking-wider">DIMBA</span>
          <span className="text-muted-foreground/30 text-xs font-mono">|</span>
          <span className="text-muted-foreground text-xs font-mono">Salima Farm Site</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-emerald-500 font-mono tracking-wider">SYSTEMS OPERATIONAL</span>
        </div>
      </div>

      {/* Center: Farm selector */}
      <div className="hidden md:flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors bg-secondary/50 border border-border text-foreground hover:bg-secondary">
          <span>Salima Farm</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-500">
          <Satellite className="w-3 h-3" />
          <span>Next pass 14:32 UTC</span>
        </div>
      </div>

      {/* Right: Clock + Theme Toggle + alerts + user */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span className="text-foreground">{time}</span>
          <span>·</span>
          <span>{date}</span>
        </div>

        <div className="w-[1px] h-4 bg-border mx-1 hidden lg:block" />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg transition-all bg-secondary/50 border border-border hover:bg-secondary text-foreground active:scale-95"
          aria-label="Toggle Theme"
        >
          {mounted && resolvedTheme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-blue-500" />
          )}
        </button>

        <button className="relative p-1.5 rounded-lg transition-colors hover:bg-secondary text-muted-foreground hover:text-foreground border border-transparent hover:border-border">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-background" />
        </button>

        <div className="flex items-center gap-2 px-1.5 py-1 rounded-lg cursor-pointer hover:bg-secondary transition-colors group">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-border shadow-sm">
            <img src="/placeholder-user.jpg" alt="Mr. Phiri" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <div className="text-[11px] font-semibold text-foreground leading-none">Mr. Phiri</div>
            <div className="text-[9px] text-muted-foreground uppercase font-mono tracking-tighter">Site Manager</div>
          </div>
          <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </header>
  );
}
