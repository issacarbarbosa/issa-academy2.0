import { describe, it, expect, vi } from 'vitest';
import { validateQuestionBank } from './schema';
import qF01 from './q_f01.json';

describe('Zod Schema Validation & Data Blindage (schema.ts)', () => {
  it('should successfully validate and parse the actual q_f01.json bank without errors', () => {
    const validated = validateQuestionBank(qF01);
    expect(Array.isArray(validated)).toBe(true);
    expect(validated.length).toBeGreaterThan(0);
    
    const firstQ = validated[0];
    expect(typeof firstQ.id).toBe('string');
    expect(typeof firstQ.pergunta).toBe('string');
    expect(Array.isArray(firstQ.opcoes)).toBe(true);
    expect(firstQ.opcoes.length).toBeGreaterThanOrEqual(1);
  });

  it('should validate custom mock questions correctly', () => {
    const mockData: unknown = [
      {
        id: 'test_1',
        ativo: true,
        pergunta: 'Teste de pergunta',
        opcoes: [
          { texto: 'Opção A', correta: true, feedback: 'Correto!' },
          { texto: 'Opção B', correta: false }
        ]
      }
    ];

    const result = validateQuestionBank(mockData);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('test_1');
    expect(result[0].opcoes[0].correta).toBe(true);
  });

  it('should filter out malformed questions if some items in the array are corrupted', () => {
    const corruptedData: unknown = [
      {
        id: 'valid_question',
        pergunta: 'Pergunta válida',
        opcoes: [{ texto: 'A', correta: true }]
      },
      {
        id: 'invalid_question_missing_opcoes',
        pergunta: 'Sem opções'
        // missing opcoes array
      },
      {
        // completely malformed object
        foo: 'bar'
      }
    ];

    // Spy on console.error to suppress expected Zod warning output during test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = validateQuestionBank(corruptedData);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('valid_question');

    consoleSpy.mockRestore();
  });

  it('should throw an error if the entire payload is not an array or completely invalid', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => validateQuestionBank(null)).toThrow();
    expect(() => validateQuestionBank("invalid json string")).toThrow();
    expect(() => validateQuestionBank({ notAnArray: true })).toThrow();

    consoleSpy.mockRestore();
  });
});
