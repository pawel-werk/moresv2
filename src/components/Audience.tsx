import React from 'react';
import { Reveal } from './Reveal';
import { UsersIcon, FurnitureIcon, StoreIcon, ArchitectIcon } from './Icons';

const audiences = [
  { 
    title: "Stolarze i pracownie", 
    desc: "Zleć nam produkcję frontów lub trudnych elementów, a sam skup się na projekcie i montażu u klienta.",
    icon: UsersIcon
  },
  { 
    title: "Producenci mebli", 
    desc: "Skorzystaj z naszego zaplecza jako wsparcia przy dużych seriach lub specjalistycznych wykończeniach.",
    icon: FurnitureIcon
  },
  { 
    title: "Handlowcy i hurtownie", 
    desc: "Rozszerz swoją ofertę o wysokiej jakości fronty meblowe produkowane terminowo i powtarzalnie.",
    icon: StoreIcon
  },
  {
    title: "Architekci i projektanci",
    desc: "Zrealizujemy Twoje autorskie koncepcje i nietypowe wizje projektowe z dbałością o precyzję i każdy detal wykończenia.",
    icon: ArchitectIcon
  }
];

export const Audience: React.FC = () => {
  return (
    <section id="klienci" className="py-16 md:py-24 bg-night" aria-labelledby="audience-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-copper" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                Współpraca
              </span>
            </div>
            <h2 id="audience-title" className="font-serif text-4xl md:text-5xl text-ivory leading-tight">
              Dla kogo pracujemy?
            </h2>
          </div>
        </Reveal>
        
        <div className="hairline-dark-t">
          {audiences.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 100}>
                <div className="group relative flex flex-col md:flex-row md:items-center gap-6 py-10 md:py-12 hairline-dark-b hover:bg-surface-2 transition-colors duration-500 px-4 md:px-8 -mx-4 md:mx-0">
                  
                  <div className="absolute top-[-1px] left-0 right-0 h-[1px] bg-copper scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />

                  <div className="md:w-1/3 flex-shrink-0">
                    <h3 className="font-serif text-3xl md:text-4xl text-ivory transition-colors duration-500 group-hover:text-copper">
                      {item.title}
                    </h3>
                  </div>

                  {/* Opis - 1/2 szerokości */}
                  <div className="md:flex-1 md:pr-12 mt-2 md:mt-0">
                    <p className="text-ivory/70 font-light text-lg leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>

                  <div className="hidden md:flex flex-shrink-0 justify-end items-center text-ivory/20 transition-colors duration-500 group-hover:text-copper">
                    <Icon className="w-10 h-10 transform transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                  </div>
                  
                </div>
              </Reveal>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};