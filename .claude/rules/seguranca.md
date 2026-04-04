# Regras de Segurança — Multiverso Tech

## Dependências Node.js no browser

`sharp` e `fs-extra` são listados em `dependencies` mas **só funcionam em Node.js**.

- **Nunca importar `sharp` ou `fs-extra` em código que roda no browser** (`src/js/`)
- Uso permitido apenas em: `scripts/`, `build/`, qualquer arquivo executado via `node`
- Se precisar manipular arquivos no browser, usar a File API nativa

---

## JavaScript no browser

- **Nunca usar `innerHTML` com conteúdo que veio de fora** (URL params, dados externos, input do usuário)
- Usar `textContent` para inserir texto, `createElement` para inserir elementos
- O projeto é estático: não há backend, não há autenticação — não adicionar dependências que assumam um servidor

---

## Arquivos que nunca devem ser commitados

Já estão no `.gitignore`, mas vale reforçar:

- `.env` e `.env.local` — variáveis de ambiente
- `package-lock.json` — explicitamente ignorado neste projeto
- `node_modules/`
- `my-notes.md` — anotações pessoais (listado no `.gitignore`)
- `.claude/CLAUDE.local.md` — preferências pessoais

---

## Dependências externas

- Não adicionar dependências novas sem avaliar se são necessárias no browser ou só no build
- FontAwesome 7 é carregado via npm (`@fortawesome/fontawesome-free`) — não via CDN externo
- Não incluir scripts de terceiros via `<script src="...">` em templates sem revisar o conteúdo

---

## GitHub Actions

- O workflow `build-and-deploy.yml` tem permissão `contents: write` — não alterar essas permissões sem necessidade
- O deploy publica a pasta `site/` inteira — garantir que nenhum arquivo sensível caia nessa pasta via o script de build
