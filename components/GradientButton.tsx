import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ghost?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  onClick,
  className = '',
  ghost = false,
  disabled = false,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      className={`${ghost ? 'btn-ghost' : 'btn-primary'} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};
