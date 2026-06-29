import React from 'react';
import { CreatorProjectConfig } from '../types';
import { Home, Landmark, Trees, Building, Sparkles, Sliders, Milestone } from 'lucide-react';

interface CreatorPresetSelectorProps {
  onSelectPreset: (preset: Omit<CreatorProjectConfig, 'id' | 'name' | 'timestamp'> & { presetName: string }) => void;
  activePresetName: string;
}

export default function CreatorPresetSelector({ onSelectPreset, activePresetName }: CreatorPresetSelectorProps) {
  const presets = [
    {
      name: 'Minha Casa Moderna 5x25',
      icon: Home,
      description: 'Modelo icônico da arquitetura popular brasileira. Otimização extrema de espaço urbano.',
      config: {
        projectType: 'terrea' as const,
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
        roofType: 'platibanda' as const,
        wallFrontal: false,
        gardenFrontal: true,
        balcony: false,
        pool: false,
        viewMode: 'perspective' as const,
        materials: {
          wallColor: '#F8FAFC',
          roofColor: '#1E293B',
          trimColor: '#0F172A',
          externalFloor: 'grama' as const,
          highlightMaterial: 'reboco' as const,
        },
      }
    },
    {
      name: 'Casa Térrea 8x25',
      icon: Milestone,
      description: 'Lote generoso com recuo para 2 vagas, garagem coberta integrada e deck gourmet nos fundos.',
      config: {
        projectType: 'terrea' as const,
        style: 'terrea_contemporanea',
        lotWidth: 8,
        lotLength: 25,
        builtArea: 115,
        floors: 1,
        bedrooms: 3,
        suites: 1,
        bathrooms: 2,
        parkingSpaces: 2,
        integratedLiving: true,
        gourmetArea: true,
        frontSetback: 5.5,
        roofType: 'embutido' as const,
        wallFrontal: true,
        gardenFrontal: true,
        balcony: false,
        pool: false,
        viewMode: 'perspective' as const,
        materials: {
          wallColor: '#EBE3D5',
          roofColor: '#475569',
          trimColor: '#0F172A',
          externalFloor: 'pedra' as const,
          highlightMaterial: 'concreto' as const,
        },
      }
    },
    {
      name: 'Sobrado Urbano 6x25',
      icon: Sliders,
      description: 'Sobrado urbano clássico com balanço moderno projetado sobre a entrada e suíte master com sacada.',
      config: {
        projectType: 'sobrado' as const,
        style: 'sobrado_urbano',
        lotWidth: 6,
        lotLength: 25,
        builtArea: 135,
        floors: 2,
        bedrooms: 3,
        suites: 1,
        bathrooms: 3,
        parkingSpaces: 1,
        integratedLiving: true,
        gourmetArea: true,
        frontSetback: 5,
        roofType: 'platibanda' as const,
        wallFrontal: true,
        gardenFrontal: true,
        balcony: true,
        pool: false,
        viewMode: 'perspective' as const,
        materials: {
          wallColor: '#F8FAFC',
          roofColor: '#1E293B',
          trimColor: '#0F172A',
          externalFloor: 'grama' as const,
          highlightMaterial: 'madeira_ripada' as const,
        },
      }
    },
    {
      name: 'Casa Alto Padrão 12x30',
      icon: Landmark,
      description: 'Luxo contemporâneo com garagem dupla, revestimento em pedra fita, raia de piscina e área gourmet.',
      config: {
        projectType: 'sobrado' as const,
        style: 'alto_luxo',
        lotWidth: 12,
        lotLength: 30,
        builtArea: 260,
        floors: 2,
        bedrooms: 4,
        suites: 3,
        bathrooms: 4,
        parkingSpaces: 2,
        integratedLiving: true,
        gourmetArea: true,
        frontSetback: 6,
        roofType: 'embutido' as const,
        wallFrontal: false,
        gardenFrontal: true,
        balcony: true,
        pool: true,
        viewMode: 'perspective' as const,
        materials: {
          wallColor: '#F8FAFC',
          roofColor: '#1E293B',
          trimColor: '#C29047',
          externalFloor: 'pedra' as const,
          highlightMaterial: 'concreto' as const,
        },
      }
    },
    {
      name: 'Casa de Campo com Varanda',
      icon: Trees,
      description: 'Varandas acolhedoras, telhado colonial cerâmico tradicional e deck amplo integrado à piscina.',
      config: {
        projectType: 'chale' as const,
        style: 'campo_varanda',
        lotWidth: 15,
        lotLength: 30,
        builtArea: 180,
        floors: 1,
        bedrooms: 3,
        suites: 1,
        bathrooms: 2,
        parkingSpaces: 2,
        integratedLiving: true,
        gourmetArea: true,
        frontSetback: 7,
        roofType: 'colonial' as const,
        wallFrontal: false,
        gardenFrontal: true,
        balcony: false,
        pool: true,
        viewMode: 'perspective' as const,
        materials: {
          wallColor: '#EBE3D5',
          roofColor: '#C25A3F',
          trimColor: '#451A03',
          externalFloor: 'madeira' as const,
          highlightMaterial: 'pedra' as const,
        },
      }
    },
    {
      name: 'Comercial de Esquina',
      icon: Building,
      description: 'Ponto de prestação de serviços com recuo para calçada livre, pele de vidro e 2 andares.',
      config: {
        projectType: 'comercial' as const,
        style: 'comercial_esquina',
        lotWidth: 10,
        lotLength: 20,
        builtArea: 190,
        floors: 2,
        bedrooms: 0,
        suites: 0,
        bathrooms: 4,
        parkingSpaces: 2,
        integratedLiving: false,
        gourmetArea: false,
        frontSetback: 3,
        roofType: 'embutido' as const,
        wallFrontal: false,
        gardenFrontal: false,
        balcony: false,
        pool: false,
        viewMode: 'perspective' as const,
        materials: {
          wallColor: '#94A3B8',
          roofColor: '#1E293B',
          trimColor: '#0F172A',
          externalFloor: 'concreto' as const,
          highlightMaterial: 'concreto' as const,
        },
      }
    }
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4.5 h-4.5 text-[#C29047]" />
        <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
          Galeria de Projetos Brasileiros (Presets Cadastrados)
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {presets.map((preset) => {
          const Icon = preset.icon;
          const isActive = preset.name === activePresetName;
          return (
            <button
              key={preset.name}
              id={`preset-btn-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectPreset({ ...preset.config, presetName: preset.name })}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-44 ${
                isActive
                  ? 'bg-slate-900 border-[#C29047] shadow-lg ring-1 ring-[#C29047]'
                  : 'bg-white border-slate-200 hover:border-slate-350 hover:shadow-md'
              }`}
            >
              <div className="space-y-1.5 w-full min-w-0">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl shrink-0 ${isActive ? 'bg-[#C29047]/15 text-[#C29047]' : 'bg-slate-50 text-slate-700'}`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  {isActive && (
                    <span className="text-[8px] font-mono font-bold tracking-wider uppercase text-[#C29047] bg-[#C29047]/10 px-1.5 py-0.5 rounded">
                      Ativo
                    </span>
                  )}
                </div>
                <h5 className={`font-bold text-xs tracking-tight truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {preset.name}
                </h5>
              </div>
              <p className={`text-[10px] leading-relaxed line-clamp-3 ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
