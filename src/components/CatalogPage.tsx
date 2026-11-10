import React, { useEffect, useState } from 'react';
import { ExternalLinkIcon, XIcon } from './Icons';
import { Reveal } from './Reveal';
import { MaterialPanel, MaterialVariant } from './MaterialPanel';
import { scrollToSection } from '../utils/scrollToSection';

type CatalogItem = {
  title: string;
  desc: string;
  variant: MaterialVariant;
  profile: 'flat' | 'frame' | 'slatted' | 'grooved' | 'integrated-handle' | 'half-round' | 'integrated-handle-full' | 'integrated-handle-centered' | 'integrated-handle-hidden' | 'raised-panel' | 'micro-frame' | 'shaker' | 'complex-raised-panel' | 'double-stepped-panel' | 'vertical-stiles-raised' | 'flat-grooves' | 'concave-grooves' | 'mullion-frame' | 'glass-frame' | 'lattice-frame';
  longDesc: string;
  detailGraphic?: 'hidden-handle' | 'half-round';
  detailLabel?: string;
};

const colorOptions: { id: MaterialVariant; name: string; bgClass: string }[] = [
  { id: 'lithos', name: 'Jasny', bgClass: 'bg-[#D3CCC3]' },
  { id: 'azure', name: 'Błękitny', bgClass: 'bg-[#5c7a8c]' },
  { id: 'magma', name: 'Brązowy', bgClass: 'bg-[#5D4037]' },
  { id: 'bazalt', name: 'Grafitowy', bgClass: 'bg-[#212121]' }
];

