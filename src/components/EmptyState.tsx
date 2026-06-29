import React from 'react';
import { ArchiveX } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div id="empty-state-container" className="flex flex-col items-center justify-center text-center py-16 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
      <div id="empty-state-icon-bg" className="p-4 bg-white rounded-full shadow-sm text-slate-400 mb-4 border border-slate-100">
        <ArchiveX id="empty-state-icon" className="w-8 h-8" />
      </div>
      <h3 id="empty-state-title" className="text-lg font-semibold text-slate-800">Nenhum projeto encontrado</h3>
      <p id="empty-state-desc" className="text-sm text-slate-500 max-w-sm mt-1 mb-6">
        Não encontramos projetos que correspondam exatamente aos filtros selecionados. Tente reduzir as exigências ou limpar os filtros.
      </p>
      <button
        id="clear-filters-btn"
        onClick={onClearFilters}
        className="px-5 py-2.5 bg-slate-900 text-white font-medium text-sm rounded-xl hover:bg-slate-800 transition shadow-sm cursor-pointer"
      >
        Limpar Filtros
      </button>
    </div>
  );
}
