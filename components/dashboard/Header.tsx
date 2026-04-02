'use client';

import { motion } from 'framer-motion';
import { Bell, ChevronDown, User } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-40"
    >
      {/* Left: Farm Selector */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg text-foreground hover:bg-input/80 transition-colors">
            <span className="font-medium">Chitedze Farm</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Status Indicator */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-accent rounded-full"
          />
          <span className="text-sm text-accent font-medium">System Active</span>
        </motion.div>
      </div>

      {/* Right: Notifications and Profile */}
      <div className="flex items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Bell className="w-5 h-5" />
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
          />
        </motion.button>

        <div className="relative">
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-3 py-2 bg-input border border-border rounded-lg text-foreground hover:bg-input/80 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
              JD
            </div>
            <span className="hidden sm:inline text-sm font-medium">John Doe</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
