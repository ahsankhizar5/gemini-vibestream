import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Sparkles, Zap, TrendingUp, Palette, Brain } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { GradientButton } from './GradientButton';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  onEnterApp: () => void;
  onShowcase: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onShowcase }) => {
  useEffect(() => {
    // Page load animation sequence
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
    .from('.hero-subtitle', { 
      opacity: 0, 
      duration: 0.5 
    }, '-=0.3');

    // Scroll-triggered animations for feature cards
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: <TrendingUp className="w-12 h-12 text-accent-cyan" />,
      title: 'Viral Clip Detection',
      description: 'AI analyzes emotional peaks and engagement patterns to extract the most shareable moments from your content.'
    },
    {
      icon: <Palette className="w-12 h-12 text-accent-purple" />,
      title: 'AI Thumbnail Generator',
      description: 'Powered by Imagen 3, create stunning thumbnails with A/B/C testing and CTR predictions.'
    },
    {
      icon: <Zap className="w-12 h-12 text-accent-pink" />,
      title: 'Sonic Signature Analysis',
      description: 'Detect silence, laughter, music drops, and audio cues that drive viewer retention.'
    },
    {
      icon: <Sparkles className="w-12 h-12 text-accent-cyan" />,
      title: 'Platform DNA Optimization',
      description: 'Get tailored captions, hashtags, and strategies for TikTok, YouTube, and Instagram.'
    },
    {
      icon: <Brain className="w-12 h-12 text-accent-purple" />,
      title: 'Creator DNA Analysis',
      description: 'Uncover your unique content archetype and winning formulas based on AI-powered insights.'
    },
    {
      icon: <Play className="w-12 h-12 text-accent-pink" />,
      title: 'Powered by Gemini',
      description: 'Leveraging Google Gemini 2.0 multimodal AI for next-level video intelligence.'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="gradient-orb" style={{ top: '10%', left: '10%' }} />
        <div className="gradient-orb" style={{ bottom: '20%', right: '15%', background: 'radial-gradient(circle, rgba(0, 245, 255, 0.2) 0%, transparent 70%)' }} />
        <div className="gradient-orb" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(181, 55, 242, 0.15) 0%, transparent 70%)', width: '800px', height: '800px' }} />
        <div className="grid-background absolute inset-0" />
        <div className="noise-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="logo mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-white" style={{fontFamily: 'var(--font-display)'}}>
                  VIBESTREAM
                </span>
              </div>
            </div>

            {/* Spline 3D Interactive Model */}
            <div className="mb-12 w-full flex justify-center">
              <div className="relative w-full" style={{ maxWidth: '900px', aspectRatio: '16/9' }}>
                <iframe 
                  src='https://my.spline.design/untitled-355705e7-5f04-4051-93d5-5007f7034ada/' 
                  frameBorder='0' 
                  width='100%' 
                  height='100%'
                  className="rounded-3xl shadow-2xl absolute inset-0"
                  style={{ border: 'none' }}
                  title="Interactive 3D Model"
                  loading="eager"
                  allowFullScreen
                />
              </div>
            </div>

            <h1 className="headline hero-headline gradient-text mb-6" style={{textShadow: '0 0 80px rgba(181, 55, 242, 0.5)'}}>
              TURN RAW FOOTAGE INTO VIRAL GOLD
            </h1>

            <p className="subhead text-2xl mb-12 max-w-3xl mx-auto" style={{lineHeight: 'var(--leading-relaxed)', color: 'rgba(255, 255, 255, 0.7)', textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)'}}>
              AI-Powered Content Strategist for Creators
            </p>

            <div className="cta-button flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton onClick={onEnterApp} className="text-xl px-12 py-5 pulse">
                <Sparkles className="w-6 h-6" />
                <span>Analyze Your First Video</span>
              </GradientButton>
              
              <button 
                onClick={onShowcase}
                className="text-base px-8 py-4 glass-panel border border-white/20 hover:border-indigo-500/50 rounded-2xl text-white font-bold transition-all hover:scale-105 flex items-center gap-3"
              >
                <TrendingUp className="w-5 h-5" />
                <span>View Viral Showcase</span>
              </button>
            </div>

            <p className="hero-subtitle text-sm text-text-muted mt-6">
              Powered by Google Gemini 2.0 & Imagen 3 • Free Forever
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="section-title gradient-text text-center mb-4">
              EVERYTHING YOU NEED TO GO VIRAL
            </h2>
            <p className="body-text text-center mb-16 max-w-2xl mx-auto">
              VibeStream combines cutting-edge AI with creator-first design to transform your content strategy in minutes.
            </p>

            <div className="features-grid">
              {features.map((feature, index) => (
                <GlassCard key={index} className="feature-card">
                  <div className="relative z-10">
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3" style={{fontFamily: 'var(--font-display)'}}>
                      {feature.title}
                    </h3>
                    <p className="body-text">
                      {feature.description}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="text-center mt-16">
              <GradientButton onClick={onEnterApp} className="text-lg px-10 py-4">
                <span>Get Started Now</span>
              </GradientButton>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-glass-border">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white" style={{fontFamily: 'var(--font-display)'}}>
                VIBESTREAM
              </span>
            </div>
            <p className="text-sm text-text-muted">
              Built for Google Gemini API Developer Competition 2025
            </p>
            <p className="text-xs text-text-muted mt-2">
              Transforming content creation with AI • Made with ❤️ by creators, for creators
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
