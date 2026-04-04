# Regras de Testes — Multiverso Tech

## Estado atual

Não há testes automatizados no projeto. O `package.json` tem `"test": "echo Error: no test specified"`.

O "CI local" atual é:
```bash
npm run lint          # ESLint em JS, JSON e MD
npm run sass:compile  # Valida sintaxe SCSS
npm run p:check       # Prettier
```

Execute esses três antes de commitar qualquer mudança.

---

## Quando testes forem adicionados

O ARCHITECTURE.md menciona **Vitest** como ferramenta planejada. Quando isso acontecer:

- Testes unitários cobrem funções em `src/js/` (utils, services)
- Não testar comportamento de DOM diretamente — preferir extrair lógica pura para funções testáveis
- Um arquivo de teste por arquivo de código: `theme-toggle.test.js` para `theme-toggle.js`
- Testes ficam em `src/js/__tests__/` ou ao lado do arquivo testado (a decidir quando implementar)

---

## O que não vale a pena testar agora

- Templates HTML (são estáticos, validação visual é suficiente)
- Variáveis SCSS (o `sass:compile` já valida)
- O script `build.mjs` (coberto pelo workflow de CI no GitHub Actions)

---

## Validação manual obrigatória antes de PR

- [ ] `npm run lint` passa sem erros
- [ ] `npm run sass:compile` passa sem erros
- [ ] Abrir `site/index.html` no browser e verificar visualmente
- [ ] Testar toggle de tema (light/dark) manualmente
