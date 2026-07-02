import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface MsaCourseContextType {
  completedItems: string[];
  toggleCompletedItem: (itemId: string) => void;
  markItemCompleted: (itemId: string) => void;
  mestreClaveRecord: number;
  setMestreClaveRecord: (score: number | ((val: number) => number)) => void;
}

const MsaCourseContext = createContext<MsaCourseContextType | undefined>(undefined);

export function MsaCourseProvider({ children }: { children: React.ReactNode }) {
  const [completedItems, setCompletedItems] = useLocalStorage<string[]>('msa_completed_items', ['1.1', '1.2', '1.3', '2.1']);
  const [mestreClaveRecord, setMestreClaveRecord] = useLocalStorage<number>('mestreClave_record', 0);

  const toggleCompletedItem = useCallback((itemId: string) => {
    setCompletedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  }, [setCompletedItems]);

  const markItemCompleted = useCallback((itemId: string) => {
    setCompletedItems((prev) => (prev.includes(itemId) ? prev : [...prev, itemId]));
  }, [setCompletedItems]);

  return (
    <MsaCourseContext.Provider
      value={{
        completedItems,
        toggleCompletedItem,
        markItemCompleted,
        mestreClaveRecord,
        setMestreClaveRecord,
      }}
    >
      {children}
    </MsaCourseContext.Provider>
  );
}

export function useMsaCourse() {
  const context = useContext(MsaCourseContext);
  if (!context) {
    throw new Error('useMsaCourse must be used within an MsaCourseProvider');
  }
  return context;
}
