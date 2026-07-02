---
trigger: model_decision
description: Leia esta regra ao lidar com autenticação, validação de inputs do usuário ou variáveis de ambiente.
---

# Regras de Segurança & Isolamento (Common)

## Isolamento de Credenciais
- NUNCA commit ou armazene chaves de API, tokens de acesso, senhas ou arquivos `.env` com dados sensíveis no repositório.
- Certifique-se de que arquivos `.env` estejam listados no `.gitignore` antes de escrever qualquer código.
- Mantenha um arquivo `.env.example` com valores fictícios/placeholders atualizado sempre que novas variáveis forem adicionadas.

## Validação e Sanitização
- Todo dado vindo do usuário (seja no frontend ou backend) DEVE ser validado estruturalmente (ex: usando Zod) antes de qualquer processamento ou persistência.
- Trate variáveis de ambiente e configurações externas com validação estrita no boot da aplicação (fail-fast) para evitar falhas silenciosas.
- Previna vulnerabilidades comuns de segurança (XSS, SQL Injection, CSRF, etc.) utilizando prepared statements, ORMs (como Prisma) e sanitização correta do output.
