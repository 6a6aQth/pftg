'use client';

import { motion } from 'framer-motion';
import { Droplet, Zap } from 'lucide-react';

export function FloatingWidgets() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Soil Analysis Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -50, y: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-8 left-8 w-56 bg-card border border-border rounded-lg p-4 pointer-events-auto shadow-xl"
      >
        <div className="flex items-center gap-2 mb-3">
          <Droplet className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-foreground">Soil Analysis</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Soil Type:</span>
            <span className="text-foreground font-medium">Loamy</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Moisture:</span>
            <span className="text-blue-300 font-medium">Medium (45%)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">pH Level:</span>
            <span className="text-green-300 font-medium">6.5 (Optimal)</span>
          </div>
        </div>
      </motion.div>

      {/* Fertilizer Efficiency Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50, y: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-8 right-8 w-56 bg-card border border-border rounded-lg p-4 pointer-events-auto shadow-xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold text-foreground">Fertilizer Efficiency</h3>
        </div>
        
        {/* Circular Progress */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-input"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-accent"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 * (1 - 0.78) }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">78%</p>
                <p className="text-xs text-muted-foreground">Efficiency</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Excellent absorption rate. Nitrogen uptake: 92%
          </p>
        </div>
      </motion.div>

      {/* Alert Widget */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute bottom-8 right-8 w-64 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4 pointer-events-auto shadow-xl"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-start gap-3"
        >
          <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-300 text-sm mb-1">Plot B Alert</h3>
            <p className="text-xs text-yellow-200/80">Humidity above 70%. Risk of fungal disease. Consider preventive measures.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
