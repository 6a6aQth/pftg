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
    <div className="min-h-screen overflow-hidden flex items-center justify-center relative" style={{ background: '#060D1F' }}>
      {/* Grid overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,136,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Glow orbs */}
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.22, 0.12] }} transition={{ duration: 9, repeat: Infinity }}
        className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10B98150, transparent)' }} />
      <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.18, 0.08] }} transition={{ duration: 11, repeat: Infinity }}
        className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B82F650, transparent)' }} />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 13, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10B98130, transparent)' }} />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-emerald-400/80 font-mono tracking-widest">SYSTEMS ONLINE</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
          <Wifi className="w-3 h-3 text-emerald-400/60" />
          <Satellite className="w-3 h-3 text-blue-400/60" />
          <Activity className="w-3 h-3 text-emerald-400/60" />
          <span>{time}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ background: 'linear-gradient(135deg, #059669, #10B981)', boxShadow: '0 0 40px #10B98140' }}>
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-400 border-2 flex items-center justify-center"
                style={{ borderColor: '#060D1F' }}>
                <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-white tracking-tight">AgriVerse</h1>
              <p className="text-[10px] text-emerald-400/70 font-mono tracking-[0.25em] uppercase">Precision Intelligence</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm">AI-driven fertilizer &amp; crop intelligence platform</p>
          <p className="text-slate-600 text-xs mt-1 font-mono">v2.1.0 · Malawi Regional Deployment</p>
        </motion.div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 0 80px rgba(16,185,129,0.06), 0 30px 60px rgba(0,0,0,0.5)',
          }}>
          {/* Auth header */}
          <div className="flex items-center gap-2 mb-7">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400 font-mono tracking-widest">SECURE AUTHENTICATION</span>
            <div className="ml-auto flex items-center gap-1.5">
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-400/60 font-mono">LIVE</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 font-mono tracking-[0.15em] uppercase">Operator Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="operator@agriverse.ai"
                className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 transition-all focus:outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 font-mono tracking-[0.15em] uppercase">Access Key</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 transition-all focus:outline-none pr-11"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded accent-emerald-500" />
                Remember this device
              </label>
              <button type="button" className="text-xs text-emerald-400/70 hover:text-emerald-400 transition-colors">
                Request Access
              </button>
            </div>

            <motion.button whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(16,185,129,0.3)' }} whileTap={{ scale: 0.99 }}
              type="submit" disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-all mt-2 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #059669, #10B981)', boxShadow: '0 0 20px rgba(16,185,129,0.2)' }}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating…
                </span>
              ) : 'Access Platform →'}
            </motion.button>
          </form>
        </motion.div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-lg font-bold" style={{ color: '#10B981' }}>{s.value}</div>
              <div className="text-[11px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
