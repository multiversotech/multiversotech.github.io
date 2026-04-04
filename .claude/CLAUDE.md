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
│   └── partials/        # Fragmentos reutilizáveis (header, footer)
├── js/                  # JavaScript modular (ES6+, sem bundler)
│   ├── components/      # Componentes interativos (ThemeToggle, Dropdown)
│   ├── pages/           # Controladores por página (home, glossario, termo)
│   └── main.js          # Entry point — instancia e re-exporta componentes
└── scss/                # Design system em SASS
    ├── abstracts/
    │   ├── _variables.scss   # Índice: @forward de todos os sub-módulos
    │   ├── _functions.scss   # Índice: @forward de todas as funções
    │   ├── _mixins.scss      # Índice: @forward de todos os mixins
    │   ├── variables/        # Um arquivo por categoria (colors, spacing, typography…)
    │   ├── functions/        # breakpoints, calc, color-contrast, colors, map, var
    │   └── mixins/           # breakpoints, grid, utilities, etc.
    ├── base/                 # reboot, root, type, container, grid, utilities
    ├── components/           # alert, badge, button, card, dropdown, modal, nav…
    ├── _theme.scss           # Tokens de tema (superfícies, textos, bordas, light/dark)
    ├── _base.scss            # Índice de base
    ├── _components.scss      # Índice de componentes
    ├── mvt-main.scss         # Entry point SCSS principal
    ├── mvt-grid.scss         # Entry point do grid
    └── mvt-variables.scss    # Entry point de variáveis

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

# Build do site (gera pasta site/)
node scripts/build.mjs
```

O deploy é feito automaticamente pelo GitHub Actions a cada push na branch `main` (`.github/workflows/build-and-deploy.yml`).

---

## Conventions

### SCSS

- Variáveis em kebab-case com `$` prefixo. Nomes em português para o design system próprio: `$cor-primaria-1`, `$background-dark`, `$surface-container`
- Sempre usar `@use` e `@forward` — nunca `@import` (Dart Sass módulos)
- Adicionar novas variáveis nos arquivos específicos em `src/scss/abstracts/variables/` e registrar o `@forward` no índice `src/scss/abstracts/_variables.scss`
- Cores definidas exclusivamente em `src/scss/abstracts/variables/_colors.scss`
- Tokens de tema (superfícies, textos do modo dark/light) em `src/scss/abstracts/variables/_theme.scss`

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
- **Nunca hardcodar cores fora de `src/scss/abstracts/variables/_colors.scss`** e `_theme.scss`
- **Nunca criar arquivos JS fora da estrutura `src/js/`** (components/, pages/)
- **Nunca commitar `node_modules/`**, `package-lock.json` ou arquivos `.env` (listados no `.gitignore`)

---

## Context Files

Leia estes arquivos antes de começar qualquer tarefa:

- [package.json](package.json) — scripts disponíveis e dependências
- [ARCHITECTURE.md](ARCHITECTURE.md) — decisões arquiteturais e plano de evolução
- [src/scss/mvt-main.scss](src/scss/mvt-main.scss) — entry point do SCSS
- [src/scss/abstracts/_variables.scss](src/scss/abstracts/_variables.scss) — índice de variáveis
- [src/scss/abstracts/variables/_colors.scss](src/scss/abstracts/variables/_colors.scss) — sistema de cores completo
- [src/scss/_theme.scss](src/scss/_theme.scss) — tokens de tema (superfícies, textos, bordas)
- [src/js/main.js](src/js/main.js) — entry point do JavaScript
- [scripts/build.mjs](scripts/build.mjs) — lógica de build e geração do site
- [.github/workflows/build-and-deploy.yml](.github/workflows/build-and-deploy.yml) — pipeline de CI/CD
- [CONTRIBUTING.md](CONTRIBUTING.md) — guia de contribuição e estrutura de conteúdo
