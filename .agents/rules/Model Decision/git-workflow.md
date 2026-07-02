---
trigger: model_decision
description: Leia esta regra ao criar commits, analisar o histórico do git ou preparar Pull Requests.
---

# Regras de Git & Commits (Common)

## Padrão de Commits
- Sempre crie commits seguindo o padrão **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`, `perf:`).
- Use letras minúsculas na descrição (ex: `feat: add login page`, não `feat: Add Login Page`).
- Faça commits atômicos, pequenos e focados em apenas uma alteração lógica de cada vez.
- Evite commits genéricos como "update code" ou "bug fix".

## Geração de Pull Requests (PRs)
- Antes de criar um PR ou finalizar o desenvolvimento, analise o histórico do git completo da branch usando `git log` ou `git diff`.
- Escreva um resumo detalhado e conciso contendo as mudanças efetuadas, justificativas técnicas e um plano de teste.

## Portão de Qualidade antes do Commit (Quality Gate)
- Antes de realizar qualquer commit local ou sugerir a conclusão de uma tarefa, você DEVE rodar o seguinte Loop de Verificação no terminal para garantir a integridade do código:
  1. **Build:** `npm run build` (ou comando correspondente da stack). Garanta que compila sem erros.
  2. **Checagem de Tipos:** `npx tsc --noEmit` (TypeScript) ou `pyright .` (Python).
  3. **Linter:** `npm run lint` ou `ruff check .`.
  4. **Testes:** `npm run test` (ou comando de testes correspondente).
- Se qualquer uma das etapas falhar, você DEVE corrigir o erro antes de prosseguir com o commit ou entrega da tarefa.
