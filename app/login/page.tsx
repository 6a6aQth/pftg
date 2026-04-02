'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-emerald-500/30">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] space-y-12"
      >
        {/* Large Logo and Branding */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-48 h-48 flex items-center justify-center -mb-4">
            <img src="/Dimba White Logo bg removed.png" alt="DIMBA Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-5xl font-black text-white tracking-[0.2em] uppercase leading-none">DIMBA</h1>
          <h2 className="text-zinc-400 font-medium tracking-tight">Log in to your account</h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.1em] ml-1">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full h-12 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-mono"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.1em]">Password</label>
              <Link href="#" className="text-[11px] text-zinc-500 hover:text-white transition-colors decoration-zinc-800 underline-offset-4">Forgot password?</Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-white hover:bg-zinc-100 text-black rounded-xl font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                CONTINUE
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center space-y-8">
          <p className="text-sm text-zinc-500">
            Don't have an account?{' '}
            <Link href="#" className="text-white hover:underline font-semibold decoration-emerald-500 underline-offset-4 decoration-2">
              Sign up
            </Link>
          </p>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2.5 text-[10px] text-zinc-700 font-bold uppercase tracking-[0.3em] pt-4">
            <Shield className="w-3.5 h-3.5" />
            SECURE NODE
          </div>
        </div>
      </motion.div>
    </div>
  );
}
