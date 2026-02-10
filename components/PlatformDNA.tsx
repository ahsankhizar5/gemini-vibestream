import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Video, Copy, Check } from 'lucide-react';
import { ViralSegment } from '../types';

interface PlatformDNAProps {
  segment: ViralSegment;
}

interface CaptionVariation {
  platform: 'TikTok' | 'YouTube' | 'Instagram';
  caption: string;
  hashtags: string[];
  hook: string;
  cta: string;
}

const PlatformDNA: React.FC<PlatformDNAProps> = ({ segment }) => {
  const [activeTab, setActiveTab] = useState<'TikTok' | 'YouTube' | 'Instagram'>('TikTok');
  const [copied, setCopied] = useState<string | null>(null);

  // Generate platform-specific captions based on segment data
  const generateCaptions = (): CaptionVariation[] => {
    return [
      {
        platform: 'TikTok',
        caption: `${segment.title} 🔥\n\n${segment.reason.split('.')[0]}. This moment hits different! 💯\n\nWatch till the end for the ultimate payoff 🎯`,
        hashtags: ['#ViralMoment', '#FYP', '#Trending', '#MustWatch', '#ContentCreator'],
        hook: 'POV: ' + segment.title.substring(0, 40) + '...',
        cta: 'Drop a ❤️ if you felt this!'
      },
      {
        platform: 'YouTube',
        caption: `${segment.title}\n\n${segment.reason}\n\nIn this clip, you'll discover the exact moment that makes this content so engaging. The emotional intensity peaks at ${segment.virality_score}/10, creating maximum viewer retention.\n\n⏰ Timestamp: ${segment.start_time} - ${segment.end_time}\n🎯 Virality Score: ${segment.virality_score}/10\n\n💡 Key Takeaways:\n• High emotional engagement\n• Peak viewer retention moment\n• Premium content strategy\n\nIf you found this valuable, don't forget to like, subscribe, and hit the bell for more viral content breakdowns!`,
        hashtags: ['#ContentStrategy', '#ViralContent', '#CreatorEconomy', '#VideoMarketing'],
        hook: `The ${segment.virality_score}/10 moment from ${segment.start_time}`,
        cta: '👇 Comment your thoughts below!'
      },
      {
        platform: 'Instagram',
        caption: `✨ ${segment.title} ✨\n\n${segment.reason.substring(0, 100)}...\n\n🎬 This ${Number(segment.end_time.split(':')[1]) - Number(segment.start_time.split(':')[1])}s clip scored ${segment.virality_score}/10 on our viral meter!\n\n💎 What makes it work:\n→ Authentic emotion\n→ Perfect timing\n→ Relatable content\n\nDouble tap if you felt this! 💜\nTag someone who needs to see this 👇`,
        hashtags: ['#ViralContent', '#ContentCreator', '#Reels', '#CreatorTips', '#EngagementBoost'],
        hook: '🎯 Viral moment alert!',
        cta: 'Save this for later! 🔖'
      }
    ];
  };

  const captions = generateCaptions();
  const activeCaption = captions.find(c => c.platform === activeTab)!;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const platformIcons = {
    TikTok: Video,
    YouTube: Youtube,
    Instagram: Instagram
  };

  const platformColors = {
    TikTok: 'from-pink-500 to-cyan-500',
    YouTube: 'from-red-500 to-red-600',
    Instagram: 'from-purple-500 via-pink-500 to-orange-500'
  };

  return (
    <div className="mt-6 lg:mt-8 xl:mt-10 pt-6 lg:pt-8 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 lg:space-y-5 xl:space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs lg:text-sm font-black uppercase tracking-wide lg:tracking-wider text-indigo-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              Platform DNA
            </h4>
            <p className="text-[10px] lg:text-xs text-slate-600 mt-1 font-medium">Optimized captions for each platform</p>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="flex gap-2 lg:gap-2.5">
          {(['TikTok', 'YouTube', 'Instagram'] as const).map((platform) => {
            const Icon = platformIcons[platform];
            const isActive = activeTab === platform;
            return (
              <motion.button
                key={platform}
                onClick={() => setActiveTab(platform)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 px-4 py-3 lg:px-5 lg:py-3.5 xl:px-6 xl:py-4 rounded-xl lg:rounded-2xl font-black text-[10px] lg:text-xs uppercase tracking-wide lg:tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  isActive
                    ? `bg-gradient-to-r ${platformColors[platform]} text-white shadow-xl lg:shadow-2xl`
                    : 'bg-white/5 text-slate-500 hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">{platform}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Caption Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3 lg:space-y-4"
        >
          {/* Hook */}
          <div className="glass-panel p-4 lg:p-5 rounded-xl lg:rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-wider lg:tracking-widest">Opening Hook</span>
              <button
                onClick={() => copyToClipboard(activeCaption.hook, 'hook')}
                className="text-slate-500 hover:text-white transition-colors p-1"
              >
                {copied === 'hook' ? <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-400" /> : <Copy className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
              </button>
            </div>
            <p className="text-white font-bold text-xs lg:text-sm leading-relaxed">{activeCaption.hook}</p>
          </div>

          {/* Main Caption */}
          <div className="glass-panel p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-white/5 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-wider lg:tracking-widest">Caption</span>
              <button
                onClick={() => copyToClipboard(activeCaption.caption, 'caption')}
                className="text-slate-500 hover:text-white transition-colors p-1"
              >
                {copied === 'caption' ? <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-400" /> : <Copy className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
              </button>
            </div>
            <p className="text-slate-300 text-xs lg:text-sm leading-relaxed whitespace-pre-line font-medium">
              {activeCaption.caption}
            </p>
          </div>

          {/* Hashtags */}
          <div className="glass-panel p-4 lg:p-5 rounded-xl lg:rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-wider lg:tracking-widest">Hashtags</span>
              <button
                onClick={() => copyToClipboard(activeCaption.hashtags.join(' '), 'hashtags')}
                className="text-slate-500 hover:text-white transition-colors p-1"
              >
                {copied === 'hashtags' ? <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-400" /> : <Copy className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeCaption.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full text-[10px] lg:text-xs font-black bg-gradient-to-r ${platformColors[activeTab]} text-white`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-panel p-4 lg:p-5 rounded-xl lg:rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] lg:text-xs font-black text-slate-500 uppercase tracking-wider lg:tracking-widest">Call-to-Action</span>
              <button
                onClick={() => copyToClipboard(activeCaption.cta, 'cta')}
                className="text-slate-500 hover:text-white transition-colors p-1"
              >
                {copied === 'cta' ? <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-400" /> : <Copy className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
              </button>
            </div>
            <p className="text-white font-bold text-xs lg:text-sm">{activeCaption.cta}</p>
          </div>
        </motion.div>

        {/* Stats Footer */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4 pt-3 lg:pt-4">
          <div className="text-center">
            <p className="text-lg lg:text-xl font-black text-indigo-400">{activeCaption.caption.length}</p>
            <p className="text-[9px] lg:text-xs text-slate-600 font-bold uppercase tracking-wider lg:tracking-widest mt-1">Characters</p>
          </div>
          <div className="text-center">
            <p className="text-lg lg:text-xl font-black text-purple-400">{activeCaption.hashtags.length}</p>
            <p className="text-[9px] lg:text-xs text-slate-600 font-bold uppercase tracking-wider lg:tracking-widest mt-1">Tags</p>
          </div>
          <div className="text-center">
            <p className="text-lg lg:text-xl font-black text-pink-400">{segment.virality_score}/10</p>
            <p className="text-[9px] lg:text-xs text-slate-600 font-bold uppercase tracking-wider lg:tracking-widest mt-1">Viral Score</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlatformDNA;
