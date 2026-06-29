import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { Lead, BuildStandard } from '../types';
import { projectRepository } from '../repositories/ProjectRepository';
import { BRAZIL_STATES, calculateBuildCost } from '../data';
import CalculatorResult from '../components/CalculatorResult';

export default function CalculatorPage() {
  const location = useLocation();
  const stateData = location.state as { area?: number; standard?: BuildStandard } | null;

  // Defaults or pre-filled values
  const [calcArea, setCalcArea] = useState<number>(120);
  const [calcStandard, setCalcStandard] = useState<BuildStandard>('medio');
  const [calcState, setCalcState] = useState<string>('SP');
  const [calcCity, setCalcCity] = useState<string>('São Paulo');

  // Lead Submission
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  useEffect(() => {
    if (stateData) {
      if (stateData.area) setCalcArea(stateData.area);
      if (stateData.standard) setCalcStandard(stateData.standard);
    }
  }, [stateData]);

  const handleLeadSubmit = async (leadData: { name: string; email: string; phone: string; message: string }) => {
    setLeadSubmitting(true);
    try {
      const costResult = calculateBuildCost(calcArea, calcStandard, calcState);

      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        message: leadData.message,
        type: 'calculadora',
        timestamp: new Date().toISOString(),
        calculatorDetails: {
          area: calcArea,
          standard: calcStandard,
          state: calcState,
          city: calcCity,
          minCost: costResult.minCost,
          maxCost: costResult.maxCost,
        }
      };

      await projectRepository.createLead(newLead);
      setLeadSuccess(true);
    } catch (e) {
      console.error("Erro ao processar asilo de simulação", e);
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in mt-2">
      {/* Header explicativo */}
      <div id="calculator-intro" className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Calculator className="w-6 h-6 text-[#C29047]" />
          Simulador Inteligente de Custo de Obra
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Nossa ferramenta estima os gastos globais de construção baseando-se no CUB (Custo Unitário Básico) de 2026 por estado brasileiro, com acréscimos parametrizados para contingências e infraestrutura sob o selo de precisão da <b>Órdus Engenharia</b>.
        </p>
      </div>

      {/* Grid da Calculadora */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-8 shadow-xs min-w-0 w-full overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Lado Esquerdo: Variáveis de Input */}
          <div className="xl:col-span-5 space-y-6 xl:border-r border-slate-100 pr-0 xl:pr-8 w-full min-w-0">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
              Configurações da Obra
            </h3>

            {/* Slider de Área */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold text-slate-700">Área Desejada da Obra</label>
                <span className="text-lg font-extrabold text-slate-900 font-mono">{calcArea} m²</span>
              </div>
              <input
                type="range"
                min={40}
                max={400}
                step={5}
                value={calcArea}
                onChange={(e) => {
                  setCalcArea(Number(e.target.value));
                  setLeadSuccess(false); // reset lead status on modification
                }}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#C29047]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>40 m²</span>
                <span>220 m²</span>
                <span>400 m²</span>
              </div>
            </div>

            {/* Seleção do Padrão de Acabamento */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Padrão de Acabamento</label>
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 gap-2.5">
                {([
                  { id: 'economico', label: 'Econômico (CUB Básico)', desc: 'Revestimentos clássicos, pintura simples e portas leves.' },
                  { id: 'medio', label: 'Médio Padrão (Recomendado)', desc: 'Suítes iluminadas, porcelanato, gesso rebaixado e aberturas de alumínio.' },
                  { id: 'alto_luxo', label: 'Alto Luxo', desc: 'Mármores importados, fechaduras digitais, automação e grandes panos de vidro.' }
                ] as { id: BuildStandard; label: string; desc: string }[]).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCalcStandard(item.id);
                      setLeadSuccess(false);
                    }}
                    className={`p-3 rounded-xl text-left border text-xs transition duration-200 cursor-pointer flex flex-col justify-between ${
                      calcStandard === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div>
                      <span className="font-bold block text-sm mb-0.5">{item.label}</span>
                      <span className={`text-[11px] block leading-relaxed ${calcStandard === item.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cidade e UF */}
            <div className="grid grid-cols-2 gap-3 pb-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">Estado (UF)</label>
                <select
                  value={calcState}
                  onChange={(e) => {
                    setCalcState(e.target.value);
                    setLeadSuccess(false);
                  }}
                  className="w-full px-3 py-2 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#C29047]"
                >
                  {BRAZIL_STATES.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">Cidade da Obra</label>
                <input
                  type="text"
                  value={calcCity}
                  onChange={(e) => {
                    setCalcCity(e.target.value);
                    setLeadSuccess(false);
                  }}
                  placeholder="Ex: São Paulo"
                  className="w-full px-3 py-2 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#C29047]"
                />
              </div>
            </div>
          </div>

          {/* Lado Direito: Resultados e Leads */}
          <div className="xl:col-span-7 w-full min-w-0">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-4">
              Estimativa de Investimento
            </h3>
            
            <CalculatorResult
              area={calcArea}
              standard={calcStandard}
              state={calcState}
              submitting={leadSubmitting}
              success={leadSuccess}
              onLeadSubmit={handleLeadSubmit}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
