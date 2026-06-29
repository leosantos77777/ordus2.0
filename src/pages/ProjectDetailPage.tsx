import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Heart, Calculator, Wrench, ShieldCheck, FileText, Landmark } from 'lucide-react';
import { Project, Lead, ProjectType } from '../types';
import { projectRepository } from '../repositories/ProjectRepository';
import ProjectGallery from '../components/ProjectGallery';
import ProjectCard from '../components/ProjectCard';
import LeadForm from '../components/LeadForm';

const typeLabels: Record<ProjectType, string> = {
  terrea: 'Casa Térrea',
  sobrado: 'Sobrado',
  campo: 'Casa de Campo',
  madeira: 'Casa de Madeira',
  geminada: 'Casa Geminada',
  esquina: 'Casa de Esquina',
  comercial: 'Comercial',
  edificio: 'Edifício Residencial',
  chale: 'Chalé/Cabana'
};

interface ProjectDetailPageProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function ProjectDetailPage({ favorites, onToggleFavorite }: ProjectDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const actionParam = searchParams.get('action');

  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for solicitation
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [solicitationType, setSolicitationType] = useState<'analise_tecnica' | 'adaptacao_projeto' | 'simulacao_custo' | 'estudo_3d' | 'proposta'>('proposta');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setLeadSuccess(false);

    Promise.all([
      projectRepository.getProjectById(id),
      projectRepository.getProjects()
    ]).then(([proj, list]) => {
      setProject(proj);
      setAllProjects(list);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (actionParam === 'adapt') {
      setSolicitationType('adaptacao_projeto');
      const el = document.getElementById('solicitation-form-container');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [actionParam, loading]);

  const handleLeadSubmit = async (leadData: { name: string; email: string; phone: string; message: string; type: string }) => {
    if (!project) return;
    setLeadSubmitting(true);

    try {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        message: leadData.message,
        type: leadData.type as any,
        projectId: project.id,
        projectTitle: project.title,
        timestamp: new Date().toISOString()
      };

      await projectRepository.createLead(newLead);
      setLeadSuccess(true);
    } catch (e) {
      console.error("Erro ao enviar solicitação técnica", e);
    } finally {
      setLeadSubmitting(false);
    }
  };

  const handleSimulateCost = () => {
    if (!project) return;
    navigate('/calculadora-custo-obra', {
      state: {
        area: project.builtArea,
        standard: project.price > 4000 ? 'alto_luxo' : project.price > 2500 ? 'medio' : 'economico',
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerSolicitation = (type: 'analise_tecnica' | 'adaptacao_projeto' | 'simulacao_custo') => {
    setSolicitationType(type);
    const el = document.getElementById('solicitation-form-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C29047]"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-16 space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Estudo não encontrado</h3>
        <p className="text-slate-500">O código informado não corresponde a nenhum estudo registrado.</p>
        <button
          onClick={() => navigate('/projetos')}
          className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-xl"
        >
          Voltar à Biblioteca
        </button>
      </div>
    );
  }

  // Related projects (same type or category) up to 3 elements
  const relatedProjects = allProjects
    .filter(p => p.id !== project.id && (p.type === project.type || p.category === project.category))
    .slice(0, 3);

  const isFav = favorites.includes(project.id);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Voltar button */}
      <button
        onClick={() => navigate('/projetos')}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 bg-white rounded-xl transition cursor-pointer self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar à Biblioteca de Estudos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lado Esquerdo: Galeria, Ficha Técnica, Descrição, Inclui, Adaptações e Obs */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-[10px] tracking-wider">
                ESTUDO: {project.id}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                {typeLabels[project.type] || project.type}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#C29047]/10 text-[#C29047] text-[10px] font-bold uppercase tracking-wider">
                {project.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
              {project.title}
            </h2>
          </div>

          {/* Galeria de Fotos Renders */}
          <ProjectGallery images={project.images} title={project.title} />

          {/* Ficha Técnica Escaneável */}
          <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm font-mono tracking-wider uppercase mb-4 flex items-center gap-2 text-[#C29047]">
              <FileText className="w-4 h-4 text-[#C29047]" />
              Ficha Técnica do Estudo
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs font-mono text-slate-600">
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-400 block">CÓDIGO INTERNO</span>
                <strong className="text-slate-900 font-bold">{project.id}</strong>
              </div>
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-400 block">TIPO CONSTRUTIVO</span>
                <strong className="text-slate-900 font-bold">{typeLabels[project.type] || project.type}</strong>
              </div>
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-400 block">CATEGORIA</span>
                <strong className="text-slate-900 font-bold uppercase">{project.category}</strong>
              </div>
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-400 block">ÁREA CONSTRUÍDA</span>
                <strong className="text-slate-900 font-bold">{project.builtArea} m²</strong>
              </div>
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-400 block">LOTE MÍNIMO</span>
                <strong className="text-slate-900 font-bold">{project.lotWidth}m x {project.lotLength}m</strong>
              </div>
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-400 block">QUARTOS / SUÍTES</span>
                <strong className="text-slate-900 font-bold">{project.bedrooms} / {project.suites}</strong>
              </div>
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-400 block">BANHEIROS / BWC</span>
                <strong className="text-slate-900 font-bold">{project.bathrooms}</strong>
              </div>
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-400 block">VAGAS GARAGEM</span>
                <strong className="text-slate-900 font-bold">{project.parkingSpaces} vagas</strong>
              </div>
              <div className="border-b border-slate-100 pb-2">
                <span className="text-[10px] text-slate-400 block">FAIXA DE INVESTIMENTO</span>
                <strong className="text-[#C29047] font-bold">Premium</strong>
              </div>
            </div>
          </div>

          {/* Conceito do Projeto */}
          <div className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-base font-sans">Conceito do Projeto</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Lista de Ambientes Planejados */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-base font-sans">Estratégias de Espaços e Ambientes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.roomsList.map((room, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{room}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* O que este estudo inclui */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-base font-sans flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                O que este estudo técnico inclui
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C29047] rounded-full mt-2 shrink-0" />
                  <span><b>Projeto Arquitetônico Executivo</b> completo com especificações de vãos e plantas.</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C29047] rounded-full mt-2 shrink-0" />
                  <span><b>Projeto de Fundação e Estrutural</b> (premissas essenciais de pilares e vigas).</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C29047] rounded-full mt-2 shrink-0" />
                  <span><b>Memorial de Cálculo Técnico</b> para dimensionamento correto de infraestrutura.</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C29047] rounded-full mt-2 shrink-0" />
                  <span><b>Projetos Complementares</b> de instalações elétricas e hidráulicas estruturadas.</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C29047] rounded-full mt-2 shrink-0" />
                  <span><b>Arquivos de Modelagem</b> nos padrões CAD (.dwg) e BIM (.rvt) inclusos.</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#C29047] rounded-full mt-2 shrink-0" />
                  <span><b>Simulação Detalhada de Custos</b> sintonizada com índices SINAPI do seu estado.</span>
                </div>
              </div>
            </div>

            {/* Possíveis Adaptações */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-base font-sans flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#C29047]" />
                Possíveis adaptações deste projeto
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Este estudo técnico foi estruturado de forma flexível. Nossa equipe de engenheiros seniores da Órdus pode realizar as seguintes customizações de forma ágil:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <strong className="text-slate-800 block mb-1">Espelhamento de Planta</strong>
                  <span>Inversão completa do layout para melhor aproveitamento da orientação solar no seu lote.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <strong className="text-slate-800 block mb-1">Declives e Aclives</strong>
                  <span>Ajuste técnico do arranjo estrutural e fundações para compensar inclinações do terreno.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <strong className="text-slate-800 block mb-1">Layout Interno Customizado</strong>
                  <span>Remanejamento de paredes internas não-estruturais para ampliar quartos ou criar escritórios.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <strong className="text-slate-800 block mb-1">Ampliação de Vagas ou Varandas</strong>
                  <span>Acréscimo de espaço de garagem coberta ou incorporação de varanda gourmet integrada.</span>
                </div>
              </div>
            </div>

            {/* Observações Técnicas */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-base font-sans flex items-center gap-2">
                <Landmark className="w-5 h-5 text-slate-700" />
                Observações Técnicas Importantes
              </h3>
              <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1.5 leading-relaxed">
                <li>Recomendamos a execução prévia do ensaio de penetração de solo <b>(Sondagem SPT)</b> para a correta compatibilização das fundações antes do início da terraplenagem.</li>
                <li>As dimensões indicadas de recuos e taxa de ocupação devem ser validadas perante o <b>Código de Obras</b> do município onde o projeto será implantado.</li>
                <li>O cálculo final de cargas estruturais e resistência a ventos segue rigorosamente a norma de segurança <b>NBR 6123</b>.</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Lado Direito: Especificações Técnicas e Captura */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Cartão de Preço e Especificações Rápidas */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-6 border border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 font-mono">Estudo Técnico Digital:</span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-[#C29047] font-mono text-xs font-bold">
                Pacote Exclusivo
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-300">Custo estimado do projeto</span>
              <p className="text-3xl font-extrabold text-white font-mono">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(project.price)}
              </p>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                *Inclui assessoria de engenharia inicial Órdus para validação de compatibilidade do lote construtivo.
              </p>
            </div>

            {/* Grid de Specs Rápidas */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-5 text-xs font-mono text-slate-300">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Área Construída</span>
                <span className="font-bold text-white text-sm">{project.builtArea} m²</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Lote Mínimo</span>
                <span className="font-bold text-white text-sm">{project.lotWidth}x{project.lotLength}m</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Quartos / Suítes</span>
                <span className="font-bold text-white text-sm">{project.bedrooms} / {project.suites}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Estacionamento</span>
                <span className="font-bold text-white text-sm">{project.parkingSpaces} vagas</span>
              </div>
            </div>

            {/* Consultative actions inside the Price Card */}
            <div className="space-y-2 border-t border-slate-850 pt-5">
              <button
                onClick={() => triggerSolicitation('analise_tecnica')}
                className="w-full py-3 bg-slate-800 hover:bg-slate-755 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600 cursor-pointer"
              >
                Solicitar análise técnica
              </button>
              <button
                onClick={() => triggerSolicitation('adaptacao_projeto')}
                className="w-full py-3 bg-transparent hover:bg-[#C29047]/10 text-[#C29047] font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 border border-[#C29047]/40 hover:border-[#C29047] cursor-pointer"
              >
                Pedir adaptação deste projeto
              </button>
            </div>

            {/* Favoritar e Simular Obra CTAs */}
            <div className="grid grid-cols-2 gap-3 border-t border-slate-850 pt-5">
              <button
                onClick={() => onToggleFavorite(project.id)}
                className={`py-3 rounded-xl border border-white/15 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  isFav
                    ? 'bg-rose-600 border-none text-white font-bold'
                    : 'bg-slate-800 text-white hover:bg-slate-750'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-white text-white font-bold' : ''}`} />
                {isFav ? 'Favoritado' : 'Favoritar'}
              </button>
              <button
                onClick={handleSimulateCost}
                className="py-3 bg-[#C29047] hover:bg-[#AC7A34] text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Calculator className="w-4 h-4" />
                Simular Obra
              </button>
            </div>
          </div>

          {/* Formulário de Solicitações */}
          <div id="solicitation-form-container">
            <LeadForm
              projectId={project.id}
              projectTitle={project.title}
              price={project.price}
              initialType={solicitationType}
              submitting={leadSubmitting}
              success={leadSuccess}
              onLeadSubmit={handleLeadSubmit}
            />
          </div>
        </div>
      </div>

      {/* Projetos Relacionados */}
      {relatedProjects.length > 0 && (
        <div id="related-projs-section" className="border-t border-slate-200 pt-8 space-y-6">
          <h3 className="font-extrabold text-slate-950 text-lg font-sans">Estudos Similares Recomendados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                isFavorite={favorites.includes(proj.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={(pid) => {
                  navigate(`/projetos/${pid}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSimulateCost={(pid) => {
                  navigate('/calculadora-custo-obra', {
                    state: {
                      area: proj.builtArea,
                      standard: proj.price > 4000 ? 'alto_luxo' : proj.price > 2500 ? 'medio' : 'economico',
                    }
                  });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAdapt={(pid) => {
                  navigate(`/projetos/${pid}?action=adapt`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
