import React, { useEffect, useState } from 'react';
import { XIcon } from './Icons';
import { Reveal } from './Reveal';
import { MaterialPanel, MaterialVariant } from './MaterialPanel';
import { scrollToSection } from '../utils/scrollToSection';

type CatalogItem = {
  title: string;
  desc: string;
  variant: MaterialVariant;
  profile: 'flat' | 'frame' | 'slatted' | 'grooved' | 'integrated-handle' | 'half-round' | 'integrated-handle-full' | 'integrated-handle-centered' | 'integrated-handle-hidden' | 'raised-panel' | 'micro-frame' | 'shaker' | 'complex-raised-panel' | 'double-stepped-panel' | 'vertical-stiles-raised' | 'flat-grooves' | 'concave-grooves' | 'mullion-frame' | 'glass-frame' | 'lattice-frame';
  longDesc: string;
  detailGraphic?: 'hidden-handle' | 'half-round' | 'top-handle';
  detailLabel?: string;
  // Zoom w kółku dla standardowych frontów (punkt na froncie trafia na środek kółka):
  zoomX?: number;     // 0-100: punkt poziomo (0 = lewa krawędź frontu, 100 = prawa)
  zoomY?: number;     // 0-100: punkt pionowo (0 = góra frontu, 100 = dół)
  zoomScale?: number; // siła powiększenia (domyślnie 2.8)
};

const colorOptions: { id: MaterialVariant; name: string; bgClass: string }[] = [
  { id: 'lithos', name: 'Jasny', bgClass: 'bg-[#D3CCC3]' },
  { id: 'azure', name: 'Błękitny', bgClass: 'bg-[#5c7a8c]' },
  { id: 'magma', name: 'Brązowy', bgClass: 'bg-[#5D4037]' },
  { id: 'bazalt', name: 'Grafitowy', bgClass: 'bg-[#212121]' }
];

