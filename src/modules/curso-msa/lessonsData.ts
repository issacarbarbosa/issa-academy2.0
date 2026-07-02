export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface LessonDetail {
  videoUrl?: string;
  summary: string[];
  hasInteractiveSlideshow?: boolean;
  quiz?: QuizQuestion[];
  practiceLink?: {
    label: string;
    view: 'mestre_da_clave' | 'simulado_msa';
  };
}

export const lessonsData: Record<string, LessonDetail> = {
  // FASE 1
  '1.1': {
    videoUrl: 'ALHIyHtGHQs',
    summary: [
      'Música é a arte de manifestar os diversos sentimentos da nossa alma mediante o som.',
      'A matéria-prima da música é o som.',
      'Os três elementos principais da música são: Melodia, Harmonia e Ritmo.'
    ],
    quiz: [
      {
        question: 'O que é música de acordo com o MSA?',
        options: [
          'A arte dos sons e dos silêncios apenas.',
          'A arte de manifestar sentimentos da alma mediante o som.',
          'Apenas a combinação harmônica de acordes no instrumento.'
        ],
        answerIndex: 1
      },
      {
        question: 'Qual é a matéria-prima da música?',
        options: ['O silêncio', 'O som', 'A partitura'],
        answerIndex: 1
      }
    ]
  },
  '1.2': {
    videoUrl: '54IZJmJrtXo',
    summary: [
      'Melodia: É a sucessão de sons (um após o outro). Ex: o canto ou o solo.',
      'Harmonia: É a produção de sons simultâneos (todos de uma vez). Ex: acordes.',
      'Ritmo: É a combinação do tempo e divisão da duração dos sons.'
    ],
    quiz: [
      {
        question: 'O que é Melodia?',
        options: [
          'Sons emitidos ao mesmo tempo.',
          'Sons emitidos sucessivamente (um após o outro).',
          'A marcação de tempo do metrônomo.'
        ],
        answerIndex: 1
      },
      {
        question: 'Qual elemento representa os sons tocados de forma simultânea?',
        options: ['Ritmo', 'Melodia', 'Harmonia'],
        answerIndex: 2
      }
    ]
  },
  '1.3': {
    videoUrl: '_ZjOGmL3UM4',
    summary: [
      'O som possui quatro propriedades principais:',
      '1. Altura: Sons graves, médios ou agudos.',
      '2. Duração: Tempo que o som permanece ativo.',
      '3. Intensidade: Volume do som (forte ou fraco).',
      '4. Timbre: A "cor" do som, a identidade da fonte sonora.'
    ],
    quiz: [
      {
        question: 'Qual propriedade nos permite distinguir um som grave de um som agudo?',
        options: ['Intensidade', 'Altura', 'Timbre'],
        answerIndex: 1
      },
      {
        question: 'O que é o Timbre?',
        options: [
          'A força ou volume do som.',
          'A propriedade que nos permite identificar a origem do som (ex: flauta vs órgão).',
          'O tempo de duração das notas.'
        ],
        answerIndex: 1
      }
    ]
  },
  '1.4': {
    videoUrl: 'wx76vWI8bGA',
    summary: [
      'Existem 7 notas musicais: Dó, Ré, Mi, Fá, Sol, Lá, Si.',
      'A ordem ascendente é: Dó, Ré, Mi, Fá, Sol, Lá, Si.',
      'A ordem descendente é: Si, Lá, Sol, Fá, Mi, Ré, Dó.'
    ],
    quiz: [
      {
        question: 'Qual a ordem correta das notas musicais de forma ascendente?',
        options: [
          'Dó, Ré, Mi, Fá, Sol, Lá, Si',
          'Si, Lá, Sol, Fá, Mi, Ré, Dó',
          'Dó, Mi, Sol, Si, Ré, Fá, Lá'
        ],
        answerIndex: 0
      }
    ]
  },
  '1.5': {
    videoUrl: 'iEZgDyyC1e8',
    summary: [
      'Pentagrama ou Pauta é o conjunto de 5 linhas e 4 espaços onde escrevemos as notas.',
      'As linhas e espaços são contados sempre de baixo para cima.',
      'Linhas suplementares superiores e inferiores são usadas para notas muito agudas ou graves.'
    ],
    quiz: [
      {
        question: 'Como são contadas as linhas e espaços do pentagrama?',
        options: [
          'De cima para baixo.',
          'De baixo para cima.',
          'Da esquerda para a direita.'
        ],
        answerIndex: 1
      }
    ]
  },
  '1.6': {
    videoUrl: 'Lcy6r__GOOY',
    summary: [
      'A Clave é o sinal colocado no início da pauta para dar nome e altura às notas.',
      'Clave de Sol: Escrita na 2ª linha. Usada para instrumentos agudos e organistas.',
      'Clave de Fá: Escrita na 4ª linha. Usada para instrumentos graves.',
      'Clave de Dó: Escrita na 3ª linha. Usada para viola.'
    ],
    practiceLink: {
      label: 'Treinar Claves no Mestre da Clave',
      view: 'mestre_da_clave'
    },
    quiz: [
      {
        question: 'Em qual linha se inicia o desenho da Clave de Sol?',
        options: ['1ª linha', '2ª linha', '3ª linha'],
        answerIndex: 1
      }
    ]
  },
  '1.e': {
    summary: [
      'Exercícios teóricos e rítmicos para consolidação de toda a Fase 1.',
      'Revise propriedades do som, elementos da música e nomes de notas.'
    ],
    practiceLink: {
      label: 'Fazer Simulado da Fase 1',
      view: 'simulado_msa'
    }
  },

  // FASE 2
  '2.1': {
    videoUrl: 'qr0dp4ryV90',
    summary: [
      'As figuras musicais representam a duração dos sons (e silêncios).',
      'Figuras de som: Semibreve, Mínima, Semínima, Colcheia, Semicolcheia, Fusa, Semifusa.',
      'Partes da figura: Cabeça, Haste e Colchete (bandeirola).'
    ],
    quiz: [
      {
        question: 'Quais são as três partes que podem compor uma figura musical?',
        options: [
          'Cabeça, pescoço e pernas.',
          'Cabeça, haste e colchete.',
          'Pauta, clave e notas.'
        ],
        answerIndex: 1
      }
    ]
  },
  '2.e1': {
    summary: [
      'Exercícios de batida de tempo iniciais para treinar pulsação uniforme.',
      'Foco em manter o tempo constante sem acelerar ou atrasar.'
    ]
  },
  '2.2': {
    videoUrl: 'CzCbSzkh9Y0',
    summary: [
      'Compasso é a divisão da música em partes de tempo iguais.',
      'Os compassos podem ser binários (2 tempos), ternários (3 tempos) ou quaternários (4 tempos).'
    ],
    quiz: [
      {
        question: 'O que é um compasso?',
        options: [
          'Um aparelho que faz barulho de cliques uniformes.',
          'A divisão da música em partes de tempo iguais.',
          'A velocidade em que a música é tocada.'
        ],
        answerIndex: 1
      }
    ]
  },
  '2.3': {
    videoUrl: 'OjYXGLw3NlE',
    summary: [
      'Barra Simples: Divide os compassos.',
      'Barra Dupla: Separa seções da música.',
      'Barra Final: Indica o término da peça.'
    ],
    quiz: [
      {
        question: 'Qual barra indica o final da música?',
        options: ['Barra simples', 'Barra dupla', 'Barra final'],
        answerIndex: 2
      }
    ]
  },
  '2.4': {
    videoUrl: 'kaD7Qkuz7Cg',
    summary: [
      'A fórmula de compasso indica a métrica dos compassos.',
      'O número superior indica a quantidade de tempos no compasso.',
      'O número inferior indica qual figura vale 1 tempo (Unidade de Tempo).'
    ],
    quiz: [
      {
        question: 'O que indica o número superior em uma fórmula de compasso?',
        options: [
          'A velocidade do metrônomo.',
          'A quantidade de tempos no compasso.',
          'A figura musical que representa o silêncio.'
        ],
        answerIndex: 1
      }
    ]
  },
  '2.5': {
    videoUrl: 'xgGCuawxNvk',
    summary: [
      'Ritmo é o movimento uniforme do som e do silêncio.',
      'A pulsação é a batida constante que sentimos na música (como o coração).'
    ]
  },
  '2.6': {
    videoUrl: 'oNLFuipETIs',
    summary: [
      'Os exercícios rítmicos devem ser realizados com batidas de mão uniformes.',
      'Abaixe a mão no início do tempo e levante no final.'
    ]
  },
  '2.e2': {
    summary: [
      'Exercícios de leitura rítmica misturando figuras de Semínima, Mínima e pausas.',
      'Utilize a elipse do metrônomo para treinar a constância do tempo.'
    ],
    practiceLink: {
      label: 'Fazer Simulado das Fases 1 e 2',
      view: 'simulado_msa'
    }
  },

  // FASE 3
  '3.1': {
    videoUrl: 'MmU-j95eYKQ',
    summary: [
      'O Endecagrama é a junção da Clave de Sol (agudos) com a Clave de Fá (graves).',
      'Ele forma um sistema de 11 linhas e 10 espaços.',
      'A 6ª linha central (invisível) serve para escrever o Dó Central (Dó3).'
    ],
    hasInteractiveSlideshow: true
  },
  '3.2': {
    videoUrl: 'EUBHo-1EEYI',
    summary: [
      'Leitura Rítmica: Bater o ritmo mantendo a elipse.',
      'Leitura Métrica: Falar os nomes das notas no tempo correto.',
      'Solfejo: Cantar as notas afinadas nas alturas indicadas.'
    ],
    practiceLink: {
      label: 'Treinar Leitura no Mestre da Clave',
      view: 'mestre_da_clave'
    }
  },
  '3.e1': {
    summary: [
      'Exercícios de solfejo cantado na Clave de Sol e Clave de Fá.',
      'Atenção ao Dó Central (Dó3) de transição entre as claves.'
    ]
  },
  '3.3': {
    videoUrl: 'S2IvhjKIONI',
    summary: [
      'Movimentos de condução servem para marcar os tempos do compasso com a mão.',
      'Movimento em 4 tempos: Baixo, Esquerda, Direita, Cima.',
      'Utilize movimentos circulares e contínuos para manter o legato.'
    ]
  },
  '3.4': {
    summary: [
      'Treino prático do solfejo em compasso quaternário.',
      'Mantenha a mão em movimento e cante as notas uniformemente.'
    ]
  },
  '3.5': {
    summary: [
      'Uso prático do metrônomo digital.',
      'Aprenda a sincronizar seus movimentos de mão com os cliques.'
    ]
  },
  '3.e2': {
    summary: [
      'Exercícios práticos de solfejo integrando leitura de notas, condução e metrônomo.',
      'Revise a Fase 3 completa.'
    ],
    practiceLink: {
      label: 'Fazer Simulado da Fase 3',
      view: 'simulado_msa'
    }
  }
};
