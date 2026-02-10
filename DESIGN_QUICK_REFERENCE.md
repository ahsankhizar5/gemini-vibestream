# VibeStream Design Quick Reference

## 🎨 Color Palette

```css
/* Copy-paste into your CSS */
:root {
  /* === BASE COLORS === */
  --bg-primary: #0a0a0f;        /* Deep space black */
  --bg-secondary: #16161d;      /* Card background */
  --bg-tertiary: #1f1f28;       /* Elevated surface */
  
  /* === GLASS MORPHISM === */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-hover-bg: rgba(255, 255, 255, 0.08);
  --glass-hover-border: rgba(255, 255, 255, 0.15);
  
  /* === TEXT === */
  --text-primary: #ffffff;
  --text-secondary: #a8a8b3;
  --text-muted: #6b6b76;
  
  /* === GRADIENTS === */
  --gradient-primary: linear-gradient(135deg, #00f5ff 0%, #b537f2 50%, #ff006e 100%);
  --gradient-hover: linear-gradient(135deg, #00d9ff 0%, #a020e0 50%, #ff1a7a 100%);
  --gradient-subtle: linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, rgba(181, 55, 242, 0.1) 50%, rgba(255, 0, 110, 0.1) 100%);
  
  /* === ACCENT COLORS === */
  --accent-cyan: #00f5ff;
  --accent-purple: #b537f2;
  --accent-pink: #ff006e;
  
  /* === SEMANTIC === */
  --success: #00ff88;
  --warning: #ffaa00;
  --error: #ff4444;
  
  /* === SHADOWS === */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 40px rgba(181, 55, 242, 0.4);
}
```

---

## 📝 Typography System

### Font Imports (Add to index.html)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Option A: Bold & Modern -->
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Option B: Techy & Clean -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### CSS Variables
```css
:root {
  /* Font Families */
  --font-display: 'Bebas Neue', sans-serif;  /* Headlines */
  --font-body: 'Outfit', sans-serif;          /* Body text */
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px - Labels */
  --text-sm: 0.875rem;     /* 14px - Small text */
  --text-base: 1rem;       /* 16px - Body */
  --text-lg: 1.125rem;     /* 18px - Large body */
  --text-xl: 1.25rem;      /* 20px - Subheadings */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px - Section titles */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px - Page titles */
  --text-7xl: 4.5rem;      /* 72px */
  --text-8xl: 6rem;        /* 96px - Hero headline desktop */
  
  /* Line Heights */
  --leading-tight: 1.1;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Usage Examples
```css
/* Hero Headline */
.hero-headline {
  font-family: var(--font-display);
  font-size: var(--text-8xl);      /* 96px on desktop */
  line-height: var(--leading-tight);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
}

/* Body Text */
.body-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--text-secondary);
}

/* Card Title */
.card-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--text-primary);
  letter-spacing: 0.02em;
}
```

---

## 🪟 Glassmorphism Components

### Basic Glass Card
```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: var(--glass-hover-bg);
  border-color: var(--glass-hover-border);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

### Glass Card with Gradient Border
```css
.glass-card-gradient {
  position: relative;
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 24px;
  overflow: hidden;
}

.glass-card-gradient::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: var(--gradient-primary);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

### Frosted Navbar
```css
.navbar {
  position: sticky;
  top: 0;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--glass-border);
  z-index: 1000;
  padding: 16px 32px;
}
```

---

## 🎭 Button Styles

### Primary Gradient Button
```css
.btn-primary {
  position: relative;
  background: var(--gradient-primary);
  color: white;
  padding: 14px 32px;
  border-radius: 12px;
  border: none;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-lg);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-hover);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-glow);
}

.btn-primary:hover::before {
  opacity: 1;
}

.btn-primary span {
  position: relative;
  z-index: 1;
}
```

### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  padding: 12px 28px;
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  font-family: var(--font-body);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-ghost:hover {
  background: var(--glass-bg);
  border-color: var(--glass-hover-border);
  transform: translateY(-2px);
}
```

---

## ✨ Animation Utilities

### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Add delays for stagger effect */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
```

### Gradient Rotation
```css
@keyframes rotate-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-animate {
  background: var(--gradient-primary);
  background-size: 200% 200%;
  animation: rotate-gradient 3s ease infinite;
}
```

### Pulse Glow
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(181, 55, 242, 0.4);
  }
  50% {
    box-shadow: 0 0 40px rgba(181, 55, 242, 0.8);
  }
}

.pulse {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

### Scale In
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

---

## 🎯 GSAP Animation Snippets

### Page Load Sequence
```typescript
import { gsap } from 'gsap';
import { useEffect } from 'react';

