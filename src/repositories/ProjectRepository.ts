import { Project, Lead, ProjectSeed, ProjectType, ProjectCategory, BuildStandard } from '../types';
import { generateProjectFromBase } from '../data';

// Definition of the original base projects to fall back to when localStorage is empty
const baseProjects: ProjectSeed[] = [
  { id: "104", title: "Casa Sobrado - 104", type: "sobrado", category: "residencial" },
  { id: "155", title: "Casa Terrea - 155", type: "terrea", category: "residencial" },
  { id: "213", title: "Casa Sobrado - 213", type: "sobrado", category: "residencial" },
  { id: "257", title: "Casa de Esquina - 257", type: "esquina", category: "residencial" },
  { id: "265", title: "Casa Geminada - 265", type: "geminada", category: "residencial" },
  { id: "272", title: "Casa Sobrado - 272", type: "sobrado", category: "residencial" },
  { id: "407", title: "Casa Sobrado - 407", type: "sobrado", category: "residencial" },
  { id: "408", title: "Casa Terrea - 408", type: "terrea", category: "residencial" },
  { id: "411", title: "Casa Geminada - 411", type: "geminada", category: "residencial" },
  { id: "413", title: "Casa Sobrado - 413", type: "sobrado", category: "residencial" },
  { id: "416", title: "Casa Terrea - 416", type: "terrea", category: "residencial" },
  { id: "446", title: "Casa Terrea - 446", type: "terrea", category: "residencial" },
  { id: "518", title: "Cabanas e Chales - 518", type: "chale", category: "residencial" },
  { id: "666", title: "Casa de Madeira - 666", type: "madeira", category: "residencial" },
  { id: "677", title: "Casa de Esquina - 677", type: "esquina", category: "residencial" },
  { id: "684", title: "Casa Sobrado - 684", type: "sobrado", category: "residencial" },
  { id: "690", title: "Casa Terrea - 690", type: "terrea", category: "residencial" },
  { id: "693", title: "Casa Terrea - 693", type: "terrea", category: "residencial" },
  { id: "698", title: "Casa Sobrado - 698", type: "sobrado", category: "residencial" },
  { id: "706", title: "Casa Terrea - 706", type: "terrea", category: "residencial" },
  { id: "711", title: "Casa de Madeira - 711", type: "madeira", category: "residencial" },
  { id: "717", title: "Casa de Madeira - 717", type: "madeira", category: "residencial" },
  { id: "719", title: "Casa de Campo - 719", type: "campo", category: "residencial" },
  { id: "729", title: "Casa Terrea - 729", type: "terrea", category: "residencial" },
  { id: "730", title: "Casa de Campo - 730", type: "campo", category: "residencial" },
  { id: "P-945", title: "Casa Sobrado - P-945", type: "sobrado", category: "residencial" },
  { id: "P-1373", title: "Casa de Esquina - P-1373", type: "esquina", category: "residencial" },
  { id: "P-1412", title: "Casa de Campo - P-1412", type: "campo", category: "residencial" },
  { id: "P-1671", title: "Casa Terrea - P-1671", type: "terrea", category: "residencial" },
  { id: "P-1825", title: "Casa de Campo - P-1825", type: "campo", category: "residencial" },
  { id: "C-103", title: "Empreendimento Comercial - C-103", type: "comercial", category: "comercial" },
  { id: "C-105", title: "Empreendimento Comercial - C-105", type: "comercial", category: "comercial" },
  { id: "C-113", title: "Edificio Residencial - C-113", type: "edificio", category: "residencial" },
  { id: "C-118", title: "Empreendimento Comercial - C-118", type: "comercial", category: "comercial" }
];

export interface IProjectRepository {
  getProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | null>;
  createProject(project: Project): Promise<void>;
  updateProject(project: Project): Promise<void>;
  deleteProject(id: string): Promise<void>;
  
  getLeads(): Promise<Lead[]>;
  createLead(lead: Lead): Promise<void>;
  deleteLead(id: string): Promise<void>;
  updateLead(lead: Lead): Promise<void>;

  resetData(): Promise<void>;
}

export class LocalStorageProjectRepository implements IProjectRepository {
  private PROJECTS_KEY = 'ordus_projects';
  private LEADS_KEY = 'ordus_leads';

