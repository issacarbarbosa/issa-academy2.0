import { describe, it, expect } from 'vitest';
import { formatTimeSpent, computeQuizResult } from './SimuladoMsa';

describe('SimuladoMsa Helper Logic', () => {
  describe('formatTimeSpent', () => {
    it('should format seconds into mm:ss strings correctly', () => {
      expect(formatTimeSpent(0)).toBe('00:00');
      expect(formatTimeSpent(9)).toBe('00:09');
      expect(formatTimeSpent(59)).toBe('00:59');
      expect(formatTimeSpent(60)).toBe('01:00');
      expect(formatTimeSpent(125)).toBe('02:05');
      expect(formatTimeSpent(3605)).toBe('60:05');
    });
  });

  describe('computeQuizResult', () => {
    it('should return 100% gabarito trophy tier when all questions are correct', () => {
      const res = computeQuizResult(20, 20);
      expect(res.pct).toBe(100);
      expect(res.img).toBe('/assets/fufu-comemorando-troféu-gabarito.png');
      expect(res.msg).toContain('Perfeito');
    });

    it('should return >=80% trophy G-clave tier when score is 80-99%', () => {
      const res = computeQuizResult(16, 20); // exactly 80%
      expect(res.pct).toBe(80);
      expect(res.img).toBe('/assets/fufu-comemorando-troféu-G-clave.png');
      expect(res.msg).toContain('Muito bom');
    });

    it('should return >=50% mid tier when score is between 50% and 79%', () => {
      const res1 = computeQuizResult(10, 20, 0); // 50%
      expect(res1.pct).toBe(50);
      expect(res1.img).toBe('/assets/fufu-erro-presente.png');
      expect(res1.msg).toContain('Bom esforço');

      const res2 = computeQuizResult(15, 20, 0.99); // 75%
      expect(res2.pct).toBe(75);
      expect(res2.img).toBe('/assets/fufu-erro-encorajador.png');
    });

    it('should return <50% low tier when score is below 50%', () => {
      const res1 = computeQuizResult(9, 20, 0); // 45%
      expect(res1.pct).toBe(45);
      expect(res1.img).toBe('/assets/fufu-erro-não-desista.png');
      expect(res1.msg).toContain('Não desanime');

      const res2 = computeQuizResult(0, 20, 0.5); // 0%
      expect(res2.pct).toBe(0);
      expect(res2.img).toBe('/assets/fufu-erro-carinho.png');
    });
  });
});
