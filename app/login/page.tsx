'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Leaf, Shield, Satellite, Wifi, Activity } from 'lucide-react';

const stats = [
  { value: '3,200+', label: 'Farmers' },
  { value: '12,000+', label: 'Acres Monitored' },
  { value: '98.2%', label: 'AI Accuracy' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(
        n.toISOString().slice(11, 19) + ' UTC'
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => router.push('/dashboard'), 1500);
  };

  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center relative bg-background transition-colors duration-500">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.4] dark:opacity-100" style={{
        backgroundImage: 'linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Glow orbs - more subtle in light mode */}
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 9, repeat: Infinity }}
        className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none bg-emerald-500/20 dark:bg-emerald-500/10" />
      <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.12, 0.08] }} transition={{ duration: 11, repeat: Infinity }}
        className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none bg-blue-500/20 dark:bg-blue-500/10" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-4 border-b border-border bg-card/30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">Systems Operational</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground tracking-tighter">
          <div className="flex items-center gap-1.5"><Wifi className="w-3 h-3 text-emerald-500" /> <span>SECURE</span></div>
          <div className="flex items-center gap-1.5"><Satellite className="w-3 h-3 text-blue-500" /> <span>LINKED</span></div>
          <span>{time}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-linear-to-br from-emerald-600 to-emerald-400 shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Leaf className="w-9 h-9 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-background flex items-center justify-center shadow-sm">
                <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-black text-foreground tracking-tight leading-none">AgriVerse</h1>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono tracking-[0.3em] uppercase mt-1">Satellite Intelligence</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm font-medium">Precision agriculture data & AI platform</p>
          <p className="text-muted-foreground/40 text-[10px] mt-2 font-mono uppercase tracking-widest">Global Malawi Node · v2.1.0</p>
        </motion.div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-[2rem] p-10 bg-card/60 dark:bg-card/40 backdrop-blur-3xl border border-border shadow-2xl shadow-black/10 transition-colors">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="block text-[11px] font-black text-foreground uppercase tracking-widest leading-none mb-1">Operator Auth</span>
              <span className="block text-[9px] text-muted-foreground font-mono uppercase tracking-widest opacity-60 italic">Scan required</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground font-mono tracking-[0.2em] uppercase ml-1">Personnel ID (Email)</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="operator@agriverse.ai"
                className="w-full px-5 py-3.5 rounded-xl text-sm bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/30 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground font-mono tracking-[0.2em] uppercase ml-1">Access Key</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-5 py-3.5 rounded-xl text-sm bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/30 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 text-xs text-muted-foreground cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded-md border-border bg-secondary accent-primary" />
                <span className="group-hover:text-foreground transition-colors">Persistent Link</span>
              </label>
              <button type="button" className="text-xs text-primary font-bold hover:underline underline-offset-4 transition-all">
                MFA Help
              </button>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold text-sm text-white transition-all mt-4 bg-linear-to-r from-emerald-600 to-emerald-500 shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:shadow-none uppercase tracking-widest italic">
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  SYNCING…
                </span>
              ) : 'Access Core Hub →'}
            </motion.button>
          </form>
        </motion.div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-6 text-center border-t border-border pt-8">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-xl font-black text-foreground tabular-nums leading-none mb-1">{s.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
