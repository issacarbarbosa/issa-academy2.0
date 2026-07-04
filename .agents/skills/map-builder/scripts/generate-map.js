import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../../../../');
const OUTPUT_FILE = path.join(ROOT_DIR, 'MAPA_RAIZ.md');

const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', '.gemini'];

const DESCRIPTIONS = {
  '.agents': 'Configurações de agentes IA, skills especializadas e regras de projeto',
  'public': 'Assets estáticos musicais, imagens e ícones do PWA',
  'src': 'Código-fonte da aplicação React/TypeScript',
  'src/core': 'Componentes centrais, hooks, utilitários e motor de áudio',
  'src/core/components': 'Componentes UI reutilizáveis (ex: StaffSvgEngine, OrientationGuard)',
  'src/core/utils': 'Motores lógicos e utilitários (ex: audio.ts)',
  'src/modules': 'Módulos de funcionalidades do projeto',
  'src/modules/curso-msa': 'Trilha digital didática do MSA (slideshows, simulados e jogos)',
  'src/modules/curso-msa/components': 'Componentes da trilha MSA (LessonSlideshow, PhaseCard, etc.)',
  'src/modules/curso-msa/questions': 'Bancos de questões Zod em JSON (q_f01 a q_f05)',
  'src/modules/curso-msa/stores': 'Gerenciamento de estado global via Zustand (useQuizStore)',
  'MAPA_RAIZ.md': 'Mapa arquitetural físico do projeto',
  'FLUXO_USUARIO.md': 'Mapa de fluxo UX e navegação',
  'ROADMAP.md': 'Controle de pendências e histórico do projeto'
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
  console.log('✔ MAPA_RAIZ.md atualizado com sucesso via script de varredura.');

  const UX_FILE = path.join(ROOT_DIR, 'FLUXO_USUARIO.md');
  if (!fs.existsSync(UX_FILE)) {
    console.log('✔ Arquivo FLUXO_USUARIO.md não encontrado. Criando template base...');
    fs.writeFileSync(UX_FILE, '# Mapa de Experiência e Fluxo do Usuário: Issa Academy\n\n*Aguardando atualização semântica pelo agente...*\n', 'utf8');
  } else {
    console.log('✔ FLUXO_USUARIO.md detectado. Pronto para sincronização semântica do fluxo pelo agente.');
  }
}

main();

