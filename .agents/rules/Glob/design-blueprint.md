---
trigger: glob
globs: *.tsx, *.css
---

# Regra de Design e Interface: Blueprint Visual do Issa Academy

Esta regra é "Always On" e define os padrões de paletas de cores, tipografia, bordas, animações e responsividade Mobile-First da aplicação.

---

## 🎨 Sistema de Design e Cores (Tema Claro Juicy/Duolingo)
O design é limpo, infantilizado/educativo e com cantos bem arredondados para simular um aplicativo gamificado moderno (Duolingo-like).

### Paleta Cromática
- **Fundo da Aplicação (`body`)**: `#ffffff` (Branco puro)
- **Fundo dos Cards/Superfícies**: `#f7f9fa` (Cinza azulado suave)
- **Texto Principal**: `#334155` (Slate 700) ou `#4b4b4b`
- **Texto Secundário / Labels**: `#94a3b8` (Slate 400) ou `#afafaf`
- **Bordas Físicas**: `2px solid #cbd5e1` (Slate 300) ou `#e2e8f0`

### Cores de Destaque / Identidade de Módulos
- **Azul Principal da Marca**: `#1a3c5a` (Issa Academy Deep Blue)
- **Destaque de Excelência / Ouro**: `#c5a059` (Gold/Amber)
- **Módulo Mestre da Clave**: `#1cb0f6` (Sky Blue) - para botões e cards ativos.
- **Módulo Simulado MSA**: `#58cc02` (Emerald Green) - para botões e feedbacks corretos.
- **Módulo Curso MSA**: `#ce82ff` (Soft Purple) - para cards de aulas e progresso ativo.

---

## 📐 Tipografia e Bordas
- **Fonte Principal (Sans-serif)**: `'Nunito'`, sans-serif. Deve ser usada em todos os botões, títulos e textos explicativos.
- **Fonte de Códigos e Dados (Monospace)**: `'JetBrains Mono'`, monospace. Usada para frequências, eixos e notas técnicas (ex: `261.63 Hz`).
- **Arredondamento de Cantos (Border Radius)**:
  - Cards, Modais e Botões principais: `rounded-2xl` (16px) ou `rounded-3xl` (24px).
  - Ícones e badges de status: `rounded-xl` (12px).

---

## 📱 Responsividade e Mobile-First
1. **Prioridade de Tela**: Todas as interfaces devem ser estruturadas para caberem em telas com largura mínima de `360px` sem truncar botões ou textos essenciais.
2. **Acessibilidade de Toque**: Botões interativos em celulares devem ter dimensões mínimas de `44px x 44px` de área de toque.
3. **Travas de Orientação (Landscape)**:
   - Interfaces muito largas ou complexas (pauta de 11 linhas, jogos de scrolling lateral ou teclados de piano) ficam ilegíveis na vertical em celulares.
   - O agente deve obrigatoriamente forçar o modo horizontal utilizando o `@src/core/components/OrientationGuard.tsx` para as seguintes visualizações:
     - Jogo **Mestre da Clave** (`mestre_da_clave`)
     - Player de Aulas **Slideshow** (`slideshow`)
     - Laboratório Prático **Sandbox** (`sandbox`)
   - O guarda de orientação exibe uma tela com desfoque `backdrop-blur-md` e instrução com animação de celular rotacionando.

---

## 🎬 Animações e Transições (`motion`)
- Transições de tela devem usar `<AnimatePresence>` com deslocamentos suaves no eixo Y ou X:
  - Entrada: `opacity: 0, y: 15` para `opacity: 1, y: 0`
  - Saída: `opacity: 0, y: -15`
- Feedback tátil em botões: usar efeitos ativos de encolhimento como `active:scale-[0.98]` e hover com mudança de bordas.

---

## ⚠️ Diretriz de Atualização Contínua
Sempre que você (agente) criar ou modificar estilos, paletas de cores, animações ou estruturas de layout significativas em qualquer arquivo de interface, você **tem a obrigação** de atualizar imediatamente este arquivo `.agents/rules/design-blueprint.md` para refletir o novo padrão visual do projeto.
