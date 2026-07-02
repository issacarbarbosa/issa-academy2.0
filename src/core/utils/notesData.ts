import { MusicalNote } from '../types';

export const allNotes: MusicalNote[] = [
  // Deep registers (Tuba / Ledger lines below Bass Clef)
  {
    id: 'do_minus_1',
    name: 'Dó',
    octave: -1,
    frequency: 32.70,
    type: 'space',
    positionIndex: -1,
    clef: 'fá',
    description: 'Dó -1: Nota ultra-grave da Tuba (Espaço abaixo da 5ª linha suplementar inferior)',
    pianoKeyIndex: 0
  },
  {
    id: 're_minus_1',
    name: 'Ré',
    octave: -1,
    frequency: 36.71,
    type: 'line',
    positionIndex: 0,
    clef: 'fá',
    description: 'Ré -1: Nota ultra-grave (5ª linha suplementar inferior)',
    pianoKeyIndex: 1
  },
  {
    id: 'mi_minus_1',
    name: 'Mi',
    octave: -1,
    frequency: 41.20,
    type: 'space',
    positionIndex: 1,
    clef: 'fá',
    description: 'Mi -1: Nota ultra-grave (4ª pauta suplementar inferior em espaço)',
    pianoKeyIndex: 2
  },
  {
    id: 'fa_minus_1',
    name: 'Fá',
    octave: -1,
    frequency: 43.65,
    type: 'line',
    positionIndex: 2,
    clef: 'fá',
    description: 'Fá -1: Nota ultra-grave (4ª linha suplementar inferior)',
    pianoKeyIndex: 3
  },
  {
    id: 'sol_minus_1',
    name: 'Sol',
    octave: -1,
    frequency: 49.00,
    type: 'space',
    positionIndex: 3,
    clef: 'fá',
    description: 'Sol -1: Nota ultra-grave (3ª pauta suplementar inferior em espaço)',
    pianoKeyIndex: 4
  },
  {
    id: 'la_minus_1',
    name: 'Lá',
    octave: -1,
    frequency: 55.00,
    type: 'line',
    positionIndex: 4,
    clef: 'fá',
    description: 'Lá -1: Nota ultra-grave (3ª linha suplementar inferior)',
    pianoKeyIndex: 5
  },
  {
    id: 'si_minus_1',
    name: 'Si',
    octave: -1,
    frequency: 61.74,
    type: 'space',
    positionIndex: 5,
    clef: 'fá',
    description: 'Si -1: Nota ultra-grave (2ª pauta suplementar inferior em espaço)',
    pianoKeyIndex: 6
  },
  {
    id: 'do_1',
    name: 'Dó',
    octave: 1,
    frequency: 65.41,
    type: 'line',
    positionIndex: 6,
    clef: 'fá',
    description: 'Dó 1: Som grave da Tuba (2ª linha suplementar inferior)',
    pianoKeyIndex: 7
  },
  {
    id: 're_1',
    name: 'Ré',
    octave: 1,
    frequency: 73.42,
    type: 'space',
    positionIndex: 7,
    clef: 'fá',
    description: 'Ré 1: Som grave (1ª pauta suplementar inferior em espaço)',
    pianoKeyIndex: 8
  },
  {
    id: 'mi_1',
    name: 'Mi',
    octave: 1,
    frequency: 82.41,
    type: 'line',
    positionIndex: 8,
    clef: 'fá',
    description: 'Mi 1: Som grave (1ª linha suplementar inferior)',
    pianoKeyIndex: 9
  },
  {
    id: 'fa_1',
    name: 'Fá',
    octave: 1,
    frequency: 87.31,
    type: 'space',
    positionIndex: 9,
    clef: 'fá',
    description: 'Fá 1: Som grave (Espaço imediatamente abaixo da pauta de Fá)',
    pianoKeyIndex: 10
  },

  // Bass Clef (Pauta de Fá)
  {
    id: 'sol_1',
    name: 'Sol',
    octave: 1,
    frequency: 98.00,
    type: 'line',
    positionIndex: 10,
    clef: 'fá',
    description: 'Sol 1: 1ª Linha da Clave de Fá',
    pianoKeyIndex: 11
  },
  {
    id: 'la_1',
    name: 'Lá',
    octave: 1,
    frequency: 110.00,
    type: 'space',
    positionIndex: 11,
    clef: 'fá',
    description: 'Lá 1: 1º Espaço da Clave de Fá',
    pianoKeyIndex: 12
  },
  {
    id: 'si_1',
    name: 'Si',
    octave: 1,
    frequency: 123.47,
    type: 'line',
    positionIndex: 12,
    clef: 'fá',
    description: 'Si 1: 2ª Linha da Clave de Fá',
    pianoKeyIndex: 13
  },
  {
    id: 'do_2',
    name: 'Dó',
    octave: 2,
    frequency: 130.81,
    type: 'space',
    positionIndex: 13,
    clef: 'fá',
    description: 'Dó 2: 2º Espaço da Clave de Fá (Dó grave)',
    pianoKeyIndex: 14
  },
  {
    id: 're_2',
    name: 'Ré',
    octave: 2,
    frequency: 146.83,
    type: 'line',
    positionIndex: 14,
    clef: 'fá',
    description: 'Ré 2: 3ª Linha da Clave de Fá',
    pianoKeyIndex: 15
  },
  {
    id: 'mi_2',
    name: 'Mi',
    octave: 2,
    frequency: 164.81,
    type: 'space',
    positionIndex: 15,
    clef: 'fá',
    description: 'Mi 2: 3º Espaço da Clave de Fá',
    pianoKeyIndex: 16
  },
  {
    id: 'fa_2',
    name: 'Fá',
    octave: 2,
    frequency: 174.61,
    type: 'line',
    positionIndex: 16,
    clef: 'fá',
    description: 'Fá 2: 4ª Linha da Clave de Fá (Linha de referência)',
    pianoKeyIndex: 17
  },
  {
    id: 'sol_2',
    name: 'Sol',
    octave: 2,
    frequency: 196.00,
    type: 'space',
    positionIndex: 17,
    clef: 'fá',
    description: 'Sol 2: 4º Espaço da Clave de Fá',
    pianoKeyIndex: 18
  },
  {
    id: 'la_2',
    name: 'Lá',
    octave: 2,
    frequency: 220.00,
    type: 'line',
    positionIndex: 18,
    clef: 'fá',
    description: 'Lá 2: 5ª Linha da Clave de Fá',
    pianoKeyIndex: 19
  },
  {
    id: 'si_2',
    name: 'Si',
    octave: 2,
    frequency: 246.94,
    type: 'space',
    positionIndex: 19,
    clef: 'fá',
    description: 'Si 2: Espaço acima da Clave de Fá',
    pianoKeyIndex: 20
  },

  // Middle Axis (Dó Central)
  {
    id: 'do_3_central',
    name: 'Dó',
    octave: 3,
    frequency: 261.63,
    type: 'line',
    positionIndex: 20,
    clef: 'central',
    description: 'Dó 3: DÓ CENTRAL - A 11ª linha invisível (Elo de Ligação do Endecagrama)',
    pianoKeyIndex: 21
  },

  // Treble Clef (Pauta de Sol)
  {
    id: 're_3',
    name: 'Ré',
    octave: 3,
    frequency: 293.66,
    type: 'space',
    positionIndex: 21,
    clef: 'sol',
    description: 'Ré 3: Espaço imediatamente abaixo da Clave de Sol',
    pianoKeyIndex: 22
  },
  {
    id: 'mi_3',
    name: 'Mi',
    octave: 3,
    frequency: 329.63,
    type: 'line',
    positionIndex: 22,
    clef: 'sol',
    description: 'Mi 3: 1ª Linha da Clave de Sol',
    pianoKeyIndex: 23
  },
  {
    id: 'fa_3',
    name: 'Fá',
    octave: 3,
    frequency: 349.23,
    type: 'space',
    positionIndex: 23,
    clef: 'sol',
    description: 'Fá 3: 1º Espaço da Clave de Sol',
    pianoKeyIndex: 24
  },
  {
    id: 'sol_3',
    name: 'Sol',
    octave: 3,
    frequency: 392.00,
    type: 'line',
    positionIndex: 24,
    clef: 'sol',
    description: 'Sol 3: 2ª Linha da Clave de Sol (Linha de referência)',
    pianoKeyIndex: 25
  },
  {
    id: 'la_3',
    name: 'Lá',
    octave: 3,
    frequency: 440.00,
    type: 'space',
    positionIndex: 25,
    clef: 'sol',
    description: 'Lá 3: 2º Espaço da Clave de Sol (Nota padrão de afinação Lá 440Hz)',
    pianoKeyIndex: 26
  },
  {
    id: 'si_3',
    name: 'Si',
    octave: 3,
    frequency: 493.88,
    type: 'line',
    positionIndex: 26,
    clef: 'sol',
    description: 'Si 3: 3ª Linha da Clave de Sol',
    pianoKeyIndex: 27
  },
  {
    id: 'do_4',
    name: 'Dó',
    octave: 4,
    frequency: 523.25,
    type: 'space',
    positionIndex: 27,
    clef: 'sol',
    description: 'Dó 4: 3º Espaço da Clave de Sol (Dó agudo)',
    pianoKeyIndex: 28
  },
  {
    id: 're_4',
    name: 'Ré',
    octave: 4,
    frequency: 587.33,
    type: 'line',
    positionIndex: 28,
    clef: 'sol',
    description: 'Ré 4: 4ª Linha da Clave de Sol',
    pianoKeyIndex: 29
  },
  {
    id: 'mi_4',
    name: 'Mi',
    octave: 4,
    frequency: 659.25,
    type: 'space',
    positionIndex: 29,
    clef: 'sol',
    description: 'Mi 4: 4º Espaço da Clave de Sol',
    pianoKeyIndex: 30
  },
  {
    id: 'fa_4',
    name: 'Fá',
    octave: 4,
    frequency: 698.46,
    type: 'line',
    positionIndex: 30,
    clef: 'sol',
    description: 'Fá 4: 5ª Linha da Clave de Sol',
    pianoKeyIndex: 31
  },
  
  // Upper ledger lines
  {
    id: 'sol_4',
    name: 'Sol',
    octave: 4,
    frequency: 783.99,
    type: 'space',
    positionIndex: 31,
    clef: 'sol',
    description: 'Sol 4: Espaço acima da Clave de Sol',
    pianoKeyIndex: 32
  },
  {
    id: 'la_4',
    name: 'Lá',
    octave: 4,
    frequency: 880.00,
    type: 'line',
    positionIndex: 32,
    clef: 'sol',
    description: 'Lá 4: 1ª Linha suplementar superior',
    pianoKeyIndex: 33
  },
  {
    id: 'si_4',
    name: 'Si',
    octave: 4,
    frequency: 987.77,
    type: 'space',
    positionIndex: 33,
    clef: 'sol',
    description: 'Si 4: 1º Espaço suplementar superior',
    pianoKeyIndex: 34
  },
  {
    id: 'do_5',
    name: 'Dó',
    octave: 5,
    frequency: 1046.50,
    type: 'line',
    positionIndex: 34,
    clef: 'sol',
    description: 'Dó 5: 2ª Linha suplementar superior (Dó super-agudo)',
    pianoKeyIndex: 35
  }
];

// Returns note by positionIndex
export function getNoteByPosition(index: number): MusicalNote {
  const note = allNotes.find(n => n.positionIndex === index);
  return note || allNotes.find(n => n.id === 'do_3_central') || allNotes[21];
}
