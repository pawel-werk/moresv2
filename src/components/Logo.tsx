import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = 'dark' }) => {
  const logoSrc = variant === 'light' 
    ? "https://i.postimg.cc/nzJc1X8T/mores-logo-v3-white.png?v=2" 
    : "https://i.postimg.cc/1tQ5K8xJ/mores-logo-v3.png?v=2";

  return (
    <img 
      src={logoSrc} 
      alt="mores logo" 
      style={{ height: '58px', width: 'auto', objectFit: 'contain' }}
      className={`max-h-full block ${className}`}
      loading="eager"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        e.currentTarget.nextElementSibling?.classList.remove('hidden');
      }}
    />
  );
};

export const LogoFallback: React.FC<{ variant?: 'dark' | 'light' }> = ({ variant = 'dark' }) => (
  <span className={`hidden font-serif font-bold text-2xl tracking-tight ${variant === 'light' ? 'text-white' : 'text-ink'}`}>
    mores
  </span>
);