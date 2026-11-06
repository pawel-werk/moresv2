import React, { useEffect } from 'react';
import { Reveal } from './Reveal';
import { companyData } from '../data/content';
import { scrollToSection } from '../utils/scrollToSection';

const machines = [
  { name: "Centrum Nestingowe CNC", image: "https://pgcnc.pl/cache/images/public/images/shop/940_940_auto/894545_bananaproai_com-202654132.webp" },
  { name: "Okleiniarka Krawędziowa", image: "https://i.postimg.cc/VL096sC2/scm.jpg" },
  { name: "Formatyzacja", image: "https://www.auto-tap.pl/images/oferta/thumbs/frezowanie.jpg" }
];

const productionFeatures = [
  {
    title: "Nesting CNC",
    desc: "Optymalne wykorzystanie materiału i precyzyjne cięcie CNC."
  },
  {
    title: "Frezowanie CNC",
    desc: "Precyzyjne frezowanie 2D i 3D MDF, płyty, sklejki i PVC."
  },
  {
    title: "Elementy meblowe",
    desc: "Wykonywanie frontów, korpusów, półek i innych elementów na wymiar."
  },
  {
    title: "Komponenty pod montaż",
    desc: "Dokładne wykonanie elementów gotowych do dalszego montażu."
  },
  {
    title: "Fronty frezowane",
    desc: "Estetyka i precyzja w każdym detalu elementów dekoracyjnych."
  },
  {
    title: "Elementy POS i ekspozytory",
    desc: "Funkcjonalne i estetyczne rozwiązania dla przestrzeni komercyjnych."
  },
  {
    title: "Produkcja indywidualna i seryjna",
    desc: "Elastyczność i powtarzalna jakość w małych i większych seriach."
  },
  {
    title: "Wsparcie projektowe",
    desc: "Przygotowanie dokumentacji produkcyjnej (DWG, DXF), optymalizacja detali."
  }
];

const targetAudiences = [
  "Pracownie Stolarskie i Rzemieślnicy",
  "Producenci Mebli i Agencje POS/BTL",
  "Architekci Wnętrz i Deweloperzy",
  "Sieci Handlowe i Retail",
  "Hotele i Pensjonaty",
  "Bary i Restauracje" 
];

const workSteps = [
  { title: "Zapytanie i Dokumentacja", desc: "Analizujemy dostarczone przez Ciebie pliki." },
  { title: "Wycena i Dobór Technologii", desc: "Przedstawiamy optymalne rozwiązania produkcyjne." },
  { title: "Wzór i Seria Próbna", desc: "Testujemy detale przed produkcją wieloseryjną." },
  { title: "Produkcja Seryjna i Dostawa", desc: "Zapewniamy terminową realizację i powtarzalność." }
];

