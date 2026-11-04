import React from 'react';

// Dodano strokeLinecap i strokeLinejoin 'round', by krawędzie były miękkie i nigdy nie tworzyły ostrych sklejeń
const iconProps = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const accentProps = {
  stroke: "var(--color-brand)",
};

// -- Ikony Nawigacyjne i UI --
export const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M3 6h18M3 12h18M3 18h18" />
    <path d="M3 12h10" {...accentProps} />
  </svg>
);

export const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M5 5l14 14" />
    <path d="M19 5L5 19" {...accentProps} />
  </svg>
);

export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" {...accentProps} />
  </svg>
);

export const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M5 12h14" {...accentProps} />
  </svg>
);

export const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M15 5l7 7-7 7M3 12h19" />
  </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M12 3v14M8 13l4 4 4-4" />
    <path d="M4 21h16" {...accentProps} />
  </svg>
);

export const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M10 6H4v14h14v-6" />
    <path d="M13 4h7v7M11 13l9-9" {...accentProps} />
  </svg>
);

// -- Ikony Branżowe (Produkcja, Narzędzia, Materiały) --

export const FrontIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <rect x="4" y="2" width="16" height="20" />
    <rect x="7" y="5" width="10" height="14" {...accentProps} />
    <path d="M11 12h2" />
  </svg>
);

export const LayersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <polygon points="12 4 3 8 12 12 21 8" />
    <polyline points="3 13 12 17 21 13" />
    <polyline points="3 18 12 22 21 18" {...accentProps} />
  </svg>
);

// NOWA IKONA: Wycinarnia (rozcięta płyta meblowa, idealnie czysta)
export const CutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M5 5h4v14H5z" />
    <path d="M15 5h4v14h-4z" />
    <path d="M12 2v20" strokeDasharray="3 3" {...accentProps} />
  </svg>
);

export const PaintIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M11 9V4h4v5" />
    <path d="M6 9h10v4H6z" />
    <path d="M8 13l-1.5 5h3L11 13" />
    <path d="M12 13v2" />
    <path d="M19 8l2-2M20 11h3M19 14l2 2" {...accentProps} />
  </svg>
);

// NOWA IKONA: Ciężarówka (jeden ciągły obrys, koła wpisane idealnie w luki)
export const TruckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M3 17h2 M9 17h6 M19 17h2" />
    <path d="M3 17V7h10v10" />
    <path d="M13 11h4l3 3v3h-1" />
    <path d="M5 10h6 M5 13h6" {...accentProps} />
  </svg>
);

// NOWA IKONA: Zlecenia nietypowe / Architekci (Krzywa wektorowa Beziera z punktami kontrolnymi)
export const CustomIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <rect x="4" y="15" width="2" height="2" />
    <rect x="18" y="15" width="2" height="2" />
    <circle cx="12" cy="6" r="1.5" />
    <path d="M5 16 L12 7 M19 16 L12 7" strokeDasharray="2 2" />
    <path d="M5 16 Q 12 0 19 16" {...accentProps} />
  </svg>
);
export const ArchitectIcon = CustomIcon;

export const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <rect x="5" y="3" width="14" height="18" />
    <path d="M9 8h6M9 12h6" {...accentProps} />
    <path d="M5 17h14" />
  </svg>
);

export const CalculatorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <rect x="5" y="3" width="14" height="18" />
    <path d="M9 7h6" {...accentProps} />
    <path d="M9 12h1M14 12h1M9 16h1M14 16h1" />
  </svg>
);

export const MachineIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M6 3h12v18H6z" />
    <path d="M12 3v18" {...accentProps} />
    <path d="M9 10h6" />
  </svg>
);

export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <rect x="4" y="4" width="12" height="12" />
    <rect x="8" y="8" width="12" height="12" {...accentProps} />
  </svg>
);

export const FactoryIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M3 21V8l6-4v4l6-4v4l6-4v13H3z" />
    <path d="M17 5v-3" {...accentProps} />
  </svg>
);

export const StoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} {...props}>
    <path d="M3 4v16h18V4H3zM3 12h18" />
    <path d="M7 8h4M13 16h4" {...accentProps} />
  </svg>
);
export const FurnitureIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconProps} strokeLinejoin="round" {...props}>
    {/* Główna bryła mebla */}
    <rect x="4" y="6" width="16" height="12" />
    {/* Minimalistyczne nóżki */}
    <path d="M6 18v2M18 18v2" />
    {/* Podział na fronty/szuflady */}
    <path d="M4 12h16" />
    <path d="M12 12v6" />
    {/* Uchwyty meblowe (Akcent pomarańczowy) */}
    <path d="M12 9h-4M14 15h2M8 15h2" {...accentProps} />
  </svg>
);