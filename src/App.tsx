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
import LandingPage from './pages/LandingPage';
import Logo from './components/Logo';
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
  const isLandingOrLogin = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#1E293B] selection:bg-slate-900 selection:text-white">
      
      {/* Unified Brand Header */}
      {!isLandingOrLogin && <Header favoritesCount={favoritesCount} />}

      {/* Dynamic Route Viewport */}
      <main className={isLandingOrLogin ? "flex-1 w-full" : "flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8"}>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="/dashboard"
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
      {!isLandingOrLogin && (
        <footer className="bg-[#0E1721] text-[#94A3B8] text-xs py-12 mt-12 border-t border-[#1E293B]" id="corporate-footer">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            <div className="md:col-span-5 space-y-3">
              <div className="mb-2 flex items-center">
                <Logo className="h-[70px] w-auto" />
              </div>
              <p className="leading-relaxed text-slate-400 pr-4">
                Plataforma privada da Órdus Engenharia para estudos técnicos, simulações de obra e acompanhamento de projetos.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2">
              <h5 className="text-white font-bold tracking-tight">Contato & Suporte</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a 
                    href="https://wa.me/5531997182443" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition flex items-center gap-1.5"
                  >
                    <span>📞 WhatsApp:</span>
                    <strong className="text-[#C29047] font-mono">(31) 99718-2443</strong>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Av.%20Raquel%20Teixeira%20Viana%20620%20Sala%20102%20Cana%C3%A3%20Sete%20Lagoas%20MG%2035700-293" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition flex items-start gap-1.5 leading-relaxed"
                  >
                    <span>📍</span>
                    <span>Av. Raquel Teixeira Viana, 620 - Sala 102 - Canaã, Sete Lagoas - MG, 35700-293</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2">
              <h5 className="text-white font-bold tracking-tight">Estudo Executivo</h5>
              <p className="leading-relaxed text-slate-400">
                Gere estudos preliminares conceituais em nosso Estúdio 3D de alta performance ou simule orçamentos estruturados.
              </p>
              <p className="text-[10px] text-slate-500 font-mono pt-1">
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
