import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = 'dark' }) => {
  const logoSrc = variant === 'light' 
    ? "https://i.postimg.cc/G3gpXHht/logo-light.png" 
    : "https://i.postimg.cc/jq3jMLdD/logo.png";

  return (
    <img 
      src={logoSrc} 
      alt="mores logo" 
      style={{ height: '70px', width: 'auto', objectFit: 'contain' }}
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