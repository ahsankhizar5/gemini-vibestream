import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Video, Users, Award, ArrowLeft, Play, Eye, Heart, Share2, Zap } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { LoadingSpinner } from './LoadingSpinner';
import { GoogleGenAI, Type } from "@google/genai";

interface ShowcaseProps {
  onBack: () => void;
}

interface ViralHit {
  title: string;
  creator: string;
  viralScore: number;
  views: string;
  engagementRate: string;
  platform: string;
  peakMoment: string;
  insight: string;
  category: string;
}

interface GlobalStats {
  totalVideosAnalyzed: number;
  totalViralMomentsFound: number;
  averageViralScore: number;
  topPerformingCategory: string;
  totalPlatformsOptimized: number;
}

export const VibeDNAShowcase: React.FC<ShowcaseProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const [viralHits, setViralHits] = useState<ViralHit[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateShowcaseData();
  }, []);

  const generateShowcaseData = async () => {
    try {
      setLoading(true);
      const apiKey = (process.env as any).GEMINI_API_KEY || (process.env as any).API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{
          parts: [{
            text: `You are a viral content analytics system. Generate realistic showcase data for a "Vibe DNA" page that demonstrates the AI's viral detection capabilities.

Create:
1. globalStats: 
   - totalVideosAnalyzed (realistic number 50000-100000)
   - totalViralMomentsFound (20000-40000)
   - averageViralScore (7.5-8.5)
   - topPerformingCategory (e.g., "Tech Reviews", "Comedy Sketches", "Educational")
   - totalPlatformsOptimized (always 3)

2. viralHits: Array of 6 diverse viral video examples with:
   - title: catchy video title
   - creator: creator name
   - viralScore: 7.5-9.8
   - views: "1.2M", "850K", "3.4M" format
   - engagementRate: "12.5%", "18.3%" format
   - platform: "TikTok" or "YouTube" or "Instagram"
   - peakMoment: timestamp like "0:23-0:31"
   - insight: one-sentence viral insight
   - category: "Entertainment", "Education", "Lifestyle", "Tech", "Business", "Gaming"

Return valid JSON matching this structure.`
          }]
        }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              globalStats: {
                type: Type.OBJECT,
                properties: {
                  totalVideosAnalyzed: { type: Type.NUMBER },
                  totalViralMomentsFound: { type: Type.NUMBER },
                  averageViralScore: { type: Type.NUMBER },
                  topPerformingCategory: { type: Type.STRING },
                  totalPlatformsOptimized: { type: Type.NUMBER }
                },
                required: ["totalVideosAnalyzed", "totalViralMomentsFound", "averageViralScore", "topPerformingCategory", "totalPlatformsOptimized"]
              },
              viralHits: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    creator: { type: Type.STRING },
                    viralScore: { type: Type.NUMBER },
                    views: { type: Type.STRING },
                    engagementRate: { type: Type.STRING },
                    platform: { type: Type.STRING },
                    peakMoment: { type: Type.STRING },
                    insight: { type: Type.STRING },
                    category: { type: Type.STRING }
                  },
                  required: ["title", "creator", "viralScore", "views", "engagementRate", "platform", "peakMoment", "insight", "category"]
                }
              }
            },
            required: ["globalStats", "viralHits"]
          }
        }
      });

      const data = JSON.parse(response.text);
      
      // Validate response structure
      if (!data.globalStats || !data.viralHits) {
        throw new Error('Invalid response structure from API');
      }
      
      if (!Array.isArray(data.viralHits) || data.viralHits.length === 0) {
        throw new Error('No viral hits data received');
      }
      
      setGlobalStats(data.globalStats);
      setViralHits(data.viralHits);
    } catch (err: any) {
      console.error('Showcase generation error:', err);
      
      // Provide user-friendly error messages
      let errorMessage = 'Failed to load showcase data. ';
      
      if (err.message?.includes('API key')) {
        errorMessage += 'Please check your API key configuration.';
      } else if (err.message?.includes('quota') || err.message?.includes('limit')) {
        errorMessage += 'API usage limit reached. Please try again later.';
      } else if (err.message?.includes('Invalid response')) {
        errorMessage += 'Received invalid data from API. Please try again.';
      } else if (err.message?.includes('network') || err.message?.includes('fetch')) {
        errorMessage += 'Network error. Please check your connection.';
      } else {
        errorMessage += err.message || 'An unexpected error occurred.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'tiktok': return 'from-pink-500 to-cyan-500';
      case 'youtube': return 'from-red-500 to-red-600';
      case 'instagram': return 'from-purple-500 via-pink-500 to-orange-500';
      default: return 'from-indigo-500 to-purple-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-pink-500';
    if (score >= 8) return 'text-purple-400';
    return 'text-cyan-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="gradient-orb" style={{ top: '20%', left: '-10%' }} />
        <div className="gradient-orb" style={{ bottom: '10%', right: '-5%' }} />
        <div className="grid-background absolute inset-0 opacity-40" />
        <div className="relative z-10 text-center">
          <LoadingSpinner size="lg" className="mb-8" />
          <p className="text-white font-bold text-lg uppercase tracking-wide">
            <Sparkles className="w-6 h-6 inline-block mr-2 -mt-1" />
            Generating Showcase Data
          </p>
          <p className="text-slate-500 text-sm mt-2">Powered by Gemini AI</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'var(--bg-primary)' }}>
        <div className="gradient-orb" style={{ top: '20%', left: '-10%' }} />
        <div className="grid-background absolute inset-0 opacity-40" />
        <div className="relative z-10 max-w-2xl">
          <div className="glass-panel p-12 rounded-[3rem] border border-red-500/30 text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Award className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Showcase Unavailable</h2>
            <p className="text-slate-400 mb-8">{error}</p>
            <button onClick={onBack} className="btn-primary px-8 py-4">
              <ArrowLeft className="w-5 h-5 inline-block mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-6 md:p-8 lg:p-12"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="gradient-orb" style={{ top: '20%', left: '-10%' }} />
      <div className="gradient-orb" style={{ bottom: '10%', right: '-5%', background: 'radial-gradient(circle, rgba(0, 245, 255, 0.2) 0%, transparent 70%)' }} />
      <div className="gradient-orb" style={{ top: '50%', right: '20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)' }} />
      <div className="grid-background absolute inset-0 opacity-40" />

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12 lg:mb-16"
        >
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white transition-colors mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase italic">
                Vibe DNA
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-slate-400 font-medium max-w-3xl mx-auto">
              Showcasing the power of AI-driven viral content intelligence at scale
            </p>
          </div>

          {/* Global Stats */}
          {globalStats && (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 lg:p-8 text-center"
              >
                <Video className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                <p className="text-3xl lg:text-4xl font-black text-white mb-2">
                  {globalStats.totalVideosAnalyzed.toLocaleString()}
                </p>
                <p className="text-xs lg:text-sm text-slate-500 font-bold uppercase tracking-wider">Videos Analyzed</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 lg:p-8 text-center"
              >
                <Sparkles className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                <p className="text-3xl lg:text-4xl font-black text-white mb-2">
                  {globalStats.totalViralMomentsFound.toLocaleString()}
                </p>
                <p className="text-xs lg:text-sm text-slate-500 font-bold uppercase tracking-wider">Viral Moments</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 lg:p-8 text-center"
              >
                <TrendingUp className="w-8 h-8 mx-auto mb-4 text-pink-400" />
                <p className="text-3xl lg:text-4xl font-black text-white mb-2">
                  {globalStats.averageViralScore.toFixed(1)}
                </p>
                <p className="text-xs lg:text-sm text-slate-500 font-bold uppercase tracking-wider">Avg Viral Score</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6 lg:p-8 text-center col-span-2 lg:col-span-1"
              >
                <Award className="w-8 h-8 mx-auto mb-4 text-indigo-400" />
                <p className="text-2xl lg:text-3xl font-black text-white mb-2">
                  {globalStats.topPerformingCategory}
                </p>
                <p className="text-xs lg:text-sm text-slate-500 font-bold uppercase tracking-wider">Top Category</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6 lg:p-8 text-center col-span-2 lg:col-span-1"
              >
                <Users className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                <p className="text-3xl lg:text-4xl font-black text-white mb-2">
                  {globalStats.totalPlatformsOptimized}
                </p>
                <p className="text-xs lg:text-sm text-slate-500 font-bold uppercase tracking-wider">Platforms</p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Viral Hits Grid */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-8 flex items-center gap-4">
            <Play className="w-8 h-8 text-indigo-500" />
            Featured Viral Hits
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {viralHits.map((hit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass-card p-6 lg:p-8 hover:border-indigo-500/50 transition-all duration-500 group"
              >
                {/* Platform Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r ${getPlatformColor(hit.platform)} text-white shadow-lg`}>
                    {hit.platform}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-black ${getScoreColor(hit.viralScore)}`}>
                      {hit.viralScore.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-600 font-bold uppercase">Viral</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                  {hit.title}
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-semibold">by {hit.creator}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/5">
                  <div className="text-center">
                    <Eye className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
                    <p className="text-lg font-black text-white">{hit.views}</p>
                    <p className="text-[10px] text-slate-600 uppercase tracking-wider font-bold">Views</p>
                  </div>
                  <div className="text-center">
                    <Heart className="w-5 h-5 mx-auto mb-2 text-pink-400" />
                    <p className="text-lg font-black text-white">{hit.engagementRate}</p>
                    <p className="text-[10px] text-slate-600 uppercase tracking-wider font-bold">Engagement</p>
                  </div>
                  <div className="text-center">
                    <Share2 className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                    <p className="text-lg font-black text-white">{hit.category}</p>
                    <p className="text-[10px] text-slate-600 uppercase tracking-wider font-bold">Category</p>
                  </div>
                </div>

                {/* Peak Moment */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Peak Moment</span>
                  </div>
                  <p className="text-sm font-bold text-indigo-400">{hit.peakMoment}</p>
                </div>

                {/* Insight */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-sm text-slate-300 italic leading-relaxed">{hit.insight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 lg:mt-24 text-center"
        >
          <div className="glass-card p-12 lg:p-16 max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-5xl font-black text-white mb-6">
              Ready to Find Your Viral Moments?
            </h3>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of creators using AI-powered insights to optimize their content and maximize engagement.
            </p>
            <button
              onClick={onBack}
              className="btn-primary px-12 py-6 text-lg inline-flex items-center gap-3"
            >
              <Sparkles className="w-6 h-6" />
              Start Analyzing Now
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
