# 🌊 VibeStream - AI-Powered Viral Content Hunter

> Transform your videos into viral moments with AI-powered emotional analysis, thumbnail generation, and platform-optimized captions.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)

## 🎯 Overview

VibeStream leverages Google's Gemini AI (multimodal) to analyze your raw video footage and extract the most viral-worthy moments. It provides:

- **Emotional Arc Mapping** - Track intensity spikes second-by-second
- **Viral Clip Extraction** - Top 3 moments ranked by engagement potential  
- **Sonic Signature Analysis** - Audio cues, music drops, and pacing insights
- **AI Thumbnail Generation** - Multiple concepts with A/B testing predictions
- **Platform DNA** - Optimized captions for TikTok, YouTube, and Instagram
- **Creator Archetype** - Personality-based content strategy recommendations

---

## ✨ Features

### 🎬 Video Analysis
- **Multimodal AI Processing** using Gemini 3 Flash Preview
- **Emotional intensity tracking** every 3-5 seconds
- **Audio reasoning** (laughs, silence, music sync, pacing)
- **Virality scoring** (1-10 scale) for each segment

### 📊 Visualization
- **Emotional Arc Map** - Interactive SVG chart with hover tooltips
- **Engagement Graph** - Predicted viewer retention curves
- **Stats Dashboard** - Peak scores, data points, intensity metrics

### 🖼️ Thumbnail Battle Royale
- **AI-generated thumbnails** (High Emotion, Curiosity Hook, Action/Context)
- **Head-to-head VS layout** with winner prediction
- **Algorithmic CTR analysis** based on color, emotion, and composition

### 📱 Platform DNA
- **TikTok-optimized** captions with hooks and trending hashtags
- **YouTube-style** long-form descriptions with timestamps
- **Instagram Reels** formatting with emoji and engagement CTAs
- **One-click copy** for all caption variations

### 🧬 Creator VibeMatch
- **Archetype identification** (e.g., "The Chaotic Educator")
- **Audience prediction** insights
- **Winning formula** strategic recommendations

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))

### Installation

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd gemini-vibestream

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Gemini API key to .env.local
# GEMINI_API_KEY=your_key_here
\`\`\`

### Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

---

## 🏗️ Architecture

\`\`\`
gemini-vibestream/
├── components/
│   ├── EmotionalArcMap.tsx      # Interactive emotion timeline chart
│   ├── EngagementGraph.tsx      # Viewer retention predictions
│   ├── PlatformDNA.tsx          # TikTok/YouTube/Instagram captions
│   ├── ResultCard.tsx           # Viral clip card with thumbnails
│   ├── ThumbnailBattle.tsx      # A/B/C thumbnail comparison
│   ├── VibeMatchReport.tsx      # Creator personality analysis
│   ├── VideoUploader.tsx        # Drag-and-drop upload
│   └── SkeletonCard.tsx         # Loading state placeholders
├── services/
│   ├── geminiService.ts         # Gemini API integration
│   └── videoService.ts          # FFmpeg video trimming
├── App.tsx                      # Main application component
├── types.ts                     # TypeScript interfaces
├── index.css                    # Glassmorphism design system
└── vite.config.ts              # Vite configuration
\`\`\`

---

## 🎨 Design System

### Color Palette
- **Primary**: Purple (`#8b5cf6`)
- **Secondary**: Pink (`#ec4899`)
- **Accent**: Blue (`#3b82f6`)
- **Background**: Dark Slate (`#020617`)

### UI Components
- **Glassmorphism panels** with `backdrop-blur`
- **Animated gradients** that shift dynamically
- **Framer Motion** page transitions
- **Lucide React** icon library
- **Inter font** family for modern typography

---

## 🔧 Configuration

### Environment Variables

\`\`\`env
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

### Gemini Models Used

| Feature | Model | Purpose |
|---------|-------|---------|
| Video Analysis | `gemini-3-flash-preview` | Multimodal content analysis |
| Thumbnail Generation | `gemini-2.5-flash-image` | AI image synthesis |
| Battle Prediction | `gemini-3-flash-preview` | CTR algorithm simulation |

---

## 📖 API Response Structure

### AnalysisResult

\`\`\`typescript
interface AnalysisResult {
  viral_clips: ViralSegment[];      // Top 3 moments
  emotional_arc: EmotionalArcPoint[]; // Second-by-second intensity
  creator_dna: CreatorDNA;           // Personality archetype
}
\`\`\`

### ViralSegment

\`\`\`typescript
interface ViralSegment {
  start_time: string;           // "0:15"
  end_time: string;             // "0:28"
  virality_score: number;       // 1-10
  title: string;                // "Epic Comeback Moment"
  reason: string;               // Why it's viral-worthy
  thumbnail_description: string; // AI prompt for thumbnail
  audio_reasoning: string;      // Sonic analysis
  audio_intensity: number;      // 0-100%
}
\`\`\`

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 6.2
- **AI Integration**: Google Gemini API (@google/genai)
- **Animation**: Framer Motion 12.33
- **Icons**: Lucide React 0.563
- **Video Processing**: FFmpeg.wasm 0.12
- **Styling**: Tailwind CSS + Custom CSS

---

## 🎯 Use Cases

### Content Creators
- Identify the best 30-second clips for TikTok/Reels
- Generate eye-catching thumbnails automatically
- Optimize captions for each platform

### Video Editors
- Find emotional peaks for highlight reels
- Predict viewer retention drop-off points
- A/B test thumbnail concepts before publishing

### Marketing Teams
- Extract viral moments from long-form content
- Repurpose webinars into social media clips
- Analyze competitor content strategies

---

## 🚧 Roadmap

- [ ] Add Recharts/Chart.js for advanced analytics
- [ ] Multi-video batch processing
- [ ] Export clips directly (enhanced FFmpeg integration)
- [ ] Social media API integrations (auto-post)
- [ ] Team collaboration features
- [ ] Custom AI training on brand voice

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for multimodal capabilities
- **Framer Motion** for smooth animations
- **Lucide Icons** for beautiful icon system
- **FFmpeg.wasm** for client-side video processing

---

## 📞 Support

For questions or issues:
- Open an [Issue](https://github.com/yourusername/vibestream/issues)
- Email: support@vibestream.ai
- Discord: [Join our community](#)

---

## 🌟 Star History

If you find VibeStream useful, please consider giving it a ⭐ on GitHub!

---

**Built with ❤️ for content creators by the VibeStream team**
