'use client';

import { motion } from 'framer-motion';
import { Cloud, Droplets, Thermometer, Sun, AlertCircle, CheckCircle2 } from 'lucide-react';

export function DataPanel() {
  const weatherData = [
    { icon: Cloud, label: 'Rainfall', value: '12mm', unit: 'today', color: 'blue' },
    { icon: Thermometer, label: 'Temperature', value: '28°C', unit: 'current', color: 'red' },
    { icon: Droplets, label: 'Humidity', value: '65%', unit: 'current', color: 'cyan' },
    { icon: Sun, label: 'Sunlight', value: 'High', unit: 'intensity', color: 'yellow' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
    red: 'bg-red-500/20 border-red-500/40 text-red-300',
    cyan: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',
    yellow: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-80 bg-card border border-border rounded-lg overflow-hidden flex flex-col h-full"
    >
      {/* Header */}
      <div className="bg-sidebar border-b border-border px-6 py-4">
        <h2 className="text-lg font-bold text-foreground">Environmental Data</h2>
        <p className="text-xs text-muted-foreground">Real-time monitoring</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-6"
        >
          {weatherData.map((item, i) => (
            <motion.div
              key={item.label}
              variants={cardVariants}
              className={`p-4 rounded-lg border ${colorMap[item.color]}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.unit}</p>
                </div>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t border-border pt-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-accent" />
            AI Recommendation
          </h3>
          <div className="bg-green-500/10 border border-green-500/40 rounded-lg p-4 space-y-3">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-start gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-300">Apply Urea Fertilizer</p>
                <p className="text-xs text-green-400/70">Next 48 hours - Optimal window</p>
              </div>
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="flex items-start gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-300">Expected Rainfall</p>
                <p className="text-xs text-blue-400/70">Delay irrigation until after</p>
              </div>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 px-4 py-2 bg-accent/20 border border-accent/40 text-accent rounded-lg font-medium text-sm hover:bg-accent/30 transition-colors"
          >
            View Full Analysis
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
