import React, { useState, useEffect } from 'react';
import { topbarMessages } from '../data/content';
import { XIcon } from './Icons';

export const TopBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem('mores-topbar-closed')) {
        setIsVisible(true);
      }
    } catch (e) {
      setIsVisible(true);
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused || reducedMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topbarMessages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isVisible, isPaused, reducedMotion]);

  if (!isVisible) return null;

  const handleClose = () => {
    try { sessionStorage.setItem('mores-topbar-closed', 'true'); } catch (e) { /* ignore */ }
    setIsVisible(false);
  };

  const currentMessage = topbarMessages[currentIndex];

  return (
    <div 
      className="bg-surface text-ivory/80 py-2 px-4 relative flex items-center justify-center text-xs font-light tracking-wide hairline-dark-b"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div 
        className="text-center w-full max-w-4xl pr-8 line-clamp-2 md:line-clamp-1 transition-opacity duration-[800ms]"
        aria-live="polite"
      >
        <span>{currentMessage.text} </span>
        <a href={currentMessage.href} className="text-copper hover:opacity-80 transition-opacity ml-1 font-medium">
          {currentMessage.linkLabel}
        </a>
      </div>
      
      {!reducedMotion && topbarMessages.length > 1 && (
        <div className="absolute bottom-0 flex gap-1.5 justify-center w-full pointer-events-none pb-[2px]">
          {topbarMessages.map((_, idx) => (
            <button
              key={idx}
              className={`w-4 h-[1px] pointer-events-auto transition-colors ${idx === currentIndex ? 'bg-copper' : 'bg-ivory/20'}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Komunikat ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <button 
        onClick={handleClose} 
        className="absolute right-2 p-1 text-ivory/40 hover:text-copper transition-colors outline-none focus-visible:ring-1 focus-visible:ring-copper"
        aria-label="Zamknij komunikat"
      >
        <XIcon className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  );
};