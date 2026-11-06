import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from './Icons';
import { Logo, LogoFallback } from './Logo';
import { scrollToSection } from '../utils/scrollToSection';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const links = [
    { name: 'Oferta', href: '#oferta' },
    { name: 'Produkcja', href: '#produkcja' },
    { name: 'Realizacje', href: '#realizacje' },
    { name: 'Katalog', href: '#/katalog' },
    { name: 'Usługi CNC', href: '#/cnc' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#/')) {
      setIsOpen(false);
      return;
    }

    e.preventDefault();
    setIsOpen(false);
    scrollToSection(href);
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-surface/90 backdrop-blur-md hairline-dark-b' : 'bg-night border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 md:h-20 transition-all">
        
        <a 
          href="#/" 
          className="inline-block group outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm"
          aria-label="Strona główna"
        >
          <div className="flex items-center gap-2 transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] origin-left">
            <Logo className="h-5 md:h-6" variant="light" />
            <LogoFallback variant="light" />
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[15px] font-normal text-ivory/70 hover:text-ivory transition-colors relative group py-1 cursor-pointer"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-copper opacity-0 translate-y-1.5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"></span>
            </a>
          ))}
          <a 
            href="#kontakt" 
            onClick={(e) => handleNavClick(e, '#kontakt')}
            className="ml-4 bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night px-6 py-2.5 text-[15px] font-medium hover:brightness-110 hover:shadow-[0_0_15px_rgba(184,107,62,0.3)] transition-all rounded-sm cursor-pointer"
          >
            Zapytaj o wycenę
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-ivory hover:text-copper transition-colors"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-label="Otwórz menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-night w-full h-[100dvh] flex flex-col pt-24 px-6">
          <button
            className="absolute top-6 right-6 p-3 text-ivory hover:text-copper transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Zamknij menu"
          >
            <XIcon className="w-8 h-8" aria-hidden="true" />
          </button>
          <div className="flex flex-col gap-6 mt-12 font-sans">
            <a href="#/" onClick={() => setIsOpen(false)} className="text-2xl text-ivory font-light hover:text-copper transition-colors">Strona główna</a>
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl text-ivory/70 font-light hover:text-copper transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#kontakt" 
              onClick={(e) => handleNavClick(e, '#kontakt')}
              className="mt-8 bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-center text-night px-6 py-4 text-lg font-medium hover:brightness-110 transition-all rounded-sm cursor-pointer"
            >
              Zapytaj o wycenę
            </a>
          </div>
        </div>
      )}
    </header>
  );
};