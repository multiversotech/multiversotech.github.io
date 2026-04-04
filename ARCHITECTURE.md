# Arquitetura do Projeto Multiverso Tech

## 1. Visão Geral

O **Multiverso Tech** é uma plataforma open-source colaborativa para glossário e vocabulário técnico, focada em traduções EN ↔ PT para a comunidade brasileira de tecnologia.

### Stack Tecnológica
- **Frontend**: HTML5, CSS3 (SASS), JavaScript (ES6+)
- **Build**: Sass CLI, ESLint, Prettier, Stylelint
- **Assets**: FontAwesome, Bootstrap, Sharp (otimização de imagens)
- **Deploy**: GitHub Pages (estático)
- **Ferramentas**: Node.js, npm

### Estrutura de Diretórios
```
src/
├── assets/          # Imagens, ícones, fontes
├── components/      # Componentes HTML reutilizáveis
├── js/             # JavaScript modular
│   ├── components/ # Componentes JS
│   ├── pages/      # Lógica por página
│   ├── services/   # Camada de dados
│   └── utils/      # Utilitários
├── pages/          # Páginas HTML
├── scss/           # Estilos SASS
└── scripts/        # Scripts de build/automação

data/               # Dados do glossário/vocabulário
public/             # Assets públicos
dist/               # Build output
```

## 2. Objetivos Arquiteturais

- **Manutenibilidade**: Estrutura modular para facilitar contribuições
- **Performance**: Otimização de assets e carregamento eficiente
- **Acessibilidade**: Suporte a leitores de tela e navegação por teclado
- **Escalabilidade**: Capacidade de crescimento do conteúdo sem refatoração massiva
- **Colaboratividade**: Baixo acoplamento entre conteúdo e apresentação

## 3. Camadas da Aplicação

### 3.1 Content Layer (Conteúdo)
**Responsabilidades**: Gerenciamento de dados e geração de páginas
- `data/`: JSON/Markdown com termos e vocabulário
- `src/pages/`: Templates HTML estáticos
- `scripts/`: Automação de atualização (changelog, validação)

### 3.2 Presentation Layer (Apresentação)
**Responsabilidades**: Interface visual e experiência do usuário
- `src/scss/`: Sistema de design modular (variáveis, mixins, componentes)
- `src/components/`: Componentes HTML reutilizáveis (header, footer)
- `dist/css/`: CSS compilado e minificado

### 3.3 Application Layer (Aplicação)
**Responsabilidades**: Lógica de negócio e interatividade
- `src/js/pages/`: Controladores por página (home, glossario, termo)
- `src/js/components/`: Componentes interativos (dropdown, theme-toggle)
- `src/js/services/`: Acesso a dados e APIs
- `src/js/utils/`: Funções utilitárias

### 3.4 Infrastructure Layer (Infraestrutura)
**Responsabilidades**: Build, deploy e qualidade
- `package.json`: Scripts de build e dependências
- CI/CD: GitHub Actions para lint, build e deploy
- Ferramentas: ESLint, Stylelint, Prettier

## 4. Fluxo de Dados

### 4.1 Build Time
1. **SCSS → CSS**: `src/scss/main.scss` → `dist/css/main.min.css`
2. **Assets**: Otimização de imagens com Sharp
3. **Linting**: Validação de código e estilos

### 4.2 Runtime
1. **Navegação**: Usuário acessa página (ex: `/glossario.html`)
2. **Carregamento**: JS carrega dados do `data/` ou APIs
3. **Interação**: Componentes atualizam DOM (busca, filtros, temas)
4. **Estado**: Gerenciamento local de favoritos/flashcards (futuro)

### 4.3 Contribuição
1. **Edição**: Contribuidor edita `data/` ou `src/`
2. **Validação**: Pre-commit hooks executam lint
3. **Build**: CI gera artefatos para deploy
4. **Deploy**: GitHub Pages atualiza site automaticamente

## 5. Padrões e Práticas

### 5.1 CSS/SCSS
- **Metodologia**: BEM-like com modificadores
- **Organização**: 7 camadas (abstracts/base/components/layout/pages/themes/utils)
- **Temas**: Variáveis CSS custom properties para light/dark mode
- **Mixins**: Reutilização de padrões (breakpoints, spacing, colors)

### 5.2 JavaScript
- **Modularidade**: Um arquivo por página/componente
- **Padrões**: Funções puras, destructuring, arrow functions
- **Eventos**: Delegação para performance
- **Acessibilidade**: Focus management e ARIA labels

### 5.3 HTML
- **Semântica**: Uso correto de headings, sections, nav
- **Performance**: Lazy loading para imagens
- **SEO**: Meta tags e structured data

### 5.4 Qualidade
- **Linting**: ESLint + Stylelint obrigatórios
- **Formatação**: Prettier para consistência
- **Commits**: Conventional commits
- **Testes**: Unitários para utils/services (futuro)

## 6. Riscos Conhecidos

### 6.1 Escalabilidade de Conteúdo
- **Problema**: Páginas HTML estáticas hardcoded
- **Impacto**: Dificuldade em adicionar termos em massa
- **Mitigação**: Migrar para SSG (11ty/Astro) + templates

### 6.2 Build JavaScript
- **Problema**: Sem minificação/transpilação de JS
- **Impacto**: Bundle grande, sem tree-shaking
- **Mitigação**: Adicionar Vite ou Webpack básico

### 6.3 Testes Ausentes
- **Problema**: Sem cobertura de testes automatizados
- **Impacto**: Regressões em funcionalidades críticas
- **Mitigação**: Implementar Vitest + Cypress

### 6.4 Dependências Node no Frontend
- **Problema**: `sharp` e `fs-extra` não rodam no browser
- **Impacto**: Scripts de build podem falhar
- **Mitigação**: Isolar uso em scripts de build apenas

## 7. Plano de Evolução

### Fase 1: Fundamentos (1-2 meses)
- [ ] Adicionar testes unitários (Vitest)
- [ ] Implementar CI/CD completo
- [ ] Migrar para SSG básico (11ty)
- [ ] Documentar APIs de dados

### Fase 2: Funcionalidades (3-4 meses)
- [ ] Sistema de flashcards
- [ ] PWA com service worker
- [ ] Busca avançada com filtros
- [ ] Sistema de favoritos

### Fase 3: Escalabilidade (5-6 meses)
- [ ] Migração completa para SSG
- [ ] API REST para dados
- [ ] Analytics e monitoramento
- [ ] Internacionalização (i18n)

### Fase 4: Inovação (7+ meses)
- [ ] IA para sugestões de termos
- [ ] Gamificação (quizzes, streaks)
- [ ] Integração com plataformas educacionais
- [ ] Mobile app nativo

## 8. Referências

- [Guia de Contribuição](/CONTRIBUTING.md)
- [Documentação de Debug](docs/DEBUGGING.md)
- [README Principal](/README.md)
- [Package.json](/package.json)

---

*Última atualização: Abril 2026*</content>
<parameter name="filePath">c:\Users\marii\OneDrive\Documents\ESTUDOS-PROJETOS\MEUS_PROJETOS\multiversotech.github.io\ARCHITECTURE.md
