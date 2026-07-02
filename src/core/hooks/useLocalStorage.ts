import { useState, useCallback } from 'react';

/**
 * A robust hook to read and write state directly to window.localStorage
 * safely with JSON parse error catching and fallback values.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a memoized version of useState's setter function that persists the new value
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      setStoredValue((valueToStore) => {
        const newValue = value instanceof Function ? value(valueToStore) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}
