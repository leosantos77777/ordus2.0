-- Schema SQL de Produção para Supabase / PostgreSQL (Órdus Engenharia)

-- Tabela de Administradores
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Senhas com hash em produção (ex: bcrypt)
    name VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserção de admin inicial para testes locais
-- A senha '123' em hash fictício/produção seria gerada pelo fluxo de cadastro do backend
INSERT INTO admins (username, password_hash, name)
VALUES ('admin', 'hash_da_senha_123_aqui', 'Gestor Órdus')
ON CONFLICT (username) DO NOTHING;

-- Tabela Principal de Projetos
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(50) PRIMARY KEY, -- Código ex: '104', 'P-945', 'C-103'
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'terrea', 'sobrado', 'campo' etc.
    category VARCHAR(50) NOT NULL, -- 'residencial' ou 'comercial'
    price DECIMAL(10, 2) NOT NULL,
    built_area DECIMAL(8, 2) NOT NULL, -- Área construída m²
    lot_width DECIMAL(6, 2) NOT NULL, -- Largura do lote
    lot_length DECIMAL(6, 2) NOT NULL, -- Comprimento do lote
    bedrooms INT NOT NULL DEFAULT 0,
    suites INT NOT NULL DEFAULT 0,
    bathrooms INT NOT NULL DEFAULT 0,
    parking_spaces INT NOT NULL DEFAULT 0,
    floors INT NOT NULL DEFAULT 1,
    description TEXT NOT NULL,
    rooms_list TEXT[] NOT NULL DEFAULT '{}', -- Lista de cômodos (PostgreSQL array)
    included TEXT[] NOT NULL DEFAULT '{}', -- Itens inclusos (PostgreSQL array)
    tags TEXT[] NOT NULL DEFAULT '{}', -- Tags do projeto para indexação
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Relacional de Imagens (Uma-Para-Muitas de projetos, para galeria de alta qualidade)
CREATE TABLE IF NOT EXISTS project_images (
    id SERIAL PRIMARY KEY,
    project_id VARCHAR(50) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Leads & Clientes (CRM)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(50) REFERENCES projects(id) ON DELETE SET NULL, -- Caso venha de um projeto ativo
    project_title VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'proposta' ou 'calculadora'
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Colunas opcionais para dados detalhados da calculadora financeira
    calc_area DECIMAL(8, 2),
    calc_standard VARCHAR(50), -- 'economico', 'medio', 'alto_luxo'
    calc_state VARCHAR(10),
    calc_city VARCHAR(100),
    calc_min_cost DECIMAL(12, 2),
    calc_max_cost DECIMAL(12, 2)
);

-- Índices de Alta Performance (Otimização para Filtros Pesados e buscas textuais)
CREATE INDEX IF NOT EXISTS idx_projects_type_category ON projects(type, category);
CREATE INDEX IF NOT EXISTS idx_projects_price ON projects(price);
CREATE INDEX IF NOT EXISTS idx_projects_area ON projects(built_area);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_leads_timestamp ON leads(timestamp);
