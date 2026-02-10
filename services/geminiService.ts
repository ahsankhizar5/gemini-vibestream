
import { GoogleGenAI, Type, GenerateContentResponse, SafetyFilterLevel, PersonGeneration } from "@google/genai";
import { AnalysisResult, AspectRatio, ViralSegment, BattleResult, ThumbnailVariation } from "../types";

// Vite exposes GEMINI_API_KEY as process.env via defineConfig
const getAI = () => {
  const apiKey = (process.env as any).GEMINI_API_KEY || (process.env as any).API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in your .env file');
  }
  return new GoogleGenAI({ apiKey });
};

// Utility to add delay between API calls to avoid rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const API_DELAY = 2000; // 2 seconds between requests

export const analyzeVideo = async (videoBase64: string, mimeType: string): Promise<AnalysisResult> => {
  const ai = getAI();
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            { inlineData: { mimeType, data: videoBase64 } },
            { text: "You are an expert viral content strategist. Analyze the video for emotional spikes, humor, and engagement. Listen specifically to the audio track (tonality, silence, laughter, music sync, pacing). Also, analyze the creator's overall identity (Pacing, Tone, Visual Style) to extract a 'Vibe Signature'. Output three things in JSON format: 1. viral_clips: List of top 3 moments. 2. emotional_arc: Flow every 3-5 seconds. 3. creator_dna: Object with 'archetype' (e.g. 'The Chaotic Educator'), 'audience_prediction' (insight about engagement), and 'winning_formula' (1-sentence strategic advice)." }
          ],
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            viral_clips: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  start_time: { type: Type.STRING },
                  end_time: { type: Type.STRING },
                  virality_score: { type: Type.NUMBER },
                  reason: { type: Type.STRING },
                  title: { type: Type.STRING },
                  thumbnail_description: { type: Type.STRING },
                  audio_reasoning: { type: Type.STRING },
                  audio_intensity: { type: Type.NUMBER }
                },
                required: ["start_time", "end_time", "virality_score", "reason", "title", "thumbnail_description", "audio_reasoning", "audio_intensity"]
              }
            },
            emotional_arc: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time_str: { type: Type.STRING },
                  seconds: { type: Type.NUMBER },
                  intensity_score: { type: Type.NUMBER },
                  dominant_emotion: { type: Type.STRING }
                },
                required: ["time_str", "seconds", "intensity_score", "dominant_emotion"]
              }
            },
            creator_dna: {
              type: Type.OBJECT,
              properties: {
                archetype: { type: Type.STRING },
                audience_prediction: { type: Type.STRING },
                winning_formula: { type: Type.STRING }
              },
              required: ["archetype", "audience_prediction", "winning_formula"]
            }
          },
          required: ["viral_clips", "emotional_arc", "creator_dna"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error: any) {
    throw new Error(`Analysis failed: ${error.message || "Unknown error"}`);
  }
};

export const generateThumbnail = async (prompt: string, stylePrefs: string = "", aspectRatio: AspectRatio = "16:9"): Promise<string> => {
  const ai = getAI();
  try {
    // Map aspect ratio to Imagen dimensions
    const dimensionMap: Record<AspectRatio, { width: number; height: number }> = {
      "16:9": { width: 1920, height: 1080 },
      "9:16": { width: 1080, height: 1920 },
      "1:1": { width: 1080, height: 1080 },
      "4:3": { width: 1440, height: 1080 },
      "3:4": { width: 1080, height: 1440 }
    };
    const dimensions = dimensionMap[aspectRatio];
    
    // Construct enhanced prompt for thumbnail generation
    const enhancedPrompt = `High-impact YouTube thumbnail: ${prompt}. Style: ${stylePrefs || "Cinematic, bold colors, high contrast, professional, eye-catching"}. Make it visually striking with bold text overlay, dramatic lighting, and attention-grabbing composition.`;
    
    // Generate image using Imagen 3
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-001',
      prompt: enhancedPrompt,
      config: {
        numberOfImages: 1,
        aspectRatio: aspectRatio,
        safetyFilterLevel: SafetyFilterLevel.BLOCK_MEDIUM_AND_ABOVE,
        personGeneration: PersonGeneration.ALLOW_ADULT
      }
    });
    
    // Get the first generated image
    if (response.generatedImages && response.generatedImages.length > 0) {
      const generatedImage = response.generatedImages[0];
      
      // Return as data URL (Imagen returns base64 in imageBytes)
      if (generatedImage.image?.imageBytes) {
        return `data:image/png;base64,${generatedImage.image.imageBytes}`;
      }
      
      // If GCS URI is provided instead
      if (generatedImage.image?.gcsUri) {
        return generatedImage.image.gcsUri;
      }
    }
    
    throw new Error('No image data returned from Imagen');
  } catch (error: any) {
    console.error('Thumbnail generation error:', error);
    throw new Error(`Imagen generation error: ${error.message || JSON.stringify(error)}`);
  }
};

