# Arquitetura do Projeto Multiverso Tech

## 1. Visão Geral

O **Multiverso Tech** é uma plataforma open-source colaborativa de glossário e vocabulário técnico para a comunidade brasileira de tecnologia. Resolve a falta de referência centralizada em português para termos técnicos em inglês (EN ↔ PT-BR). É um site estático hospedado no GitHub Pages, construído com um sistema de templates HTML com includes recursivos, SCSS modular e JavaScript sem bundler.

### Stack Tecnológica
- **Frontend**: HTML5 com sistema de includes, CSS3 (SCSS/Dart Sass), JavaScript ES6+ (sem bundler)
- **Build**: Sass CLI, ESLint, Prettier, Stylelint, Node.js scripts (fs-extra, Sharp)
- **Assets**: FontAwesome 7, Sharp (otimização de imagens)
- **Deploy**: GitHub Pages (estático via GitHub Actions)
- **Ferramentas**: Node.js, npm, ES Modules (.mjs)

### Estrutura de Diretórios
```text
src/
├── assets/                  # Imagens, ícones, fontes
│   ├── fonts/
│   ├── icons/
│   └── images/
├── js/                      # JavaScript modular (ES6+, sem bundler)
│   ├── components/          # Componentes interativos (ThemeToggle, Dropdown)
│   ├── pages/               # Controladores por página (home, glossario, termo)
│   ├── services/            # Serviços/camada de dados (futuro)
│   ├── utils/               # Funções utilitárias (futuro)
│   └── main.js              # Entry point - instancia e re-exporta componentes
├── scss/                    # Design system modular em SASS
│   ├── abstracts/           # Variáveis, funções, mixins
│   │   ├── variables/       # ~25 arquivos por categoria (colors, spacing, etc)
│   │   ├── functions/       # Funções SCSS (breakpoints, calc, color-contrast, etc)
│   │   ├── mixins/          # Mixins reutilizáveis (breakpoints, grid, typography, etc)
│   │   ├── _variables.scss  # Índice de variáveis via @forward
│   │   ├── _functions.scss  # Índice de funções via @forward
│   │   └── _mixins.scss     # Índice de mixins via @forward
│   ├── base/                # Estilos base (reboot, root, type, container, grid, utilities)
│   ├── components/          # Componentes reutilizáveis (alert, badge, button, card, etc)
│   ├── helpers/             # Helpers/utilidades (clearfix, color-bg, focus-ring, etc)
│   ├── themes/              # Variáveis de temas (dark mode, etc)
│   ├── mvt-main.scss        # Entry point principal (importa todos os índices)
│   ├── mvt-base.scss        # Entry point da camada base
│   ├── mvt-components.scss  # Entry point de componentes
│   ├── mvt-helpers.scss     # Entry point de helpers
│   ├── mvt-grid.scss        # Entry point do grid
│   ├── _themes.scss         # Índice de temas
│   ├── _core-base.scss      # Índice da camada base
│   ├── _core-components.scss # Índice de componentes
│   └── _core-helpers.scss   # Índice de helpers
└── templates/               # Templates HTML com diretivas de include
    ├── partials/            # Fragmentos reutilizáveis (header, footer, head)
    ├── index.html           # Template da página home
    ├── glossario.html       # Template do glossário
    └── termo.html           # Template de página de termo individual

data/                        # Dados do glossário/vocabulário (VAZIO - a ser implementado)
dist/css/                    # CSS compilado (gerado pela build - NÃO editar manualmente)
dist/                        # Saída de compilação Sass
site/                        # Output da build (HTML processado + assets)
scripts/                     # Scripts de build/automação (ES Modules .mjs)
.github/workflows/           # CI/CD GitHub Actions
```

## 2. Objetivos Arquiteturais

- **Manutenibilidade**: Estrutura modular para facilitar contribuições de conteúdo e código
- **Performance**: Site estático para carregamento rápido; otimização de assets
- **Acessibilidade**: Suporte a leitores de tela, navegação por teclado, contraste adequado
- **Escalabilidade**: Capacidade de crescimento do conteúdo sem refatoração massiva (preparação para integração com `/data/`)
- **Colaboratividade**: Baixo acoplamento entre conteúdo e apresentação; modelo de Issues/PRs para contribuições
- **Qualidade de Código**: Lint, formatação e validação obrigatória em CI/CD