const catalogFronts: CatalogItem[] = [
  { title: "F-1", desc: "Płaski / Uchwyt pełny", variant: "lithos", profile: "integrated-handle-full", longDesc: "Czysty, płaski front ze zintegrowanym uchwytem frezowanym na całej szerokości krawędzi. Kwintesencja minimalizmu i funkcjonalności." },
  { title: "F-2", desc: "Płaski / Uchwyt asymetryczny", variant: "lithos", profile: "integrated-handle", longDesc: "Minimalistyczny front z precyzyjnie wyfrezowanym, zintegrowanym uchwytem krawędziowym. Łączy w sobie czystość formy z najwyższą ergonomią bezuchwytowego otwierania." },
  { title: "F-3", desc: "Płaski / Uchwyt symetryczny", variant: "lithos", profile: "integrated-handle-centered", longDesc: "Nowoczesny front z wycentrowanym, symetrycznym frezem uchwytowym. Zakończony eleganckimi skosami z obu stron." },
  { 
    title: "F-4", 
    desc: "Płaski / Uchwyt ukryty", 
    variant: "lithos", 
    profile: "integrated-handle-hidden", 
    longDesc: "Front z wycięciem w górnej krawędzi. Front od przodu zachowuje jednolitą, gładką płaszczyznę, a frez uchwytowy pozostaje całkowicie niewidoczny.",
    detailGraphic: 'hidden-handle',
    detailLabel: 'Detal: ukryty uchwyt'
  },
  { title: "F-5", desc: "Płaski / Gładki", variant: "lithos", profile: "flat", longDesc: "Klasyczny, gładki front lakierowany bez żadnych dodatkowych frezowań i detali. Minimalistyczna, jednolita płaszczyzna, która stanowi doskonałą bazę dla nowoczesnych projektów." },
  { title: "F-6", desc: "Ramowy / Wypukła płycina", variant: "lithos", profile: "raised-panel", longDesc: "Klasyczny front ramowy z frezowaną, wypukłą płyciną wewnętrzną. Wprowadza tradycyjny, elegancki charakter do nowoczesnych projektów, nawiązując do najwyższej klasy stolarki angielskiej." },
  { title: "F-7", desc: "Płaski / Mikroramka", variant: "lithos", profile: "micro-frame", longDesc: "Nowoczesny front z niezwykle cienką, subtelną ramką na samych krawędziach. Idealny kompromis między gładkim minimalizmem a klasycznym, ramiakowym stylem." },
  { title: "F-8", desc: "Ramowy / Shaker", variant: "lithos", profile: "shaker", longDesc: "Klasyczny, ponadczasowy front ramiakowy (tzw. Shaker) z głęboko osadzoną, płaską płyciną opadającą pod kątem 45 stopni. Wprowadza architektoniczny rygor i czystość formy." },
  { title: "F-9", desc: "Ramowy / Klasyczny z frezem", variant: "lithos", profile: "complex-raised-panel", longDesc: "Rozbudowany front klasyczny łączący szeroką ramę, podwójne fazy pod kątem 45 stopni (w dół i w górę) oraz dodatkowy, subtelny frez obwiedniowy na zewnętrznej płaszczyźnie." },
  { title: "F-10", desc: "Ramowy / Podwójny schodek", variant: "lithos", profile: "double-stepped-panel", longDesc: "Elegancki front z szeroką ramą, która schodkuje w dół pod kątem 45 stopni, rozdzielona płaską frezą i kolejnym spadkiem, aż do zagłębionej płyciny. Nowoczesna interpretacja tradycyjnego stylu ramiakowego." },
  { title: "F-11", desc: "Ramowy / Pionowe ramiaki", variant: "lithos", profile: "vertical-stiles-raised", longDesc: "Front inspirowany klasyczną konstrukcją z wyraźnymi, pionowymi fugami przechodzącymi przez całą wysokość. Wewnętrzna płycina jest dodatkowo wyprofilowana i wypukła, wprowadzając rzemieślniczy, tradycyjny detal do zabudowy." },
  { title: "F-12", desc: "Ryflowany / Płaskie frezy", variant: "lithos", profile: "flat-grooves", longDesc: "Front ryflowany o geometrycznym, technicznym charakterze. Pionowe, płaskie wycięcia tworzą powtarzalny, nowoczesny rytm. Idealny do urozmaicenia gładkich powierzchni zabudowy." },
  { title: "F-13", desc: "Płaski / Frez obwiedniowy", variant: "lithos", profile: "grooved", longDesc: "Klasyczny, elegancki front z subtelnym, pojedynczym frezem obwiedniowym. Detal, który dodaje wyrafinowania bez obciążania przestrzeni." },
  { title: "F-14", desc: "Ryflowany / Wklęsłe frezy", variant: "lithos", profile: "concave-grooves", longDesc: "Gęste, rytmiczne ryflowanie w formie wklęsłych wcięć oddzielonych wąskimi, płaskimi paskami. Niezwykle taktylna powierzchnia o mocnym, wertykalnym rysunku." },
  {
    title: "F-15",
    desc: "Ryflowany / Półwałek",
    variant: "lithos",
    profile: "half-round",
    longDesc: "Niezwykle modne ryflowanie o miękkim, wypukłym profilu półwałka. Tworzy powtarzalny, organiczny wzór, który doskonale rozprasza światło i nadaje wnętrzu przytulny, a zarazem nowoczesny charakter. Każdy półwałek ma 10 mm szerokości, a między nimi pozostaje 1 mm przerwy.",
    detailGraphic: 'half-round',
    detailLabel: 'Detal: półwałek 10 mm'
  },
  { title: "F-16", desc: "Witryna / Szprosy krzyżowe", variant: "lithos", profile: "mullion-frame", longDesc: "Klasyczny front witrynowy z krzyżowymi szprosami i fazowanymi krawędziami okienek pod kątem 45 stopni. Nadaje zabudowie lekkości i eksponuje zawartość szafek." },
  { title: "F-17", desc: "Witryna / Szklana tafla", variant: "lithos", profile: "glass-frame", longDesc: "Klasyczna witryna z szeroką ramą, ściętą precyzyjnie pod kątem 45 stopni w kierunku pojedynczej, dużej tafli szkła. Minimalistyczna forma otwierająca przestrzeń wewnątrz szafki." },
  { title: "F-18", desc: "Ramowy / Kratka", variant: "lithos", profile: "lattice-frame", longDesc: "Front ramowy z klasycznym, ukośnym dziurkowaniem (kratką) w płaskiej płycinie. Ścięcie ramki pod kątem 45 stopni płynnie łączy się z dekoracyjnym, ażurowym środkiem, zapewniając wentylację i unikalny styl retro." }
];

const mix = (hex: string, target: string, t: number): string => {
  const parse = (h: string) => {
    const c = h.replace('#', '');
    return [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16));
  };
  const a = parse(hex);
  const b = parse(target);
  const out = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return '#' + out.map((v) => v.toString(16).padStart(2, '0')).join('');
};

