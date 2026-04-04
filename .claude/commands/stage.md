Analise o estado atual do repositório:
1. Rode `git status` para ver todos os arquivos modificados
2. Rode `git diff` para entender o que mudou em cada arquivo

Com base nisso:
- Sugira quais arquivos fazem sentido ser staged juntos (agrupe por contexto)
- Para cada grupo, sugira a mensagem de commit compatível com o update-changelog.js

Tipos aceitos:
- feat: nova funcionalidade
- fix: correção de bug
- docs: mudanças na documentação
- test: criação ou alteração de testes
- build: modificações em arquivos de build e dependências
- perf: melhorias de performance
- style: formatação, lint, espaçamento (sem lógica)
- refactor: refatoração sem alterar funcionalidade
- chore: configuração, pacotes, tarefas de build
- ci: integração contínua
- raw: arquivos de configuração, dados, parâmetros
- cleanup: remoção de código comentado ou desnecessário
- remove: exclusão de arquivos, diretórios ou funcionalidades

Formato: tipo(escopo opcional): descrição curta em português

Apresente os grupos e as sugestões. Aguarde minha confirmação para cada grupo antes de fazer qualquer git add ou commit.