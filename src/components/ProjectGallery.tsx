import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const fallbackImage = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230E1721"/><path d="M150 450 L300 200 L450 450 Z" fill="%231E293B" stroke="%23334155" stroke-width="4"/><path d="M350 450 L450 300 L550 450 Z" fill="%231E293B" stroke="%23334155" stroke-width="4"/><text x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" font-weight="bold" fill="%23DFB277">ÓRDUS ENGENHARIA</text><text x="50%25" y="48%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394A3B8">Visualização indisponível</text></svg>`;
  
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (images && images.length > 0) {
      setGalleryImages(images);
    } else {
      setGalleryImages([fallbackImage]);
    }
    setActiveIndex(0);
  }, [images]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = (index: number) => {
    setGalleryImages((prev) => {
      const copy = [...prev];
      if (copy[index] !== fallbackImage) {
        copy[index] = fallbackImage;
      }
      return copy;
    });
  };

  if (galleryImages.length === 0) {
    return (
      <div id="gallery-empty" className="aspect-16/9 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 text-sm">
        Nenhuma imagem disponível
      </div>
    );
  }

  return (
    <div id="gallery-root-container" className="space-y-4">
      {/* Imagem Principal em Destaque */}
      <div id="gallery-main-view" className="relative aspect-16/10 sm:aspect-16/9 w-full bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden group">
        <img
          src={galleryImages[activeIndex]}
          alt={`${title} - Visualização ${activeIndex + 1}`}
          referrerPolicy="no-referrer"
          onError={() => handleImageError(activeIndex)}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />

        {/* Gradiente sutil inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Setas de Controle */}
        {galleryImages.length > 1 && (
          <>
            <button
              id="gallery-prev-btn"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 backdrop-blur-xs shadow-md text-slate-800 hover:bg-white transition cursor-pointer hover:scale-105"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="gallery-next-btn"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 backdrop-blur-xs shadow-md text-slate-800 hover:bg-white transition cursor-pointer hover:scale-105"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Indicador no canto */}
        <span className="absolute bottom-4 right-4 bg-slate-900/85 text-white font-mono text-[10px] px-2.5 py-1 rounded-md font-medium">
          {activeIndex + 1} / {galleryImages.length}
        </span>
      </div>

      {/* Miniaturas (Thumbnails) de Navegação */}
      {galleryImages.length > 1 && (
        <div id="gallery-thumbs-row" className="grid grid-cols-3 gap-3">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              id={`gallery-thumb-${i}`}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-4/3 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                activeIndex === i
                  ? 'border-slate-900 ring-2 ring-slate-900/10'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
            >
              <img
                src={img}
                alt={`${title} mini ${i + 1}`}
                referrerPolicy="no-referrer"
                onError={() => handleImageError(i)}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
