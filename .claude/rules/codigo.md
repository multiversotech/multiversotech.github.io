# Regras de Código — Multiverso Tech

## SCSS

- **Sempre usar `@use` e `@forward`** — nunca `@import`. O projeto usa Dart Sass com módulos.
- **Novas variáveis** vão em `src/scss/abstracts/variables/` no arquivo da categoria correta, seguidas de registro no índice `src/scss/abstracts/_variables.scss` via `@forward`
- **Cores** são definidas exclusivamente em `src/scss/abstracts/variables/_colors.scss`. Nenhuma cor hardcoded fora desse arquivo.
- **Tokens de tema** (superfícies, textos, bordas do modo dark/light) ficam em `src/scss/abstracts/variables/_theme.scss`
- **Nunca editar `dist/css/`** — é output gerado pelo Sass. Toda mudança vai em `src/scss/`
- Nomenclatura de variáveis em português com kebab-case: `$cor-primaria-1`, `$superficie-container`, `$espacamento-base`
- Mixins de breakpoint disponíveis: `media-breakpoint-up`, `media-breakpoint-down`, `media-breakpoint-between`, `media-breakpoint-only` (em `src/scss/abstracts/mixins/_breakpoints.scss`)

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
- `node scripts/build.mjs` — gera a pasta `site/` com os templates processados
- `sharp` e `fs-extra` são dependências de build only — importar apenas em scripts Node.js
