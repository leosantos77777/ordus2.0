import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Calculator, Heart, Settings, LayoutGrid, LogOut, Box, Home, FileText } from 'lucide-react';
import Logo from './Logo';
import { authRepository } from '../repositories/AuthRepository';

interface HeaderProps {
  favoritesCount: number;
}

export default function Header({ favoritesCount }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/projetos', label: 'Biblioteca', icon: FileText, alternativePaths: [] },
    { path: '/calculadora-custo-obra', label: 'Simulador', icon: Calculator },
    { path: '/criador-3d', label: 'Estúdio 3D', icon: Box },
    { path: '/favoritos', label: 'Favoritos', icon: Heart, badge: favoritesCount },
  ];

  if (authRepository.isAdminAuthenticated()) {
    navItems.push({ path: '/admin', label: 'Painel Admin', icon: Settings });
  }

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white border-b border-slate-150 sticky top-0 z-40">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo Brand Link */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <Logo className="w-10 h-10 sm:w-12 sm:h-12" withLabel={true} />
          </div>

          {/* Navegação principal */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const IconComp = item.icon;
              
              // Determine if page isActive under route prefix
              const currentPath = location.pathname;
              const isActive = 
                currentPath === item.path || 
                (item.path === '/projetos' && currentPath.startsWith('/projetos/')) ||
                (item.alternativePaths?.includes(currentPath) ?? false);

              return (
                <button
                  key={item.path}
                  id={`nav-link-${item.path.replace(/\//g, '') || 'home'}`}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="hidden md:inline">{item.label}</span>
                  
                  {/* Badge de contagem (para favoritos) */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`flex items-center justify-center text-[10px] font-bold font-mono px-1.5 h-4 min-w-4 rounded-full ${
                      isActive ? 'bg-white text-slate-950 font-sans' : 'bg-rose-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Logout button */}
            <button
              id="nav-logout-btn"
              onClick={() => {
                authRepository.logout();
                navigate('/login');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition duration-200 cursor-pointer text-slate-600 hover:text-rose-600 hover:bg-rose-50/50"
              title="Sair da Plataforma"
            >
              <LogOut className="w-4 h-4 text-slate-500 hover:text-rose-600" />
              <span className="hidden md:inline">Sair</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
}
