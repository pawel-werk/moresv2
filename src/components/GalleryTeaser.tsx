import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';
import { Reveal } from './Reveal';
import { galleryData, GalleryItem } from '../data/gallery';
import { scrollToSection } from '../utils/scrollToSection';

export const GalleryTeaser: React.FC = () => {
  // Pobieramy 4 pierwsze realizacje z głównej bazy jako "Teaser" na stronę główną
  const teaserProjects = galleryData.slice(0, 4);
  const [activeProject, setActiveProject] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeProject) setActiveProject(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    if (activeProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  return (
    <section id="realizacje" className="py-16 md:py-24 bg-surface-2 relative hairline-dark-t">
      
      {/* Modal detalu realizacji */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-night/90 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-[1400px] w-[96vw] bg-surface rounded-sm shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[95dvh] lg:h-[85vh] border border-line-dark">
            
            <button 
              onClick={() => setActiveProject(null)} 
              className="absolute top-4 right-4 lg:top-8 lg:right-8 p-2 text-ivory hover:text-copper transition-colors z-50 bg-surface-2 backdrop-blur-md rounded-full border border-line-dark outline-none focus-visible:ring-2 focus-visible:ring-copper"
              aria-label="Zamknij"
            >
              <XIcon className="w-6 h-6 lg:w-8 lg:h-8" aria-hidden="true" />
            </button>

            {/* Zdjęcie na pełną wysokość */}
            <div className="w-full lg:w-[60%] h-[40vh] lg:h-full relative shrink-0 bg-night flex items-center justify-center overflow-hidden">
              {activeProject.image && (
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Opis */}
            <div className="w-full lg:w-[40%] p-6 sm:p-10 lg:p-16 flex flex-col overflow-y-auto text-left items-start">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gold mb-4 block">
                {activeProject.description}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory mb-2">
                {activeProject.title}
              </h3>
              {activeProject.subtitle && (
                <p className="text-muted-dark text-sm lg:text-base font-light mb-8 lg:mb-12">
                  {activeProject.subtitle}
                </p>
              )}
              
              <p className="text-ivory/70 font-light leading-relaxed text-sm sm:text-base lg:text-lg mb-10">
                {activeProject.longDesc}
              </p>

              <div className="mt-auto border-t border-line-dark pt-8 w-full">
                <div className="space-y-4 mb-10">
                  {activeProject.details?.map((detail, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 pb-4 border-b border-line-dark last:border-0">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted-dark">
                        {detail.label}
                      </span>
                      <span className="text-ivory text-sm font-medium">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Wymuszenie wyśrodkowania przycisku na 100% szerokości kolumny */}
                <div className="flex justify-center w-full">
                  <a 
                    href="#kontakt" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveProject(null);
                      setTimeout(() => scrollToSection('#kontakt'), 150);
                    }}
                    className="inline-block bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night text-center px-8 py-4 text-[14px] lg:text-[15px] font-medium hover:brightness-110 transition-all rounded-sm w-full shadow-[0_0_20px_rgba(184,107,62,0.15)] hover:shadow-[0_0_30px_rgba(184,107,62,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    Zapytaj o wycenę
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 md:mb-24">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-copper" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                Portfolio
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-6">Nasze realizacje</h2>
            <p className="text-ivory/70 text-lg font-light leading-relaxed max-w-2xl">
              Wybrane projekty, w których nasze fronty i elementy stolarskie stały się częścią wyjątkowych wnętrz.
            </p>
          </Reveal>
        </header>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {teaserProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 100} variant="slide-up">
              <div 
                className="group cursor-pointer block outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm"
                onClick={() => setActiveProject(project)}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6 bg-night">
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                  )}
                  {/* Ciemny gradient od dołu poprawiający kontrast tekstu i łagodzący obraz w ciemnym motywie */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 px-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-copper mb-2 block">
                      {project.description}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-ivory group-hover:text-copper transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  {project.subtitle && (
                    <span className="text-muted-dark text-sm font-light mb-1">
                      {project.subtitle}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};