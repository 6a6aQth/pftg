'use client';

import { motion } from 'framer-motion';

export function MapView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex-1 bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-border rounded-lg overflow-hidden relative"
    >
      {/* SVG Map Grid */}
      <svg className="w-full h-full opacity-10" style={{ position: 'absolute' }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated background elements */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-green-500/10 via-transparent to-transparent"
      />

      {/* Farm Zones */}
      <div className="relative w-full h-full p-8">
        {/* Plot A - Maize */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-12 left-16 w-32 h-32 border-2 border-green-500/60 rounded-lg bg-green-500/10 flex items-center justify-center cursor-pointer group hover:border-green-500 transition-all"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-center"
          >
            <div className="text-green-400 text-2xl mb-1">🌽</div>
            <div className="text-xs font-semibold text-green-300">Plot A</div>
            <div className="text-xs text-green-400/70">Maize • Healthy</div>
          </motion.div>
        </motion.div>

        {/* Plot B - Tobacco */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-48 right-24 w-36 h-36 border-2 border-red-500/60 rounded-lg bg-red-500/10 flex items-center justify-center cursor-pointer hover:border-red-500 transition-all"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="text-center"
          >
            <div className="text-red-400 text-2xl mb-1">🚨</div>
            <div className="text-xs font-semibold text-red-300">Plot B</div>
            <div className="text-xs text-red-400/70">Tobacco • Stress</div>
          </motion.div>
        </motion.div>

        {/* Plot C - Soybeans */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-16 left-1/2 w-32 h-32 border-2 border-yellow-500/60 rounded-lg bg-yellow-500/10 flex items-center justify-center cursor-pointer hover:border-yellow-500 transition-all"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="text-center"
          >
            <div className="text-yellow-400 text-2xl mb-1">🌾</div>
            <div className="text-xs font-semibold text-yellow-300">Plot C</div>
            <div className="text-xs text-yellow-400/70">Soybeans • Good</div>
          </motion.div>
        </motion.div>

        {/* Weather/Risk Zone */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-32 w-40 h-40 rounded-full border border-blue-400/30 bg-blue-500/5"
        />
      </div>
    </motion.div>
  );
}