/**
 * Detal ukrytego uchwytu F-4.
 */
const HiddenHandleDetail: React.FC<{ variant: MaterialVariant }> = ({ variant }) => {
  const baseColors: Record<MaterialVariant, string> = {
    lithos: '#D3CCC3',
    azure: '#5c7a8c',
    magma: '#5D4037',
    bazalt: '#212121',
    tundra: '#8E918F',
    lumina: '#EAE6E1'
  };
  const base = baseColors[variant] ?? baseColors.lithos;
  const isDark = variant === 'bazalt' || variant === 'magma';

  // --- Kolory ---
  const frontTop = isDark ? mix(base, '#ffffff', 0.12) : mix(base, '#ffffff', 0.10);
  const frontBottom = isDark ? mix(base, '#ffffff', 0.04) : mix(base, '#000000', 0.05);
  // Górne powierzchnie (parapety)
  const ledge = isDark ? mix(base, '#ffffff', 0.26) : mix(base, '#ffffff', 0.30);
  // Prawa ściana zewnętrzna
  const sideTop = isDark ? mix(base, '#ffffff', 0.04) : mix(base, '#000000', 0.22);
  const sideBottom = isDark ? mix(base, '#000000', 0.15) : mix(base, '#000000', 0.34);
  // Wnętrze wycięcia - Cienie zostały zmienione, aby były łagodniejsze
  const innerBack = isDark ? mix(base, '#000000', 0.25) : mix(base, '#000000', 0.40);
  const innerFront = isDark ? mix(base, '#ffffff', 0.08) : mix(base, '#000000', 0.10);
  // Tło okręgu
  const bgCenter = isDark ? '#443c35' : '#3a332e';
  const bgEdge = isDark ? '#1f1b18' : '#171310';

  // --- Geometria ---
  const L = 40;
  const R = 260;
  const CL = 69;
  const CR = 231;
  const TOP = 195;
  const BOT = 1250;
  const S = 62;
  const RX = (CR - CL) / 2;
  const RY = 92;
  const CX = (CL + CR) / 2;
  const CY = TOP + S;
  const DX = 600;
  const DY = -480;

  const SCALE = 0.25;
  const TOP_SCREEN = 140;
  
  // WIĘKSZE ZAOKRĄGLENIE dla bardziej miękkich krawędzi
  const ROUND = 2.5; 
  const tx = 200 - ((L + R + DX) / 2) * SCALE;
  const ty = TOP_SCREEN - (TOP + DY) * SCALE;

  const a = -DX / RX;
  const b = -DY / RY;
  const phi0 = Math.max(0, Math.atan2(b, a) - Math.PI / 2);
  const p0x = CX + RX * Math.cos(phi0);
  const p0y = CY + RY * Math.sin(phi0);

  // Ścieżki
  const innerPath =
    `M ${CL} ${TOP} ` +
    `L ${CL} ${CY} ` +
    `A ${RX} ${RY} 0 0 0 ${p0x} ${p0y} ` +
    `L ${p0x + DX} ${p0y + DY} ` +
    `A ${RX} ${RY} 0 0 1 ${CL + DX} ${CY + DY} ` +
    `L ${CL + DX} ${TOP + DY} Z`;

  const sideWallPath = `M ${R} ${TOP} L ${R + DX} ${TOP + DY} L ${R + DX} ${BOT + DY} L ${R} ${BOT} Z`;
  const leftLedgePath = `M ${L} ${TOP} L ${CL} ${TOP} L ${CL + DX} ${TOP + DY} L ${L + DX} ${TOP + DY} Z`;
  const rightLedgePath = `M ${CR} ${TOP} L ${R} ${TOP} L ${R + DX} ${TOP + DY} L ${CR + DX} ${TOP + DY} Z`;

  const frontPath =
    `M ${L} ${BOT} ` +
    `L ${L} ${TOP} ` +
    `L ${CL} ${TOP} ` +
    `L ${CL} ${CY} ` +
    `A ${RX} ${RY} 0 0 0 ${CR} ${CY} ` +
    `L ${CR} ${TOP} ` +
    `L ${R} ${TOP} ` +
    `L ${R} ${BOT} Z`;

  const idBg = `hh-bg-${variant}`;
  const idFront = `hh-front-${variant}`;
  const idInner = `hh-inner-${variant}`;
  const idSide = `hh-side-${variant}`;
  const idRound = `hh-round-${variant}`;
  const idArc = `hh-arc-${variant}`;

  const seam = { strokeWidth: 1, strokeLinejoin: 'round' as const };

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full animate-in fade-in duration-300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Ukryty uchwyt frontu F-4, widok pod kątem z góry"
    >
      <defs>
        <radialGradient id={idBg} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={bgCenter} />
          <stop offset="100%" stopColor={bgEdge} />
        </radialGradient>
        <linearGradient id={idFront} gradientUnits="userSpaceOnUse" x1="0" y1={TOP} x2="0" y2={CY + RY + 140}>
          <stop offset="0%" stopColor={frontTop} />
          <stop offset="100%" stopColor={frontBottom} />
        </linearGradient>
        <linearGradient id={idInner} gradientUnits="userSpaceOnUse" x1="0" y1={TOP + DY} x2="0" y2={CY + RY}>
          <stop offset="0%" stopColor={innerBack} />
          <stop offset="100%" stopColor={innerFront} />
        </linearGradient>
        <linearGradient id={idSide} gradientUnits="userSpaceOnUse" x1="0" y1={TOP + DY} x2="0" y2={BOT - 100}>
          <stop offset="0%" stopColor={sideTop} />
          <stop offset="100%" stopColor={sideBottom} />
        </linearGradient>
        <filter
          id={idRound}
          filterUnits="userSpaceOnUse"
          x="-40"
          y="-40"
          width="480"
          height="480"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={ROUND} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8 -4"
          />
        </filter>
        <clipPath id={idArc} clipPathUnits="userSpaceOnUse">
          <rect x={CL - 4} y={TOP} width={CR - CL + 8} height={S + RY + 40} />
        </clipPath>
      </defs>

      <rect width="400" height="400" fill={`url(#${idBg})`} />

      <g filter={`url(#${idRound})`}>
        <g transform={`translate(${tx} ${ty}) scale(${SCALE})`}>
          <path d={innerPath} fill={`url(#${idInner})`} stroke={`url(#${idInner})`} {...seam} />
          <path d={sideWallPath} fill={`url(#${idSide})`} stroke={`url(#${idSide})`} {...seam} />
          <path d={leftLedgePath} fill={ledge} stroke={ledge} {...seam} />
          <path d={rightLedgePath} fill={ledge} stroke={ledge} {...seam} />
          <path d={frontPath} fill={`url(#${idFront})`} stroke={`url(#${idFront})`} {...seam} />
        </g>
      </g>

      <g transform={`translate(${tx} ${ty}) scale(${SCALE})`}>
        <path d={frontPath} fill={`url(#${idFront})`} clipPath={`url(#${idArc})`} />
      </g>
    </svg>
  );
};

