export type PlotStatus = 'Healthy' | 'Stress Detected' | 'Good Condition';
export type Urgency = 'normal' | 'urgent' | 'watch';
export interface NdviPoint { day: string; ndvi: number }
export interface Plot {
    id: string; name: string; crop: string; area: string;
    status: PlotStatus; statusColor: 'green' | 'red' | 'yellow';
    ndvi: number; health: number; humidity: number; pH: number;
    soilType: string; growthStage: string; lastFertilizer: string;
    recommendation: string; urgency: Urgency;
    ndviTrend: NdviPoint[]; coordinates: string; lastScan: string; satellite: string;
}

export const PLOTS: Record<string, Plot> = {
    'Plot A': {
        id: 'plot-a', name: 'Plot A', crop: 'Maize (ZM521)', area: '4.2 ha',
        status: 'Healthy', statusColor: 'green', ndvi: 0.74, health: 87, humidity: 65, pH: 6.8,
        soilType: 'Loamy', growthStage: 'Vegetative (V6)', lastFertilizer: 'Mar 12, 2026 — Basal CAN',
        recommendation: 'Optimal window: Apply 200 kg/ha Urea within 48 hrs. Predicted 18mm rainfall on Apr 5 will aid absorption.',
        urgency: 'normal',
        ndviTrend: [
            { day: 'Mar 27', ndvi: 0.65 }, { day: 'Mar 28', ndvi: 0.67 }, { day: 'Mar 29', ndvi: 0.69 },
            { day: 'Mar 30', ndvi: 0.71 }, { day: 'Mar 31', ndvi: 0.72 }, { day: 'Apr 1', ndvi: 0.73 }, { day: 'Apr 2', ndvi: 0.74 },
        ],
        coordinates: '-13.954°S, 33.751°E', lastScan: '2 hours ago', satellite: 'ESA Sentinel-2',
    },
    'Plot B': {
        id: 'plot-b', name: 'Plot B', crop: 'Tobacco (Burley K-22)', area: '2.8 ha',
        status: 'Stress Detected', statusColor: 'red', ndvi: 0.42, health: 38, humidity: 71, pH: 5.9,
        soilType: 'Sandy Loam', growthStage: 'Pre-Topping', lastFertilizer: 'Feb 28, 2026 — NPK 23:21:0',
        recommendation: 'URGENT: Nutrient deficiency + high leaching risk. Delay fertilizer — 45mm rainfall forecast within 24 hours.',
        urgency: 'urgent',
        ndviTrend: [
            { day: 'Mar 27', ndvi: 0.58 }, { day: 'Mar 28', ndvi: 0.54 }, { day: 'Mar 29', ndvi: 0.51 },
            { day: 'Mar 30', ndvi: 0.48 }, { day: 'Mar 31', ndvi: 0.46 }, { day: 'Apr 1', ndvi: 0.44 }, { day: 'Apr 2', ndvi: 0.42 },
        ],
        coordinates: '-13.960°S, 33.758°E', lastScan: '2 hours ago', satellite: 'ESA Sentinel-2',
    },
    'Plot C': {
        id: 'plot-c', name: 'Plot C', crop: 'Soybeans (Magoye)', area: '3.5 ha',
        status: 'Good Condition', statusColor: 'yellow', ndvi: 0.61, health: 65, humidity: 58, pH: 6.4,
        soilType: 'Clay Loam', growthStage: 'R3 — Pod Fill', lastFertilizer: 'Mar 5, 2026 — Rhizobium Inoculant',
        recommendation: 'Monitor for 72 hours. Consider foliar spray (5% urea) if NDVI drops below 0.55 before Apr 6.',
        urgency: 'watch',
        ndviTrend: [
            { day: 'Mar 27', ndvi: 0.59 }, { day: 'Mar 28', ndvi: 0.60 }, { day: 'Mar 29', ndvi: 0.61 },
            { day: 'Mar 30', ndvi: 0.60 }, { day: 'Mar 31', ndvi: 0.62 }, { day: 'Apr 1', ndvi: 0.61 }, { day: 'Apr 2', ndvi: 0.61 },
        ],
        coordinates: '-13.953°S, 33.761°E', lastScan: '2 hours ago', satellite: 'ESA Sentinel-2',
    },
};

export const PLOT_POLYGONS: Record<string, { coords: [number, number][]; color: string; fillColor: string }> = {
    'Plot A': {
        coords: [[-13.952, 33.748], [-13.956, 33.748], [-13.956, 33.754], [-13.952, 33.754]],
        color: '#10B981', fillColor: '#10B981',
    },
    'Plot B': {
        coords: [[-13.958, 33.756], [-13.962, 33.756], [-13.962, 33.761], [-13.958, 33.761]],
        color: '#EF4444', fillColor: '#EF4444',
    },
    'Plot C': {
        coords: [[-13.953, 33.760], [-13.957, 33.760], [-13.957, 33.765], [-13.953, 33.765]],
        color: '#F59E0B', fillColor: '#F59E0B',
    },
};
