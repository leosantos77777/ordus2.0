import { Project, ProjectType, ProjectCategory, ProjectFilters, SortOption, BuildStandard } from './types';

// Projetos fornecidos na especificação
const baseProjects = [
  { id: "104", title: "Casa Sobrado - 104", type: "sobrado" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "155", title: "Casa Terrea - 155", type: "terrea" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "213", title: "Casa Sobrado - 213", type: "sobrado" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "257", title: "Casa de Esquina - 257", type: "esquina" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "265", title: "Casa Geminada - 265", type: "geminada" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "272", title: "Casa Sobrado - 272", type: "sobrado" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "407", title: "Casa Sobrado - 407", type: "sobrado" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "408", title: "Casa Terrea - 408", type: "terrea" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "411", title: "Casa Geminada - 411", type: "geminada" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "413", title: "Casa Sobrado - 413", type: "sobrado" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "416", title: "Casa Terrea - 416", type: "terrea" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "446", title: "Casa Terrea - 446", type: "terrea" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "518", title: "Cabanas e Chales - 518", type: "chale" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "666", title: "Casa de Madeira - 666", type: "madeira" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "677", title: "Casa de Esquina - 677", type: "esquina" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "684", title: "Casa Sobrado - 684", type: "sobrado" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "690", title: "Casa Terrea - 690", type: "terrea" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "693", title: "Casa Terrea - 693", type: "terrea" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "698", title: "Casa Sobrado - 698", type: "sobrado" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "706", title: "Casa Terrea - 706", type: "terrea" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "711", title: "Casa de Madeira - 711", type: "madeira" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "717", title: "Casa de Madeira - 717", type: "madeira" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "719", title: "Casa de Campo - 719", type: "campo" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "729", title: "Casa Terrea - 729", type: "terrea" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "730", title: "Casa de Campo - 730", type: "campo" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "P-945", title: "Casa Sobrado - P-945", type: "sobrado" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "P-1373", title: "Casa de Esquina - P-1373", type: "esquina" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "P-1412", title: "Casa de Campo - P-1412", type: "campo" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "P-1671", title: "Casa Terrea - P-1671", type: "terrea" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "P-1825", title: "Casa de Campo - P-1825", type: "campo" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "C-103", title: "Empreendimento Comercial - C-103", type: "comercial" as ProjectType, category: "comercial" as ProjectCategory },
  { id: "C-105", title: "Empreendimento Comercial - C-105", type: "comercial" as ProjectType, category: "comercial" as ProjectCategory },
  { id: "C-113", title: "Edificio Residencial - C-113", type: "edificio" as ProjectType, category: "residencial" as ProjectCategory },
  { id: "C-118", title: "Empreendimento Comercial - C-118", type: "comercial" as ProjectType, category: "comercial" as ProjectCategory }
];

// Mapeamento de imagens reais de arquitetura do Unsplash por tipo pra ficar lindo
const imageMap: Record<ProjectType, string[]> = {
  sobrado: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
  ],
  terrea: [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227"
  ],
  campo: [
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    "https://images.unsplash.com/photo-1464146072230-91cabc968266",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  ],
  madeira: [
    "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f"
  ],
  geminada: [
    "https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
  ],
  esquina: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
  ],
  comercial: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    "https://images.unsplash.com/photo-1497366216548-37526070297c",
    "https://images.unsplash.com/photo-1606857521015-7f9fcf423740"
  ],
  edificio: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    "https://images.unsplash.com/photo-1428360989987-9148b30ef3a9"
  ],
  chale: [
    "https://images.unsplash.com/photo-1508333706533-1ec43ecb1606",
    "https://images.unsplash.com/photo-1583198604768-e5e6b45e7e1e",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
  ]
};

// Itens inclusos padrão
const baseIncluded = [
  "Projeto Arquitetônico Completo (Plantas, Cortes, Fachadas)",
  "Projeto Estrutural (Fundações, Vigas, Pilares e Lajes)",
  "Projeto Hidrossanitário (Redes de Água Fria, Quente, Esgoto e Pluvial)",
  "Projeto Elétrico (Disposição de Tomadas, Iluminação e Quadro de Cargas)",
  "Imagens 3D fotorrealistas em alta resolução",
  "Lista quantitativa de materiais de construção",
  "Manual de instruções para execução da obra"
];

