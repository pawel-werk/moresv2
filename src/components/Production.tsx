import React from 'react';
import { Reveal } from './Reveal';
import { LayersIcon, CutIcon, PaintIcon, TruckIcon } from './Icons';

const steps = [
  { title: "Półprodukty", icon: LayersIcon },
  { title: "Formatyzacja", icon: CutIcon },
  { title: "Lakiernia", icon: PaintIcon },
  { title: "Magazyn i logistyka", icon: TruckIcon }
];

export const Production: React.FC = () => {
  return (
    <section id="produkcja" className="py-16 md:py-24 bg-surface relative overflow-hidden" aria-labelledby="production-title">
      
      {/* Ciemne tekstury premium */}
      <div className="absolute inset-0 bg-rings opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-10 pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20 md:mb-28">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-copper" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                  Park technologiczny
                </span>
              </div>
              <h2 id="production-title" className="font-serif text-4xl md:text-5xl text-ivory leading-tight">
                Wszystko pod <br className="hidden lg:block"/> jednym dachem
              </h2>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-4 lg:mt-0">
              <Reveal delay={100}>
                <p className="text-ivory/70 font-light leading-relaxed">
                  Największą przewagą mores jest kompletne zaplecze produkcyjne. Posiadając zaplecze do formatyzacji, własną lakiernię oraz obszerny magazyn, zdejmujemy z Ciebie problem szukania podwykonawców.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-ivory/70 font-light leading-relaxed">
                  Dzięki temu nie mamy ograniczeń co do różnorodności i kompleksowości zleceń. Zyskujesz jeden punkt kontaktu, pełną kontrolę jakości i pewność realizacji bez zbędnych opóźnień.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
        
        {/* Wizualna oś procesu produkcji zamiast siatki kafelków */}
        <div className="relative mt-8">
          {/* Pozioma linia osi na desktopie */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[12.5%] right-[12.5%] h-[1px] bg-line-dark" aria-hidden="true">
            <Reveal variant="line" className="w-full h-full bg-copper/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const number = String(i + 1).padStart(2, '0');
              
              return (
                <Reveal key={step.title} delay={i * 150} className="relative group">
                  <div className="flex flex-col items-center text-center">
                    
                    {/* Węzeł na osi */}
                    <div className="w-20 h-20 rounded-full bg-night border border-line-dark flex items-center justify-center relative z-10 mb-6 group-hover:border-copper transition-colors duration-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(184,107,62,0.15)]">
                      <Icon className="w-8 h-8 text-muted-dark group-hover:text-copper transition-colors duration-500" aria-hidden="true" />
                    </div>
                    
                    {/* Numeracja i Tytuł */}
                    <div className="font-serif text-4xl text-ivory/10 group-hover:text-copper transition-colors duration-500 mb-2">
                      {number}
                    </div>
                    <h3 className="font-serif text-xl lg:text-[22px] text-ivory group-hover:text-copper transition-colors duration-500">
                      {step.title}
                    </h3>

                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};