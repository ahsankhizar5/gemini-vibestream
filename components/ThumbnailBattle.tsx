
import React, { useState } from 'react';
import { ViralSegment, BattleResult, AspectRatio } from '../types';
import { runThumbnailBattle } from '../services/geminiService';

interface ThumbnailBattleProps {
  segment: ViralSegment;
  stylePrefs: string;
  aspectRatio: AspectRatio;
}

const ThumbnailBattle: React.FC<ThumbnailBattleProps> = ({ segment, stylePrefs, aspectRatio }) => {
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startBattle = async () => {
    setLoading(true);
    setError(null);
    setIsOpen(true);
    try {
      const result = await runThumbnailBattle(segment, stylePrefs, aspectRatio);
      setBattleResult(result);
    } catch (err: any) {
      setError(err.message || "Battle simulation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-white/5">
      {!isOpen ? (
        <button
          onClick={startBattle}
          className="w-full py-4 bg-indigo-500/10 hover:bg-indigo-500 border border-indigo-500/20 text-indigo-400 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-xl flex items-center justify-center space-x-3 group"
        >
          <span>⚔️ Run A/B Test Simulator</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </button>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center italic">
               <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 animate-ping"></span>
               Thumbnail Battle Royale
            </h4>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[9px] text-slate-500 hover:text-white uppercase tracking-widest font-black"
            >
              Close Arena
            </button>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-6">
               <div className="w-12 h-12 border-2 border-white/5 border-t-pink-500 rounded-full animate-spin"></div>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] animate-pulse">
                  Simulating Algorithmic Competition...
               </p>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-bold text-center">
              {error}
            </div>
          ) : battleResult && (
            <div className="space-y-10">
              {/* HEAD-TO-HEAD VS LAYOUT */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  {/* Left Contender */}
                  <div className="md:col-span-2">
                    {battleResult.variations.slice(0, 1).map((v) => (
                      <div 
                        key={v.id} 
                        className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                          battleResult.winner === v.id 
                          ? 'border-green-500 shadow-2xl shadow-green-500/30 scale-105' 
                          : 'border-red-500/30 opacity-80'
                        }`}
                      >
                        <div className="aspect-video bg-slate-900">
                          <img src={v.imageData} alt={v.label} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-3 left-3 px-3 py-1.5 bg-blue-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest flex items-center gap-2">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          Concept A
                        </div>
                        {battleResult.winner === v.id && (
                          <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm flex items-center justify-center">
                            <div className="bg-green-500 text-slate-950 px-8 py-4 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl animate-bounce">
                              🏆 WINNER
                            </div>
                          </div>
                        )}
                        <div className="p-5 bg-slate-900/95 backdrop-blur-md border-t border-white/5">
                           <p className="text-[11px] font-black text-white uppercase tracking-tight leading-tight">{v.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* VS Divider */}
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-2xl animate-pulse">
                        <div className="w-20 h-20 rounded-full bg-slate-950 flex items-center justify-center">
                          <span className="text-3xl font-black text-white italic">VS</span>
                        </div>
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-full blur-xl opacity-50 -z-10"></div>
                    </div>
                  </div>

                  {/* Right Contender */}
                  <div className="md:col-span-2">
                    {battleResult.variations.slice(1, 2).map((v) => (
                      <div 
                        key={v.id} 
                        className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                          battleResult.winner === v.id 
                          ? 'border-green-500 shadow-2xl shadow-green-500/30 scale-105' 
                          : 'border-red-500/30 opacity-80'
                        }`}
                      >
                        <div className="aspect-video bg-slate-900">
                          <img src={v.imageData} alt={v.label} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-3 right-3 px-3 py-1.5 bg-purple-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest flex items-center gap-2">
                          Concept B
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        </div>
                        {battleResult.winner === v.id && (
                          <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm flex items-center justify-center">
                            <div className="bg-green-500 text-slate-950 px-8 py-4 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl animate-bounce">
                              🏆 WINNER
                            </div>
                          </div>
                        )}
                        <div className="p-5 bg-slate-900/95 backdrop-blur-md border-t border-white/5">
                           <p className="text-[11px] font-black text-white uppercase tracking-tight leading-tight">{v.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Third Option Below if exists */}
                {battleResult.variations.length > 2 && (
                  <div className="mt-8 flex justify-center">
                    <div className="w-full md:w-2/5">
                      {battleResult.variations.slice(2, 3).map((v) => (
                        <div 
                          key={v.id} 
                          className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                            battleResult.winner === v.id 
                            ? 'border-green-500 shadow-2xl shadow-green-500/30 scale-105' 
                            : 'border-white/5 opacity-70'
                          }`}
                        >
                          <div className="aspect-video bg-slate-900">
                            <img src={v.imageData} alt={v.label} className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute top-3 left-3 px-3 py-1.5 bg-pink-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                            Concept C
                          </div>
                          {battleResult.winner === v.id && (
                            <div className="absolute top-3 right-3 px-4 py-1.5 bg-green-500 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-widest animate-bounce">
                              🏆 WINNER
                            </div>
                          )}
                          <div className="p-5 bg-slate-900/95 backdrop-blur-md border-t border-white/5">
                             <p className="text-[11px] font-black text-white uppercase tracking-tight leading-tight">{v.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <h5 className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] mb-4 italic">Algorithmic Analysis</h5>
                <p className="text-slate-300 text-xs leading-relaxed font-medium">
                  {battleResult.analysis}
                </p>
                <div className="mt-6 flex items-center space-x-3">
                   <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10"></div>
                      <div className="w-6 h-6 rounded-full bg-slate-700 border border-white/10"></div>
                      <div className="w-6 h-6 rounded-full bg-slate-600 border border-white/10"></div>
                   </div>
                   <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Predicting 45% Higher CTR Potential</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThumbnailBattle;
