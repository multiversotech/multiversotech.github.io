// ========================================================
// IMPORTS
// ========================================================

import fs from 'fs-extra'; // Para mexer com arquivos e pastas
import path from 'path';   // Para lidar com caminhos de arquivos
import { fileURLToPath } from 'url';

// ========================================================
// CONFIGURAÇÃO PARA ES MODULES
// ========================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================================
// UTILITÁRIOS
// ========================================================

// Gera slug a partir de um termo (usado futuramente no glossário)
// eslint-disable-next-line no-unused-vars
function generateSlug(termo) {
    return termo
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

// ========================================================
// CAMINHOS DO PROJETO
// ========================================================

const templatesPath = path.resolve(__dirname, '..', 'src', 'templates');
const sitePath = path.resolve(__dirname, '..', 'site');
const assetsPath = path.resolve(__dirname, '..', 'src', 'assets');
const distCssPath = path.resolve(__dirname, '..', 'dist', 'css');

// ==================================================================
// FUNÇÃO PRINCIPAL DO BUILD
// ==================================================================
async function build() {
    try {
        console.log('🚀 Iniciando o build...');

        // 1. Limpa a pasta 'site' e copia os 'assets' e o CSS compilado
        await fs.emptyDir(sitePath);
        await fs.copy(assetsPath, path.join(sitePath, 'assets'));
        await fs.copy(distCssPath, path.join(sitePath, 'dist', 'css'));
        console.log('🎨 Assets e CSS copiados.');

        // 2. Copia favicon.ico para a raiz do site
        const faviconSource = path.join(assetsPath, 'icons', 'favicon-32x32.png');
        const faviconDest = path.join(sitePath, 'favicon.ico');
        await fs.copy(faviconSource, faviconDest);
        console.log('📌 Favicon copiado.');

        // 3. Montagem das páginas
        await montarPaginaSimples('index.html');

        console.log('\n🎉 Build finalizado com sucesso! O Multiverso está mais completo.');

    } catch (error) {
        console.error('\n' + '='.repeat(60));
        console.error('❌ ERRO NO BUILD');
        console.error('='.repeat(60));
        console.error('\nDescrição:', error.message);

        if (error.stack) {
            console.error('\nStack trace:');
            console.error(error.stack);
        }

        console.error('\n💡 Dicas de resolução:');
        console.error('  1. Verifique se todos os arquivos JSON estão válidos');
        console.error('  2. Execute "npm run validate" para checar o conteúdo');
        console.error('  3. Certifique-se de que os templates existem');
        console.error('  4. Verifique se há espaço em disco suficiente');
        console.error('\n');

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
    let conteudo = await fs.readFile(templateFile, 'utf-8');
    conteudo = await processIncludes(conteudo);

    // Salva o arquivo final na pasta 'site'
    await fs.writeFile(path.join(sitePath, nomeDoArquivo), conteudo);

    console.log(`   ✅ Página ${nomeDoArquivo} gerada com sucesso!`);
}

// Substitui <!-- include:arquivo.html --> de forma RECURSIVA
async function processIncludes(content) {
    const includeRegex = /<!--\s*include:(.*?)\s*-->/g;
    const matches = [...content.matchAll(includeRegex)];

    for (const match of matches) {
        let includePath = match[1].trim();
        // Remove o prefixo 'templates/' se existir
        if (includePath.startsWith('templates/')) {
            includePath = includePath.substring('templates/'.length);
        }
        const partialPath = path.join(templatesPath, includePath);
        const partialContent = await fs.readFile(partialPath, 'utf-8');
        content = content.replace(match[0], partialContent);
    }
    return content;
}

// ===================================================
// EXECUTA O BUILD
// ===================================================
build();