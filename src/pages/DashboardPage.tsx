import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Calculator, Box, Heart, ArrowRight, ShieldCheck, FileText, CheckCircle, HelpCircle } from 'lucide-react';
import { projectRepository } from '../repositories/ProjectRepository';
import { Project } from '../types';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectRepository.getProjects().then((data) => {
      // Pick 2 high-end or representative projects for curated recommendations
      setFeaturedProjects(data.slice(0, 2));
      setLoading(false);
    });
  }, []);

  const quickActions = [
    {
      title: 'Biblioteca de Estudos e Projetos',
      desc: 'Navegue pelo nosso acervo exclusivo de engenharia de alta precisão e compre pacotes prontos.',
      icon: LayoutGrid,
      path: '/projetos',
      color: 'border-[#C29047] text-[#C29047]',
      bg: 'hover:bg-[#C29047]/5',
    },
    {
      title: 'Simulador de Custo de Obra',
      desc: 'Faça estimativas instantâneas de execução de obra baseado nas tabelas de oscilação do CUB regional.',
      icon: Calculator,
      path: '/calculadora-custo-obra',
      color: 'border-emerald-500 text-emerald-500',
      bg: 'hover:bg-emerald-500/5',
    },
    {
      title: 'Estúdio 3D Órdus',
      desc: 'Molde e configure sua casa em tempo real, personalizando o lote, pavimentos e materiais de fachada.',
      icon: Box,
      path: '/criador-3d',
      color: 'border-blue-500 text-blue-500',
      bg: 'hover:bg-blue-500/5',
    },
    {
      title: 'Estudos Favoritos',
      desc: 'Acesse seus projetos salvos, compare fichas técnicas e planeje sua futura implantação técnica.',
      icon: Heart,
      path: '/favoritos',
      color: 'border-rose-500 text-rose-500',
      bg: 'hover:bg-rose-50/50',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Portlet Welcome Greeting */}
      <div className="bg-[#0E1721] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-slate-900">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] aspect-square rounded-full bg-[#C29047]/10 blur-[120px] pointer-events-none" />
        
        <div className="max-w-2xl space-y-3 relative">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#DFB277] uppercase bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5" /> Área Exclusiva do Cliente
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
            Olá, Cliente Demo. Seja bem-vindo à Órdus.
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Este é o seu portal interno de engenharia. Aqui você pode gerenciar suas simulações de custos, configurar modelos técnicos em tempo real no nosso estúdio e enviar solicitações diretas à nossa mesa de engenharia comercial.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/criador-3d')}
              className="px-5 py-3 bg-[#C29047] hover:bg-[#AC7A34] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition cursor-pointer shadow-md"
            >
              Iniciar estudo do meu projeto
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid quick access */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight font-sans">
          Acesso Rápido às Ferramentas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(act.path)}
                className={`bg-white border border-slate-200 p-5 rounded-2xl shadow-xs transition duration-200 cursor-pointer flex gap-4 ${act.bg}`}
              >
                <div className={`p-3 bg-slate-50 rounded-xl border border-slate-100 ${act.color} self-start`}>
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-slate-900 tracking-tight">{act.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{act.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended list and recommendations block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Curated Recommendations */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-sans">
            <CheckCircle className="w-4.5 h-4.5 text-[#C29047]" />
            Recomendações Técnicas da Engenharia
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed pb-2">
            Para garantir a melhor economia e aprovação sem intercorrências no seu projeto, nosso conselho técnico separou as seguintes diretrizes essenciais para o seu lote:
          </p>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
              <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C29047]" />
                Sondagem de Solo (SPT) Obrigatória
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed pl-3">
                Antes de iniciar a concretagem das fundações, execute o teste de sondagem de solo. Ela evita gastos excessivos de aço e concreto na infraestrutura.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
              <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C29047]" />
                Taxa de Ocupação e Recuo Municipal
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed pl-3">
                Cada município dita uma Taxa de Ocupação (TO) máxima. Use nosso <b>Estúdio 3D</b> para regular as larguras e recuos conforme a lei de zoneamento do seu bairro.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
              <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C29047]" />
                Estudos de Orientação Solar
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed pl-3">
                A face norte garante maior incidência solar nas áreas íntimas (quartos) no inverno. Planeje a orientação do lote para otimizar o conforto térmico da habitação.
              </p>
            </div>
          </div>
        </div>

        {/* Highlight Curated Studies */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 font-sans">
              <FileText className="w-4.5 h-4.5 text-[#C29047]" />
              Estudos Sugeridos para Você
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Modelos estruturais de alta demanda que combinam excelência estética com ótima taxa de aproveitamento:
            </p>

            {loading ? (
              <div className="h-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#C29047]"></div>
              </div>
            ) : (
              <div className="space-y-3.5">
                {featuredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => navigate(`/projetos/${proj.id}`)}
                    className="flex gap-3 p-2 hover:bg-slate-50 rounded-xl border border-slate-100 cursor-pointer transition"
                  >
                    <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                      <img src={proj.images[0]} alt={proj.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-slate-800 truncate">{proj.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">
                        CÓD: {proj.id} • {proj.builtArea}m² • {proj.bedrooms} Dorms
                      </p>
                    </div>
                    <div className="self-center">
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-150">
            <button
              onClick={() => navigate('/projetos')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer text-center"
            >
              Explorar Todos os Estudos ({allProjectsCount()})
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  function allProjectsCount() {
    // Elegant fallback number of projects
    return '30+';
  }
}
