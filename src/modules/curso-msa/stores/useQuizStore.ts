import { create } from 'zustand';
import React from 'react';

interface QuizStoreState {
  currentQuestionIndex: number;
  selectedOption: string | null;
  dragNoteIndex: number;
  isAnswered: boolean;
  isCorrect: boolean | null;
  score: number;
  quizFinished: boolean;

  // Actions compatible with React.SetStateAction
  setCurrentQuestionIndex: (action: React.SetStateAction<number>) => void;
  setSelectedOption: (action: React.SetStateAction<string | null>) => void;
  setDragNoteIndex: (action: React.SetStateAction<number>) => void;
  setIsAnswered: (action: React.SetStateAction<boolean>) => void;
  setIsCorrect: (action: React.SetStateAction<boolean | null>) => void;
  setScore: (action: React.SetStateAction<number>) => void;
  setQuizFinished: (action: React.SetStateAction<boolean>) => void;
  resetQuiz: () => void;
}

function resolveAction<T>(action: React.SetStateAction<T>, prev: T): T {
  return typeof action === 'function' ? (action as (prev: T) => T)(prev) : action;
}

export const useQuizStore = create<QuizStoreState>((set) => ({
  currentQuestionIndex: 0,
  selectedOption: null,
  dragNoteIndex: 20, // Middle C (Dó3)
  isAnswered: false,
  isCorrect: null,
  score: 0,
  quizFinished: false,

  setCurrentQuestionIndex: (action) =>
    set((state) => ({
      currentQuestionIndex: resolveAction(action, state.currentQuestionIndex),
    })),

  setSelectedOption: (action) =>
    set((state) => ({
      selectedOption: resolveAction(action, state.selectedOption),
    })),

  setDragNoteIndex: (action) =>
    set((state) => ({
      dragNoteIndex: resolveAction(action, state.dragNoteIndex),
    })),

  setIsAnswered: (action) =>
    set((state) => ({
      isAnswered: resolveAction(action, state.isAnswered),
    })),

  setIsCorrect: (action) =>
    set((state) => ({
      isCorrect: resolveAction(action, state.isCorrect),
    })),

  setScore: (action) =>
    set((state) => ({
      score: resolveAction(action, state.score),
    })),

  setQuizFinished: (action) =>
    set((state) => ({
      quizFinished: resolveAction(action, state.quizFinished),
    })),

  resetQuiz: () =>
    set({
      currentQuestionIndex: 0,
      selectedOption: null,
      dragNoteIndex: 20,
      isAnswered: false,
      isCorrect: null,
      score: 0,
      quizFinished: false,
    }),
}));
