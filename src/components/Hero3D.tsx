import React, { useEffect, useRef, useState } from 'react';
import { MaterialPanel, MaterialVariant, ProfileType } from './MaterialPanel';

// Zaktualizowane mapowanie z podziałem na kod i opis dla dwuliniowych etykiet
const LABELS_DATA = {
  lithos: { code: "F-15", desc: "Ryflowany / Półwałek" },
  bazalt: { code: "F-8", desc: "Ramowy / Shaker" },
  magma: { code: "F-14", desc: "Ryflowany / Wklęsłe frezy" },
};

interface Panel3DProps {
  variant: MaterialVariant;
  profile: ProfileType;
  labelCode: string;
  labelDesc: string;
  twoLines?: boolean;
  labelPos: 'top-left' | 'top-right' | 'bottom-left';
  showLabel: boolean;
  x: string;
  y: string;
  z: string;
  depth?: number;
  sideColor?: string;
}

const Panel3D: React.FC<Panel3DProps> = ({
  variant, profile, labelCode, labelDesc, twoLines, labelPos, showLabel, x, y, z, depth = 18, sideColor = '#241D18'
}) => {
  return (
    <div 
      className="absolute inset-0 preserve-3d"
      style={{ transform: `translate3d(${x}, ${y}, ${z})` }}
    >
      {/* Front płyty */}
      <div 
        className="absolute inset-0 preserve-3d" 
        style={{ transform: `translateZ(${depth / 2}px)` }}
      >
        <MaterialPanel variant={variant} profile={profile} className="w-full h-full" />
      </div>
      
      {/* Tył płyty z cieniem (odrzuconym do tyłu sceny) */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: sideColor, transform: `translateZ(-${depth / 2}px) rotateY(180deg)` }} 
      >
        <div 
          className="absolute inset-0 bg-black/60 blur-[30px]"
          style={{ transform: `translateZ(-20px) translateY(20px) scale(0.95)` }}
        />
      </div>
      
      {/* Krawędzie boczne (Grubość płyty) - dopasowane ujemnymi marginesami do krawędzi frontu */}
      <div 
        className="absolute top-0 bottom-0 brightness-75" 
        style={{ backgroundColor: sideColor, left: -depth / 2, width: depth, transform: 'rotateY(-90deg)' }} 
      />
      <div 
        className="absolute top-0 bottom-0 brightness-50" 
        style={{ backgroundColor: sideColor, right: -depth / 2, width: depth, transform: 'rotateY(90deg)' }} 
      />
      <div 
        className="absolute left-0 right-0 brightness-110" 
        style={{ backgroundColor: sideColor, top: -depth / 2, height: depth, transform: 'rotateX(90deg)' }} 
      />
      <div 
        className="absolute left-0 right-0 brightness-50" 
        style={{ backgroundColor: sideColor, bottom: -depth / 2, height: depth, transform: 'rotateX(-90deg)' }} 
      />

      {/* ETYKIETA - Dziecko wrappera, dziedziczy pozycję 3D własnego frontu */}
      {showLabel && (
        <div 
          className={`absolute flex gap-3 whitespace-nowrap pointer-events-none preserve-3d ${
            labelPos === 'top-left' ? 'bottom-[calc(100%+20px)] left-0 items-start' :
            labelPos === 'top-right' ? 'bottom-[calc(100%+20px)] right-0 flex-row-reverse items-start text-right' :
            'top-[calc(100%+24px)] left-0 items-center'
          }`}
          style={{ transform: `translateZ(${depth / 2 + 2}px)` }}
        >
          {/* Cienka linia ivory, obniżona lekko by licowała z pierwszą linijką, gdy teksty są dwuwersowe */}
          <div className={`w-8 h-[1px] bg-ivory/25 shrink-0 ${twoLines ? 'mt-[7px]' : ''}`} />
          
          {twoLines ? (
            <div className={`flex flex-col ${labelPos === 'top-right' ? 'items-end' : 'items-start'}`} style={{ textShadow: '0 1px 8px rgba(14,11,9,.9)' }}>
              <span className="text-[11px] text-ivory tracking-[0.15em] font-semibold uppercase">{labelCode}</span>
              <span className="text-[9px] text-muted-dark tracking-widest font-light uppercase mt-1">{labelDesc}</span>
            </div>
          ) : (
            <span 
              className="text-[11px] text-ivory tracking-[0.15em] font-semibold uppercase flex gap-1.5" 
              style={{ textShadow: '0 1px 8px rgba(14,11,9,.9)' }}
            >
              {labelCode} <span className="text-muted-dark font-light tracking-widest">&middot; {labelDesc}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  const [show3DLabels, setShow3DLabels] = useState(true);
  const [isInteractive, setIsInteractive] = useState(true);
  
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkState = () => {
      const mqDesktop = window.matchMedia('(min-width: 1024px)').matches;
      const mqHover = window.matchMedia('(hover: hover)').matches;
      const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const interactive = mqHover && !mqMotion;
      setIsInteractive(interactive);
      // Etykiety 3D przypinane do paneli tylko na dużych ekranach z hoverem
      setShow3DLabels(mqDesktop && interactive);
    };
    
    checkState();
    window.addEventListener('resize', checkState);
    return () => window.removeEventListener('resize', checkState);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (isInteractive) {
        currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
        currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;
      } else {
        currentMouse.current.x = 0;
        currentMouse.current.y = 0;
      }

      if (sceneRef.current) {
        const rotX = 6 - (currentMouse.current.y * 6);
        const rotY = -18 + (currentMouse.current.x * 6);
        sceneRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isInteractive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isInteractive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; 
    const y = (e.clientY - rect.top) / rect.height;
    
    targetMouse.current.x = (x - 0.5) * 2;
    targetMouse.current.y = (y - 0.5) * 2;
  };

  const handleMouseLeave = () => {
    targetMouse.current.x = 0;
    targetMouse.current.y = 0;
  };

  return (
    <div className="w-full relative flex flex-col items-center">
      
      <div 
        ref={containerRef}
        className="w-full h-[350px] sm:h-[450px] lg:h-[550px] relative perspective-1200 flex items-center justify-center overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Światło w tle - poza kontekstem preserve-3d by nie spłaszczać sceny */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] bg-copper/20 rounded-full blur-[80px] lg:blur-[120px]" />
        </div>

        <div 
          ref={sceneRef}
          className="w-[130px] sm:w-[170px] lg:w-[210px] aspect-[3/4] relative preserve-3d z-10"
          style={{ 
            transform: 'rotateX(6deg) rotateY(-18deg)',
            transition: isInteractive ? 'none' : 'transform 1s ease-out'
          }}
        >

          {/* 1. Jasny (Lewy, Tło) */}
          <Panel3D 
            variant="lithos" 
            profile="half-round" 
            labelCode={LABELS_DATA.lithos.code}
            labelDesc={LABELS_DATA.lithos.desc}
            twoLines={true}
            labelPos="top-left"
            showLabel={show3DLabels}
            x="-70%" 
            y="-10%" 
            z="-60px"
            sideColor="#B6B1A8"
          />

          {/* 2. Miedziany (Prawy, Tło) */}
          <Panel3D 
            variant="magma" 
            profile="concave-grooves" 
            labelCode={LABELS_DATA.magma.code}
            labelDesc={LABELS_DATA.magma.desc}
            twoLines={true}
            labelPos="top-right"
            showLabel={show3DLabels}
            x="70%" 
            y="-10%" 
            z="-60px"
            sideColor="#9E370B"
          />

          {/* 3. Czarny (Środek, Pierwszy plan) */}
          <Panel3D 
            variant="bazalt" 
            profile="shaker" 
            labelCode={LABELS_DATA.bazalt.code}
            labelDesc={LABELS_DATA.bazalt.desc}
            twoLines={false}
            labelPos="bottom-left"
            showLabel={show3DLabels}
            x="0%" 
            y="10%" 
            z="80px"
            sideColor="#110E0C"
          />

        </div>
      </div>

      {/* ETYKIETY (Mobile/Fallback) - Zwykła płaska lista */}
      {!show3DLabels && (
        <div className="flex flex-col gap-2.5 w-full mt-0 pb-4">
          {[LABELS_DATA.lithos, LABELS_DATA.bazalt, LABELS_DATA.magma].map((l, idx) => (
            <div key={idx} className="flex items-center gap-3 justify-center">
              <div className="w-8 h-[1px] bg-ivory/25" />
              <span className="text-[10px] text-ivory uppercase tracking-widest font-semibold text-center flex gap-1">
                {l.code} <span className="text-muted-dark font-light">&middot; {l.desc}</span>
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};