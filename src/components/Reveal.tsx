import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: 'fade' | 'clip' | 'line' | 'slide-up';
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  delay = 0, 
  className = '',
  variant = 'fade'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Bezpieczne sprawdzanie preferencji ruchu
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(([entry]) => {
      // Gdy element choć trochę wejdzie w kadr
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { 
      threshold: 0.05, // Drastycznie obniżony próg (5% widoczności wystarczy)
      rootMargin: '50px' // Odpala animację nieco zanim element wejdzie na ekran
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Wspólne parametry płynnego, edytorskiego ruchu
  const baseStyles = "transition-all ease-[cubic-bezier(0.16,1,0.3,1)]";
  
  let variantStyles = "";
  let hiddenStyles = "";
  let visibleStyles = "";

  switch (variant) {
    case 'clip':
      // Eleganckie, duże i pewne wysunięcie z dołu
      variantStyles = "duration-[1200ms]";
      hiddenStyles = "opacity-0 translate-y-12";
      visibleStyles = "opacity-100 translate-y-0";
      break;
    case 'line':
      // Rysowanie poziomych osi czasu i separatorów
      variantStyles = "duration-[1000ms] origin-left";
      hiddenStyles = "scale-x-0 opacity-0";
      visibleStyles = "scale-x-100 opacity-100";
      break;
    case 'slide-up':
      // Nowy wariant dla galerii (wyraźniejszy ruch w górę)
      variantStyles = "duration-[1000ms]";
      hiddenStyles = "opacity-0 translate-y-16";
      visibleStyles = "opacity-100 translate-y-0";
      break;
    case 'fade':
    default:
      // Subtelny fade do tekstów
      variantStyles = "duration-[1000ms]";
      hiddenStyles = "opacity-0 translate-y-2"; 
      visibleStyles = "opacity-100 translate-y-0";
      break;
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${baseStyles} ${variantStyles} ${isVisible ? visibleStyles : hiddenStyles} ${className}`.trim()}
    >
      {children}
    </div>
  );
};