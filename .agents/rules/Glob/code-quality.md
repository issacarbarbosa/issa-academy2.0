---
trigger: glob
globs: *.ts, *.tsx, *.js, *.jsx
---

# Regras de Qualidade de Código & Revisão (Common)

## Limites Rígidos de Código
- **Tamanho de Funções:** Evite funções com mais de **50 linhas** de código. Se ultrapassar, divida em funções menores e focadas com responsabilidade única.
- **Nível de Aninhamento:** Mantenha o aninhamento de blocos de controle (ifs, loops) em no máximo **4 níveis**. Use cláusulas de guarda (*early returns*) para achatar a estrutura.
- **Tamanho de Arquivos:** Arquivos de código devem ter no máximo **800 linhas**. Se passar disso, extraia módulos por responsabilidade.

## Padrões de Escrita
- **Imutabilidade:** Prefira operações imutáveis (como `map`, `filter`, `spread operator` em JS/TS, ou equivalentes em Python) em vez de mutação direta de objetos e estados.
- **Limpeza de Logs:** Remova quaisquer declarações de debug (ex: `console.log`, `print`, `debugger`) antes de finalizar a implementação.
- **Código Morto:** Nunca deixe código comentado, importações não utilizadas ou variáveis sem uso no arquivo final.

## Auto-Revisão (Auto-Review)
- Quando for solicitado a revisar o código, aplique a **Filtragem Baseada em Confiança**:
  1. Apenas reporte problemas que você tenha **mais de 80% de certeza** de que são erros reais de lógica, segurança ou performance.
  2. Ignore preferências puramente estilísticas ou estéticas, a menos que violem explicitamente as convenções do projeto.
  3. Não inunde a conversa com ruídos ou pequenas sugestões irrelevantes.