## 3. Camadas da Aplicação

### 3.1 Content Layer (Conteúdo)
**Responsabilidades**: Gestão de dados e geração de páginas
- `data/`: JSON/Markdown com termos técnicos e vocabulário (VAZIO - a ser implementado)
- `src/templates/`: Templates HTML estáticos com diretivas de include
- `scripts/build.mjs`: Automação de processamento de templates e geração do site

### 3.2 Presentation Layer (Apresentação)
**Responsabilidades**: Interface visual e experiência do usuário
- `src/scss/`: Sistema de design modular (variáveis ~25 categorias, mixins, funções)
- `src/scss/abstracts/`: Configuração global de design tokens e utilitários
- `src/scss/themes/`: Temas darkmode com variáveis específicas
- `dist/css/`: CSS compilado (gerado pelo Sass, não editar)

### 3.3 Application Layer (Aplicação)
**Responsabilidades**: Lógica de negócio e interatividade
- `src/js/pages/`: Controladores por página (futuro, atualmente vazio)
- `src/js/components/`: Componentes interativos (ThemeToggle, Dropdown)
- `src/js/services/`: Acesso a dados e APIs (futuro)
- `src/js/utils/`: Funções utilitárias (futuro)
- `src/js/main.js`: Entry point que instancia componentes globais

### 3.4 Infrastructure Layer (Infraestrutura)
**Responsabilidades**: Build, deploy e qualidade de código
- `package.json`: Scripts de build e dependências
- `eslint.config.mjs`: Configuração ESLint (JS, JSON, Markdown)
- `stylelint.config.mjs`: Validação SCSS
- CI/CD: GitHub Actions (`.github/workflows/`) para lint, build e deploy automático
- `scripts/build.mjs`: Processamento de templates e geração do site

## 4. Fluxo de Dados

### 4.1 Build Time (Development & CI)

#### 4.1.1 SCSS → CSS
```text
src/scss/mvt-main.scss
  ↓ (compila via Sass)
dist/css/mvt-main.css ou .min.css (compressed para produção)
```

#### 4.1.2 Templates → HTML (via build.mjs)
```text
src/templates/index.html
  ↓ (processIncludes recursivamente)
  ├─ src/templates/partials/head.html
  ├─ src/templates/partials/header.html
  └─ src/templates/partials/footer.html
  ↓ (substitui <!-- include:... --> pelo conteúdo)
site/index.html
```

Sistema de includes:
- Formato: `<!-- include:partials/header.html -->`
- Suporta inclusão recursiva (partials podem incluir outros partials)
- O script processa de forma recursiva até não houver mais includes
- Todos os paths são relativos a `src/templates/`

#### 4.1.3 Assets
- Sharp - Otimização de imagens (futura integração)
- Cópia de assets: `src/assets/` → `site/assets/`
- Favicon: `src/assets/icons/favicon-32x32.png` → `site/favicon.ico`
- FontAwesome 7: Carregado via npm (`@fortawesome/fontawesome-free`)

#### 4.1.4 Linting & Validação
```text
ESLint (JS)           →  Valida código JavaScript
Stylelint (SCSS)      →  Valida estilos CSS
Prettier              →  Formata código
Sass (compile)        →  Valida sintaxe SCSS
```

### 4.2 Runtime (Browser)

#### 4.2.1 Navegação
1. Usuário acessa `site/index.html`
2. HTML carrega CSS (`dist/css/mvt-main.css`)
3. HTML carrega JavaScript (`src/js/main.js` - compilado sem bundler no browser)

#### 4.2.2 Interatividade
- `ThemeToggle`: Detecta preferência do sistema, persiste em `localStorage` sob chave `"tema"`
- Aplica `data-theme="dark"` ou `data-theme="light"` no `<html>`
- SCSS responde via `@media (prefers-color-scheme)` e tokens de tema