// Ambientes sugeridos baseados no tipo de projeto
function getRoomsForType(type: ProjectType, bedrooms: number, suites: number): string[] {
  const list = ["Varanda", "Cozinha Americana", "Área de Serviço Integrada"];
  if (bedrooms > 0) {
    if (suites > 0) {
      list.push(`${suites} Suíte(s) espaçosa(s) com closet`);
    }
    const regularBeds = bedrooms - suites;
    if (regularBeds > 0) {
      list.push(`${regularBeds} Quarto(s) social(is) multifuncional`);
    }
  }
  list.push("Sala de Estar ampliada");
  list.push("Sala de Jantar integrada");
  list.push("Banheiro Social completo");
  
  if (type === 'sobrado' || type === 'edificio') {
    list.push("Escada moderna com depósito integrado");
    list.push("Lavabo no pavimento térreo");
  }
  if (type === 'campo' || type === 'chale') {
    list.push("Espaço para Lareira ou Fogão a Lenha");
    list.push("Amplo Deck de madeira integrado");
  }
  if (type === 'comercial') {
    return [
      "Recepção elegante com lavabo",
      "Sala de reuniões privativa",
      "Estações de trabalho em conceito aberto",
      "Copa para colaboradores",
      "Dois banheiros adaptados (PCD)",
      "Depósito de materiais"
    ];
  }
  
  list.push("Espaço Gourmet externo opcional");
  return list;
}

