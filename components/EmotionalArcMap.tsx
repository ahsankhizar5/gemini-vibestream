
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp } from 'lucide-react';
import { EmotionalArcPoint } from '../types';

interface EmotionalArcMapProps {
  data: EmotionalArcPoint[];
}

const EmotionalArcMap: React.FC<EmotionalArcMapProps> = ({ data }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  const width = 1000;
  const height = 300;
  const paddingX = 60;
  const paddingY = 40;

  const emotionColors: Record<string, string> = {
    Joy: "#facc15",    // Yellow
    Shock: "#f472b6",  // Pink
    Suspense: "#ef4444", // Red
    Neutral: "#94a3b8", // Slate
    Tension: "#fb923c", // Orange
    Fear: "#7c3aed",    // Purple
    Anger: "#dc2626",   // Deep Red
    Awe: "#38bdf8"      // Blue
  };

  const { pathData, areaPathData, markers } = useMemo(() => {
    if (!data || data.length === 0) return { pathData: "", areaPathData: "", markers: [] };
    
    const xMax = width - paddingX * 2;
    const yMax = height - paddingY * 2;
    
    const points = data.map((d, i) => {
      const x = paddingX + (i / (data.length - 1)) * xMax;
      // intensity_score is 0-10
      const y = height - paddingY - (d.intensity_score / 10 * yMax);
      return { x, y, ...d };
    });

    const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ");
    const area = `${line} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

    return { pathData: line, areaPathData: area, markers: points };
  }, [data]);

  if (!data || data.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full relative"
    >
      {/* Premium Container with Decorative Elements */}
      <div className="glass-panel p-12 rounded-[4rem] border border-white/5 space-y-8 shadow-3xl relative overflow-hidden">
        {/* Background Gradient Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        {/* Header Section */}
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center shadow-inner">
              <Activity className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3 mb-2">
                Emotional Viral Peaks
              </h3>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.3em]">Dynamic intensity analysis over full video journey</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Peak Score</p>
              <p className="text-2xl font-black text-green-400">{Math.max(...data.map(d => d.intensity_score)).toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 relative z-10">
          {(Array.from(new Set(data.map(d => d.dominant_emotion))) as string[]).slice(0, 6).map((emotion) => (
            <motion.div
              key={emotion}
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="w-3 h-3 rounded-full shadow-lg animate-pulse" style={{ backgroundColor: emotionColors[emotion] || "#8b5cf6" }}></div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider">{emotion}</span>
            </motion.div>
          ))}
        </div>

        {/* Chart Container */}
        <div className="relative group bg-slate-950/50 rounded-3xl p-8 border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-3xl"></div>
          
          <svg 
            viewBox={`0 0 ${width} ${height}`} 
            className="w-full h-auto overflow-visible relative z-10"
            onMouseLeave={() => setHoverIndex(null)}
          >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 2.5, 5, 7.5, 10].map((v) => {
             const y = height - paddingY - (v / 10 * (height - paddingY * 2));
             return (
               <g key={v}>
                 <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                 <text x={paddingX - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-slate-700 font-bold">{v}</text>
               </g>
             );
          })}

          {/* Area Fill */}
          <path d={areaPathData} fill="url(#areaGradient)" className="transition-all duration-1000" />
          
          {/* Path Line */}
          <path 
            d={pathData} 
            fill="none" 
            stroke="url(#lineGradient)" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            filter="url(#glow)"
            className="transition-all duration-1000"
          />

          {/* Interaction Zones */}
          {markers.map((p, i) => (
            <rect
              key={`zone-${i}`}
              x={p.x - (width - paddingX*2) / data.length / 2}
              y={paddingY}
              width={(width - paddingX*2) / data.length}
              height={height - paddingY*2}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoverIndex(i)}
            />
          ))}

          {/* Vertical Indicator */}
          {hoverIndex !== null && (
            <g>
              <line 
                x1={markers[hoverIndex].x} 
                y1={paddingY} 
                x2={markers[hoverIndex].x} 
                y2={height - paddingY} 
                stroke="white" 
                strokeOpacity="0.2" 
                strokeWidth="1" 
                strokeDasharray="4 4"
              />
              <circle 
                cx={markers[hoverIndex].x} 
                cy={markers[hoverIndex].y} 
                r="8" 
                fill={emotionColors[markers[hoverIndex].dominant_emotion] || "#8b5cf6"} 
                stroke="white" 
                strokeWidth="3"
                className="shadow-2xl"
              />
            </g>
          )}

          {/* Markers */}
          {markers.map((p, i) => (
            p.intensity_score > 8 && (
              <circle 
                key={`peak-${i}`} 
                cx={p.x} 
                cy={p.y} 
                r="4" 
                fill="white" 
                className="animate-pulse"
              />
            )
          ))}
        </svg>

        {/* Tooltip Overlay */}
        {hoverIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-50 pointer-events-none bg-slate-900/95 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-3xl min-w-[180px]"
            style={{ 
              left: `${(markers[hoverIndex].x / width) * 100}%`, 
              top: `${(markers[hoverIndex].y / height) * 100}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-4 h-4 rounded-full shadow-lg" 
                style={{ backgroundColor: emotionColors[markers[hoverIndex].dominant_emotion] || "#8b5cf6" }}
              />
              <p className="text-sm font-black text-white uppercase tracking-wide">{markers[hoverIndex].dominant_emotion}</p>
            </div>
            <p className="text-3xl font-black text-white leading-none mb-2">{markers[hoverIndex].intensity_score.toFixed(1)}</p>
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Intensity Level</p>
            <div className="mt-4 px-4 py-2 bg-white/5 rounded-full text-center">
              <p className="text-[10px] font-bold text-slate-400">{markers[hoverIndex].time_str}</p>
            </div>
          </motion.div>
        )}
        </div>
      
      {/* Timeline Labels */}
      <div className="flex justify-between px-4 text-[11px] font-black text-slate-600 uppercase tracking-[0.4em] relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          <span>0:00 Start</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-700">•</span>
          <span>Emotional Timeline</span>
          <span className="text-slate-700">•</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{data[data.length-1].time_str} End</span>
          <div className="w-2 h-2 rounded-full bg-pink-500"></div>
        </div>
      </div>
      
      {/* Stats Footer */}
      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 relative z-10">
        <div className="text-center">
          <p className="text-2xl font-black text-indigo-400">{data.length}</p>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">Data Points</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-purple-400">{data.filter(d => d.intensity_score > 7).length}</p>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">High Intensity</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-black text-pink-400">{(data.reduce((sum, d) => sum + d.intensity_score, 0) / data.length).toFixed(1)}</p>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">Avg Score</p>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default EmotionalArcMap;