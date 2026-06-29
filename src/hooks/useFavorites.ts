import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Carregar favoritos ao montar o componente com migração
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const oldStored = localStorage.getItem('archicatalog_favorites');
      if (oldStored) {
        localStorage.setItem('ordus_favorites', oldStored);
        localStorage.removeItem('archicatalog_favorites');
      }

      const stored = localStorage.getItem('ordus_favorites');
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch (e) {
          console.error("Erro ao ler favoritos do localStorage", e);
        }
      }
    }
  }, []);

  // Adicionar ou remover dos favoritos
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('ordus_favorites', JSON.stringify(next));
      }
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    count: favorites.length
  };
}
