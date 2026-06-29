import React from 'react';
import { Mail, Phone, User, Send, CheckCircle2 } from 'lucide-react';

interface LeadFormProps {
  projectTitle?: string;
  projectId?: string;
  price?: number;
  initialType?: 'analise_tecnica' | 'adaptacao_projeto' | 'simulacao_custo' | 'estudo_3d' | 'proposta';
  onLeadSubmit: (data: { name: string; email: string; phone: string; message: string; type: string }) => void;
  submitting: boolean;
  success: boolean;
}

export default function LeadForm({
  projectTitle,
  projectId,
  price,
  initialType = 'proposta',
  onLeadSubmit,
  submitting,
  success,
}: LeadFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: initialType,
  });
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  React.useEffect(() => {
    if (initialType) {
      setFormData(prev => ({ ...prev, type: initialType }));
    }
  }, [initialType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Por favor, preencha os campos obrigatórios (*).');
      return;
    }

    const typeLabels: Record<string, string> = {
      analise_tecnica: 'Análise Técnica',
      adaptacao_projeto: 'Adaptação de Projeto',
      simulacao_custo: 'Simulação de Custo',
      estudo_3d: 'Estudo 3D',
      proposta: 'Proposta Geral',
    };

    const finalMsg = `Gostaria de solicitar ${typeLabels[formData.type] || formData.type} para o projeto [${projectId}] ${projectTitle}.\nPreço anunciado do pacote: R$ ${price}\n\nMensagem do cliente: ${formData.message}`;
    
    onLeadSubmit({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: finalMsg,
      type: formData.type,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setErrorMsg('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
      <div id="lead-success-screen" className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 text-center space-y-4 animate-fade-in">
        <div id="success-icon-badge" className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 id="success-title" className="font-bold text-slate-900 text-base font-sans">Solicitação Enviada!</h4>
          <p id="success-desc" className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto font-sans">
            Registramos sua solicitação com sucesso para o estudo <b>{projectTitle}</b>. O plantão técnico de engenharia analisará as informações e entrará em contato em breve!
          </p>
        </div>
      </div>
    );
  }

  return (
    <form id="project-lead-form" onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 animate-fade-in">
      <div className="space-y-1">
        <h4 id="form-header-title" className="font-bold text-slate-800 text-base font-sans">Registrar Solicitação</h4>
        <p id="form-header-desc" className="text-xs text-slate-500">
          Envie parâmetros e entre em contato direto com os engenheiros da Órdus Engenharia.
        </p>
      </div>

      {errorMsg && (
        <div id="lead-form-error" className="p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-100 animate-fade-in font-semibold">
          {errorMsg}
        </div>
      )}

      <div className="space-y-3">
        {/* Tipo de Solicitação Select */}
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase">
            Objetivo da Solicitação
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-200 text-slate-800 bg-white rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-slate-950"
          >
            <option value="analise_tecnica">Solicitar Análise Técnica</option>
            <option value="adaptacao_projeto">Pedir Adaptação de Projeto</option>
            <option value="simulacao_custo">Simular Custo de Obra</option>
            <option value="estudo_3d">Estudo 3D Integrado</option>
            <option value="proposta">Proposta Comercial Geral</option>
          </select>
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
            <User className="w-4 h-4" />
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Nome Completo *"
            className="w-full pl-10 pr-4 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
          />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
            <Mail className="w-4 h-4" />
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="E-mail *"
            className="w-full pl-10 pr-4 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
          />
        </div>

        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
            <Phone className="w-4 h-4" />
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="WhatsApp / Telefone *"
            className="w-full pl-10 pr-4 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
          />
        </div>

        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Gostaria de espelhar o projeto, ajustar fundações para o terreno ou mudar ambientes? Escreva suas instruções aqui."
            rows={3}
            className="w-full px-4 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 bg-slate-900 text-white font-medium text-sm rounded-xl hover:bg-slate-800 hover:shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
      >
        <Send className="w-4 h-4" />
        {submitting ? 'Enviando...' : 'Confirmar Solicitação'}
      </button>

      <span className="block text-[10px] text-center text-slate-400">
        Respeitamos a LGPD. Seus dados cadastrais estão 100% seguros conosco.
      </span>
    </form>
  );
}
