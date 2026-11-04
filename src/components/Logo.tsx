import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", variant = 'dark' }) => {
  // Zaktualizowano wariant light na nowy link
  const logoSrc = variant === 'light' 
    ? "https://i.postimg.cc/3wyMNBqg/logo-light2.png" 
    : "https://i.postimg.cc/FRBQG6L5/logo-2-2.png";

  return (
    <img 
      src={logoSrc} 
      alt="mores logo" 
      className={`object-contain ${className}`}
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