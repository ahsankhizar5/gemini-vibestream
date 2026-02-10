<div align="center">

# ✨ VIBESTREAM

### AI-Powered Viral Content Hunter

*Transform Raw Footage Into Viral Gold*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Google AI](https://img.shields.io/badge/Google_AI-Gemini_&_Imagen-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

[🚀 Live Demo](#) • [📖 Documentation](./DOCUMENTATION.md) • [🎨 Design Guide](./DESIGN_QUICK_REFERENCE.md) • [🛡️ Error Handling](./ERROR_HANDLING_REPORT.md)

---

</div>

## 🎯 What is VibeStream?

**VibeStream** is an intelligent content strategist that analyzes your videos and identifies viral-worthy moments using Google's cutting-edge AI models. Whether you're a YouTuber, TikToker, or Instagram creator, VibeStream helps you:

- 🎬 **Extract Viral Clips** - AI identifies the most engaging segments from long-form content
- 🖼️ **Generate Thumbnails** - Imagen 3 creates eye-catching thumbnails optimized for clicks
- 📊 **Emotional Arc Mapping** - Visualize viewer engagement throughout your video
- 🧬 **Creator DNA Analysis** - Understand your unique content style and virality patterns
- ⚔️ **A/B/C Thumbnail Testing** - AI predicts which thumbnail will perform best
- 🎯 **Platform Optimization** - Get tailored captions and metadata for each social platform

---

## ✨ Features

### 🤖 AI-Powered Analysis
- **Gemini 3 Flash Preview** for multimodal video content understanding
- **Imagen 3** for professional thumbnail generation
- Real-time emotional intensity tracking
- Viral moment detection with confidence scores

### 🎨 Stunning UI/UX
- Glassmorphic cyber-luxe design system
- GSAP-powered scroll animations
- Framer Motion component transitions
- Interactive 3D Spline model on hero section
- Fully responsive (mobile, tablet, desktop)

### 🛡️ Production-Ready
- Comprehensive error handling with detailed user feedback
- Input validation (file type, size, duration)
- Rate limiting protection for API calls
- TypeScript strict mode for type safety
- Modular service architecture

### 📈 Viral DNA Showcase
- Global analytics dashboard
- Case studies of viral hits
- Platform-specific performance metrics
- AI-generated insights and recommendations

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **Google Gemini API Key** ([Get one here](https://aistudio.google.com/app/apikey))
- Modern browser with ES2020+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gemini-vibestream.git
   cd gemini-vibestream
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   > ⚠️ **Important**: Never commit your API key to version control. The `.env` file is already in `.gitignore`.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in terminal)

---

## 🏗️ Project Structure

```
gemini-vibestream/
│
├── 📄 App.tsx                    # Main app router & state management
├── 📄 index.tsx                  # React root entry point
├── 📄 index.html                 # HTML template with meta tags
├── 📄 types.ts                   # TypeScript type definitions
│
├── 🎨 components/
│   ├── LandingPage.tsx           # Hero landing with GSAP animations
│   ├── VideoUploader.tsx         # File upload with validation
│   ├── ResultCard.tsx            # Viral clip display cards
│   ├── EmotionalArcMap.tsx       # Engagement line chart
│   ├── ThumbnailBattle.tsx       # A/B/C test simulator
│   ├── VibeMatchReport.tsx       # Creator DNA insights
│   └── VibeDNAShowcase.tsx       # Viral hits showcase page
│
├── 🔧 services/
│   ├── geminiService.ts          # Gemini & Imagen API integration
│   └── videoService.ts           # Video processing utilities
│
├── 📚 Documentation/
│   ├── DOCUMENTATION.md          # Comprehensive project docs
│   ├── DESIGN_QUICK_REFERENCE.md # UI/UX design system
│   └── ERROR_HANDLING_REPORT.md  # Error handling audit
│
└── 📦 Configuration/
    ├── package.json              # Dependencies & scripts
    ├── tsconfig.json             # TypeScript configuration
    ├── vite.config.ts            # Vite build configuration
    └── .env                      # Environment variables (gitignored)
```

---

## 🎮 Usage Guide

### 1️⃣ Upload Your Video
- Supports **MP4** and **QuickTime (MOV)** formats
- Maximum file size: **100MB**
- Maximum duration: **5 minutes**
- Files are validated before upload

### 2️⃣ Configure Analysis
- **Visual Style**: Choose thumbnail aesthetic (dramatic, minimalist, vibrant, etc.)
- **Aspect Ratio**: Select platform (9:16 for TikTok/Reels, 16:9 for YouTube, 1:1 for Instagram)
- **Content Focus**: Specify what to emphasize (reactions, gameplay, storytelling, etc.)

### 3️⃣ AI Processing
- Gemini analyzes full video for:
  - Viral-worthy segments (with timestamps)
  - Emotional intensity over time
  - Creator style patterns
  - Platform-specific optimizations

### 4️⃣ Review Results
- **Viral Clips**: Top 3-5 segments with confidence scores
- **Thumbnails**: Imagen-generated images for each clip
- **A/B/C Testing**: Predict best-performing thumbnail
- **Export**: Download clips with metadata

### 5️⃣ Explore Showcase
- View AI-generated viral case studies
- Learn from high-performing content patterns
- Get platform-specific strategy insights

---

## 🛠️ Tech Stack

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.4 | UI component library |
| **TypeScript** | 5.8 | Type-safe development |
| **Vite** | 6.2 | Lightning-fast build tool |

### AI & Machine Learning
| Service | Model | Use Case |
|---------|-------|----------|
| **Google Gemini** | `gemini-3-flash-preview` | Video analysis, concept generation |
| **Google Imagen** | `imagen-3.0-generate-001` | Thumbnail image synthesis |

### UI/UX Libraries
| Library | Purpose |
|---------|---------|
| **GSAP** | Scroll-triggered animations |
| **Framer Motion** | Component transitions |
| **Lucide React** | Icon library |
| **Tailwind CSS** | Utility-first styling |

### Video Processing
| Library | Purpose |
|---------|---------|
| **@ffmpeg/ffmpeg** | Browser-based video editing |
| **@ffmpeg/util** | FFmpeg utilities |

---

## 🎨 Design System

### Color Palette
```css
/* Primary Gradient */
--gradient-primary: linear-gradient(135deg, #B537F2 0%, #EC4899 50%, #3B82F6 100%);

/* Core Colors */
--purple: #B537F2;    /* Primary actions */
--pink: #EC4899;      /* Accents & highlights */
--cyan: #00F5FF;      /* Interactive elements */
--blue: #3B82F6;      /* Secondary actions */
```

### Typography
- **Display Font**: Bebas Neue (headings, logos)
- **Body Font**: Outfit (body text, UI)
- **Code Font**: System monospace (code blocks)

### Components
- **Glass Cards**: Backdrop blur + gradient borders
- **Buttons**: Glass morphism with hover effects
- **Inputs**: Cyber-luxe styling with focus states

---

## 🔧 Configuration

### Environment Variables

```env
# Required
GEMINI_API_KEY=your_gemini_api_key

# Optional (with defaults)
VITE_APP_TITLE=VibeStream
VITE_MAX_FILE_SIZE=104857600  # 100MB in bytes
VITE_MAX_DURATION=300         # 5 minutes in seconds
```

### API Rate Limits

Current implementation includes:
- **2-second delays** between sequential API calls
- Automatic retry logic (planned)
- Quota management (in roadmap)

---

## 📊 Performance

### Optimization Features
- ✅ Code splitting with dynamic imports
- ✅ Lazy loading for heavy components
- ✅ Optimized bundle size (~500KB gzipped)
- ✅ Fast refresh for instant HMR
- ✅ Tree-shaking for unused code

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🐛 Error Handling

VibeStream includes comprehensive error handling:

- **Input Validation**: File type, size, duration, corruption checks
- **API Errors**: Detailed messages for quota, authentication, network issues
- **User Feedback**: Contextual error banners with actionable solutions
- **Graceful Degradation**: Fallbacks for failed API calls

See [ERROR_HANDLING_REPORT.md](./ERROR_HANDLING_REPORT.md) for full audit.

---

## 🚧 Roadmap

### 🔜 Coming Soon
- [ ] Multi-language support (i18n)
- [ ] Batch video processing
- [ ] Video export with burned-in thumbnails
- [ ] Custom branding overlays
- [ ] Analytics dashboard
- [ ] Team collaboration features

### 💡 Future Ideas
- [ ] Chrome extension for quick analysis
- [ ] Mobile app (React Native)
- [ ] Plugin system for custom workflows
- [ ] Integration with major platforms (YouTube, TikTok APIs)
- [ ] Community-shared viral templates

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript strict mode
- Write descriptive commit messages
- Add JSDoc comments for functions
- Test on multiple browsers
- Update documentation for new features

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google AI Studio** - For Gemini & Imagen API access
- **Spline** - For interactive 3D models
- **GSAP** - For powerful animation tools
- **Framer Motion** - For delightful component animations
- **The Creator Community** - For inspiration and feedback

---

## 📞 Support

### Need Help?

- 📖 Check the [Documentation](./DOCUMENTATION.md)
- 🐛 [Report a Bug](https://github.com/yourusername/gemini-vibestream/issues)
- 💡 [Request a Feature](https://github.com/yourusername/gemini-vibestream/issues)
- 💬 [Join Discord](#) (coming soon)

### Useful Resources

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Imagen 3 Documentation](https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview)
- [React 19 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

<div align="center">

Made with 💜 by the VibeStream Team

**[⬆ Back to Top](#-vibestream)**

</div>
