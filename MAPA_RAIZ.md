# Mapa da Raiz do Projeto: Issa Academy

Este arquivo foi gerado automaticamente e apresenta a estrutura de diretórios e a finalidade de cada bloco arquitetural do projeto.

```text
issa-academy/
├── 📁 .agents/
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
├── 📁 public/ # Assets estáticos públicos (Imagens, Ícones, Som)
│   └── 📁 assets/ # Imagens e mídias do mascote Fufu e curso
│       ├── 📄 Issa_Academy-Fufu.png
│       ├── 📄 fufu-acerto-aplausos.png
│       ├── 📄 fufu-acerto-esperto.png
│       ├── 📄 fufu-acerto-festa.png
│       ├── 📄 fufu-acerto-joinha.png
│       ├── 📄 fufu-acerto-palmas.png
│       ├── 📄 fufu-acerto-piscando.png
│       ├── 📄 fufu-acerto-toca-aqui.png
│       ├── 📄 fufu-batuta-expontÃ¢neo.png
│       ├── 📄 fufu-batuta.png
│       ├── 📄 fufu-caneta.png
│       ├── 📄 fufu-capa-home-pagge.png
│       ├── 📄 fufu-capa-mestre-da-clave.png
│       ├── 📄 fufu-capa-simulado.png
│       ├── 📄 fufu-casaco.png
│       ├── 📄 fufu-chapÃ©u.png
│       ├── 📄 fufu-comemorando-trofÃ©u-G-clave.png
│       ├── 📄 fufu-comemorando-trofÃ©u-gabarito.png
│       ├── 📄 fufu-erro-acontece.png
│       ├── 📄 fufu-erro-carinho.png
│       ├── 📄 fufu-erro-encorajador.png
│       ├── 📄 fufu-erro-nÃ£o-desista.png
│       ├── 📄 fufu-erro-presente.png
│       ├── 📄 fufu-erro-tapinha.png
│       ├── 📄 fufu-neutro.png
│       ├── 📄 fufu-pensativo.png
│       ├── 📄 fufu-prancheta.png
│       ├── 📄 fufu-violino.png
│       ├── 📄 fufu-Ã³culos.png
│       ├── 📄 social-home.png
│       └── 📄 social-whatsapp.png
├── 📁 src/ # Código-fonte principal da aplicação
│   ├── 📁 core/ # Lógicas globais fundamentais (Contextos, Hooks, Utils)
│   │   ├── 📁 components/
│   │   │   └── 📄 OrientationGuard.tsx
│   │   ├── 📁 contexts/ # Contextos do React para gerenciamento de estado global
│   │   │   └── 📄 MsaCourseContext.tsx
│   │   ├── 📁 hooks/ # Hooks customizados (ex: LocalStorage)
│   │   │   ├── 📄 useLocalStorage.ts
│   │   │   └── 📄 useMobileOrientation.ts
│   │   ├── 📁 utils/ # Utilitários gerais (Síntese de áudio, frequências)
│   │   │   ├── 📄 audio.ts
│   │   │   └── 📄 notesData.ts
│   │   └── 📄 types.ts
│   ├── 📁 modules/ # Módulos independentes de domínio de negócios
│   │   └── 📁 curso-msa/ # Módulo de teoria musical e simulado do MSA
│   │       ├── 📁 components/ # Componentes modulares extraídos do App.tsx
│   │       │   ├── 📄 LessonSlideshow.tsx
│   │       │   └── 📄 WelcomeHome.tsx
│   │       ├── 📁 questions/ # Banco de questões do simulado (JSONs)
│   │       │   ├── 📄 q_f01.json
│   │       │   ├── 📄 q_f02.json
│   │       │   ├── 📄 q_f03.json
│   │       │   ├── 📄 q_f04.json
│   │       │   └── 📄 q_f05.json
│   │       ├── 📄 CourseHome.tsx
│   │       ├── 📄 EndecagramaStaff.tsx
│   │       ├── 📄 MestreDaClave.tsx
│   │       ├── 📄 PianoKeyboard.tsx
│   │       ├── 📄 SimuladoMsa.tsx
│   │       ├── 📄 TheoryQuiz.tsx
│   │       └── 📄 lessonsData.ts
│   ├── 📄 App.tsx
│   ├── 📄 index.css
│   └── 📄 main.tsx
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 MAPA_RAIZ.md
├── 📄 README.md
├── 📄 ROADMAP.md
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 metadata.json
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 vite.config.ts
```

---
*Gerado automaticamente em: 02/07/2026, 16:08:13*