  async getProjects(): Promise<Project[]> {
    if (typeof window === 'undefined') {
      return baseProjects.map((p, i) => generateProjectFromBase(p, i));
    }

    const stored = localStorage.getItem(this.PROJECTS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed parsing projects from localStorage, falling back to base', e);
      }
    }

    // Initialize defaults
    const defaultList = baseProjects.map((p, i) => generateProjectFromBase(p, i));
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(defaultList));
    return defaultList;
  }

  async getProjectById(id: string): Promise<Project | null> {
    const projects = await this.getProjects();
    const found = projects.find((p) => p.id === id);
    return found || null;
  }

  async createProject(project: Project): Promise<void> {
    const projects = await this.getProjects();
    if (projects.some((p) => p.id === project.id)) {
      throw new Error(`Projeto com o código "${project.id}" já existe.`);
    }
    const updated = [project, ...projects];
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(updated));
  }

  async updateProject(project: Project): Promise<void> {
    const projects = await this.getProjects();
    const updated = projects.map((p) => (p.id === project.id ? project : p));
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(updated));
  }

  async deleteProject(id: string): Promise<void> {
    const projects = await this.getProjects();
    const updated = projects.filter((p) => p.id !== id);
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(updated));
  }

  async getLeads(): Promise<Lead[]> {
    if (typeof window === 'undefined') {
      return [];
    }

    const stored = localStorage.getItem(this.LEADS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed parsing leads from localStorage', e);
      }
    }

    const firstLeads = this.getDefaultLeads();
    localStorage.setItem(this.LEADS_KEY, JSON.stringify(firstLeads));
    return firstLeads;
  }

  private getDefaultLeads(): Lead[] {
    return [
      {
        id: 'lead-1',
        name: 'Gisela Ferreira',
        email: 'gisela.ff@outlook.com',
        phone: '(11) 98754-2131',
        message: 'Gostaria de saber se o projeto 104 pode ser adaptado para terreno em aclive.',
        type: 'proposta',
        projectId: '104',
        projectTitle: 'Casa Sobrado - 104',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: 'lead-2',
        name: 'Renato Marcondes',
        email: 'renato.m@gmail.com',
        phone: '(21) 99120-4491',
        message: 'Simulação de Obra executada para terreno plano de 150m² em Macaé/RJ.',
        type: 'calculadora',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        calculatorDetails: {
          area: 155,
          standard: 'medio',
          state: 'RJ',
          city: 'Macaé',
          minCost: 350000,
          maxCost: 430000,
        },
      },
    ];
  }

  async createLead(lead: Lead): Promise<void> {
    const leads = await this.getLeads();
    const updated = [lead, ...leads];
    localStorage.setItem(this.LEADS_KEY, JSON.stringify(updated));
  }

  async deleteLead(id: string): Promise<void> {
    const leads = await this.getLeads();
    const updated = leads.filter((l) => l.id !== id);
    localStorage.setItem(this.LEADS_KEY, JSON.stringify(updated));
  }

  async updateLead(lead: Lead): Promise<void> {
    const leads = await this.getLeads();
    const updated = leads.map((l) => (l.id === lead.id ? lead : l));
    localStorage.setItem(this.LEADS_KEY, JSON.stringify(updated));
  }

  async resetData(): Promise<void> {
    if (typeof window !== 'undefined') {
      const defaultProjects = baseProjects.map((p, i) => generateProjectFromBase(p, i));
      localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(defaultProjects));
      localStorage.setItem(this.LEADS_KEY, JSON.stringify(this.getDefaultLeads()));
    }
  }
}

export interface SupabaseProjectRow {
  id: string;
  title: string;
  type: string;
  category: string;
  price: number;
  built_area: number;
  lot_width: number;
  lot_length: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking_spaces: number;
  floors: number;
  description: string;
  rooms_list: string[];
  included: string[];
  tags: string[];
}

export interface SupabaseLeadRow {
  id: string;
  project_id: string | null;
  project_title: string | null;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
  timestamp: string;
  calc_area: number | null;
  calc_standard: string | null;
  calc_state: string | null;
  calc_city: string | null;
  calc_min_cost: number | null;
  calc_max_cost: number | null;
}

export class SupabaseProjectRepository implements IProjectRepository {
  private validateBuildStandard(val: string | null): BuildStandard {
    if (val === 'economico' || val === 'medio' || val === 'alto_luxo') {
      return val;
    }
    return 'medio';
  }

