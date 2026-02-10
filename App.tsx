
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Upload, Download, Video, Zap, TrendingUp, Eye, Home, Activity } from 'lucide-react';
import VideoUploader from './components/VideoUploader';
import ResultCard from './components/ResultCard';
import SkeletonCard from './components/SkeletonCard';
import EmotionalArcMap from './components/EmotionalArcMap';
import EngagementGraph from './components/EngagementGraph';
import VibeMatchReport from './components/VibeMatchReport';
import { LandingPage } from './components/LandingPage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { VibeDNAShowcase } from './components/VibeDNAShowcase';
import { VideoFile, AnalysisResult, AspectRatio, EngagementPoint } from './types';
import { analyzeVideo } from './services/geminiService';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'LANDING' | 'APP' | 'VIBE_DNA'>('LANDING');
  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null);
  const [stylePrefs, setStylePrefs] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  // Auto-hide error toast after 5 seconds
  React.useEffect(() => {
    if (error) {
      setShowErrorToast(true);
      const timer = setTimeout(() => {
        setShowErrorToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAnalyze = async () => {
    if (!selectedVideo) return;
    
    // Validate API key
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here' || apiKey === 'PLACEHOLDER_API_KEY') {
      setError('⚠️ API Key Missing: Please configure your GEMINI_API_KEY in .env.local');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const response = await analyzeVideo(selectedVideo.base64, selectedVideo.file.type);
      setResults(response);
    } catch (err: any) {
      const errorMsg = err.message || "Analysis interrupted.";
      
      // Enhanced error messages
      if (errorMsg.includes('API key')) {
        setError('🔑 Invalid API Key: Please check your Gemini API key configuration');
      } else if (errorMsg.includes('quota') || errorMsg.includes('limit')) {
        setError('📊 Quota Exceeded: API usage limit reached. Please try again later');
      } else if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
        setError('🌐 Network Error: Unable to connect to Gemini API');
      } else {
        setError(`❌ Analysis Failed: ${errorMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLaunch = () => {
    setViewMode('APP');
    window.scrollTo(0, 0);
  };

  const handleShowcase = () => {
    setViewMode('VIBE_DNA');
    window.scrollTo(0, 0);
  };

  const handleBackToLanding = () => {
    setViewMode('LANDING');
    window.scrollTo(0, 0);
  };

  const exportToJson = () => {
    if (!results) return;
    const reportData = {
      app: "VibeStream AI",
      timestamp: new Date().toISOString(),
      video: {
        name: selectedVideo?.file.name,
        metadata: selectedVideo?.metadata
      },
      ...results
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VibeStream_Report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderedResults = useMemo(() => {
    if (!results) return null;
    return results.viral_clips.map((segment, idx) => (
      <ResultCard 
        key={`${idx}-${results.viral_clips.length}`} 
        segment={segment} 
        index={idx} 
        stylePrefs={stylePrefs} 
        originalVideo={selectedVideo}
        aspectRatio={aspectRatio}
      />
    ));
  }, [results, stylePrefs, selectedVideo, aspectRatio]);

  // Convert emotional_arc to engagement data for the graph
  const engagementData = useMemo((): EngagementPoint[] => {
    if (!results?.emotional_arc) return [];
    return results.emotional_arc.map((point) => ({
      engagement_score: point.intensity_score / 10, // Normalize to 0-1
      emotion_label: point.dominant_emotion,
      timestamp_str: point.time_str
    }));
  }, [results]);

  if (viewMode === 'LANDING') {
    return <LandingPage onEnterApp={handleLaunch} onShowcase={handleShowcase} />;
  }

  if (viewMode === 'VIBE_DNA') {
    return <VibeDNAShowcase onBack={handleBackToLanding} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-4 md:p-6 lg:p-8 fade-in-up overflow-hidden relative"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="gradient-orb" style={{ top: '20%', left: '-10%' }} />
      <div className="gradient-orb" style={{ bottom: '10%', right: '-5%', background: 'radial-gradient(circle, rgba(0, 245, 255, 0.2) 0%, transparent 70%)' }} />
      <div className="grid-background absolute inset-0 opacity-40" />

      {/* Header */}
      <div className="relative z-10 max-w-[1800px] mx-auto mb-8 lg:mb-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div 
            className="flex items-center space-x-4 group cursor-pointer"
            onClick={() => setViewMode('LANDING')}
          >
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white flex items-center justify-center rounded-2xl shadow-2xl transition-transform hover:rotate-6">
              <span className="text-slate-950 font-black text-2xl lg:text-3xl">V</span>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tighter leading-none">VibeStream</h1>
              <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mt-1">Strategy Hub</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full shadow-xl bg-green-500 shadow-green-500/50 animate-pulse"></div>
            <p className="text-[9px] lg:text-[10px] font-bold text-slate-600 uppercase tracking-wider hidden sm:block">
              Expert Active
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Content - Changes layout based on whether we have results */}
      {!results ? (
        /* CENTERED UPLOAD FLOW - No confusing side-by-side until we have results */
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 lg:p-12 xl:p-16 rounded-3xl lg:rounded-[3rem] border border-white/5 shadow-3xl"
          >
            <div className="mb-8 lg:mb-12 text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse shadow-xl shadow-indigo-500/50"></span>
                <h2 className="text-lg lg:text-xl font-black text-white uppercase tracking-wide">
                  <Video className="w-5 h-5 lg:w-6 lg:h-6 inline-block mr-2 -mt-1" />
                  Asset Control
                </h2>
              </div>
              <p className="text-sm lg:text-base text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
                Upload your video to discover viral moments, emotional peaks, and platform-optimized content strategies
              </p>
            </div>

            <div className="mb-8 lg:mb-10">
              <VideoUploader 
                onVideoSelect={setSelectedVideo} 
                selectedVideo={selectedVideo} 
              />
            </div>

            {selectedVideo && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 lg:space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Visual Style</label>
                    <input 
                      type="text" 
                      value={stylePrefs}
                      onChange={(e) => setStylePrefs(e.target.value)}
                      placeholder="e.g. Cyberpunk, Minimalist, Cinematic..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 lg:py-5 text-slate-200 text-sm lg:text-base focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-slate-700 shadow-inner"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] lg:text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Target Ratio</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["16:9", "9:16", "1:1"].map((ratio) => (
                        <button
                          key={ratio}
                          onClick={() => setAspectRatio(ratio as AspectRatio)}
                          className={`py-3 lg:py-4 text-[10px] lg:text-[11px] font-bold rounded-xl lg:rounded-2xl border transition-all ${
                            aspectRatio === ratio 
                              ? "bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/30" 
                              : "bg-white/5 border-white/10 text-slate-500 hover:bg-white/10 hover:text-slate-300"
                          }`}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={handleAnalyze}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 lg:py-7 btn-primary text-white font-bold rounded-2xl lg:rounded-3xl uppercase tracking-wider text-base lg:text-lg transition-all flex items-center justify-center gap-3 shadow-2xl"
                >
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span>Scan Viral Nodes</span>
                </motion.button>
              </motion.div>
            )}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 lg:mt-16 flex flex-col items-center py-16 lg:py-20"
              >
                <LoadingSpinner size="lg" className="mb-8" />
                <p className="text-white font-bold text-sm lg:text-base uppercase tracking-wide text-center max-w-[260px] leading-relaxed">
                  <Sparkles className="w-5 h-5 inline-block mr-2 -mt-1" />
                  AI Strategist Analyzing
                  <br/>
                  <span className="text-slate-500 text-xs lg:text-sm tracking-wider mt-2 block">Mapping Emotional Peaks & Viral Moments</span>
                </p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 lg:p-8 bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl lg:rounded-3xl backdrop-blur-xl shadow-2xl"
              >
                <div className="flex items-start gap-4 lg:gap-6">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 lg:w-7 lg:h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h5 className="text-red-400 font-bold text-sm uppercase tracking-wide mb-2">System Alert</h5>
                    <p className="text-red-200 text-sm leading-relaxed font-medium">{error}</p>
                  </div>
                  <button 
                    onClick={() => setError(null)}
                    className="text-red-400 hover:text-red-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      ) : (
        /* RESULTS VIEW - Full width with better organization */
        <div className="relative z-10 max-w-[1800px] mx-auto space-y-12 lg:space-y-16 xl:space-y-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 lg:space-y-12"
          >
            <header className="flex flex-col xl:flex-row xl:items-end justify-between px-4 md:px-6 lg:px-10 gap-8 lg:gap-12 xl:gap-14">
              <div className="max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:gap-6 mb-4 lg:mb-8">
                    <span className="px-3 py-1.5 lg:px-5 lg:py-2 bg-indigo-500 text-white text-[9px] lg:text-[11px] font-black uppercase tracking-wider lg:tracking-[0.4em] rounded-full shadow-lg lg:shadow-2xl shadow-indigo-500/30 inline-block w-fit">Expert Strategy</span>
                    <span className="text-slate-700 font-black text-[9px] lg:text-[11px] uppercase tracking-wider lg:tracking-[0.5em]">Emotional Intensity Logic</span>
                </div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] font-black text-white tracking-tighter uppercase italic leading-[0.85] lg:leading-[0.8] select-none">Viral Logic</h2>
                <p className="text-slate-500 text-sm md:text-base lg:text-lg xl:text-xl font-medium mt-4 lg:mt-8 xl:mt-10 leading-relaxed max-w-2xl">
                    Emotional intensity curves analyzed at high frequency. Peaks indicate highest retention viral potential.
                </p>
              </div>

              <div className="flex items-center space-x-4 lg:space-x-8">
                  <motion.button
                    onClick={exportToJson}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-ghost flex items-center space-x-3 lg:space-x-5 text-white font-black text-[10px] lg:text-[12px] uppercase tracking-wider lg:tracking-[0.4em] px-6 py-4 lg:px-10 xl:px-14 lg:py-5 xl:py-7"
                  >
                    <Download className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                    <span className="hidden sm:inline">Download Strategy</span>
                    <span className="sm:hidden">Download</span>
                  </motion.button>
              </div>
            </header>

            <div className="px-4 md:px-6 lg:px-10">
              <EmotionalArcMap data={results.emotional_arc} />
            </div>

            <div className="px-4 md:px-6 lg:px-10">
              <EngagementGraph data={engagementData} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-10 xl:gap-16 px-4 md:px-6 lg:px-10">
              {renderedResults}
            </div>

            {results.creator_dna && (
              <VibeMatchReport dna={results.creator_dna} />
            )}
          </motion.div>
        </div>
      )}
      
      {/* Floating Error Toast Notification */}
      <AnimatePresence>
        {showErrorToast && error && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-8 right-8 z-50 max-w-md"
          >
            <div className="glass-panel border-2 border-red-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h5 className="text-red-400 font-black text-xs uppercase tracking-wider mb-1">Error Alert</h5>
                  <p className="text-slate-300 text-xs leading-relaxed font-medium">{error}</p>
                </div>
                <button 
                  onClick={() => {
                    setShowErrorToast(false);
                    setError(null);
                  }}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;
