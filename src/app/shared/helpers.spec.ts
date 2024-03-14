import { calculateElapsedTime } from './helpers';

describe('helpers', () => {
  describe('calculateElapsedTime', () => {
    it('should display just now', () => {
      const time = now();
      const from = time.getTime();
      expect(calculateElapsedTime(from)).toBe('just now');
    });

    it('should display 6 minutes ago', () => {
      const time = now();
      const from = time.setMinutes(time.getMinutes() - 6);
      expect(calculateElapsedTime(from)).toBe('6 minutes ago');
    });

    it('should display 59 minutes ago', () => {
      const time = now();
      const from = time.setMinutes(time.getMinutes() - 59);
      expect(calculateElapsedTime(from)).toBe('59 minutes ago');
    });

    it('should display 1 hour ago', () => {
      const time = now();
      const from = time.setHours(time.getHours() - 1);
      expect(calculateElapsedTime(from)).toBe('1 hour ago');
    });

    it('should display 23 hours ago', () => {
      const time = now();
      const from = time.setHours(time.getHours() - 23);
      expect(calculateElapsedTime(from)).toBe('23 hours ago');
    });

    it('should display 1 day ago', () => {
      const time = now();
      const from = time.setHours(time.getHours() - 24);
      expect(calculateElapsedTime(from)).toBe('1 day ago');
    });

    it('should display 5 days ago', () => {
      const time = now();
      const from = time.setHours(time.getHours() - 24 * 6);
      expect(calculateElapsedTime(from)).toBe('5 days ago');
    });

    it('should display 1 week ago', () => {
      const time = now();
      const from = time.setDate(time.getDate() - 8);
      expect(calculateElapsedTime(from)).toBe('1 week ago');
    });

    it('should display 2 weeks ago', () => {
      const time = now();
      const from = time.setDate(time.getDate() - 21);
      expect(calculateElapsedTime(from)).toBe('2 weeks ago');
    });

    it('should display 1 month ago', () => {
      const time = now();
      const from = time.setMonth(time.getMonth() - 1);
      expect(calculateElapsedTime(from)).toBe('1 month ago');
    });

    it('should display 1 year ago', () => {
      const time = now();
      const from = time.setFullYear(time.getFullYear() - 1);
      expect(calculateElapsedTime(from)).toBe('1 year ago');
    });

    it('should display 2 years ago', () => {
      const time = now();
      const from = time.setFullYear(time.getFullYear() - 2);
      expect(calculateElapsedTime(from)).toBe('2 years ago');
    });

    function now() {
      return new Date();
    }
  });
});
