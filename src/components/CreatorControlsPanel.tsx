import React, { useState } from 'react';
import { 
  CreatorProjectConfig, 
  RoofType, 
  BrazilianArchitecturalStyle, 
  FacadeMaterial, 
  ViewMode 
} from '../types';
import { 
  Compass,
  Wand2,
  Layers,
  Palette,
  CheckCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Bed,
  Bath,
  Car,
  Home
} from 'lucide-react';

interface CreatorControlsPanelProps {
  config: CreatorProjectConfig;
  onChangeConfig: (newConfig: CreatorProjectConfig) => void;
}

export default function CreatorControlsPanel({ config, onChangeConfig }: CreatorControlsPanelProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  const updateField = (field: keyof CreatorProjectConfig, value: any) => {
    onChangeConfig({
      ...config,
      [field]: value,
    });
  };

  const updateMaterialField = (field: keyof CreatorProjectConfig['materials'], value: any) => {
    onChangeConfig({
      ...config,
      materials: {
        ...config.materials,
        [field]: value
      }
    });
  };

  // Pre-configured Brazilian architectural color palettes
  const wallColors = [
    { name: 'Branco Neve', hex: '#F8FAFC' },
    { name: 'Areia Atacama', hex: '#EBE3D5' },
    { name: 'Cinza Concreto', hex: '#94A3B8' },
    { name: 'Argila Queimada', hex: '#B45309' },
    { name: 'Grafite Fosco', hex: '#334155' },
  ];

  const trimColors = [
    { name: 'Preto Anodizado', hex: '#0F172A' },
    { name: 'Bronze Premium', hex: '#451A03' },
    { name: 'Ouro Órdus', hex: '#C29047' },
    { name: 'Alumínio Natural', hex: '#64748B' },
  ];

  // Map Brazilian typical styles with elegant descriptions
  const brazilianStyles: { value: BrazilianArchitecturalStyle; label: string; desc: string }[] = [
    { value: 'popular_moderna', label: 'Popular Moderna', desc: 'Funcional, platibanda e vão integrado de custo otimizado.' },
    { value: 'terrea_contemporanea', label: 'Térrea Contemporânea', desc: 'Fachada imponente, pé-direito duplo e garagem robusta.' },
    { value: 'sobrado_urbano', label: 'Sobrado Urbano', desc: 'Vertical esguio para lotes integrados e aproveitamento máximo.' },
    { value: 'campo_varanda', label: 'Casa de Campo', desc: 'Beirais de madeira rústica, deck amplo e telhado cerâmico.' },
    { value: 'platibanda_moderna', label: 'Fachada com Platibanda', desc: 'Design quadrado minimalista com telhado totalmente embutido.' },
    { value: 'colonial_tradicional', label: 'Colonial Tradicional', desc: 'Clássicos arcos de esquadrias e telhas quentes aparentes.' },
    { value: 'alto_luxo', label: 'Alto Padrão Minimalista', desc: 'Concreto ripado, panos de vidro fluidos e volumes projetados.' },
    { value: 'comercial_esquina', label: 'Comercial Pequeno', desc: 'Ponto comercial moderno com estacionamento de calçada.' }
  ];

  // Steps configuration
  const steps = [
    { id: 1, label: 'Terreno', icon: Compass },
    { id: 2, label: 'Estilo', icon: Wand2 },
    { id: 3, label: 'Ambientes', icon: Layers },
    { id: 4, label: 'Acabamentos', icon: Palette },
    { id: 5, label: 'Revisão', icon: CheckCircle },
  ];

  return (
    <div id="creator-controls-container" className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 sm:p-6 space-y-6 shadow-2xl max-h-[92vh] overflow-y-auto custom-scrollbar">
      
      {/* 3D VIEWPORT PERSPECTIVE SHORTCUTS */}
      <div className="space-y-2 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[#C29047]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Ponto de Vista</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {([
            { value: 'perspective', label: 'Perspectiva' },
            { value: 'top', label: 'Planta' },
            { value: 'facade', label: 'Fachada' }
          ] as { value: ViewMode; label: string }[]).map((v) => {
            const active = (config.viewMode || 'perspective') === v.value;
            return (
              <button
                key={v.value}
                type="button"
                onClick={() => updateField('viewMode', v.value)}
                className={`py-1.5 rounded-lg border text-[10px] font-bold text-center cursor-pointer transition uppercase tracking-wider ${
                  active
                    ? 'bg-[#C29047] border-[#C29047] text-white font-black'
                    : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800 text-slate-400'
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* HORIZONTAL STEP TABS */}
      <div className="flex justify-between items-center bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/65 overflow-x-auto gap-1">
        {steps.map((s) => {
          const StepIcon = s.icon;
          const isActive = currentStep === s.id;
          const isDone = s.id < currentStep;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentStep(s.id)}
              className={`flex-1 min-w-[55px] py-2 rounded-xl flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                isActive 
                  ? 'bg-slate-800 text-[#C29047] border border-slate-700/80' 
                  : isDone
                    ? 'text-slate-300 hover:text-slate-100'
                    : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              <StepIcon className={`w-4 h-4 ${isActive ? 'text-[#C29047]' : isDone ? 'text-emerald-500' : ''}`} />
              <span className="text-[9px] font-bold tracking-tight hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* STEP CONTENT SWITCHER */}
      <div className="min-h-[260px] flex flex-col justify-between">
        
        {/* STEP 1: TERRENO */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#C29047] uppercase block">Passo 1 de 5</span>
              <h3 className="font-extrabold text-base text-white">Terreno e Implantação</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Determine as dimensões do seu lote e os parâmetros exigidos pelas posturas municipais.
              </p>
            </div>

            {/* Brazilian Standards of Lots */}
            <div className="space-y-2 pt-2">
              <span className="block text-[9px] font-bold text-slate-400 uppercase font-mono">Padrões Brasileiros de Lotes</span>
              <div className="flex gap-1.5 flex-wrap">
                {[
                  { label: '5x25 (Urbano)', w: 5, l: 25 },
                  { label: '8x20 (Típico)', w: 8, l: 20 },
                  { label: '10x25 (Standard)', w: 10, l: 25 },
                  { label: '12x30 (Condomínio)', w: 12, l: 30 }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChangeConfig({
                        ...config,
                        lotWidth: preset.w,
                        lotLength: preset.l,
                        builtArea: Math.min(preset.w * preset.l * 0.7, config.builtArea)
                      });
                    }}
                    className="px-2 py-1 bg-slate-950/70 border border-slate-800 rounded-lg text-[9px] font-mono hover:border-slate-650 text-slate-300 transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders para Largura e Comprimento */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-300">
                  <span>Largura do Lote</span>
                  <span className="font-mono text-[#C29047]">{config.lotWidth} metros</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={config.lotWidth}
                  onChange={(e) => updateField('lotWidth', Number(e.target.value))}
                  className="w-full accent-[#C29047] cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-300">
                  <span>Comprimento do Lote</span>
                  <span className="font-mono text-[#C29047]">{config.lotLength} metros</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={60}
                  step={1}
                  value={config.lotLength}
                  onChange={(e) => updateField('lotLength', Number(e.target.value))}
                  className="w-full accent-[#C29047] cursor-pointer"
                />
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] font-bold text-slate-300">
                  <span>Recuo Frontal da Fachada</span>
                  <span className="font-mono text-[#C29047]">{config.frontSetback ?? 5}m</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={15}
                  step={0.5}
                  value={config.frontSetback ?? 5}
                  onChange={(e) => updateField('frontSetback', Number(e.target.value))}
                  className="w-full accent-[#C29047] cursor-pointer"
                />
                <span className="block text-[9px] text-slate-400 font-mono">Exigido recuo mínimo obrigatório de 3,0m.</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ESTILO ARQUITETÔNICO */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#C29047] uppercase block">Passo 2 de 5</span>
              <h3 className="font-extrabold text-base text-white">Estilo e Telhado</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Escolha a linha estética da fachada e o sistema de captação de água da chuva.
              </p>
            </div>

            {/* Estilo Select */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase">
                Estilo Arquitetônico
              </label>
              <select
                value={config.style}
                onChange={(e) => updateField('style', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-[#C29047] transition font-semibold"
              >
                {brazilianStyles.map((style) => (
                  <option key={style.value} value={style.value} className="bg-slate-950 text-white">
                    {style.label}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 italic leading-relaxed min-h-[30px]">
                {brazilianStyles.find(s => s.value === config.style)?.desc || 'Customizado e sofisticado.'}
              </p>
            </div>

            {/* Tipo de Cobertura */}
            <div className="space-y-2 pt-1">
              <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase">
                Sistema de Cobertura
              </label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { value: 'platibanda', label: 'Platibanda (Escondido)' },
                  { value: 'colonial', label: 'Colonial (Telhas)' },
                  { value: 'duas_aguas', label: 'Duas Águas (Moderno)' },
                  { value: 'embutido', label: 'Embutido' }
                ] as { value: RoofType; label: string }[]).map((r) => {
                  const active = (config.roofType || 'platibanda') === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => updateField('roofType', r.value)}
                      className={`py-2 px-1.5 rounded-xl border text-[10px] font-semibold text-center cursor-pointer transition ${
                        active
                          ? 'bg-slate-100 border-slate-100 text-slate-900 font-bold'
                          : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: AMBIENTES */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#C29047] uppercase block">Passo 3 de 5</span>
              <h3 className="font-extrabold text-base text-white">Composição de Ambientes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Regule o tamanho da edificação, os andares e a divisão de cômodos do programa de necessidades.
              </p>
            </div>

            {/* Sliders area construida */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-300">
                <span>Área Construída Desejada</span>
                <span className="font-mono text-[#C29047]">{config.builtArea} m²</span>
              </div>
              <input
                type="range"
                min={45}
                max={380}
                step={5}
                value={config.builtArea}
                onChange={(e) => updateField('builtArea', Number(e.target.value))}
                className="w-full accent-[#C29047] cursor-pointer"
              />
            </div>

            {/* Pavimentos */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 font-mono uppercase mb-1">
                  Pavimentos
                </label>
                <div className="flex gap-1.5">
                  {[1, 2].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        onChangeConfig({
                          ...config,
                          floors: f,
                          balcony: f >= 2 ? true : false
                        });
                      }}
                      className={`flex-1 py-2 rounded-xl border text-[10px] font-semibold text-center transition cursor-pointer ${
                        config.floors === f
                          ? 'bg-slate-100 border-slate-100 text-slate-900 font-bold'
                          : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {f === 1 ? '1 Pav.' : '2 Pavs.'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vagas da Garagem */}
              <div>
                <label className="block text-[9px] font-bold text-slate-400 font-mono uppercase mb-1">
                  Vagas Cobertas
                </label>
                <div className="flex gap-1">
                  {[0, 1, 2].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => updateField('parkingSpaces', v)}
                      className={`flex-1 py-2 rounded-xl border text-[10px] font-semibold text-center transition cursor-pointer ${
                        config.parkingSpaces === v
                          ? 'bg-slate-100 border-slate-100 text-slate-900 font-bold'
                          : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {v === 0 ? 'Sem' : `${v}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dormitórios e Suítes Sliders */}
            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800/50">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-300 font-mono">
                  <span>QUARTOS</span>
                  <span className="text-[#C29047] font-bold">{config.bedrooms ?? 2}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={config.bedrooms ?? 2}
                  onChange={(e) => updateField('bedrooms', Number(e.target.value))}
                  className="w-full accent-[#C29047] h-1"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-300 font-mono">
                  <span>SUÍTES</span>
                  <span className="text-[#C29047] font-bold">{config.suites ?? 1}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  value={config.suites ?? 1}
                  onChange={(e) => updateField('suites', Number(e.target.value))}
                  className="w-full accent-[#C29047] h-1"
                />
              </div>
            </div>

            {/* Amenities Checkboxes */}
            <div className="grid grid-cols-2 gap-1.5 pt-2">
              <button
                type="button"
                onClick={() => updateField('wallFrontal', !config.wallFrontal)}
                className={`py-1.5 px-2.5 rounded-lg border text-left text-[9px] font-bold transition flex items-center justify-between cursor-pointer ${
                  config.wallFrontal ? 'bg-slate-800 border-[#C29047] text-white' : 'bg-slate-950/20 border-slate-800 text-slate-400'
                }`}
              >
                <span>Muro Frontal</span>
                <span className="text-[8px]">{config.wallFrontal ? 'SIM' : 'NÃO'}</span>
              </button>

              <button
                type="button"
                onClick={() => updateField('gourmetArea', !config.gourmetArea)}
                className={`py-1.5 px-2.5 rounded-lg border text-left text-[9px] font-bold transition flex items-center justify-between cursor-pointer ${
                  config.gourmetArea ? 'bg-slate-800 border-[#C29047] text-white' : 'bg-slate-950/20 border-slate-800 text-slate-400'
                }`}
              >
                <span>Varanda Gourmet</span>
                <span className="text-[8px]">{config.gourmetArea ? 'SIM' : 'NÃO'}</span>
              </button>

              <button
                type="button"
                onClick={() => updateField('pool', !config.pool)}
                className={`py-1.5 px-2.5 rounded-lg border text-left text-[9px] font-bold transition flex items-center justify-between cursor-pointer ${
                  config.pool ? 'bg-slate-800 border-[#C29047] text-white' : 'bg-slate-950/20 border-slate-800 text-slate-400'
                }`}
              >
                <span>Piscina</span>
                <span className="text-[8px]">{config.pool ? 'SIM' : 'NÃO'}</span>
              </button>

              <button
                type="button"
                onClick={() => updateField('gardenFrontal', !config.gardenFrontal)}
                className={`py-1.5 px-2.5 rounded-lg border text-left text-[9px] font-bold transition flex items-center justify-between cursor-pointer ${
                  config.gardenFrontal ? 'bg-slate-800 border-[#C29047] text-white' : 'bg-slate-950/20 border-slate-800 text-slate-400'
                }`}
              >
                <span>Jardim Frontal</span>
                <span className="text-[8px]">{config.gardenFrontal ? 'SIM' : 'NÃO'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ACABAMENTOS */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#C29047] uppercase block">Passo 4 de 5</span>
              <h3 className="font-extrabold text-base text-white">Acabamentos e Revestimentos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Estilize as texturas de fachada e os tons das esquadrias metálicas da residência.
              </p>
            </div>

            {/* Destaque Material */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase">
                Revestimento de Destaque
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { val: 'reboco', label: 'Reboco' },
                  { val: 'concreto', label: 'Concreto' },
                  { val: 'madeira_ripada', label: 'Madeira' },
                  { val: 'pedra', label: 'Pedra' },
                  { val: 'tijolo', label: 'Tijolo' }
                ].map((mat) => {
                  const active = (config.materials.highlightMaterial || 'reboco') === mat.val;
                  return (
                    <button
                      key={mat.val}
                      type="button"
                      onClick={() => updateMaterialField('highlightMaterial', mat.val as FacadeMaterial)}
                      className={`py-1 rounded-lg border text-[9px] font-bold text-center cursor-pointer transition ${
                        active
                          ? 'bg-[#C29047] border-[#C29047] text-white font-black'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {mat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cor Principal */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-slate-400 font-mono uppercase">
                Cor das Paredes
              </label>
              <div className="flex items-center gap-2">
                {wallColors.map((col) => {
                  const active = config.materials.wallColor === col.hex;
                  return (
                    <button
                      key={col.hex}
                      type="button"
                      onClick={() => updateMaterialField('wallColor', col.hex)}
                      className={`w-6 h-6 rounded-full border transition flex items-center justify-center cursor-pointer ${
                        active ? 'ring-2 ring-[#C29047] scale-110 border-white' : 'border-slate-700'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {active && <span className="w-1 h-1 rounded-full bg-slate-900" />}
                    </button>
                  );
                })}
                <span className="text-[10px] text-slate-400 font-mono">
                  {wallColors.find(c => c.hex === config.materials.wallColor)?.name || 'Custom'}
                </span>
              </div>
            </div>

            {/* Cor Esquadria */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-slate-400 font-mono uppercase">
                Cor das Esquadrias (Trim)
              </label>
              <div className="flex items-center gap-2">
                {trimColors.map((col) => {
                  const active = config.materials.trimColor === col.hex;
                  return (
                    <button
                      key={col.hex}
                      type="button"
                      onClick={() => updateMaterialField('trimColor', col.hex)}
                      className={`w-6 h-6 rounded-full border transition flex items-center justify-center cursor-pointer ${
                        active ? 'ring-2 ring-white scale-110' : 'border-slate-700'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {active && <span className="w-1 h-1 rounded-full bg-[#C29047]" />}
                    </button>
                  );
                })}
                <span className="text-[10px] text-slate-400 font-mono">
                  {trimColors.find(c => c.hex === config.materials.trimColor)?.name || 'Custom'}
                </span>
              </div>
            </div>

            {/* Piso Externo */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-[9px] font-bold text-slate-400 font-mono uppercase">
                Piso Traseiro
              </label>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { val: 'grama', label: 'Grama' },
                  { val: 'concreto', label: 'Cimento' },
                  { val: 'madeira', label: 'Deck' },
                  { val: 'pedra', label: 'Brita' }
                ].map((f) => {
                  const active = config.materials.externalFloor === f.val;
                  return (
                    <button
                      key={f.val}
                      type="button"
                      onClick={() => updateMaterialField('externalFloor', f.val)}
                      className={`py-1 rounded-lg border text-[8px] text-center cursor-pointer transition ${
                        active
                          ? 'bg-slate-200 border-slate-250 text-slate-900 font-bold'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: REVISÃO TÉCNICA */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">Passo 5 de 5</span>
              <h3 className="font-extrabold text-base text-white">Revisão do Estudo</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                As especificações do seu pré-projeto foram analisadas e estão prontas para validação técnica.
              </p>
            </div>

            {/* Resumo Card */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono pb-2 border-b border-slate-800">
                <span className="text-slate-400">ESTILO ATIVO:</span>
                <span className="text-white font-bold">{brazilianStyles.find(s => s.value === config.style)?.label || config.style}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
                <div>
                  <span className="block text-[8px] text-slate-500 uppercase">Terreno de Implantação:</span>
                  <strong>{config.lotWidth}x{config.lotLength}m ({config.lotWidth * config.lotLength}m²)</strong>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-500 uppercase">Área Construída Máx:</span>
                  <strong>{config.builtArea} m²</strong>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-500 uppercase">Dormitórios / Suítes:</span>
                  <strong>{config.bedrooms ?? 2} / {config.suites ?? 1} suítes</strong>
                </div>
                <div>
                  <span className="block text-[8px] text-slate-500 uppercase">Pavimentos / Vagas:</span>
                  <strong>{config.floors} Pav. / {config.parkingSpaces} vagas</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Viabilidade inicial aprovada Órdus</span>
              </div>
            </div>

            <p className="text-[9px] text-slate-500 leading-relaxed font-mono">
              *Seu estudo inclui modelagens Revit, CAD, planilhas orçamentárias preliminares ajustadas à taxa SINAPI local.
            </p>
          </div>
        )}

      </div>

      {/* FOOTER ACTION BUTTONS FOR STEPS */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          className={`flex items-center gap-1.5 py-2 px-3 text-xs font-bold rounded-xl transition ${
            currentStep === 1
              ? 'opacity-40 text-slate-600 border border-slate-800/40 cursor-not-allowed'
              : 'bg-slate-800 hover:bg-slate-700 text-white cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </button>

        {currentStep < 5 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
            className="flex items-center gap-1.5 py-2 px-4 bg-[#C29047] hover:bg-[#AD7E3B] text-slate-950 font-extrabold text-xs rounded-xl transition cursor-pointer"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            Pronto para Enviar!
          </div>
        )}
      </div>

    </div>
  );
}
