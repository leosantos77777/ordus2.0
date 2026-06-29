import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRepository } from '../repositories/AuthRepository';
import Logo from '../components/Logo';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // If already authenticated, go to Dashboard directly
    if (authRepository.isUserAuthenticated()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Por favor, preencha todos os campos.');
      return;
    }

    const success = authRepository.login(username, password);
    if (success) {
      navigate('/dashboard', { replace: true });
    } else {
      setErrorMsg('Credenciais inválidas. Use o acesso de demonstração.');
    }
  };

  const handleDemoLogin = () => {
    const success = authRepository.login('cliente', '123');
    if (success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div id="login-page-container" className="fixed inset-0 bg-[#0E1721] flex items-center justify-center p-4 z-50 overflow-y-auto selection:bg-[#C29047] selection:text-white">
      {/* Background Abstract Geometric Accent Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-[#C29047]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-[#C29047]/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 py-6 animate-fade-in relative">
        
        {/* Brand header outside the card */}
        <div className="text-center flex flex-col items-center gap-1.5 select-none">
          <Logo className="h-[96px] sm:h-[110px] w-auto" />
          <p className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-widest uppercase mt-3">
            Plataforma Corporativa de Projetos
          </p>
        </div>

        {/* Card of login */}
        <div id="login-card" className="bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="space-y-1.5 mb-6 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white tracking-tight">Iniciar Sessão</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Entre com suas credenciais de parceiro ou acesse de forma direta para homologação rápida.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error view */}
            {errorMsg && (
              <div id="login-error-alert" className="p-3.5 bg-rose-950/40 text-rose-200 border border-rose-900/60 rounded-xl text-xs font-semibold flex items-start gap-2.5 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Username/Email Input */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-300 font-mono tracking-wider uppercase mb-1">
                E-mail ou Usuário
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="login-username-input"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setErrorMsg('');
                    setUsername(e.target.value);
                  }}
                  placeholder="Nome de usuário"
                  className="w-full pl-10 pr-4 py-3 bg-[#0B1219]/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C29047] focus:ring-1 focus:ring-[#C29047] transition duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-300 font-mono tracking-wider uppercase mb-1">
                Senha de Acesso
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="login-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setErrorMsg('');
                    setPassword(e.target.value);
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-[#0B1219]/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C29047] focus:ring-1 focus:ring-[#C29047] transition duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-[#C29047] transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="login-submit-button"
              type="submit"
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl tracking-wide uppercase transition transform active:scale-98 shadow-md focus:outline-none cursor-pointer mt-2"
            >
              Entrar na Plataforma
            </button>

          </form>

          {/* Golden Premium Demo Button */}
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <button
              id="login-demo-button"
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3.5 bg-[#C29047] hover:bg-[#A97A37] text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl tracking-wide uppercase transition transform active:scale-98 shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              Entrar como Cliente Demo
            </button>
          </div>

        </div>

        {/* System copyright footer label */}
        <p className="text-center text-[10px] text-slate-500 font-mono tracking-wide">
          Órdus Engenharia S.A. © {new Date().getFullYear()} – Homologação de MVP
        </p>

      </div>
    </div>
  );
}
