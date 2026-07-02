# Roadmap de Desenvolvimento: Issa Academy

Este documento detalha o progresso atual da plataforma e serve como controle de pendências para o desenvolvedor humano e agentes de IA.

---

## 🛠️ Progresso Geral do Projeto

### 1. Infraestrutura, Configurações e Hooks
- [x] Alinhamento com o Template Padrão de Projetos (`.agents/`)
- [x] Limpeza de arquivos de legado e duplicações (removido `issa-academy-main/`)
- [x] Migração de assets de imagem para `public/assets/` (correção de build do Vite)
- [x] Conversão dos bancos de questões de JavaScript para JSON (`q_f01.json` a `q_f05.json`)
- [x] Configuração do ESLint no projeto
- [x] Implementação de Hooks e Linter Otimizado por arquivo (`run-linter.js` em `PostToolUse`)
- [x] Adaptação Mobile-First e sensor de orientação (`OrientationGuard.tsx`) nas telas musicais


### 2. Módulo: Mestre da Clave (Jogo)
- [x] Mecânica central em React + Canvas (geração de notas, nível, vidas, recorde)
- [x] Leitura de notas na Clave de Sol (Fase 1 e Fase 2)
- [ ] Implementação de seleção de Claves (Clave de Fá e Clave de Dó)
- [ ] Rever a estrutura de dificuldade dos níveis


### 3. Módulo: Simulado MSA (Questões)
- [x] Mecânica central (20 questões aleatórias, cronômetro, revisão e feedbacks em áudio/sticker)
- [x] Banco de Questões do Período 1 (Fases 1, 2 e 3)
- [x] Banco de Questões do Período 2 (Fases 4 e 5)
- [ ] Bancos de Questões dos Períodos 3 e 4 (Fases 6 a 16)

### 4. Módulo: Curso MSA Digital (Trilha Didática)
- [x] Dashboard do Curso (grade interativa contendo as 16 Fases de ensino)
- [x] **Fase 1 - Teoria Geral**: Estudo teórico das propriedades do som (altura, intensidade, duração, timbre)
- [x] **Fase 2 - Teoria Rítmica**: Estudo das figuras musicais, compasso e uso do metrônomo

- [/] **Fase 3 - O Endecagrama**:
  - [x] Item 3.1: Aula em Slides interativos (Dó3 Central, claves alinhadas)
  - [x] Item 3.1: Teclado e Pauta interativa integrados nos Slides de Aula
  - [x] Item 3.1: Exercícios e Quiz locais
  - [ ] Item 3.2 a 3.4: Solfejo e movimentos gráficos de condução em 4 tempos (French curves)
- [ ] **Fase 4 - Fundamentos Rítmicos**: Ligadura, ponto de aumento, intervalo, compassos em 2 e 3, e movimentos de condução em 2 e 3 tempos.
- [ ] **Fase 5 - Subdivisões**: Tercinas, Fermata, compasso e movimentos de solfejo em 6 tempos.
- [ ] **Fase 6 a 16**: (Escalas maiores com sustenidos/bemóis, armadura de clave, tonalidades, repetições, dinâmica, compasso composto, síncopa/contratempo, ritmos iniciais, andamento e interpretação).

---

## 📈 Histórico de Alterações Recentes
- **2026-06-30**: Auditoria estrutural. Limpeza do subprojeto `issa-academy-main`. Correção de rotas de assets de `/issa-academy-main/assets/` para `/assets/`. Instalação local de pacotes de desenvolvimento. Conversão do banco de simulados para JSON de carregamento assíncrono.
- **2026-06-30 (II)**: Modularização do `App.tsx` extraindo `WelcomeHome.tsx`, `LessonSlideshow.tsx` e `SandboxExplorer.tsx` (código reduzido para ~200 linhas). Configuração do ESLint e do hook `run-linter.js` (PostToolUse) baseado em comunicação JSON. Criação das regras Always On (`project-context.md`, `design-blueprint.md`, `atualizacao-roadmap.md`) e das skills especializadas (`music-theory-core`, `rhythm-audio-engine` com mapeamento vetorial SVG de solfejo). Remoção da pasta residual `assets/` da raiz.
- **2026-06-30 (III)**: Adaptação de layout responsivo Mobile-First na vertical e criação do hook `useMobileOrientation.ts` / componente `OrientationGuard.tsx` para forçar rotação horizontal em telas de pauta complexa (Mestre da Clave, Slideshow de aula e Sandbox).
- **2026-06-30 (IV)**: Otimização de layout mobile landscape no jogo Mestre da Clave: implementamos a combinação da **Opção 1** (ocultar teclado fora do gameplay) com a **Opção 3** (layout responsivo Split-Screen em duas colunas `flex-row` para telas horizontais). Os cards de menu agora ocupam apenas 160px de altura vertical, garantindo encaixe 100% livre de scroll.
- **2026-06-30 (V)**: Remoção total do módulo de visualização Explorar Sandbox (SandboxExplorer) e do InteractiveTheory do projeto. Componentes compartilhados como TheoryQuiz, EndecagramaStaff e PianoKeyboard foram mantidos intactos e continuam operando ativamente na LessonSlideshow.
- **2026-06-30 (VI)**: Implementação de correções de UX/UI baseadas em auditoria móvel. Ocultamos o cabeçalho global em mobile landscape (ganho de 70px de altura de tela útil), corrigimos o Fufu cortado no simulado vertical com recuo seguro, ampliamos a área de toque dos botões do curso para 44px (padrão WCAG) e adicionamos indicador de scroll "Role para ver mais" na Home horizontal.
- **2026-06-30 (VII)**: Implementação do Sistema Híbrido de Aulas do Curso MSA. Criamos a base de dados de aulas (`lessonsData.ts`) integrando videoaulas do YouTube do professor. Desenvolvemos a interface de 3 abas por lição (Assistir, Resumo, Praticar) na grade do curso, com quizzes interativos de fixação e o slideshow da Fase 3.1. O banner superior "Ativo Atualmente" agora busca dinamicamente o primeiro item pendente do aluno. Ocultamos também o cabeçalho global em modo paisagem baseado em altura de tela (`max-height: 500px`).

## 📋 Tarefas Pendentes
- [ ] **Correção do Player de Vídeo no Retrato (Mobile)**: Investigar por que os botões de pause, play e tela cheia do iframe do YouTube não respondem a cliques/toques no dispositivo real na orientação retrato, e implementar a correção.

