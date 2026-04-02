'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden flex items-center justify-center px-4">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-background" />
      
      {/* Floating elements */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.05, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-lg p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-2xl">🌾</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-foreground mb-2">AgriVerse</h1>
            <p className="text-sm text-muted-foreground">
              Precision Intelligence for Smarter Farming
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@example.com"
                className="mt-2 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-accent"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-2 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-accent"
                required
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Accessing System...' : 'Access AI Farming System'}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Powered by advanced geospatial AI
          </p>
        </div>

        {/* Status indicator */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center justify-center gap-2 mt-6 text-sm text-accent"
        >
          <div className="w-2 h-2 bg-accent rounded-full" />
          System Ready
        </motion.div>
      </motion.div>
    </div>
  );
}
