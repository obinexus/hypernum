/**
 * Bitwise operations module for Hypernum library
 * Provides functions for bit-level manipulations of large numbers
 */

import {
    toBigInt,
    ValidationError,
    validateNonNegative
  } from '../utils/validation';
  
  /**
   * Options for bitwise operations
   */
  export interface BitwiseOptions {
    /** Maximum bits to consider in operations */
    maxBits?: number;
    /** Whether to throw on overflow */
    strict?: boolean;
  }
  
  const DEFAULT_OPTIONS: Required<BitwiseOptions> = {
    maxBits: 1024,
    strict: true
  };
  
  /**
   * Validates shift amount is within reasonable bounds
   */
  function validateShift(shift: bigint, options: Required<BitwiseOptions>): void {
    if (shift < 0n) {
      throw new ValidationError('Shift amount cannot be negative');
    }
    if (options.strict && shift >= BigInt(options.maxBits)) {
      throw new ValidationError(`Shift amount exceeds maximum of ${options.maxBits} bits`);
    }
  }
  
  /**
   * Performs bitwise AND operation
   */
  export function and(
    a: bigint | string | number,
    b: bigint | string | number
  ): bigint {
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);

    return bigA & bigB;
  }
  
  /**
   * Performs bitwise OR operation
   */
  export function or(
    a: bigint | string | number,
    b: bigint | string | number
  ): bigint {
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
    
    return bigA | bigB;
  }
  
  /**
   * Performs bitwise XOR operation
   */
  export function xor(
    a: bigint | string | number,
    b: bigint | string | number
  ): bigint {
    const bigA = toBigInt(a);
    const bigB = toBigInt(b);
    
    return bigA ^ bigB;
  }
  
  /**
   * Performs bitwise NOT operation
   */
  export function not(
    value: bigint | string | number
  ): bigint {
    const bigValue = toBigInt(value);
    
    return ~bigValue;
  }
  
  /**
   * Performs left shift operation
   */
  export function leftShift(
    value: bigint | string | number,
    shift: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    const bigShift = toBigInt(shift);
    
    validateShift(bigShift, opts);
    return bigValue << bigShift;
  }
  
  /**
   * Performs right shift operation
   */
  export function rightShift(
    value: bigint | string | number,
    shift: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    const bigShift = toBigInt(shift);
    
    validateShift(bigShift, opts);
    return bigValue >> bigShift;
  }
  
  /**
   * Performs unsigned right shift operation
   * Note: BigInt doesn't have >>> operator, so we implement it manually
   */
  export function unsignedRightShift(
    value: bigint | string | number,
    shift: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    const bigShift = toBigInt(shift);
    
    validateShift(bigShift, opts);
    
    if (bigValue >= 0n) {
      return bigValue >> bigShift;
    }
    
    // Handle negative numbers by first converting to positive
    const mask = (1n << BigInt(opts.maxBits)) - 1n;
    return (bigValue & mask) >> bigShift;
  }
  
  /**
   * Rotates bits left by specified amount
   */
  export function rotateLeft(
    value: bigint | string | number,
    rotation: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    let bigRotation = toBigInt(rotation);
    
    validateNonNegative(bigRotation);
    
    // Normalize rotation to be within maxBits
    if (bigRotation >= BigInt(opts.maxBits)) {
      bigRotation = bigRotation % BigInt(opts.maxBits);
    }
    
    if (bigRotation === 0n) {
      return bigValue;
    }
    
    const leftPart = leftShift(bigValue, bigRotation, opts);
    const rightPart = unsignedRightShift(bigValue, BigInt(opts.maxBits) - bigRotation, opts);
    
    return leftPart | rightPart;
  }
  
  /**
   * Rotates bits right by specified amount
   */
  export function rotateRight(
    value: bigint | string | number,
    rotation: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    let bigRotation = toBigInt(rotation);
    
    validateNonNegative(bigRotation);
    
    // Normalize rotation to be within maxBits
    if (bigRotation >= BigInt(opts.maxBits)) {
      bigRotation = bigRotation % BigInt(opts.maxBits);
    }
    
    if (bigRotation === 0n) {
      return bigValue;
    }
    
    const rightPart = unsignedRightShift(bigValue, bigRotation, opts);
    const leftPart = leftShift(bigValue, BigInt(opts.maxBits) - bigRotation, opts);
    
    return leftPart | rightPart;
  }
  
  /**
   * Counts number of set bits (1s)
   */
  export function popCount(
    value: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let bigValue = toBigInt(value);
    
    let count = 0n;
    while (bigValue !== 0n) {
      count += bigValue & 1n;
      bigValue = unsignedRightShift(bigValue, 1n, opts);
    }
    
    return count;
  }
  
  /**
   * Returns number of trailing zero bits
   */
  export function trailingZeros(
    value: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let bigValue = toBigInt(value);
    
    if (bigValue === 0n) {
      return BigInt(opts.maxBits);
    }
    
    let count = 0n;
    while ((bigValue & 1n) === 0n) {
      count++;
      bigValue = unsignedRightShift(bigValue, 1n, opts);
    }
    
    return count;
  }
  
  /**
   * Returns number of leading zero bits
   */
  export function leadingZeros(
    value: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let bigValue = toBigInt(value);
    
    if (bigValue === 0n) {
      return BigInt(opts.maxBits);
    }
    
    let count = 0n;
    const msb = 1n << BigInt(opts.maxBits - 1);
    
    while ((bigValue & msb) === 0n && count < BigInt(opts.maxBits)) {
      count++;
      bigValue = leftShift(bigValue, 1n, opts);
    }
    
    return count;
  }
  
  /**
   * Returns bit at specified position
   */
  export function getBit(
    value: bigint | string | number,
    position: bigint | string | number,
    options: BitwiseOptions = {}
  ): boolean {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    const bigPosition = toBigInt(position);
    
    validateNonNegative(bigPosition);
    if (opts.strict && bigPosition >= BigInt(opts.maxBits)) {
      throw new ValidationError(`Bit position exceeds maximum of ${opts.maxBits} bits`);
    }
    
    return (bigValue & (1n << bigPosition)) !== 0n;
  }
  
  /**
   * Sets bit at specified position
   */
  export function setBit(
    value: bigint | string | number,
    position: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    const bigPosition = toBigInt(position);
    
    validateNonNegative(bigPosition);
    if (opts.strict && bigPosition >= BigInt(opts.maxBits)) {
      throw new ValidationError(`Bit position exceeds maximum of ${opts.maxBits} bits`);
    }
    
    return bigValue | (1n << bigPosition);
  }
  
  /**
   * Clears bit at specified position
   */
  export function clearBit(
    value: bigint | string | number,
    position: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    const bigPosition = toBigInt(position);
    
    validateNonNegative(bigPosition);
    if (opts.strict && bigPosition >= BigInt(opts.maxBits)) {
      throw new ValidationError(`Bit position exceeds maximum of ${opts.maxBits} bits`);
    }
    
    return bigValue & ~(1n << bigPosition);
  }
  
  /**
   * Toggles bit at specified position
   */
  export function toggleBit(
    value: bigint | string | number,
    position: bigint | string | number,
    options: BitwiseOptions = {}
  ): bigint {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    const bigPosition = toBigInt(position);
    
    validateNonNegative(bigPosition);
    if (opts.strict && bigPosition >= BigInt(opts.maxBits)) {
      throw new ValidationError(`Bit position exceeds maximum of ${opts.maxBits} bits`);
    }
    
    return bigValue ^ (1n << bigPosition);
  }
  
  export default {
    and,
    or,
    xor,
    not,
    leftShift,
    rightShift,
    unsignedRightShift,
    rotateLeft,
    rotateRight,
    popCount,
    trailingZeros,
    leadingZeros,
    getBit,
    setBit,
    clearBit,
    toggleBit
  };