function LandingPage() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.logo', { 
      opacity: 0, 
      scale: 0.8, 
      duration: 0.6 
    })
    .from('.headline', { 
      opacity: 0, 
      y: 50, 
      duration: 0.8 
    }, '-=0.3')
    .from('.subhead', { 
      opacity: 0, 
      y: 30, 
      duration: 0.6 
    }, '-=0.4')
    .from('.cta-button', { 
      opacity: 0, 
      scale: 0.8, 
      duration: 0.5 
    }, '-=0.3')
    .from('.mockup-image', { 
      opacity: 0, 
      x: 100, 
      duration: 1 
    }, '-=0.6');
  }, []);

  return (
    // JSX...
  );
}
```

### Scroll-Triggered Cards
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FeatureCards() {
  useEffect(() => {
    gsap.fromTo('.feature-card',
      { 
        opacity: 0, 
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    // JSX...
  );
}
```

### Tab Switch Animation
```typescript
function switchTab(newTabId: string) {
  const oldContent = document.querySelector('.tab-content.active');
  const newContent = document.querySelector(`#${newTabId}`);
  
  if (!oldContent || !newContent) return;
  
  const tl = gsap.timeline();
  
  // Fade out old content
  tl.to(oldContent, {
    opacity: 0,
    x: -30,
    duration: 0.2,
    onComplete: () => {
      oldContent.classList.remove('active');
    }
  });
  
  // Fade in new content
  tl.fromTo(newContent,
    { 
      opacity: 0, 
      x: 30 
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.3,
      onStart: () => {
        newContent.classList.add('active');
      }
    }
  );
}
```

### Circular Progress Animation
```typescript
function ViralityScore({ score }: { score: number }) {
  const circleRef = useRef<SVGCircleElement>(null);
  
  useEffect(() => {
    if (!circleRef.current) return;
    
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;
    
    gsap.fromTo(circleRef.current,
      { strokeDashoffset: circumference },
      { 
        strokeDashoffset: offset,
        duration: 1.5,
        ease: 'power2.out'
      }
    );
  }, [score]);

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle
        cx="50" cy="50" r="45"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="6"
      />
      <circle
        ref={circleRef}
        cx="50" cy="50" r="45"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="6"
        strokeDasharray={2 * Math.PI * 45}
        strokeDashoffset={2 * Math.PI * 45}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="50%" stopColor="#b537f2" />
          <stop offset="100%" stopColor="#ff006e" />
        </linearGradient>
      </defs>
      <text
        x="50" y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="24"
        fontWeight="600"
      >
        {score}
      </text>
    </svg>
  );
}
```

---

## 📐 Layout Patterns

### Centered Hero Section
```css
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 1200px;
  text-align: center;
  z-index: 10;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  /* Add gradient orbs, particles, etc. */
}
```

### Two-Column App Layout
```css
.app-container {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 24px;
  padding: 24px;
  min-height: calc(100vh - 80px); /* Subtract navbar height */
}

/* Responsive */
@media (max-width: 1024px) {
  .app-container {
    grid-template-columns: 1fr;
  }
}
```

### Feature Grid
```css
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 80px 32px;
  max-width: 1400px;
  margin: 0 auto;
}
```

---

## 🎨 Special Effects

### Gradient Orb Background
```css
.gradient-orb {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(181, 55, 242, 0.3) 0%, transparent 70%);
  filter: blur(80px);
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}
```

### Noise Texture Overlay
```css
.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="4"/></filter><rect width="300" height="300" filter="url(%23noise)" opacity="0.05"/></svg>');
  pointer-events: none;
  z-index: 1;
}
```

### Grid Background
```css
.grid-background {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

---

## 🚀 Quick Start Checklist

1. **Copy color variables** → Paste into `index.css` or `App.css`
2. **Add font imports** → Paste into `index.html` `<head>`
3. **Create `components/` folder** with:
   - `GlassCard.tsx`
   - `GradientButton.tsx`
   - `CircularProgress.tsx`
   - `LoadingSpinner.tsx`
4. **Install GSAP**: `npm install gsap @gsap/react`
5. **Create `LandingPage.tsx`** with hero section
6. **Refactor `App.tsx`** to glassmorphic design
7. **Test animations** on load and scroll

---

## 💡 Pro Tips

1. **Use CSS Variables**: Makes theme changes instant
2. **Mobile First**: Design mobile layout first, then scale up
3. **Optimize Animations**: Target `transform` and `opacity` only for 60fps
4. **Accessibility**: Ensure text has 4.5:1 contrast ratio minimum
5. **Loading States**: Every API call needs a loading indicator
6. **Error Handling**: Design error states, not just happy paths
7. **Performance**: Use `React.memo()` for components that don't change often
8. **Git Commits**: Commit after each major feature (easy rollback)

---

**Ready to build? Start with the landing page hero section - get that "wow" factor working first!** 🚀
