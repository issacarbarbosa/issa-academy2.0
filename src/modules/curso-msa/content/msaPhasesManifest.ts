export interface CourseItem {
  id: string;
  title: string;
  page?: string;
  completed?: boolean;
}

export interface MsaPhase {
  number: number;
  title: string;
  description: string;
  items: CourseItem[];
  unlocked: boolean;
}

export const msaPhasesManifest: MsaPhase[] = [
  {
    number: 1,
    title: 'Música e Som',
    description: 'As propriedades do som, os elementos da música e o primeiro contato com a pauta.',
    unlocked: true,
    items: [
      { id: '1.1', title: '1.1 - Música e som', page: '09' },
      { id: '1.2', title: '1.2 - Elementos da música', page: '09' },
      { id: '1.3', title: '1.3 - Propriedades do som (Laboratório)', page: '10' },
      { id: '1.4', title: '1.4 - Notas musicais', page: '11' },
      { id: '1.5', title: '1.5 - Pentagrama (pauta musical)', page: '12' },
      { id: '1.6', title: '1.6 - Claves', page: '13' },
      { id: '1.e', title: 'Exercícios de Fixação', page: '14' },
    ],
  },
  {
    number: 2,
    title: 'Figuras e Ritmo',
    description: 'Como medir o tempo na música: figuras, compassos, barras e o uso do metrônomo.',
    unlocked: true,
    items: [
      { id: '2.1', title: '2.1 - Figuras musicais', page: '17' },
      { id: '2.e1', title: 'Exercícios Rítmicos Iniciais', page: '19' },
      { id: '2.2', title: '2.2 - Compasso', page: '21' },
      { id: '2.3', title: '2.3 - Barras de compasso simples, dupla e final', page: '21' },
      { id: '2.4', title: '2.4 - Fórmula de compasso em 4', page: '21' },
      { id: '2.5', title: '2.5 - Ritmo e pulsação', page: '22' },
      { id: '2.6', title: '2.6 - Forma de realização dos exercícios', page: '23' },
      { id: '2.e2', title: 'Exercícios Rítmicos Finais', page: '23' },
    ],
  },
  {
    number: 3,
    title: 'O Endecagrama',
    description: 'A união das pautas, a pauta de 11 linhas e a ponte mágica do Dó Central (Dó3).',
    unlocked: true,
    items: [
      { id: '3.1', title: '3.1 - Endecagrama (Aula Interativa)', page: '27' },
      { id: '3.2', title: '3.2 - Leitura rítmica, métrica e solfejo', page: '27' },
      { id: '3.e1', title: 'Exercícios de Solfejo', page: '28' },
      { id: '3.3', title: '3.3 - Movimentos de condução para solfejo', page: '28' },
      { id: '3.4', title: '3.4 - Movimento de solfejo em 4', page: '30' },
      { id: '3.5', title: '3.5 - Metrônomo prático', page: '31' },
      { id: '3.e2', title: 'Exercícios Práticos 1 a 5', page: '32' },
    ],
  },
  {
    number: 4,
    title: 'Solfejo e Movimentos',
    description: 'Como gesticular os compassos binários, ternários e quaternários para regência.',
    unlocked: false,
    items: [
      { id: '4.1', title: '4.1 - Movimentos em 2, 3 e 4', page: '35' },
      { id: '4.2', title: '4.2 - Respiração e Anacruse', page: '37' },
      { id: '4.e', title: 'Exercícios Práticos', page: '39' },
    ],
  },
  {
    number: 5,
    title: 'Valores e Divisões Rítmicas',
    description: 'Subdivisão dos tempos: tempos fortes e fracos, contratempo e síncope teórica.',
    unlocked: false,
    items: [
      { id: '5.1', title: '5.1 - Divisão binária do tempo', page: '43' },
      { id: '5.2', title: '5.2 - Contratempo nas figuras', page: '45' },
    ],
  },
  {
    number: 6,
    title: 'Intervalos, Tons e Semitons',
    description: 'A physics dos intervalos: tons, semitons naturais e acidentais, sustenidos e bemóis.',
    unlocked: false,
    items: [
      { id: '6.1', title: '6.1 - Semitom natural e cromático', page: '50' },
      { id: '6.2', title: '6.2 - Tom e Acidentes', page: '52' },
    ],
  },
  {
    number: 7,
    title: 'Escalas Diatônicas Maiores',
    description: 'Construção de escalas maiores e a ordem dos acidentes na armadura de clave.',
    unlocked: false,
    items: [
      { id: '7.1', title: '7.1 - Ciclo de Quintas', page: '58' },
      { id: '7.2', title: '7.2 - Armaduras de Clave', page: '61' },
    ],
  },
  {
    number: 8,
    title: 'Síncope e Contratempo Prático',
    description: 'Leitura rítmica avançada com síncopes regulares, irregulares e contratempos.',
    unlocked: false,
    items: [
      { id: '8.1', title: '8.1 - Prática de síncope regular', page: '67' },
    ],
  },
  {
    number: 9,
    title: 'Quiálteras (Tercinas)',
    description: 'Grupos de notas alteradas e subdivisões ternárias em compasso binário.',
    unlocked: false,
    items: [
      { id: '9.1', title: '9.1 - Tercinas e subdivisões', page: '72' },
    ],
  },
  {
    number: 10,
    title: 'Compasso Composto',
    description: 'Fórmulas de compasso composto (6/8, 9/8, 12/8) e suas unidades de tempo.',
    unlocked: false,
    items: [
      { id: '10.1', title: '10.1 - Unidade de tempo composta', page: '78' },
    ],
  },
  {
    number: 11,
    title: 'Solfejo em Compasso Composto',
    description: 'Exercícios práticos de leitura e movimentos de condução compostos.',
    unlocked: false,
    items: [
      { id: '11.1', title: '11.1 - Leitura composta', page: '84' },
    ],
  },
  {
    number: 12,
    title: 'Ornamentos Musicais',
    description: 'Apogiatura, mordente, grupeto, trinado e sua interpretação no MSA.',
    unlocked: false,
    items: [
      { id: '12.1', title: '12.1 - Ornamentos comuns', page: '90' },
    ],
  },
  {
    number: 13,
    title: 'Escalas Menores e Relativas',
    description: 'Escalas menores naturais, harmônicas e melódicas com armadura correspondente.',
    unlocked: false,
    items: [
      { id: '13.1', title: '13.1 - Escalas menores relativas', page: '96' },
    ],
  },
  {
    number: 14,
    title: 'Modulação e Gêneros',
    description: 'A mudança de tonalidade, gêneros de hinos e marcas de expressão no hinário.',
    unlocked: false,
    items: [
      { id: '14.1', title: '14.1 - Modulação teórica', page: '102' },
    ],
  },
  {
    number: 15,
    title: 'Leitura em Claves de Dó',
    description: 'Prática de leitura na 1ª, 2ª, 3ª e 4ª linhas com a Clave de Dó.',
    unlocked: false,
    items: [
      { id: '15.1', title: '15.1 - Clave de Dó na prática', page: '108' },
    ],
  },
  {
    number: 16,
    title: 'Exame Geral e Recapitulação',
    description: 'Simulado completo com todas as 16 fases preparatório para banca examinadora.',
    unlocked: false,
    items: [
      { id: '16.1', title: '16.1 - Prova Final MSA', page: '115' },
    ],
  },
];

export function getMsaPhases(completedItems: string[]): MsaPhase[] {
  return msaPhasesManifest.map((phase) => ({
    ...phase,
    items: phase.items.map((item) => ({
      ...item,
      completed: completedItems.includes(item.id),
    })),
  }));
}
