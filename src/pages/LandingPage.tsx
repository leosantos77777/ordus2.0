import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  MapPin, 
  ArrowRight, 
  Layers, 
  Activity, 
  HelpCircle, 
  CheckCircle, 
  FileText, 
  Calculator, 
  Box, 
  Heart, 
  User, 
  AlertTriangle, 
  LineChart, 
  MousePointerClick, 
  MessageSquare, 
  Clock, 
  Hammer, 
  ChevronDown, 
  ChevronUp,
  FileCheck,
  Building,
  Wrench,
  Search,
  Check
} from 'lucide-react';
import Logo from '../components/Logo';
import { motion } from 'motion/react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive Quiz/Qualification States
  const [quizAnswers, setQuizAnswers] = useState({
    lote: '',
    projetoArquit: '',
    tipoObra: '',
    urgencia: ''
  });
  const [quizStep, setQuizStep] = useState(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleQuizAnswer = (field: string, value: string) => {
    setQuizAnswers(prev => ({ ...prev, [field]: value }));
    setQuizStep(prev => prev + 1);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({
      lote: '',
      projetoArquit: '',
      tipoObra: '',
      urgencia: ''
    });
    setQuizStep(0);
  };

  const getQuizWhatsAppUrl = () => {
    const text = `Olá Órdus Engenharia! Acabei de preencher a qualificação no site:\n` +
      `- Possui lote: ${quizAnswers.lote}\n` +
      `- Tem projeto arquitetônico: ${quizAnswers.projetoArquit}\n` +
      `- Tipo de obra: ${quizAnswers.tipoObra}\n` +
      `- Urgência técnica: ${quizAnswers.urgencia}\n` +
      `Gostaria de uma orientação inicial para a minha obra.`;
    return `https://wa.me/5531997182443?text=${encodeURIComponent(text)}`;
  };

  const services = [
    {
      title: 'Projeto estrutural',
      desc: 'Dimensionamento de fundações, pilares, vigas e lajes com alto detalhamento para máxima economia de concreto e aço.',
      icon: Layers,
      highlight: true
    },
    {
      title: 'Vistoria técnica',
      desc: 'Inspeções e relatórios in loco para verificação de estabilidade, análise de patologias ou reformas seguras.',
      icon: Activity,
      highlight: true
    },
    {
      title: 'Projetos elétricos',
      desc: 'Dimensionamento e compatibilização de circuitos e proteção em conformidade estrita com a NBR 5410.',
      icon: Wrench,
      highlight: false
    },
    {
      title: 'Projetos hidrossanitários',
      desc: 'Sistemas de água, esgoto e drenagem pluvial integrados para evitar ruídos e futuros entupimentos.',
      icon: Building,
      highlight: false
    },
    {
      title: 'Perícias de engenharia',
      desc: 'Laudos periciais detalhados para disputas judiciais, segurança predial ou diagnósticos patológicos.',
      icon: FileCheck,
      highlight: false
    },
    {
      title: 'Avaliação de fissuras e infiltrações',
      desc: 'Análise técnica de manifestações patológicas para identificar a causa raiz e prescrever o reparo correto.',
      icon: AlertTriangle,
      highlight: false
    }
  ];

  const problems = [
    {
      title: 'Cálculo superdimensionado',
      desc: 'Projetos genéricos ou conservadores demais geram até 40% de custos extras em aço e concreto.'
    },
    {
      title: 'Desperdício de material',
      desc: 'Sem detalhamento executivo rigoroso, ocorrem sobras de barras, quebras de fôrmas e perdas no canteiro.'
    },
    {
      title: 'Erros e retrabalho na obra',
      desc: 'A falta de compatibilização força o quebra-quebra de vigas para passar encanamentos, atrasando o cronograma.'
    },
    {
      title: 'Falta de controle de custos',
      desc: 'Começar fundações sem quantitativos precisos impossibilita o planejamento de compras de forma eficiente.'
    },
    {
      title: 'Decisões improvisadas',
      desc: 'Parar a equipe no canteiro para decidir armaduras de apoio atrasa a obra e custa caro ao proprietário.'
    },
    {
      title: 'Surgimento de patologias',
      desc: 'Fissuras, trincas ou vazamentos geram prejuízos duradouros e riscos graves de segurança no futuro.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Análise de escopo',
      desc: 'Entendimento inicial de suas metas estéticas, orçamento e necessidades técnicas da obra.'
    },
    {
      step: '02',
      title: 'Coleta técnica',
      desc: 'Estudo do projeto arquitetônico, topografia e laudo de sondagem do solo (SPT).'
    },
    {
      step: '03',
      title: 'Proposta clara',
      desc: 'Apresentação detalhada do escopo de engenharia, prazos estritos e reuniões de alinhamento.'
    },
    {
      step: '04',
      title: 'Dimensionamento',
      desc: 'Modelagem tridimensional rigorosa das fôrmas e cálculo otimizado da ferragem e concreto.'
    },
    {
      step: '05',
      title: 'Compatibilização',
      desc: 'Integração estrita com projetos complementares para evitar quebra-quebra ou interferências físicas.'
    },
    {
      step: '06',
      title: 'Suporte executivo',
      desc: 'Atendimento continuado ao seu construtor ou mestre de obras para sanar dúvidas durante a concretagem.'
    }
  ];

  const differentials = [
    {
      title: 'Detalhamento exaustivo',
      desc: 'Pranchas executivas completas com tabelas precisas de corte/dobra de aço, notas claras e desenhos 3D de apoios complexos.'
    },
    {
      title: 'Dimensionamento racional',
      desc: 'Seguimos rigorosamente as NBRs 6118 e 6122 aplicando inteligência analítica para evitar gastos inúteis com materiais.'
    },
    {
      title: 'Canal técnico direto',
      desc: 'Fale diretamente com os engenheiros responsáveis pelo seu projeto, sem intermediários ou atendimentos comerciais robotizados.'
    },
    {
      title: 'Projetos executáveis',
      desc: 'Pensamos na facilidade de montagem das fôrmas e no fluxo de concretagem para simplificar a vida de quem executa.'
    }
  ];

  const faqs = [
    {
      q: 'Quanto vou gastar para construir?',
      a: 'O custo total da obra depende do padrão de acabamento, localização, relevo do terreno e das soluções estruturais. Na nossa plataforma privada, oferecemos um Simulador Preliminar de Custo baseado no CUB estadual atualizado para te dar uma estimativa real antes de iniciar.'
    },
    {
      q: 'Preciso ter projeto arquitetônico antes?',
      a: 'Para o desenvolvimento do projeto estrutural final, sim, pois precisamos saber a disposição das paredes, portas e janelas. Contudo, se você ainda não tem, nós podemos te orientar na fase inicial ou sugerir referências de nossa biblioteca interna.'
    },
    {
      q: 'Vocês fazem apenas projeto estrutural?',
      a: 'Não. Além do estrutural, desenvolvemos projetos elétricos, hidrossanitários, realizamos vistorias técnicas criteriosas, laudos periciais e avaliações patológicas detalhadas para fissuras e infiltrações.'
    },
    {
      q: 'Vocês atendem minha cidade?',
      a: 'Sim! Atendemos clientes em todo o Brasil. Temos projetos já homologados e entregues em Minas Gerais, Amapá, São Paulo, Brasília, entre outras regiões, utilizando reuniões online e documentação técnica digitalizada.'
    },
    {
      q: 'O que preciso enviar para receber um orçamento?',
      a: 'Para projetos estruturais, o ideal é o arquivo do projeto arquitetônico (DWG ou PDF) e o laudo de sondagem do solo (SPT). Para vistorias ou laudos de patologias, fotos e o endereço da edificação são os pontos de partida.'
    },
    {
      q: 'Como funciona uma vistoria técnica?',
      a: 'Um engenheiro especialista realiza uma vistoria técnica rigorosa na edificação para analisar elementos visíveis, medir possíveis deformações, registrar manifestações patológicas e compilar as observações em um relatório ou laudo técnico conclusivo com as diretrizes de correção.'
    },
    {
      q: 'Vocês avaliam fissuras, trincas e infiltrações?',
      a: 'Sim. Esse é um de nossos serviços com maior demanda. Diagnosticamos a causa de manifestações patológicas estruturais ou de impermeabilização para propor a melhor solução de reparo e recuperação estrutural.'
    },
    {
      q: 'Dá para fazer uma construção mais econômica?',
      a: 'Com certeza. A economia real em uma obra não vem de comprar materiais de qualidade duvidosa, mas sim de um planejamento rigoroso e de projetos de engenharia otimizados que evitam desperdício de aço, fôrmas e concreto.'
    },
    {
      q: 'Como funciona o atendimento à distância?',
      a: 'Nosso processo de atendimento digital inclui reuniões por videochamada para alinhamento, compartilhamento do modelo estrutural em reuniões de compatibilização e entrega de documentação técnica em formato digital homologado, de forma ágil e segura.'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen selection:bg-slate-900 selection:text-white overflow-x-hidden" id="public-landing-page">
      
      {/* 1. HEADER PÚBLICO */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-150 sticky top-0 z-50 w-full min-h-[78px] sm:min-h-[84px] flex items-center" id="public-header">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            {/* Logo Link */}
            <div className="flex items-center gap-2 select-none">
              <Logo className="h-[48px] sm:h-[56px] w-auto" />
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 mx-auto">
              <a href="#inicio" className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition">Início</a>
              <a href="#servicos" className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition">Serviços</a>
              <a href="#processo" className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition">Processo</a>
              <a href="#plataforma" className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition">Plataforma</a>
              <a href="#perguntas" className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition">Dúvidas</a>
              <a href="#contato" className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition">Contato</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <button 
                id="header-btn-portal"
                onClick={() => navigate('/login')}
                className="px-3.5 py-2 text-slate-700 hover:text-slate-950 text-xs sm:text-sm font-bold transition hover:bg-slate-100 rounded-xl"
              >
                Acessar portal
              </button>
              <a 
                id="header-btn-whatsapp"
                href="https://wa.me/5531997182443"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C29047] hover:bg-[#A97A37] text-slate-950 font-extrabold text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <span>Falar no WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </header>

      {/* 2. HERO INSTITUCIONAL */}
      <section id="inicio" className="bg-[#0E1721] text-white py-20 sm:py-28 relative overflow-hidden">
        {/* Background Grids and Accents */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px] animate-grid-slide" />
        <div className="absolute top-[20%] right-[10%] w-[40%] aspect-square rounded-full bg-[#C29047]/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-15%] w-[40%] aspect-square rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Texts */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-[#C29047] font-semibold tracking-wider uppercase">
              <Shield className="w-3.5 h-3.5 text-[#C29047]" />
              <span>Engenharia Estrutural Especializada</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans leading-[1.1] tracking-tight">
              Engenharia estrutural para construir com mais <span className="text-[#C29047]">segurança e economia</span>.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Projetos técnicos, laudos e vistorias rigorosas para eliminar desperdícios, evitar retrabalho e garantir total estabilidade para sua obra.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                id="hero-cta-whatsapp"
                href="https://wa.me/5531997182443"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C29047] hover:bg-[#A97A37] text-slate-950 font-black text-center text-xs sm:text-sm px-6 py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>Falar com engenheiro</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>
              <button 
                id="hero-cta-portal"
                onClick={() => navigate('/login')}
                className="bg-white/5 hover:bg-white/10 text-white font-bold text-center text-xs sm:text-sm px-6 py-4 rounded-2xl border border-white/10 transition"
              >
                Acessar portal do cliente
              </button>
            </div>

            {/* Micro Badges for trust */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-md">
              <div>
                <span className="block text-xl font-bold font-mono text-[#C29047]">+100</span>
                <span className="block text-[10px] text-slate-400">Estudos técnicos</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-white">100%</span>
                <span className="block text-[10px] text-slate-400">Conformidade ABNT</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-mono text-white">Remoto</span>
                <span className="block text-[10px] text-slate-400">Suporte nacional</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visuals (Faceted technical wireframe look / structural SaaS inspiration) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative mx-auto max-w-[380px] sm:max-w-[420px] lg:max-w-none">
              
              {/* Outer Glowing frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C29047]/10 to-blue-500/10 rounded-3xl blur-md pointer-events-none" />

              {/* Floating Cards / Badges around the wireframe */}
              <div className="absolute -top-6 -left-6 bg-slate-900/95 border border-slate-800 p-3 rounded-xl shadow-lg animate-float-slow flex items-center gap-2 max-w-[170px] z-20 backdrop-blur-xs select-none">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-ring" />
                <div className="text-left">
                  <span className="block text-[9px] text-[#C29047] font-mono leading-none uppercase">Análise Técnica</span>
                  <span className="text-[11px] font-bold text-white">Redução de Insumos</span>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-4 bg-[#C29047]/95 text-slate-950 p-3 rounded-xl shadow-lg animate-float-medium flex items-center gap-2 max-w-[170px] z-20 select-none">
                <div className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                <div className="text-left">
                  <span className="block text-[9px] text-slate-900 font-mono font-bold leading-none uppercase">Projeto Estrutural</span>
                  <span className="text-[11px] font-black leading-tight">Cálculo Otimizado</span>
                </div>
              </div>

              <div className="absolute top-[40%] -right-10 bg-slate-900/95 border border-slate-800 p-3 rounded-xl shadow-lg animate-float-fast flex items-center gap-2 max-w-[170px] z-20 backdrop-blur-xs select-none">
                <div className="w-2.5 h-2.5 bg-blue-400 rounded-sm" />
                <div className="text-left">
                  <span className="block text-[9px] text-slate-400 font-mono leading-none">Vistoria Técnica</span>
                  <span className="text-[11px] font-bold text-white">In Loco e Laudos</span>
                </div>
              </div>

              <div className="absolute bottom-[30%] -left-12 bg-slate-900/95 border border-slate-800 p-3 rounded-xl shadow-lg animate-float-slow flex items-center gap-2 max-w-[185px] z-20 backdrop-blur-xs select-none">
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                <div className="text-left">
                  <span className="block text-[9px] text-slate-400 font-mono leading-none">Prevenção Ativa</span>
                  <span className="text-[11px] font-bold text-white">Sem Fissuras ou Trincas</span>
                </div>
              </div>

              {/* Studio 3D Luxury House Render Showcase */}
              <div className="bg-[#16222F] border border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-slate-300 font-mono tracking-wider">ORDUS_STUDIO_3D_RENDER.RAW</span>
                  </div>
                  <span className="text-[9px] text-[#C29047] font-mono bg-[#C29047]/10 px-2 py-0.5 rounded border border-[#C29047]/20 uppercase">
                    Modelo Ativo
                  </span>
                </div>

                {/* Realist luxury 3D house image render */}
                <div className="aspect-[4/3] w-full rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden group">
                  <img
                    src="/luxury-modern-house-3d.jpg"
                    alt="Modelo 3D Residencial Alto Padrão - Órdus Engenharia"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle layered layout grids of engineering context */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-between items-end">
                    <span className="text-[9px] font-mono text-white bg-slate-900/90 px-2 py-1 rounded border border-slate-800/60 backdrop-blur-xs">
                      Residência Alto Padrão - 420m²
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/90 px-2 py-1 rounded border border-emerald-800/60 backdrop-blur-xs">
                      Volumetria 3D Realista
                    </span>
                  </div>
                </div>

                {/* Floating Technical Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">Análise de Cargas</span>
                    <span className="text-xs font-bold text-white block mt-0.5">Compatibilização BIM</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-400 font-mono block uppercase">Dimensionamento</span>
                    <span className="text-xs font-bold text-[#C29047] block mt-0.5">Otimização Estrutural</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* PREMIUM INFINITE MARQUEE */}
      <div className="bg-[#16222F] border-y border-slate-800/80 py-4.5 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee gap-12 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-[#C29047] font-semibold">
          <div className="flex gap-12 shrink-0">
            <span>• Dimensionamento Otimizado</span>
            <span>• Economia Real de Concreto & Aço</span>
            <span>• Compatibilização 3D Rigorosa</span>
            <span>• 100% em Conformidade ABNT</span>
            <span>• Suporte de Canteiro Consultivo</span>
            <span>• Zero Decisões Improvisadas</span>
            <span>• Vistorias Técnicas Criteriosas</span>
          </div>
          <div className="flex gap-12 shrink-0">
            <span>• Dimensionamento Otimizado</span>
            <span>• Economia Real de Concreto & Aço</span>
            <span>• Compatibilização 3D Rigorosa</span>
            <span>• 100% em Conformidade ABNT</span>
            <span>• Suporte de Canteiro Consultivo</span>
            <span>• Zero Decisões Improvisadas</span>
            <span>• Vistorias Técnicas Criteriosas</span>
          </div>
        </div>
      </div>

      {/* 3. SEÇÃO PROBLEMA */}
      <section className="py-20 sm:py-28 bg-white" id="problema">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-mono font-bold text-[#C29047] uppercase tracking-wider block">
              Riscos da Execução Sem Orientação
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-950 tracking-tight">
              Construir sem orientação técnica custa muito mais caro.
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Decisões técnicas iniciais mal conduzidas geram atrasos cumulativos, desperdício estrutural de insumos e patologias complexas no futuro.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((prob, idx) => (
              <motion.div 
                key={idx} 
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-[#C29047]/30 hover:-translate-y-1 transition-all duration-300 space-y-3 relative group"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 font-bold text-xs font-mono group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <h3 className="text-slate-900 font-bold text-sm sm:text-base tracking-tight group-hover:text-[#C29047] transition-colors">
                  {prob.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {prob.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SEÇÃO POSICIONAMENTO */}
      <section className="py-20 sm:py-28 bg-[#0E1721] text-white relative overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[35%] aspect-square rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              className="lg:col-span-6 space-y-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-mono font-bold text-[#C29047] uppercase tracking-wider block">
                Valor Estratégico
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-sans tracking-tight leading-tight">
                O projeto não é só papelada. É a inteligência financeira da obra.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Cada pilar locado e cada armadura calculada representam segurança jurídica, redução drástica de perdas de aço e controle total do canteiro.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C29047] shrink-0 mt-0.5" />
                  <span className="text-slate-300">Dimensionamento focado em evitar desperdício de concreto e superdimensionamentos.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#C29047] shrink-0 mt-0.5" />
                  <span className="text-slate-300">Detalhamento executivo rigoroso que acelera a velocidade de montagem das fôrmas.</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-[#16222F] border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl relative">
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#C29047]/5 flex items-center justify-center text-[#C29047] font-mono text-xs select-none">B2B</div>
                <h4 className="text-white font-bold font-sans text-lg border-b border-slate-800 pb-3">
                  Por que a engenharia especializada ajuda?
                </h4>
                
                <div className="space-y-4">
                  {[
                    { title: 'Minimização de desperdícios', desc: 'Evita a sobra de vergalhões e concreto calculando o volume exato por etapa.' },
                    { title: 'Orçamento de materiais realista', desc: 'Com quantitativos precisos, orce com fornecedores com margem de erro zero.' },
                    { title: 'Garantia contra patologias', desc: 'Dimensionamento robusto contra recalques de solo, flexão de lajes e ventos.' },
                    { title: 'Compatibilização de redes', desc: 'Evita furos desnecessários em vigas e conflitos com tubulações hidráulicas.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 hover:translate-x-1 transition-transform duration-200">
                      <div className="w-6 h-6 rounded-full bg-[#C29047]/10 text-[#C29047] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div className="space-y-0.5">
                        <h5 className="font-bold text-white text-xs sm:text-sm">{item.title}</h5>
                        <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. SERVIÇOS */}
      <section id="servicos" className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-mono font-bold text-[#C29047] uppercase tracking-wider block">
              Escopo de Serviços Técnicos
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-950 tracking-tight">
              Soluções consultivas e precisas de engenharia civil.
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Desenvolvemos e avaliamos sua infraestrutura com rigor analítico, priorizando economia, estabilidade e conformidade normativa absoluta.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <motion.div 
                  key={idx} 
                  className={`border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl ${
                    srv.highlight 
                      ? 'bg-[#16222F] text-white border-[#C29047]/30 shadow-md ring-1 ring-[#C29047]/20 hover:border-[#C29047]' 
                      : 'bg-slate-50 text-slate-800 border-slate-100 hover:border-slate-200 hover:bg-white'
                  }`}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {srv.highlight && (
                    <div className="absolute top-3 right-3 bg-[#C29047] text-slate-950 font-bold text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded-full select-none">
                      FOCO PRINCIPAL
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-300 ${
                      srv.highlight ? 'bg-[#C29047]/10 text-[#C29047] group-hover:bg-[#C29047] group-hover:text-slate-950' : 'bg-slate-200/80 text-slate-700 group-hover:bg-[#C29047]/10 group-hover:text-[#C29047]'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-sm sm:text-base tracking-tight group-hover:text-[#C29047] transition-colors">
                        {srv.title}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                        srv.highlight ? 'text-slate-300 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-700'
                      }`}>
                        {srv.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-dashed border-slate-700/20">
                    <a 
                      href="https://wa.me/5531997182443" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`text-xs font-bold inline-flex items-center gap-1.5 transition ${
                        srv.highlight ? 'text-[#C29047] hover:text-[#e0a955]' : 'text-slate-900 hover:text-[#C29047]'
                      }`}
                    >
                      <span>Solicitar análise deste escopo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. BLOCO DE URGÊNCIA TÉCNICA */}
      <section className="py-16 bg-[#0E1721] text-white relative">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-[#16222F] to-[#0E1721] border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-0 right-0 w-[30%] aspect-square bg-[#C29047]/5 blur-[80px] pointer-events-none" />
            
            <div className="max-w-3xl space-y-5 relative">
              <div className="inline-flex items-center gap-1.5 text-rose-500 text-xs font-mono font-bold uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
                <span>Urgência ou Diagnóstico Imediato</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-sans leading-tight">
                Fissuras, trincas ou infiltrações na sua estrutura? A solução precisa ser técnica.
              </h2>
              
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Evite soluções amadoras que escondem o sintoma físico sem resolver a causa raiz. A Órdus oferece diagnóstico analítico rápido de patologias para propor soluções de reforço ou recomposição definitivas.
              </p>

              <div className="pt-3">
                <a 
                  id="urgencia-whatsapp-btn"
                  href="https://wa.me/5531997182443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl shadow-md transition inline-flex items-center gap-2"
                >
                  <span>Solicitar avaliação técnica imediata</span>
                  <ArrowRight className="w-4 h-4 text-white animate-pulse" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. PROCESSO CONSULTIVO */}
      <section id="processo" className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-mono font-bold text-[#C29047] uppercase tracking-wider block">
              Alinhamento de Etapas
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-950 tracking-tight">
              Como a Órdus conduz seu atendimento
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Trabalhamos com transparência e formalidade. Cada etapa do desenvolvimento técnico do seu projeto estrutural ou laudo é rigorosamente mapeada e validada com você.
            </p>
          </motion.div>

          {/* Desktop Timeline */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx} 
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative flex flex-col justify-between group hover:shadow-lg hover:border-[#C29047]/30 hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black font-mono text-[#C29047]/20 group-hover:text-[#C29047] transition-colors duration-300">{step.step}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C29047] group-hover:scale-150 transition-transform duration-300" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-[#C29047] transition-colors">{step.title}</h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-4">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx} 
                className="bg-slate-50 border border-slate-100 p-5 rounded-xl flex gap-4"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <span className="text-xl font-bold font-mono text-[#C29047] shrink-0 mt-0.5">{step.step}</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm tracking-tight">{step.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. PLATAFORMA PRIVADA */}
      <section id="plataforma" className="py-20 sm:py-28 bg-[#0E1721] text-white relative overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[45%] aspect-square bg-[#C29047]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[35%] aspect-square bg-blue-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts */}
            <motion.div 
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-1.5 text-[#C29047] text-xs font-mono font-bold uppercase">
                <FileCheck className="w-4 h-4 text-[#C29047]" />
                <span>Portal de Relacionamento B2B</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-sans tracking-tight">
                Uma área privada para organizar estudos, simulações e solicitações.
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Nossos clientes corporativos e parceiros contam com uma área de trabalho segura para centralizar suas demandas de engenharia. Isso evita a perda de arquivos técnicos em conversas de aplicativos e acelera a entrega das aprovações.
              </p>

              <div className="space-y-4 text-xs sm:text-sm pt-2">
                {[
                  { icon: FileText, title: 'Biblioteca de projetos e referências', text: 'Estudos conceituais brasileiros detalhados para servir de ponto de partida técnico.' },
                  { icon: Calculator, title: 'Simulador preliminar de custo', text: 'Cálculo paramétrico realista baseado nas oscilações regionais do CUB.' },
                  { icon: Box, title: 'Estúdio 3D Órdus', text: 'Geração rápida de maquetes conceituais com parâmetros de lote e zoneamento.' },
                  { icon: Activity, title: 'Solicitações para análise técnica', text: 'Envio rápido de diretrizes estruturais para nossos engenheiros analisarem.' }
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="flex gap-3 hover:translate-x-1.5 transition-transform duration-200 group">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-[#C29047] flex items-center justify-center shrink-0 group-hover:bg-[#C29047] group-hover:text-slate-950 transition-colors duration-300">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-[#C29047] transition-colors">{item.title}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3">
                <button 
                  id="plataforma-cta-btn"
                  onClick={() => navigate('/login')}
                  className="bg-[#C29047] hover:bg-[#A97A37] text-slate-950 font-black text-xs sm:text-sm px-6 py-4 rounded-xl shadow-lg transition flex items-center gap-1.5"
                >
                  <span>Acessar portal do cliente</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </motion.div>

            {/* Right Illustrative Mockup */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative animate-float">
                
                {/* Simulated Portal App Interface */}
                <div className="rounded-2xl border border-slate-800 bg-[#0B1219] p-4 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] text-slate-300 font-mono">PORTAL_CLIENTE_DEMO</span>
                    </div>
                    <span className="text-[9px] text-[#C29047] font-mono bg-[#C29047]/10 px-2 py-0.5 rounded border border-[#C29047]/20">
                      PAINEL ATIVO
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Fake Project List Row */}
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between hover:bg-slate-900/80 hover:border-[#C29047]/30 transition duration-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-[#C29047]/10 text-[#C29047] flex items-center justify-center font-mono text-[10px] font-bold">
                          EST
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-white block">Estudo Estrutural #032</span>
                          <span className="text-[9px] text-slate-500 block">Dormitórios: 3 | Área: 185m²</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded">
                        Validado
                      </span>
                    </div>

                    {/* Fake Simulator Row */}
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between hover:bg-slate-900/80 hover:border-blue-500/30 transition duration-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono text-[10px] font-bold">
                          CALC
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-white block">Simulação de Orçamento</span>
                          <span className="text-[9px] text-slate-500 block">Padrão: Alto Contemporâneo (MG)</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-yellow-400 font-mono font-bold bg-yellow-950/80 px-2 py-0.5 rounded">
                        Em Análise
                      </span>
                    </div>

                    {/* Fake 3D study */}
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between hover:bg-slate-900/80 hover:border-purple-500/30 transition duration-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono text-[10px] font-bold">
                          3D
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-white block">Estudo 3D Paramétrico</span>
                          <span className="text-[9px] text-slate-500 block">Sobrado Urbano - Lote 12x30m</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono font-bold bg-slate-900 px-2 py-0.5 rounded">
                        Salvo
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950/30 rounded-xl border border-slate-800/80 text-center text-[10px] text-slate-500 font-mono">
                    Acesso exclusivo para clientes cadastrados
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 9. QUALIFICAÇÃO E ORIENTAÇÃO INICIAL */}
      <section className="py-20 sm:py-28 bg-white" id="qualificacao">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts */}
            <motion.div 
              className="lg:col-span-6 space-y-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-xs font-mono font-bold text-[#C29047] uppercase tracking-wider block">
                Suporte de Início
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-950 tracking-tight">
                Não sabe por onde começar? A Órdus te orienta.
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Muitos clientes ainda não têm projeto arquitetônico definido, laudo de sondagem do solo ou clareza sobre qual o orçamento necessário para construir com segurança. Nós conduzimos você nesse público-alvo para uma tomada de decisão consultiva inicial que poupa dores de cabeça.
              </p>
              
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                <p>Nossos engenheiros podem te ajudar a validar:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-mono">
                  <li className="flex items-center gap-1.5 hover:translate-x-1 transition-transform duration-200">
                    <span className="text-[#C29047] font-bold">✓</span> Se seu lote suporta o projeto desejado
                  </li>
                  <li className="flex items-center gap-1.5 hover:translate-x-1 transition-transform duration-200">
                    <span className="text-[#C29047] font-bold">✓</span> Qual o padrão construtivo ideal
                  </li>
                  <li className="flex items-center gap-1.5 hover:translate-x-1 transition-transform duration-200">
                    <span className="text-[#C29047] font-bold">✓</span> Necessidade de vistorias técnicas
                  </li>
                  <li className="flex items-center gap-1.5 hover:translate-x-1 transition-transform duration-200">
                    <span className="text-[#C29047] font-bold">✓</span> Como conduzir fundações em desnível
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Interactive Qualification Step Block */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-slate-50 border border-slate-150 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Orientador Inicial de Projetos
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">
                    Etapa {quizStep + 1} de 4
                  </span>
                </div>

                {quizStep === 0 && (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h5 className="text-xs sm:text-sm font-semibold text-slate-800">
                      Você já possui lote ou terreno definido?
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Sim, já possuo lote próprio',
                        'Estou em processo de compra',
                        'Não, ainda estou pesquisando',
                        'Não preciso de lote (é reforma/reforço)'
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleQuizAnswer('lote', opt)}
                          className="p-3 bg-white hover:bg-slate-100 hover:border-[#C29047]/40 border border-slate-200 rounded-xl text-left text-xs text-slate-700 transition font-medium cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {quizStep === 1 && (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h5 className="text-xs sm:text-sm font-semibold text-slate-800">
                      Você já possui um projeto arquitetônico desenhado?
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Sim, completo feito por arquiteto',
                        'Apenas croquis/estudo preliminar',
                        'Não, preciso de recomendação',
                        'Não aplicável'
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleQuizAnswer('projetoArquit', opt)}
                          className="p-3 bg-white hover:bg-slate-100 hover:border-[#C29047]/40 border border-slate-200 rounded-xl text-left text-xs text-slate-700 transition font-medium cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {quizStep === 2 && (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h5 className="text-xs sm:text-sm font-semibold text-slate-800">
                      Qual o tipo de obra que você pretende construir ou reformar?
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Residência térrea ou sobrado',
                        'Edifício residencial/comercial',
                        'Galpão industrial ou estrutura especial',
                        'Reforma residencial ou comercial'
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleQuizAnswer('tipoObra', opt)}
                          className="p-3 bg-white hover:bg-slate-100 hover:border-[#C29047]/40 border border-slate-200 rounded-xl text-left text-xs text-slate-700 transition font-medium cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {quizStep === 3 && (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h5 className="text-xs sm:text-sm font-semibold text-slate-800">
                      Existe alguma urgência técnica imediata (fissuras graves, infiltrações ou parada de obra)?
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Sim, urgência imediata na estrutura',
                        'Sim, fissuras visíveis e infiltrações',
                        'Não, planejando para os próximos meses',
                        'Não, apenas estimando orçamentos'
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleQuizAnswer('urgencia', opt)}
                          className="p-3 bg-white hover:bg-slate-100 hover:border-[#C29047]/40 border border-slate-200 rounded-xl text-left text-xs text-slate-700 transition font-medium cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {quizStep >= 4 && (
                  <motion.div 
                    className="space-y-5 text-center py-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                        Estudo de viabilidade consolidado!
                      </h5>
                      <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                        Nós compilamos as suas respostas e um engenheiro está disponível para analisar as informações de forma gratuita no WhatsApp.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                      <a
                        id="quiz-whatsapp-submit"
                        href={getQuizWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#C29047] hover:bg-[#A97A37] text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition inline-flex items-center justify-center gap-1.5"
                      >
                        <span>Receber orientação inicial</span>
                        <ArrowRight className="w-4 h-4 text-slate-950" />
                      </a>
                      <button
                        type="button"
                        onClick={handleResetQuiz}
                        className="px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition"
                      >
                        Reiniciar perguntas
                      </button>
                    </div>
                  </motion.div>
                )}

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 10. DIFERENCIAIS */}
      <section className="py-20 sm:py-28 bg-slate-50" id="diferenciais">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono font-bold text-[#C29047] uppercase tracking-wider block">
              Diferenciais de Mercado
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-950 tracking-tight">
              A diferença entre um desenho comum e um projeto de engenharia Órdus.
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tratamos o projeto estrutural como um facilitador de canteiro, focado em simplificar montagens e evitar paradas indesejadas de mestre de obras.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((diff, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white border border-slate-150 p-6 rounded-2xl hover:shadow-lg hover:border-[#C29047]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="space-y-2">
                  <span className="text-[10px] text-[#C29047] font-mono font-bold block">✓ PARCEIRO CRITERIOSO</span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base tracking-tight">{diff.title}</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{diff.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. ATENDIMENTO À DISTÂNCIA */}
      <section className="py-20 bg-[#0E1721] text-white relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[50%] aspect-square rounded-full bg-[#C29047]/5 blur-[150px] pointer-events-none" />
        
        <motion.div 
          className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-5 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-mono font-[#C29047] uppercase tracking-wider block text-[#C29047]">
            Logística e Atendimento
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
            Atendimento organizado mesmo para obras em outras cidades.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A Órdus Engenharia atende clientes em diferentes regiões do Brasil. Temos um processo consolidado para coleta de dados topográficos e geotécnicos de forma digital e realizamos compatibilizações por videochamada com o seu arquiteto, garantindo excelência remota para sua obra.
          </p>
          <p className="text-slate-500 text-[10px] sm:text-xs font-mono">
            *Não prometemos acompanhamento presencial diário em todas as cidades; as vistorias in loco seguem cronograma acordado de propostas técnicas individuais.
          </p>
        </motion.div>
      </section>

      {/* 12. FAQ (PERGUNTAS FREQUENTES) */}
      <section id="perguntas" className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono font-bold text-[#C29047] uppercase tracking-wider block">
              Dúvidas Frequentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-950 tracking-tight">
              Perguntas frequentes sobre engenharia e processos estruturais
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Respostas claras, consultivas e confiáveis para te guiar antes de escavar a primeira sapata.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <motion.div 
                  key={idx} 
                  className="bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden transition-all duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 text-[#1E293B] font-bold text-xs sm:text-sm hover:bg-slate-100 transition cursor-pointer select-none"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-500" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-500" />}
                  </button>
                  {isOpen && (
                    <motion.div 
                      className="p-5 sm:p-6 pt-0 border-t border-slate-150 text-slate-600 text-xs sm:text-sm leading-relaxed bg-white"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 13. CTA FINAL */}
      <section className="py-20 sm:py-28 bg-[#0E1721] text-white relative">
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-6 relative">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-xs font-mono font-bold text-[#C29047] uppercase tracking-wider block">
              Próximo Passo Seguro
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight leading-tight">
              Antes de construir, entenda o caminho técnico mais seguro.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Converse com a Órdus e receba uma orientação inicial para o seu projeto, obra ou demanda técnica. Proteja seu investimento contra retrabalho.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a 
                id="cta-final-whatsapp"
                href="https://wa.me/5531997182443"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C29047] hover:bg-[#A97A37] hover:scale-[1.02] text-slate-950 font-black text-xs sm:text-sm px-6 py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 duration-200"
              >
                <span>Falar no WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>
              <button 
                id="cta-final-portal"
                onClick={() => navigate('/login')}
                className="bg-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] text-white font-bold text-xs sm:text-sm px-6 py-4 rounded-xl border border-white/10 transition duration-200"
              >
                Acessar portal do cliente
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 14. CONTATO E LOCALIZAÇÃO */}
      <section id="contato" className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-150 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <motion.div 
                className="lg:col-span-6 space-y-5"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-xs font-mono font-bold text-[#C29047] uppercase tracking-wider block">
                  Informações Físicas e Digitais
                </span>
                <h3 className="text-2xl font-black font-sans text-slate-950 tracking-tight">
                  Estamos à disposição para a sua demanda.
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Visite nosso escritório físico em Sete Lagoas ou solicite um atendimento digital estruturado.
                </p>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5 hover:translate-x-1 transition-transform duration-200">
                    <MapPin className="w-5 h-5 text-[#C29047] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-950 block">Endereço Executivo:</strong>
                      <span>Av. Raquel Teixeira Viana, 620 - Sala 102 - Canaã, Sete Lagoas - MG, 35700-293</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 hover:translate-x-1 transition-transform duration-200">
                    <MessageSquare className="w-5 h-5 text-[#C29047] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-950 block">Telefone / WhatsApp:</strong>
                      <span className="font-mono text-slate-900 font-bold">(31) 99718-2443</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a 
                    id="maps-link-btn"
                    href="https://www.google.com/maps/search/?api=1&query=Av.%20Raquel%20Teixeira%20Viana%20620%20Sala%20102%20Cana%C3%A3%20Sete%20Lagoas%20MG%2035700-293"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-950 hover:bg-slate-900 hover:scale-[1.02] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Ver no Google Maps</span>
                    <MapPin className="w-4 h-4" />
                  </a>
                  <a 
                    id="whatsapp-link-btn"
                    href="https://wa.me/5531997182443"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#C29047] hover:bg-[#A97A37] hover:scale-[1.02] text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Enviar mensagem WhatsApp</span>
                    <MessageSquare className="w-4 h-4 text-slate-950" />
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="lg:col-span-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-full aspect-[4/3] rounded-2xl bg-slate-200 border border-slate-300 relative overflow-hidden shadow-md">
                  {/* Decorative simple vector styling indicating map localization */}
                  <div className="absolute inset-0 bg-sky-100 flex flex-col justify-center items-center relative">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
                    {/* Simulated Map lines */}
                    <div className="absolute top-1/3 inset-x-0 h-[2px] bg-sky-200" />
                    <div className="absolute bottom-1/4 inset-x-0 h-[3px] bg-sky-200" />
                    <div className="absolute left-1/3 inset-y-0 w-[2px] bg-sky-200" />
                    <div className="absolute right-1/4 inset-y-0 w-[3px] bg-sky-200" />
                    
                    {/* Map Marker Pin */}
                    <div className="z-10 bg-[#0E1721] text-white p-3.5 rounded-xl border border-slate-800 flex items-center gap-2 shadow-xl animate-bounce">
                      <MapPin className="w-5 h-5 text-[#C29047]" />
                      <div className="text-left">
                        <strong className="text-[10px] block font-bold text-white leading-tight">ÓRDUS Engenharia</strong>
                        <span className="text-[8px] text-[#C29047] block font-mono">Sala 102 - Sete Lagoas, MG</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* 15. FOOTER */}
      <footer className="bg-[#0E1721] text-[#94A3B8] text-xs py-12 border-t border-[#1E293B]" id="public-footer">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-3">
            <div className="mb-2 flex items-center">
              <Logo className="h-[70px] w-auto" variant="dark-bg" />
            </div>
            <p className="leading-relaxed text-slate-400 pr-4">
              Plataforma privada da Órdus Engenharia para estudos técnicos, simulações de obra e acompanhamento de projetos.
            </p>
          </div>

          <div className="md:col-span-4 space-y-2">
            <h5 className="text-white font-bold tracking-tight">Contato & Localização</h5>
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

    </div>
  );
}
