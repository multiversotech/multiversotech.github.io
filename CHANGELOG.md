# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0//)
feat: - indica que seu trecho de código está incluindo um novo recurso (se relaciona com o MINOR do versionamento semântico).
fix: - trecho de código commitado está solucionando um problema (bug fix), (se relaciona com o PATCH do versionamento semântico).
docs: -  mudanças na documentação (Não inclui alterações em código).
test: - alterações em testes, seja criando, alterando ou excluindo testes unitários. (Não inclui alterações em código)
build: - modificações em arquivos de build e dependências.
perf: -identificar quaisquer alterações de código que estejam relacionadas a performance.
style: - alterações referentes a formatações de código, semicolons, trailing spaces, lint... **(Não inclui alterações em código).**
refactor: - mudanças devido a refatorações que não alterem sua funcionalidade
chore: - atualizações de tarefas de build, configurações de administrador, pacotes... (Não inclui alterações em código)
ci: - mudanças relacionadas a integração contínua (continuous integration).
raw: - mudanças relacionadas a arquivos de configurações, dados, features, parâmetros.
cleanup: - remover código comentado, trechos desnecessários ou qualquer outra forma de limpeza do código-fonte, visando aprimorar sua legibilidade e manutenibilidade.
remove: - exclusão de arquivos, diretórios ou funcionalidades obsoletas ou não utilizadas, reduzindo o tamanho e a complexidade do projeto e mantendo-o mais organizado.

---

## [Unreleased] - 2026-04-15

### ✨ Adicionado

- Substituir Acessibility por componente AcessoRapido (`42814bf`)

### 📦 Alterado

- Recompilar CSS após refatoração de SCSS (`adf82c9`)

### 📚 Documentação

- Atualizar arquitetura, componentes e comandos de build (`f49ce8f`)

### ♻️ Refatoração

- Adicionar tokens de fundo, texto e gradiente com prefixo correto (`cc9929a`)
- Migrar tokens para --mvt-* e adicionar estilos de nav e busca (`7e383a5`)
- Simplificar botões removendo mixins e migrando para tokens --mvt-* (`5c4b5f4`)
- Ajustar tokens de cor e renomear chaves do mapa de z-index (`1c6ba81`)

---

## 2026-04-14

### ✨ Adicionado

- Adicionar componente com sliders de fonte, espaçamento e modo contraste (`d75b590`)

### 📦 Alterado

- Atualizar CSS compilado após refatoração (`1783d0b`)
- Corrigir conflito de ajv, configurar ignores e desligar regra de label-refs (`14a7bf7`)

### 🐛 Corrigido

- Corrigir caminho do CHANGELOG.md e atualizar entradas (`c0da3ec`)

### 📚 Documentação

- Adicionar linguagem nos code blocks sem identificação (`b6e6fb4`)

### ♻️ Refatoração

- Migrar tokens para sistema de prefixo e adicionar tokens Material Design (`db109ab`)
- Atualizar base, componentes e layout (`85c9db8`)
- Atualizar tokens de cores, variáveis, mixins e funções (`cec18b7`)
- Mover grid para base, adicionar footer/index-main/global, remover link e navigation (`a0da00f`)
- Mover atualizaIcon para método da classe (`7c2caac`)

---

## 2026-04-13

### ✨ Adicionado

- Implementar header e footer e refatorar index-main (`dcfde74`)
- Implementar CSS custom properties para temas dark e light (`396cb04`)
- Popular arquivos de índice com @forward e expandir core-main.scss (`0c2881c`)

### 📦 Alterado

- Atualizar CSS compilado após refatoração dos módulos SCSS (`aebd8d6`)
- Atualizar output compilado do Sass (`ea59ba7`)

### ♻️ Refatoração

- Adicionar @use do módulo abstracts no grid (`85253b7`)
- Adicionar @use explícito do módulo abstracts em todos os componentes (`2782fbf`)
- Adicionar @use explícito, corrigir @extend !optional e refatorar utilities (`0c51055`)
- Consolidar tokens de link e nav, corrigir imports de módulos (`d3153d7`)
- Renomear _home.scss para _index.scss (`d01f26f`)
- Simplificar @use e corrigir imports em base e components (`9cdf8e1`)
- Mover paleta de cores e tokens de body para _variables.scss (`f60613c`)

### 🗑️ Exclusão

- Remover dropdown.js (`a860c00`)

---

## 2026-04-09

### 🐛 Corrigido

- Corrigir workflow e script de build para gerar site corretamente (`563da72`)
- Corrigir scripts npm e remover import não utilizado (`3cb714c`)
- Corrigir dependências @use entre arquivos abstracts (`4ef3e9c`)

### 📚 Documentação

- Atualizar ARCHITECTURE.md com nova estrutura SCSS (`54b602d`)
- Atualizar documentação interna com estrutura SCSS refatorada (`f1cfa64`)

### ♻️ Refatoração

