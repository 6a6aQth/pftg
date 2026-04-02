'use client';

import { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { Sidebar, type ActiveLayers } from '@/components/dashboard/Sidebar';
import { MapView } from '@/components/dashboard/MapView';
import { DataPanel } from '@/components/dashboard/DataPanel';
import { BottomPanel } from '@/components/dashboard/BottomPanel';
import { PLOTS } from '@/lib/plotData';

const DEFAULT_LAYERS: ActiveLayers = {
  ndvi: false,
  rainfall: true,
  soilMoisture: false,
  temperature: false,
  alerts: true,
  cropHealth: true,
  fertilizerHeatmap: true,
};

export default function DashboardPage() {
  const [selectedPlotName, setSelectedPlotName] = useState<string>('Plot B');
  const [activeLayers, setActiveLayers] = useState<ActiveLayers>(DEFAULT_LAYERS);

  const selectedPlot = PLOTS[selectedPlotName] ?? null;

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#060D1F' }}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeLayers={activeLayers} setActiveLayers={setActiveLayers} />
        <MapView
          onSelectPlot={setSelectedPlotName}
          activeLayers={activeLayers}
          selectedPlotId={selectedPlot?.id ?? ''}
        />
        <DataPanel selectedPlot={selectedPlot} />
      </div>
      <BottomPanel selectedPlot={selectedPlot} />
    </div>
  );
}
