'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Circle, Tooltip, useMap } from 'react-leaflet';
import { PLOT_POLYGONS } from '@/lib/plotData';
import type { ActiveLayers } from './Sidebar';

interface Props {
    onSelectPlot: (name: string) => void;
    activeLayers: ActiveLayers;
    selectedPlotId: string;
}

// Fix leaflet default icon paths broken by webpack
if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
}

function MapStyler() {
    const map = useMap();
    useEffect(() => {
        const container = map.getContainer();
        container.style.background = '#07102A';
    }, [map]);
    return null;
}

const NDVI_TOOLTIP: Record<string, string> = {
    'Plot A': 'Plot A · Maize · NDVI 0.74 · Healthy',
    'Plot B': 'Plot B · Tobacco · NDVI 0.42 · ⚠ Stress',
    'Plot C': 'Plot C · Soybeans · NDVI 0.61 · Good',
};

export default function LeafletMap({ onSelectPlot, activeLayers, selectedPlotId }: Props) {
    return (
        <MapContainer
            center={[-13.956, 33.756]}
            zoom={14}
            style={{ width: '100%', height: '100%', background: '#07102A' }}
            zoomControl={false}
            attributionControl={true}
        >
            <MapStyler />

            {/* Satellite tile layer */}
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="&copy; Esri &mdash; Esri, i-cubed, USDA, USGS, AEX, GeoEye"
                maxZoom={19}
            />

            {/* NDVI / Crop polygons */}
            {activeLayers.ndvi && Object.entries(PLOT_POLYGONS).map(([name, p]) => {
                const isSelected = PLOT_POLYGONS[name] && selectedPlotId === `plot-${name.replace('Plot ', '').toLowerCase()}`;
                return (
                    <Polygon
                        key={name}
                        positions={p.coords}
                        pathOptions={{
                            color: p.color,
                            fillColor: p.fillColor,
                            fillOpacity: isSelected ? 0.45 : 0.25,
                            weight: isSelected ? 3 : 1.5,
                            dashArray: isSelected ? undefined : '4 3',
                        }}
                        eventHandlers={{ click: () => onSelectPlot(name) }}
                    >
                        <Tooltip sticky>{NDVI_TOOLTIP[name]}</Tooltip>
                    </Polygon>
                );
            })}

            {/* Crop health overlay (same polygons, different style) */}
            {activeLayers.cropHealth && !activeLayers.ndvi && Object.entries(PLOT_POLYGONS).map(([name, p]) => (
                <Polygon
                    key={`ch-${name}`}
                    positions={p.coords}
                    pathOptions={{ color: p.color, fillColor: p.fillColor, fillOpacity: 0.15, weight: 1, dashArray: '6 4' }}
                    eventHandlers={{ click: () => onSelectPlot(name) }}
                >
                    <Tooltip sticky>{NDVI_TOOLTIP[name]}</Tooltip>
                </Polygon>
            ))}

            {/* Rainfall intensity circle */}
            {activeLayers.rainfall && (
                <Circle
                    center={[-13.960, 33.758]}
                    radius={600}
                    pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.08, weight: 1, dashArray: '6 4' }}
                >
                    <Tooltip>Rainfall Zone · 45mm expected · High leaching risk</Tooltip>
                </Circle>
            )}

            {/* Alert zone circle */}
            {activeLayers.alerts && (
                <Circle
                    center={[-13.960, 33.758]}
                    radius={280}
                    pathOptions={{ color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.1, weight: 1.5 }}
                >
                    <Tooltip>⚠ Alert Zone · Plot B · Stress Detected</Tooltip>
                </Circle>
            )}

            {/* Soil moisture zone */}
            {activeLayers.soilMoisture && (
                <Circle
                    center={[-13.954, 33.751]}
                    radius={350}
                    pathOptions={{ color: '#06B6D4', fillColor: '#06B6D4', fillOpacity: 0.07, weight: 1, dashArray: '4 3' }}
                >
                    <Tooltip>Soil Moisture · Plot A · Medium 45%</Tooltip>
                </Circle>
            )}

            {/* Temperature zone */}
            {activeLayers.temperature && (
                <Circle
                    center={[-13.956, 33.757]}
                    radius={800}
                    pathOptions={{ color: '#F97316', fillColor: '#F97316', fillOpacity: 0.04, weight: 0.5, dashArray: '8 6' }}
                >
                    <Tooltip>Temperature Zone · 28°C · High</Tooltip>
                </Circle>
            )}
        </MapContainer>
    );
}
