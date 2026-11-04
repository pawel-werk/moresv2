import React from 'react';
import { Reveal } from './Reveal';
import { ArrowRight } from './Icons';
import { companyData } from '../data/content';

export const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name') as string;
    const phone = fd.get('phone') as string;
    const msg = fd.get('message') as string;
    
    const subject = encodeURIComponent('Zapytanie ze strony internetowej');
    const body = encodeURIComponent(`Imię/Firma: ${name}\nTelefon: ${phone}\n\n${msg}`);
    
    window.location.href = `mailto:${companyData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="kontakt" className="py-16 md:py-24 bg-night relative overflow-hidden" aria-labelledby="contact-title">
      
      {/* Subtelne tło podbijające głębię */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-stretch">
          
          {/* Lewa kolumna: Dane i mapa */}
          <div className="flex flex-col h-full pt-4">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-copper" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                  Kontakt
                </span>
              </div>
              <h2 id="contact-title" className="font-serif text-4xl md:text-5xl text-ivory mb-16 leading-tight">
                Skontaktuj się z nami
              </h2>
            </Reveal>
            
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-0">
                <Reveal delay={100}>
                  <div className="py-8 border-t border-line-dark">
                    <span className="block text-[11px] uppercase tracking-widest font-semibold text-muted-dark mb-3">Telefon</span>
                    <a href={`tel:${companyData.phone.replace(/\s/g, '')}`} className="font-serif text-3xl md:text-4xl text-ivory hover:text-copper transition-colors inline-block outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm">
                      {companyData.phone}
                    </a>
                  </div>
                </Reveal>
                
                <Reveal delay={200}>
                  <div className="py-8 border-t border-line-dark">
                    <span className="block text-[11px] uppercase tracking-widest font-semibold text-muted-dark mb-3">E-mail</span>
                    <a href={`mailto:${companyData.email}`} className="font-serif text-3xl md:text-4xl text-ivory hover:text-copper transition-colors inline-block break-all outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm">
                      {companyData.email}
                    </a>
                  </div>
                </Reveal>
                
                <Reveal delay={300}>
                  <div className="py-8 border-t border-b border-line-dark grid grid-cols-2 gap-8">
                    <div>
                      <span className="block text-[11px] uppercase tracking-widest font-semibold text-muted-dark mb-3">Adres produkcji</span>
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyData.addressLine1 + ', ' + companyData.addressLine2)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group inline-flex items-start gap-2 text-ivory font-light hover:text-copper transition-colors outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm leading-relaxed text-lg"
                      >
                        <span>
                          {companyData.addressLine1}<br/>{companyData.addressLine2}
                        </span>
                        <ArrowRight 
                          className="w-4 h-4 mt-1.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
                          aria-hidden="true" 
                        />
                      </a>
                    </div>
                    <div>
                      <span className="block text-[11px] uppercase tracking-widest font-semibold text-muted-dark mb-3">Godziny otwarcia</span>
                      <span className="font-light text-lg text-ivory block">
                        {companyData.workingHours}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>
              
              <Reveal delay={400} className="mt-12 h-64 md:h-[22rem] w-full relative rounded-sm overflow-hidden border border-line-dark bg-night">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-widest text-muted-dark font-bold">Ładowanie mapy...</span>
                </div>
                {/* Mapa w ciemnym stylu - bazujemy na filtrach CSS */}
                <iframe 
                  title="Mapa dojazdu"
                  className="absolute inset-0 w-full h-full z-10 transition-all duration-1000 grayscale opacity-60 hover:opacity-80"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(80%)' }} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=51.1578351,17.1517725&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
              </Reveal>
            </div>
          </div>

          {/* Prawa kolumna: Formularz */}
          <Reveal delay={500} className="h-full">
            <div className="flex flex-col h-full bg-surface p-8 md:p-12 lg:p-16 shadow-2xl border border-line-dark rounded-sm">
              <div className="mb-12 border-b border-line-dark pb-8">
                <h3 className="font-serif text-3xl text-ivory mb-4">
                  Zapytaj o wycenę
                </h3>
                <p className="text-ivory/70 font-light leading-relaxed">
                  Podaj wymiary, wykończenie oraz szacowaną ilość sztuk.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                <div className="space-y-8 flex-1">
                  
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-[11px] text-muted-dark uppercase tracking-widest font-semibold mb-2 cursor-pointer">
                      Imię i nazwisko / Firma *
                    </label>
                    <input 
                      required 
                      id="name" 
                      name="name" 
                      type="text" 
                      className="w-full bg-transparent border-0 border-b border-ivory/20 px-0 py-2 text-ivory focus:ring-0 focus:outline-none focus:border-copper transition-colors font-light" 
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-[11px] text-muted-dark uppercase tracking-widest font-semibold mb-2 cursor-pointer">
                      Telefon kontaktowy *
                    </label>
                    <input 
                      required 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      className="w-full bg-transparent border-0 border-b border-ivory/20 px-0 py-2 text-ivory focus:ring-0 focus:outline-none focus:border-copper transition-colors font-light" 
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-[11px] text-muted-dark uppercase tracking-widest font-semibold mb-2 cursor-pointer">
                      Szczegóły zlecenia *
                    </label>
                    <textarea 
                      required 
                      id="message" 
                      name="message" 
                      rows={5} 
                      className="w-full bg-transparent border-0 border-b border-ivory/20 px-0 py-2 text-ivory focus:ring-0 focus:outline-none focus:border-copper transition-colors font-light resize-none"
                    ></textarea>
                  </div>
                  
                </div>
                
                <div className="mt-10 mb-12 flex items-start gap-4">
                  <input 
                    required 
                    id="rodo" 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 text-copper bg-surface-2 border-ivory/20 rounded-sm focus:ring-copper focus:ring-offset-surface cursor-pointer outline-none transition-colors" 
                  />
                  <label htmlFor="rodo" className="text-xs text-ivory/60 font-light leading-relaxed cursor-pointer">
                    Wyrażam zgodę na przetwarzanie danych w celu obsługi zapytania. *
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night text-[15px] font-medium py-4 hover:brightness-110 transition-all mt-auto rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-copper focus-visible:ring-offset-surface shadow-[0_0_20px_rgba(184,107,62,0.15)] hover:shadow-[0_0_30px_rgba(184,107,62,0.25)]"
                >
                  Wyślij wiadomość
                </button>
              </form>
            </div>
          </Reveal>
          
        </div>
      </div>
    </section>
  );
};