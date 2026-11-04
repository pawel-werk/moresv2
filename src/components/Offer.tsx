import React from 'react';
import { Reveal } from './Reveal';
import { FrontIcon, PaintIcon, CutIcon, CustomIcon, LayersIcon, TruckIcon } from './Icons';

const services = [
  { 
    title: "Fronty meblowe", 
    desc: "Szeroki wybór wykończeń. Tworzymy fronty frezowane, gładkie, MDF, akrylowe, fornirowane – zgodnie z aktualnymi trendami.",
    icon: FrontIcon
  },
  { 
    title: "Lakierowanie", 
    desc: "Własna, nowoczesna lakiernia gwarantująca powtarzalność i najwyższą jakość powierzchni matowych i w połysku.",
    icon: PaintIcon
  },
  { 
    title: "Cięcie i formatowanie", 
    desc: "Precyzyjna formatyzacja przygotowująca materiały do dalszej obróbki szybko i z optymalizacją odpadu.",
    icon: CutIcon
  },
  { 
    title: "Zlecenia nietypowe", 
    desc: "Zabudowy na wymiar, jednostkowe serie i realizacje projektów specjalnych, które wymagają indywidualnego podejścia.",
    icon: CustomIcon
  },
  { 
    title: "Półprodukty", 
    desc: "Bezpośredni dostęp do płyt, oklein i materiałów niezbędnych do szybkiego uruchomienia produkcji.",
    icon: LayersIcon
  },
  { 
    title: "Logistyka", 
    desc: "Magazynowanie i bezpieczne dostawy własnym transportem do warsztatu stolarza lub na miejsce montażu.",
    icon: TruckIcon
  },
];

export const Offer: React.FC = () => {
  return (
    <section id="oferta" className="py-16 md:py-24 bg-night relative z-10" aria-labelledby="offer-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* Lewa kolumna - Sticky Nagłówek */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-copper" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                  Kompleksowość
                </span>
              </div>
              <h2 id="offer-title" className="font-serif text-4xl md:text-5xl text-ivory leading-tight">
                Nasza oferta
              </h2>
              <p className="text-ivory/70 text-lg font-light leading-relaxed mt-6 max-w-sm">
                Kompleksowe wsparcie dla branży meblarskiej.
              </p>
            </Reveal>
          </div>
          
          {/* Prawa kolumna - Lista edytorska */}
          <div className="lg:col-span-8">
            <div className="hairline-dark-b">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                const number = String(i + 1).padStart(2, '0');
                
                return (
                  <Reveal key={svc.title} delay={i * 100}>
                    <div className="group relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10 py-10 px-4 md:px-8 hairline-dark-t hover:bg-surface-2 transition-colors duration-500">
                      
                      {/* Rysująca się linia akcentowa w kolorze copper */}
                      <div className="absolute top-[-1px] left-0 right-0 h-[1px] bg-copper scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      
                      {/* Duża, szeryfowa numeracja */}
                      <div className="font-serif text-4xl md:text-5xl text-ivory/10 group-hover:text-copper transition-colors duration-500">
                        {number}
                      </div>
                      
                      {/* Treść wiersza */}
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl text-ivory mb-3 transition-colors duration-500 group-hover:text-copper">
                          {svc.title}
                        </h3>
                        <p className="text-ivory/70 font-light leading-relaxed max-w-xl">
                          {svc.desc}
                        </p>
                      </div>
                      
                      {/* Ikony wyrównane do prawej */}
                      <div className="hidden md:flex flex-shrink-0 text-ivory/20 group-hover:text-copper transition-colors duration-500">
                        <Icon className="w-10 h-10" aria-hidden="true" />
                      </div>
                      
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};