'use client';

import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

const YIELD_DATA = [
    { name: 'Jan', current: 4000, projected: 4400 },
    { name: 'Feb', current: 3000, projected: 3200 },
    { name: 'Mar', current: 2000, projected: 2400 },
    { name: 'Apr', current: 2780, projected: 3100 },
    { name: 'May', current: 1890, projected: 2100 },
    { name: 'Jun', current: 2390, projected: 2800 },
    { name: 'Jul', current: 3490, projected: 4100 },
];

const RISK_DATA = [
    { subject: 'Pests', A: 120, B: 110, fullMark: 150 },
    { subject: 'Drought', A: 98, B: 130, fullMark: 150 },
    { subject: 'Frost', A: 86, B: 130, fullMark: 150 },
    { subject: 'Blight', A: 99, B: 100, fullMark: 150 },
    { subject: 'Floods', A: 85, B: 90, fullMark: 150 },
    { subject: 'Heat', A: 65, B: 85, fullMark: 150 },
];

export function PredictionModule() {
    return (
        <div className="flex flex-col gap-4 w-80 h-full pointer-events-auto">
            {/* Forecast Chart */}
            <div className="p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">Yield Forecast</span>
                    </div>
                    <Sparkles className="w-3 h-3 text-white/20" />
                </div>

                <div className="flex-1 -ml-4 -mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={YIELD_DATA}>
                            <defs>
                                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#ffffff40', fontSize: 10 }}
                            />
                            <YAxis hide domain={['auto', 'auto']} />
                            <Tooltip
                                contentStyle={{ background: '#000', border: '1px solid #ffffff20', fontSize: '10px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="projected"
                                stroke="#10b981"
                                fillOpacity={1}
                                fill="url(#colorProjected)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="current"
                                stroke="#ffffff40"
                                fill="transparent"
                                strokeWidth={1}
                                strokeDasharray="5 5"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Risk Radar */}
            <div className="p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl h-60">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">Risk Matrix</span>
                </div>

                <div className="w-full h-full -mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={RISK_DATA}>
                            <PolarGrid stroke="#ffffff10" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff40', fontSize: 9 }} />
                            <Radar
                                name="Risk"
                                dataKey="A"
                                stroke="#f97316"
                                fill="#f97316"
                                fillOpacity={0.4}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Insight Tag */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
            >
                <div className="text-[10px] text-emerald-500 font-bold uppercase mb-1">AI Recommendation</div>
                <div className="text-[11px] text-white/80 leading-relaxed">
                    Optimizing nitrogen input on <span className="text-emerald-400">Plot B</span> could improve yield by 12.4% over next cycle.
                </div>
            </motion.div>
        </div>
    );
}
