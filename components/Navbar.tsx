import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Sparkles, Home, Settings, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onHomeClick?: () => void;
  isProcessing?: boolean;
  progress?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onHomeClick,
  isProcessing = false,
  progress = 0
}) => {
  useEffect(() => {
    // Slide down animation on mount
    gsap.from('.navbar', {
      y: -100,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
  }, []);

  return (
    <nav className="navbar flex items-center justify-between">
      {/* Logo */}
      <motion.div
        className="flex items-center gap-3 cursor-pointer"
        onClick={onHomeClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span
          className="text-xl font-bold text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          VIBESTREAM
        </span>
      </motion.div>

      {/* Progress Indicator */}
      {isProcessing && (
        <div className="flex-1 max-w-md mx-8">
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-text-secondary mt-2 text-center">
            Analyzing video...
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        {onHomeClick && (
          <button
            className="btn-ghost px-4 py-2"
            onClick={onHomeClick}
          >
            <Home className="w-4 h-4" />
          </button>
        )}
        <button className="btn-ghost px-4 py-2">
          <Settings className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </nav>
  );
};
