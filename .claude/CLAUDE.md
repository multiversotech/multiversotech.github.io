# CLAUDE.md

## Project Overview

**Multiverso Tech** é uma plataforma open-source de glossário e vocabulário técnico para a comunidade brasileira de tecnologia. Resolve o problema de falta de referência centralizada em português para termos técnicos em inglês (EN ↔ PT-BR). É um site estático hospedado no GitHub Pages, construído pela comunidade via Issues e Pull Requests.

---

## Architecture

### Estrutura de pastas

```
src/
├── assets/              # Imagens, ícones e fontes
├── templates/           # Templates HTML com diretivas de include
│   ├── partials/        # Fragmentos reutilizáveis (header, footer)
│   └── components/      # Componentes HTML independentes (tweaks-panel, etc.)
├── js/                  # JavaScript modular (ES6+, sem bundler)
│   ├── components/      # Componentes interativos (ThemeToggle, AcessoRapido)
│   ├── pages/           # Controladores por página (home, glossario, termo)
│   └── main.js          # Entry point — instancia e re-exporta componentes
└── scss/                # Design system em SASS
    ├── abstracts/
    │   ├── _variables.scss   # Tokens primitivos (tipografia, espaçamento, sombras, etc.)
    │   ├── _colors.scss      # Paleta de cores e tokens semânticos
    │   ├── _configs.scss     # Flags de comportamento global (prefixo, dark mode, transitions)
    │   ├── _functions.scss   # Funções SCSS (tint, shade, contraste)
    │   ├── _mixins.scss      # Mixins reutilizáveis
    │   ├── _breakpoints.scss # Variáveis e mapa de breakpoints
    │   └── _maps.scss        # Mapas SCSS auxiliares
    ├── base/                 # reboot, root, tipografia, helpers, grid
    ├── components/           # alert, badge, button, card, dropdown, modal, nav…
    ├── layout/               # header, footer, index-main, sidebar
    ├── pages/                # estilos por página (home, etc.)
    ├── themes/               # _dark-theme.scss, _light-theme.scss, _global.scss
    ├── _abstracts.scss       # Índice: @forward de abstracts/
    ├── _base.scss            # Índice: @forward de base/
    ├── _components.scss      # Índice: @forward de components/
    ├── _layout.scss          # Índice: @forward de layout/
    ├── _pages.scss           # Índice: @forward de pages/
    ├── _themes.scss          # Índice: @forward de themes/
    └── core-main.scss        # Entry point SCSS principal

dist/css/                # CSS compilado (gerado — não editar manualmente)
scripts/                 # Scripts de build e automação (ES Modules .mjs)
.github/workflows/       # CI/CD GitHub Actions
```

### Tecnologias principais

- **HTML5** com sistema de includes via comentários (`<!-- include:partials/header.html -->`)
- **SCSS / Dart Sass** com módulos `@use` / `@forward` (sem `@import`)
- **JavaScript ES6+** com classes e `export default` — sem bundler (sem Webpack/Vite)
- **FontAwesome 7** para ícones
- **ESLint + Prettier + Stylelint** para qualidade de código
- **Node.js** para scripts de build (`fs-extra`, `sharp`)
- **GitHub Actions** para build e deploy automático no GitHub Pages

### Padrões de design

- **SCSS inspirado no Bootstrap**: organização em abstracts / base / components, sistema de variáveis por categoria, mixins reutilizáveis
- **Tema light/dark**: tokens de cor gerenciados via `data-theme` no `<html>`, persistido em `localStorage`
- **Um arquivo JS por página/componente**: controladores de página em `src/js/pages/`, componentes interativos em `src/js/components/`
- **Templates com includes**: o script de build processa `<!-- include:partials/arquivo.html -->` recursivamente e gera a pasta `site/`

---

## Commands

```bash
# Desenvolvimento (watch SCSS)
npm run dev

# Compilar SCSS (sem minificação)
npm run sass:compile

# Compilar SCSS (minificado para produção)
npm run sass:build

# Linting JavaScript
npm run lint
npm run lint:fix

# Formatação com Prettier
npm run p:check
npm run p:write

# Linting CSS
npm run stylelint

# Atualizar CHANGELOG
npm run changelog

# Build completo (gera pasta site/)
npm run build

# Build completo para produção (SCSS minificado + site) — usado pelo CI
npm run build:full

# Validar arquivos JSON em /data
npm run validate
```

