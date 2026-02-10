
import React, { useRef } from 'react';
import { VideoFile } from '../types';

interface VideoUploaderProps {
  onVideoSelect: (video: VideoFile | null) => void;
  selectedVideo: VideoFile | null;
}

// Constants for validation
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_DURATION = 300; // 5 minutes
const ALLOWED_TYPES = ['video/mp4', 'video/quicktime'];

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoSelect, selectedVideo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    
    if (!file) return;
    
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload MP4 or MOV video files only');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds 100MB limit (${Math.round(file.size / 1024 / 1024)}MB)`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        
        // Extract metadata
        const tempVideo = document.createElement('video');
        tempVideo.src = URL.createObjectURL(file);
        tempVideo.onloadedmetadata = () => {
          // Validate duration
          if (tempVideo.duration > MAX_DURATION) {
            setError(`Video exceeds ${MAX_DURATION / 60} minute limit (${Math.round(tempVideo.duration / 60)} minutes)`);
            URL.revokeObjectURL(tempVideo.src);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
          }
          
          onVideoSelect({
            file,
            previewUrl: tempVideo.src,
            base64: base64String,
            metadata: {
              duration: tempVideo.duration,
              width: tempVideo.videoWidth,
              height: tempVideo.videoHeight
            }
          });
        };
        
        tempVideo.onerror = () => {
          setError('Failed to load video. File may be corrupted or invalid.');
          URL.revokeObjectURL(tempVideo.src);
          if (fileInputRef.current) fileInputRef.current.value = '';
        };
      };
      
      reader.onerror = () => {
        setError('Failed to read video file');
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Unexpected error occurred while processing video');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const clearSelection = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setError(null);
    onVideoSelect(null);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-semibold flex items-start gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {!selectedVideo ? (
        <label className="flex flex-col items-center justify-center w-full h-48 lg:h-56 xl:h-64 border-2 border-dashed border-slate-700 rounded-2xl lg:rounded-3xl xl:rounded-[2rem] cursor-pointer hover:border-indigo-500 hover:bg-white/5 transition-all duration-500 group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <p className="mb-2 text-sm lg:text-base text-slate-300 font-semibold text-center">Drop your masterpiece here</p>
            <p className="text-[10px] lg:text-xs text-slate-500 uppercase tracking-wider lg:tracking-widest font-bold">MP4 or MOV</p>
          </div>
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            accept="video/mp4,video/quicktime" 
            onChange={handleFileChange} 
          />
        </label>
      ) : (
        <div className="space-y-4 lg:space-y-6">
          <div className="relative rounded-2xl lg:rounded-3xl xl:rounded-[2rem] overflow-hidden glass-panel border border-slate-700">
            <video 
              src={selectedVideo.previewUrl} 
              className="w-full max-h-64 lg:max-h-72 xl:max-h-80 object-contain bg-black" 
              controls 
            />
            <button 
              onClick={clearSelection}
              className="absolute top-3 right-3 lg:top-4 lg:right-4 bg-red-500/20 hover:bg-red-500 backdrop-blur-md text-white p-2 lg:p-2.5 rounded-full transition-all shadow-xl border border-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {selectedVideo.metadata && (
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="glass-panel p-3 lg:p-4 xl:p-5 rounded-2xl lg:rounded-3xl border border-white/5">
                <p className="text-[9px] lg:text-[10px] text-slate-500 font-bold uppercase tracking-wide lg:tracking-widest mb-1">Duration</p>
                <p className="text-lg lg:text-xl font-black text-white">{formatDuration(selectedVideo.metadata.duration)}</p>
              </div>
              <div className="glass-panel p-3 lg:p-4 xl:p-5 rounded-2xl lg:rounded-3xl border border-white/5">
                <p className="text-[9px] lg:text-[10px] text-slate-500 font-bold uppercase tracking-wide lg:tracking-widest mb-1">Resolution</p>
                <p className="text-lg lg:text-xl font-black text-white">{selectedVideo.metadata.width}x{selectedVideo.metadata.height}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
