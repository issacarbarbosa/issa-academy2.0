---
name: deploy-helper
description: Skill de automação para executar validações pré-deploy e rodar o script de deploy.
---

# Deploy Helper Skill

## Quando usar esta skill
Use esta skill quando o usuário solicitar o deploy da aplicação em produção ou homologação.

## Como usar
1. Execute a verificação de segurança (`npm run security-audit` ou similar).
2. Execute todos os testes unitários e de integração para garantir que a build está saudável.
3. Se todas as validações passarem, execute o script de deploy localizado em `.agents/skills/deploy-helper/scripts/deploy.sh`.
