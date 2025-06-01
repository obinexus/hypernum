/**
 * Comparison operations module for Hypernum library
 * Provides functions for comparing large numbers with precision support
 */

import {
    toBigInt,
    ValidationError,

  } from '../utils/validation';
  
  import {
    RoundingMode,
    normalizePrecision,
  } from '../utils/precision';
  
  /**
   * Options for comparison operations
   */
  export interface ComparisonOptions {
    precision?: number;
    roundingMode?: RoundingMode;
    tolerance?: number;
  }
  
  const DEFAULT_OPTIONS: Required<ComparisonOptions> = {
    precision: 0,
    roundingMode: RoundingMode.HALF_EVEN,
    tolerance: 0
  };
  
  /**
   * Result type for comparison operations
   * -1: first value is less than second value
   *  0: values are equal
   *  1: first value is greater than second value
   */
  export type ComparisonResult = -1 | 0 | 1;
  
  /**
   * Compares two numbers with optional precision
   */
  export function compare(
    a: bigint | string | number,
    b: bigint | string | number,
    options: ComparisonOptions = {}
  ): ComparisonResult {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
  
    if (opts.precision === 0 && opts.tolerance === 0) {
      if (bigA < bigB) return -1;
      if (bigA > bigB) return 1;
      return 0;
    }
  
    const [scaledA, scaledB] = normalizePrecision(bigA, bigB, opts.precision, opts.precision);
    
    if (opts.tolerance > 0) {
      const diff = scaledA - scaledB;
      const toleranceValue = BigInt(10) ** BigInt(opts.tolerance);
      
      if (diff < -toleranceValue) return -1;
      if (diff > toleranceValue) return 1;
      return 0;
    }
  
    if (scaledA < scaledB) return -1;
    if (scaledA > scaledB) return 1;
    return 0;
  }
  
  /**
   * Checks if two numbers are equal
   */
  export function equals(
    a: bigint | string | number,
    b: bigint | string | number,
    options: ComparisonOptions = {}
  ): boolean {
    return compare(a, b, options) === 0;
  }
  
  /**
   * Checks if first number is less than second
   */
  export function lessThan(
    a: bigint | string | number,
    b: bigint | string | number,
    options: ComparisonOptions = {}
  ): boolean {
    return compare(a, b, options) === -1;
  }
  
  /**
   * Checks if first number is less than or equal to second
   */
  export function lessThanOrEqual(
    a: bigint | string | number,
    b: bigint | string | number,
    options: ComparisonOptions = {}
  ): boolean {
    const result = compare(a, b, options);
    return result === -1 || result === 0;
  }
  
  /**
   * Checks if first number is greater than second
   */
  export function greaterThan(
    a: bigint | string | number,
    b: bigint | string | number,
    options: ComparisonOptions = {}
  ): boolean {
    return compare(a, b, options) === 1;
  }
  
  /**
   * Checks if first number is greater than or equal to second
   */
  export function greaterThanOrEqual(
    a: bigint | string | number,
    b: bigint | string | number,
    options: ComparisonOptions = {}
  ): boolean {
    const result = compare(a, b, options);
    return result === 1 || result === 0;
  }
  
  /**
   * Checks if a number is between two others (inclusive)
   */
  export function between(
    value: bigint | string | number,
    min: bigint | string | number,
    max: bigint | string | number,
    options: ComparisonOptions = {}
  ): boolean {
    return greaterThanOrEqual(value, min, options) && lessThanOrEqual(value, max, options);
  }
  
  /**
   * Finds the maximum value in an array of numbers
   */
  export function max(
    values: Array<bigint | string | number>,
    options: ComparisonOptions = {}
  ): bigint {
    if (values.length === 0) {
      throw new ValidationError('Cannot find maximum of empty array');
    }
  
    return values.reduce<bigint>((max, current) => {
      const bigMax = toBigInt(max);
      const bigCurrent = toBigInt(current);
      return greaterThan(bigCurrent, bigMax, options) ? bigCurrent : bigMax;
    }, toBigInt(values[0]));
  }
  
  /**
   * Finds the minimum value in an array of numbers
   */
  export function min(
    values: Array<bigint | string | number>,
    options: ComparisonOptions = {}
  ): bigint {
    if (values.length === 0) {
      throw new ValidationError('Cannot find minimum of empty array');
    }
  
    return values.reduce<bigint>((min, current) => {
      const bigMin = toBigInt(min);
      const bigCurrent = toBigInt(current);
      return lessThan(bigCurrent, bigMin, options) ? bigCurrent : bigMin;
    }, toBigInt(values[0]));
  }
  
  /**
   * Clamps a value between minimum and maximum bounds
   */
  export function clamp(
    value: bigint | string | number,
    min: bigint | string | number,
    max: bigint | string | number,
    options: ComparisonOptions = {}
  ): bigint {
    const bigValue = toBigInt(value);
    const bigMin = toBigInt(min);
    const bigMax = toBigInt(max);
  
    if (lessThan(bigMax, bigMin, options)) {
      throw new ValidationError('Maximum bound must be greater than or equal to minimum bound');
    }
  
    if (lessThan(bigValue, bigMin, options)) return bigMin;
    if (greaterThan(bigValue, bigMax, options)) return bigMax;
    return bigValue;
  }
  
  /**
   * Checks if all values in array are equal within tolerance
   */
  export function allEqual(
    values: Array<bigint | string | number>,
    options: ComparisonOptions = {}
  ): boolean {
    if (values.length <= 1) return true;
  
    const first = toBigInt(values[0]);
    return values.every(value => equals(value, first, options));
  }
  
  /**
   * Checks if values are in ascending order
   */
  export function isAscending(
    values: Array<bigint | string | number>,
    options: ComparisonOptions = {}
  ): boolean {
    if (values.length <= 1) return true;
  
    for (let i = 1; i < values.length; i++) {
      if (values[i] === undefined || values[i - 1] === undefined || !greaterThanOrEqual(values[i]!, values[i - 1]!, options)) {
        return false;
      }
    }
    return true;
  }
  
  /**
   * Checks if values are in descending order
   */
  export function isDescending(
    values: Array<bigint | string | number>,
    options: ComparisonOptions = {}
  ): boolean {
    if (values.length <= 1) return true;
  
    for (let i = 1; i < values.length; i++) {
      if (values[i] === undefined || values[i - 1] === undefined || !lessThanOrEqual(values[i]!, values[i - 1]!, options)) {
        return false;
      }
    }
    return true;
  }
  
  /**
   * Creates a comparator function for sorting
   */
  export function createComparator(
    options: ComparisonOptions = {}
  ): (a: bigint | string | number, b: bigint | string | number) => number {
    return (a, b) => compare(a, b, options);
  }
  
  export default {
    compare,
    equals,
    lessThan,
    lessThanOrEqual,
    greaterThan,
    greaterThanOrEqual,
    between,
    max,
    min,
    clamp,
    allEqual,
    isAscending,
    isDescending,
    createComparator
  };