export const CncPage: React.FC = () => {
  useEffect(() => {
    document.title = "Usługi CNC | mores";
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('#kontakt');
  };

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-night min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
          <div>
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-copper" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                  Wsparcie produkcyjne i podwykonawstwo
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.1] tracking-tight mb-8">
                Twoja koncepcja naszą precyzją.<br />
                <span className="text-muted-dark italic font-light">My zamieniamy ją w gotowy produkt.</span>
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg md:text-xl text-ivory/70 font-light leading-relaxed mb-10 max-w-lg">
                Od prototypu po krótkie serie produkcyjne – precyzyjnie, bez zbędnych formalności. Zapewniamy powtarzalność i elastyczne terminy realizacji.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <a 
                href="#kontakt" 
                onClick={handleContactClick}
                className="bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night px-8 py-4 text-[15px] font-medium hover:brightness-110 transition-all inline-flex items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-night shadow-[0_0_20px_rgba(184,107,62,0.15)] hover:shadow-[0_0_30px_rgba(184,107,62,0.25)]"
              >
                Przejdź do formularza kontaktowego
              </a>
            </Reveal>
          </div>
          
          <Reveal delay={300} className="relative h-[400px] md:h-[500px] lg:h-[600px] group cursor-pointer">
            <div className="absolute inset-0 bg-surface rounded-sm overflow-hidden flex items-center justify-center shadow-2xl border border-line-dark">
              <img 
                src="https://pgcnc.pl/cache/images/public/images/shop/940_940_auto/894545_bananaproai_com-202654132.webp" 
                alt="Maszyna PG CNC 2030 ATC" 
                className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100" 
              />
              {/* Gradient od dołu dla lepszego osadzenia w ciemnym motywie */}
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent pointer-events-none group-hover:opacity-40 transition-opacity duration-700" />
            </div>
            
            <div className="absolute bottom-8 -left-4 md:-left-12 bg-surface-2/95 backdrop-blur-sm p-6 shadow-xl border border-line-dark z-10 max-w-sm transition-transform duration-700 group-hover:-translate-y-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-copper mb-2 block">PG CNC 2030 ATC</span>
              <p className="text-sm font-medium text-ivory/90 leading-relaxed">
                Wielkoformatowe centra CNC, pole robocze do 3000 x 2000 mm, tolerancja obróbki ±0.1 mm, frezowanie 3D, nesting, wiercenie i rowkowanie.
              </p>
            </div>
          </Reveal>
        </div>

        {/* DLA KOGO PRACUJEMY */}
        <div className="mb-24 md:mb-32">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-12">Dla kogo pracujemy?</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2">
            {targetAudiences.map((audience, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className="group relative py-8 hairline-dark-t flex items-center hover:bg-surface-2 transition-colors px-4 -mx-4 md:px-6 md:-mx-6 cursor-default">
                  <div className="absolute top-[-1px] left-0 right-0 h-[1px] bg-copper scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="text-copper font-serif text-2xl mr-5 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                    /
                  </span>
                  <h3 className="font-serif text-lg md:text-xl text-ivory transition-colors duration-500 group-hover:text-copper">
                    {audience}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CO WYKONUJEMY */}
        <div className="mb-24 md:mb-32">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-12 text-center">Co wykonujemy?</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productionFeatures.map((item, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className="p-6 border-l border-line-dark hairline-dark-t hover:bg-surface-2 transition-colors h-full flex flex-col justify-start relative group">
                  <div className="absolute top-[-1px] left-0 w-0 h-[1px] bg-copper group-hover:w-full transition-all duration-500" />
                  <div className="absolute top-0 left-[-1px] w-[1px] h-0 bg-copper group-hover:h-full transition-all duration-500" />
                  <h3 className="font-serif text-xl text-ivory mb-3">{item.title}</h3>
                  <p className="text-ivory/60 font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* JAK PRACUJEMY */}
        <div className="mb-24 md:mb-32">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-12 text-center">Jak pracujemy?</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[28px] left-10 right-10 h-[1px] bg-line-dark" />
            {workSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 100} className="relative text-center group">
                <div className="w-14 h-14 bg-surface border border-line-dark rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 font-serif text-xl text-ivory/30 group-hover:border-copper group-hover:text-copper transition-colors duration-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(184,107,62,0.15)]">
                  {idx + 1}
                </div>
                <h3 className="font-serif text-xl text-ivory mb-2 group-hover:text-copper transition-colors duration-500">{step.title}</h3>
                <p className="text-ivory/60 font-light text-sm">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* PARK MASZYNOWY */}
        <div className="mb-24 md:mb-32 bg-surface p-8 md:p-16 rounded-sm overflow-hidden relative border border-line-dark shadow-2xl">
          <div className="absolute inset-0 bg-rings opacity-[0.04] pointer-events-none text-ivory" aria-hidden="true" />
          <Reveal>
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-copper" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                Technologia
              </span>
              <div className="w-8 h-[1px] bg-copper" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 text-center text-ivory">Park maszynowy</h2>
            <p className="text-center text-ivory/70 font-light mb-12 max-w-2xl mx-auto">
              Nowoczesne zaplecze techniczne gwarantuje precyzję i powtarzalność przy dużych seriach produkcyjnych.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {machines.map((machine, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="group cursor-pointer">
                  <div className="w-full aspect-[4/3] bg-night overflow-hidden rounded-sm mb-4 relative border border-line-dark">
                    <img 
                      src={machine.image} 
                      alt={machine.name} 
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent pointer-events-none group-hover:opacity-20 transition-opacity duration-700" />
                  </div>
                  <h4 className="text-ivory text-sm text-center font-medium group-hover:text-copper transition-colors duration-300">{machine.name}</h4>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* MATERIAŁY I MOŻLIWOŚCI */}
        <div className="grid lg:grid-cols-12 gap-16 mb-24 md:mb-32 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-serif text-3xl text-ivory mb-6">Materiały i możliwości</h2>
              <p className="text-ivory/70 font-light leading-relaxed mb-6">
                Realizujemy zarówno pojedyncze zamówienia, jak i produkcję seryjną. Oferujemy indywidualną wycenę dla każdego zlecenia.
              </p>
              <p className="text-ivory/70 font-light leading-relaxed">
                Chętnie podejmiemy współpracę jako zaplecze produkcyjne przy większych realizacjach komercyjnych, deweloperskich i prywatnych. Niezależnie czy jesteś stolarzem, architektem, czy reprezentujesz sieć retail – jeśli potrzebujesz mocy produkcyjnych do wykonania nietypowych detali, elementów meblowych czy wykończeń – jesteśmy idealnym partnerem.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-0">
            <Reveal delay={100}>
              <div className="pb-6 hairline-dark-b group">
                <h4 className="text-[11px] uppercase tracking-widest font-bold text-muted-dark mb-2 group-hover:text-copper transition-colors duration-300">Obrabiane materiały</h4>
                <p className="text-lg text-ivory font-light">MDF, HDF, sklejka, płyty wiórowe, OSB, drewno, laminaty kompaktowe i dekoracyjne, Plexi (PMMA), dibond, PVC spienione i twarde oraz HPL.</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="py-6 hairline-dark-b group">
                <h4 className="text-[11px] uppercase tracking-widest font-bold text-muted-dark mb-2 group-hover:text-copper transition-colors duration-300">Produkcja meblowa i komercyjna</h4>
                <p className="text-lg text-ivory font-light">Wykonywanie frontów, korpusów, zaawansowanych elementów zabudów, liter przestrzennych, logotypów i ekspozytorów reklamowych.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="py-6 hairline-dark-b group">
                <h4 className="text-[11px] uppercase tracking-widest font-bold text-muted-dark mb-2 group-hover:text-copper transition-colors duration-300">Frezowanie precyzyjne</h4>
                <p className="text-lg text-ivory font-light">Wycinanie niestandardowych kształtów, otworów, rowków oraz zaawansowane frezowanie 2D i 3D z zachowaniem niezwykłej dokładności.</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* BLOK KONTAKTOWY */}
        <Reveal delay={300}>
          <div className="bg-surface p-8 md:p-16 lg:p-20 relative overflow-hidden rounded-sm shadow-2xl border border-line-dark">
            <div className="absolute inset-0 bg-rings text-ivory opacity-[0.03] pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-10 pointer-events-none" aria-hidden="true" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16">
              
              <div>
                <h2 className="font-serif text-4xl text-ivory mb-4">Prześlij pliki do wyceny</h2>
                <p className="text-ivory/70 font-light mb-10 text-lg">
                  Przygotujemy szczegółową wycenę i odpowiemy na wszystkie pytania.
                </p>
                
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
                  <div>
                    <h4 className="text-ivory font-medium text-sm mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper block"></span> Szybka wycena
                    </h4>
                  </div>
                  <div>
                    <h4 className="text-ivory font-medium text-sm mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper block"></span> Wsparcie techniczne
                    </h4>
                  </div>
                  <div>
                    <h4 className="text-ivory font-medium text-sm mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper block"></span> Precyzyjne wykonanie
                    </h4>
                  </div>
                  <div>
                    <h4 className="text-ivory font-medium text-sm mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper block"></span> Lokalny partner
                    </h4>
                  </div>
                </div>

                <a 
                  href="#kontakt" 
                  onClick={handleContactClick}
                  className="inline-block bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night px-8 py-4 text-[15px] font-medium hover:brightness-110 transition-all rounded-sm shadow-[0_0_20px_rgba(184,107,62,0.15)] hover:shadow-[0_0_30px_rgba(184,107,62,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  Zapytaj o wycenę
                </a>
              </div>

              <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-line-dark pt-10 lg:pt-0 lg:pl-16 space-y-8">
                <div>
                  <p className="text-xl font-serif text-ivory mb-1">Kamilia Piotrowska</p>
                </div>

                <a href={`tel:${companyData.phone.replace(/\s/g, '')}`} className="group inline-flex items-center gap-4 text-ivory/70 hover:text-copper transition-colors outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm w-max">
                  <span className="w-10 h-10 rounded-full border border-line-dark flex items-center justify-center group-hover:border-copper/50 transition-colors shadow-sm bg-surface-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <span className="text-xl font-light tracking-wide">{companyData.phone}</span>
                </a>

                <a href={`mailto:${companyData.email}`} className="group inline-flex items-center gap-4 text-ivory/70 hover:text-copper transition-colors outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm w-max">
                  <span className="w-10 h-10 rounded-full border border-line-dark flex items-center justify-center group-hover:border-copper/50 transition-colors shadow-sm bg-surface-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
                  </span>
                  <span className="text-xl font-light">{companyData.email}</span>
                </a>

                <a href="https://maps.app.goo.gl/UULc6dMyhpCJt6qZA" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4 text-ivory/70 hover:text-copper transition-colors outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm w-max">
                  <span className="w-10 h-10 rounded-full border border-line-dark flex items-center justify-center group-hover:border-copper/50 transition-colors shrink-0 shadow-sm bg-surface-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <span className="text-lg font-light leading-snug">
                    {companyData.addressLine1}<br />{companyData.addressLine2}
                  </span>
                </a>
              </div>
              
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};