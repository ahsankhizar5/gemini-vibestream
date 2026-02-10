
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

const loadFFmpeg = async () => {
  if (ffmpeg) return ffmpeg;
  
  ffmpeg = new FFmpeg();
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  
  return ffmpeg;
};

/**
 * Parses timestamp string (M:SS or MM:SS) to total seconds.
 */
export const parseTimestamp = (timeStr: string): number => {
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return parts[0] || 0;
};

/**
 * Trims a video file between start and end times using FFmpeg.wasm.
 */
export const trimVideo = async (
  videoFile: File,
  startTime: string,
  endTime: string,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  const instance = await loadFFmpeg();
  
  const inputName = 'input.mp4';
  const outputName = 'output.mp4';
  
  await instance.writeFile(inputName, await fetchFile(videoFile));
  
  const startSec = parseTimestamp(startTime);
  const endSec = parseTimestamp(endTime);
  const duration = endSec - startSec;

  if (onProgress) {
    instance.on('progress', ({ progress }) => {
      onProgress(Math.round(progress * 100));
    });
  }

  // Use fast seek (-ss before -i) and copy codec for instant trimming without re-encoding
  // We use -t for duration instead of -to to be safer with some file formats
  await instance.exec([
    '-ss', startSec.toString(),
    '-i', inputName,
    '-t', duration.toString(),
    '-c', 'copy',
    outputName
  ]);

  const data = await instance.readFile(outputName);
  return new Blob([data], { type: 'video/mp4' });
};
