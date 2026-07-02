---
name: music-theory-core
description: Habilidade com regras de teoria musical do MSA, escalas, armaduras de clave e subdivisão rítmica de Bona.
---

# Habilidade de Teoria Musical - MSA & Bona

Esta skill orienta o agente na lógica musical e nas regras teóricas utilizadas na criação de aulas e questões do Simulado.

---

## 1. Alturas e Notas do Endecagrama
A pauta interativa abrange notas desde os registros graves da Tuba (Ledger lines do Clave de Fá) até os registros agudos do Soprano/Violino (Clave de Sol).

- **Oitava de Referência**: O sistema utiliza a notação científica brasileira:
  - **Dó3 (Dó Central)**: Ponto de articulação entre as Claves de Sol e Fá. Frequência de `261.63 Hz`.
  - **Lá3**: `220.00 Hz` (Fase 1.3).
  - **Lá4**: `440.00 Hz` (Padrão de afinação internacional).

---

## 2. Figuras Rítmicas e Proporções (Fase 2)
Na divisão musical (Bona), cada figura tem um valor relativo com base na Semibreve como unidade padrão de divisão:

| Figura | Nome | Valor Proporcional | Descrição do MSA |
|---|---|---|---|
| 𝅝 | Semibreve | 1 | Valor máximo de duração em compassos simples |
| 𝅗𝅥 | Mínima | 1/2 | Metade da Semibreve |
| 𝅘𝅥 | Semínima | 1/4 | Metade da Mínima |
| 𝅘𝅥𝅮 | Colcheia | 1/8 | Metade da Semínima |
| 𝅘𝅥𝅯 | Semicolcheia | 1/16 | Metade da Colcheia |
| 𝅘𝅥𝅰 | Fusa | 1/32 | Metade da Semicolcheia (pouco usada no GEM) |

### Ponto de Aumento (Fase 4.2)
- Um ponto de aumento adiciona metade do valor da figura original: \(V_{final} = V + \frac{V}{2}\).
- Dois pontos (duplamente pontuada) adicionam mais um quarto do valor original: \(V_{final} = V + \frac{V}{2} + \frac{V}{4}\).

---

## 3. Compassos, Divisão e Subdivisão (Fase 2, 7 e 11)
- **Compasso Simples**: A unidade de tempo é uma figura simples (ex: compasso 2/4, 3/4, 4/4). O denominador define a figura da pulsação (4 = Semínima).
- **Compasso Composto**: A unidade de tempo é uma figura pontuada (divisível por 3 - ex: compasso 6/8, 9/8, 12/8). O denominador define a figura da subdivisão (8 = Colcheia, sendo 3 colcheias por pulsação).
- **Subdivisão (Bona)**: No solfejo de Bona, os exercícios rítmicos são subdivididos mentalmente em partes iguais (TÁ-TE para compasso simples e TÁ-TE-TI para compasso composto).

---

## 4. Escalas, Tonalidades e Acidentes (Fase 6 e 8)
- **Escala Diatônica Maior**: Segue o padrão de intervalos: **Tom - Tom - Semitom - Tom - Tom - Tom - Semitom**.
- **Acidentes (Alterações)**:
  - **Sustenido (#)**: Eleva a nota em um semitom.
  - **Bemol (b)**: Abaixa a nota em um semitom.
  - **Bequadro**: Anula o efeito do sustenido ou bemol, retornando a nota ao estado natural.
- **Ordem de aparição das alterações (Ciclo de Quintas)**:
  - **Sustenidos**: Fá - Dó - Sol - Ré - Lá - Mi - Si (sequência de quintas ascendentes).
  - **Bemóis**: Si - Mi - Lá - Ré - Sol - Dó - Fá (sequência de quintas descendentes).
