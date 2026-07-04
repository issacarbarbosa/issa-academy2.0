export interface ComplementaryLink {
  label: string;
  url: string;
  type: 'pdf' | 'audio' | 'link' | 'drive';
}

export interface LessonDetail {
  videoUrl?: string;
  hasInteractiveSlideshow?: boolean;
  practiceLink?: {
    label: string;
    view: 'mestre_da_clave' | 'simulado_msa';
  };
  complementaryLinks?: ComplementaryLink[];
}

export const lessonsData: Record<string, LessonDetail> = {
  // FASE 1
  '1.1': {
    videoUrl: 'ALHIyHtGHQs',
    complementaryLinks: [
      {
        label: 'Apostila MSA - Introdução e Fase 1 (PDF)',
        url: 'https://drive.google.com/file/d/1_example_pdf_fase1/view?usp=sharing',
        type: 'pdf'
      },
      {
        label: 'Áudio de Apoio - Pulsação Constante 60 BPM (MP3)',
        url: 'https://drive.google.com/file/d/1_example_audio_60bpm/view?usp=sharing',
        type: 'audio'
      }
    ]
  },
  '1.2': {
    videoUrl: '54IZJmJrtXo'
  },
  '1.3': {
    videoUrl: '_ZjOGmL3UM4'
  },
  '1.4': {
    videoUrl: 'wx76vWI8bGA'
  },
  '1.5': {
    videoUrl: 'iEZgDyyC1e8'
  },
  '1.6': {
    videoUrl: 'Lcy6r__GOOY',
    practiceLink: {
      label: 'Treinar Claves no Mestre da Clave',
      view: 'mestre_da_clave'
    }
  },
  '1.e': {
    practiceLink: {
      label: 'Fazer Simulado da Fase 1',
      view: 'simulado_msa'
    }
  },

  // FASE 2
  '2.1': {
    videoUrl: 'qr0dp4ryV90',
    complementaryLinks: [
      {
        label: 'Tabela de Figuras e Silêncios (PDF)',
        url: 'https://drive.google.com/file/d/1_example_figures_pdf/view?usp=sharing',
        type: 'pdf'
      }
    ]
  },
  '2.e1': {},
  '2.2': {
    videoUrl: 'CzCbSzkh9Y0'
  },
  '2.3': {
    videoUrl: 'OjYXGLw3NlE'
  },
  '2.4': {
    videoUrl: 'kaD7Qkuz7Cg'
  },
  '2.5': {
    videoUrl: 'xgGCuawxNvk'
  },
  '2.6': {
    videoUrl: 'oNLFuipETIs'
  },
  '2.e2': {
    practiceLink: {
      label: 'Fazer Simulado das Fases 1 e 2',
      view: 'simulado_msa'
    }
  },

  // FASE 3
  '3.1': {
    videoUrl: 'MmU-j95eYKQ',
    hasInteractiveSlideshow: true,
    complementaryLinks: [
      {
        label: 'Diagrama do Endecagrama Colorido (PDF)',
        url: 'https://drive.google.com/file/d/1_example_endecagrama_pdf/view?usp=sharing',
        type: 'pdf'
      }
    ]
  },
  '3.2': {
    videoUrl: 'EUBHo-1EEYI',
    practiceLink: {
      label: 'Treinar Leitura no Mestre da Clave',
      view: 'mestre_da_clave'
    }
  },
  '3.e1': {},
  '3.3': {
    videoUrl: 'S2IvhjKIONI'
  },
  '3.4': {},
  '3.5': {},
  '3.e2': {
    practiceLink: {
      label: 'Fazer Simulado da Fase 3',
      view: 'simulado_msa'
    }
  }
};
