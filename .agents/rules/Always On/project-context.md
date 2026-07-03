# Regra de Contexto do Projeto: Issa Academy (GEM CCB)

Esta regra é "Always On" e define o escopo, as restrições arquiteturais, a stack de software, o motor de áudio e a política de testes do projeto.

---

## 🎯 Objetivo do Projeto
O **Issa Academy** é uma plataforma educacional gamificada de ensino musical voltada para o método **MSA (Método Simplificado de Aprendizagem Musical)** da Congregação Cristã no Brasil (CCB), com foco na preparação de candidatos a músicos e organistas.

---

## 🛠️ Stack Tecnológica
- **Framework**: React 19 (SPA puramente frontend) + Vite 6
- **Estilos**: Tailwind CSS v4 (Light theme, cores "juicy" vibrantes)
- **Animações**: Motion / Framer Motion
- **Sons**: Web Audio API (Síntese acústica dinâmica em tempo de execução)
- **Tipagem**: TypeScript (Strict Mode e checagem sem `implicitAny`)
- **Arquitetura**: Estado global de quiz via Zustand (`useQuizStore`), desmembramento modular de telas curriculares (`PhaseCard`, `LessonItemRow`, manifesto de 16 fases em `msaPhasesManifest.ts`). Em adoção: roteamento declarativo (React Router v7), offline-first PWA e validação de schema JSON (Valibot/Zod).

---

## 📁 Leis de Arquitetura e Organização de Código
O projeto segue o padrão monorepo dividido em `core` e `modules`. O agente deve respeitar estritamente estas fronteiras ao criar ou editar arquivos:

### 1. Fronteira `src/core/`
- **Regra:** Aqui residem APENAS lógicas globais e fundamentais. O agente NUNCA deve criar componentes de interface (UI) neste diretório.
- **Conteúdo permitido:** Provedores de estado global (`stores/` e `contexts/`), hooks utilitários (`hooks/`), lógicas de áudio/frequência (`utils/`), motores visuais reutilizáveis (`engine/` / `components/`), tipagens globais e componentes de controle (como guards de orientação).

### 2. Fronteira `src/modules/`
- **Regra:** Domínios de negócio isolados e interfaces do usuário vivem aqui.
- **Diretiva para o Curso MSA:** Todo o ecossistema didático do método MSA fica isolado em `src/modules/curso-msa/`.
- **Diretiva de Banco de Dados Local:** O agente deve ler e criar bancos de dados do simulado exclusivamente como arquivos JSON dentro do subdiretório `src/modules/curso-msa/questions/`, devidamente tipados e validados por schema.

---

## 🔊 Restrições do Motor de Áudio (Web Audio API)
Os sons de notas e instrumentos virtuais são sintetizados em tempo real, baseados nas lógicas presentes em `@src/core/utils/audio.ts` e `@src/core/utils/notesData.ts`.
**Sempre que o agente criar ou modificar a síntese de áudio, deve respeitar:**
1.  **Timbre:** Utilizar obrigatoriamente osciladores com onda **triangle** combinada com filtros passa-baixa (lowpass filter em `1000Hz`) para criar um som de órgão eletrônico quente e suave. **Evite ondas senoidais agressivas ou dentes de serra puros sem filtro.**
2.  **Envelope:** Implementar sempre um envelope **ADSR** (Attack, Decay, Sustain, Release) para evitar estalos (clicks) de som ao ligar/desligar notas, garantindo fade-in e fade-out suaves.
3.  **Consumir Motor Único:** Telas interativas e minijogos (ex.: Mestre da Clave) DEVEM importar funções de áudio de `audio.ts`, sendo proibido recriar contextos de Web Audio ou osciladores ad-hoc dentro dos componentes React.


---

## 📱 Política de Testes e Validação Mobile-First
Para garantir a melhor experiência responsiva, toda validação visual do agente no navegador deve respeitar a ordem Mobile-First:
1. **Mobile Portrait (390x844px)**: Testar o encaixe vertical da Home, Simulado e a ativação bloqueante do guarda de orientação em views horizontais.
2. **Mobile Landscape (844x390px)**: Testar as telas musicais e jogos na orientação horizontal (após simulação de rotação do aparelho).
3. **Desktop (1280x800px)**: Testar a adaptação final para monitores grandes.
