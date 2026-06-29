import React from 'react';
import { Search, SlidersHorizontal, Sliders, RefreshCw } from 'lucide-react';
import { ProjectFilters, ProjectType, ProjectCategory } from '../types';

interface FilterPanelProps {
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
  onClear: () => void;
  resultsCount: number;
}

export default function FilterPanel({ filters, onChange, onClear, resultsCount }: FilterPanelProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Converte para número se for necessário
    const isNum = [
      'minWidth', 'maxWidth',
      'minLength', 'maxLength',
      'minArea', 'maxArea',
      'minPrice', 'maxPrice'
    ].includes(name);

    onChange({
      ...filters,
      [name]: isNum ? (value === '' ? 0 : Number(value)) : value
    });
  };

  const handleSelectField = <K extends keyof ProjectFilters>(name: K, value: ProjectFilters[K]) => {
    onChange({
      ...filters,
      [name]: value
    });
  };

  const typesList: { value: ProjectType | 'all'; label: string }[] = [
    { value: 'all', label: 'Todos os tipos' },
    { value: 'terrea', label: 'Casa Térrea' },
    { value: 'sobrado', label: 'Sobrado' },
    { value: 'campo', label: 'Casa de Campo' },
    { value: 'madeira', label: 'Casa de Madeira' },
    { value: 'geminada', label: 'Casa Geminada' },
    { value: 'esquina', label: 'Casa de Esquina' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'edificio', label: 'Edifício Residencial' },
    { value: 'chale', label: 'Chalé/Cabana' }
  ];

  return (
    <div id="filter-sidebar" className="bg-white border border-slate-200 rounded-2xl p-5 space-y-6 shadow-sm">
      {/* Cabeçalho */}
      <div id="filter-header" className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-slate-800" />
          <h3 className="font-bold text-slate-900 text-sm">Filtros de Busca</h3>
        </div>
        <button
          id="filter-reset-action"
          onClick={onClear}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          Limpar
        </button>
      </div>

      {/* Resultados Count */}
      <div id="filter-stat-indicator" className="text-xs text-slate-500 font-medium font-mono">
        Exibindo {resultsCount} projeto(s) encontrado(s)
      </div>

      {/* Barra de Pesquisa */}
      <div id="search-by-term-group" className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">Pesquisar por Código ou Título</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            name="searchQuery"
            value={filters.searchQuery}
            onChange={handleInputChange}
            placeholder="Ex: P-945, Sobrado..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-950"
          />
        </div>
      </div>

      {/* Categorias (Comercial vs Residencial) */}
      <div id="category-selector-group" className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">Categoria Geral</label>
        <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
          {(['all', 'residencial', 'comercial'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleSelectField('category', cat)}
              className={`py-1.5 text-[11px] font-semibold rounded-lg transition-all capitalize cursor-pointer ${
                filters.category === cat
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-100'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'Ver Todos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tipos de Projeto */}
      <div id="type-selector-group" className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">Tipo de Arquitetura</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-950"
        >
          {typesList.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Terreno Ideal (Largura x Comprimento) */}
      <div id="lot-dimensions-block" className="space-y-3.5 border-t border-slate-100 pt-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Largura Mínima do Lote (Metros)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minWidth"
              value={filters.minWidth || ''}
              onChange={handleInputChange}
              placeholder="Min (Ex: 8)"
              min={0}
              className="w-full px-3 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-950"
            />
            <span className="text-xs text-slate-400">m</span>
            <input
              type="number"
              name="maxWidth"
              value={filters.maxWidth || ''}
              onChange={handleInputChange}
              placeholder="Máx (Ex: 12)"
              min={0}
              className="w-full px-3 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-950"
            />
            <span className="text-xs text-slate-400">m</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Comprimento do Lote (Metros)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minLength"
              value={filters.minLength || ''}
              onChange={handleInputChange}
              placeholder="Min (Ex: 20)"
              min={0}
              className="w-full px-3 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-950"
            />
            <span className="text-xs text-slate-400">m</span>
            <input
              type="number"
              name="maxLength"
              value={filters.maxLength || ''}
              onChange={handleInputChange}
              placeholder="Máx (Ex: 30)"
              min={0}
              className="w-full px-3 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-950"
            />
            <span className="text-xs text-slate-400">m</span>
          </div>
        </div>
      </div>

      {/* Área Construída */}
      <div id="built-area-range-block" className="space-y-1.5 border-t border-slate-100 pt-4">
        <label className="text-xs font-bold text-slate-700">Área Construída (m²)</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="minArea"
            value={filters.minArea || ''}
            onChange={handleInputChange}
            placeholder="Min m²"
            min={0}
            className="w-full px-3 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-950"
          />
          <span className="text-xs text-slate-400">a</span>
          <input
            type="number"
            name="maxArea"
            value={filters.maxArea || ''}
            onChange={handleInputChange}
            placeholder="Máx m²"
            min={0}
            className="w-full px-3 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-950"
          />
        </div>
      </div>

      {/* Composição Interna (Quartos, Suítes, Banheiros, Vagas, Pavimentos) */}
      <div id="internal-composition-block" className="space-y-3.5 border-t border-slate-100 pt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">Quartos Mínimos</label>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none"
            >
              <option value="all">Tanto faz</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">Suítes Mínimas</label>
            <select
              name="suites"
              value={filters.suites}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none"
            >
              <option value="all">Tanto faz</option>
              <option value="0">0+</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">Banheiros</label>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none"
            >
              <option value="all">Tanto faz</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700">Vagas Garagem</label>
            <select
              name="parkingSpaces"
              value={filters.parkingSpaces}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none"
            >
              <option value="all">Tanto faz</option>
              <option value="0">0+</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Pavimentos (Andares)</label>
          <select
            name="floors"
            value={filters.floors}
            onChange={handleInputChange}
            className="w-full px-3 py-1.5 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-950"
          >
            <option value="all">Qualquer pavimentação</option>
            <option value="1">Apenas 1 andar (Térreo)</option>
            <option value="2">Apenas 2 andares (Sobrado)</option>
            <option value="3">3 ou mais andares</option>
          </select>
        </div>
      </div>

      {/* Faixa de Preço do Pacote Técnico */}
      <div id="price-range-block" className="space-y-1.5 border-t border-slate-100 pt-4">
        <div className="flex justify-between text-xs font-bold text-slate-700">
          <span>Preço do Projeto</span>
          <span className="font-mono text-slate-500">R$ {filters.minPrice} - R$ {filters.maxPrice}</span>
        </div>
        <input
          type="range"
          name="maxPrice"
          min={1200}
          max={6500}
          step={100}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-slate-900 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>R$ 1.200</span>
          <span>R$ 6.500</span>
        </div>
      </div>
    </div>
  );
}
