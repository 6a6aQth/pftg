'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { MapView } from '@/components/dashboard/MapView';
import { DataPanel } from '@/components/dashboard/DataPanel';
import { BottomPanel } from '@/components/dashboard/BottomPanel';
import { FloatingWidgets } from '@/components/dashboard/FloatingWidgets';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (in a real app, check auth state)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto animate-pulse">
            <span className="text-2xl">🌾</span>
          </div>
          <p className="text-muted-foreground">Loading Precision Agriculture System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Main Map Area with Data Panel */}
            <div className="flex gap-6 h-96 relative">
              <MapView />
              <DataPanel />
            </div>

            {/* Bottom Crop Status */}
            <BottomPanel />

            {/* Floating Widgets */}
            <div className="relative h-0">
              <FloatingWidgets />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