// Geração determinista de dados realista baseada na ID do projeto
export function generateProjectFromBase(base: typeof baseProjects[number], index: number): Project {
  // Criar valores deterministas usando o index e o id numérico básico
  const cleanId = base.id.replace(/\D/g, '');
  const idValue = cleanId ? parseInt(cleanId, 10) : index * 10 + 7;
  
  // Detalhes de áreas e dimensões para fazer fit coerente
  let builtArea = 50 + (idValue % 18) * 15; // 50m² a 320m²
  let lotWidthValue = 6 + (idValue % 12); // m
  let lotLengthValue = 15 + (idValue % 20); // m
  
  if (base.type === 'sobrado') {
    builtArea = 120 + (idValue % 15) * 12; // 120-300m²
    lotWidthValue = 8 + (idValue % 8);
    lotLengthValue = 20 + (idValue % 15);
  } else if (base.type === 'campo' || base.type === 'madeira') {
    builtArea = 70 + (idValue % 12) * 12; // 70-214m²
    lotWidthValue = 12 + (idValue % 9);
    lotLengthValue = 25 + (idValue % 16);
  } else if (base.type === 'chale') {
    builtArea = 45 + (idValue % 10) * 8; // 45-125m²
    lotWidthValue = 10 + (idValue % 6);
    lotLengthValue = 15 + (idValue % 10);
  } else if (base.type === 'comercial') {
    builtArea = 90 + (idValue % 20) * 10; // 90-290m²
    lotWidthValue = 10 + (idValue % 11);
    lotLengthValue = 20 + (idValue % 15);
  } else if (base.type === 'edificio') {
    builtArea = 200 + (idValue % 10) * 15; // 200-350m²
    lotWidthValue = 15 + (idValue % 6);
    lotLengthValue = 30 + (idValue % 10);
  }

  // Preço coerente: m² x complexidade do projeto
  // Preço entre R$ 1.200 e R$ 6.500
  let priceBase = 1200 + (builtArea * 12) + (idValue % 20) * 50;
  if (base.type === 'sobrado') priceBase += 800;
  if (base.type === 'edificio') priceBase += 1500;
  const price = Math.round(Math.min(6500, Math.max(1200, priceBase)));

  // Quartos, Banheiros e vagas
  const bedrooms = base.type === 'comercial' ? 0 : Math.max(1, Math.min(5, 1 + (idValue % 4)));
  const suites = bedrooms === 0 ? 0 : Math.max(0, Math.min(bedrooms, (idValue % 3)));
  const bathrooms = base.type === 'comercial' ? 2 : Math.max(1, Math.min(6, suites + 1 + (idValue % 2)));
  const parkingSpaces = Math.max(0, Math.min(4, idValue % 3 + (builtArea > 150 ? 1 : 0)));
  
  let floors = 1;
  if (base.type === 'sobrado') floors = 2;
  if (base.type === 'edificio') floors = 3 + (idValue % 3); // 3 a 5 pavimentos

  // Descrição
  const descriptionTypeMap: Record<ProjectType, string> = {
    terrea: "Uma casa térrea maravilhosa ideal para quem busca acessibilidade, estilo moderno e máximo aproveitamento do terreno com ambientes integrados.",
    sobrado: "Um sobrado sofisticado que distribui as áreas sociais no pavimento inferior e a privacidade dos quartos no superior, ideal para otimizar terrenos urbanos.",
    campo: "O projeto ideal para relaxar. Conta com grandes janelas de vidro, pé-direito duplo opcional e integração perfeita com a natureza.",
    madeira: "Charmoso e aconchegante, este projeto de madeira e alvenaria foca na sustentabilidade térmica e no acolhimento residencial contemporâneo.",
    geminada: "Perfeita para investidores ou famílias próximas, com aproveitamento inteligente do espaço urbano focado no custo-benefício e modernidade.",
    esquina: "Projetada especialmente para terrenos de esquina, valorizando duas fachadas imponentes com alta captação de iluminação natural.",
    comercial: "Edificação comercial moderna e arrojada, perfeita para escritórios corporativos, clínicas ou comércios de rua de alto padrão.",
    edificio: "Arquitetura inteligente sob medida para pequenos condomínios verticais residenciais, unindo eficiência estrutural e lazer integrado.",
    chale: "Um autêntico chalé com estrutura inovadora e telhado imponente. Ótimo para sítios, fins de semana rústicos e Airbnb de alta rentabilidade."
  };

  const typeDesc = descriptionTypeMap[base.type] || "Design arquitetônico contemporâneo com excelente iluminação e ventilação cruzada.";
  const description = `${base.title} é um projeto autoral exclusivo desenvolvido com as melhores técnicas de engenharia e foco em eficiência e economia de obra. ${typeDesc} Oferece ambientes integrados que ampliam a percepção espacial e garantem conforto para o dia a dia.`;

  // Imagens
  const typeImages = imageMap[base.type] || imageMap.terrea;
  // Modificar a URL de cada foto adicionando assinatura única para variar a foto final
  const images = typeImages.map((url, i) => `${url}?auto=format&fit=crop&w=1200&q=80&sig=${idValue}-${i}`);

  const tags = [base.type, base.category, builtArea > 150 ? "Espaçoso" : "Compacto", price < 2500 ? "Econômico" : "Premium"];

  const estimatedConstructionCost = Math.round(builtArea * (price > 4000 ? 4500 : price > 2500 ? 3400 : 2600));

  return {
    id: base.id,
    title: base.title,
    type: base.type,
    category: base.category,
    price,
    estimatedConstructionCost,
    builtArea,
    lotWidth: lotWidthValue,
    lotLength: lotLengthValue,
    bedrooms,
    suites,
    bathrooms,
    parkingSpaces,
    floors,
    description,
    roomsList: getRoomsForType(base.type, bedrooms, suites),
    included: [...baseIncluded],
    images,
    tags
  };
}

