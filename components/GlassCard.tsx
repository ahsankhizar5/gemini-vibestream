import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  gradient = false,
  onClick
}) => {
  return (
    <div
      className={`${gradient ? 'glass-card-gradient' : 'glass-card'} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
