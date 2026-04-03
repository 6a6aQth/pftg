'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

export const MapView = dynamic(() => import('./LeafletMap'), {
    ssr: false,
    loading: () => (
        <div className="flex-1 h-full bg-background border-x border-border relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />
            <Skeleton className="w-full h-full bg-black/50" />
            <div className="absolute flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                <span className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-[0.3em]">Calibrating GIS ...</span>
            </div>
        </div>
    )
});