// Filtra projetos com base nas configurações técnicas selecionadas
export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  return projects.filter(p => {
    // Busca por id ou título
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const codeMatch = p.id.toLowerCase().includes(query);
      const titleMatch = p.title.toLowerCase().includes(query);
      const tagsMatch = p.tags.some(t => t.toLowerCase().includes(query));
      if (!codeMatch && !titleMatch && !tagsMatch) return false;
    }

    // Categoria
    if (filters.category !== 'all' && p.category !== filters.category) {
      return false;
    }

    // Tipo de projeto
    if (filters.type !== 'all' && p.type !== filters.type) {
      return false;
    }

    // Largura do terreno ideal
    if (filters.minWidth && p.lotWidth < filters.minWidth) return false;
    if (filters.maxWidth && p.lotWidth > filters.maxWidth) return false;

    // Comprimento do terreno de teste
    if (filters.minLength && p.lotLength < filters.minLength) return false;
    if (filters.maxLength && p.lotLength > filters.maxLength) return false;

    // Área construída
    if (filters.minArea && p.builtArea < filters.minArea) return false;
    if (filters.maxArea && p.builtArea > filters.maxArea) return false;

    // Banheiros, suites, quartos, vagas
    if (filters.bedrooms !== 'all' && p.bedrooms < Number(filters.bedrooms)) return false;
    if (filters.suites !== 'all' && p.suites < Number(filters.suites)) return false;
    if (filters.bathrooms !== 'all' && p.bathrooms < Number(filters.bathrooms)) return false;
    if (filters.parkingSpaces !== 'all' && p.parkingSpaces < Number(filters.parkingSpaces)) return false;
    if (filters.floors !== 'all' && p.floors < Number(filters.floors)) return false;

    // Faixa de preço do pacote
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;

    return true;
  });
}

// Ordenação de projetos
export function sortProjects(projects: Project[], sortBy: SortOption | string): Project[] {
  const list = [...projects];
  switch (sortBy) {
    case 'recent':
      // Ordenação original decrescente por ID
      return list.sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }));
    case 'area_asc':
      return list.sort((a, b) => a.builtArea - b.builtArea);
    case 'area_desc':
      return list.sort((a, b) => b.builtArea - a.builtArea);
    case 'price_asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return list.sort((a, b) => b.price - a.price);
    default:
      return list;
  }
}

// CUB (Custo Unitário Básico) aproximado para 2026 por padrão (R$/m²)
const CUB_ESTIMATES: Record<string, { economico: number; medio: number; alto_luxo: number }> = {
  SP: { economico: 1950, medio: 2400, alto_luxo: 3300 },
  RJ: { economico: 2000, medio: 2500, alto_luxo: 3450 },
  MG: { economico: 1850, medio: 2250, alto_luxo: 3100 },
  RS: { economico: 1900, medio: 2350, alto_luxo: 3200 },
  PR: { economico: 1880, medio: 2300, alto_luxo: 3150 },
  SC: { economico: 1920, medio: 2380, alto_luxo: 3250 },
  BA: { economico: 1750, medio: 2150, alto_luxo: 2900 },
  PE: { economico: 1780, medio: 2200, alto_luxo: 2950 },
  CE: { economico: 1760, medio: 2180, alto_luxo: 2920 },
  GO: { economico: 1800, medio: 2220, alto_luxo: 3000 },
  DF: { economico: 2050, medio: 2550, alto_luxo: 3500 },
  OUTROS: { economico: 1800, medio: 2250, alto_luxo: 3000 }
};

// Detalhamento dos estados brasileiros
export const BRAZIL_STATES = [
  { code: 'SP', name: 'São Paulo' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'PR', name: 'Paraná' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'BA', name: 'Bahia' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'CE', name: 'Ceará' },
  { code: 'GO', name: 'Goiás' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'OUTROS', name: 'Outro Estado / Geral' }
];

// Cálculo simulado de custo corporativo da obra
export function calculateBuildCost(
  area: number,
  standard: 'economico' | 'medio' | 'alto_luxo',
  state: string
) {
  const rates = CUB_ESTIMATES[state] || CUB_ESTIMATES.OUTROS;
  const ratePrice = rates[standard];
  
  // Variação de custo baseada numa taxa de contingência e infraestutura (25% a 40% além do CUB para projetos completos)
  const baseCost = area * ratePrice;
  const minMultiplier = 1.15; // Mão de obra e taxas mínimas
  const maxMultiplier = 1.35; // Mão de obra, taxas, paisagismo, muros etc.

  const minCost = Math.round(baseCost * minMultiplier);
  const maxCost = Math.round(baseCost * maxMultiplier);

  return {
    standardLabel: standard === 'economico' ? 'Padrão Econômico' : standard === 'medio' ? 'Padrão Médio' : 'Alto Luxo',
    rateUsed: ratePrice,
    minCost,
    maxCost,
    averageCost: Math.round((minCost + maxCost) / 2)
  };
}
