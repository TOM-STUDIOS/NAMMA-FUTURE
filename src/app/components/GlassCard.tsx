import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function GlassCard({ children, className = '', onClick, style }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`lm-card backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(139, 92, 246, 0.1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
