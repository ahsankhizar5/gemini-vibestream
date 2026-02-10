
import React, { useState, useEffect, useMemo } from 'react';
import { ViralSegment, VideoFile, AspectRatio } from '../types';
import { generateThumbnail } from '../services/geminiService';
import { trimVideo } from '../services/videoService';
import ThumbnailBattle from './ThumbnailBattle';
import PlatformDNA from './PlatformDNA';

interface ResultCardProps {
  segment: ViralSegment;
  index: number;
  stylePrefs?: string;
  originalVideo?: VideoFile | null;
  aspectRatio?: AspectRatio;
}

const ResultCard: React.FC<ResultCardProps> = ({ 
  segment, 
  index, 
  stylePrefs = "", 
  originalVideo, 
  aspectRatio = "16:9" as AspectRatio 
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [thumbError, setThumbError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadThumbnail = async () => {
      try {
        setIsGeneratingThumbnail(true);
        setThumbError(null);
        const url = await generateThumbnail(segment.thumbnail_description, stylePrefs, aspectRatio as AspectRatio);
        if (isMounted) setThumbnailUrl(url);
      } catch (err: any) {
        if (isMounted) setThumbError(err.message);
      } finally {
        if (isMounted) setIsGeneratingThumbnail(false);
      }
    };

    loadThumbnail();
    return () => { isMounted = false; };
  }, [segment.thumbnail_description, stylePrefs, aspectRatio]);

  const handleDownloadClip = async () => {
    if (!originalVideo) return;
    try {
      setIsExporting(true);
      setExportProgress(0);
      const trimmedBlob = await trimVideo(originalVideo.file, segment.start_time, segment.end_time, (p) => setExportProgress(p));
      const url = URL.createObjectURL(trimmedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VibeStream_Highlight_${index + 1}.mp4`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("FFmpeg export failed. This feature requires Cross-Origin Isolation headers.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadThumbnail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!thumbnailUrl) return;
    const link = document.createElement('a');
    link.href = thumbnailUrl;
    link.download = `VibeStream_Thumbnail_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-pink-500';
    if (score >= 7) return 'text-purple-400';
    return 'text-blue-400';
  };

  const ratioClass = {
    "1:1": "aspect-square",
    "3:4": "aspect-[3/4]",
    "4:3": "aspect-[4/3]",
    "9:16": "aspect-[9/16]",
    "16:9": "aspect-video"
  }[aspectRatio] || "aspect-video";

  const audioIcons = useMemo(() => {
    const text = segment.audio_reasoning?.toLowerCase() || "";
    const icons = [];
    if (text.includes("spike") || text.includes("rise") || text.includes("volume") || text.includes("excitement")) {
      icons.push({ icon: "📈", label: "Excitement Spike" });
    }
    if (text.includes("silence") || text.includes("pause") || text.includes("dramatic")) {
      icons.push({ icon: "🤫", label: "Dramatic Silence" });
    }
    if (text.includes("laugh")) {
      icons.push({ icon: "😂", label: "Laughter Detected" });
    }
    if (text.includes("music") || text.includes("beat") || text.includes("drop") || text.includes("sync")) {
      icons.push({ icon: "🎵", label: "Music Drop" });
    }
    if (text.includes("pace") || text.includes("pacing") || text.includes("fast") || text.includes("slow")) {
      icons.push({ icon: "🗣️", label: "Pacing Shift" });
    }
    return icons;
  }, [segment.audio_reasoning]);

  return (
    <div className="flex flex-col h-full glass-panel border border-white/5 rounded-2xl lg:rounded-3xl xl:rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-700 group shadow-2xl relative">
      <div className={`relative ${ratioClass} bg-slate-900 overflow-hidden`}>
        {isGeneratingThumbnail ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-slate-950">
            <div className="absolute inset-0 shimmer opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center space-y-3">
              <div className="w-10 h-10 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Generating AI Visual...</span>
            </div>
          </div>
        ) : thumbnailUrl ? (
          <>
            <img 
              src={thumbnailUrl} 
              alt={segment.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 lg:pb-8">
              <button 
                onClick={handleDownloadThumbnail}
                className="px-6 py-2.5 lg:px-8 lg:py-3 bg-white text-black text-[9px] lg:text-[10px] font-black uppercase tracking-wider lg:tracking-widest rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-105 shadow-2xl"
              >
                Download Thumbnail
              </button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900">
             <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Visual Engine Error</span>
             <p className="text-[9px] text-slate-600 italic px-4 leading-tight">{thumbError || segment.thumbnail_description}</p>
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 px-2.5 py-1 lg:px-3 lg:py-1 bg-black/80 backdrop-blur-xl rounded-full text-[9px] lg:text-[10px] font-black text-white border border-white/10">
          {segment.start_time} - {segment.end_time}
        </div>

        {isExporting && (
          <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-8 z-20">
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
               <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${exportProgress}%` }}></div>
            </div>
            <p className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-1">Exporting Highlight {exportProgress}%</p>
            <p className="text-slate-600 text-[9px] uppercase tracking-widest">Using FFmpeg.wasm Engine</p>
          </div>
        )}
      </div>

      <div className="p-4 lg:p-6 xl:p-8 space-y-4 lg:space-y-5 xl:space-y-6 flex-grow flex flex-col">
        <div className="flex justify-between items-center">
          <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-wider lg:tracking-[0.3em] text-slate-500">Moment {index + 1}</span>
          <div className="flex items-center space-x-2 lg:space-x-3">
             <button 
                onClick={handleDownloadClip}
                disabled={isExporting}
                title="Export Clip"
                className="w-10 h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-20 shadow-lg"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </button>
              <div className="flex items-center space-x-1.5 lg:space-x-2 px-3 py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2 bg-slate-950 border border-white/5 rounded-full shadow-inner">
                <span className={`text-xs lg:text-sm font-black ${getScoreColor(segment.virality_score)}`}>{segment.virality_score}</span>
                <span className="text-[9px] lg:text-[10px] text-slate-600 font-black tracking-wider lg:tracking-widest uppercase hidden sm:inline">Viral Score</span>
              </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg lg:text-xl xl:text-2xl font-black text-white mb-2 lg:mb-3 leading-tight tracking-tight uppercase italic">{segment.title}</h3>
          <p className="text-slate-400 text-xs lg:text-sm leading-relaxed font-medium">{segment.reason}</p>
        </div>

        {/* 🎧 Sonic Vibe Check Section */}
        <div className="p-4 lg:p-5 xl:p-6 rounded-xl lg:rounded-2xl xl:rounded-[2rem] border border-white/5 bg-indigo-500/5 space-y-3 lg:space-y-4">
           <div className="flex items-center justify-between">
              <h4 className="text-[9px] lg:text-[10px] font-black uppercase tracking-wider lg:tracking-[0.2em] text-indigo-400 flex items-center italic">
                <span className="mr-2">🎧</span> Sonic Vibe Check
              </h4>
              <div className="flex space-x-1 lg:space-x-2">
                {audioIcons.map((ai, i) => (
                  <span key={i} title={ai.label} className="text-xs lg:text-sm">{ai.icon}</span>
                ))}
              </div>
           </div>
           
           <p className="text-slate-300 text-[10px] lg:text-[11px] leading-relaxed font-medium italic">
             {segment.audio_reasoning}
           </p>

           <div className="space-y-1.5">
             <div className="flex justify-between items-center text-[8px] lg:text-[9px] font-black text-slate-500 uppercase tracking-wider lg:tracking-widest">
               <span>Audio Intensity</span>
               <span>{segment.audio_intensity}%</span>
             </div>
             <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-1000" 
                  style={{ width: `${segment.audio_intensity}%` }}
                ></div>
             </div>
           </div>
        </div>
        
        <div className="pt-2">
            <div className="p-4 lg:p-5 xl:p-6 rounded-xl lg:rounded-2xl xl:rounded-[2rem] border border-dashed border-white/5 bg-white/5 group-hover:bg-indigo-500/5 transition-all duration-500">
              <h4 className="text-[9px] lg:text-[10px] font-black uppercase tracking-wider lg:tracking-[0.2em] text-pink-500 mb-2 lg:mb-3">AI Vision Concept</h4>
              <p className="text-slate-400 text-[10px] lg:text-[11px] leading-relaxed italic font-medium">{segment.thumbnail_description}</p>
            </div>
        </div>

        <ThumbnailBattle 
          segment={segment} 
          stylePrefs={stylePrefs} 
          aspectRatio={aspectRatio} 
        />

        <PlatformDNA segment={segment} />
      </div>
    </div>
  );
};

export default ResultCard;
