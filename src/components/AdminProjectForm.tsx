import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Project, ProjectType, ProjectCategory } from '../types';

interface AdminProjectFormProps {
  project?: Project; // Se fornecido, estamos editando
  onSave: (p: Project) => void;
  onClose: () => void;
  nextId: string;
}

export default function AdminProjectForm({ project, onSave, onClose, nextId }: AdminProjectFormProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState<Project>({
    id: project?.id || nextId,
    title: project?.title || '',
    type: project?.type || 'terrea',
    category: project?.category || 'residencial',
    price: project?.price || 2500,
    builtArea: project?.builtArea || 120,
    lotWidth: project?.lotWidth || 10,
    lotLength: project?.lotLength || 25,
    bedrooms: project?.bedrooms || 3,
    suites: project?.suites || 1,
    bathrooms: project?.bathrooms || 2,
    parkingSpaces: project?.parkingSpaces || 2,
    floors: project?.floors || 1,
    description: project?.description || '',
    roomsList: project?.roomsList || [
      'Varanda espaçosa',
      'Sala de estar integrada',
      'Cozinha com despensa',
      'Suíte principal',
      'Banheiro social',
    ],
    included: project?.included || [
      'Projeto Arquitetônico estrutural',
      'Modelagem 3D colorida',
      'Quantitativo de materiais',
    ],
    images: project?.images || [],
    tags: project?.tags || [],
  });

  // Campos temporários para inserção separada por vírgula no forms
  const [roomsInput, setRoomsInput] = useState(formData.roomsList.join(', '));
  const [includedInput, setIncludedInput] = useState(formData.included.join(', '));
  const [imagesInput, setImagesInput] = useState(
    formData.images.length > 0
      ? formData.images.join(', ')
      : ''
  );
  const [tagsInput, setTagsInput] = useState(formData.tags.join(', '));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setErrorMsg('');
    const { name, value } = e.target;
    const isNum = [
      'price',
      'builtArea',
      'lotWidth',
      'lotLength',
      'bedrooms',
      'suites',
      'bathrooms',
      'parkingSpaces',
      'floors',
    ].includes(name);

    setFormData((prev) => ({
      ...prev,
      [name]: isNum ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.title || !formData.id) {
      setErrorMsg('Identificação (ID) e Título do Projeto são obrigatórios.');
      return;
    }

    // Processar inputs de strings concatenadas em listas
    const roomsList = roomsInput
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');
    const included = includedInput
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');
    const tags = tagsInput
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    // Gerar imagens se não forem fornecidas
    let finalImages = imagesInput
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    if (finalImages.length === 0) {
      // Usar mock padrão Unsplash baseado no tipo
      const sampleMap: Record<ProjectType, string[]> = {
        sobrado: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c"],
        terrea: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914"],
        campo: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739"],
        madeira: ["https://images.unsplash.com/photo-1549692520-acc6669e2f0c"],
        geminada: ["https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb"],
        esquina: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"],
        comercial: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"],
        edificio: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"],
        chale: ["https://images.unsplash.com/photo-1508333706533-1ec43ecb1606"],
      };
      finalImages = sampleMap[formData.type] || sampleMap.terrea;
    }

    onSave({
      ...formData,
      roomsList,
      included,
      tags,
      images: finalImages,
    });
  };

  const typesList: { value: ProjectType; label: string }[] = [
    { value: 'terrea', label: 'Casa Térrea' },
    { value: 'sobrado', label: 'Sobrado' },
    { value: 'campo', label: 'Casa de Campo' },
    { value: 'madeira', label: 'Casa de Madeira' },
    { value: 'geminada', label: 'Casa Geminada' },
    { value: 'esquina', label: 'Casa de Esquina' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'edificio', label: 'Edifício Residencial' },
    { value: 'chale', label: 'Chalé/Cabana' },
  ];

  return (
    <div id="admin-dialog-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div id="admin-form-container" className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in border border-slate-100">
        <div id="admin-form-header" className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              {project ? `Editar Projeto #${project.id}` : 'Adicionar Novo Projeto ao Catálogo'}
            </h3>
            <p className="text-xs text-slate-500">
              Formulário de especificação técnica. Os campos alimentam o buscador e os cálculos de simulação.
            </p>
          </div>
          <button
            id="close-dialog-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="admin-crud-form" onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {errorMsg && (
            <div id="admin-form-error" className="p-3.5 bg-red-50 text-red-600 rounded-xl text-xs border border-red-100 font-semibold animate-fade-in shadow-xs">
              {errorMsg}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* ID e Título */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Código do Projeto (ID) *</label>
              <input
                type="text"
                name="id"
                disabled={!!project}
                value={formData.id}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:bg-slate-100"
              />
            </div>

            <div className="md:col-span-6 space-y-1">
              <label className="text-xs font-bold text-slate-700">Título Público Completo *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Preço do Pacote (R$)*</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min={1}
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              />
            </div>

            {/* Categorias e Tipos */}
            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">Categoria Geral</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none"
              >
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">Tipo de Construção</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none"
              >
                {typesList.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">Pavimentos (Andares)</label>
              <input
                type="number"
                name="floors"
                value={formData.floors}
                onChange={handleChange}
                min={1}
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              />
            </div>

            {/* Dimensões */}
            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">Área Construída (m²)</label>
              <input
                type="number"
                name="builtArea"
                value={formData.builtArea}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              />
            </div>

            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">Largura do Terreno (m)</label>
              <input
                type="number"
                name="lotWidth"
                value={formData.lotWidth}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              />
            </div>

            <div className="md:col-span-4 space-y-1">
              <label className="text-xs font-bold text-slate-700">Comprimento do Terreno (m)</label>
              <input
                type="number"
                name="lotLength"
                value={formData.lotLength}
                onChange={handleChange}
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              />
            </div>

            {/* Detalhes de Cômodos */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Quartos Totais</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min={0}
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Suítes</label>
              <input
                type="number"
                name="suites"
                value={formData.suites}
                onChange={handleChange}
                min={0}
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Banheiros</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min={1}
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm"
              />
            </div>

            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Vagas de Garagem</label>
              <input
                type="number"
                name="parkingSpaces"
                value={formData.parkingSpaces}
                onChange={handleChange}
                min={0}
                className="w-full px-3.5 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm"
              />
            </div>

            {/* Descrição */}
            <div className="md:col-span-12 space-y-1">
              <label className="text-xs font-bold text-slate-700">Descrição Pública do Projeto</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Discorra de forma detalhada o design e vantagens deste projeto..."
                className="w-full px-4 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none resize-none"
              />
            </div>

            {/* Imagens */}
            <div className="md:col-span-12 space-y-1">
              <label className="text-xs font-bold text-slate-700">Lista de Imagens (URLs separadas por vírgula)</label>
              <input
                type="text"
                value={imagesInput}
                onChange={(e) => setImagesInput(e.target.value)}
                placeholder="Ex primeiralink.com/img1.jpg, segundolink.com/img2.jpg"
                className="w-full px-4 py-2 border border-slate-200 text-slate-800 rounded-xl text-sm focus:outline-none"
              />
              <span className="block text-[10px] text-slate-400">
                Se deixar em branco, o sistema associará imagens de arquitetura autoral Unsplash compatíveis com o tipo de projeto.
              </span>
            </div>

            {/* Ambientes inclusos, itens inclusos e tags */}
            <div className="md:col-span-6 space-y-1">
              <label className="text-xs font-bold text-slate-700">Lista de Ambientes (Separados por vírgula)</label>
              <textarea
                value={roomsInput}
                onChange={(e) => setRoomsInput(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none resize-none"
              />
            </div>

            <div className="md:col-span-6 space-y-1">
              <label className="text-xs font-bold text-slate-700">Itens Inclusos no Pacote (Separados por vírgula)</label>
              <textarea
                value={includedInput}
                onChange={(e) => setIncludedInput(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none resize-none"
              />
            </div>

            <div className="md:col-span-12 space-y-1">
              <label className="text-xs font-bold text-slate-700">Tags do Projeto (Separadas por vírgula)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Ex Moderno, Alto Padrão, Compacto, Piscina"
                className="w-full px-4 py-2 border border-slate-200 text-slate-800 rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Rodapé do Form */}
          <div className="flex justify-end gap-3 border-t border-slate-150 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-200 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-slate-800 shadow-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Salvar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
