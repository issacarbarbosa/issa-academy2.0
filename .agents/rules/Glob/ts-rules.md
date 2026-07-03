---
trigger: glob
globs: *.ts, *.tsx
---

# Regras de TypeScript, React & Next.js

## Stack Padrão do Projeto
- TypeScript (Strict Mode e `"noImplicitAny": true` obrigatórios)
- React 19 (SPA) + Vite 6 + React Router v7
- Tailwind CSS v4 (Cores vibrantes)
- Zustand (Gerenciamento de estado global escalável)
- Valibot / Zod (Validação estrita de schemas para JSONs dinâmicos)

## Padrões Arquiteturais
- **Organização Modular e Subcomponentização por Feature:** A pasta `src/modules/` deve conter os domínios isolados do projeto. Cada feature (ex: `curso-msa`) é autocontida e abriga seus próprios componentes de visualização subdivididos por responsabilidade (ex: `CourseHome.tsx` delegando para `PhaseCard.tsx` e `LessonItemRow.tsx`), lógica de negócio, hooks e stores customizados (`stores/useQuizStore.ts`), tipos locais e testes.
- **Tipagem Rigorosa Sem `any`:** O uso do tipo `any` é proibido no projeto. Dados carregados externamente (como arquivos JSON de simulado) devem ser estritamente tipados ou validados no momento da importação via esquemas (Valibot/Zod).
- **Testes Unitários Co-localizados:** Todos os testes unitários (`*.test.ts` ou `*.test.tsx`) devem residir na mesma pasta que o código fonte que estão testando.


## Convenções de Nomenclatura
- Componentes: `PascalCase.tsx` (ex: `LoginForm.tsx`)
- Serviços, Utils, Config: `camelCase.service.ts` ou `camelCase.ts`
- Hooks Customizados: `use[Nome].ts` (ex: `useAuth.ts`)
- Tipos Locais: `[modulo].types.ts`
- Barrel Exports: Use `index.ts` **apenas** dentro da pasta `src/core/` para simplificar importações de componentes comuns. Evite barrel exports profundos ou circulares entre módulos.
- Path Aliases: Sempre use imports absolutos através do alias `@/` (ex: `import { Button } from '@/core/components'`).
