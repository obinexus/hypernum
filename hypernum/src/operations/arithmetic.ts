/**
 * Arithmetic operations module for Hypernum library
 * Provides high-precision arithmetic operations with BigInt support
 */

import {
    validateNonNegative,
    toBigInt,
    checkAdditionOverflow,
    checkMultiplicationOverflow,
    checkPowerOverflow,
    ValidationError,
  } from '../utils/validation';
  
  import {
    RoundingMode,
    round,
    scaledDivision,
    normalizePrecision,
  } from '../utils/precision';
  
  /**
   * Options for arithmetic operations
   */
  export interface ArithmeticOptions {
    precision?: number;
    roundingMode?: RoundingMode;
    checkOverflow?: boolean;
  }
  
  const DEFAULT_OPTIONS: Required<ArithmeticOptions> = {
    precision: 0,
    roundingMode: RoundingMode.HALF_EVEN,
    checkOverflow: true
  };
  
  /**
   * Adds two numbers with optional precision and overflow checking
   */
  export function add(
    a: bigint | string | number,
    b: bigint | string | number,
    options: ArithmeticOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
  
    if (opts.checkOverflow) {
      checkAdditionOverflow(bigA, bigB);
    }
  
    if (opts.precision === 0) {
      return bigA + bigB;
    }
  
    const [scaledA, scaledB] = normalizePrecision(bigA, bigB, opts.precision, opts.precision);
    const result = scaledA + scaledB;
    
    return round(result, opts.precision, opts.roundingMode);
  }
  
  /**
   * Subtracts two numbers with optional precision and overflow checking
   */
  export function subtract(
    a: bigint | string | number,
    b: bigint | string | number,
    options: ArithmeticOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
  
    if (opts.checkOverflow) {
      checkAdditionOverflow(bigA, -bigB);
    }
  
    if (opts.precision === 0) {
      return bigA - bigB;
    }
  
    const [scaledA, scaledB] = normalizePrecision(bigA, bigB, opts.precision, opts.precision);
    const result = scaledA - scaledB;
    
    return round(result, opts.precision, opts.roundingMode);
  }
  
  /**
   * Multiplies two numbers with optional precision and overflow checking
   */
  export function multiply(
    a: bigint | string | number,
    b: bigint | string | number,
    options: ArithmeticOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
  
    if (opts.checkOverflow) {
      checkMultiplicationOverflow(bigA, bigB);
    }
  
    const result = bigA * bigB;
    if (opts.precision === 0) {
      return result;
    }
  
    return round(result, opts.precision, opts.roundingMode);
  }
  
  /**
   * Divides two numbers with specified precision and rounding
   */
  export function divide(
    numerator: bigint | string | number,
    denominator: bigint | string | number,
    options: ArithmeticOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigNumerator = toBigInt(numerator);
    const bigDenominator = toBigInt(denominator);
  
    if (bigDenominator === BigInt(0)) {
      throw new ValidationError('Division by zero');
    }
  
    return scaledDivision(
      bigNumerator,
      bigDenominator,
      opts.precision,
      opts.roundingMode
    );
  }
  
  /**
   * Calculates remainder with optional precision
   */
  export function remainder(
    a: bigint | string | number,
    b: bigint | string | number,
    options: ArithmeticOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
  
    if (bigB === BigInt(0)) {
      throw new ValidationError('Division by zero in remainder operation');
    }
  
    if (opts.precision === 0) {
      return bigA % bigB;
    }
  
    const [scaledA, scaledB] = normalizePrecision(bigA, bigB, opts.precision, opts.precision);
    const result = scaledA % scaledB;
    
    return round(result, opts.precision, opts.roundingMode);
  }
  
  /**
   * Raises a number to a power with optional precision
   */
  export function power(
    base: bigint | string | number,
    exponent: bigint | string | number,
    options: ArithmeticOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigBase = toBigInt(base);
    const bigExponent = toBigInt(exponent);
  
    if (opts.checkOverflow) {
      checkPowerOverflow(bigBase, bigExponent);
    }
  
    validateNonNegative(bigExponent);
  
    if (bigExponent === BigInt(0)) {
      return BigInt(1);
    }
  
    if (bigExponent === BigInt(1)) {
      return bigBase;
    }
  
    let result = bigBase;
    let remaining = bigExponent - BigInt(1);
  
    while (remaining > BigInt(0)) {
      if (opts.checkOverflow) {
        checkMultiplicationOverflow(result, bigBase);
      }
      result *= bigBase;
      remaining--;
    }
  
    if (opts.precision > 0) {
      return round(result, opts.precision, opts.roundingMode);
    }
  
    return result;
  }
  
  /**
   * Calculates the square root with specified precision
   */
  export function sqrt(
    value: bigint | string | number,
    options: ArithmeticOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    validateNonNegative(bigValue);
  
    if (bigValue === BigInt(0)) {
      return BigInt(0);
    }
  
    // Scale up for precision
    const scaleFactor = BigInt(10) ** BigInt(opts.precision * 2);
    const scaled = bigValue * scaleFactor;
  
    // Newton's method for square root
    let x = scaled;
    let y = (x + scaled / x) >> BigInt(1);
  
    while (y < x) {
      x = y;
      y = (x + scaled / x) >> BigInt(1);
    }
  
    return round(x, opts.precision, opts.roundingMode);
  }
  
  /**
   * Calculates the absolute value
   */
  export function abs(value: bigint | string | number): bigint {
    const bigValue = toBigInt(value);
    return bigValue < BigInt(0) ? -bigValue : bigValue;
  }
  
  /**
   * Returns the sign of a number (-1, 0, or 1)
   */
  export function sign(value: bigint | string | number): bigint {
    const bigValue = toBigInt(value);
    if (bigValue < BigInt(0)) return BigInt(-1);
    if (bigValue > BigInt(0)) return BigInt(1);
    return BigInt(0);
  }
  
  /**
   * Calculates the greatest common divisor of two numbers
   */
  export function gcd(
    a: bigint | string | number,
    b: bigint | string | number
  ): bigint {
    let bigA = abs(toBigInt(a));
    let bigB = abs(toBigInt(b));
  
    while (bigB !== BigInt(0)) {
      const temp = bigB;
      bigB = bigA % bigB;
      bigA = temp;
    }
  
    return bigA;
  }
  
  /**
   * Calculates the least common multiple of two numbers
   */
  export function lcm(
    a: bigint | string | number,
    b: bigint | string | number
  ): bigint {
    const bigA = abs(toBigInt(a));
    const bigB = abs(toBigInt(b));
    
    if (bigA === BigInt(0) || bigB === BigInt(0)) {
      return BigInt(0);
    }
  
    return abs(bigA * bigB) / gcd(bigA, bigB);
  }
  
  // /**
  //  * Calculates factorial of a number
  //  */
  // export function factorial(value: bigint | string | number): bigint {
  //   const bigValue = toBigInt(value);
  //   validateNonNegative(bigValue);
  
  //   if (bigValue > BigInt(1000)) {
  //     throw new OverflowError('Factorial input too large');
  //   }
  
  //   if (bigValue <= BigInt(1)) {
  //     return BigInt(1);
  //   }
  
  //   let result = BigInt(1);
  //   let current = BigInt(2);
  
  //   while (current <= bigValue) {
  //     result *= current;
  //     current++;
  //   }
  
  //   return result;
  // }
  
  export default {
    add,
    subtract,
    multiply,
    divide,
    remainder,
    power,
    sqrt,
    abs,
    sign,
    gcd,
    lcm, 
    // factorial
    };

  