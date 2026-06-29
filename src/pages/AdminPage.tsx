import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, Database, ClipboardList, Calculator, Mail, Plus, Trash2, Download, AlertTriangle, FileSpreadsheet, Eye, X, Check, RefreshCw, Inbox, Box, TrendingUp
} from 'lucide-react';
import { Project, Lead } from '../types';
import { projectRepository } from '../repositories/ProjectRepository';
import { authRepository } from '../repositories/AuthRepository';
import AdminProjectForm from '../components/AdminProjectForm';

export default function AdminPage() {
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // UI state for non-native alerts & confirms
  const [visualToast, setVisualToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [visualConfirm, setVisualConfirm] = useState<{
    title: string;
    message: string;
    onAction: () => void;
  } | null>(null);

  useEffect(() => {
    setIsAdminAuth(authRepository.isAdminAuthenticated());
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const pList = await projectRepository.getProjects();
      const lList = await projectRepository.getLeads();
      setProjects(pList);
      setLeads(lList);
    } catch (e) {
      console.error('Erro ao buscar dados do painel', e);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setVisualToast({ message, type });
    setTimeout(() => {
      setVisualToast(null);
    }, 4500);
  };

  const handleStatusChange = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const leadToUpdate = leads.find((l) => l.id === leadId);
      if (!leadToUpdate) return;
      
      const updatedLead = { ...leadToUpdate, status: newStatus };
      await projectRepository.updateLead(updatedLead);
      showToast(`Status do lead alterado para "${newStatus}".`, 'success');
      await loadData();
    } catch (e) {
      showToast('Erro ao atualizar status do lead.', 'error');
    }
  };

  const getStatusBadgeClass = (status: Lead['status']) => {
    const s = status || 'Novo';
    switch (s) {
      case 'Novo':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'Em análise':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'Proposta enviada':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/60';
      case 'Aguardando cliente':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      case 'Fechado':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/60';
    }
  };

  const getLeadTypeLabel = (type: string) => {
    switch (type) {
      case 'proposta': return 'Proposta Executiva';
      case 'calculadora': return 'Simulação de Obra';
      case 'estudo_3d': return 'Estúdio 3D Órdus';
      case 'analise_tecnica': return 'Análise Técnica';
      case 'adaptacao_projeto': return 'Adaptação de Projeto';
      default: return type;
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const success = authRepository.loginAdmin(adminUsername, adminPassword);
    if (success) {
      setIsAdminAuth(true);
      showToast('Acesso administrativo autenticado.', 'success');
      loadData();
    } else {
      setLoginError('Credenciais administrativas inválidas. Verifique com a equipe de TI da Órdus.');
    }
  };

  const handleAdminLogout = () => {
    authRepository.logoutAdmin();
    setIsAdminAuth(false);
    showToast('Sessão encerrada com sucesso.', 'success');
  };

  // CRUD Projects
  const handleSaveProject = async (newProj: Project) => {
    try {
      if (editingProject) {
        await projectRepository.updateProject(newProj);
        showToast(`Projeto #${newProj.id} atualizado com sucesso no catálogo.`, 'success');
      } else {
        await projectRepository.createProject(newProj);
        showToast(`Novo projeto #${newProj.id} cadastrado com sucesso.`, 'success');
      }
      setIsFormOpen(false);
      setEditingProject(undefined);
      await loadData();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Erro ao gravar projeto.';
      showToast(errMsg, 'error');
    }
  };

  const handleDeleteProject = (id: string) => {
    setVisualConfirm({
      title: 'Remover Projeto Permanente?',
      message: `Tem certeza de que deseja remover o projeto #${id} da Órdus Engenharia permanentemente? Esta ação não pode ser desfeita.`,
      onAction: async () => {
        try {
          await projectRepository.deleteProject(id);
          showToast(`Projeto #${id} excluído com sucesso do acervo.`, 'success');
          await loadData();
        } catch (e) {
          showToast('Erro ao apagar projeto técnico.', 'error');
        }
      }
    });
  };

  // CRUD Leads list delete
  const handleDeleteLead = (id: string) => {
    setVisualConfirm({
      title: 'Excluir Registro de Lead CRM?',
      message: 'Tem certeza de que deseja excluir o histórico deste cliente em potencial? Esta ação removerá sua ficha da fila do comercial.',
      onAction: async () => {
        try {
          await projectRepository.deleteLead(id);
          showToast('Ficha de lead deletada do CRM local.', 'success');
          await loadData();
          if (selectedLead?.id === id) {
            setSelectedLead(null);
          }
        } catch (e) {
          showToast('Erro ao excluir histórico de lead.', 'error');
        }
      }
    });
  };

  // Restoration of original mock settings
  const handleResetCatalog = () => {
    setVisualConfirm({
      title: 'Restaurar Banco de Dados?',
      message: 'Isso irá redefinir o acervo de projetos e os leads fictícios do CRM da Órdus aos valores originais de fábrica do MVP, apagando suas modificações.',
      onAction: async () => {
        try {
          await projectRepository.resetData();
          showToast('Simulador redefinido aos parâmetros de fábrica com sucesso!', 'success');
          await loadData();
        } catch (err) {
          showToast('Erro ao recarregar base original.', 'error');
        }
      }
    });
  };

  // CSV Exporters
  const exportProjectsCSV = () => {
    if (projects.length === 0) return;

    const headers = [
      'ID',
      'Titulo',
      'Tipo',
      'Categoria',
      'Preco (R$)',
      'Area Construida (m2)',
      'Largura Terreno (m)',
      'Comprimento Terreno (m)',
      'Quartos',
      'Suites',
      'Banheiros',
      'Vagas Garagem',
      'Pavimentos',
      'Descricao'
    ];

    const rows = projects.map((p) => [
      p.id,
      p.title.replace(/"/g, '""'),
      p.type,
      p.category,
      p.price,
      p.builtArea,
      p.lotWidth,
      p.lotLength,
      p.bedrooms,
      p.suites,
      p.bathrooms,
      p.parkingSpaces,
      p.floors,
      p.description.replace(/"/g, '""')
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(';'), ...rows.map((r) => r.map((cell) => `"${cell}"`).join(';'))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ordus_projetos_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      'ID',
      'Nome Lead',
      'E-mail',
      'WhatsApp/Telefone',
      'Mensagem',
      'Modalidade',
      'ID Projeto Alvo',
      'Titulo Projeto Alvo',
      'Area Simulada (m2)',
      'Padrao Simulado',
      'Cidade Obra',
      'Estado Obra',
      'Data de Registro'
    ];

    const rows = leads.map((l) => [
      l.id,
      l.name.replace(/"/g, '""'),
      l.email,
      l.phone,
      l.message.replace(/"/g, '""'),
      l.type,
      l.projectId || '',
      l.projectTitle || '',
      l.calculatorDetails?.area || '',
      l.calculatorDetails?.standard || '',
      l.calculatorDetails?.city || '',
      l.calculatorDetails?.state || '',
      new Date(l.timestamp).toLocaleDateString('pt-BR')
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(';'), ...rows.map((r) => r.map((cell) => `"${cell}"`).join(';'))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ordus_crm_leads_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate deterministic next numeric code for any standard creation
  const getNextProjectCode = () => {
    const ids = projects.map((p) => {
      const parsed = parseInt(p.id.replace(/\D/g, ''), 10);
      return isNaN(parsed) ? 100 : parsed;
    });
    const maxVal = ids.length > 0 ? Math.max(...ids) : 100;
    return String(maxVal + 1);
  };

  if (!isAdminAuth) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 rounded-3xl p-8 shadow-md">
        <form onSubmit={handleAdminLogin} className="space-y-5">
          <div className="text-center space-y-1.5 animate-fade-in">
            <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-slate-200">
              <ShieldAlert className="w-6 h-6 text-[#C29047]" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Acesso Administrativo</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              Portão de auditoria e edição técnica do catálogo da Órdus Engenharia.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex gap-2 border border-red-100">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1">Usuário de Acesso</label>
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                required
                placeholder="Ex: admin"
                className="w-full px-4 py-2.5 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C29047]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-600 uppercase tracking-wider mb-1">Senha Corporativa</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
                placeholder="Ex: 123"
                className="w-full px-4 py-2.5 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#C29047]"
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-500 border border-slate-100 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#C29047] shrink-0" />
            <span>Camada restrita. Acesse utilizando a conta administrativa cadastrada no repositório de segurança Órdus.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-slate-800 shadow-sm transition cursor-pointer"
          >
            Entrar no Painel CRM
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header administrativo com Logout e Reset */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-green-100">
            Painel do Gestor Ativo
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5 font-sans">
            Controle da Órdus Engenharia
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleResetCatalog}
            title="Restaura os dados originais no localStorage"
            className="px-3.5 py-2 border border-[#C29047] hover:bg-[#FDF9F3] text-[#C29047] rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Resetar Banco de Simulação
          </button>
          
          <button
            onClick={handleAdminLogout}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 hover:text-red-600 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            Sair do Painel
          </button>
          
          <button
            onClick={() => {
              setEditingProject(undefined);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Adicionar Projeto
          </button>
        </div>
      </div>

      {/* KPIs Administrativas */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-in">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-slate-50 text-slate-800 rounded-xl border border-slate-100">
            <Database className="w-5 h-5 text-[#C29047]" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block tracking-wider">Projetos ativos</span>
            <strong className="text-xl font-bold font-mono text-slate-900">{projects.length}</strong>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50/50 text-blue-600 rounded-xl border border-blue-100/50">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block tracking-wider">Novas solicitações</span>
            <strong className="text-xl font-bold font-mono text-blue-600">
              {leads.filter((l) => !l.status || l.status === 'Novo').length}
            </strong>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50/50 text-indigo-600 rounded-xl border border-indigo-100/50">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block tracking-wider">Simulações de custo</span>
            <strong className="text-xl font-bold font-mono text-slate-900">
              {leads.filter((l) => l.type === 'calculadora' || l.type === 'simulacao_custo').length}
            </strong>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50/50 text-[#C29047] rounded-xl border-amber-100/50">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block tracking-wider">Estudos 3D enviados</span>
            <strong className="text-xl font-bold font-mono text-slate-900">
              {leads.filter((l) => l.type === 'estudo_3d').length}
            </strong>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50/50 text-emerald-600 rounded-xl border border-emerald-100/50">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block tracking-wider">Em andamento / Propostas</span>
            <strong className="text-xl font-bold font-mono text-emerald-600">
              {leads.filter((l) => l.status === 'Em análise' || l.status === 'Proposta enviada').length}
            </strong>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C29047]"></div>
        </div>
      ) : (
        /* Grid de Seções de Controle */
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* CRUD de Projetos */}
          <div className="xl:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs overflow-x-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-[#C29047]" />
                Painel de Projetos da Engenharia ({projects.length})
              </h4>
              <button
                onClick={exportProjectsCSV}
                className="flex items-center gap-1.5 text-[11px] font-bold text-[#C29047] hover:text-[#AC7A34] transition border border-slate-200 px-3 py-1.5 rounded-lg cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Exportar CSV
              </button>
            </div>

            <table className="w-full text-left text-xs text-slate-600 min-w-[600px] border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-150 text-slate-700 font-bold">
                  <th className="p-3">Código</th>
                  <th className="p-3">Projeto</th>
                  <th className="p-3">Área / Terreno</th>
                  <th className="p-3">Preço</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/50 transition font-medium">
                    <td className="p-3 font-mono font-bold text-slate-900">#{proj.id}</td>
                    <td className="p-3 max-w-[200px]">
                      <p className="font-bold text-slate-800 truncate">{proj.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono capitalize">
                        {proj.type} • {proj.category}
                      </p>
                    </td>
                    <td className="p-3 font-mono text-[10px] text-slate-600">
                      {proj.builtArea} m² • {proj.lotWidth}x{proj.lotLength}m <br />
                      🛌 {proj.bedrooms} qts • 🛁 {proj.bathrooms} bwcs
                    </td>
                    <td className="p-3 font-mono text-slate-800 text-[11px] font-bold">
                      R$ {proj.price.toLocaleString('pt-BR')}
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsFormOpen(true);
                        }}
                        className="p-1 px-2.5 rounded-md hover:bg-slate-100 text-slate-700 hover:text-slate-950 font-bold transition cursor-pointer text-[11px]"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1 px-2.5 rounded-md hover:bg-red-50 text-red-500 hover:text-red-700 font-bold transition cursor-pointer text-[11px]"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CRM Leads List layout */}
          <div className="xl:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-emerald-600" />
                Clientes & Leads ({leads.length})
              </h4>
              <button
                onClick={exportLeadsCSV}
                className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition border border-slate-200 px-3 py-1.5 rounded-lg cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Exportar CSV
              </button>
            </div>

            {leads.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">Nenhuma solicitação recebida até o momento.</p>
            ) : (
              <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                {leads.map((lead) => (
                  <div
                     key={lead.id}
                     className="border border-slate-150 p-4 rounded-2xl text-xs space-y-3 bg-slate-50/50 hover:bg-slate-50 transition relative group"
                  >
                    <div className="flex justify-between items-start gap-1">
                      <div>
                        <strong className="text-slate-800 font-extrabold text-sm block leading-tight">{lead.name}</strong>
                        <span className="inline-block mt-1 bg-slate-100 border border-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-mono">
                          {getLeadTypeLabel(lead.type)}
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono shrink-0">
                        {new Date(lead.timestamp).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <div className="font-mono text-[10px] text-slate-500 space-y-0.5 bg-white border border-slate-100 rounded-xl p-2.5">
                      <p>📞 {lead.phone}</p>
                      <p>✉️ {lead.email}</p>
                      {lead.projectId && (
                        <p className="text-slate-700 font-bold mt-1.5 block">
                          Projeto Alvo: <span className="text-[#C29047]">#{lead.projectId}</span>
                        </p>
                      )}
                      {lead.calculatorDetails && (
                        <div className="text-[9px] bg-slate-50 p-2 rounded-lg text-slate-600 mt-1.5 font-sans space-y-0.5 border border-slate-100">
                          <p><b>Simulado:</b> {lead.calculatorDetails.area}m² em {lead.calculatorDetails.city}/{lead.calculatorDetails.state}</p>
                          <p><b>Padrão:</b> {lead.calculatorDetails.standard === 'economico' ? 'Econômico' : lead.calculatorDetails.standard === 'medio' ? 'Médio' : 'Alto Luxo'}</p>
                          <p className="text-[#C29047] font-bold">R$ {lead.calculatorDetails.minCost?.toLocaleString('pt-BR')} - R$ {lead.calculatorDetails.maxCost?.toLocaleString('pt-BR')}</p>
                        </div>
                      )}
                    </div>

                    <p className="text-slate-600 text-[11px] leading-relaxed break-words bg-slate-100/40 p-2.5 rounded-xl italic border border-dashed border-slate-200">
                      "{lead.message}"
                    </p>

                    {/* Inline Status Controller */}
                    <div className="flex items-center justify-between gap-1.5 bg-white/80 p-2 rounded-xl border border-slate-200/80">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${getStatusBadgeClass(lead.status)}`}>
                          {lead.status || 'Novo'}
                        </span>
                      </div>
                      <select
                        value={lead.status || 'Novo'}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                        className="bg-white border border-slate-250 text-slate-700 text-[10px] font-bold rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#C29047] cursor-pointer"
                      >
                        <option value="Novo">Novo</option>
                        <option value="Em análise">Em análise</option>
                        <option value="Proposta enviada">Proposta enviada</option>
                        <option value="Aguardando cliente">Aguardando cliente</option>
                        <option value="Fechado">Fechado</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-1.5 pt-1.5 border-t border-slate-200/60">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-1.5 px-3 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer transition shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" /> Visualizar
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1.5 px-3 bg-red-50 text-red-700 hover:bg-red-100 border border-transparent rounded-xl text-[10px] font-bold flex items-center gap-1 cursor-pointer transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Leads Full Visualizer Modal */}
      {selectedLead && (
         <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
           <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col border border-slate-100 my-8">
             <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
               <div>
                 <h4 className="font-extrabold text-[#16222F] text-base font-sans">Ficha do Lead CRM</h4>
                 <p className="text-[10px] font-mono text-slate-400">ID: {selectedLead.id}</p>
               </div>
               <button onClick={() => setSelectedLead(null)} className="p-1 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer">
                 <X className="w-5 h-5" />
               </button>
             </div>
             <div className="p-6 space-y-4 text-xs text-slate-700">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-0.5">Cliente</p>
                   <p className="text-sm font-bold text-slate-900">{selectedLead.name}</p>
                 </div>
                 <div>
                   <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-0.5">Data de Envio</p>
                   <p className="text-slate-800 font-mono">{new Date(selectedLead.timestamp).toLocaleString('pt-BR')}</p>
                 </div>
                 <div>
                   <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-0.5">E-mail</p>
                   <p className="text-slate-800 font-mono">{selectedLead.email}</p>
                 </div>
                 <div>
                   <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-0.5">Telefone/WhatsApp</p>
                   <p className="text-slate-800 font-mono">{selectedLead.phone}</p>
                 </div>
               </div>

               {selectedLead.projectId && (
                 <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                   <p className="font-bold text-[#C29047] uppercase text-[9px] tracking-wider mb-1">Interesse em Projeto</p>
                   <p className="font-bold text-[#16222F]">Código {selectedLead.projectId} - {selectedLead.projectTitle}</p>
                 </div>
               )}

               {selectedLead.calculatorDetails && (
                 <div className="bg-[#16222F] text-white p-4 rounded-2xl space-y-2">
                   <p className="font-bold text-[#DFB277] uppercase text-[9px] tracking-wider">Cálculo de Orçamento</p>
                   <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                     <p>Área: {selectedLead.calculatorDetails.area} m²</p>
                     <p>Padrão: {selectedLead.calculatorDetails.standard}</p>
                     <p className="col-span-2">Local: {selectedLead.calculatorDetails.city} - {selectedLead.calculatorDetails.state}</p>
                     <p className="col-span-2 text-white border-t border-slate-700 pt-2 font-bold font-sans">
                       Custo Estimado: R$ {selectedLead.calculatorDetails.minCost?.toLocaleString('pt-BR')} - R$ {selectedLead.calculatorDetails.maxCost?.toLocaleString('pt-BR')}
                     </p>
                   </div>
                 </div>
               )}

               <div className="pt-2">
                 <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wider mb-1">Mensagem do Cliente</p>
                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-800 whitespace-pre-wrap leading-relaxed italic text-[11px]">
                   "{selectedLead.message}"
                 </div>
               </div>
             </div>
             <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
               <button onClick={() => setSelectedLead(null)} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer transition">
                 Fechar Detalhamento
               </button>
             </div>
           </div>
         </div>
      )}

      {/* Modal CRUD add/edit */}
      {isFormOpen && (
        <AdminProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProject(undefined);
          }}
          nextId={getNextProjectCode()}
        />
      )}

      {/* Visual Custom Toast Notification */}
      {visualToast && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce shadow-xl flex items-center gap-3 bg-slate-900 text-white border border-slate-800 rounded-2xl px-5 py-4 max-w-sm">
          <div className={`p-1.5 rounded-full ${visualToast.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {visualToast.type === 'success' ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div className="text-xs font-semibold leading-normal">{visualToast.message}</div>
          <button onClick={() => setVisualToast(null)} className="text-slate-450 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Custom Graphic Prompt Dialog for confirmations */}
      {visualConfirm && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl max-w-md w-full text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto mb-1 border border-red-100">
              <AlertTriangle className="w-6 h-6 text-[#C29047]" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-extrabold text-[#16222F] text-base">{visualConfirm.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed px-2">
                {visualConfirm.message}
              </p>
            </div>

            <div className="flex gap-2 pt-2 justify-center">
              <button
                type="button"
                onClick={() => setVisualConfirm(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  const cb = visualConfirm.onAction;
                  setVisualConfirm(null);
                  cb();
                }}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
