export type ProjectType =
  | 'terrea'
  | 'sobrado'
  | 'campo'
  | 'madeira'
  | 'geminada'
  | 'esquina'
  | 'comercial'
  | 'edificio'
  | 'chale';

export type ProjectCategory = 'residencial' | 'comercial';

export type SortOption = 'recent' | 'price_asc' | 'price_desc' | 'area_asc' | 'area_desc';

export type BuildStandard = 'economico' | 'medio' | 'alto_luxo';

export interface ProjectSeed {
  id: string;
  title: string;
  type: ProjectType;
  category: ProjectCategory;
}

export interface Project {
  id: string;
  title: string;
  type: ProjectType;
  category: ProjectCategory;
  price: number; // Preço do projeto (em R$)
  estimatedConstructionCost?: number; // Custo estimado de execução da obra
  builtArea: number; // Área construída em m²
  lotWidth: number; // Largura do terreno em metros
  lotLength: number; // Comprimento do terreno em metros
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  floors: number; // Número de pavimentos
  description: string;
  roomsList: string[]; // Ambientes
  included: string[]; // Itens inclusos no pacote do projeto
  images: string[]; // URLs das imagens
  tags: string[];
}

export interface ProjectFilters {
  searchQuery: string;
  category: ProjectCategory | 'all';
  type: ProjectType | 'all';
  minWidth: number;
  maxWidth: number;
  minLength: number;
  maxLength: number;
  minArea: number;
  maxArea: number;
  bedrooms: number | 'all';
  suites: number | 'all';
  bathrooms: number | 'all';
  parkingSpaces: number | 'all';
  floors: number | 'all';
  minPrice: number;
  maxPrice: number;
}

export interface Lead {
  id: string;
  projectId?: string;
  projectTitle?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'analise_tecnica' | 'adaptacao_projeto' | 'simulacao_custo' | 'estudo_3d' | 'proposta' | 'calculadora';
  status?: 'Novo' | 'Em análise' | 'Proposta enviada' | 'Aguardando cliente' | 'Fechado';
  timestamp: string;
  calculatorDetails?: {
    area: number;
    standard: BuildStandard;
    state: string;
    city: string;
    minCost: number;
    maxCost: number;
  };
}

export type CreatorProjectType = 'terrea' | 'sobrado' | 'chale' | 'comercial';
export type CreatorProjectStyle = 'moderno' | 'classico' | 'minimalista' | 'alto_padrao' | 'rustico';

export type RoofType = 'platibanda' | 'duas_aguas' | 'colonial' | 'embutido';
export type BrazilianArchitecturalStyle = 
  | 'popular_moderna' 
  | 'terrea_contemporanea' 
  | 'sobrado_urbano' 
  | 'campo_varanda' 
  | 'platibanda_moderna' 
  | 'colonial_tradicional' 
  | 'alto_luxo' 
  | 'comercial_esquina';

export type FacadeMaterial = 'reboco' | 'concreto' | 'madeira_ripada' | 'pedra' | 'tijolo';
export type ViewMode = 'perspective' | 'top' | 'facade';

export interface CreatorProjectMaterialConfig {
  wallColor: string;
  roofColor: string;
  trimColor: string;
  externalFloor: 'grama' | 'concreto' | 'madeira' | 'pedra';
  highlightMaterial?: FacadeMaterial;
}

export interface CreatorProjectConfig {
  id: string;
  name: string;
  projectType: CreatorProjectType;
  style: CreatorProjectStyle | BrazilianArchitecturalStyle | string;
  
  // Dimensions
  lotWidth: number;
  lotLength: number;
  builtArea: number;
  floors: number;

  // Rooms
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  integratedLiving: boolean;
  gourmetArea: boolean; // also represents varandaGourmet

  // Visuals
  materials: CreatorProjectMaterialConfig;
  timestamp: string;

  // New Brazilian parameters
  frontSetback?: number;        // recuo frontal em metros
  roofType?: RoofType;          // tipo do telhado
  wallFrontal?: boolean;        // muro frontal sim/não
  gardenFrontal?: boolean;      // jardim frontal sim/não
  balcony?: boolean;            // sacada sim/não
  pool?: boolean;               // piscina sim/não
  viewMode?: ViewMode;          // modo de visualização da câmera
}


