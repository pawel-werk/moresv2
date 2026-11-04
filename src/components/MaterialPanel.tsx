import React from 'react';

export type MaterialVariant = 'bazalt' | 'magma' | 'lithos' | 'tundra' | 'lumina';
export type ProfileType = 'flat' | 'frame' | 'slatted' | 'grooved' | 'integrated-handle' | 'half-round' | 'integrated-handle-full' | 'integrated-handle-centered' | 'integrated-handle-hidden' | 'raised-panel' | 'micro-frame' | 'shaker' | 'complex-raised-panel' | 'double-stepped-panel' | 'vertical-stiles-raised' | 'flat-grooves' | 'concave-grooves' | 'mullion-frame' | 'glass-frame' | 'lattice-frame';

interface MaterialPanelProps {
  src?: string;
  alt?: string;
  variant?: MaterialVariant;
  profile?: ProfileType;
  className?: string;
}

export const MaterialPanel: React.FC<MaterialPanelProps> = ({
  src,
  alt = "Próbka frontu",
  variant = 'bazalt',
  profile = 'flat',
  className = ''
}) => {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-sm ${className}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  const getVariantStyle = () => {
    switch (variant) {
      case 'bazalt': return 'bg-graphite'; 
      case 'magma': return 'bg-brand'; 
      case 'lithos': return 'bg-ash'; 
      case 'tundra': return 'bg-oak bg-grain'; 
      case 'lumina': return 'bg-paper'; 
      default: return 'bg-graphite';
    }
  };

  const isDark = variant === 'bazalt' || variant === 'magma';
  const shadowOp = isDark ? '0.7' : '0.15'; 
  const highlightOp = isDark ? '0.1' : '0.7'; 

  const renderGlass = () => (
    <div className="absolute inset-0 bg-slate-400/20 backdrop-blur-md shadow-[inset_1px_1px_8px_rgba(0,0,0,0.15)] overflow-hidden">
      <div className="absolute -inset-[150%] bg-gradient-to-tr from-transparent via-white/30 to-transparent transform rotate-[35deg] translate-x-[20%] pointer-events-none" />
    </div>
  );

  // Ustalenie, czy front wymaga przezroczystego środka (witryny, ażury)
  let seeThroughBevel = '0px';
  if (profile === 'glass-frame' || profile === 'mullion-frame') seeThroughBevel = '6px';
  if (profile === 'lattice-frame') seeThroughBevel = '10px';
  const isSeeThrough = seeThroughBevel !== '0px';

  return (
    <div className={`relative overflow-hidden rounded-sm shadow-xl ${isSeeThrough ? '' : getVariantStyle()} ${className}`}>
      
      {/* Podbudowa ramy dla frontów "na wylot" */}
      {isSeeThrough && (
        <>
          <div className={`absolute top-0 left-0 right-0 ${getVariantStyle()}`} style={{ height: `calc(18% + ${seeThroughBevel})` }} />
          <div className={`absolute bottom-0 left-0 right-0 ${getVariantStyle()}`} style={{ height: `calc(18% + ${seeThroughBevel})` }} />
          <div className={`absolute top-[18%] bottom-[18%] left-0 ${getVariantStyle()}`} style={{ width: `calc(18% + ${seeThroughBevel})` }} />
          <div className={`absolute top-[18%] bottom-[18%] right-0 ${getVariantStyle()}`} style={{ width: `calc(18% + ${seeThroughBevel})` }} />
        </>
      )}

      {/* Podbudowa dla szprosów witryny */}
      {profile === 'mullion-frame' && (
        <>
          <div className={`absolute top-[50%] -mt-[9px] h-[18px] left-[18%] right-[18%] ${getVariantStyle()}`} />
          <div className={`absolute left-[50%] -ml-[9px] w-[18px] top-[18%] bottom-[18%] ${getVariantStyle()}`} />
        </>
      )}

      {/* Główne oświetlenie frontu */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none ${isSeeThrough ? 'opacity-60 mix-blend-overlay' : ''}`} />

      {/* Profil 5: Wypukłe półwałki (F-15) */}
      {profile === 'half-round' && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              to right,
              rgba(0,0,0,${Number(shadowOp) * 1.5}) 0%,
              rgba(0,0,0,${Number(shadowOp) * 1.5}) 0.05%,
              rgba(255,255,255,${Number(highlightOp) * 1.4}) 0.6%,
              rgba(255,255,255,${Number(highlightOp) * 0.5}) 1.5%,
              rgba(0,0,0,0) 1.9%,
              rgba(0,0,0,${Number(shadowOp) * 0.8}) 2.45%,
              rgba(0,0,0,${Number(shadowOp) * 1.5}) 2.5%
            )`
          }}
        />
      )}

      {/* Profil 1: Klasyczna, szeroka rama (Shaker płaski) */}
      {profile === 'frame' && (
        <div 
          className="absolute inset-[18%] border-t border-l"
          style={{
            borderColor: `rgba(255,255,255,${highlightOp})`,
            boxShadow: `inset 4px 4px 12px rgba(0,0,0,${shadowOp}), 1px 1px 0 rgba(255,255,255,${highlightOp})`
          }}
        >
          <div className="absolute inset-0 border-b border-r" style={{ borderColor: `rgba(0,0,0,${shadowOp})` }} />
        </div>
      )}

      {/* Profil 2: Ostre listwowanie (Lamele) */}
      {profile === 'slatted' && (
        <div className="absolute inset-0 flex justify-evenly pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i} 
              className="h-full w-[10%] border-r" 
              style={{ 
                borderColor: `rgba(0,0,0,${shadowOp})`,
                boxShadow: `1px 0 2px rgba(255,255,255,${highlightOp})`
              }} 
            />
          ))}
        </div>
      )}

      {/* Profil 3: Wąski rowek obwiedniowy (F-13) */}
      {profile === 'grooved' && (
        <div className="absolute inset-[4%] pointer-events-none">
          <div 
            className="absolute inset-0 rounded-[2px]"
            style={{
              borderTop: `1.5px solid rgba(0,0,0,${shadowOp})`,
              borderLeft: `1.5px solid rgba(0,0,0,${shadowOp})`,
              borderBottom: `1.5px solid rgba(255,255,255,${highlightOp})`,
              borderRight: `1.5px solid rgba(255,255,255,${highlightOp})`,
            }}
          />
          <div 
            className={`absolute inset-[1.5px] rounded-[1.5px] ${getVariantStyle()}`}
            style={{
              borderTop: `1px solid rgba(255,255,255,${highlightOp})`,
              borderLeft: `1px solid rgba(255,255,255,${highlightOp})`,
              borderBottom: `1px solid rgba(0,0,0,${shadowOp})`,
              borderRight: `1px solid rgba(0,0,0,${shadowOp})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Profil 4: Zintegrowany uchwyt asymetryczny (F-2) - WERSJA Z ZAOKRĄGLONYMI SKOSAMI */}
      {profile === 'integrated-handle' && (
        <svg 
          className="absolute top-0 left-0 w-[85%] h-[7%] pointer-events-none" 
          preserveAspectRatio="none" 
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="innerShadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`rgba(0,0,0,${Number(shadowOp) * 0.5})`} />
              <stop offset="100%" stopColor={`rgba(0,0,0,${Number(shadowOp) * 0.05})`} />
            </linearGradient>
          </defs>
          <path 
            d="M 0,0 L 96,0 Q 100,0 99,10 L 91,90 Q 90,100 86,100 L 0,100 Z" 
            fill="url(#innerShadow)" 
          />
          <path 
            d="M 0,100 L 86,100 Q 90,100 91,90" 
            fill="none" 
            stroke={`rgba(255,255,255,${highlightOp})`} 
            strokeWidth="3" 
            vectorEffect="non-scaling-stroke" 
          />
          <path 
            d="M 96,0 Q 100,0 99,10 L 91,90" 
            fill="none" 
            stroke={`rgba(0,0,0,${Number(shadowOp) * 0.3})`} 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke" 
          />
        </svg>
      )}

      {/* Profil 6: Zintegrowany uchwyt na całej szerokości (F-1) */}
      {profile === 'integrated-handle-full' && (
        <div className="absolute top-0 left-0 right-0 h-[7%] pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: `rgba(0,0,0,${Number(shadowOp) * 0.3})`,
              boxShadow: `inset 0px 6px 8px rgba(0,0,0,${Number(shadowOp) * 0.8})`,
              borderBottom: `2.5px solid rgba(255,255,255,${highlightOp})`,
            }}
          />
        </div>
      )}

      {/* Profil 7: Symetryczny uchwyt odsunięty od krawędzi (F-3) - WERSJA Z ZAOKRĄGLONYMI SKOSAMI */}
      {profile === 'integrated-handle-centered' && (
        <svg 
          className="absolute top-0 left-[15%] w-[70%] h-[7%] pointer-events-none" 
          preserveAspectRatio="none" 
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="innerShadowSym" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`rgba(0,0,0,${Number(shadowOp) * 0.5})`} />
              <stop offset="100%" stopColor={`rgba(0,0,0,${Number(shadowOp) * 0.05})`} />
            </linearGradient>
          </defs>
          <path 
            d="M 4,0 L 96,0 Q 100,0 99,10 L 91,90 Q 90,100 86,100 L 14,100 Q 10,100 9,90 L 1,10 Q 0,0 4,0 Z" 
            fill="url(#innerShadowSym)" 
          />
          <path 
            d="M 9,90 Q 10,100 14,100 L 86,100 Q 90,100 91,90" 
            fill="none" 
            stroke={`rgba(255,255,255,${highlightOp})`} 
            strokeWidth="3" 
            vectorEffect="non-scaling-stroke" 
          />
          <path 
            d="M 4,0 Q 0,0 1,10 L 9,90" 
            fill="none" 
            stroke={`rgba(0,0,0,${Number(shadowOp) * 0.3})`} 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke" 
          />
          <path 
            d="M 96,0 Q 100,0 99,10 L 91,90" 
            fill="none" 
            stroke={`rgba(0,0,0,${Number(shadowOp) * 0.3})`} 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke" 
          />
        </svg>
      )}

      {/* Profil 8: Ukryty uchwyt krawędziowy (F-4) */}
      {profile === 'integrated-handle-hidden' && null}

      {/* Profil 9: Ramowy z wypukłą płyciną (F-6) */}
      {profile === 'raised-panel' && (
        <div className="absolute inset-[17%] pointer-events-none">
          <div className="absolute inset-0" style={{
              borderStyle: 'solid',
              borderWidth: '5px',
              borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
              borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
              borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.8})`,
              borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.8})`,
            }}>
            <div className="absolute inset-0 bg-black/5 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)]">
              <div className={`absolute inset-[2px] ${getVariantStyle()}`} style={{
                  borderStyle: 'solid',
                  borderWidth: '6px',
                  borderTopColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
                  borderLeftColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
                  borderBottomColor: `rgba(0,0,0,${Number(shadowOp) * 0.6})`,
                  borderRightColor: `rgba(0,0,0,${Number(shadowOp) * 0.6})`,
                }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profil 10: Mikroramka na skraju frontu z twardym skosem 45 stopni (F-7) */}
      {profile === 'micro-frame' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-[1px]" style={{
            borderStyle: 'solid',
            borderWidth: '2.5px',
            borderTopColor: `rgba(255,255,255,${Number(highlightOp) * 0.6})`,
            borderLeftColor: `rgba(255,255,255,${Number(highlightOp) * 0.6})`,
            borderBottomColor: `rgba(0,0,0,${Number(shadowOp) * 0.4})`,
            borderRightColor: `rgba(0,0,0,${Number(shadowOp) * 0.4})`,
          }}>
            <div className="absolute inset-0" style={{
              borderStyle: 'solid',
              borderWidth: '4px',
              borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
              borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
              borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.8})`,
              borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.8})`,
            }}>
               <div className="absolute inset-0 bg-black/[0.02] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]" />
            </div>
          </div>
        </div>
      )}

      {/* Profil 11: Ramowy Shaker z obniżeniem pod kątem 45 stopni (F-8) */}
      {profile === 'shaker' && (
        <div className="absolute inset-[18%] pointer-events-none">
          <div className="absolute inset-0" style={{
              borderStyle: 'solid',
              borderWidth: '7px',
              borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
              borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
              borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.8})`,
              borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.8})`,
            }}>
            <div className="absolute inset-0 bg-black/[0.03] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)]" />
          </div>
        </div>
      )}

      {/* Profil 12: Rozbudowany front klasyczny (F-9) */}
      {profile === 'complex-raised-panel' && (
        <>
          <div className="absolute inset-[2%] pointer-events-none rounded-[1px]" style={{
            borderStyle: 'solid',
            borderWidth: '1.5px',
            borderTopColor: `rgba(255,255,255,${Number(highlightOp) * 0.7})`,
            borderLeftColor: `rgba(255,255,255,${Number(highlightOp) * 0.7})`,
            borderBottomColor: `rgba(0,0,0,${Number(shadowOp) * 0.5})`,
            borderRightColor: `rgba(0,0,0,${Number(shadowOp) * 0.5})`,
          }} />
          
          <div className="absolute inset-[18%] pointer-events-none">
            <div className="absolute inset-0" style={{
              borderStyle: 'solid',
              borderWidth: '8px',
              borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
              borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
              borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
              borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
            }}>
              <div className="absolute inset-0 bg-black/[0.06] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
                <div className="absolute inset-[12px]">
                  <div className="absolute inset-0" style={{
                    borderStyle: 'solid',
                    borderWidth: '2.5px',
                    borderTopColor: `rgba(255,255,255,${Number(highlightOp) * 0.8})`,
                    borderLeftColor: `rgba(255,255,255,${Number(highlightOp) * 0.8})`,
                    borderBottomColor: `rgba(0,0,0,${Number(shadowOp) * 0.5})`,
                    borderRightColor: `rgba(0,0,0,${Number(shadowOp) * 0.5})`,
                  }}>
                    <div className="absolute inset-[6px]">
                      <div className={`absolute inset-0 ${getVariantStyle()}`} style={{
                        borderStyle: 'solid',
                        borderWidth: '16px',
                        borderTopColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
                        borderLeftColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
                        borderBottomColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
                        borderRightColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
                      }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Profil 13: Podwójnie stopniowany w dół (F-10) */}
      {profile === 'double-stepped-panel' && (
        <div className="absolute inset-[18%] pointer-events-none">
          <div className="absolute inset-0" style={{
            borderStyle: 'solid',
            borderWidth: '6px',
            borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
            borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
            borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.8})`,
            borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.8})`,
          }}>
            <div className="absolute inset-0 bg-black/[0.03]" style={{
              borderStyle: 'solid',
              borderWidth: '8px', 
              borderColor: 'transparent'
            }}>
              <div className="absolute inset-0" style={{
                borderStyle: 'solid',
                borderWidth: '6px',
                borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
                borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
                borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
                borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
              }}>
                <div className="absolute inset-0 bg-black/[0.06]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profil 14: Pionowe ramiaki z obniżeniem i wypukłą płytą środkową (F-11) */}
      {profile === 'vertical-stiles-raised' && (
        <>
          <div className="absolute top-0 h-[18%] left-[18%] w-[4px] pointer-events-none z-10" style={{
            borderLeft: `2px solid rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderRight: `2px solid rgba(255,255,255,${Number(highlightOp) * 0.9})`,
          }} />
          <div className="absolute bottom-0 h-[18%] left-[18%] w-[4px] pointer-events-none z-10" style={{
            borderLeft: `2px solid rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderRight: `2px solid rgba(255,255,255,${Number(highlightOp) * 0.9})`,
          }} />
          <div className="absolute top-0 h-[18%] right-[18%] w-[4px] pointer-events-none z-10" style={{
            borderLeft: `2px solid rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderRight: `2px solid rgba(255,255,255,${Number(highlightOp) * 0.9})`,
          }} />
          <div className="absolute bottom-0 h-[18%] right-[18%] w-[4px] pointer-events-none z-10" style={{
            borderLeft: `2px solid rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderRight: `2px solid rgba(255,255,255,${Number(highlightOp) * 0.9})`,
          }} />

          <div className="absolute inset-[18%] pointer-events-none">
            <div className="absolute inset-0" style={{
              borderStyle: 'solid',
              borderWidth: '4px', 
              borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
              borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
              borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
              borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
            }}>
              <div className="absolute inset-0 bg-black/[0.08]" style={{
                borderStyle: 'solid',
                borderWidth: '18px',
                borderColor: 'transparent'
              }}>
                <div className={`absolute inset-0 ${getVariantStyle()}`} style={{
                  borderStyle: 'solid',
                  borderWidth: '4px',
                  borderTopColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
                  borderLeftColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
                  borderBottomColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
                  borderRightColor: `rgba(0,0,0,${Number(shadowOp) * 0.7})`,
                }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Profil 15: Płaskie wycięcia / szeroki ryfel (F-12) */}
      {profile === 'flat-grooves' && (
        <div className="absolute inset-0 flex justify-evenly pointer-events-none">
          {Array.from({ length: 9 }).map((_, i) => (
            <div 
              key={i} 
              className="h-full w-[4.5%]" 
              style={{ 
                borderLeft: `1.5px solid rgba(0,0,0,${Number(shadowOp) * 0.8})`,
                borderRight: `1.5px solid rgba(255,255,255,${Number(highlightOp) * 0.9})`,
                backgroundColor: `rgba(0,0,0,0.06)`,
                boxShadow: `inset 1px 0 2px rgba(0,0,0,${Number(shadowOp) * 0.3})`
              }} 
            />
          ))}
        </div>
      )}

      {/* Profil 16: Wklęsłe frezy z płaskimi przerwami (F-14) */}
      {profile === 'concave-grooves' && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              to right,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0) 2.5%,
              rgba(0,0,0,${Number(shadowOp) * 1.5}) 2.8%,
              rgba(0,0,0,0) 5%,
              rgba(255,255,255,${Number(highlightOp) * 1.2}) 7.6%,
              rgba(0,0,0,0) 8%
            )`
          }}
        />
      )}

      {/* Profil 17: Klasyczna witryna ze szprosami i szkłem (F-16) */}
      {profile === 'mullion-frame' && (
        <div className="absolute inset-[18%] pointer-events-none">
          <div className="absolute top-0 left-0 right-[calc(50%+3px)] bottom-[calc(50%+3px)]" style={{
            borderStyle: 'solid',
            borderWidth: '6px', 
            borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
            borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
          }}>
            {renderGlass()}
          </div>
          
          <div className="absolute top-0 left-[calc(50%+3px)] right-0 bottom-[calc(50%+3px)]" style={{
            borderStyle: 'solid',
            borderWidth: '6px',
            borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
            borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
          }}>
            {renderGlass()}
          </div>

          <div className="absolute top-[calc(50%+3px)] left-0 right-[calc(50%+3px)] bottom-0" style={{
            borderStyle: 'solid',
            borderWidth: '6px',
            borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
            borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
          }}>
            {renderGlass()}
          </div>

          <div className="absolute top-[calc(50%+3px)] left-[calc(50%+3px)] right-0 bottom-0" style={{
            borderStyle: 'solid',
            borderWidth: '6px',
            borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
            borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
          }}>
            {renderGlass()}
          </div>
        </div>
      )}

      {/* Profil 18: Witryna z pojedynczą szybą (F-17) */}
      {profile === 'glass-frame' && (
        <div className="absolute inset-[18%] pointer-events-none">
          <div className="absolute inset-0" style={{
            borderStyle: 'solid',
            borderWidth: '6px', 
            borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
            borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
          }}>
            {renderGlass()}
          </div>
        </div>
      )}

      {/* Profil 19: Witryna z ażurową kratką wyciętą na wylot (F-18) */}
      {profile === 'lattice-frame' && (
        <div className="absolute inset-[18%] pointer-events-none">
          <div className="absolute inset-0 z-20 pointer-events-none" style={{
            borderStyle: 'solid',
            borderWidth: '10px',
            borderTopColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderLeftColor: `rgba(0,0,0,${Number(shadowOp) * 0.8})`,
            borderBottomColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
            borderRightColor: `rgba(255,255,255,${Number(highlightOp) * 0.9})`,
          }} />

          <div className="absolute inset-[10px] z-10 overflow-hidden pointer-events-auto">
            <div 
              className="absolute inset-0 bg-black/60"
              style={{
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg stroke='black' stroke-width='8' stroke-linecap='square'%3E%3Cline x1='0' y1='0' x2='24' y2='24'/%3E%3Cline x1='24' y1='0' x2='0' y2='24'/%3E%3C/g%3E%3C/svg%3E")`,
                maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg stroke='black' stroke-width='8' stroke-linecap='square'%3E%3Cline x1='0' y1='0' x2='24' y2='24'/%3E%3Cline x1='24' y1='0' x2='0' y2='24'/%3E%3C/g%3E%3C/svg%3E")`,
                WebkitMaskSize: '24px 24px',
                maskSize: '24px 24px',
                transform: 'translate(1.5px, 2.5px)' 
              }}
            />
            <div 
              className={`absolute inset-0 ${getVariantStyle()}`}
              style={{
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg stroke='black' stroke-width='8' stroke-linecap='square'%3E%3Cline x1='0' y1='0' x2='24' y2='24'/%3E%3Cline x1='24' y1='0' x2='0' y2='24'/%3E%3C/g%3E%3C/svg%3E")`,
                maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg stroke='black' stroke-width='8' stroke-linecap='square'%3E%3Cline x1='0' y1='0' x2='24' y2='24'/%3E%3Cline x1='24' y1='0' x2='0' y2='24'/%3E%3C/g%3E%3C/svg%3E")`,
                WebkitMaskSize: '24px 24px',
                maskSize: '24px 24px',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10 pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};