/**
 * Detal ryflowania F-15 (Poprawiony)
 * Półwałki biegną po DŁUGIM boku. (wyciągnięte pionowo, a płyta schodzi na prawo).
 *
 * v4: cieńszy front, półwałki i korpus jako jedna forma (bez ciemnej krawędzi
 * między nimi), front zaczyna i kończy się pełnym półwałkiem.
 */
const HalfRoundDetail: React.FC<{ variant: MaterialVariant }> = ({ variant }) => {
  const baseColors: Record<MaterialVariant, string> = {
    lithos: '#D3CCC3',
    azure: '#5c7a8c',
    magma: '#5D4037',
    bazalt: '#212121',
    tundra: '#8E918F',
    lumina: '#EAE6E1'
  };
  const base = baseColors[variant] ?? baseColors.lithos;
  const isDark = variant === 'bazalt' || variant === 'magma';

  // --- Kolory ---
  const frontTop = isDark ? mix(base, '#ffffff', 0.12) : mix(base, '#ffffff', 0.10);
  const frontBottom = isDark ? mix(base, '#ffffff', 0.04) : mix(base, '#000000', 0.05);
  const ledge = isDark ? mix(base, '#ffffff', 0.26) : mix(base, '#ffffff', 0.30);
  // Kolor szczelin między półwałkami - łagodny, nie czarny
  const wallMid = isDark ? mix(base, '#000000', 0.30) : mix(base, '#000000', 0.16);

  const bgCenter = isDark ? '#443c35' : '#3a332e';
  const bgEdge = isDark ? '#1f1b18' : '#171310';

  // --- Parametry do strojenia ---
  const THICK = 15;    // grubość płyty (poprzednio 27, czyli ok. 37% mniej)
  const COUNT = 17;    // liczba półwałków
  const FLUTE = 13;    // szerokość półwałka (10 mm)
  const GAP = 1;       // szczelina (1 mm)
  const RAD = FLUTE / 2;
  const HEIGHT = 320;  // wysokość frontu (i tak ucinana przez kadr)

  // Pozycja w kadrze (viewBox 400x400)
  const AX = 105;
  const AY = 262;

  // --- Perspektywa jak w F-4: głębia = wektor (600, -480) ---
  const DX = 600;
  const DY = -480;
  const dirLen = Math.hypot(DX, DY);
  const ux = DX / dirLen;
  const uy = DY / dirLen;

  // Front zaczyna i kończy się pełnym półwałkiem
  const LEN = COUNT * FLUTE + (COUNT - 1) * GAP;

  // Płaszczyzna ściany z ryflami
  const WX = AX + THICK;

  // Punkt na ścianie: s = odległość wzdłuż frontu, b = wypukłość półwałka
  const P = (s: number, b: number): [number, number] => [WX + s * ux + b, AY + s * uy];

  const fmt = (n: number) => n.toFixed(2);
  const poly = (pts: [number, number][]) =>
    'M ' + pts.map((p) => `${fmt(p[0])} ${fmt(p[1])}`).join(' L ');

  // Półwałek widać tylko do krawędzi sylwetki
  const thetaVis = Math.PI - Math.atan(1 / ux);
  const STEPS = 18;

  const curve = (i: number, t0: number, t1: number): [number, number][] => {
    const sc = i * (FLUTE + GAP) + RAD;
    return Array.from({ length: STEPS + 1 }, (_, k) => {
      const th = t0 + ((t1 - t0) * k) / STEPS;
      return P(sc - RAD * Math.cos(th), RAD * Math.sin(th));
    });
  };

  const flutes = Array.from({ length: COUNT }, (_, i) => {
    const vis = curve(i, 0, thetaVis);
    const first = vis[0];
    const last = vis[vis.length - 1];
    return (
      poly(vis) +
      ` L ${fmt(last[0])} ${fmt(last[1] + HEIGHT)}` +
      ` L ${fmt(first[0])} ${fmt(first[1] + HEIGHT)} Z`
    );
  });

  // --- Płaszczyzna szczelin (tło pod półwałkami) ---
  const wallPath =
    `M ${WX} ${AY} L ${fmt(WX + LEN * ux)} ${fmt(AY + LEN * uy)} ` +
    `L ${fmt(WX + LEN * ux)} ${fmt(AY + LEN * uy + HEIGHT)} L ${WX} ${AY + HEIGHT} Z`;

  // --- Górna powierzchnia: JEDEN kształt z profilem półwałków ---
  const profileReverse: [number, number][] = [];
  for (let i = COUNT - 1; i >= 0; i--) {
    profileReverse.push(...curve(i, Math.PI, 0));
  }
  const ledgePath =
    `M ${AX} ${AY} L ${fmt(AX + LEN * ux)} ${fmt(AY + LEN * uy)} ` +
    profileReverse.map((p) => `L ${fmt(p[0])} ${fmt(p[1])}`).join(' ') +
    ' Z';

  // --- Przekrój czołowy (lewa ściana) ---
  const endFacePath = `M ${AX} ${AY} L ${WX} ${AY} L ${WX} ${AY + HEIGHT} L ${AX} ${AY + HEIGHT} Z`;

  const idBg = `hr-bg-${variant}`;
  const idFront = `hr-front-${variant}`;
  const idShade = `hr-shade-${variant}`;

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full animate-in fade-in duration-300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Detal frontu F-15: półwałki 10 mm ze szczeliną 1 mm, widok pod kątem z góry"
    >
      <defs>
        <radialGradient id={idBg} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={bgCenter} />
          <stop offset="100%" stopColor={bgEdge} />
        </radialGradient>

        {/* Ten sam pionowy gradient dla przekroju i półwałków => jedna spójna bryła */}
        <linearGradient id={idFront} gradientUnits="userSpaceOnUse" x1="0" y1={AY} x2="0" y2="400">
          <stop offset="0%" stopColor={frontTop} />
          <stop offset="100%" stopColor={frontBottom} />
        </linearGradient>

        {/* Poziomy cieniowany walec: na lewej krawędzi przezroczysty, więc bez szwu */}
        <linearGradient id={idShade} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity={isDark ? 0.14 : 0.18} />
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity={isDark ? 0.4 : 0.3} />
        </linearGradient>
      </defs>

      <rect width="400" height="400" fill={`url(#${idBg})`} />

      {/* Tło szczelin */}
      <path d={wallPath} fill={wallMid} />

      {/* Półwałki: od najdalszego do najbliższego */}
      {[...flutes].reverse().map((d, k) => (
        <g key={k}>
          <path d={d} fill={`url(#${idFront})`} />
          <path d={d} fill={`url(#${idShade})`} />
        </g>
      ))}

      {/* Górna płaszczyzna z profilem półwałków - jeden kształt */}
      <path d={ledgePath} fill={ledge} stroke={ledge} strokeWidth={1} strokeLinejoin="round" />

      {/* Przekrój czołowy - na wierzchu, ten sam gradient co półwałki */}
      <path d={endFacePath} fill={`url(#${idFront})`} stroke={`url(#${idFront})`} strokeWidth={1} strokeLinejoin="round" />
    </svg>
  );
};

