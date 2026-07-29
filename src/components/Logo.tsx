import React from 'react';

interface LogoProps {
  className?: string;
  id?: string;
  variant?: 'light-bg' | 'dark-bg';
  layout?: 'horizontal' | 'vertical' | 'icon-only';
}

export default function Logo({ 
  className = "h-[44px] sm:h-[52px]", 
  id = "ordus-logo", 
  variant = 'light-bg',
  layout = 'horizontal'
}: LogoProps) {
  const isDarkBg = variant === 'dark-bg';
  
  // Palette matching Órdus Engenharia corporate identity
  const textColorMain = isDarkBg ? '#FFFFFF' : '#0F172A';
  const textColorSub = isDarkBg ? '#CBD5E1' : '#334155';
  const frameColor = isDarkBg ? '#F8FAFC' : '#1E293B';
  const goldColor = '#C29047'; // Official Órdus Gold Accent

  if (layout === 'icon-only') {
    return (
      <svg
        id={id}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} aspect-square object-contain`}
        aria-label="Órdus Engenharia"
      >
        <g transform="translate(50, 50)">
          {/* Outer Diamond Frame */}
          <rect
            x="-36"
            y="-36"
            width="72"
            height="72"
            rx="12"
            transform="rotate(45)"
            stroke={frameColor}
            strokeWidth="11"
            fill="none"
          />
          {/* Center Gold Diamond */}
          <rect
            x="-14"
            y="-14"
            width="28"
            height="28"
            rx="4"
            transform="rotate(45)"
            fill={goldColor}
          />
        </g>
      </svg>
    );
  }

  if (layout === 'vertical') {
    return (
      <div id={id} className={`flex flex-col items-center justify-center gap-2 select-none ${className}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 shrink-0"
        >
          <g transform="translate(50, 50)">
            <rect
              x="-36"
              y="-36"
              width="72"
              height="72"
              rx="12"
              transform="rotate(45)"
              stroke={frameColor}
              strokeWidth="11"
              fill="none"
            />
            <rect
              x="-14"
              y="-14"
              width="28"
              height="28"
              rx="4"
              transform="rotate(45)"
              fill={goldColor}
            />
          </g>
        </svg>
        <div className="text-center">
          <div 
            className="font-black tracking-[0.18em] text-2xl uppercase leading-none" 
            style={{ color: textColorMain, fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            ÓRDUS
          </div>
          <div 
            className="font-medium tracking-[0.32em] text-[11px] uppercase mt-1 leading-none" 
            style={{ color: textColorSub, fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Engenharia
          </div>
        </div>
      </div>
    );
  }

  // Default Horizontal (Emblem + Typography)
  return (
    <div id={id} className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square shrink-0 py-0.5"
      >
        <g transform="translate(50, 50)">
          {/* Outer Rhombus Frame */}
          <rect
            x="-35"
            y="-35"
            width="70"
            height="70"
            rx="12"
            transform="rotate(45)"
            stroke={frameColor}
            strokeWidth="11"
            fill="none"
          />
          {/* Center Gold Accent Diamond */}
          <rect
            x="-14"
            y="-14"
            width="28"
            height="28"
            rx="4"
            transform="rotate(45)"
            fill={goldColor}
          />
        </g>
      </svg>
      <div className="flex flex-col justify-center leading-none">
        <span 
          className="font-black text-[1.2em] tracking-[0.16em] uppercase" 
          style={{ color: textColorMain, fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          ÓRDUS
        </span>
        <span 
          className="font-medium text-[0.6em] tracking-[0.32em] uppercase mt-0.5" 
          style={{ color: textColorSub, fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          Engenharia
        </span>
      </div>
    </div>
  );
}


