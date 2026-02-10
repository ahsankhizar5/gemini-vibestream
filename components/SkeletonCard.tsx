import React from 'react';

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col h-full glass-panel border border-white/5 rounded-2xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl animate-pulse ${className}`}>
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      <div className="p-4 lg:p-6 xl:p-8 space-y-4 lg:space-y-6 flex-grow">
        <div className="flex justify-between items-center">
          <div className="h-2 w-12 lg:w-16 bg-slate-800 rounded-full"></div>
          <div className="flex items-center space-x-2 lg:space-x-3">
             <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full bg-slate-800"></div>
             <div className="w-12 lg:w-14 xl:w-16 h-6 lg:h-7 xl:h-8 bg-slate-800 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-2 lg:space-y-3">
          <div className="h-4 lg:h-5 xl:h-6 w-3/4 bg-slate-800 rounded-lg"></div>
          <div className="h-2 lg:h-3 w-full bg-slate-800/50 rounded-lg"></div>
          <div className="h-2 lg:h-3 w-5/6 bg-slate-800/50 rounded-lg"></div>
        </div>
        
        <div className="pt-2">
            <div className="p-4 lg:p-5 xl:p-6 rounded-xl lg:rounded-2xl xl:rounded-[2rem] border border-dashed border-white/5 bg-white/5 h-20 lg:h-24 flex flex-col justify-center">
              <div className="h-2 w-16 lg:w-20 bg-slate-800 rounded-full mb-2 lg:mb-3"></div>
              <div className="h-2 w-full bg-slate-800/50 rounded-full"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
