import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LessonItemRow } from './LessonItemRow';
import { CourseItem } from '../content/msaPhasesManifest';

// Mocks das props necessárias
const mockOnToggleActiveItem = vi.fn();
const mockOnToggleCompletedItem = vi.fn();
const mockOnStartLesson = vi.fn();
const mockOnBackToMain = vi.fn();

const sampleItem: CourseItem = {
  id: '1.1',
  title: 'O que é Música?',
  page: '10',
  completed: false,
};

describe('LessonItemRow Component', () => {
  it('deve renderizar o título do item corretamente', () => {
    render(
      <LessonItemRow
        item={sampleItem}
        idx={0}
        phaseNumber={1}
        isItemActive={false}
        onToggleActiveItem={mockOnToggleActiveItem}
        onToggleCompletedItem={mockOnToggleCompletedItem}
        onStartLesson={mockOnStartLesson}
        onBackToMain={mockOnBackToMain}
      />
    );
    expect(screen.getByText('O que é Música?')).toBeInTheDocument();
    expect(screen.getByText('pág. 10')).toBeInTheDocument();
  });

  it('não deve mostrar conteúdo expandido (vídeo, arquivos) se isItemActive for false', () => {
    const { container } = render(
      <LessonItemRow
        item={sampleItem}
        idx={0}
        phaseNumber={1}
        isItemActive={false}
        onToggleActiveItem={mockOnToggleActiveItem}
        onToggleCompletedItem={mockOnToggleCompletedItem}
        onStartLesson={mockOnStartLesson}
        onBackToMain={mockOnBackToMain}
      />
    );
    // Não deve conter iframes de vídeo
    expect(container.querySelector('iframe')).toBeNull();
    expect(screen.queryByText('📁 Material de Apoio')).toBeNull();
  });

  it('deve mostrar player de vídeo e links complementares se isItemActive for true', () => {
    const { container } = render(
      <LessonItemRow
        item={sampleItem}
        idx={0}
        phaseNumber={1}
        isItemActive={true}
        onToggleActiveItem={mockOnToggleActiveItem}
        onToggleCompletedItem={mockOnToggleCompletedItem}
        onStartLesson={mockOnStartLesson}
        onBackToMain={mockOnBackToMain}
      />
    );

    // Deve conter o iframe do YouTube com o ID do vídeo correspondente à lição 1.1
    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute('src')).toContain('ALHIyHtGHQs');

    // Deve conter a seção de materiais de apoio
    expect(screen.getByText('📁 Material de Apoio')).toBeInTheDocument();
    expect(screen.getByText('Apostila MSA - Introdução e Fase 1 (PDF)')).toBeInTheDocument();
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(screen.getByText('Áudio de Apoio - Pulsação Constante 60 BPM (MP3)')).toBeInTheDocument();
    expect(screen.getByText('Áudio')).toBeInTheDocument();
  });

  it('deve exibir o card de aula interativa para lições com slideshow (ex: 3.1)', () => {
    const slideItem: CourseItem = {
      id: '3.1',
      title: 'O Endecagrama',
      page: '18',
      completed: false,
    };

    render(
      <LessonItemRow
        item={slideItem}
        idx={0}
        phaseNumber={3}
        isItemActive={true}
        onToggleActiveItem={mockOnToggleActiveItem}
        onToggleCompletedItem={mockOnToggleCompletedItem}
        onStartLesson={mockOnStartLesson}
        onBackToMain={mockOnBackToMain}
      />
    );

    // Deve conter o banner do Slideshow Interativo
    expect(screen.getByText('Aula Interativa Disponível!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Apresentação/i })).toBeInTheDocument();
  });
});
