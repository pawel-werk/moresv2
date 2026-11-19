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
    title: 'Naturalna harmonia',
    subtitle: 'Nowoczesna kuchnia',
    description: 'Kuchnia / Gładkie',
    longDesc: 'Zabudowa kuchenna łącząca minimalistyczne, gładkie fronty z głęboką strukturą drewna orzechowego. Całość tworzy ciepłą, nowoczesną przestrzeń, przełamaną białymi akcentami dolnych szafek i blatu.',
    image: '/realizacje/kuchnia.webp',
    details: [
      { label: 'Fronty', value: 'Płaskie fornir / Lakier mat' },
      { label: 'Wykończenie', value: 'Orzech amerykański / Biel' },
      { label: 'Detale', value: 'Pionowe uchwyty listwowe' }
    ]
  },
  {
    id: '2',
    category: 'nietypowe',
    title: 'Finezja formy',
    subtitle: 'Otwarta przestrzeń',
    description: 'Kuchnia / Lamele',
    longDesc: 'Nietypowa zabudowa kuchenna, której głównym elementem jest zaokrąglony półwysep połączony ze stołem jadalnianym. Fronty wysokie wykończone pionowymi podziałami nadają lekkości, a zaokrąglone krawędzie mebli wprowadzają organiczny charakter.',
    image: '/realizacje/kuchnia2.webp',
    details: [
      { label: 'Zabudowa', value: 'Gięte elementy fornirowane' },
      { label: 'Wyspa', value: 'Zintegrowana ze stołem' },
      { label: 'Detale', value: 'Brak widocznych uchwytów' }
    ]
  },
  {
    id: '3',
    category: 'nietypowe',
    title: 'Ekspresja kamienia',
    subtitle: 'Strefa dzienna',
    description: 'Regał / Podświetlenie',
    longDesc: 'Eksponujący regał z podświetlanymi plecami, stworzony z myślą o ekspozycji trunków. Ciemna, matowa obudowa i gładkie fronty szafek dolnych stanowią doskonałą ramę dla podświetlonego kamienia (lub imitacji).',
    image: '/realizacje/regal.webp',
    details: [
      { label: 'Fronty', value: 'Gładkie, lakierowane' },
      { label: 'Elementy', value: 'Półki otwarte' },
      { label: 'Detale', value: 'Podświetlenie LED pleców' }
    ]
  },
  {
    id: '4',
    category: 'fronty',
    title: 'Relief w drewnie',
    subtitle: 'Sypialnia główna',
    description: 'Sypialnia / Frezowania',
    longDesc: 'Zabudowa ściany w sypialni łącząca tapicerowane panele z precyzyjnie frezowanymi elementami drewnianymi. Złożone frezowania tworzą unikalną, trójwymiarową teksturę, dodając wnętrzu przytulności i nowoczesnego charakteru.',
    image: '/realizacje/sypialnia.webp',
    details: [
      { label: 'Elementy', value: 'Frezowane panele ścienne' },
      { label: 'Wykończenie', value: 'Naturalne drewno' },
      { label: 'Detale', value: 'Frezowanie 3D' }
    ]
  }
];