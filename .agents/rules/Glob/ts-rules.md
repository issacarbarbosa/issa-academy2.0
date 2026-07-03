---
trigger: glob
globs: *.ts, *.tsx
---

# Regras de TypeScript, React & Next.js

## Stack Padrão do Projeto
- TypeScript (Strict Mode e `"noImplicitAny": true` obrigatórios)
- React 19 (SPA) + Vite 6 + React Router v7 (`<HashRouter>` e `React.lazy`)
- Progressive Web App (PWA) Offline-First (`vite-plugin-pwa` + Workbox)
- Tailwind CSS v4 (Cores vibrantes)
- Zustand (Gerenciamento de estado global escalável)
- Zod (Validação estrita de schemas para blindagem de JSONs dinâmicos em tempo de execução via `schema.ts`)
- Vitest + Testing Library (Suíte de testes unitários co-localizados rodando no ambiente JSDOM)

## Padrões Arquiteturais
- **Organização Modular e Subcomponentização por Feature:** A pasta `src/modules/` deve conter os domínios isolados do projeto. Cada feature (ex: `curso-msa`) é autocontida e abriga seus próprios componentes de visualização subdivididos por responsabilidade (ex: `CourseHome.tsx` delegando para `PhaseCard.tsx` e `LessonItemRow.tsx`), lógica de negócio, hooks e stores customizados (`stores/useQuizStore.ts`), tipos locais e testes.
- **Roteamento Declarativo e Code Splitting:** A navegação deve ser estruturada no topo em `App.tsx` via `<HashRouter>` e `<Routes>`. Todas as telas principais da SPA devem ser divididas em chunks assíncronos usando `React.lazy` com `<Suspense fallback={...}>`. Componentes de rota devem priorizar o uso de hooks (`useNavigate()`, `useLocation()`) e expor props de navegação apenas como opcionais (`onBack?: () => void`).
- **Tipagem Rigorosa e Blindagem Sem `any`:** O uso do tipo `any` é proibido no projeto. Dados carregados externamente (como arquivos JSON do simulado in `questions/*.json`) devem ser estritamente tipados e validados no momento da importação via esquemas Zod (`validateQuestionBank`), garantindo que dados malformados ou corrompidos não quebrem a UI.
- **Testes Unitários Co-localizados:** Todos os testes unitários (`*.test.ts` ou `*.test.tsx`) devem residir na mesma pasta que o código fonte que estão testando (ex: `notesData.test.ts` ao lado de `notesData.ts`, `schema.test.ts` ao lado de `schema.ts`). Todos os testes devem ser executados e validados via `npm run test` sob o framework Vitest.


## Convenções de Nomenclatura
- Componentes: `PascalCase.tsx` (ex: `LoginForm.tsx`)
- Serviços, Utils, Config: `camelCase.service.ts` ou `camelCase.ts`
- Hooks Customizados: `use[Nome].ts` (ex: `useAuth.ts`)
- Tipos Locais: `[modulo].types.ts`
- Barrel Exports: Use `index.ts` **apenas** dentro da pasta `src/core/` para simplificar importações de componentes comuns. Evite barrel exports profundos ou circulares entre módulos.
- Tipos de Componentes Core: Componentes visuais compartilhados como `StaffSvgEngine` devem exportar suas interfaces de props junto com o componente.
- Path Aliases: Sempre use imports absolutos através do alias `@/` (ex: `import { Button } from '@/core/components'`).
