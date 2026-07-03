import { describe, it, expect } from 'vitest';
import { allNotes, getNoteByPosition } from './notesData';

describe('NotesData & Audio Frequency Helper', () => {
  it('should export a non-empty list of musical notes with valid properties', () => {
    expect(allNotes.length).toBeGreaterThan(0);
    allNotes.forEach(note => {
      expect(note.id).toBeDefined();
      expect(note.name).toBeDefined();
      expect(typeof note.octave).toBe('number');
      expect(note.frequency).toBeGreaterThan(0);
      expect(['sol', 'fá', 'dó', 'ambas', 'central']).toContain(note.clef);
      expect(['line', 'space']).toContain(note.type);
    });
  });

  it('should return the correct note by positionIndex', () => {
    const firstNote = allNotes[0];
    const foundNote = getNoteByPosition(firstNote.positionIndex);
    expect(foundNote.id).toBe(firstNote.id);
    expect(foundNote.frequency).toBe(firstNote.frequency);
  });

  it('should return fallback note (Dó 3 Central or default) when given an invalid positionIndex', () => {
    const invalidNote = getNoteByPosition(-9999);
    expect(invalidNote).toBeDefined();
    expect(invalidNote.frequency).toBeGreaterThan(0);
  });

  it('should ensure notes are ordered or uniquely identified by positionIndex within clefs', () => {
    const ids = new Set(allNotes.map(n => n.id));
    expect(ids.size).toBe(allNotes.length);
  });
});
