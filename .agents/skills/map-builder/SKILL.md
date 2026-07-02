---
name: map-builder
description: Skill para gerar e atualizar o mapa da raiz do projeto (MAPA_RAIZ.md) rodando o script local de varredura.
---

# Gerador de Mapa do Projeto

Sempre que esta skill for ativada pelo usuário (quando ele solicitar para "atualizar mapa", "gerar mapa" ou similar), execute os seguintes passos:

1. Execute o comando:
   `$env:PATH = "D:\nodejs;" + $env:PATH; node .agents/skills/map-builder/scripts/generate-map.js`
2. Informe ao usuário que o arquivo [MAPA_RAIZ.md](file:///d:/Projetos/issa-academy/MAPA_RAIZ.md) foi atualizado com sucesso com a estrutura física atualizada das pastas.
