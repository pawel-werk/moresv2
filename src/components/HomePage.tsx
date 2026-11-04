import React from 'react';
import { Hero } from './Hero';
import { Offer } from './Offer';
import { Production } from './Production';
import { Audience } from './Audience';
import { GalleryTeaser } from './GalleryTeaser';
import { CatalogTeaser } from './CatalogTeaser';
import { Process } from './Process';
import { Faq } from './Faq';

export const HomePage: React.FC = () => {
  React.useEffect(() => {
    document.title = "mores | Fronty meblowe i zlecenia nietypowe dla stolarzy";
    
    // Generowanie JSON-LD dla FAQ i LocalBusiness
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "mores",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mirków k. Wrocławia",
          "addressCountry": "PL"
        },
        "telephone": "+48 531 187 187",
        "email": "info@mores.pl",
        "areaServed": "PL"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Czy realizujecie zlecenia nietypowe według projektu?",
            "acceptedAnswer": { "@type": "Answer", "text": "Tak, nasza wycinarnia i lakiernia pozwalają nam realizować zamówienia poza standardowymi wymiarami." }
          }
        ]
      }
    ]);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <>
      <Hero />
      <Offer />
      <Production />
      <Audience />
      <GalleryTeaser />
      <CatalogTeaser />
      <Process />
      <Faq />
      {/* Contact został przeniesiony do App.tsx, aby uniknąć powielania ID i ułatwić globalny scrolling */}
    </>
  );
};