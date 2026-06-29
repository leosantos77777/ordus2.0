import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Project } from '../types';
import { projectRepository } from '../repositories/ProjectRepository';
import ProjectCard from '../components/ProjectCard';

interface FavoritesPageProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function FavoritesPage({ favorites, onToggleFavorite }: FavoritesPageProps) {
  const navigate = useNavigate();
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectRepository.getProjects().then((list) => {
      const filtered = list.filter((p) => favorites.includes(p.id));
      setFavoriteProjects(filtered);
      setLoading(false);
    });
  }, [favorites]);

  const handleSimulateCostForProject = (id: string) => {
    const proj = favoriteProjects.find((p) => p.id === id);
    if (proj) {
      navigate('/calculadora-custo-obra', {
        state: {
          area: proj.builtArea,
          standard: proj.price > 4000 ? 'alto_luxo' : proj.price > 2500 ? 'medio' : 'economico',
        }
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C29047]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in mt-2 animate-fade-in">
      <div id="favorites-header" className="space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Seus Projetos Salvos
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm">
          Projetos e plantas arquitetônicas adicionadas à sua lista de interesse local. Salvos de forma persistente em seu navegador.
        </p>
      </div>

      {favoriteProjects.length === 0 ? (
        <div id="favorites-empty-state" className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white border border-slate-200 rounded-3xl">
          <div className="p-4 bg-slate-50 text-slate-400 rounded-full border border-slate-100 mb-4 animate-pulse">
            <Heart className="w-8 h-8 text-[#C29047]" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Sua lista está vazia</h3>
          <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
            Gostou de algum sobrado, chalé ou galeria comercial da Órdus Engenharia? Clique no ícone de coração nos cards para salvá-lo aqui.
          </p>
          <button
            onClick={() => navigate('/projetos')}
            className="px-5 py-2.5 bg-slate-950 text-white font-semibold text-sm rounded-xl hover:bg-slate-800 transition shadow-sm cursor-pointer"
          >
            Explorar Catálogo de Projetos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelect={(pid) => navigate(`/projetos/${pid}`)}
              onSimulateCost={handleSimulateCostForProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
