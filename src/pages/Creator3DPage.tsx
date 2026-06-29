import React, { useState, useEffect } from 'react';
import { CreatorProjectConfig, CreatorProjectType, Lead } from '../types';
import { projectRepository } from '../repositories/ProjectRepository';
import { 
  Box, 
  Save, 
  Send, 
  RefreshCw, 
  Check, 
  X, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import CreatorPresetSelector from '../components/CreatorPresetSelector';
import CreatorControlsPanel from '../components/CreatorControlsPanel';
import ThreeProjectScene from '../components/ThreeProjectScene';

// 1. INITIAL PREMIUM DEFAULT PRESET ("Minha Casa Moderna 5x25")
const INITIAL_PRESET: Omit<CreatorProjectConfig, 'id' | 'name' | 'timestamp'> = {
  projectType: 'terrea' as CreatorProjectType,
  style: 'popular_moderna',
  lotWidth: 5,
  lotLength: 25,
  builtArea: 75,
  floors: 1,
  bedrooms: 2,
  suites: 1,
  bathrooms: 2,
  parkingSpaces: 1,
  integratedLiving: true,
  gourmetArea: false,
  frontSetback: 5,
  roofType: 'platibanda',
  wallFrontal: false,
  gardenFrontal: true,
  balcony: false,
  pool: false,
  viewMode: 'perspective',
  materials: {
    wallColor: '#F8FAFC',
    roofColor: '#1E293B',
    trimColor: '#0F172A',
    externalFloor: 'grama',
    highlightMaterial: 'reboco'
  }
};

export default function Creator3DPage() {
  // State definitions
  const [config, setConfig] = useState<CreatorProjectConfig>({
    id: 'draft-temp',
    name: 'Minha Casa Moderna 5x25',
    ...INITIAL_PRESET,
    timestamp: new Date().toISOString()
  });

  const [savedCreations, setSavedCreations] = useState<CreatorProjectConfig[]>([]);
  const [sessionPresetName, setSessionPresetName] = useState<string>('Minha Casa Moderna 5x25');

  // Lead Generation States
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadNotes, setLeadNotes] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Soft Feedback Visual Toast notification
  const [visualToast, setVisualToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setVisualToast({ message, type });
  };

  useEffect(() => {
    if (visualToast) {
      const timer = setTimeout(() => {
        setVisualToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visualToast]);

  // Load creations from client local historic space on mount
  useEffect(() => {
    const backup = localStorage.getItem('ordus_3d_projects');
    if (backup) {
      try {
        setSavedCreations(JSON.parse(backup));
      } catch (err) {
        console.error('Falha ao restaurar rascunhos salvos', err);
      }
    }
  }, []);

  const handleSelectPreset = (preset: Omit<CreatorProjectConfig, 'id' | 'name' | 'timestamp'> & { presetName: string }) => {
    const { presetName, ...params } = preset;
    setConfig({
      id: 'draft-temp',
      name: presetName,
      ...params,
      timestamp: new Date().toISOString()
    });
    setSessionPresetName(presetName);
    showToast(`Carregado preset: "${presetName}".`, 'success');
  };

  const handleResetModel = () => {
    let base = { ...INITIAL_PRESET };
    
    // Attempt to restore to the selected preset if it was marked
    if (sessionPresetName === 'Casa Térrea 8x25') {
      base.style = 'terrea_contemporanea';
      base.lotWidth = 8;
      base.lotLength = 25;
      base.builtArea = 115;
      base.frontSetback = 5.5;
      base.roofType = 'embutido';
      base.wallFrontal = true;
      base.gardenFrontal = true;
      base.parkingSpaces = 2;
      base.gourmetArea = true;
      base.materials.wallColor = '#EBE3D5';
    } else if (sessionPresetName === 'Sobrado Urbano 6x25') {
      base.projectType = 'sobrado';
      base.style = 'sobrado_urbano';
      base.lotWidth = 6;
      base.lotLength = 25;
      base.builtArea = 135;
      base.floors = 2;
      base.balcony = true;
      base.materials.highlightMaterial = 'madeira_ripada';
    } else if (sessionPresetName === 'Casa Alto Padrão 12x30') {
      base.projectType = 'sobrado';
      base.style = 'alto_luxo';
      base.lotWidth = 12;
      base.lotLength = 30;
      base.builtArea = 260;
      base.floors = 2;
      base.gourmetArea = true;
      base.pool = true;
      base.balcony = true;
      base.parkingSpaces = 2;
      base.materials.trimColor = '#C29047';
    } else if (sessionPresetName === 'Casa de Campo com Varanda') {
      base.projectType = 'chale';
      base.style = 'campo_varanda';
      base.lotWidth = 15;
      base.lotLength = 30;
      base.builtArea = 180;
      base.roofType = 'colonial';
      base.gourmetArea = true;
      base.pool = true;
      base.materials.wallColor = '#EBE3D5';
      base.materials.roofColor = '#C25A3F';
    } else if (sessionPresetName === 'Comercial de Esquina') {
      base.projectType = 'comercial';
      base.style = 'comercial_esquina';
      base.lotWidth = 10;
      base.lotLength = 20;
      base.builtArea = 190;
      base.floors = 2;
      base.parkingSpaces = 2;
      base.materials.wallColor = '#94A3B8';
    }

    setConfig({
      id: 'draft-temp',
      name: sessionPresetName,
      ...base,
      timestamp: new Date().toISOString()
    });
    showToast('Parametrizações resetadas para o padrão.', 'success');
  };

  const handleSaveConcept = () => {
    const freshId = `3d-${Date.now()}`;
    const namePrompt = prompt('Nome para distinguir esta composição conceitual:', config.name || `Meu Projeto ${config.style.toUpperCase()}`);
    if (namePrompt === null) return; // user cancelled

    const chosenName = namePrompt.trim() !== '' ? namePrompt.trim() : `Composição ${config.style}`;
    const newSavedItem: CreatorProjectConfig = {
      ...config,
      id: freshId,
      name: chosenName,
      timestamp: new Date().toISOString()
    };

    const updated = [newSavedItem, ...savedCreations];
    localStorage.setItem('ordus_3d_projects', JSON.stringify(updated));
    setSavedCreations(updated);
    showToast(`Estudo "${chosenName}" gravado com sucesso no seu histórico local.`, 'success');
  };

  const handleLoadSavedItem = (item: CreatorProjectConfig) => {
    setConfig(item);
    setSessionPresetName(item.name);
    showToast(`Estudo conceitual "${item.name}" reaberto com sucesso.`, 'success');
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  const handleDeleteSavedItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const filtered = savedCreations.filter(item => item.id !== id);
    localStorage.setItem('ordus_3d_projects', JSON.stringify(filtered));
    setSavedCreations(filtered);
    showToast('Estudo removido de seu histórico local.', 'success');
  };

  const handleOpenLeadSubmit = () => {
    setIsLeadModalOpen(true);
  };

  const handleGenerateBriefing = () => {
    setIsBriefingModalOpen(true);
  };

  // Compile full dynamic NBR descriptive text
  const getBriefingText = () => {
    const typeLabel = {
      terrea: 'Casa Térrea',
      sobrado: 'Sobrado de Alto Padrão',
      chale: 'Chalé de Serra/Campo',
      comercial: 'Estrutura Comercial',
    }[config.projectType] || 'Residência Paramétrica';

    return `========================================================
ÓRDUS ENGENHARIA - MEMORIAL DESCRITIVO E BRIEFING TÉCNICO
========================================================
ESTUDO: ${config.name || 'Personalizado'}
DATA DE GERAÇÃO: ${new Date().toLocaleDateString('pt-BR')}
DIRETRIZ DESIGN: NBR 15575 (Desempenho de Edificações)

1. ZONEAMENTO & IMPLANTAÇÃO
--------------------------------------------------------
- Tipo de Edificação: ${typeLabel} (${config.floors} pavimentos)
- Estilo Arquitetônico: ${config.style.toUpperCase().replace('_', ' ')}
- Dimensões do Lote: ${config.lotWidth}x${config.lotLength}m
- Área Total do Lote: ${config.lotWidth * config.lotLength} m²
- Recuo Frontal Projetado: ${config.frontSetback ?? 5}m (Zona Urbana Mín 3m)

2. COMPARTIMENTAÇÃO INTERNA
--------------------------------------------------------
- Área Construída Estimada: ${config.builtArea} m²
- Dormitórios: ${config.bedrooms} Quartos
- Suítes Integradas: ${config.suites} Suítes
- Banheiros Completos: ${config.bathrooms} Banheiros
- Vagas de Garagem: ${config.parkingSpaces} Vagas Cobertas

3. ACABAMENTOS & ESPECIFICAÇÕES TÉCNICAS
--------------------------------------------------------
- Cobertura / Telhado: ${config.roofType ? config.roofType.toUpperCase() : 'PLATIBANDA'}
- Revestimento Fachada: ${(config.materials.highlightMaterial || 'reboco').toUpperCase()}
- Paleta Paredes: ${config.materials.wallColor}
- Paleta Esquadrias: ${config.materials.trimColor}
- Revestimento Traseiro: ${(config.materials.externalFloor || 'grama').toUpperCase()}

4. INFRAESTRUTURA E ÁREAS DE LAZER
--------------------------------------------------------
- Muro Frontal: ${config.wallFrontal ? 'SIM (Fechamento Opaco)' : 'NÃO (Conceito Aberto)'}
- Jardim de Entrada: ${config.gardenFrontal ? 'SIM (Paisagismo Ativo)' : 'NÃO'}
- Varanda Gourmet: ${config.gourmetArea ? 'SIM (Com churrasqueira/bancada)' : 'NÃO'}
- Sacada/Balcão: ${config.balcony ? 'SIM (Guarda-corpo NBR 14718)' : 'NÃO'}
- Piscina: ${config.pool ? 'SIM (Estrutura de concreto armado)' : 'NÃO'}

--------------------------------------------------------
Estudo preliminar conceitual gerado no Estúdio 3D Órdus. 
Os dados acima estão prontos para importação direta no BIM (Revit/ArchiCAD) 
e geração de orçamentos quantitativos via SINAPI.
========================================================`;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadPhone) {
      showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    setFormSubmitting(true);

    try {
      // Build parametric detailed text summary
      const typeLabel = {
        terrea: 'Casa Térrea',
        sobrado: 'Sobrado de Alto Padrão',
        chale: 'Chalé de Serra/Campo',
        comercial: 'Estrutura Comercial',
      }[config.projectType];

      const summaryText = `[ESTÚDIO 3D ÓRDUS] Solicitado envio de proposta técnica para:
- Estrutura: ${typeLabel} (${config.floors} pavimentos)
- Estilo: ${config.style.toUpperCase()}
- Terreno planejado: ${config.lotWidth}x${config.lotLength}m
- Recuo frontal: ${config.frontSetback ?? 5}m
- Área construída aproximada: ${config.builtArea} m²
- Cômodos: ${config.bedrooms} Dormitórios (${config.suites} Suítes), ${config.bathrooms} Banheiros, ${config.parkingSpaces} Vagas de Garagem
- Tipo de Cobertura / Telhado: ${config.roofType ? config.roofType.toUpperCase() : 'PLATIBANDA'}
- Revestimento Fachada: ${(config.materials.highlightMaterial || 'reboco').toUpperCase()}
- Extras: Muro frontal (${config.wallFrontal ? 'Sim' : 'Não'}), Jardim frontal (${config.gardenFrontal ? 'Sim' : 'Não'}), Varanda Gourmet (${config.gourmetArea ? 'Sim' : 'Não'}), Sacada (${config.balcony ? 'Sim' : 'Não'}), Piscina (${config.pool ? 'Sim' : 'Não'})
- Informações adicionais do cliente: ${leadNotes || "Nenhuma observação extra fornecida"}`;

      const leadRecord: Lead = {
        id: `lead-3d-${Date.now()}`,
        name: leadName,
        email: leadEmail,
        phone: leadPhone,
        message: summaryText,
        type: 'estudo_3d',
        timestamp: new Date().toISOString()
      };

      await projectRepository.createLead(leadRecord);
      
      // Clear states
      setIsLeadModalOpen(false);
      setIsSuccessModalOpen(true);
      setLeadName('');
      setLeadEmail('');
      setLeadPhone('');
      setLeadNotes('');
    } catch (err) {
      console.error(err);
      showToast('Ocorreu um erro ao registrar a solicitação.', 'error');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 selection:bg-[#C29047] selection:text-white">
      
      {/* Toast Alert */}
      {visualToast && (
        <div className={`fixed top-24 right-4 z-50 flex items-center gap-2.5 p-4 rounded-2xl shadow-xl border text-xs sm:text-sm font-semibold animate-fade-in ${
          visualToast.type === 'success' 
            ? 'bg-slate-900 border-[#C29047] text-white' 
            : 'bg-rose-950/95 border-rose-900 text-rose-100'
        }`}>
          <div className="shrink-0">
            {visualToast.type === 'success' ? (
              <Check className="w-5 h-5 text-[#C29047]" />
            ) : (
              <X className="w-5 h-5 text-rose-500" />
            )}
          </div>
          <span>{visualToast.message}</span>
        </div>
      )}

      {/* HEADER HERO AREA */}
      <div className="bg-[#0E1721] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl border border-slate-900">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] aspect-square rounded-full bg-[#C29047]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[35%] aspect-square rounded-full bg-[#3B82F6]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#C29047] font-bold uppercase tracking-wider">
            <Box className="w-4.5 h-4.5 text-[#C29047]" />
            Módulo Paramétrico Realista
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight">
            Estúdio 3D <span className="text-[#C29047] font-medium font-sans">Órdus</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Projete maquetes conceituais realistas baseadas em residências contemporâneas urbanas e rústicas brasileiras. Regule as dimensões do terreno, recuo de zoneamento municipal, garagens, jardins e gere memoriais descritivos detalhados para envio direto aos engenheiros da <b>Órdus Engenharia</b>.
          </p>
        </div>
      </div>

      {/* PRESETS QUICK SELECTOR PANEL */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <CreatorPresetSelector 
          onSelectPreset={handleSelectPreset} 
          activePresetName={sessionPresetName} 
        />
      </div>

      {/* 2-COLUMN VIEWPORT AND WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Control Parameters Panel (Col Span 5) */}
        <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
          <CreatorControlsPanel 
            config={config} 
            onChangeConfig={(newConfig) => {
              setConfig({
                ...newConfig,
                name: ''
              });
            }} 
          />

          {/* Action trigger button blocks */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-xs">
            <button
              id="action-save-concept"
              onClick={handleSaveConcept}
              className="w-full py-3.5 bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-800 transition duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-xs border border-slate-950"
            >
              <Save className="w-4 h-4 text-[#C29047]" />
              Salvar estudo
            </button>

            <button
              id="action-lead-quote"
              onClick={handleOpenLeadSubmit}
              className="w-full py-3.5 bg-[#C29047] text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-[#A97A37] transition duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4 text-white" />
              Enviar para análise
            </button>

            <button
              id="action-generate-briefing"
              onClick={handleGenerateBriefing}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer border border-slate-250"
            >
              <FileCheck className="w-3.5 h-3.5 text-slate-500" />
              Gerar briefing descritivo (NBR)
            </button>

            <button
              id="action-reset-config"
              onClick={handleResetModel}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 font-semibold text-[10px] rounded-lg transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-slate-400" />
              Resetar maquete
            </button>
          </div>
        </div>

        {/* Right 3D Viewport canvas (Col Span 7) */}
        <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24 order-1 lg:order-2">
          
          <div id="three-viewport-box" className="aspect-16/11 sm:aspect-16/10 lg:aspect-4/3 w-full bg-[#0B1219] border border-slate-900 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col">
            
            {/* Context status panel on top of the 3D map */}
            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none select-none">
              
              <div className="bg-slate-950/85 backdrop-blur-md rounded-xl p-3 border border-slate-800/80 max-w-[70%]">
                <span className="text-[10px] font-mono font-bold text-[#C29047] uppercase tracking-wider block mb-0.5">
                  Estúdio Técnico Órdus
                </span>
                <span className="text-white text-xs sm:text-sm font-bold block truncate">
                  {config.name || `Modelo Customizado: ${config.style.toUpperCase()}`}
                </span>
              </div>

              <div className="bg-slate-950/85 backdrop-blur-md rounded-xl px-3 py-1.5 border border-slate-800/80 text-right">
                <span className="text-[8px] sm:text-[10px] font-mono text-slate-400 block uppercase">
                  Área do Lote
                </span>
                <span className="text-white text-[11px] sm:text-xs font-mono font-bold block">
                  {config.lotWidth * config.lotLength} m² ({config.lotWidth}x{config.lotLength}m)
                </span>
              </div>

            </div>

            {/* Interactive 3D Canvas Scene mounting */}
            <div className="flex-1 w-full h-full min-h-[300px] sm:min-h-[420px] lg:min-h-0">
              <ThreeProjectScene config={config} />
            </div>

            {/* Float summary labels inside bottom frame of canvas */}
            <div className="absolute bottom-4 right-4 z-10 pointer-events-none bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-xl px-3 py-1.5 flex flex-wrap gap-x-4 gap-y-1 items-center max-w-[85%] text-[10px] sm:text-xs text-white">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>{config.bedrooms} Quartos</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C29047]" />
                <span>{config.builtArea}m² Úteis</span>
              </div>
              {config.parkingSpaces > 0 && (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{config.parkingSpaces} Vagas</span>
                </div>
              )}
            </div>

          </div>

          {/* DYNAMIC RESUMO DO ESTUDO GERADO (ALADO/ABAIXO DO PREVIEW) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h4 className="font-extrabold text-sm text-slate-950 uppercase tracking-tight font-sans">
                Resumo Técnico do Estudo Gerado
              </h4>
              <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-bold">
                ESTADO: PRONTO PARA VALIDAÇÃO
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3.5 text-xs">
              <div>
                <span className="block text-[10px] text-slate-400 font-mono uppercase">Loteamento</span>
                <span className="font-bold text-slate-800">{config.lotWidth} x {config.lotLength}m ({config.lotWidth * config.lotLength} m²)</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono uppercase">Recuo de Fachada</span>
                <span className="font-bold text-slate-800">{config.frontSetback ?? 5} m</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono uppercase">Área Construída</span>
                <span className="font-bold text-[#C29047]">{config.builtArea} m² estimados</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono uppercase">Estilo Escolhido</span>
                <span className="font-bold text-slate-800 capitalize">{config.style.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono uppercase">Pavimentos / Vagas</span>
                <span className="font-bold text-slate-800">{config.floors} Pav. / {config.parkingSpaces} vagas</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono uppercase">Dormitórios / WC</span>
                <span className="font-bold text-slate-800">{config.bedrooms} Q / {config.suites} Suítes / {config.bathrooms} WC</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-[10px] font-mono text-slate-500">
              <span className="bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-lg">
                Piscina: {config.pool ? 'Sim' : 'Não'}
              </span>
              <span className="bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-lg">
                Gourmet: {config.gourmetArea ? 'Sim' : 'Não'}
              </span>
              <span className="bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-lg">
                Muro Frontal: {config.wallFrontal ? 'Sim' : 'Não'}
              </span>
              <span className="bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-lg">
                Jardim: {config.gardenFrontal ? 'Sim' : 'Não'}
              </span>
            </div>
          </div>

          {/* Quick specs helper sheet */}
          <div className="bg-[#1E293B]/5 border border-slate-200 rounded-3xl p-5 space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Parâmetros de Viabilidade Técnica (Órdus)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
              <div className="bg-white border border-slate-150 p-3 rounded-2xl">
                <span className="block text-[10px] uppercase font-mono text-slate-400 mb-0.5">Recuo Frontal</span>
                <span className="font-bold text-slate-800">Definido {config.frontSetback ?? 5}m (Mín 3,0m)</span>
              </div>
              <div className="bg-white border border-slate-150 p-3 rounded-2xl">
                <span className="block text-[10px] uppercase font-mono text-slate-400 mb-0.5">Taxa Zona Urbana</span>
                <span className="font-bold text-slate-800">Mínimo 15%</span>
              </div>
              <div className="bg-white border border-slate-150 p-3 rounded-2xl">
                <span className="block text-[10px] uppercase font-mono text-slate-400 mb-0.5">Recuo de Fundação</span>
                <span className="font-bold text-[#C29047]">Apropriado</span>
              </div>
              <div className="bg-white border border-slate-150 p-3 rounded-2xl">
                <span className="block text-[10px] uppercase font-mono text-slate-400 mb-0.5">Aproveitamento</span>
                <span className="font-bold text-slate-800">Coeficiente: 1.5</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* SAVED CONCEPTUAL PROJECTS HISTORIC (Banco Local) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-xs">
        <div>
          <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
            Estudos de Maquete Gravados Localmente
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Seus rascunhos de modelagem 3D salvos no navegador nesta sessão.
          </p>
        </div>

        {savedCreations.length === 0 ? (
          <div className="border border-dashed border-slate-250 rounded-2xl p-8 text-center text-slate-400 text-xs sm:text-sm">
            Nenhum estudo salvo ainda. Configure as medidas no painel e clique em "Salvar estudo" para reter históricos de simulações.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {savedCreations.map((item) => {
              const styleLab = (item.style || 'MODERNA').toString().toUpperCase();
              return (
                <div
                  key={item.id}
                  onClick={() => handleLoadSavedItem(item)}
                  className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 cursor-pointer text-left transition duration-200 flex flex-col justify-between h-40 relative group"
                >
                  <button
                    onClick={(e) => handleDeleteSavedItem(e, item.id)}
                    className="absolute top-3 right-3 p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-red-600 rounded-lg hover:scale-105 transition animate-fade-in"
                    title="Remover Rascunho"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-1 max-w-[85%]">
                    <span className="text-[9px] font-bold font-mono tracking-wider uppercase text-[#C29047] block">
                      {styleLab}
                    </span>
                    <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm block truncate">
                      {item.name}
                    </h5>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      {new Date(item.timestamp).toLocaleDateString()} às {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-[11px] font-medium text-slate-600">
                    <span>📐 {item.lotWidth}x{item.lotLength}m</span>
                    <span>🏠 {item.builtArea} m²</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BRIEFING MODAL DIALOG */}
      {isBriefingModalOpen && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col animate-fade-in my-8 text-slate-300">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <h4 className="font-extrabold text-white text-sm">Briefing Técnico para Download</h4>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">EMISSÃO AUTOMÁTICA ÓRDUS • NBR COMPLIANT</p>
              </div>
              <button 
                onClick={() => setIsBriefingModalOpen(false)}
                className="p-1.5 bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-400">
                Copie o memorial descritivo estruturado abaixo para anexar ao seu briefing executivo ou importar no seu software BIM.
              </p>

              <textarea
                readOnly
                value={getBriefingText()}
                rows={12}
                className="w-full p-4 text-xs font-mono bg-slate-950 border border-slate-800 rounded-xl focus:outline-none text-[#C29047] h-[280px]"
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBriefingModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Fechar Janela
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(getBriefingText());
                    showToast('Copiado para a área de transferência!', 'success');
                  }}
                  className="flex-1 py-3 bg-[#C29047] hover:bg-[#AD7E3B] text-slate-950 font-black text-xs rounded-xl transition cursor-pointer"
                >
                  Copiar Texto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEAD MODAL DIALOG */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-fade-in my-8">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Enviar Parâmetros 3D</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">REMETENTE: ÓRDUS PARCEIRO</p>
              </div>
              <button 
                onClick={() => setIsLeadModalOpen(false)}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLeadSubmit} className="p-6 space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Nossos engenheiros analisarão a viabilidade das parametrizações informadas ({config.builtArea}m², no estilo {config.style.toUpperCase()}) e montarão uma proposta de arquitetura executiva personalizada.
              </p>

              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 font-mono uppercase">
                  Nome Completo *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#C29047]"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 font-mono uppercase">
                  E-mail para Contato *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#C29047]"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 font-mono uppercase">
                  Telefone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="(99) 99999-9999"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#C29047]"
                  />
                </div>
              </div>

              {/* Notes Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 font-mono uppercase">
                  Instruções ou Notas Adicionais (Opcional)
                </label>
                <textarea
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Ex: Desejo que o deck dos fundos seja virado para o entardecer."
                  rows={3}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#C29047]"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  {formSubmitting ? 'Registrando...' : 'Confirmar Solicitação'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* LEAD SUCCESS DIALOG */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-250 rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-1 border border-emerald-100">
              <FileCheck className="w-6 h-6" />
            </div>
            
            <div className="space-y-1.5">
              <h4 className="font-extrabold text-slate-900 text-sm">Solicitação Registrada!</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                As especificações do seu rascunho de Composição Conceitual 3D foram mapeadas e adicionadas com sucesso à nossa fila de análise do CRM Corporativo.
              </p>
            </div>

            <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 text-[11px] font-medium text-slate-600 flex justify-between gap-1">
              <span>Proponente: Fila de Engenharia</span>
              <span>CRM Fila: #3D-CR</span>
            </div>

            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Compreendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
