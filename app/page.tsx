'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto animate-pulse">
          <span className="text-4xl">🌾</span>
        </div>
        <p className="text-foreground font-semibold">DIMBA</p>
        <p className="text-muted-foreground text-sm">Precision Intelligence for Smarter Farming</p>
      </div>
    </div>
  );
}
