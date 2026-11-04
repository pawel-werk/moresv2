export type GalleryItem = {
  id: string;
  category: 'fronty' | 'lakierowanie' | 'nietypowe';
  title: string;
  subtitle?: string;
  description: string;
  longDesc?: string;
  image?: string;
  src?: string;
  variant?: 'bazalt' | 'magma' | 'lithos' | 'tundra' | 'lumina';
  profile?: 'flat' | 'frame' | 'slatted';
  details?: { label: string; value: string }[];
};

export const galleryData: GalleryItem[] = [
  {
    id: '1',
    category: 'fronty',
    title: 'Ponadczasowe drewno',
    subtitle: 'Dom pod miastem',
    description: 'Kuchnia / Frezowania', // Zmiana ryflowania na frezowania
    longDesc: 'Projekt nowoczesnej kuchni łączącej frezowane fronty z ciepłym, naturalnym drewnem. Precyzyjne frezowania dodają głębi i tekstury, tworząc przytulne, a zarazem niezwykle eleganckie wnętrze, w którym rzemiosło gra główne skrzypce.',
    image: 'https://i.postimg.cc/6pJTtTbK/DSC-5246.jpg',
    details: [
      { label: 'Fronty', value: 'Frezowane / Gładkie' }, // Zmiana
      { label: 'Wykończenie', value: 'Lakier matowy' },
      { label: 'Detale', value: 'Frezowanie symetryczne' }
    ]
  },
  {
    id: '2',
    category: 'fronty',
    title: 'Ciemna Elegancja',
    subtitle: 'Apartament pokazowy',
    description: 'Kuchnia / Lamele',
    longDesc: 'Ekskluzywna zabudowa kuchenna oparta na głębokiej czerni i strukturze drobnych lameli. Połączenie ciemnego, szczotkowanego drewna z monumentalną, kamienną wyspą podkreśla luksusowy i bezkompromisowy charakter otwartej przestrzeni.',
    image: 'https://i.postimg.cc/433YFqFj/DSC-5394.jpg',
    details: [
      { label: 'Fronty', value: 'Płaskie' },
      { label: 'Wykończenie', value: 'Anty finger / Ultramat' },
      { label: 'Detale', value: 'Zintegrowane podcięcia' }
    ]
  },
  {
    id: '3',
    category: 'lakierowanie',
    title: 'Biały minimalizm',
    subtitle: 'Loft industrialny',
    description: 'Zabudowa / Gładki mat',
    longDesc: 'Jasna, minimalistyczna kuchnia w klasycznej bieli. Gładkie, matowe powierzchnie idealnie wpisują się w nowoczesną architekturę, stanowiąc czyste i świeże tło dla reszty wyposażenia.',
    image: 'https://i.postimg.cc/FzvmwJsq/DSC-5540.jpg',
    details: [
      { label: 'Fronty', value: 'Płaskie' },
      { label: 'Wykończenie', value: 'Lakier błyszczący' },
      { label: 'Detale', value: 'Bezuchwytowy system Tip-On' }
    ]
  },
  {
    id: '4',
    category: 'fronty',
    title: 'Jasna Klasyka',
    subtitle: 'Rezydencja Konstancin',
    description: 'Kuchnia',
    longDesc: 'Ponadczasowa, jasna kuchnia z frontami ramiakowymi inspirowanymi stylem shaker. Klasyczna elegancja przełamanej bieli połączona z mosiężnymi uchwytami i grubymi, drewnianymi blatami tworzy wyjątkowo jasną, prestiżową strefę.',
    image: 'https://i.postimg.cc/MH6Ny0GB/DSC-6492.jpg',
    details: [
      { label: 'Fronty', value: 'Ramowe / frezowane' },
      { label: 'Wykończenie', value: 'Lakier półmatowy' },
      { label: 'Detale', value: 'Klasyczne proporcje ramiaka' }
    ]
  }
];