#### 4.2.3 Dados (Futuro)
- Será carregado de `data/` (JSON) via fetch ou API
- Páginas de termos serão geradas dinamicamente ou via SSG (11ty/Astro)

### 4.3 Contribuição (GitHub Flow)

#### 4.3.1 Proposta de Conteúdo
1. Contribuidor abre **Issue** com sugestão de termo
2. Mantedor valida e implementa em `data/` ou código

#### 4.3.2 Contribuição de Código
1. Fork → Clone → Nova branch (`feat/...` ou `fix/...`)
2. Edita arquivo (template, SCSS, JS)
3. Commit via Conventional Commits (`feat:`, `fix:`, `docs:`, etc)
4. Push → Abre Pull Request
5. CI passa automaticamente (lint, build)
6. Merge → GitHub Actions faz deploy para GitHub Pages

## 5. Padrões e Práticas

### 5.1 SCSS/CSS
- **Metodologia**: Inspirada em Bootstrap + Design Tokens
- **Organização**: abstracts/ → base/ → components/ → helpers/ → themes/
- **Módulos Sass**: Usa `@use` e `@forward` (Dart Sass modules, **nunca** `@import`)
- **Variáveis**: ~25 categorias modularizadas em `src/scss/abstracts/variables/`
- **Temas**: Dark mode via `data-theme` no HTML + tokens em `src/scss/themes/_dark-variables.scss`
- **Globalflags**: Configuração global em `src/scss/abstracts/variables/_default.scss` (prefixo, dark mode, transitions)
- **Naming**: Português kebab-case para design system (`$cor-primaria-1`, `$superficie-container`)
- **Mixins**: Breakpoints, grid, typography, utilities reutilizáveis em `src/scss/abstracts/mixins/`

### 5.2 JavaScript
- **Modularidade**: Um arquivo por componente ou página
- **Padrão**: Classes ES6 com `export default NomeClasse`
- **Entry Point**: `src/js/main.js` instancia componentes globais e re-exporta
- **Naming**: Arquivos em kebab-case (`theme-toggle.js`, `home.js`), variáveis/funções em camelCase (`toggleTheme()`)
- **Sem Bundler**: Sem require(), sem imports de node_modules no browser
- **Persistência**: `ThemeToggle` salva preferência em `localStorage["tema"]`
- **Acessibilidade**: Focus management, ARIA labels quando necessário

### 5.3 HTML & Templates
- **Semântica**: `<nav>`, `<main>`, `<section>`, `<article>` nos lugares corretos
- **Performance**: Lazy loading para imagens, minificação em produção
- **SEO**: Meta tags, Open Graph, Twitter Card tags, structured data
- **Templates**: Ficam em `src/templates/`, partials em `src/templates/partials/`
- **Includes**: Via diretiva `<!-- include:partials/header.html -->`
- **Tema**: Atributo `data-theme` no `<html>` controla CSS (não usar classes no body)

### 5.4 Qualidade & CI/CD
- **Linting**: ESLint obrigatório em JS, JSON, Markdown
- **Formatação**: Prettier para consistência (`.prettierrc`)
- **SCSS**: Stylelint validando estilos
- **Commits**: Conventional Commits obrigatórios (feat, fix, docs, style, refactor, content, build, test, perf, chore, ci, raw, cleanup, remove)
- **CI**: GitHub Actions roda lint + build em cada PR
- **Deploy**: GitHub Actions gera output em `site/` e publica via GitHub Pages (branch `gh-pages` automática)

## 6. Riscos Conhecidos e Dívidas Técnicas

### 6.1 Pasta `/data/` Vazia
- **Status**: Crítico
- **Problema**: Não há integração com fonte de dados para glossário/vocabulário
- **Impacto**: Conteúdo não pode ser adicionado via Issues/PRs no modelo planejado
- **Mitigação**: Definir estrutura JSON (`data/tech-glossary/`, `data/vocabulary/`) antes de escalar
- **Ação**: Priorizar na Fase 1

### 6.2 CONTRIBUTING.md Desatualizado
- **Status**: Alto
- **Problema**: Docs mencionam estrutura `/data/` e workflows que não existem yet
- **Impacto**: Confunde contribuidores sobre como adicionar conteúdo
- **Mitigação**: Atualizar CONTRIBUTING.md em sincronia com implementação de `/data/`
- **Ação**: Fazer junto com 6.1

