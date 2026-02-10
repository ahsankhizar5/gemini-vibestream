
import React from 'react';
import { CreatorDNA } from '../types';

interface VibeMatchReportProps {
  dna: CreatorDNA;
}

const VibeMatchReport: React.FC<VibeMatchReportProps> = ({ dna }) => {
  return (
    <div className="w-full mt-12 lg:mt-20 xl:mt-24 px-4 md:px-6 lg:px-10">
      <div className="mb-8 lg:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase flex items-center">
          <span className="mr-4 lg:mr-6 text-3xl lg:text-4xl">🧬</span> VibeMatch: Your Creator DNA
        </h2>
        <p className="text-slate-500 font-bold uppercase tracking-wider lg:tracking-[0.4em] text-[10px] lg:text-xs mt-3 lg:mt-4 ml-10 lg:ml-16">Style Identity & Audience Psychology</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10">
        {/* Archetype Card */}
        <div className="relative overflow-hidden group rounded-3xl lg:rounded-[3.5rem] xl:rounded-[4rem] p-8 md:p-12 lg:p-14 xl:p-16 flex flex-col justify-between min-h-[400px] lg:h-[480px] xl:h-[500px] border border-white/10 shadow-4xl transition-all duration-700 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-90 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute top-0 right-0 w-48 h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex-grow flex flex-col justify-center">
            <span className="px-4 py-1.5 lg:px-6 lg:py-2 bg-white/20 backdrop-blur-xl rounded-full text-[10px] lg:text-[12px] font-black text-white uppercase tracking-wider lg:tracking-[0.3em] border border-white/20 inline-block w-fit mb-8 lg:mb-12">Creator Archetype</span>
            <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white italic tracking-tighter leading-[0.95] lg:leading-[0.9] drop-shadow-2xl break-words">
              {dna.archetype}
            </h3>
          </div>

          <div className="relative z-10 flex items-center justify-between mt-8">
            <div className="text-white/60 font-black text-[10px] lg:text-[12px] uppercase tracking-wider lg:tracking-widest">VibeStream DNA // 2024</div>
            <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0">
              <span className="text-indigo-600 font-black text-2xl lg:text-3xl">V</span>
            </div>
          </div>
        </div>

        {/* Prediction & Formula Card */}
        <div className="flex flex-col gap-6 lg:gap-8 xl:gap-10">
          <div className="glass-panel rounded-3xl lg:rounded-[3.5rem] xl:rounded-[4rem] p-6 md:p-8 lg:p-10 xl:p-12 border border-white/5 flex-grow group hover:border-indigo-500/30 transition-all duration-500">
             <div className="flex items-center space-x-4 lg:space-x-6 mb-6 lg:mb-8">
               <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-2xl lg:rounded-3xl bg-indigo-500/10 flex items-center justify-center text-2xl lg:text-3xl shadow-inner flex-shrink-0">⚡</div>
               <h4 className="text-xs lg:text-sm xl:text-[14px] font-black text-white uppercase tracking-wider lg:tracking-[0.3em] xl:tracking-[0.4em] italic">Audience Prediction</h4>
             </div>
             <p className="text-lg md:text-xl lg:text-2xl font-medium text-slate-300 leading-relaxed italic">
               "{dna.audience_prediction}"
             </p>
          </div>

          <div className="bg-white rounded-3xl lg:rounded-[3.5rem] xl:rounded-[4rem] p-6 md:p-8 lg:p-10 xl:p-12 group hover:shadow-4xl hover:shadow-indigo-500/20 transition-all duration-500">
             <div className="flex items-center space-x-4 lg:space-x-6 mb-6 lg:mb-8">
               <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-2xl lg:rounded-3xl bg-indigo-100 flex items-center justify-center text-2xl lg:text-3xl flex-shrink-0">🏆</div>
               <h4 className="text-xs lg:text-sm xl:text-[14px] font-black text-indigo-600 uppercase tracking-wider lg:tracking-[0.3em] xl:tracking-[0.4em] italic">Winning Formula</h4>
             </div>
             <div className="bg-indigo-50 p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-indigo-100">
               <p className="text-indigo-900 text-base md:text-lg lg:text-xl font-bold leading-relaxed">
                 {dna.winning_formula}
               </p>
             </div>
             <p className="text-[9px] lg:text-[10px] text-slate-400 font-black uppercase tracking-wider lg:tracking-widest mt-6 lg:mt-8 text-center italic opacity-60">Based on Multi-Point Algorithmic Retrospective</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibeMatchReport;
