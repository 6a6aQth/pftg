'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Leaf,
  Cloud,
  Settings,
  LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: MapPin, label: 'My Farms', href: '#' },
  { icon: TrendingUp, label: 'Crop Analytics', href: '#' },
  { icon: Leaf, label: 'Fertilizer Insights', href: '#' },
  { icon: Cloud, label: 'Weather Data', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
];

export function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col p-6 sticky top-0"
    >
      {/* Logo */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">🌾</span>
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">AgriVerse</h1>
        </div>
        <p className="text-xs text-sidebar-accent ml-13">Precision Farming AI</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-accent transition-all duration-200 cursor-pointer group"
          >
            <item.icon className="w-5 h-5 group-hover:text-sidebar-accent transition-colors" />
            <span className="font-medium text-sm">{item.label}</span>
          </motion.a>
        ))}
      </nav>

      {/* User Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border-t border-sidebar-border pt-6"
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
