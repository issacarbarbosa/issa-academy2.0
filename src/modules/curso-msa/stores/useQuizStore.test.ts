import { describe, it, expect, beforeEach } from 'vitest';
import { useQuizStore } from './useQuizStore';

describe('useQuizStore Zustand Store', () => {
  beforeEach(() => {
    useQuizStore.getState().resetQuiz();
  });

  it('should initialize with default quiz state', () => {
    const state = useQuizStore.getState();
    expect(state.currentQuestionIndex).toBe(0);
    expect(state.selectedOption).toBeNull();
    expect(state.dragNoteIndex).toBe(20);
    expect(state.isAnswered).toBe(false);
    expect(state.isCorrect).toBeNull();
    expect(state.score).toBe(0);
    expect(state.quizFinished).toBe(false);
  });

  it('should update state using value setters', () => {
    const store = useQuizStore.getState();
    store.setSelectedOption('Opção A');
    store.setIsAnswered(true);
    store.setIsCorrect(true);
    store.setScore(10);

    const updated = useQuizStore.getState();
    expect(updated.selectedOption).toBe('Opção A');
    expect(updated.isAnswered).toBe(true);
    expect(updated.isCorrect).toBe(true);
    expect(updated.score).toBe(10);
  });

  it('should update state using functional setters compatible with React.SetStateAction', () => {
    const store = useQuizStore.getState();
    store.setScore(prev => prev + 5);
    store.setScore(prev => prev * 2);
    store.setCurrentQuestionIndex(prev => prev + 1);

    const updated = useQuizStore.getState();
    expect(updated.score).toBe(10);
    expect(updated.currentQuestionIndex).toBe(1);
  });

  it('should reset all state properties when resetQuiz is called', () => {
    const store = useQuizStore.getState();
    store.setScore(100);
    store.setCurrentQuestionIndex(5);
    store.setSelectedOption('Errado');
    store.setQuizFinished(true);

    store.resetQuiz();

    const resetState = useQuizStore.getState();
    expect(resetState.score).toBe(0);
    expect(resetState.currentQuestionIndex).toBe(0);
    expect(resetState.selectedOption).toBeNull();
    expect(resetState.quizFinished).toBe(false);
  });
});
