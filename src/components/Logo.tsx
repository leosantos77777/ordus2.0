import React from 'react';

export default function Logo({ className = "w-8 h-8", withLabel = false }: { className?: string, withLabel?: boolean }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="ordus-logo-svg"
      >
        {/* Background / Base rotate group */}
        <g transform="rotate(45 50 50)">
          {/* Inner Golden/Bronze Diamond - rotated 45 relative to layout, so inside the rotate(45) it is a square aligned to the local axes */}
          <rect
            x="38"
            y="38"
            width="24"
            height="24"
            fill="#C29047"
            rx="4"
          />

          {/* Outer Border Segments (Four rounded thick angles forming a frame around the center) */}
          {/* Top Left Segment */}
          <path
            d="M 18,22 C 18,19.79 19.79,18 22,18 L 42,18 L 42,28 L 30,28 C 28.9,28 28,28.9 28,30 L 28,42 L 18,42 L 18,22 Z"
            fill="#16222F"
          />
          {/* Bottom Right Segment */}
          <path
            d="M 82,78 C 82,80.21 80.21,82 78,82 L 58,82 L 58,72 L 70,72 C 71.1,72 72,71.1 72,70 L 72,58 L 82,58 L 82,78 Z"
            fill="#16222F"
          />
          {/* Top Right Segment */}
          <path
            d="M 78,18 C 80.21,18 82,19.79 82,22 L 82,42 L 72,42 L 72,30 C 72,28.9 71.1,28 70,28 L 58,28 L 58,18 L 78,18 Z"
            fill="#2D3A4A"
          />
          {/* Bottom Left Segment */}
          <path
            d="M 22,82 C 19.79,82 18,80.21 18,78 L 18,58 L 28,58 L 28,70 C 28,71.1 28.9,72 30,72 L 42,72 L 42,82 L 22,82 Z"
            fill="#2D3A4A"
          />
        </g>
      </svg>
      {withLabel && (
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 font-sans uppercase">
              ÓRDUS
            </span>
            <span className="text-xs sm:text-sm font-light tracking-wide text-[#C29047] font-sans ml-2">
              Engenharia
            </span>
          </div>
          <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase hidden sm:block">
            Projetos & Construções
          </span>
        </div>
      )}
    </div>
  );
}