### 6.3 Sem Integração HTML ↔ Dados
- **Status**: Alto
- **Problema**: Templates HTML são estáticos; não há sistema para renderizar termos dinâmicos
- **Impacto**: Escalabilidade limitada a alguns centos de páginas manuais
- **Mitigação**: Implementar SSG (11ty ou Astro) ou carregamento dinâmico via JS+JSON
- **Ação**: Fase 1-2

### 6.4 JavaScript sem Bundler/Transpilação
- **Status**: Médio
- **Problema**: Sem minificação, tree-shaking ou transpilação para browsers antigos
- **Impacto**: Bundle potencialmente grande para browsers com suporte ES6 limitado
- **Mitigação**: Implementar Vite básico ou Esbuild para minificação
- **Ação**: Fase 2

### 6.5 Dependências Node no Frontend (Security)
- **Status**: Médio (controlado)
- **Problema**: `sharp` e `fs-extra` estão em `dependencies` mas não podem rodar no browser
- **Impacto**: Confusão se alguém importar em código de browser
- **Mitigação**: Adicionar comentários claros em código de build; considerar mover para `devDependencies`
- **Ação**: Code review em build-related scripts

### 6.6 Testes Ausentes
- **Status**: Médio
- **Problema**: Sem cobertura de testes automatizados
- **Impacto**: Regressões em funcionalidades críticas (ThemeToggle, interatividade)
- **Mitigação**: Implementar Vitest + testes unitários para componentes JS
- **Ação**: Fase 1 (após estabilizar `/data/`)

### 6.7 FontAwesome via CDN Externo
- **Status**: Baixo
- **Problema**: `index.html` carrega FontAwesome 7 via `kit.fontawesome.com` (script externo)
- **Impacto**: Dependência de serviço terceiro; possível ponto de falha
- **Mitigação**: Migração para `@fortawesome/fontawesome-free` (npm package já instalado)
- **Ação**: Phase 2 (refactor)

### 6.8 Escalabilidade de SCSS
- **Status**: Baixo
- **Problema**: ~25 arquivos de variáveis podem ficar desorganizado com crescimento
- **Impacto**: Dificuldade para encontrar onde está uma variável
- **Mitigação**: Adicionar documentação de padrão de naming; considerar geração automática de índice
- **Ação**: Quando adicionar 5+ novos tokens

## 7. Plano de Evolução

### Fase 1: Fundação (Prioritário - 1-2 meses)
- [ ] **Implementar `/data/` com estrutura JSON**
  - Criar `data/tech-glossary/` com exemplos de termos
  - Definir schema JSON (campos obrigatórios, traduções, exemplos, links)
  - Adicionar validação JSON no CI
- [ ] **Atualizar CONTRIBUTING.md** em sincronia com `/data/`
- [ ] **Integração HTML ↔ Dados** (escolher approach)
  - Opção A: SSG (11ty ou Astro) que gera páginas estáticas a partir de `/data/`
  - Opção B: Carregamento dinâmico via JS (fetch JSON + renderizar)
  - Opção C: Gerador Node.js (como build.mjs ) que cria páginas a partir de dados
- [ ] **Adicionar testes unitários** (Vitest) para componentes JS
- [ ] **Setup CI/CD completo** (GitHub Actions já existe, validar workflows)
- [ ] **Documentar schema de dados** em ARCHITECTURE.md ou docs/

### Fase 2: Funcionalidades Core (2-3 meses)
- [ ] **Sistema de Busca** em tempo real (filtro simples, depois avançado)
- [ ] **Sistema de Favoritos** (localStorage, futura sincronização com backend)
- [ ] **Flashcards interativos** (componente JS que carrega dados de `/data/`)
- [ ] **Paginação/Infinite Scroll** para glossário
- [ ] **Otimização de Assets**
  - Integrar Sharp em build para compressão de imagens
  - Implementar lazy loading em imagens
  - Minificação de JavaScript (Esbuild ou Vite)
