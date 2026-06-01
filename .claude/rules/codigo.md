# Regras de Código — Multiverso Tech

## SCSS

- **Sempre usar `@use` e `@forward`** — nunca `@import`. O projeto usa Dart Sass com módulos.
- **Novas variáveis** vão em `src/scss/abstracts/_variables.scss`; cores vão em `src/scss/abstracts/_colors.scss`
- **Cores** são definidas exclusivamente em `src/scss/abstracts/_colors.scss`. Nenhuma cor hardcoded fora desse arquivo.
- **Tokens de tema escuro** (dark mode) ficam em `src/scss/themes/_dark-theme.scss`
- **Flags de configuração global** (`$enable-dark-mode`, `$color-mode-type`, `$prefix`, transitions, etc.) ficam em `src/scss/abstracts/_configs.scss`
- **Nunca editar `dist/css/`** — é output gerado pelo Sass. Toda mudança vai em `src/scss/`
- Nomenclatura de variáveis em inglês com kebab-case: `$primary`, `$primary-dark`, `$font-size-base`, `$spacing-sm`
- Mixins de breakpoint disponíveis: `media-breakpoint-up`, `media-breakpoint-down`, `media-breakpoint-between`, `media-breakpoint-only` (em `src/scss/abstracts/_mixins.scss`, breakpoints em `_breakpoints.scss`)

## JavaScript

- **Um arquivo por componente ou página** — sem exceção
- **Padrão obrigatório**: `class NomeDoComponente { }` + `export default NomeDoComponente`
- `src/js/main.js` é o entry point: instancia componentes globais e re-exporta
- Nomes de arquivo em kebab-case: `theme-toggle.js`, `home.js`
- Nomes de variáveis e funções em inglês camelCase: `toggleTheme`, `currentPage`
- **Sem bundler** — não usar `require()`, não usar imports de node_modules no browser code
- `ThemeToggle` persiste preferência de tema em `localStorage` sob a chave `"tema"` e aplica via `data-theme` no `<html>`

## HTML

- Templates ficam em `src/templates/`, partials em `src/templates/partials/`
- Includes via diretiva: `<!-- include:partials/header.html -->`
- O script `scripts/build.mjs` processa esses includes e gera a pasta `site/`
- HTML semântico: `<nav>`, `<main>`, `<section>`, `<article>` nos lugares corretos
- Atributos `data-theme` no `<html>` controlam o tema — não usar classes no `<body>`

## Build e automação

- `npm run dev` — watch SCSS (desenvolvimento)
- `npm run sass:compile` — compila SCSS para `dist/css/` (sem minificação)
- `npm run sass:build` — compila + minifica (produção)
- `npm run build` — build completo (gera `dist/css/` e `site/`)
- `sharp` e `fs-extra` são dependências de build only — importar apenas em scripts Node.js
