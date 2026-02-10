
export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export interface ViralSegment {
  start_time: string;
  end_time: string;
  virality_score: number;
  reason: string;
  title: string;
  thumbnail_description: string;
  audio_reasoning: string;
  audio_intensity: number;
}

export interface EmotionalArcPoint {
  time_str: string;
  seconds: number;
  intensity_score: number;
  dominant_emotion: string;
}

export interface EngagementPoint {
  engagement_score: number;
  emotion_label: string;
  timestamp_str: string;
}

export interface ThumbnailVariation {
  id: 'A' | 'B' | 'C';
  label: string;
  concept: string;
  imageData?: string;
}

export interface BattleResult {
  winner: 'A' | 'B' | 'C';
  analysis: string;
  variations: ThumbnailVariation[];
}

export interface CreatorDNA {
  archetype: string;
  audience_prediction: string;
  winning_formula: string;
}

export interface AnalysisResult {
  viral_clips: ViralSegment[];
  emotional_arc: EmotionalArcPoint[];
  creator_dna: CreatorDNA;
}

export interface VideoFile {
  file: File;
  previewUrl: string;
  base64: string;
  metadata?: {
    duration: number;
    width: number;
    height: number;
  };
}
