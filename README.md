# Órdus Engenharia – SaaS MVP de Catálogo Técnico e Simulador de Custos

Bem-vindo à plataforma SaaS MVP da **Órdus Engenharia**, uma solução moderna de engenharia civil e arquitetura de alto padrão. Esta plataforma permite que clientes explorem um catálogo inteligente de projetos conceituais e façam estimativas realistas de custo de construção baseadas no CUB 2026.

---

## 🚀 Funcionalidades Principais

1. **Catálogo de Projetos Inteligente (`/projetos`)**:
   - Visualização de fachadas e plantas integradas com carregamento dinâmico.
   - Painel de filtros avançado (largura/comprimento do lote, pavimentos, área construída, suites, banheiros, preço do pacote técnico).
   - Classificação rápida por relevância, menor preço e dimensões de m².

2. **Páginas de Detalhes (`/projetos/:id`)**:
   - Acesso por URL direta para cada código de projeto.
   - Conceito arquitetônico individualizado, lista de ambientes planejados e entregáveis digitais inclusos.
   - Formulário de captura de leads integrado para solicitação comercial de projetos personalizados.

3. **Simulador Inteligente de Custo de Obra (`/calculadora-custo-obra`)**:
   - Parâmetros reais baseados em índices regionais de CUB de 2026.
   - Simulador interativo com sliders de área, estado (UF) e padrão de acabamento (Econômico, Médio Padrão e Alto Luxo).
   - Relatórios imediatos de investimento estimado mínimo e máximo.

4. **Criador 3D Paramétrico (`/criador-3d`)**:
   - Plataforma de modelagem conceitual 3D assistida de tempo real em WebGL.
   - Presets de composição rápidos (Casa compacta, Sobrado premium, Casa de campo, Projeto comercial).
   - Customizadores visuais completos para dimensões físicas (comprimento, largura, andares, carros) e paleta cromática de revestimentos.
   - Integração direta com a fila de triagem de engenharia no CRM.

5. **Favoritos Persistidos (`/favoritos`)**:
   - Salve projetos de interesse instantaneamente com clique no ícone de coração.
   - Sincronização automática e persistência offline de dados via `localStorage`.

6. **Painel do Administrador CRM (`/admin`)**:
   - Camada autenticada local pré-configurada para testes do MVP (Login: `admin` / Senha: `123`).
   - **Projetos CRUD Completo**: Adicione, edite e remova projetos do catálogo com validação de campos.
   - **Leads & Clientes CRM**: Listagem completa e exclusão de leads capturados pelas solicitações comerciais ou simulações.
   - **Exportação CSV Direta**: Baixe o acervo de projetos e dados de contatos em arquivos CSV compatíveis com o Microsoft Excel.

---

## 📂 Arquitetura do Sistema e Organização

A base de código foi inteiramente modularizada para evitar arquivos grandes (`App.tsx` agora possui menos de 100 linhas!) e garantir fácil manutenção:

```
├── /src
│   ├── /components              # Componentes de interface globais
│   │   ├── AdminProjectForm.tsx # Modal de edição/inserção de novos projetos
│   │   ├── CalculatorResult.tsx # Quadro de cálculo do CUB 
│   │   ├── EmptyState.tsx       # Estado de pesquisa vazia
│   │   ├── FilterPanel.tsx      # Barra de controles laterais do catálogo
│   │   ├── Header.tsx           # Menu e navegação unificados com histórico
│   │   ├── LeadForm.tsx         # Formulário de contato para propostas
│   │   ├── Logo.tsx             # Identidade visual da Órdus Engenharia
│   │   ├── ProjectCard.tsx      # Cards de amostragem técnica
│   │   └── ProjectGallery.tsx   # Galeria de fotos do projeto
│   │
│   ├── /hooks                   # Hooks customizados de ciclo de vida
│   │   └── useFavorites.ts      # Gerenciamento local de itens curtidos
│   │
│   ├── /pages                   # Páginas reais acessíveis por roteamento
│   │   ├── AdminPage.tsx        # Dashboard, CRUD de dados e relatórios CSV
│   │   ├── CalculatorPage.tsx   # Calculadora financeira de m²
│   │   ├── CatalogPage.tsx      # Vitrine de lançamentos e listagem
│   │   ├── FavoritesPage.tsx    # Listagem de salvos pelo cliente.
│   │   └── ProjectDetailPage.tsx# Detalhamento integral individualizável
│   │
│   ├── /repositories            # Camada limpa de dados preparada para API
│   │   └── ProjectRepository.ts # Implementação localStorage desacoplada
│   │
│   ├── types.ts                 # Definições com tipagem forte TypeScript
│   ├── data.ts                  # Inteligência de estimativas CUB e dados base
│   ├── index.css                # CSS Global com utilitários Tailwind
│   └── main.tsx                 # Entrada de renderização
```

---

## ⚙️ Tecnologias Utilizadas

- **Framework**: React 19 com Vite.
- **Linguagem**: TypeScript com tipagem forte anti-erros.
- **Estilização**: Tailwind CSS com paleta sofisticada em tons dourados (`#C29047`), ardósia, cinzas e azul-escuro mineral (`#0E1721`).
- **Icons**: `lucide-react`.
- **Roteador**: `react-router-dom`.