const FrontBacking: React.FC<{ profile: string; className?: string; children: React.ReactNode }> = ({ profile, className = '', children }) => {
  const isGlass = profile === 'glass-frame' || profile === 'mullion-frame';
  const isLattice = profile === 'lattice-frame';
  
  if (isLattice) {
    return (
      <div className={`w-full h-full rounded-sm overflow-hidden relative bg-[#2A2522] ${className}`}>
        <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] pointer-events-none z-0" />
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    );
  }

  const background = isGlass ? 'linear-gradient(135deg, #DCEBF7, #BFD8EC)' : '#F7F4EF';
  
  return (
    <div className={`w-full h-full rounded-sm overflow-hidden ${className}`} style={{ background }}>
      {children}
    </div>
  );
};

export const CatalogPage: React.FC = () => {
  const [selectedFront, setSelectedFront] = useState<CatalogItem | null>(null);
  const [activeVariant, setActiveVariant] = useState<MaterialVariant>('lithos');
  const pdfUrl = "/katalog/mores-katalog.pdf";

  useEffect(() => {
    document.title = "Katalog PDF | mores";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedFront) {
      setActiveVariant(selectedFront.variant);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedFront]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedFront) setSelectedFront(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedFront]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSelectedFront(null);
    setTimeout(() => {
      scrollToSection('#kontakt');
    }, 150);
  };

  return (
    <div className="pt-16 md:pt-24 pb-24 md:pb-32 bg-night min-h-screen">
      
      {/* --- MODAL DETALU FRONTU --- */}
      {selectedFront && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-night/90 backdrop-blur-sm transition-opacity duration-300">
          
          <div className="relative w-full max-w-[1600px] w-[98vw] bg-surface rounded-sm shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[95dvh] md:h-[94vh] border border-line-dark">
            
            <button 
              onClick={() => setSelectedFront(null)} 
              className="absolute top-3 right-3 md:top-8 md:right-8 p-2 text-ivory hover:text-copper transition-colors z-50 bg-surface-2 backdrop-blur-md rounded-full border border-line-dark outline-none focus-visible:ring-2 focus-visible:ring-copper shadow-sm"
              aria-label="Zamknij podgląd"
            >
              <XIcon className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
            </button>

            {/* LEWA STRONA: Grafika i Swatche */}
            <div className="w-full md:w-1/2 bg-night p-6 pt-12 pb-8 md:p-20 lg:p-24 relative flex flex-col items-center justify-center min-h-[340px] md:min-h-0 md:h-full shrink-0 border-b md:border-b-0 md:border-r border-line-dark overflow-y-auto">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,107,62,0.12),transparent_70%)] pointer-events-none scale-150" />
              
              <div className="relative w-full max-w-[160px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[340px] aspect-[3/4] rounded-sm mt-4 md:mt-0 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                <FrontBacking profile={selectedFront.profile}>
                  <MaterialPanel variant={activeVariant} profile={selectedFront.profile} className="w-full h-full rounded-sm transition-all duration-300" />
                </FrontBacking>
                
                <div className="absolute -top-8 -right-10 sm:-top-10 sm:-right-12 md:-top-24 md:-right-28 lg:-top-[130px] lg:-right-[150px] w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-[340px] lg:h-[340px] rounded-full border-[4px] md:border-[8px] border-line-dark shadow-2xl overflow-hidden z-20 pointer-events-none bg-surface flex items-center justify-center">
                  {selectedFront.detailGraphic ? (
                    <>
                      {selectedFront.detailGraphic === 'half-round' ? (
                        <HalfRoundDetail key={activeVariant} variant={activeVariant} />
                      ) : (
                        <HiddenHandleDetail key={activeVariant} variant={activeVariant} />
                      )}
                      {selectedFront.detailLabel && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-[15%] sm:top-[19%] md:top-[12%] lg:top-[9%] bg-night/70 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 z-10">
                          <span className="text-[7px] sm:text-[9px] md:text-[10px] uppercase tracking-wider md:tracking-widest font-semibold text-ivory whitespace-nowrap">
                            {selectedFront.detailLabel}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-start justify-end origin-top-right transform scale-[1.6] sm:scale-[1.8] md:scale-[2.2] lg:scale-[2.5]">
                      <div className="w-[120px] sm:w-[140px] md:w-[180px] lg:w-[220px] aspect-[3/4] rounded-sm flex-shrink-0 mt-4 mr-4 md:mt-10 md:mr-10">
                        <FrontBacking profile={selectedFront.profile}>
                          <MaterialPanel 
                            variant={activeVariant} 
                            profile={selectedFront.profile} 
                            className="w-full h-full transition-all duration-300" 
                          />
                        </FrontBacking>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SEKCJA Z WARIANTAMI KOLORYSTYCZNYMI */}
              <div className="relative z-10 mt-12 md:mt-16 flex gap-5 md:gap-7 items-center justify-center w-full">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActiveVariant(opt.id)}
                    className="group relative flex flex-col items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-night rounded-sm"
                    title={opt.name}
                    aria-label={`Wybierz kolor ${opt.name}`}
                  >
                    <span 
                      className={`w-10 h-10 md:w-14 md:h-14 rounded-sm border-[2px] transition-all duration-300 flex items-center justify-center ${opt.bgClass} ${
                        activeVariant === opt.id 
                          ? 'border-copper scale-125 shadow-[0_0_25px_rgba(184,107,62,0.6)] z-10' 
                          : 'border-line-dark/50 hover:border-gold/50'
                      }`}
                    >
                      <span className="w-full h-full block rounded-[2px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]" />
                    </span>
                  </button>
                ))}
              </div>

            </div>

            {/* PRAWA STRONA: Teksty */}
            <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-16 lg:p-24 flex flex-col justify-center text-center md:text-left overflow-y-auto">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-ivory mb-1 md:mb-4">{selectedFront.title}</h2>
              <p className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest font-semibold text-gold mb-3 md:mb-10">{selectedFront.desc}</p>
              
              <p className="text-ivory/70 font-light leading-snug md:leading-relaxed mb-6 md:mb-12 text-[14px] sm:text-[15px] md:text-xl lg:text-2xl text-left">
                {selectedFront.longDesc}
              </p>

              <a 
                href="#kontakt" 
                onClick={handleContactClick}
                className="bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night px-6 py-3 md:px-12 md:py-5 text-[14px] md:text-lg font-medium hover:brightness-110 transition-all rounded-sm inline-block w-max mx-auto md:mx-0 mt-1 shadow-[0_0_20px_rgba(184,107,62,0.15)] hover:shadow-[0_0_30px_rgba(184,107,62,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                Zapytaj o ten front
              </a>
            </div>

          </div>
        </div>
      )}

      {/* --- GŁÓWNY WIDOK KATALOGU --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <header className="mb-16 md:mb-20 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10">
          <Reveal className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-copper" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-gold">
                Dokumentacja techniczna
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-ivory mb-6">Katalog frontów</h1>
            <p className="text-ivory/70 text-lg font-light leading-relaxed">
              Poznaj nasze propozycje frezowań i wykończeń dla Twoich projektów.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col sm:flex-row gap-6">
             <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[15px] font-medium text-ivory hover:text-copper transition-colors relative group inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-copper rounded-sm"
            >
              <ExternalLinkIcon className="w-4 h-4" aria-hidden="true" /> Otwórz PDF w nowej karcie
              <span className="absolute left-0 -bottom-1.5 w-full h-[1px] bg-copper scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          </Reveal>
        </header>

        <section className="mb-24">
          <Reveal>
            <div className="flex justify-between items-end mb-10 hairline-dark-b pb-6">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-ivory">Baza wykończeń</h2>
                <p className="text-ivory/60 font-light mt-4">Poglądowe zestawienie frezowań, fornirów i powłok lakierniczych.</p>
              </div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 lg:gap-x-6 lg:gap-y-12">
            {catalogFronts.map((item, idx) => (
              <Reveal key={idx} delay={(idx % 6) * 50} variant="slide-up">
                <button 
                  className="group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-4 focus-visible:ring-offset-night rounded-sm text-left w-full block" 
                  onClick={() => setSelectedFront(item)}
                >
                  <div className="w-full aspect-[3/4] rounded-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 relative flex items-center justify-center bg-surface-2/30 shadow-[0_10px_20px_rgba(0,0,0,0.4)] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,107,62,0.08),transparent_70%)] pointer-events-none scale-150" />
                    
                    <FrontBacking profile={item.profile} className="relative z-10">
                      <MaterialPanel 
                        variant={item.variant} 
                        profile={item.profile}
                        className="w-full h-full rounded-sm"
                      />
                    </FrontBacking>
                  </div>
                  <div className="mt-4 hairline-dark-t pt-3 flex flex-col gap-1">
                    <h3 className="font-serif text-lg text-ivory transition-colors duration-300 group-hover:text-copper">
                      {item.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-dark mt-1">
                      {item.desc}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 hairline-dark-t">
            <Reveal>
              <h2 className="font-serif text-3xl text-ivory mb-10 pt-8">Jak złożyć zamówienie?</h2>
            </Reveal>
            <div className="space-y-0">
              {[
                { title: "Wybierz wzór", desc: "Zwróć uwagę na głębokość frezu oraz opcje uchwytów wpuszczanych." },
                { title: "Wybierz wykończenie", desc: "Oferujemy mat, półmat oraz wysoki połysk. Każdy front może być przygotowany również w surowym MDF." },
                { title: "Wyślij zapytanie", desc: "Podaj kod frontu i zestawienie formatek do szybkiej wyceny." }
              ].map((step, idx) => (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="group relative flex gap-8 py-8 hairline-dark-b hover:bg-surface-2 transition-colors duration-500 px-4 -mx-4">
                    <div className="absolute top-[-1px] left-0 right-0 h-[1px] bg-copper scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <span className="flex-shrink-0 font-serif text-3xl text-ivory/10 transition-colors duration-500 group-hover:text-copper mt-[-4px]">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-ivory mb-2 transition-colors duration-500 group-hover:text-copper">{step.title}</h3>
                      <p className="text-ivory/70 font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-6">
            <Reveal delay={200}>
              <div className="bg-surface p-12 md:p-16 relative overflow-hidden flex flex-col justify-center rounded-sm border border-line-dark shadow-2xl">
                <div className="absolute inset-0 bg-rings text-ivory opacity-5 pointer-events-none" aria-hidden="true" />
                <div className="absolute inset-0 bg-grain mix-blend-overlay opacity-10 pointer-events-none" aria-hidden="true" />
                
                <div className="relative z-10">
                  <h3 className="font-serif text-3xl text-ivory mb-6">Potrzebujesz wyceny konkretnych wzorów?</h3>
                  <p className="mb-10 text-ivory/70 font-light leading-relaxed">
                    Skopiuj numery wzorów z katalogu, dodaj wymiary i prześlij zapytanie do naszego zespołu za pomocą formularza.
                  </p>
                  <a 
                    href="#kontakt" 
                    onClick={handleContactClick}
                    className="inline-block bg-[linear-gradient(135deg,var(--color-copper),var(--color-gold))] text-night px-8 py-4 text-[15px] font-medium hover:brightness-110 transition-all rounded-sm shadow-[0_0_20px_rgba(184,107,62,0.15)] hover:shadow-[0_0_30px_rgba(184,107,62,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    Przejdź do formularza
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </div>
  );
};