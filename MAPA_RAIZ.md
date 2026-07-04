# Mapa da Raiz do Projeto: Issa Academy

Este arquivo foi gerado automaticamente e apresenta a estrutura de diretórios e a finalidade de cada bloco arquitetural do projeto.

```text
issa-academy/
├── 📁 .agents/ # Configurações de agentes IA, skills especializadas e regras de projeto
│   ├── 📁 hooks/
│   │   └── 📄 run-linter.js
│   ├── 📁 rules/
│   │   ├── 📁 Always On/
│   │   │   ├── 📄 atualizacao-roadmap.md
│   │   │   ├── 📄 project-context.md
│   │   │   └── 📄 search-first.md
│   │   ├── 📁 Glob/
│   │   │   ├── 📄 code-quality.md
│   │   │   ├── 📄 design-blueprint.md
│   │   │   └── 📄 ts-rules.md
│   │   └── 📁 Model Decision/
│   │       ├── 📄 git-workflow.md
│   │       └── 📄 security.md
│   ├── 📁 skills/
│   │   ├── 📁 deploy-helper/
│   │   │   ├── 📁 scripts/
│   │   │   │   └── 📄 deploy.sh
│   │   │   └── 📄 SKILL.md
│   │   ├── 📁 map-builder/
│   │   │   ├── 📁 scripts/
│   │   │   │   └── 📄 generate-map.js
│   │   │   └── 📄 SKILL.md
│   │   ├── 📁 music-theory-core/
│   │   │   └── 📄 SKILL.md
│   │   └── 📁 rhythm-audio-engine/
│   │       └── 📄 SKILL.md
│   ├── 📄 hooks.json
│   └── 📄 mcp_config.json
├── 📁 public/ # Assets estáticos musicais, imagens e ícones do PWA
│   └── 📁 assets/
│       ├── 📄 Issa_Academy-Fufu.png
│       ├── 📄 fufu-acerto-aplausos.png
│       ├── 📄 fufu-acerto-esperto.png
│       ├── 📄 fufu-acerto-festa.png
│       ├── 📄 fufu-acerto-joinha.png
│       ├── 📄 fufu-acerto-palmas.png
│       ├── 📄 fufu-acerto-piscando.png
│       ├── 📄 fufu-acerto-toca-aqui.png
│       ├── 📄 fufu-batuta-expontaneo.png
│       ├── 📄 fufu-batuta.png
│       ├── 📄 fufu-caneta.png
│       ├── 📄 fufu-capa-home-pagge.png
│       ├── 📄 fufu-capa-mestre-da-clave.png
│       ├── 📄 fufu-capa-simulado.png
│       ├── 📄 fufu-casaco.png
│       ├── 📄 fufu-chapeu.png
│       ├── 📄 fufu-comemorando-trofeu-G-clave.png
│       ├── 📄 fufu-comemorando-trofeu-gabarito.png
│       ├── 📄 fufu-erro-acontece.png
│       ├── 📄 fufu-erro-carinho.png
│       ├── 📄 fufu-erro-encorajador.png
│       ├── 📄 fufu-erro-nao-desista.png
│       ├── 📄 fufu-erro-presente.png
│       ├── 📄 fufu-erro-tapinha.png
│       ├── 📄 fufu-neutro.png
│       ├── 📄 fufu-oculos.png
│       ├── 📄 fufu-pensativo.png
│       ├── 📄 fufu-prancheta.png
│       ├── 📄 fufu-violino.png
│       ├── 📄 social-home.png
│       └── 📄 social-whatsapp.png
├── 📁 src/ # Código-fonte da aplicação React/TypeScript
│   ├── 📁 core/ # Componentes centrais, hooks, utilitários e motor de áudio
│   │   ├── 📁 components/ # Componentes UI reutilizáveis (ex: StaffSvgEngine, OrientationGuard)
│   │   │   ├── 📄 OrientationGuard.tsx
│   │   │   ├── 📄 StaffSvgEngine.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 contexts/
│   │   │   └── 📄 MsaCourseContext.tsx
│   │   ├── 📁 hooks/
│   │   │   ├── 📄 useLocalStorage.ts
│   │   │   └── 📄 useMobileOrientation.ts
│   │   ├── 📁 utils/ # Motores lógicos e utilitários (ex: audio.ts)
│   │   │   ├── 📄 audio.ts
│   │   │   ├── 📄 notesData.test.ts
│   │   │   └── 📄 notesData.ts
│   │   └── 📄 types.ts
│   ├── 📁 modules/ # Módulos de funcionalidades do projeto
│   │   └── 📁 curso-msa/ # Trilha digital didática do MSA (slideshows, simulados e jogos)
│   │       ├── 📁 components/ # Componentes da trilha MSA (LessonSlideshow, PhaseCard, etc.)
│   │       │   ├── 📄 LessonItemRow.tsx
│   │       │   ├── 📄 LessonSlideshow.tsx
│   │       │   ├── 📄 PhaseCard.tsx
│   │       │   └── 📄 WelcomeHome.tsx
│   │       ├── 📁 content/
│   │       │   └── 📄 msaPhasesManifest.ts
│   │       ├── 📁 questions/ # Bancos de questões Zod em JSON (q_f01 a q_f05)
│   │       │   ├── 📄 q_f01.json
│   │       │   ├── 📄 q_f02.json
│   │       │   ├── 📄 q_f03.json
│   │       │   ├── 📄 q_f04.json
│   │       │   ├── 📄 q_f05.json
│   │       │   ├── 📄 schema.test.ts
│   │       │   └── 📄 schema.ts
│   │       ├── 📁 stores/ # Gerenciamento de estado global via Zustand (useQuizStore)
│   │       │   ├── 📄 useQuizStore.test.ts
│   │       │   └── 📄 useQuizStore.ts
│   │       ├── 📄 CourseHome.tsx
│   │       ├── 📄 EndecagramaStaff.tsx
│   │       ├── 📄 MestreDaClave.tsx
│   │       ├── 📄 PianoKeyboard.tsx
│   │       ├── 📄 SimuladoMsa.test.ts
│   │       ├── 📄 SimuladoMsa.tsx
│   │       ├── 📄 TheoryQuiz.tsx
│   │       └── 📄 lessonsData.ts
│   ├── 📁 test/
│   │   └── 📄 setup.ts
│   ├── 📄 App.tsx
│   ├── 📄 index.css
│   └── 📄 main.tsx
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 FLUXO_USUARIO.md # Mapa de fluxo UX e navegação
├── 📄 MAPA_RAIZ.md # Mapa arquitetural físico do projeto
├── 📄 ROADMAP.md # Controle de pendências e histórico do projeto
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 metadata.json
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
└── 📄 vitest.config.ts
```

---
*Gerado automaticamente em: 03/07/2026, 22:02:49*