---

## 🛠️ Como Instalar e Rodar Localmente

Siga o passo a passo abaixo para executar o MVP em sua máquina local:

### 1. Pré-requisitos
- Certifique-se de ter o **Node.js** instalado (versão 18 ou superior recomendada).

### 2. Instalar Dependências
No terminal do projeto, execute o comando abaixo para instalar as bibliotecas necessárias:
```bash
npm install
```

### 3. Executar em modo de Desenvolvimento
Para iniciar o servidor local com hot-reload ativo:
```bash
npm run dev
```
O servidor estará acessível em: `http://localhost:3000`

### 4. Compilar para Produção (Build)
Para otimizar o código de produção gerando arquivos estáticos na pasta `/dist`:
```bash
npm run build
```

---

## 🔐 Controle de Acesso e Credenciais do MVP

Para garantir uma navegação estruturada e segura antes de acessar o acervo da plataforma, o MVP conta com duas camadas de controle de acesso armazenadas de forma segura em `localStorage`:

### 1. Acesso à Plataforma Geral (Cliente)
Ao abrir a aplicação, a tela de login exige credenciais válidas antes de navegar pelo catálogo, simulador ou favoritos:
- **Usuário / E-mail**: `cliente` *(ou cliente@ordus.com.br)*
- **Senha**: `123`
- *Sessão armazenada sob a chave:* `ordus_user_session`

### 2. Acesso ao Painel CRM Administrativo
Ao tentar acessar a rota `/admin`, além do acesso de cliente, é exigido o login administrativo:
- **Usuário**: `admin`
- **Senha**: `123`
- *Sessão armazenada sob a chave:* `ordus_admin_session`

Ambas as camadas são moficadas dinamicamente de forma offline por meio do padrão `AuthRepository` no frontend, salvando localmente o status de autenticação ativa para garantir fluidez máxima.

---

## 🔄 Status do MVP: O que é Real vs. Simulado

| Funcionalidade | Estado Atual (MVP) | Persistência / Mecanismo| Futura Escala (Supabase/API) |
|---|---|---|---|
| **Catálogo de Projetos** | Real | `localStorage` (Com carga inicial estática) | Carregados de tabela SQL no banco de dados |
| **Simulador de Custo (CUB)** | Real | Processamento matemático instanciado | Integrado de forma estática com tabela de índices por UF |
| **Criador 3D Paramétrico** | Real | Renderização assistida e exportação | Armazenamento de presets vinculados ao UUID da conta |
| **Leads & Contatos CRM** | Real | `localStorage` temporário do sandbox | Salvos de forma imediata na tabela `leads` via API |
| **Status de Favoritos** | Real | `localStorage` | Sincronizados com a conta ativa do usuário |
| **Edição / CRUD Administrativo** | Real | `localStorage` | Operações diretas de INSERT/UPDATE via Supabase Client |
| **Envio de Proposta de Projeto** | Simulado | Feedbacks visuais customizados e leads no CRM | Envio automático por webhook / email no backend |

---

## 🔌 Guia de Migração para Supabase no Futuro

Para migrar esta aplicação de persistência baseada em `localStorage` para uma infraestrutura sólida de banco de dados na nuvem com o **Supabase**, siga os passos planejados:

### 1. Execute as Migrações SQL
O arquivo `supabase-schema.sql` na raiz do projeto contém a estrutura de tabelas necessária (incluindo chaves estrangeiras e integridade de dados). Execute essa estrutura diretamente no painel SQL do seu projeto no Supabase para criar as tabelas `projects` e `leads`.

### 2. Instale o Cliente do Supabase
Instale o SDK oficial do Supabase em seu projeto:
```bash
npm install @supabase/supabase-js
```

### 3. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as chaves de acesso públicas do seu projeto Supabase:
```env
VITE_SUPABASE_URL=seulink.supabase.co
VITE_SUPABASE_ANON_KEY=suachaveanonimaaqui
```

### 4. Ative o Repositório do Supabase
Fizemos um hardening completo do MVP fornecendo mapeadores prontos e fortemente tipados (`SupabaseProjectRow`, `SupabaseLeadRow`) na classe `SupabaseProjectRepository` em `/src/repositories/ProjectRepository.ts`. 

Para alternar a aplicação de armazenamento local para persistência em nuvem, inicialize o cliente do Supabase e substitua as chamadas do repositório ativo no final de `/src/repositories/ProjectRepository.ts`:

```typescript
// Altere para instanciar e exportar a classe do Supabase conectada
export const projectRepository: IProjectRepository = new SupabaseProjectRepository();
```

Os mappers fornecidos (`mapRowToProject`, `mapProjectToRow`, `mapRowToLead`, `mapLeadToRow`) garantem que os campos com notação camelCase (utilizada no frontend React) se convertam perfeitamente para notação snake_case no banco de dados postgres, mantendo o código impecavelmente organizado e seguro de quebras!