export const runThumbnailBattle = async (segment: ViralSegment, stylePrefs: string, aspectRatio: AspectRatio): Promise<BattleResult> => {
  const ai = getAI();
  
  try {
    // Validate input
    if (!segment || !segment.title) {
      throw new Error('Invalid segment data provided');
    }

    const conceptResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ text: `Act as a viral designer. For this viral clip: "${segment.title}", create 3 distinct thumbnail prompts: A (High Emotion), B (Curiosity Hook/Text), C (Action/Context). Return JSON with keys A, B, C.` }],
      config: { responseMimeType: "application/json" }
    });
  
    // Wait before next API call
    await delay(API_DELAY);
    
    // Validate and parse concepts response
    if (!conceptResponse.text) {
      throw new Error('Empty response from concept generation');
    }
    
    let concepts;
    try {
      concepts = JSON.parse(conceptResponse.text);
    } catch (parseError) {
      throw new Error('Failed to parse concept generation response');
    }
    
    // Validate concepts structure
    if (!concepts.A || !concepts.B || !concepts.C) {
      throw new Error('Invalid concept response structure');
    }
    
    const variations: ThumbnailVariation[] = [
      { id: 'A', label: 'High Emotion', concept: concepts.A },
      { id: 'B', label: 'Curiosity Hook', concept: concepts.B },
      { id: 'C', label: 'Action/Context', concept: concepts.C },
    ];

    // Generate thumbnails sequentially with delays to avoid rate limiting
    const variationWithImages: ThumbnailVariation[] = [];
    for (const v of variations) {
      try {
        const imageData = await generateThumbnail(v.concept, stylePrefs, aspectRatio);
        variationWithImages.push({ ...v, imageData });
        await delay(API_DELAY); // Wait between each thumbnail generation
      } catch (thumbError: any) {
        console.error(`Failed to generate thumbnail for ${v.id}:`, thumbError);
        // Continue with other thumbnails even if one fails
        throw new Error(`Thumbnail generation failed for ${v.label}: ${thumbError.message}`);
      }
    }

    // Analyze thumbnail concepts and images for CTR prediction
    const predictionResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ 
        text: `Act as a YouTube algorithm expert. Analyze these 3 thumbnail concepts and predict which will get the highest CTR:

A (High Emotion): ${concepts.A}
B (Curiosity Hook): ${concepts.B}  
C (Action/Context): ${concepts.C}

Consider: emotional appeal, curiosity gap, clarity, text readability, color psychology, and pattern interruption.
Return JSON with 'winner' (A, B, or C) and 'analysis' (detailed explanation).` 
      }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            winner: { type: Type.STRING, enum: ['A', 'B', 'C'] },
            analysis: { type: Type.STRING }
          },
          required: ["winner", "analysis"]
        }
      }
    });

    // Validate prediction response
    if (!predictionResponse.text) {
      throw new Error('Empty response from prediction analysis');
    }
    
    let prediction;
    try {
      prediction = JSON.parse(predictionResponse.text);
    } catch (parseError) {
      throw new Error('Failed to parse prediction response');
    }
    
    // Validate prediction structure
    if (!prediction.winner || !prediction.analysis) {
      throw new Error('Invalid prediction response structure');
    }
    
    if (!['A', 'B', 'C'].includes(prediction.winner)) {
      throw new Error('Invalid winner value in prediction');
    }
    
    return { winner: prediction.winner, analysis: prediction.analysis, variations: variationWithImages };
  } catch (error: any) {
    console.error('Thumbnail battle error:', error);
    throw new Error(`Thumbnail battle failed: ${error.message || 'Unknown error'}`);
  }
};
