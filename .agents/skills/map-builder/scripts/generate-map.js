import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../../../../');
const OUTPUT_FILE = path.join(ROOT_DIR, 'MAPA_RAIZ.md');

const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', '.gemini'];

// Descrições padronizadas das pastas chaves do projeto
const DESCRIPTIONS = {
  'src': 'Código-fonte principal da aplicação',
  'src/core': 'Lógicas globais fundamentais (Contextos, Hooks, Utils)',
  'src/core/contexts': 'Contextos do React para gerenciamento de estado global',
  'src/core/hooks': 'Hooks customizados (ex: LocalStorage)',
  'src/core/utils': 'Utilitários gerais (Síntese de áudio, frequências)',
  'src/core/styles': 'Arquivos de estilo global',
  'src/modules': 'Módulos independentes de domínio de negócios',
  'src/modules/curso-msa': 'Módulo de teoria musical e simulado do MSA',
  'src/modules/curso-msa/components': 'Componentes modulares extraídos do App.tsx',
  'src/modules/curso-msa/questions': 'Banco de questões do simulado (JSONs)',
  'public': 'Assets estáticos públicos (Imagens, Ícones, Som)',
  'public/assets': 'Imagens e mídias do mascote Fufu e curso',
};

function getFolderTree(dirPath, relativePath = '', prefix = '') {
  let markdown = '';
  const items = fs.readdirSync(dirPath);

  const dirs = [];
  const files = [];

  for (const item of items) {
    if (EXCLUDE_DIRS.includes(item)) continue;
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      dirs.push(item);
    } else {
      files.push(item);
    }
  }

  dirs.sort();
  files.sort();

  const allItems = [
    ...dirs.map(d => ({ name: d, isDir: true })),
    ...files.map(f => ({ name: f, isDir: false }))
  ];

  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    const isLast = i === allItems.length - 1;
    const currentRelPath = relativePath ? `${relativePath}/${item.name}` : item.name;
    const itemPrefix = isLast ? '└── ' : '├── ';
    const description = DESCRIPTIONS[currentRelPath] ? ` # ${DESCRIPTIONS[currentRelPath]}` : '';

    if (item.isDir) {
      markdown += `${prefix}${itemPrefix}📁 ${item.name}/${description}\n`;
      const nextPrefix = isLast ? '    ' : '│   ';
      markdown += getFolderTree(path.join(dirPath, item.name), currentRelPath, prefix + nextPrefix);
    } else {
      markdown += `${prefix}${itemPrefix}📄 ${item.name}${description}\n`;
    }
  }

  return markdown;
}

function main() {
  const tree = getFolderTree(ROOT_DIR);

  const content = `# Mapa da Raiz do Projeto: Issa Academy

Este arquivo foi gerado automaticamente e apresenta a estrutura de diretórios e a finalidade de cada bloco arquitetural do projeto.

\`\`\`text
issa-academy/
${tree}\`\`\`

---
*Gerado automaticamente em: ${new Date().toLocaleString('pt-BR')}*
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
}

main();