const catalogFronts: CatalogItem[] = [
  { 
    title: "F-1", 
    desc: "Płaski / Uchwyt pełny", 
    variant: "lithos", 
    profile: "integrated-handle-full", 
    longDesc: "Czysty, płaski front ze zintegrowanym uchwytem frezowanym na całej szerokości krawędzi. Kwintesencja minimalizmu i funkcjonalności.", 
    detailGraphic: 'top-handle', 
    detailLabel: 'DETAL: POCHWYT' 
  },
  { title: "F-2", desc: "Płaski / Uchwyt asymetryczny", variant: "lithos", profile: "integrated-handle", longDesc: "Minimalistyczny front z precyzyjnie wyfrezowanym, zintegrowanym uchwytem krawędziowym. Łączy w sobie czystość formy z najwyższą ergonomią bezuchwytowego otwierania.", zoomX: 85, zoomY: 8, zoomScale: 2.6 },
  { title: "F-3", desc: "Płaski / Uchwyt symetryczny", variant: "lithos", profile: "integrated-handle-centered", longDesc: "Nowoczesny front z wycentrowanym, symetrycznym frezem uchwytowym. Zakończony eleganckimi skosami z obu stron.", zoomX: 85, zoomY: 8, zoomScale: 2.6 },
  {
    title: "F-4",
    desc: "Płaski / Uchwyt ukryty",
    variant: "lithos",
    profile: "integrated-handle-hidden",
    longDesc: "Front z wycięciem w górnej krawędzi. Front od przodu zachowuje jednolitą, gładką płaszczyznę, a frez uchwytowy pozostaje całkowicie niewidoczny.",
    detailGraphic: 'hidden-handle',
    detailLabel: 'Detal: ukryty uchwyt'
  },
  { title: "F-5", desc: "Płaski / Gładki", variant: "lithos", profile: "flat", longDesc: "Klasyczny, gładki front lakierowany bez żadnych dodatkowych frezowań i detali. Minimalistyczna, jednolita płaszczyzna, która stanowi doskonałą bazę dla nowoczesnych projektów.", zoomX: 90, zoomY: 8, zoomScale: 2.6 },
  { title: "F-6", desc: "Ramowy / Wypukła płycina", variant: "lithos", profile: "raised-panel", longDesc: "Klasyczny front ramowy z frezowaną, wypukłą płyciną wewnętrzną. Wprowadza tradycyjny, elegancki charakter do nowoczesnych projektów, nawiązując do najwyższej klasy stolarki angielskiej.", zoomX: 80, zoomY: 17, zoomScale: 2.6 },
  { title: "F-7", desc: "Płaski / Mikroramka", variant: "lithos", profile: "micro-frame", longDesc: "Nowoczesny front z niezwykle cienką, subtelną ramką na samych krawędziach. Idealny kompromis między gładkim minimalizmem a klasycznym, ramiakowym stylem.", zoomX: 90, zoomY: 8, zoomScale: 2.8 },
  { title: "F-8", desc: "Ramowy / Shaker", variant: "lithos", profile: "shaker", longDesc: "Klasyczny, ponadczasowy front ramiakowy (tzw. Shaker) z głęboko osadzoną, płaską płyciną opadającą pod kątem 45 stopni. Wprowadza architektoniczny rygor i czystość formy.", zoomX: 80, zoomY: 17, zoomScale: 2.6 },
  { title: "F-9", desc: "Ramowy / Klasyczny z frezem", variant: "lithos", profile: "complex-raised-panel", longDesc: "Rozbudowany front klasyczny łączący szeroką ramę, podwójne fazy pod kątem 45 stopni (w dół i w górę) oraz dodatkowy, subtelny frez obwiedniowy na zewnętrznej płaszczyźnie.", zoomX: 75, zoomY: 23, zoomScale: 2.6 },
  { title: "F-10", desc: "Ramowy / Podwójny schodek", variant: "lithos", profile: "double-stepped-panel", longDesc: "Elegancki front z szeroką ramą, która schodkuje w dół pod kątem 45 stopni, rozdzielona płaską frezą i kolejnym spadkiem, aż do zagłębionej płyciny. Nowoczesna interpretacja tradycyjnego stylu ramiakowego.", zoomX: 75, zoomY: 23, zoomScale: 2.6 },
  { title: "F-11", desc: "Ramowy / Pionowe ramiaki", variant: "lithos", profile: "vertical-stiles-raised", longDesc: "Front inspirowany klasyczną konstrukcją z wyraźnymi, pionowymi fugami przechodzącymi przez całą wysokość. Wewnętrzna płycina jest dodatkowo wyprofilowana i wypukła, wprowadzając rzemieślniczy, tradycyjny detal do zabudowy.", zoomX: 75, zoomY: 23, zoomScale: 2.6 },
  { title: "F-12", desc: "Ryflowany / Płaskie frezy", variant: "lithos", profile: "flat-grooves", longDesc: "Front ryflowany o geometrycznym, technicznym charakterze. Pionowe, płaskie wycięcia tworzą powtarzalny, nowoczesny rytm. Idealny do urozmaicenia gładkich powierzchni zabudowy.", zoomX: 90, zoomY: 8, zoomScale: 2.8 },
  { title: "F-13", desc: "Płaski / Frez obwiedniowy", variant: "lithos", profile: "grooved", longDesc: "Klasyczny, elegancki front z subtelnym, pojedynczym frezem obwiedniowym. Detal, który dodaje wyrafinowania bez obciążania przestrzeni.", zoomX: 90, zoomY: 8, zoomScale: 2.8 },
  { title: "F-14", desc: "Ryflowany / Wklęsłe frezy", variant: "lithos", profile: "concave-grooves", longDesc: "Gęste, rytmiczne ryflowanie w formie wklęsłych wcięć oddzielonych wąskimi, płaskimi paskami. Niezwykle taktylna powierzchnia o mocnym, wertykalnym rysunku.", zoomX: 90, zoomY: 8, zoomScale: 2.8 },
  {
    title: "F-15",
    desc: "Ryflowany / Półwałek",
    variant: "lithos",
    profile: "half-round",
    longDesc: "Niezwykle modne ryflowanie o miękkim, wypukłym profilu półwałka. Tworzy powtarzalny, organiczny wzór, który doskonale rozprasza światło i nadaje wnętrzu przytulny, a zarazem nowoczesny charakter. Każdy półwałek ma 10 mm szerokości, a między nimi pozostaje 1 mm przerwy.",
    detailGraphic: 'half-round',
    detailLabel: 'Detal: półwałek 10 mm'
  },
  { title: "F-16", desc: "Witryna / Szprosy krzyżowe", variant: "lithos", profile: "mullion-frame", longDesc: "Klasyczny front witrynowy z krzyżowymi szprosami i fazowanymi krawędziami okienek pod kątem 45 stopni. Nadaje zabudowie lekkości i eksponuje zawartość szafek.", zoomX: 50, zoomY: 50, zoomScale: 2.8 },
  { title: "F-17", desc: "Witryna / Szklana tafla", variant: "lithos", profile: "glass-frame", longDesc: "Klasyczna witryna z szeroką ramą, ściętą precyzyjnie pod kątem 45 stopni w kierunku pojedynczej, dużej tafli szkła. Minimalistyczna forma otwierająca przestrzeń wewnątrz szafki.", zoomX: 80, zoomY: 17, zoomScale: 2.6 },
  { title: "F-18", desc: "Ramowy / Kratka", variant: "lithos", profile: "lattice-frame", longDesc: "Front ramowy z klasycznym, ukośnym dziurkowaniem (kratką) w płaskiej płycinie. Ścięcie ramki pod kątem 45 stopni płynnie łączy się z dekoracyjnym, ażurowym środkiem, zapewniając wentylację i unikalny styl retro.", zoomX: 75, zoomY: 23, zoomScale: 2.6 },
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
 * Detal uchwytu (Pochwyt frontu F-1) - Kopią 1:1 do ukrytego uchwytu, z asymetrią ścianek.
 */
const TopHandleDetail: React.FC<{ variant: MaterialVariant }> = ({ variant }) => {
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
  const sideTop = isDark ? mix(base, '#ffffff', 0.04) : mix(base, '#000000', 0.22);
  const sideBottom = isDark ? mix(base, '#000000', 0.15) : mix(base, '#000000', 0.34);
  const innerBack = isDark ? mix(base, '#000000', 0.25) : mix(base, '#000000', 0.40);
  const innerFront = isDark ? mix(base, '#ffffff', 0.08) : mix(base, '#000000', 0.10);
  const bgCenter = isDark ? '#443c35' : '#3a332e';
  const bgEdge = isDark ? '#1f1b18' : '#171310';

  // ============ WYMIARY DO STROJENIA ============
  const THICK = 100;      // grubość frontu
  const LEN = 1100;        // długość frontu w głąb kadru
  const BOT = 1250;       // wysokość frontu
  const NOTCH_RATIO = 0.68; // szerokość wycięcia / grubość frontu
  const ANGLE_DEG = 38.7; // kąt perspektywy
  const SCALE = 0.25;      // powiększenie całego detalu w kadrze
  const TOP_SCREEN = 140; // pozycja górnej krawędzi na ekranie
  const ROUND = 1.2;      // zaokrąglenie narożników
  
  const NOTCH_DEPTH = 1.14;  // głębokość łuku
  const NOTCH_LIFT = 0.67;   // prosty odcinek przed łukiem

  // ===== RÓŻNICA WYSOKOŚCI ŚCIANEK =====
  const TOP_L = 100; // Lewa ścianka WYŻSZA (mniejsza wartość Y)
  const TOP_R = 240; // Prawa ścianka NIŻSZA (większa wartość Y)
  // =====================================

  const L = 40;
  const WALL = (THICK * (1 - NOTCH_RATIO)) / 2.7;
  const R = L + THICK;
  const CL = L + WALL;
  const CR = R - WALL;
  
  const RX = (CR - CL) / 2;
  const RY = RX * NOTCH_DEPTH;
  const S = RX * NOTCH_LIFT;
  const CX = (CL + CR) / 2;
  const CY = 195 + S; 

  const ang = (ANGLE_DEG * Math.PI) / 180;
  const DX = LEN * Math.cos(ang);
  const DY = -LEN * Math.sin(ang);

  const tx = 200 - ((L + R + DX) / 2) * SCALE;
  const ty = TOP_SCREEN - (195 + DY) * SCALE;

  const a = -DX / RX;
  const b = -DY / RY;
  const phi0 = Math.max(0, Math.atan2(b, a) - Math.PI / 2);
  const p0x = CX + RX * Math.cos(phi0);
  const p0y = CY + RY * Math.sin(phi0);

  const innerPath =
    `M ${CL}${TOP_L} L ${CL}${CY} A ${RX}${RY} 0 0 0 ${p0x}${p0y} L ${p0x + DX}${p0y + DY} A ${RX}${RY} 0 0 1 ${CL + DX}${CY + DY} L ${CL + DX}${TOP_L + DY} Z`;
  const sideWallPath = `M ${R}${TOP_R} L ${R + DX}${TOP_R + DY} L ${R + DX}${BOT + DY} L ${R}${BOT} Z`;
  const leftLedgePath = `M ${L}${TOP_L} L ${CL}${TOP_L} L ${CL + DX}${TOP_L + DY} L ${L + DX}${TOP