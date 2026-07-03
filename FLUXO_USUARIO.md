# Mapa de Experiência e Fluxo do Usuário: Issa Academy

Este documento mapeia a arquitetura de navegação, transições de estado, abas interativas e guardas de UX (User Experience) da plataforma **Issa Academy**. Diferente do mapa de diretórios, este fluxo representa a **jornada dinâmica do estudante** navegando pela SPA (Single Page Application) e PWA Offline-First.

---

## 🗺️ Diagrama de Fluxo (Mermaid.js)

O gráfico abaixo modela a navegação declarativa via React Router (`<HashRouter>`), as máquinas de estado gerenciadas por Zustand (`useQuizStore`), e os bloqueios de UX (como o sensor de orientação para dispositivos móveis):

```mermaid
graph TD
    %% Estilos e Cores (Tailwind Palette)
    classDef route fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#ffffff,font-weight:bold,rx:8px;
    classDef modal fill:#047857,stroke:#10b981,stroke-width:2px,color:#ffffff,rx:8px;
    classDef guard fill:#b91c1c,stroke:#ef4444,stroke-width:2px,color:#ffffff,stroke-dasharray: 5 5,rx:8px;
    classDef state fill:#475569,stroke:#94a3b8,stroke-width:1px,color:#ffffff,rx:4px;

    %% Acesso Inicial
    A([🌐 Acesso / PWA App]) --> B[/"🏠 Home Principal ( / )"/]
    class B route;

    %% Banner de CTA Rápido
    B -- "CTA Topo: Continuar Estudo" --> C[/"📚 Grade do Curso ( /curso )"/]
    
    %% Navegação por Cards na Home
    B -- "Card: Curso MSA" --> C
    B -- "Card: Mestre da Clave" --> D[/"🎮 Jogo Mestre da Clave ( /mestre-da-clave )"/]
    B -- "Card: Simulado" --> E[/"📝 Simulado Oficial ( /simulado )"/]
    class C,D,E route;

    %% SUB-FLUXO: CURSO E AULAS (Com Abas Internas)
    C -- "Seleciona Fase/Item (ex: Fase 3.1)" --> F[/"🎓 Sala de Aula ( /curso/aula )"/]
    class F route;
    
    subgraph S1 ["Sala de Aula (Navegação Interna sem recarregar)"]
        F --> F1["🎬 Aba: Assistir<br>(Vídeo YouTube NetworkOnly)"]
        F --> F2["📖 Aba: Resumo Teórico<br>(Pontos Chave Offline)"]
        F --> F3["🧪 Aba: Praticar / Quiz<br>(Exercícios de Fixação)"]
        F3 -- "Se for Fase 3.1" --> F4["🎹 Slideshow Interativo<br>(Piano & Pauta Integrados)"]
    end
    class F1,F2,F3,F4 state;

    %% SUB-FLUXO: JOGO MESTRE DA CLAVE (Com Guarda de Orientação)
    subgraph S2 ["Proteção Mobile-First (Orientação)"]
        D --> G{Celular na Vertical?}
        G -- "Sim (Portrait)" --> G1["⚠️ Tela de Bloqueio:<br>'Gire seu celular para jogar'"]
        class G1 guard;
        G -- "Não / Desktop / Paisagem" --> G2["✨ Gameplay Ativo<br>(Gerador de Notas na Pauta Canvas)"]
        class G2 modal;
    end

    %% SUB-FLUXO: SIMULADO MSA (Máquina de Estados)
    subgraph S3 ["Simulado (Zustand State Machine)"]
        E --> H1["📋 Menu de Seleção<br>(Escolha de Períodos 1 ou 2)"]
        H1 -- "Iniciar Simulado" --> H2["⏳ Loading & Validação<br>(Zod blindando JSONs offline)"]
        H2 --> H3["❓ Quiz Ativo (20 Questões)<br>(Cronômetro & Reações de Áudio)"]
        H3 -- "Concluir" --> H4["🏆 Tela de Resultados<br>(Troféu Fufu, % Precisão & Revisão de Erros)"]
    end
    class H1,H2,H3,H4 state;

    %% Botões de Retorno
    F -- "Botão Voltar (useNavigate)" --> C
    D -- "Sair do Jogo" --> B
    E -- "Sair do Simulado" --> B
```

---

## 🧭 Legenda da Arquitetura de UX

| Elemento / Cor | Significado Arquitetural | Exemplo no Projeto |
| :--- | :--- | :--- |
| **🟦 Rotas da SPA (Azul)** | Telas de nível superior configuradas em `App.tsx` com `React.lazy` e Code Splitting. | `/curso`, `/simulado`, `/mestre-da-clave` |
| **🟩 Ambientes Interativos (Verde)** | Telas ou modais de alta interatividade que utilizam motores visuais ou síntese de áudio. | Gameplay do Mestre da Clave, Slideshow do Endecagrama |
| **🟥 Guardas de UX (Vermelho Tracejado)** | Bloqueios condicionais de interface que previnem experiências ruins no celular. | Componente `<OrientationGuard />` bloqueando orientação retrato na pauta |
| **⬛ Estados e Abas (Cinza)** | Sub-telas controladas por estado interno sem transição de URL na rota ativa. | Abas da Sala de Aula, Fases de carregamento do Simulado |

---
*Mapa atualizado automaticamente pela skill map-builder do agente Antigravity.*
