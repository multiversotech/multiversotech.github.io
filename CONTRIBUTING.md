# 🤝 Guia de Contribuição

Obrigado por querer contribuir com o **Multiverso Tech**! 🚀  

O **Multiverso Tech** é um projeto construído pela comunidade, para a comunidade. Toda contribuição, não importa o tamanho, é extremamente valiosa e bem-vinda.

Este guia contém as diretrizes para garantir que o processo de contribuição seja claro, simples e organizado para todos.

Este projeto funciona no modelo **curadoria + sugestões**:  
- Você **abre uma Issue** usando os templates.  
- A equipe mantenedora (atualmente, eu 👋) valida e implementa no repositório.  

---

## 🤝 Código de Conduta

Antes de contribuir, por favor, leia nosso **[Código de Conduta](./CODE_OF_CONDUCT.md)**. Esperamos que todos os participantes sigam estas regras para mantermos um ambiente respeitoso, colaborativo e inclusivo.

---

## 🤔 Como Posso Ajudar?

Existem várias maneiras de contribuir com o projeto:
1. Sugerir um Novo Termo
2. Melhorar ou Corrigir um Termo Existente
3. Reportar um Bug ou Sugerir uma Melhoria no Site
4. Contribuir Diretamente com Código

### 💡 Sugerindo um Novo Termo

A forma mais simples de contribuir é sugerindo novos termos para o nosso glossário. Se você sentiu falta de alguma palavra ou expressão, nos avise!

1.  Vá para a seção de [**Issues**](https://github.com/multiversotech/multiversotech.github.io/issues) do nosso repositório.
2.  Clique no botão **"New issue"**.
3.  Escolha o template **"Sugestão de Termo Técnico"** ou **"Sugestão vocabulário"**.
4.  Preencha os campos solicitados: o termo em inglês, a tradução sugerida e uma breve justificativa da sua importância.
5.  Clique em **"Submit new issue"**. E pronto! Nossa equipe (no caso, Eu ([@mariisena](https://github.com/mariisena)) mesma por enquanto 😂) irá analisar a sugestão.

## ✏️ Melhorando ou Corrigindo um Termo

Encontrou um erro de digitação, uma tradução que pode ser melhorada ou uma definição que não está clara? Você pode sugerir uma correção.

1.  Vá para a seção de [**Issues**](https://github.com/multiversotech/multiversotech.github.io/issues).
2.  Clique no botão **"New issue"**.
3.  Escolha o template **"Correção de um termo existente"**.
4.  Preencha o nome do termo, o que precisa ser corrigido e a sua sugestão de melhoria.
5.  Clique em **"Submit new issue"**.

## 🐞 Reportando Bugs ou Sugerindo Melhorias

Se você encontrar algum problema no site (quando ele estiver no ar) ou tiver uma ideia para uma nova funcionalidade, siga os mesmos passos acima, mas utilize o template **[Bug Report](./.github/ISSUE_TEMPLATE/bug_report.md)** ou **[Sugestão de Melhoria](./.github/ISSUE_TEMPLATE/feature_request.md)**.

### 💻 Contribuindo com Código (Via Pull Request)

Se você se sente confortável com Git e GitHub e quer adicionar ou corrigir o conteúdo diretamente, este é o caminho!

#### Passo 1: Faça um Fork do Repositório

Clique no botão **"Fork"** no canto superior direito da página do repositório para criar uma cópia do projeto na sua própria conta do GitHub.

#### Passo 2: Clone o seu Fork

Em seu computador, clone o repositório que você acabou de "forkar":

```bash
git clone https://github.com/multiversotech/multiversotech.github.io.git
cd multiverso-tech
```

#### Passo 3: Crie uma Nova Branch
Crie uma branch específica para a sua alteração. Use um nome descritivo.

**Para adicionar um novo termo**
``git checkout -b feat/adiciona-termo-api``

**Para corrigir um termo existente**
``git checkout -b fix/corrige-definicao-framework``

#### Passo 4: Faça suas Alterações
- Agora é a hora de fazer a mágica! Adicione ou edite os arquivos de conteúdo na pasta /data.
- Estrutura de um verbete: Nossos verbetes são arquivos Json (.json ) e estão na pasta /docs/verbete
- Localização dos arquivos: Os termos do glossário ficam em data/tech-glossary/. Por exemplo, api.json ficaria em data/tech-glossary/api.json.

#### Passo 5: Faça o Commit das suas Alterações
Adicione os arquivos modificados e crie um commit com uma mensagem clara.
```bash
git add .
git commit -m "feat: Adiciona o termo API ao glossário"
(Usamos o padrão Conventional Commits para as mensagens de commit, mas não se preocupe se não seguir à risca no começo.)
```

#### Passo 6: Envie suas Alterações (Push)
Envie a sua branch para o seu fork no GitHub:
```bash
git push origin feat/adiciona-termo-api
```

#### Passo 7: Abra um Pull Request (PR)
Volte para a página do seu fork no GitHub. Você verá um aviso para abrir um Pull Request. Clique nele, preencha o template do **[Pull Request](./.github/ISSUE_TEMPLATE/PULL_REQUEST_TEMPLATE.md)** explicando o que você fez e por quê, e envie para revisão.

#### Observações:
- 📋 Padrões

  - Mensagens de Commit
    - `feat: ` nova funcionalidade
    - `fix: ` correção de bug
    - `docs: ` documentação
    - `style: ` formatação
    - `refactor: ` refatoração
    - `content: ` adição de conteúdo
    - [Para saber mais...](https://github.com/iuricode/padroes-de-commits)

- Estrutura de Arquivos JSON
Sempre valide com os templates antes de submeter.

---

### O que acontece depois?

- As sugestões serão **avaliadas** e, se aprovadas, então integrá-las ao projeto principal..  
- Você será creditado(a) na seção de [Contribuidores](/docs/contributors.md).
-
Qualquer dúvida, não hesite em abrir uma issue ou entrar em contato.

Obrigado por ajudar a construir o Multiverso Tech! 🌌

---





