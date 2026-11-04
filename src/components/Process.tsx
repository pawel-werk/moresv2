import React from 'react';
import { Reveal } from './Reveal';
import { FileTextIcon, CalculatorIcon, MachineIcon, TruckIcon } from './Icons';

const processSteps = [
  { 
    step: "01", 
    title: "Zapytanie", 
    desc: "Prześlij wymiary, wzór i ilości. Im więcej szczegółów, tym szybciej odpowiemy.", 
    icon: FileTextIcon 
  },
  { 
    step: "02", 
    title: "Wycena", 
    desc: "Otrzymasz od nas przejrzystą, wiążącą kalkulację kosztów projektu.", 
    icon: CalculatorIcon 
  },
  { 
    step: "03", 
    title: "Produkcja", 
    desc: "Precyzyjna obróbka i lakierowanie.",
    badges: ["Standard 14 dni", "Ekspres 7 dni"],
    icon: MachineIcon 
  },
  { 
    step: "04", 
    title: "Dostawa", 
    desc: "Odbiór osobisty w warsztacie lub bezpieczny transport naszej floty.", 
    icon: TruckIcon 
  }
];

export const Process: React.FC = () => {
  return (
    <section id="proces" className="py-16 md:py-24 bg-night relative hairline-dark-b" aria-labelledby="process-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal>
          <div className="mb-20 md:mb-28 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-copper" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                Krok po kroku
              </span>
            </div>
            <h2 id="process-title" className="font-serif text-4xl md:text-5xl text-ivory leading-tight mb-6">
              Jak złożyć zamówienie?
            </h2>
            <p className="text-ivory/70 text-lg font-light leading-relaxed">
              Prosty i przejrzysty proces od wyceny po gotowe fronty. Szanujemy Twój czas.
            </p>
          </div>
        </Reveal>
        
        <div className="relative">
          {/* Oś czasu - pozioma linia dla desktopu */}
          <div className="hidden lg:block absolute top-[1.75rem] left-[10%] right-[10%] h-[1px] bg-line-dark z-0">
            <Reveal variant="line" className="w-full h-full bg-copper/30" />
          </div>

          {/* Oś czasu - pionowa linia dla mobile */}
          <div className="lg:hidden absolute left-[27px] top-8 bottom-0 w-[1px] bg-line-dark z-0" aria-hidden="true" />

          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {processSteps.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.step} delay={i * 100}>
                  <div className="relative pl-16 lg:pl-0 group flex flex-col lg:items-center lg:text-center">
                    
                    {/* Węzeł na mobile (kropka na osi) */}
                    <div className="lg:hidden absolute left-[23px] top-[14px] w-[9px] h-[9px] bg-surface-2 border border-line-dark rounded-full group-hover:border-copper group-hover:bg-copper transition-colors duration-500 shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(184,107,62,0.4)]" />
                    
                    {/* Węzeł z Ikoną na desktopie */}
                    <div className="flex items-center gap-4 mb-6 lg:bg-night lg:px-6 z-10 relative">
                      <div className="w-14 h-14 rounded-full bg-surface border border-line-dark flex items-center justify-center group-hover:border-copper transition-colors duration-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(184,107,62,0.15)] absolute left-[-64px] top-[-6px] lg:relative lg:left-0 lg:top-0">
                        <Icon className="w-6 h-6 text-muted-dark group-hover:text-copper transition-colors duration-500" aria-hidden="true" />
                      </div>
                      <div className="font-serif text-5xl text-ivory/10 group-hover:text-copper transition-colors duration-500 hidden lg:block">
                        {p.step}
                      </div>
                    </div>

                    <div className="flex flex-col lg:items-center">
                      <div className="font-serif text-3xl text-ivory/10 group-hover:text-copper transition-colors duration-500 mb-1 lg:hidden">
                        {p.step}
                      </div>
                      <h3 className="font-serif text-2xl text-ivory mb-3 transition-colors duration-500 group-hover:text-copper">
                        {p.title}
                      </h3>
                      {p.desc && <p className="text-ivory/70 font-light leading-relaxed">{p.desc}</p>}
                      
                      {p.badges && (
                        <div className="flex flex-wrap justify-start lg:justify-center gap-2 mt-5">
                          {p.badges.map(b => (
                            <span key={b} className="inline-flex items-center justify-center border border-line-dark text-muted-dark text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm whitespace-nowrap bg-surface-2/50 group-hover:border-copper/30 transition-colors duration-500">
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
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