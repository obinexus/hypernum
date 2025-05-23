/**
 * Power operations module for Hypernum library
 * Provides efficient implementations for exponentiation and related operations
 */

import {
    toBigInt,
    ValidationError,
    OverflowError,
    validateNonNegative,
    checkPowerOverflow
  } from '../utils/validation';
  
  import {
    RoundingMode,
    round,
  } from '../utils/precision';
  
  /**
   * Options for power operations
   */
  export interface PowerOptions {
    /** Precision for decimal operations */
    precision?: number;
    /** Rounding mode for decimal operations */
    roundingMode?: RoundingMode;
    /** Whether to check for overflow */
    checkOverflow?: boolean;
    /** Maximum allowed computation steps */
    maxSteps?: number;
  }
  
  const DEFAULT_OPTIONS: Required<PowerOptions> = {
    precision: 0,
    roundingMode: RoundingMode.HALF_EVEN,
    checkOverflow: true,
    maxSteps: 1000
  };
  
  /**
   * Raises a number to an integer power using binary exponentiation
   */
  export function power(
    baseValue: bigint | string | number,
    exponentValue: bigint | string | number,
    options: PowerOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigBase = toBigInt(baseValue);
    const bigExponent = toBigInt(exponentValue);
  
    // Handle special cases
    if (bigExponent === 0n) {
      return 1n;
    }
    if (bigExponent === 1n) {
      return bigBase;
    }
    if (bigBase === 0n && bigExponent < 0n) {
      throw new ValidationError('Zero cannot be raised to a negative power');
    }
    if (bigBase === 0n) {
      return 0n;
    }
    if (bigBase === 1n) {
      return 1n;
    }
    if (bigBase === -1n) {
      return bigExponent % 2n === 0n ? 1n : -1n;
    }
  
    // Validate inputs
    if (bigExponent < 0n) {
      throw new ValidationError('Negative exponents not supported for integer power');
    }
  
    if (opts.checkOverflow) {
      checkPowerOverflow(bigBase, bigExponent);
    }
  
    // Binary exponentiation algorithm
    let result = 1n;
    let base = bigBase;
    let exponent = bigExponent;
    let steps = 0;
  
    while (exponent > 0n) {
      if (steps++ > opts.maxSteps) {
        throw new OverflowError('Power operation exceeded maximum computation steps');
      }
  
      if (exponent & 1n) {
        result *= base;
      }
      base *= base;
      exponent >>= 1n;
    }
  
    if (opts.precision > 0) {
      return round(result, opts.precision, opts.roundingMode);
    }
  
    return result;
  }
  
  /**
   * Calculates square root using Newton's method
   */
  export function sqrt(
    value: bigint | string | number,
    options: PowerOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
  
    validateNonNegative(bigValue);
  
    if (bigValue === 0n) {
      return 0n;
    }
    if (bigValue === 1n) {
      return 1n;
    }
  
    // Newton's method for square root
    let guess = bigValue >> 1n;
    let lastGuess: bigint;
    let steps = 0;
  
    do {
      if (steps++ > opts.maxSteps) {
        throw new OverflowError('Square root operation exceeded maximum computation steps');
      }
  
      lastGuess = guess;
      guess = (guess + bigValue / guess) >> 1n;
    } while (guess < lastGuess);
  
    if (opts.precision > 0) {
      return round(lastGuess, opts.precision, opts.roundingMode);
    }
  
    return lastGuess;
  }
  
  /**
   * Calculates nth root using Newton's method
   */
  export function nthRoot(
    value: bigint | string | number,
    n: bigint | string | number,
    options: PowerOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    const bigN = toBigInt(n);
  
    validateNonNegative(bigValue);
    if (bigN <= 0n) {
      throw new ValidationError('Root index must be positive');
    }
  
    if (bigValue === 0n) {
      return 0n;
    }
    if (bigValue === 1n) {
      return 1n;
    }
    if (bigN === 1n) {
      return bigValue;
    }
    if (bigN === 2n) {
      return sqrt(bigValue, opts);
    }
  
    // Newton's method for nth root
    let guess = bigValue >> 1n;
    let lastGuess: bigint;
    let steps = 0;
  
    const nMinus1 = bigN - 1n;
  
    do {
      if (steps++ > opts.maxSteps) {
        throw new OverflowError('Nth root operation exceeded maximum computation steps');
      }
  
      lastGuess = guess;
      const powered = power(guess, nMinus1, opts);
      guess = ((nMinus1 * guess) + (bigValue / powered)) / bigN;
    } while (guess < lastGuess);
  
    if (opts.precision > 0) {
      return round(lastGuess, opts.precision, opts.roundingMode);
    }
  
    return lastGuess;
  }
  
  /**
   * Calculates tetration (repeated exponentiation)
   * a↑↑n = a^(a^(a^...)) (n times)
   */
  export function tetration(
    base: bigint | string | number,
    height: bigint | string | number,
    options: PowerOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigBase = toBigInt(base);
    const bigHeight = toBigInt(height);
  
    validateNonNegative(bigHeight);
  
    if (bigHeight === 0n) {
      return 1n;
    }
    if (bigHeight === 1n) {
      return bigBase;
    }
    if (bigBase === 0n) {
      return bigHeight % 2n === 0n ? 1n : 0n;
    }
    if (bigBase === 1n) {
      return 1n;
    }
    if (bigBase === 2n && bigHeight > 4n) {
      throw new OverflowError('Tetration would overflow for base 2 and height > 4');
    }
  
    let result = bigBase;
    let steps = 0;
  
    for (let i = 1n; i < bigHeight; i++) {
      if (steps++ > opts.maxSteps) {
        throw new OverflowError('Tetration operation exceeded maximum computation steps');
      }
  
      result = power(bigBase, result, opts);
    }
  
    if (opts.precision > 0) {
      return round(result, opts.precision, opts.roundingMode);
    }
  
    return result;
  }
  
  /**
   * Calculates super-root (inverse tetration)
   * Finds x where x↑↑n = value
   */
  export function superRoot(
    value: bigint | string | number,
    height: bigint | string | number,
    options: PowerOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    const bigHeight = toBigInt(height);
  
    validateNonNegative(bigHeight);
    if (bigHeight === 0n) {
      throw new ValidationError('Height cannot be zero for super-root');
    }
    if (bigValue < 1n) {
      throw new ValidationError('Value must be at least 1 for super-root');
    }
  
    if (bigValue === 1n) {
      return 1n;
    }
    if (bigHeight === 1n) {
      return bigValue;
    }
  
    // Binary search for super-root
    let left = 1n;
    let right = bigValue;
    let steps = 0;
  
    while (left <= right) {
      if (steps++ > opts.maxSteps) {
        throw new OverflowError('Super-root operation exceeded maximum computation steps');
      }
  
      const mid = (left + right) >> 1n;
      try {
        const test = tetration(mid, bigHeight, opts);
        if (test === bigValue) {
          return mid;
        }
        if (test < bigValue) {
          left = mid + 1n;
        } else {
          right = mid - 1n;
        }
      } catch (error) {
        right = mid - 1n;
      }
    }
  
    if (opts.precision > 0) {
      return round(right, opts.precision, opts.roundingMode);
    }
  
    return right;
  }
  
  export default {
    power,
    sqrt,
    nthRoot,
    tetration,
    superRoot
  };