---
name: rhythm-audio-engine
description: Habilidade técnica contendo especificações da Web Audio API (síntese de áudio) e coordenadas/curvas matemáticas SVG para os movimentos de solfejo do MSA.
---

# Engenharia de Áudio e Ritmo - MSA Digital

Esta skill orienta o agente na geração dinâmica de som e no desenho das trajetórias dos movimentos de solfejo.

---

## 1. Síntese Acústica do Órgão Virtual (Web Audio API)
Para garantir um som de órgão de igreja quente e agradável para o ensino musical, siga esta estrutura ao instanciar osciladores no navegador:

- **waveform**: Oscilador tipo `triangle`.
- **lowpass filter**: Adicionar um `BiquadFilterNode` de tipo `lowpass` com frequência de corte em `1000Hz` para atenuar harmônicos agudos e dar corpo ao som.
- **Envelope ADSR**:
  - **Attack (Ataque)**: Transição linear de ganho de `0` a `0.3` em `0.05` segundos (evita cliques de início).
  - **Decay (Decaimento)**: Rampa exponencial de `0.3` a `0.2` em `0.25` segundos.
  - **Sustain (Sustentação)**: Mantém o ganho em `0.2` enquanto a nota estiver ativa.
  - **Release (Repouso)**: Rampa exponencial do ganho atual para `0.001` em `0.15` segundos (evita cliques de término).

---

## 2. Geometria de Condução Rítmica (SVG / Solfejo)
Os movimentos de condução no MSA utilizam trajetórias curvas arredondadas (French curves) que simulam o ricochete da mão sobre uma "mesa invisível" no ponto inferior.

### Especificação de Vetores SVG por Fórmula de Compasso (Destros)
*Nota: Para canhotos, inverta a escala no eixo X (`scale(-1, 1)`).*

#### 📐 Movimento em 2 Tempos (Fase 4.7)
1. **Preparação**: Linha reta vertical descendente até o ponto inferior.
2. **Tempo 1 (Embaixo)**: A mão desce até a base (Ponto 1), faz um ricochete e sobe curvando suavemente para a direita até atingir o topo (Ponto 2).
3. **Tempo 2 (Em cima)**: Faz um pequeno laço (loop) no topo e desce verticalmente de volta ao Ponto 1.

#### 📐 Movimento em 3 Tempos (Fase 4.5)
1. **Tempo 1 (Embaixo)**: Desce até o Ponto 1 (base).
2. **Tempo 2 (Para fora)**: Ricocheteia no Ponto 1 e faz um arco lateral para a direita, parando no Ponto 2 (altura média).
3. **Tempo 3 (Em cima)**: Faz um arco grande subindo até o topo (Ponto 3), faz um laço e desce em linha quase reta para o Ponto 1.

#### 📐 Movimento em 4 Tempos (Fase 3.4)
1. **Tempo 1 (Embaixo)**: Desce verticalmente até o Ponto 1 (base).
2. **Tempo 2 (Para dentro)**: Ricocheteia no Ponto 1 e curva para a esquerda (centro do peito), parando no Ponto 2.
3. **Tempo 3 (Para fora)**: Curva em arco largo atravessando para a direita, parando no Ponto 3.
4. **Tempo 4 (Em cima)**: Sobe em arco acentuado para o topo (Ponto 4), faz um laço vertical e desce de volta ao Ponto 1.

#### 📐 Movimento em 6 Tempos (Fase 5.4)
- **Trajetória**: 3 batidas à esquerda, 2 batidas à direita, e a última subida ao topo.
  - **Tempo 1**: Desce ao centro-inferior (Ponto 1).
  - **Tempo 2**: Arco curto para a esquerda (Ponto 2).
  - **Tempo 3**: Arco externo mais amplo para a esquerda (Ponto 3).
  - **Tempo 4**: Deslocamento longo cruzando para a direita (Ponto 4).
  - **Tempo 5**: Arco curto para a direita (Ponto 5).
  - **Tempo 6**: Sobe ao topo (Ponto 6), faz o laço e desce verticalmente para o Ponto 1.

#### 📐 Movimento em 9 Tempos (Fase 7.3)
- **Trajetória**: 3 batidas à esquerda, 3 batidas à direita, 2 batidas no alto-centro e a subida final.
  - **Tempos 1 a 3**: Mesma lógica de 3 batidas à esquerda (Ponto 1, Ponto 2, Ponto 3).
  - **Tempos 4 a 6**: Mesma lógica de 3 batidas à direita (Ponto 4, Ponto 5, Ponto 6).
  - **Tempo 7 e 8**: Duas batidas curtas na região média-alta à direita (Ponto 7, Ponto 8).
  - **Tempo 9**: Sobe ao topo (Ponto 9), faz o laço e desce ao Ponto 1.
