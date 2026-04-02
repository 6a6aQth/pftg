'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export function BottomPanel() {
  const cropZones = [
    { name: 'Plot A', crop: 'Maize', status: 'Healthy', progress: 75, color: 'green' },
    { name: 'Plot B', crop: 'Tobacco', status: 'Stress Detected', progress: 45, color: 'red' },
    { name: 'Plot C', crop: 'Soybeans', status: 'Good', progress: 62, color: 'yellow' },
  ];

  const statusIcons: Record<string, React.ReactNode> = {
    Healthy: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    'Stress Detected': <AlertTriangle className="w-4 h-4 text-red-400" />,
    Good: <CheckCircle2 className="w-4 h-4 text-yellow-400" />,
  };

  const statusColors: Record<string, string> = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card border border-border rounded-lg p-6"
    >
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-1">Crop Zone Status</h2>
        <p className="text-xs text-muted-foreground">Growth stage and health monitoring</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {cropZones.map((zone) => (
          <motion.div
            key={zone.name}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-sidebar border border-border rounded-lg p-4 cursor-pointer transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{zone.name}</h3>
                <p className="text-xs text-muted-foreground">{zone.crop}</p>
              </div>
              <div className="flex items-center gap-1">
                {statusIcons[zone.status]}
              </div>
            </div>

            {/* Status */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Status
              </p>
              <p
                className={`text-sm font-medium ${
                  zone.color === 'green'
                    ? 'text-green-300'
                    : zone.color === 'red'
                    ? 'text-red-300'
                    : 'text-yellow-300'
                }`}
              >
                {zone.status}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground">Growth Stage</p>
                <p className="text-xs font-semibold text-foreground">{zone.progress}%</p>
              </div>
              <div className="w-full h-2 bg-input rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${zone.progress}%` }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className={`h-full ${statusColors[zone.color]}`}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Last updated: 2 mins ago</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-border"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">3</p>
          <p className="text-xs text-muted-foreground">Active Plots</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">1</p>
          <p className="text-xs text-muted-foreground">Needs Action</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-400">2</p>
          <p className="text-xs text-muted-foreground">Monitored</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
