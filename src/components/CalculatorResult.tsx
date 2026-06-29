import React from 'react';
import { Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { calculateBuildCost } from '../data';

interface CalculatorResultProps {
  area: number;
  standard: 'economico' | 'medio' | 'alto_luxo';
  state: string;
  onLeadSubmit: (data: { name: string; email: string; phone: string; message: string }) => void;
  submitting: boolean;
  success: boolean;
}

export default function CalculatorResult({
  area,
  standard,
  state,
  onLeadSubmit,
  submitting,
  success,
}: CalculatorResultProps) {
  const result = calculateBuildCost(area, standard, state);
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', message: '' });
  const [errorMsg, setErrorMsg] = React.useState('');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrorMsg('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const message = `Simulação de Obra realizada:\nÁrea: ${area}m²\nPadrão: ${result.standardLabel}\nEstado: ${state}\nCusto Estimado: de ${formatCurrency(result.minCost)} a ${formatCurrency(result.maxCost)}\n\n${formData.message}`;
    onLeadSubmit({
      ...formData,
      message,
    });
  };

  // Estimativas de frações financeiras da obra
  const breakdown = [
    { name: 'Fundações & Estrutura', percentage: 22, color: 'bg-emerald-600' },
    { name: 'Alvenaria & Vedações', percentage: 18, color: 'bg-amber-500' },
    { name: 'Instalações (Elétrica/Hidráulica)', percentage: 15, color: 'bg-blue-500' },
    { name: 'Revestimentos & Acabamento', percentage: 35, color: 'bg-violet-500' },
    { name: 'Projetos, Taxas & Legalização', percentage: 10, color: 'bg-slate-500' },
  ];

  return (
    <div id="calculator-result-view" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8 animate-fade-in mt-6 w-full max-w-full min-w-0">
      {/* Resultados e custos */}
      <div id="calculator-results-summary" className="space-y-6 w-full min-w-0">
        <div className="bg-slate-900 text-white p-5 sm:p-8 rounded-2xl shadow-xl space-y-4 max-w-full overflow-hidden min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full uppercase font-mono tracking-wider">
              {result.standardLabel}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              CUB Base: {formatCurrency(result.rateUsed)} / m²
            </span>
          </div>

          <div className="space-y-3 min-w-0">
            <p className="text-slate-400 text-sm font-medium">Investimento Estimado Global da Obra</p>
            
            {/* Valor Mínimo */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span className="text-slate-400 text-[10px] font-mono uppercase tracking-wider block sm:hidden">Investimento Mínimo:</span>
              <span className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-white break-words">
                {formatCurrency(result.minCost)}
              </span>
              <span className="text-slate-400 text-xs italic hidden sm:inline">(estimado mínimo)</span>
            </div>

            {/* Divisor "até" */}
            <div className="flex items-center gap-2 text-slate-500 font-mono text-xs">
              <div className="h-px bg-slate-800 flex-1"></div>
              <span className="uppercase tracking-wider font-bold">Até</span>
              <div className="h-px bg-slate-800 flex-1"></div>
            </div>

            {/* Valor Máximo */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span className="text-slate-400 text-[10px] font-mono uppercase tracking-wider block sm:hidden">Investimento Máximo:</span>
              <span className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-emerald-400 break-words">
                {formatCurrency(result.maxCost)}
              </span>
              <span className="text-emerald-500/80 text-xs italic hidden sm:inline">(estimado máximo)</span>
            </div>

            <p className="text-xs text-slate-400 pt-1 leading-relaxed border-t border-slate-800/80 mt-2">
              *A estimativa inclui custos de materiais, as fundações básicas padrão, mão de obra regionalizada do CUB e acabamentos previstos no pacote {result.standardLabel}. Valores variam de acordo com a topografia do terreno e taxas municipais específicas.
            </p>
          </div>

          <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-sm font-mono text-slate-300">
            <span>Área do Projeto:</span>
            <span className="font-semibold text-white">{area} m²</span>
          </div>
          <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-sm font-mono text-slate-300">
            <span>Localização da Simulação:</span>
            <span className="font-semibold text-white">{state}</span>
          </div>
        </div>

        {/* Breakdown de custos */}
        <div id="calculator-breakdown-card" className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 w-full min-w-0">
          <h4 className="font-semibold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Landmark className="w-5 h-5 text-slate-700" />
            Distribuição Estimada de Recursos
          </h4>
          <div className="space-y-4">
            {breakdown.map((item, idx) => {
              const itemMin = Math.round((result.minCost * item.percentage) / 100);
              const itemMax = Math.round((result.maxCost * item.percentage) / 100);

              return (
                <div key={idx} className="space-y-1.5 min-w-0">
                  <div className="flex flex-col sm:flex-col lg:flex-col xl:flex-row xl:justify-between xl:items-baseline gap-1 xl:gap-2 text-xs text-slate-700 font-medium min-w-0 font-sans">
                    <span className="font-semibold text-slate-800 break-words">{item.name}</span>
                    <span className="font-mono text-slate-500 text-[10px] sm:text-xs break-words">
                      {item.percentage}% • {formatCurrency(itemMin)} a {formatCurrency(itemMax)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Formulário de leads */}
      <div id="calculator-lead-form-container" className="w-full min-w-0">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm sticky top-4 w-full min-w-0">
          {success ? (
            <div id="calculator-success-message" className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">Solicitação Enviada!</h4>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Seus dados foram encaminhados com sucesso para os engenheiros da <b>Órdus Engenharia</b>. Nossa equipe entrará em contato via WhatsApp ou e-mail com a validação completa do seu orçamento.
              </p>
            </div>
          ) : (
            <form id="calculator-lead-form" onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-bold text-slate-900 text-lg">Transforme em Realidade</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Preencha os dados abaixo para receber um orçamento detalhado com cronograma de obra, planta baixa customizada e indicação de construtores parceiros na sua região.
              </p>

              {errorMsg && (
                <div id="calculator-form-error" className="p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-100 font-semibold animate-fade-in shadow-xs">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Carlos Albuquerque"
                  className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail para Orçamento *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: c.albuquerque@email.com"
                  className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Telefone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: (11) 99999-9999"
                  className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Observações Adicionais (Opcional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Diga se possui declive no lote, interesse em piscina, etc."
                  rows={2}
                  className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-2 bg-slate-900 text-white font-semibold text-xs sm:text-sm rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55 break-words whitespace-normal normal-case"
              >
                <span>{submitting ? 'Enviando simulação...' : 'Solicitar Análise de Especialista'}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
