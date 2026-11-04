import React from 'react';
import { ArrowRight } from './Icons';
import { Reveal } from './Reveal';
import { Hero3D } from './Hero3D';
import { scrollToSection } from '../utils/scrollToSection';

export const Hero: React.FC = () => {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('#kontakt');
  };

  return (
    <section className="pt-20 pb-12 md:pt-24 md:pb-16 bg-night relative overflow-hidden flex items-center min-h-[100svh]">
      
      {/* Subtelne tekstury tła */}
      <div className="absolute inset-0 bg-noise opacity-70 pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          
          {/* Kolumna tekstowa */}
          <div className="max-w-2xl relative z-20">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-copper" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-copper">
                  Nowość: realizujemy zamówienia samych frontów
                </span>
              </div>
              
              {/* Główny nagłówek skompresowany, z mniejszym rozbitym wersem by nie spychać CTA */}
              <h1 className="font-serif text-ivory leading-[1.1] tracking-tight mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                Fronty meblowe i<br />
                zlecenia nietypowe.
                <span className="text-[clamp(1.5rem,2.5vw,2rem)] text-muted-dark italic font-light block mt-2">
                  Od cięcia po lakierowanie.
                </span>
              </h1>
            </Reveal>
            
            <Reveal delay={100}>
              <p className="text-lg text-ivory/70 font-light leading-relaxed mb-10 max-w-lg">
                Własne, kompletne zaplecze produkcyjne w jednym miejscu dla stolarzy i producentów mebli. Bez ograniczeń co do różnorodności i złożoności.
              </p>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href="#kontakt" 
                  onClick={handleContactClick}
                  className="bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night px-8 py-4 text-[15px] font-medium hover:brightness-110 transition-all rounded-sm inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-night shadow-[0_0_20px_rgba(184,107,62,0.15)] hover:shadow-[0_0_30px_rgba(184,107,62,0.25)]"
                >
                  Zapytaj o wycenę <ArrowRight className="w-4 h-4 text-night" aria-hidden="true" />
                </a>
                <a 
                  href="#/katalog" 
                  className="text-[15px] font-medium text-ivory/80 hover:text-copper transition-colors px-4 py-4 outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm"
                >
                  Zobacz katalog
                </a>
              </div>
            </Reveal>
          </div>

          {/* Kolumna wizualna - Kompozycja 3D */}
          <div className="relative flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
            <Reveal delay={300} className="w-full flex justify-center lg:justify-end">
              <Hero3D />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};