import React from 'react';
import { Reveal } from './Reveal';
import { Logo } from './Logo';

export const CatalogTeaser: React.FC = () => {
  return (
    <section id="katalog-teaser" className="py-16 md:py-24 bg-night text-ivory overflow-hidden hairline-dark-b" aria-labelledby="catalog-teaser-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
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
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href="#/katalog" 
                  className="bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night px-8 py-4 text-[15px] font-medium hover:brightness-110 transition-all inline-flex items-center gap-3 rounded-sm shadow-[0_0_20px_rgba(184,107,62,0.15)] outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-night"
                >
                  Zobacz online 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                
                <a 
                  href="/katalog.pdf" 
                  download="Mores_Katalog_Frontow_2026.pdf" 
                  className="flex items-center justify-center gap-2 px-6 py-4 border border-line-dark text-ivory/70 hover:text-copper hover:border-copper/50 transition-colors bg-transparent rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-copper"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Pobierz PDF
                </a>
              </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end">
            <Reveal delay={200} className="p-4 sm:p-8">
              <div className="relative w-64 sm:w-80 aspect-[1/1.414] group cursor-pointer perspective-1000">
                <div className="absolute -inset-4 bg-copper/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full pointer-events-none"></div>
                <a href="#/katalog" className="block w-full h-full bg-surface-2 rounded-r-md rounded-l-sm border-l-[16px] border-copper shadow-2xl relative overflow-hidden transition-all duration-[600ms] ease-out group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:-rotate-1">
                  <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
                  <div className="flex flex-col justify-between h-full p-8 md:p-10">
                    <div className="relative z-10">
                      <Logo className="h-5 opacity-80" variant="light" />
                      <div className="w-12 h-px bg-ivory/10 mt-8"></div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-serif text-3xl md:text-4xl text-ivory leading-[1.1] mb-3">
                        Katalog<br/>frontów
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-dark">
                        Edycja / 2026
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-black/50 pointer-events-none"></div>
                  <div className="absolute left-1.5 top-0 bottom-0 w-px bg-white/10 pointer-events-none"></div>
                </a>
              </div>
            </Reveal>
          </div>
          
        </div>
      </div>
    </section>
  );
};