const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', chunk => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      resolve(data);
    });
    // Set a timeout so we don't hang if no stdin is provided
    setTimeout(() => resolve(data), 1000);
  });
}

async function main() {
  const input = await readStdin();
  let targetFile = '';
  
  if (input) {
    try {
      const payload = JSON.parse(input);
      if (payload.arguments && payload.arguments.TargetFile) {
        targetFile = payload.arguments.TargetFile;
      }
    } catch (e) {
      // Not a valid JSON payload
    }
  }

  // Se o arquivo existe e é TypeScript/React
  if (targetFile && fs.existsSync(targetFile) && (targetFile.endsWith('.ts') || targetFile.endsWith('.tsx'))) {
    try {
      // Injeta D:\nodejs no PATH para que o npx/node resolva os pacotes
      const env = { ...process.env, PATH: `D:\\nodejs;${process.env.PATH || ''}` };
      execSync(`npx eslint "${targetFile}" --fix`, { env, stdio: 'ignore' });
    } catch (err) {
      // Falha do ESLint é capturada para não interromper a escrita de arquivo
    }
  }

  // RETORNO OBRIGATÓRIO: JSON vazio no stdout de acordo com o contrato do Antigravity 2.0
  console.log(JSON.stringify({}));
}

main();
