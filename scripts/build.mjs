// ========================================================
// IMPORTS
// ========================================================

import fs from "fs-extra"; // Para mexer com arquivos e pastas
import path from "path"; // Para lidar com caminhos de arquivos
import { fileURLToPath } from "url";

// ========================================================
// CONFIGURAÇÃO PARA ES MODULES
// ========================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================================
// CAMINHOS DO PROJETO
// ========================================================

const templatesPath = path.resolve(__dirname, "..", "src", "templates");
const assetsPath = path.resolve(__dirname, "..", "src", "assets");
const distJsPath = path.resolve(__dirname, "..", "src", "js");
const distCssPath = path.resolve(__dirname, "..", "dist", "css");
const sitePath = path.resolve(__dirname, "..", "site");

// ==================================================================
// FUNÇÃO PRINCIPAL DO BUILD
// ==================================================================
async function build() {
  try {
    console.log("🚀 Iniciando o build...");

    // 1. Limpa a pasta 'site' e copia os 'assets', CSS compilado e JS
    await fs.emptyDir(sitePath);
    console.log('🧹 Pasta "site" limpa.');
    await fs.copy(distJsPath, path.join(sitePath, "js"));
    console.log("📜 JS copiado.");
    await fs.copy(assetsPath, path.join(sitePath, "assets"));
    console.log("📂 Assets copiados.");
    await fs.copy(distCssPath, path.join(sitePath, "css"));
    console.log("🎨 CSS copiado.");

    // 2. Montagem das páginas
    await montarPaginaSimples("index.html");

    console.log(
      "\n🎉 Build finalizado com sucesso! O Multiverso está mais completo.",
    );
  } catch (error) {
    console.error("\n" + "=".repeat(60));
    console.error("❌ ERRO NO BUILD");
    console.error("=".repeat(60));
    console.error("\nDescrição:", error.message);

    if (error.stack) {
      console.error("\nStack trace:");
      console.error(error.stack);
    }

    console.error("\n💡 Dicas de resolução:");
    console.error("  1. Verifique se todos os arquivos JSON estão válidos");
    console.error('  2. Execute "npm run validate" para checar o conteúdo');
    console.error("  3. Certifique-se de que os templates existem");
    console.error("  4. Verifique se há espaço em disco suficiente");
    console.error("\n");

    process.exit(1);
  }
}

// ==================================================================
// FUNÇÕES AUXILIARES
// ==================================================================

async function montarPaginaSimples(nomeDoArquivo) {
  console.log(`📄 Montando a página simples: ${nomeDoArquivo}`);

  // Lê o arquivo "mestre" (ex: templates/index.html)
  const templateFile = path.join(templatesPath, nomeDoArquivo);

  // Processa os includes (troca <!-- include --> pelo conteúdo real)
  let content = await fs.readFile(templateFile, "utf-8");

  content = await processIncludes(content);

  // Salva o arquivo final na pasta 'site'
  await fs.writeFile(path.join(sitePath, nomeDoArquivo), content);

  console.log(`   ✅ Página ${nomeDoArquivo} gerada com sucesso!`);
}

// Q-01: Reescrito com loop while para suportar includes aninhados (recursivos)
// Máximo de 10 passagens como proteção anti-loop infinito
async function processIncludes(content) {
  const includeRegex = /<!--\s*include:(.*?)\s*-->/g;
  let maxDepth = 10;

  while (maxDepth-- > 0) {
    const matches = [...content.matchAll(includeRegex)];
    if (matches.length === 0) break;

    for (const match of matches) {
      let includePath = match[1].trim();
      // Remove o prefixo 'templates/' se existir
      if (includePath.startsWith("templates/")) {
        includePath = includePath.substring("templates/".length);
      }
      const partialPath = path.join(templatesPath, includePath);
      const partialContent = await fs.readFile(partialPath, "utf-8");
      content = content.replaceAll(match[0], partialContent);
    }
  }

  return content;
}

// ===================================================
// EXECUTA O BUILD
// ===================================================
build();
