import { sortRowKeys, sortColKeys, exportForTesting } from '../sortKeys';
import type { TableData } from '@/types';

const { compareKeys } = exportForTesting;

describe('compareKeys (unit)', () => {
   test('two numbers', () => {
      const number1 = 1;
      const number2 = 2;

      // ascending should return -1 (sort 'a' first)
      const test1 = compareKeys(number1, number2, false);
      expect(test1).toBe(-1);

      // descending should return 1 (sort 'a' second)
      const test2 = compareKeys(number1, number2, true);
      expect(test2).toBe(1);
   });

   test('same two numbers', () => {
      const number1 = 3;
      const number2 = 3;

      // ascending should return 0 (don't sort)
      const test1 = compareKeys(number1, number2, false);
      const test2 = compareKeys(number1, number2, true);
      expect(test1).toBe(0);
      expect(test2).toBe(0);
   });

   test('two strings', () => {
      const string1 = 'abc';
      const string2 = 'bcd';

      // ascending should return -1 (sort 'a' first)
      const test1 = compareKeys(string1, string2, false);
      expect(test1).toBe(-1);

      // descending should return 1 (sort 'a' second)
      const test2 = compareKeys(string1, string2, true);
      expect(test2).toBe(1);
   });

   test('same two strings', () => {
      const string1 = 'cde';
      const string2 = 'cde';

      // ascending should return 0 (don't sort)
      const test1 = compareKeys(string1, string2, false);
      const test2 = compareKeys(string1, string2, true);
      expect(test1).toBe(0);
      expect(test2).toBe(0);
   });

   test('strings with caps', () => {
      const string1 = 'cde';
      const string2 = 'cDe';

      // ascending should return caps first
      const test1a = compareKeys(string1, string2, false);
      const test1b = compareKeys(string2, string1, false);
      expect(test1a).toBe(1);
      expect(test1b).toBe(-1);

      // descending should return caps first
      const test2a = compareKeys(string1, string2, true);
      const test2b = compareKeys(string2, string1, true);
      expect(test2a).toBe(-1);
      expect(test2b).toBe(1);
   });

   test('different data types', () => {
      const testString = 'cde';
      const testNumber = 2;
      const testBoolean = false;

      // no combo should sort
      expect(compareKeys(testString, testNumber, false)).toBe(0);
      expect(compareKeys(testString, testNumber, true)).toBe(0);
      expect(compareKeys(testString, testBoolean, false)).toBe(0);
      expect(compareKeys(testString, testBoolean, true)).toBe(0);
      expect(compareKeys(testNumber, testBoolean, false)).toBe(0);
      expect(compareKeys(testNumber, testBoolean, true)).toBe(0);
   });

   test('undefined always last', () => {
      const number1 = 1;
      const number2 = 2;

      // ascending/descending should return -1 (sort 'a' first)
      const test1a = compareKeys(number1, undefined, false);
      const test1b = compareKeys(number1, undefined, true);
      expect(test1a).toBe(-1);
      expect(test1b).toBe(-1);

      // ascending/descending should return 1 (sort 'a' second)
      const test2a = compareKeys(undefined, number2, false);
      const test2b = compareKeys(undefined, number2, true);
      expect(test2a).toBe(1);
      expect(test2b).toBe(1);
   });

   test('null always last (but before undefined)', () => {
      const number1 = 1;
      const number2 = 2;

      // ascending/descending should return -1 (sort 'a' first)
      const test1a = compareKeys(number1, null, false);
      const test1b = compareKeys(number1, null, true);
      expect(test1a).toBe(-1);
      expect(test1b).toBe(-1);

      // ascending/descending should return 1 (sort 'a' second)
      const test2a = compareKeys(null, number2, false);
      const test2b = compareKeys(null, number2, true);
      expect(test2a).toBe(1);
      expect(test2b).toBe(1);

      // ascending/descending should return -1 (sort 'a' first)
      const test3a = compareKeys(null, undefined, false);
      const test3b = compareKeys(null, undefined, true);
      expect(test3a).toBe(-1);
      expect(test3b).toBe(-1);

      // ascending/descending should return 1 (sort 'a' second)
      const test4a = compareKeys(undefined, null, false);
      const test4b = compareKeys(undefined, null, true);
      expect(test4a).toBe(1);
      expect(test4b).toBe(1);
   });
});
