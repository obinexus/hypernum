/**
 * Factorial operations module for Hypernum library
 * Provides efficient implementations for factorial and related computations
 */

import {
    toBigInt,
    ValidationError,
    OverflowError,
    validateNonNegative
  } from '../utils/validation';
  
  /**
   * Options for factorial operations
   */
  export interface FactorialOptions {
    /** Maximum allowed computation value */
    maxValue?: number;
    /** Whether to check for overflow */
    checkOverflow?: boolean;
    /** Cache computed values */
    useCache?: boolean;
  }
  
  const DEFAULT_OPTIONS: Required<FactorialOptions> = {
    maxValue: 1000,
    checkOverflow: true,
    useCache: true
  };
  
  // Cache for factorial values
  const factorialCache = new Map<bigint, bigint>();
  
  /**
   * Calculates factorial of a number (n!)
   */
  export function factorial(
    value: bigint | string | number,
    options: FactorialOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const n = toBigInt(value);
  
    validateNonNegative(n);
  
    if (opts.checkOverflow && n > BigInt(opts.maxValue)) {
      throw new OverflowError(`Factorial input too large: maximum allowed is ${opts.maxValue}`);
    }
  
    // Handle base cases
    if (n <= 1n) {
      return 1n;
    }
  
    // Check cache
    if (opts.useCache && factorialCache.has(n)) {
      return factorialCache.get(n)!;
    }
  
    // Calculate factorial
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
      result *= i;
    }
  
    // Cache result
    if (opts.useCache) {
      factorialCache.set(n, result);
    }
  
    return result;
  }
  
  /**
   * Calculates binomial coefficient (n choose k)
   */
  export function binomial(
    n: bigint | string | number,
    k: bigint | string | number,
    options: FactorialOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigN = toBigInt(n);
    const bigK = toBigInt(k);
  
    validateNonNegative(bigN);
    validateNonNegative(bigK);
  
    if (bigK > bigN) {
      throw new ValidationError('K cannot be greater than N in binomial coefficient');
    }
  
    // Optimize for k > n/2 by using symmetry
    if (bigK > bigN / 2n) {
      return binomial(bigN, bigN - bigK, opts);
    }
  
    // Use multiplicative formula instead of factorial for efficiency
    let result = 1n;
    for (let i = 0n; i < bigK; i++) {
      result = (result * (bigN - i)) / (i + 1n);
    }
  
    return result;
  }
  
  /**
   * Calculates subfactorial (derangement number)
   * Number of permutations of n elements with no fixed points
   */
  export function subfactorial(
    value: bigint | string | number,
    options: FactorialOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const n = toBigInt(value);
  
    validateNonNegative(n);
  
    if (opts.checkOverflow && n > BigInt(opts.maxValue)) {
      throw new OverflowError(`Subfactorial input too large: maximum allowed is ${opts.maxValue}`);
    }
  
    // Handle base cases
    if (n === 0n) return 1n;
    if (n === 1n) return 0n;
  
    // Use recursive formula !n = n * !(n-1) + (-1)^n
    let result = 0n;
    const nFact = factorial(n, opts);
  
    for (let k = 0n; k <= n; k++) {
      const term = factorial(n - k, opts) * (k % 2n === 0n ? 1n : -1n);
      result += term;
    }
  
    return nFact - result;
  }
  
  /**
   * Calculates rising factorial (Pochhammer symbol)
   * x^(n) = x(x+1)(x+2)...(x+n-1)
   */
  export function risingFactorial(
    x: bigint | string | number,
    n: bigint | string | number,
    options: FactorialOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigX = toBigInt(x);
    const bigN = toBigInt(n);
  
    validateNonNegative(bigN);
  
    if (opts.checkOverflow && bigN > BigInt(opts.maxValue)) {
      throw new OverflowError(`Rising factorial input too large: maximum allowed is ${opts.maxValue}`);
    }
  
    let result = 1n;
    for (let i = 0n; i < bigN; i++) {
      result *= (bigX + i);
    }
  
    return result;
  }
  
  /**
   * Calculates falling factorial
   * x_(n) = x(x-1)(x-2)...(x-n+1)
   */
  export function fallingFactorial(
    x: bigint | string | number,
    n: bigint | string | number,
    options: FactorialOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigX = toBigInt(x);
    const bigN = toBigInt(n);
  
    validateNonNegative(bigN);
  
    if (opts.checkOverflow && bigN > BigInt(opts.maxValue)) {
      throw new OverflowError(`Falling factorial input too large: maximum allowed is ${opts.maxValue}`);
    }
  
    let result = 1n;
    for (let i = 0n; i < bigN; i++) {
      result *= (bigX - i);
    }
  
    return result;
  }
  
  /**
   * Calculates multifactorial (n!!)
   * Product of numbers from 1 to n that leave the same remainder as n when divided by k
   */
  export function multiFactorial(
    value: bigint | string | number,
    k: bigint | string | number = 2n,
    options: FactorialOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const n = toBigInt(value);
    const bigK = toBigInt(k);
  
    validateNonNegative(n);
    if (bigK <= 0n) {
      throw new ValidationError('K must be positive in multifactorial');
    }
  
    if (opts.checkOverflow && n > BigInt(opts.maxValue)) {
      throw new OverflowError(`Multifactorial input too large: maximum allowed is ${opts.maxValue}`);
    }
  
    let result = 1n;
    let current = n;
  
    while (current > 0n) {
      result *= current;
      current -= bigK;
    }
  
    return result;
  }
  
  /**
   * Calculates primorial (product of primes up to n)
   */
  export function primorial(
    value: bigint | string | number,
    options: FactorialOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const n = toBigInt(value);
  
    validateNonNegative(n);
  
    if (opts.checkOverflow && n > BigInt(opts.maxValue)) {
      throw new OverflowError(`Primorial input too large: maximum allowed is ${opts.maxValue}`);
    }
  
    if (n <= 1n) return 1n;
  
    // Generate primes up to n using Sieve of Eratosthenes
    const num = Number(n);
    const sieve = new Array(num + 1).fill(true);
    sieve[0] = sieve[1] = false;
  
    for (let i = 2; i * i <= num; i++) {
      if (sieve[i]) {
        for (let j = i * i; j <= num; j += i) {
          sieve[j] = false;
        }
      }
    }
  
    // Calculate product of all primes up to n
    let result = 1n;
    for (let i = 2; i <= num; i++) {
      if (sieve[i]) {
        result *= BigInt(i);
      }
    }
  
    return result;
  }

  
  
  export default {
    factorial,
    binomial,
    subfactorial,
    risingFactorial,
    fallingFactorial,
    multiFactorial,
    primorial
  };