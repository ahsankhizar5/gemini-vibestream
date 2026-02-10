
import React, { useMemo } from 'react';
import { EngagementPoint } from '../types';

interface EngagementGraphProps {
  data: EngagementPoint[];
}

const EngagementGraph: React.FC<EngagementGraphProps> = ({ data }) => {
  const width = 1000;
  const height = 200;
  const padding = 40;

  const emotionColors: Record<string, string> = {
    Joy: "#facc15",    // Yellow
    Shock: "#f472b6",  // Pink
    Boredom: "#475569", // Slate
    Neutral: "#94a3b8", // Light Slate
    Tension: "#ef4444"  // Red
  };

  const points = useMemo(() => {
    if (data.length === 0) return "";
    const xMax = width - padding * 2;
    const yMax = height - padding * 2;
    
    return data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * xMax;
      const y = height - padding - (d.engagement_score * yMax);
      return `${x},${y}`;
    }).join(" ");
  }, [data]);

  const markers = useMemo(() => {
    const xMax = width - padding * 2;
    const yMax = height - padding * 2;
    
    return data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * xMax;
      const y = height - padding - (d.engagement_score * yMax);
      
      // Only show markers for high engagement spikes or emotion changes
      const isSpike = d.engagement_score > 0.8;
      
      return (
        <g key={i} className="group cursor-help">
          <circle 
            cx={x} 
            cy={y} 
            r={isSpike ? 6 : 4} 
            fill={emotionColors[d.emotion_label] || "#8b5cf6"} 
            className="transition-all duration-300 group-hover:r-8"
          />
          {isSpike && (
            <circle 
              cx={x} 
              cy={y} 
              r={12} 
              fill={emotionColors[d.emotion_label] || "#8b5cf6"} 
              className="animate-ping opacity-20"
            />
          )}
          <foreignObject x={x - 40} y={y - 50} width="80" height="40" className="opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            <div className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-center shadow-2xl">
              <p className="text-[8px] font-black text-white uppercase leading-none mb-1">{d.emotion_label}</p>
              <p className="text-[10px] font-bold text-indigo-400">{(d.engagement_score * 100).toFixed(0)}%</p>
            </div>
          </foreignObject>
        </g>
      );
    });
  }, [data]);

  if (data.length === 0) return null;

  return (
    <div className="w-full glass-panel p-8 rounded-[3rem] border border-white/5 space-y-6">
      <div className="flex justify-between items-center px-4">
        <div>
          <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Engagement Pulse</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">AI-Predicted Viewer Retention</p>
        </div>
        <div className="flex space-x-4">
          {Object.entries(emotionColors).map(([label, color]) => (
            <div key={label} className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-visible">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Grid lines */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          
          {/* The Line */}
          <polyline
            points={points}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
          />
          
          {/* Shadow/Fill Area */}
          <path
            d={`M ${padding} ${height - padding} L ${points} L ${width - padding} ${height - padding} Z`}
            fill="url(#area-gradient)"
            opacity="0.1"
          />

          {markers}

          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex justify-between px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
        <span>0:00</span>
        <span>Video Timeline</span>
        <span>{data[data.length-1].timestamp_str}</span>
      </div>
    </div>
  );
};

export default EngagementGraph;
