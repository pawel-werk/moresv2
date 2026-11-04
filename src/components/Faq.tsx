import React from 'react';
import { Reveal } from './Reveal';
import { faqData } from '../data/content';

export const Faq: React.FC = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-surface relative z-10 hairline-dark-b" aria-labelledby="faq-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* Lewa kolumna - Sticky Nagłówek */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-copper" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                  Wiedza
                </span>
              </div>
              <h2 id="faq-title" className="font-serif text-4xl md:text-5xl text-ivory leading-tight">
                Częste pytania
              </h2>
              <p className="text-ivory/70 text-lg font-light leading-relaxed mt-6 max-w-sm">
                Odpowiedzi na najczęstsze pytania dotyczące współpracy, technologii i logistyki.
              </p>
            </Reveal>
          </div>
          
          <div className="lg:col-span-8">
            <div className="hairline-dark-t">
              {faqData.map((faq, i) => (
                <Reveal key={i} delay={i * 100}>
                  <details name="faq-accordion" className="group hairline-dark-b overflow-hidden marker:content-['']">
                    <summary className="flex justify-between items-center text-xl md:text-2xl font-serif text-ivory cursor-pointer list-none py-8 hover:text-copper focus-visible:outline-none focus-visible:text-copper transition-colors duration-300 [&::-webkit-details-marker]:hidden">
                      <span className="pr-8 transition-colors duration-300 group-open:text-copper">{faq.question}</span>
                      
                      <span className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
                        <span className="absolute w-4 h-[1.5px] bg-copper transition-transform duration-500 ease-out" />
                        {/* Pionowa linia (znika/obraca się po otwarciu, tworząc minus) */}
                        <span className="absolute w-[1.5px] h-4 bg-ivory group-hover:bg-copper transition-all duration-500 ease-out group-open:rotate-90 group-open:scale-0 group-focus-visible:bg-copper" />
                      </span>
                    </summary>
                    
                    <div className="text-ivory/70 font-light text-lg leading-relaxed pb-10 md:pr-16 opacity-0 -translate-y-2 group-open:opacity-100 group-open:translate-y-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                      {faq.answer}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
};