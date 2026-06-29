import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Project, ProjectFilters, ProjectType, SortOption } from '../types';
import { filterProjects, sortProjects } from '../data';
import { projectRepository } from '../repositories/ProjectRepository';
import FilterPanel from '../components/FilterPanel';
import ProjectCard from '../components/ProjectCard';
import EmptyState from '../components/EmptyState';

const defaultFilters: ProjectFilters = {
  searchQuery: '',
  category: 'all',
  type: 'all',
  minWidth: 0,
  maxWidth: 0,
  minLength: 0,
  maxLength: 0,
  minArea: 0,
  maxArea: 0,
  bedrooms: 'all',
  suites: 'all',
  bathrooms: 'all',
  parkingSpaces: 'all',
  floors: 'all',
  minPrice: 1200,
  maxPrice: 6500,
};

interface CatalogPageProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function CatalogPage({ favorites, onToggleFavorite }: CatalogPageProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const parseNumberOrAll = (val: string | null): number | 'all' => {
    if (!val || val === 'all') return 'all';
    const num = parseInt(val, 10);
    return isNaN(num) ? 'all' : num;
  };

  const parseSortOption = (val: string | null): SortOption => {
    const allowed: SortOption[] = ['recent', 'price_asc', 'price_desc', 'area_asc', 'area_desc'];
    if (val && allowed.includes(val as SortOption)) {
      return val as SortOption;
    }
    return 'recent';
  };

  // Derive filters state from searchParams
  const getFiltersFromParams = (): ProjectFilters => {
    return {
      searchQuery: searchParams.get('q') || '',
      category: (searchParams.get('cat') as 'comercial' | 'residencial') || 'all',
      type: (searchParams.get('type') as ProjectType) || 'all',
      minWidth: Number(searchParams.get('minW')) || 0,
      maxWidth: Number(searchParams.get('maxW')) || 0,
      minLength: Number(searchParams.get('minL')) || 0,
      maxLength: Number(searchParams.get('maxL')) || 0,
      minArea: Number(searchParams.get('minA')) || 0,
      maxArea: Number(searchParams.get('maxA')) || 0,
      bedrooms: parseNumberOrAll(searchParams.get('beds')),
      suites: parseNumberOrAll(searchParams.get('suites')),
      bathrooms: parseNumberOrAll(searchParams.get('baths')),
      parkingSpaces: parseNumberOrAll(searchParams.get('parks')),
      floors: parseNumberOrAll(searchParams.get('floors')),
      minPrice: Number(searchParams.get('minP')) || 1200,
      maxPrice: Number(searchParams.get('maxP')) || 6500,
    };
  };

  const [filters, setFilters] = useState<ProjectFilters>(getFiltersFromParams);
  const [sortBy, setSortBy] = useState<SortOption>(() => parseSortOption(searchParams.get('sort')));

  // React to searchParams updates from bidirectional changes (history back/forward)
  useEffect(() => {
    setFilters(getFiltersFromParams());
    setSortBy(parseSortOption(searchParams.get('sort')));
  }, [searchParams]);

  useEffect(() => {
    projectRepository.getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const handleFilterChange = (newFilters: ProjectFilters) => {
    const params: Record<string, string> = {};
    if (newFilters.searchQuery) params.q = newFilters.searchQuery;
    if (newFilters.category !== 'all') params.cat = newFilters.category;
    if (newFilters.type !== 'all') params.type = newFilters.type;
    if (newFilters.minWidth) params.minW = String(newFilters.minWidth);
    if (newFilters.maxWidth) params.maxW = String(newFilters.maxWidth);
    if (newFilters.minLength) params.minL = String(newFilters.minLength);
    if (newFilters.maxLength) params.maxL = String(newFilters.maxLength);
    if (newFilters.minArea) params.minA = String(newFilters.minArea);
    if (newFilters.maxArea) params.maxA = String(newFilters.maxArea);
    if (newFilters.bedrooms !== 'all') params.beds = String(newFilters.bedrooms);
    if (newFilters.suites !== 'all') params.suites = String(newFilters.suites);
    if (newFilters.bathrooms !== 'all') params.baths = String(newFilters.bathrooms);
    if (newFilters.parkingSpaces !== 'all') params.parks = String(newFilters.parkingSpaces);
    if (newFilters.floors !== 'all') params.floors = String(newFilters.floors);
    if (newFilters.minPrice !== 1200) params.minP = String(newFilters.minPrice);
    if (newFilters.maxPrice !== 6500) params.maxP = String(newFilters.maxPrice);
    if (sortBy !== 'recent') params.sort = sortBy;

    setSearchParams(params, { replace: true });
  };

  const handleClearFilters = () => {
    const params: Record<string, string> = {};
    if (sortBy !== 'recent') params.sort = sortBy;
    setSearchParams(params, { replace: true });
  };

  const handleSortChange = (newSort: SortOption) => {
    const params: Record<string, string> = {};
    if (filters.searchQuery) params.q = filters.searchQuery;
    if (filters.category !== 'all') params.cat = filters.category;
    if (filters.type !== 'all') params.type = filters.type;
    if (filters.minWidth) params.minW = String(filters.minWidth);
    if (filters.maxWidth) params.maxW = String(filters.maxWidth);
    if (filters.minLength) params.minL = String(filters.minLength);
    if (filters.maxLength) params.maxL = String(filters.maxLength);
    if (filters.minArea) params.minA = String(filters.minArea);
    if (filters.maxArea) params.maxA = String(filters.maxArea);
    if (filters.bedrooms !== 'all') params.beds = String(filters.bedrooms);
    if (filters.suites !== 'all') params.suites = String(filters.suites);
    if (filters.bathrooms !== 'all') params.baths = String(filters.bathrooms);
    if (filters.parkingSpaces !== 'all') params.parks = String(filters.parkingSpaces);
    if (filters.floors !== 'all') params.floors = String(filters.floors);
    if (filters.minPrice !== 1200) params.minP = String(filters.minPrice);
    if (filters.maxPrice !== 6500) params.maxP = String(filters.maxPrice);
    if (newSort !== 'recent') params.sort = newSort;

    setSearchParams(params, { replace: true });
  };

  const handleViewDetails = (id: string) => {
    navigate(`/projetos/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdaptProject = (id: string) => {
    navigate(`/projetos/${id}?action=adapt`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulateCostForProject = (id: string) => {
    const proj = projects.find((p) => p.id === id);
    if (proj) {
      navigate('/calculadora-custo-obra', {
        state: {
          area: proj.builtArea,
          standard: proj.price > 4000 ? 'alto_luxo' : proj.price > 2500 ? 'medio' : 'economico',
        },
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredList = filterProjects(projects, filters);
  const sortedAndFilteredList = sortProjects(filteredList, sortBy);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C29047]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner Especial da Órdus Engenharia */}
      <div id="catalog-hero" className="relative bg-[#0E1721] text-white rounded-3xl overflow-hidden p-8 sm:p-12 shadow-md">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200"
            alt="Arquitetura de Luxo"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative max-w-2xl space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#DFB277] uppercase bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
            Biblioteca de Estudos e Projetos
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
            Sua casa dos sonhos começa com um projeto perfeito.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed">
            Navegue pelo nosso acervo técnico de estudos e projetos autorais desenvolvidos pela equipe sênior da <b>Órdus Engenharia</b>. Cada estudo inclui premissas estruturais estruturadas e simulações para acelerar sua tomada de decisão.
          </p>
          <div className="flex flex-wrap gap-3 pt-2 text-xs">
            <button
              onClick={() => {
                handleFilterChange({ ...filters, type: 'sobrado' });
              }}
              className="bg-white text-slate-900 font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              Ver Sobrados
            </button>
            <button
              onClick={() => {
                navigate('/calculadora-custo-obra');
              }}
              className="bg-slate-800 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-700 transition border border-white/10 cursor-pointer"
            >
              Simular Custo de Obra
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filtros à Esquerda */}
        <div className="lg:col-span-4 sticky top-24">
          <FilterPanel
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            resultsCount={sortedAndFilteredList.length}
          />
        </div>

        {/* Grid de Cards à Direita */}
        <div className="lg:col-span-8 space-y-6">
          {/* Controle de ordenação */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200 rounded-xl p-4 gap-3">
            <span className="text-xs font-mono text-slate-500">
              {sortedAndFilteredList.length} estudos de alta precisão disponíveis
            </span>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <span className="font-semibold text-slate-600">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(parseSortOption(e.target.value))}
                className="px-2.5 py-1.5 border border-slate-200 text-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C29047]"
              >
                <option value="recent">ID: Mais recentes primeiro</option>
                <option value="price_asc">Pacote: Menor Preço</option>
                <option value="price_desc">Pacote: Maior Preço</option>
                <option value="area_asc">Área: Menor para Maior</option>
                <option value="area_desc">Área: Maior para Menor</option>
              </select>
            </div>
          </div>

          {/* Lista de Projetos */}
          {sortedAndFilteredList.length === 0 ? (
            <EmptyState onClearFilters={handleClearFilters} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sortedAndFilteredList.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isFavorite={favorites.includes(project.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelect={handleViewDetails}
                  onSimulateCost={handleSimulateCostForProject}
                  onAdapt={handleAdaptProject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