- Migrar index.html para sistema de includes com partials (`96d882a`)
- Consolidar abstracts e reorganizar estrutura de pastas (`9f782d6`)

---

## 2026-04-04

### ✨ Adicionado

- Adicionar entry points mvt-base e mvt-components; remover mvt-variables (`0a64dc0`)
- Adicionar mixin de tipografia (`b6db292`)
- Adicionar mapas semânticos de cores por contexto (`5615bba`)
- Implementar sistema de tema escuro com variáveis e mixin (`0239c6e`)
- Adicionar entry point e módulo de helpers (`d76fde0`)
- Inicializar ThemeToggle e adicionar componente Dropdown (`0dbdacf`)
- Expandir design system com mixins, base, componentes e novos entry points (`1f860d0`)

### 📦 Alterado

- Atualizar CSS compilado com novos entry points (`1574c8e`)

### 🧱 Alterado

- Adicionar workflows GitHub Actions (`1b09a2d`)

### 🐛 Corrigido

- Corrigir compatibilidade Dart Sass e adicionar scripts de build (`423e021`)

### 📚 Documentação

- Adicionar documentação do projeto (ARCHITECTURE, CLAUDE, CONTRIBUTING, CODE_OF_CONDUCT) (`21f15c6`)

### ♻️ Refatoração

- Atualizar imports, estrutura e renomear -width-base (`f2cf5a0`)
- Renomear índices _base e _components para _core-* (`a84b764`)
- Mover pages para src/templates/ e scripts para scripts/ (`f2f7033`)

### 🔧 Manutenção

- Mover CLAUDE.md para .claude/ (`57a7de9`)
- Atualizar configurações, licença e adicionar fontes e config Claude Code (`af8f156`)
- Adicionar .claude/CLAUDE.local.md ao gitignore (`f224389`)

### 🗑️ Exclusão

- Excluir arquivos vazios legados de abstracts/configs e raiz (`573f6fa`)

### Outros

- Refactor (SCSS): reescrever os utilitários _colors e _contrast (`c2b3d2b`)

---

## 2026-04-03

### ✨ Adicionado

- Adicionar configuração ESLint para linting de JavaScript (`c2ff16a`)
- Configurar linting para SCSS com Stylelint Arquivos: stylelint.config.mjs Descrição: Adiciona configuração do Stylelint para padronizar e validar código SCSS, estendendo stylelint-config-standard. (`e19b726`)
- Adicionar script para atualização automática do changelog Arquivos: update-changelog.js Descrição: Implementa script Node.js para gerar changelog baseado em commits, categorizando por tipo (feat, fix, docs, etc.) e incluindo estatísticas do projeto. (`b27bab3`)
- Adicionar página inicial com recursos de acessibilidade (`d74ef74`)

### 📦 Alterado

- Adicionar arquivos CSS compilados (`2b656a2`)
- Adicionar package.json e dependências (`202d275`)

### 🐛 Corrigido

- Corrigir script de changelog para usar ES modules (`eca5e2d`)

### 📚 Documentação

- Atualizar CHANGELOG.md automaticamente (`6fdb859`)
- Atualizar README com instruções do projeto (`6fdf63a`)

### 🔧 Manutenção

- Configurar Prettier (`7d0401f`)
- Adicionar assets de imagem do site (`cd742c0`)
- Atualizar .gitignore e ignorar pasta dist/ (`26c7b8a`)

### Outros

-  feat: implementar sistema de design SCSS com variáveis e funções Arquivos: Todos os arquivos em abstracts (functions, variables, etc.), _theme.scss, mvt-main.scss Descrição: Adiciona a arquitetura completa do design system, incluindo variáveis de cores, tipografia, espaçamento, breakpoints, funções utilitárias (como color-contrast, calc, etc.) e configurações de tema (light/dark). (`42c7f50`)

---

## 2026-02-09

### 🔧 Manutenção

- Estruturar pastas iniciais do projeto (`5e9b89b`)

---

## 2026-02-07

### 📚 Documentação

- 📚 docs: Atualização do README (`fa25a5b`)

### Outros

- Initial commit (`667de92`)

---

## Estatísticas do Projeto

- **Total de commits:** 72
- **Período:** 2026-02-07 - 2026-04-15
- **Contribuidores:** 1

### Contribuidores

- Mariana Sena

---

## Categorias de Mudanças

- **Adicionado** - para novas funcionalidades
- **Alterado** - para mudanças em funcionalidades existentes
- **Corrigido** - para correções de bugs
- **Refatoração** - mudanças devido a refatorações que não alterem sua funcionalidade
- **Documentação** - mudanças na documentação
- **Manutenção** - tarefas de manutenção e chores
- **Testes** - adição ou modificação de testes
- **Exclusão** - exclusão de arquivos, diretórios ou funcionalidades obsoletas ou não utilizadas
- **Outros** - outras mudanças

---

_Este arquivo é gerado automaticamente pelo script `update-changelog.js`_