- [ ] **Migrar FontAwesome** de CDN para npm package

### Fase 3: Escalabilidade & Experiência (3-4 meses)
- [ ] **PWA com Service Worker**
  - Offline-first (cache strategies)
  - Instalável em mobile/desktop
  - App manifest completo
- [ ] **Analytics & Monitoramento**
  - Integração com Plausible ou similar
  - Monitoramento de Web Vitals
- [ ] **Internacionalização (i18n)** básica
  - Estrutura para suportar outros idiomas (EN, ES, etc)
  - Namespace para conteúdo e UI
- [ ] **API de dados em Markdown/YAML** (alternativa a JSON)

### Fase 4: Inovação (4+ meses)
- [ ] **Quizzes & Gamificação**
  - Sistema de pontos e streaks
  - Badges de achievement
- [ ] **IA para Sugestões** de termos relacionados
- [ ] **Integração com Plataformas Educacionais**
  - Embed em LMS (Moodle, Canvas, etc)
- [ ] **Mobile App** (PWA ou nativa React Native)
- [ ] **Community Features**
  - Comentários/discussões por termo
  - Votação de tradução mais apropriada
  - Histórico de contribuições

### Fase 5: Backend & Escalabilidade Completa (6+ meses, opcional)
- [ ] **Backend Node.js/Express** para gerenciar conteúdo
  - CRUD de termos
  - Permissões de contribuidores
  - Moderation de comentários
- [ ] **Banco de dados** (PostgreSQL ou similar)
- [ ] **Admin dashboard** para gerenciar conteúdo
- [ ] **API REST pública** para terceiros consumirem dados

---

## Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Watch SCSS (reconstrói em tempo real)

# Build
npm run sass:compile    # Compila SCSS sem minificação (dev)
npm run sass:build      # Compila + minifica SCSS (produção)
npm run build:site      # Processa templates e gera pasta site/
npm run build           # Build completo (sass:build + build:site)

# Linting & Formatação
npm run lint            # ESLint em JS, JSON, Markdown
npm run lint:fix        # ESLint com auto-fix
npm run stylelint       # Stylelint em SCSS
npm run p:check         # Prettier (apenas verifica)
npm run p:write         # Prettier (formata arquivos)

# Manutenção
npm run changelog       # Atualiza CHANGELOG.md
npm run test            # Placeholder (não há testes yet)
```

## CI/CD Pipeline

1. **GitHub Actions** (`.github/workflows/build-and-deploy.yml`)
2. Para cada push em `main`:
   - Lint (ESLint + Stylelint + Prettier)
   - Build (npm run build)
   - Deploy (copia `site/` para branch `gh-pages`)
3. Site fica acessível em `https://multiversotech.github.io/`

## Decisões Arquiteturais Principais

| Decisão | Motivo | Trade-offs |
|---------|--------|-----------|
| Site estático com GitHub Pages | Simplicidade, zero custo, performance | Menos dinâmico; build time na CI |
| Sem bundler para JS | Simplicidade, sem dependências de build | Sem tree-shaking, sem transpilação |
| Dart Sass modules (`@use`/`@forward`) | Modularidade, organização | Curva de aprendizado |
| Templates com includes recursivos | Reutilização, sem engine pesado | Build e debug mais complexo |
| Design Tokens em SCSS | Escalabilidade, consistência | Acoplamento entre design e código |
| Dark mode via `data-theme` | Suporta preferência do sistema | Requer JS para toggle |

## Referências & Links

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guia de contribuição e estrutura de conteúdo
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) - Código de conduta
- [.claude/CLAUDE.md](./.claude/CLAUDE.md) - Contexto para AI helpers
- [.claude/rules/](./.claude/rules/) - Regras de código, segurança, testes
- [package.json](./package.json) - Scripts e dependências
- [README.md](./README.md) - Documentação principal do projeto

---

**Última atualização**: Abril 2026  
**Status**: Em atualização - Fase 1 em progresso</content>
<parameter name="filePath">c:\Users\marii\OneDrive\Documents\ESTUDOS-PROJETOS\MEUS_PROJETOS\multiversotech.github.io\ARCHITECTURE.md
