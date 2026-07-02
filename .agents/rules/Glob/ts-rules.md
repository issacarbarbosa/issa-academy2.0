---
trigger: glob
globs: *.ts, *.tsx
---

# Regras de TypeScript, React & Next.js

## Stack Padrão (Exemplo)
- TypeScript (Strict Mode)
- Next.js (App Router) ou Vite + React Router
- CSS Modules ou TailwindCSS (se explicitamente solicitado)
- Prisma / Drizzle ORM

## Padrões Arquiteturais
- **Organização Modular por Feature:** A pasta `src/modules/` deve conter os domínios isolados do projeto. Cada feature (ex: `auth`, `users`) é autocontida e abriga seus próprios componentes de visualização, lógica de negócio (services), hooks customizados, tipos locais e testes.
- **Thin App Layer (Next.js):** Se o projeto usar Next.js App Router, a pasta `src/app/` deve atuar apenas como uma "camada fina de roteamento". Ela não deve conter lógica complexa, regras de negócio ou chamadas de banco. Os arquivos de rotas devem apenas importar e renderizar componentes da pasta `src/modules/`.
- **Testes Unitários Co-localizados:** Todos os testes unitários (`*.test.ts` ou `*.test.tsx`) devem residir na mesma pasta que o código fonte que estão testando.

## Convenções de Nomenclatura
- Componentes: `PascalCase.tsx` (ex: `LoginForm.tsx`)
- Serviços, Utils, Config: `camelCase.service.ts` ou `camelCase.ts`
- Hooks Customizados: `use[Nome].ts` (ex: `useAuth.ts`)
- Tipos Locais: `[modulo].types.ts`
- Barrel Exports: Use `index.ts` **apenas** dentro da pasta `src/core/` para simplificar importações de componentes comuns. Evite barrel exports profundos ou circulares entre módulos.
- Path Aliases: Sempre use imports absolutos através do alias `@/` (ex: `import { Button } from '@/core/components'`).
