import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANGELOG_PATH = path.join(__dirname, "..", "CHANGELOG.md");

// Função para obter todos os commits
function getAllCommits() {
  try {
    const output = execSync(
      'git log --pretty=format:"%h|%ad|%s|%an" --date=short',
      { encoding: "utf8" },
    );
    const lines = output.trim().split("\n");

    return lines.map((line) => {
      const [hash, date, message, author] = line.split("|");
      return { hash, date, message, author };
    });
  } catch (error) {
    console.error("❌ Erro ao obter commits:", error.message);
    return [];
  }
}

// Função para categorizar commit por tipo
function categorizeCommit(message) {
  const msg = message.toLowerCase();

  if (
    msg.startsWith("feat:") ||
    msg.startsWith("feat(") ||
    msg.startsWith("✨ feat:")
  ) {
    return "✨ Adicionado";
  } else if (
    msg.startsWith("fix:") ||
    msg.startsWith("fix(") ||
    msg.startsWith("🐛 fix:")
  ) {
    return "🐛 Corrigido";
  } else if (
    msg.startsWith("docs:") ||
    msg.startsWith("docs(") ||
    msg.startsWith("📚 docs:")
  ) {
    return "📚 Documentação";
  } else if (
    msg.startsWith("test:") ||
    msg.startsWith("test(") ||
    msg.startsWith("🧪 test:")
  ) {
    return "🧪 Testes";
  } else if (
    msg.startsWith("build:") ||
    msg.startsWith("build(") ||
    msg.startsWith("📦 build:")
  ) {
    return "📦 Alterado";
  } else if (
    msg.startsWith("perf:") ||
    msg.startsWith("perf(") ||
    msg.startsWith("⚡ perf:")
  ) {
    return "⚡ Alterado";
  } else if (
    msg.startsWith("style:") ||
    msg.startsWith("style(") ||
    msg.startsWith("💄 perf:")
  ) {
    return "💄 Estilização de interface";
  } else if (
    msg.startsWith("refactor:") ||
    msg.startsWith("refactor(") ||
    msg.startsWith("♻️ refactor:")
  ) {
    return "♻️ Refatoração";
  } else if (
    msg.startsWith("chore:") ||
    msg.startsWith("chore(") ||
    msg.startsWith("🔧 refactor:")
  ) {
    return "🔧 Manutenção";
  } else if (
    msg.startsWith("ci:") ||
    msg.startsWith("ci(") ||
    msg.startsWith("🧱 ci:")
  ) {
    return "🧱 Alterado";
  } else if (
    msg.startsWith("raw:") ||
    msg.startsWith("raw(") ||
    msg.startsWith("♻️ raw:")
  ) {
    return "🗃️ Alterado";
  } else if (
    msg.startsWith("cleanup:") ||
    msg.startsWith("cleanup(") ||
    msg.startsWith("🧹 cleanup:")
  ) {
    return "🧹 Alterado";
  } else if (
    msg.startsWith("remove:") ||
    msg.startsWith("remove(") ||
    msg.startsWith("🗑️ cleanup:")
  ) {
    return "🗑️ Exclusão";
  } else {
    return "Outros";
  }
}

// Função para agrupar commits por data
function groupCommitsByDate(commits) {
  const grouped = {};

  commits.forEach((commit) => {
    if (!grouped[commit.date]) {
      grouped[commit.date] = [];
    }
    grouped[commit.date].push(commit);
  });

  return grouped;
}

// Função para gerar o conteúdo do CHANGELOG
function generateChangelog(commits) {
  const grouped = groupCommitsByDate(commits);
  const dates = Object.keys(grouped).sort().reverse();

  let content = `# Changelog

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

`;

  // Agrupar por data
  dates.forEach((date, index) => {
    const dateCommits = grouped[date];
    const isUnreleased = index === 0;

    // Cabeçalho da versão
    if (isUnreleased) {
      content += `## [Unreleased] - ${date}\n\n`;
    } else {
      content += `## ${date}\n\n`;
    }

    // Agrupar commits por categoria
    const categories = {};
    dateCommits.forEach((commit) => {
      const category = categorizeCommit(commit.message);
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(commit);
    });

    // Ordem de preferência das categorias
    const categoryOrder = [
      "Adicionado",
      "Alterado",
      "Corrigido",
      "Documentação",
      "Refatoração",
      "Manutenção",
      "Testes",
      "Exclusão",
      "Outros",
    ];

    categoryOrder.forEach((category) => {
      if (categories[category] && categories[category].length > 0) {
        content += `### ${category}\n\n`;
        categories[category].forEach((commit) => {
          // Remove o prefixo do tipo (feat:, fix:, etc)
          let msg = commit.message.replace(
            /^(feat|fix|docs|test|build|perf|style|refactor|chore|ci|raw|cleanup|remove)(\(.+?\))?:\s*/i,
            "",
          );
          // Capitaliza primeira letra
          msg = msg.charAt(0).toUpperCase() + msg.slice(1);
          content += `- ${msg} (\`${commit.hash}\`)\n`;
        });
        content += "\n";
      }
    });

    content += "---\n\n";
  });

  // Adicionar estatísticas
  const totalCommits = commits.length;
  const contributors = [...new Set(commits.map((c) => c.author))];
  const firstCommit = commits[commits.length - 1];
  const lastCommit = commits[0];

  content += `## Estatísticas do Projeto

- **Total de commits:** ${totalCommits}
- **Período:** ${firstCommit.date} - ${lastCommit.date}
- **Contribuidores:** ${contributors.length}

### Contribuidores

${contributors.map((c) => `- ${c}`).join("\n")}

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

_Este arquivo é gerado automaticamente pelo script \`update-changelog.js\`_
`;

  return content;
}

// Função principal
function updateChangelog() {
  console.log("📝 Atualizando CHANGELOG.md...\n");

  const commits = getAllCommits();
  console.log(`✅ ${commits.length} commits encontrados\n`);

  if (commits.length === 0) {
    console.error("❌ Nenhum commit encontrado!");
    process.exit(1);
  }

  const changelogContent = generateChangelog(commits);

  fs.writeFileSync(CHANGELOG_PATH, changelogContent, "utf-8");

  console.log(`✅ CHANGELOG.md atualizado com sucesso!`);
  console.log(`📊 Total de commits: ${commits.length}`);
  console.log(`📍 Localização: ${CHANGELOG_PATH}\n`);
}

// Executar
updateChangelog();