O deploy é feito automaticamente pelo GitHub Actions a cada push na branch `main` (`.github/workflows/build-and-deploy.yml`).

---

## Conventions

### SCSS

- Variáveis em kebab-case com `$` prefixo. Nomes em inglês: `$primary`, `$primary-dark`, `$font-size-base`, `$spacing-sm`
- Sempre usar `@use` e `@forward` — nunca `@import` (Dart Sass módulos)
- Adicionar novas variáveis em `src/scss/abstracts/_variables.scss`; cores vão em `src/scss/abstracts/_colors.scss`
- Cores definidas exclusivamente em `src/scss/abstracts/_colors.scss`
- Variáveis de tema escuro (dark mode) em `src/scss/themes/_dark-theme.scss`
- Flags de comportamento global (prefixo, dark mode, transitions, etc.) em `src/scss/abstracts/_configs.scss`

### JavaScript

- Um arquivo por componente ou página
- Classes ES6 com `export default NomeClasse`
- `main.js` instancia os componentes globais e re-exporta para acesso externo
- Nomes de arquivos em kebab-case: `theme-toggle.js`, `home.js`

### HTML

- Templates em `src/templates/`, partials em `src/templates/partials/`
- Includes com a diretiva: `<!-- include:partials/header.html -->`

### Commits

Padrão Conventional Commits:

| Prefixo | Uso |
|---------|-----|
| `feat:` | nova funcionalidade |
| `fix:` | correção de bug |
| `docs:` | documentação |
| `style:` | formatação, lint, espaçamento (sem lógica) |
| `refactor:` | refatoração sem mudança de comportamento |
| `content:` | adição ou edição de conteúdo (termos do glossário) |
| `build:` | scripts de build, dependências |
| `test:` | criação ou alteração de testes |
| `perf:` | melhorias de performance |
| `chore:` | configuração, pacotes, tarefas de manutenção |
| `ci:` | integração contínua e workflows |
| `raw:` | arquivos de configuração, dados, parâmetros |
| `cleanup:` | remoção de código comentado ou desnecessário |
| `remove:` | exclusão de arquivos, diretórios ou funcionalidades |

---

## Rules (Never Do)

- **Nunca editar arquivos em `dist/css/`** — são gerados pelo Sass; toda mudança vai em `src/scss/`
- **Nunca usar `@import` no SCSS** — o projeto usa Dart Sass com `@use` / `@forward`
- **Nunca usar `sharp` ou `fs-extra` em código que roda no browser** — são dependências de build only
- **Nunca hardcodar cores fora de `src/scss/abstracts/_variables.scss`** (primitivos), `src/scss/abstracts/_colors.scss` (escalas e tokens semânticos) e `src/scss/themes/` (overrides de tema)
- **Nunca criar arquivos JS fora da estrutura `src/js/`** (components/, pages/)
- **Nunca commitar `node_modules/`**, `package-lock.json` ou arquivos `.env` (listados no `.gitignore`)
- **Ao renomear classes no SCSS, sempre atualizar os templates HTML** — o build não valida correspondência entre seletores CSS e classes usadas no HTML; desincronias quebram o layout silenciosamente

---

## Context Files

Leia estes arquivos antes de começar qualquer tarefa:

- [ARCHITECTURE.md](ARCHITECTURE.md) — decisões arquiteturais e plano de evolução
- [src/scss/core-main.scss](src/scss/core-main.scss) — entry point SCSS principal
- [src/scss/abstracts/_variables.scss](src/scss/abstracts/_variables.scss) — tokens primitivos (cores base, tipografia, espaçamento, sombras, gradientes)
- [src/scss/abstracts/_colors.scss](src/scss/abstracts/_colors.scss) — sistema de cores completo
- [src/scss/themes/_dark-theme.scss](src/scss/themes/_dark-theme.scss) — overrides de tema escuro
- [src/js/main.js](src/js/main.js) — entry point do JavaScript
- [scripts/build.mjs](scripts/build.mjs) — lógica de build e geração do site
- [.github/workflows/build-and-deploy.yml](.github/workflows/build-and-deploy.yml) — pipeline de CI/CD
- [CONTRIBUTING.md](CONTRIBUTING.md) — guia de contribuição e estrutura de conteúdo
