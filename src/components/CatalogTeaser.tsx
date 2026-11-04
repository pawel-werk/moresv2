import React from 'react';
import { Reveal } from './Reveal';
import { DownloadIcon, ArrowRight } from './Icons';
import { Logo } from './Logo';

export const CatalogTeaser: React.FC = () => {
  return (
    <section id="katalog-teaser" className="py-16 md:py-24 bg-surface relative hairline-dark-b" aria-labelledby="catalog-teaser-title">
      
      {/* Subtelne tło podbijające premium charakter */}
      <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-5 pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Kolumna lewa: Typografia i przyciski */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-copper" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                  Narzędzia pracy
                </span>
              </div>
              <h2 id="catalog-teaser-title" className="font-serif text-4xl md:text-5xl text-ivory leading-tight mb-6">
                Katalog kolekcji frontów
              </h2>
              <p className="text-ivory/70 text-lg font-light leading-relaxed mb-12 max-w-md">
                Zapoznaj się z naszymi standardowymi wzorami, rodzajami frezowań i wykończeniami. Pobierz materiały techniczne przygotowane z myślą o profesjonalistach.
              </p>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <a 
                  href="#/katalog" 
                  className="bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night px-8 py-4 text-[15px] font-medium hover:brightness-110 transition-all rounded-sm inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-surface shadow-[0_0_20px_rgba(184,107,62,0.15)] hover:shadow-[0_0_30px_rgba(184,107,62,0.25)]"
                >
                  Zobacz online <ArrowRight className="w-4 h-4 text-night" aria-hidden="true" />
                </a>
                
                <a 
                  href="/katalog/mores-katalog.pdf" 
                  download 
                  className="border border-ivory/20 text-ivory hover:border-copper hover:text-copper rounded-sm px-8 py-4 text-[15px] transition-colors inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <DownloadIcon className="w-4 h-4" aria-hidden="true" />
                  Pobierz PDF
                </a>
              </div>
            </Reveal>
          </div>

          {/* Kolumna prawa: Lewitująca okładka katalogu */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end">
            <Reveal delay={200} className="w-full flex justify-center lg:justify-end p-4 sm:p-8">
              <div className="relative w-64 sm:w-80 aspect-[1/1.414] group cursor-pointer perspective-1200">
                
                {/* Poświata za książką (rozmyty miedziany blask) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-copper/10 blur-[60px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:bg-copper/20" />
                
                {/* Obiekt książki 3D */}
                <a 
                  href="#/katalog"
                  className="block w-full h-full bg-night rounded-r-md rounded-l-sm border-l-[16px] border-copper shadow-[20px_20px_40px_rgba(0,0,0,0.5)] relative transition-transform duration-[600ms] ease-out group-hover:-translate-y-4 group-hover:scale-[1.03] group-hover:rotate-y-[-5deg] group-hover:rotate-x-[2deg] outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-8 focus-visible:ring-offset-surface"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Wnętrze okładki */}
                  <div className="flex flex-col justify-between h-full p-8 md:p-10 relative z-10">
                    <div className="relative">
                      <Logo className="h-5 opacity-90" variant="light" />
                      <div className="w-12 h-px bg-ivory/20 mt-8" />
                    </div>
                    
                    <div className="relative">
                      <h3 className="font-serif text-3xl md:text-4xl text-ivory leading-[1.1] mb-3">
                        Katalog<br/>frontów
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-dark">
                        Edycja / 2026
                      </p>
                    </div>
                  </div>
                  
                  {/* Żłobienie przy grzbiecie (iluzja oprawy) */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-black/60 pointer-events-none z-20" />
                  <div className="absolute left-1.5 top-0 bottom-0 w-px bg-white/10 pointer-events-none z-20" />
                </a>
                
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};