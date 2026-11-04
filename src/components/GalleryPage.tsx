import React, { useState, useEffect } from 'react';
import { galleryData } from '../data/gallery';
import { Lightbox } from './Lightbox';
import { MaterialPanel } from './MaterialPanel';
import { Reveal } from './Reveal';
import { scrollToSection } from '../utils/scrollToSection';

const categories = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'fronty', label: 'Fronty' },
  { id: 'lakierowanie', label: 'Lakierowanie' },
  { id: 'nietypowe', label: 'Zlecenia nietypowe' }
];

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Galeria realizacji | mores";
    window.scrollTo(0, 0);
  }, []);

  const filteredData = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('#kontakt');
  };

  return (
    <div className="py-24 md:py-32 bg-night min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="mb-16 md:mb-20">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-copper" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                Portfolio
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-ivory mb-6">Galeria realizacji</h1>
            <p className="text-ivory/70 text-lg font-light leading-relaxed max-w-2xl">
              Przykładowe produkcje, wykończenia lakiernicze i projekty wykonane dla naszych klientów B2B.
            </p>
          </Reveal>
        </header>

        <Reveal delay={100}>
          <div className="flex flex-wrap gap-8 mb-16 hairline-dark-b">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                aria-pressed={filter === c.id}
                className={`pb-4 text-[13px] uppercase tracking-widest font-medium outline-none transition-colors relative group focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4 focus-visible:ring-offset-night rounded-sm ${
                  filter === c.id ? 'text-copper' : 'text-muted-dark hover:text-ivory'
                }`}
              >
                {c.label}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] transition-transform duration-300 origin-left ${filter === c.id ? 'bg-copper scale-x-100' : 'bg-ivory scale-x-0 group-hover:scale-x-100'}`} />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Pionowe prostokąty 3:4 na podstronie galerii */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
          {filteredData.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 50} variant="slide-up">
              <button
                onClick={() => setLightboxIndex(idx)}
                className="group w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4 focus-visible:ring-offset-night rounded-sm"
              >
                <div className="w-full aspect-[3/4] overflow-hidden rounded-sm shadow-sm transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] bg-surface relative">
                  
                  {item.image ? (
                    <>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                      {/* Ciemny overlay dla spójności i czytelności na ciemnym motywie */}
                      <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      {/* Radialne światło podbijające widoczność paneli na ciemnym tle */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,107,62,0.12),transparent_70%)] pointer-events-none scale-150" />
                      <MaterialPanel 
                        src={item.src}
                        variant={item.variant}
                        profile={item.profile}
                        className="w-full h-full transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 shadow-2xl relative z-10"
                      />
                    </div>
                  )}
                </div>
                
                <div className="mt-5 flex flex-col gap-1 hairline-dark-t pt-3">
                  <h3 className="font-serif text-xl text-ivory transition-colors duration-300 group-hover:text-copper truncate">
                    {item.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-dark whitespace-nowrap">
                    {item.description}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        
        {filteredData.length === 0 && (
           <div className="text-center py-32 text-muted-dark font-light">Brak projektów w tej kategorii.</div>
        )}

        <Reveal delay={200}>
          <div className="mt-32 relative bg-surface p-12 md:p-20 overflow-hidden rounded-sm border border-line-dark shadow-2xl">
            <div className="absolute inset-0 bg-rings text-ivory opacity-5 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-10 pointer-events-none" aria-hidden="true" />
            
            <div className="relative z-10 md:w-2/3">
              <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-6">Masz podobny projekt?</h2>
              <p className="text-ivory/70 font-light text-lg mb-10 max-w-md leading-relaxed">
                Chętnie wycenimy Twoje zestawienie materiałowe. Skontaktuj się z naszym zespołem.
              </p>
              <a 
                href="#kontakt" 
                onClick={handleContactClick}
                className="inline-block bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night px-8 py-4 text-[15px] font-medium hover:brightness-110 transition-all rounded-sm shadow-[0_0_20px_rgba(184,107,62,0.15)] hover:shadow-[0_0_30px_rgba(184,107,62,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Zapytaj o wycenę
              </a>
            </div>
          </div>
        </Reveal>

      </div>

      {lightboxIndex !== null && (
        <Lightbox 
          item={filteredData[lightboxIndex]}
          currentIndex={lightboxIndex}
          total={filteredData.length}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => (prev! + 1) % filteredData.length)}
          onPrev={() => setLightboxIndex((prev) => (prev! - 1 + filteredData.length) % filteredData.length)}
        />
      )}
    </div>
  );
};