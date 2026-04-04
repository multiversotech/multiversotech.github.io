Analise tudo o que foi feito nesta sessão (arquivos criados, editados, decisões tomadas, padrões estabelecidos) e atualize o CLAUDE.md refletindo apenas o que mudou.

Regras:
- Não reescreva o arquivo inteiro — edite apenas as seções afetadas
- Só adicione o que é permanente e reutilizável em sessões futuras (não registre tarefas pontuais ou estado temporário)
- Se algo contradiz ou substitui uma informação existente no CLAUDE.md, atualize ou remova a informação antiga
- Se nenhuma seção precisar mudar, não faça nada e informe que o CLAUDE.md já está atualizado

Seções que podem precisar de atualização:
- **Architecture**: nova estrutura de pastas, novos padrões ou camadas
- **Commands**: novos scripts ou comandos úteis descobertos
- **Conventions**: novos padrões de nomenclatura, organização ou commit
- **Rules (Never Do)**: restrições novas que ficaram claras durante o trabalho
- **Context Files**: arquivos importantes identificados na sessão

Se as mudanças forem relevantes para as regras em `.claude/rules/`, atualize o arquivo correspondente também:
- `.claude/rules/codigo.md` — padrões de SCSS, JS ou HTML
- `.claude/rules/testes.md` — validação, testes manuais ou automáticos
- `.claude/rules/seguranca.md` — dependências, dados sensíveis, browser vs. Node