  // Mapping functions for project rows
  public mapRowToProject(row: SupabaseProjectRow, imageUrls: string[] = []): Project {
    return {
      id: row.id,
      title: row.title,
      type: row.type as ProjectType,
      category: row.category as ProjectCategory,
      price: Number(row.price),
      builtArea: Number(row.built_area),
      lotWidth: Number(row.lot_width),
      lotLength: Number(row.lot_length),
      bedrooms: row.bedrooms,
      suites: row.suites,
      bathrooms: row.bathrooms,
      parkingSpaces: row.parking_spaces,
      floors: row.floors,
      description: row.description,
      roomsList: row.rooms_list || [],
      included: row.included || [],
      images: imageUrls,
      tags: row.tags || [],
    };
  }

  public mapProjectToRow(project: Project): SupabaseProjectRow {
    return {
      id: project.id,
      title: project.title,
      type: project.type,
      category: project.category,
      price: project.price,
      built_area: project.builtArea,
      lot_width: project.lotWidth,
      lot_length: project.lotLength,
      bedrooms: project.bedrooms,
      suites: project.suites,
      bathrooms: project.bathrooms,
      parking_spaces: project.parkingSpaces,
      floors: project.floors,
      description: project.description,
      rooms_list: project.roomsList,
      included: project.included,
      tags: project.tags,
    };
  }

  // Mapping functions for lead rows
  public mapRowToLead(row: SupabaseLeadRow): Lead {
    return {
      id: row.id,
      projectId: row.project_id || undefined,
      projectTitle: row.project_title || undefined,
      name: row.name,
      email: row.email,
      phone: row.phone,
      message: row.message,
      type: row.type as 'proposta' | 'calculadora',
      timestamp: row.timestamp,
      calculatorDetails: row.calc_area !== null ? {
        area: Number(row.calc_area),
        standard: this.validateBuildStandard(row.calc_standard),
        state: row.calc_state || '',
        city: row.calc_city || '',
        minCost: row.calc_min_cost ? Number(row.calc_min_cost) : 0,
        maxCost: row.calc_max_cost ? Number(row.calc_max_cost) : 0,
      } : undefined
    };
  }

  public mapLeadToRow(lead: Lead): SupabaseLeadRow {
    return {
      id: lead.id,
      project_id: lead.projectId || null,
      project_title: lead.projectTitle || null,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      type: lead.type,
      timestamp: lead.timestamp,
      calc_area: lead.calculatorDetails ? lead.calculatorDetails.area : null,
      calc_standard: lead.calculatorDetails ? lead.calculatorDetails.standard : null,
      calc_state: lead.calculatorDetails ? lead.calculatorDetails.state : null,
      calc_city: lead.calculatorDetails ? lead.calculatorDetails.city : null,
      calc_min_cost: lead.calculatorDetails ? lead.calculatorDetails.minCost : null,
      calc_max_cost: lead.calculatorDetails ? lead.calculatorDetails.maxCost : null,
    };
  }

  private throwNotConfiguredError(): never {
    throw new Error(
      "Supabase repository not configured yet. Set up the connection environment keys and supabase-schema.sql to transition from local storage mode."
    );
  }

  async getProjects(): Promise<Project[]> {
    this.throwNotConfiguredError();
  }

  async getProjectById(id: string): Promise<Project | null> {
    this.throwNotConfiguredError();
  }

  async createProject(project: Project): Promise<void> {
    this.throwNotConfiguredError();
  }

  async updateProject(project: Project): Promise<void> {
    this.throwNotConfiguredError();
  }

  async deleteProject(id: string): Promise<void> {
    this.throwNotConfiguredError();
  }

  async getLeads(): Promise<Lead[]> {
    this.throwNotConfiguredError();
  }

  async createLead(lead: Lead): Promise<void> {
    this.throwNotConfiguredError();
  }

  async deleteLead(id: string): Promise<void> {
    this.throwNotConfiguredError();
  }

  async updateLead(lead: Lead): Promise<void> {
    this.throwNotConfiguredError();
  }

  async resetData(): Promise<void> {
    this.throwNotConfiguredError();
  }
}

export const projectRepository: IProjectRepository = new LocalStorageProjectRepository();
