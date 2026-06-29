import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useFavorites } from './hooks/useFavorites';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import CatalogPage from './pages/CatalogPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import CalculatorPage from './pages/CalculatorPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import Creator3DPage from './pages/Creator3DPage';
import { authRepository } from './repositories/AuthRepository';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!authRepository.isUserAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppContent() {
  const { favorites, toggleFavorite, count: favoritesCount } = useFavorites();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#1E293B] selection:bg-slate-900 selection:text-white">
      
      {/* Unified Brand Header */}
      {!isLoginPage && <Header favoritesCount={favoritesCount} />}

      {/* Dynamic Route Viewport */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projetos"
            element={
              <ProtectedRoute>
                <CatalogPage favorites={favorites} onToggleFavorite={toggleFavorite} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projetos/:id"
            element={
              <ProtectedRoute>
                <ProjectDetailPage favorites={favorites} onToggleFavorite={toggleFavorite} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calculadora-custo-obra"
            element={
              <ProtectedRoute>
                <CalculatorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/criador-3d"
            element={
              <ProtectedRoute>
                <Creator3DPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          {/* Automatic redirection fallback */}
          <Route path="*" element={<Navigate to="/projetos" replace />} />
        </Routes>
      </main>

      {/* Corporate Footer Dedicated to Órdus Engenharia */}
      {!isLoginPage && (
        <footer className="bg-[#0E1721] text-[#94A3B8] text-xs py-12 mt-12 border-t border-[#1E293B]">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            <div className="md:col-span-5 space-y-3">
              <h5 className="text-white font-extrabold text-sm tracking-tight flex items-center gap-2">
                <span>ÓRDUS</span>
                <span className="text-[#C29047] font-light font-sans">Engenharia</span>
              </h5>
              <p className="leading-relaxed text-slate-400 pr-4">
                A melhor biblioteca de projetos arquitetônicos e soluções de engenharia do país. Adquira pacotes técnicos completos com plantas executivas fáceis de aprovar na prefeitura e aplicar diretamente no canteiro de obras.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h5 className="text-white font-bold tracking-tight">Contato & Suporte</h5>
              <ul className="space-y-1.5 font-mono text-[11px]">
                <li>📞 (11) 4003-9912</li>
                <li>✉️ contato@ordus.com.br</li>
                <li>📍 Av. Brig. Faria Lima, 1485 - SP</li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2">
              <h5 className="text-white font-bold tracking-tight bg-clip-text">Sobre esta plataforma</h5>
              <p className="leading-relaxed">
                Desenvolvido sob o design autoral para homologação do MVP. Arquitetura em tempo de execução, estimativas de custos baseadas nas oscilações regionais de mercado.
              </p>
              <p className="text-[10px] text-slate-500 font-mono">
                © {new Date().getFullYear()} Órdus Engenharia. Todos os direitos reservados.
              </p>
            </div>
            
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
