import React from 'react';
import { Heart, Compass, LayoutGrid, BedDouble, Bath, Car } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (id: string) => void;
  onSimulateCost: (id: string) => void;
  onAdapt?: (id: string) => void;
}

export default function ProjectCard({
  project,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onSimulateCost,
  onAdapt,
}: ProjectCardProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const getFriendlyType = (type: string) => {
    const map: Record<string, string> = {
      terrea: 'Casa Térrea',
      sobrado: 'Sobrado',
      campo: 'Casa de Campo',
      madeira: 'Casa de Madeira',
      geminada: 'Casa Geminada',
      esquina: 'Casa de Esquina',
      comercial: 'Comercial',
      edificio: 'Edifício',
      chale: 'Chalé',
    };
    return map[type] || type;
  };

  const fallbackImage = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="%230E1721"/><path d="M150 450 L300 200 L450 450 Z" fill="%231E293B" stroke="%23334155" stroke-width="4"/><path d="M350 450 L450 300 L550 450 Z" fill="%231E293B" stroke="%23334155" stroke-width="4"/><text x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" font-weight="bold" fill="%23DFB277">ÓRDUS ENGENHARIA</text><text x="50%25" y="48%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394A3B8">Visualização indisponível</text></svg>`;
  const [imgSrc, setImgSrc] = React.useState(project.images[0] || fallbackImage);

  // Sync state if project images array change
  React.useEffect(() => {
    setImgSrc(project.images[0] || fallbackImage);
  }, [project.images]);

  return (
    <div
      id={`project-card-${project.id}`}
      className="bg-white border border-slate-150 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group animate-fade-in"
    >
      {/* Imagem do Projeto */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={project.title}
          referrerPolicy="no-referrer"
          onError={() => setImgSrc(fallbackImage)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => onSelect(project.id)}
          loading="lazy"
        />
        
        {/* Favoritos Button */}
        <button
          id={`favorite-btn-${project.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(project.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs shadow-sm text-slate-800 hover:text-rose-600 transition cursor-pointer"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart className={`w-4.5 h-4.5 transition-colors ${isFavorite ? 'fill-rose-600 text-rose-600' : 'text-slate-700 hover:text-rose-600'}`} />
        </button>

        {/* Código Badge */}
        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/90 text-white font-mono text-[10px] font-medium tracking-wider">
          ESTUDO: {project.id}
        </span>

        {/* Tipo de Arquitetura Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 text-slate-900 font-semibold text-[10px] uppercase tracking-wider shadow-xs">
          {getFriendlyType(project.type)}
        </span>
      </div>

      {/* Conteúdo Técnico */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              {project.category}
            </span>
            <span className="text-sm font-bold text-slate-900 font-mono">
              {formatCurrency(project.price)}
            </span>
          </div>

          <h4
            onClick={() => onSelect(project.id)}
            className="font-bold text-slate-800 hover:text-slate-900 text-sm leading-tight cursor-pointer line-clamp-1 group-hover:underline font-sans"
          >
            {project.title}
          </h4>
        </div>

        {/* Grade de Especificações Técnicas */}
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-1.5 py-3 border-y border-slate-100 text-xs text-slate-600 font-medium font-mono">
          <div className="flex items-center gap-1.5 col-span-2 text-[11px] text-slate-700 bg-slate-50 p-1.5 rounded-lg border border-slate-100/50">
            <Compass className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Lote Ideal: <strong className="text-slate-900">{project.lotWidth}x{project.lotLength}m</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Área: <strong className="text-slate-950 font-bold">{project.builtArea} m²</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Quartos: <strong className="text-slate-950">{project.bedrooms}</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Suítes/BWC: <strong className="text-slate-950">{project.suites}/{project.bathrooms}</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Vagas: <strong className="text-slate-950">{project.parkingSpaces}</strong></span>
          </div>
        </div>

        {/* CTA Botoes */}
        <div className="space-y-2 text-xs pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`details-btn-${project.id}`}
              onClick={() => onSelect(project.id)}
              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-center border border-slate-200 transition cursor-pointer"
            >
              Ver estudo
            </button>
            <button
              id={`calc-btn-${project.id}`}
              onClick={() => onSimulateCost(project.id)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-center shadow-xs transition cursor-pointer"
            >
              Simular custo
            </button>
          </div>
          <button
            id={`adapt-btn-${project.id}`}
            onClick={() => onAdapt?.(project.id)}
            className="w-full py-2.5 bg-white hover:bg-[#C29047]/5 text-[#C29047] hover:text-[#AC7A34] font-bold rounded-xl text-center border border-[#C29047]/40 hover:border-[#C29047] transition cursor-pointer"
          >
            Solicitar adaptação
          </button>
        </div>
      </div>
    </div>
  );
}
