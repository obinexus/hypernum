/**
 * Validation utilities for Hypernum library
 * Provides type checking and validation functions for large number operations
 */

// Custom error types for validation
export class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ValidationError';
    }
  }
  
  export class OverflowError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'OverflowError';
    }
  }
  
  // Type guards
  export const isBigInt = (value: unknown): value is bigint => {
    return typeof value === 'bigint';
  };
  
  export const isValidNumberString = (value: string): boolean => {
    return /^-?\d+$/.test(value);
  };
  
  export const isValidNumber = (value: unknown): value is number => {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
  };
  
  // Type conversions with validation
  export const toBigInt = (value: unknown): bigint => {
    if (isBigInt(value)) {
      return value;
    }
    
    if (typeof value === 'string') {
      if (!isValidNumberString(value)) {
        throw new ValidationError(`Invalid number string: ${value}`);
      }
      return BigInt(value);
    }
    
    if (isValidNumber(value)) {
      if (!Number.isInteger(value)) {
        throw new ValidationError('Cannot convert non-integer number to BigInt');
      }
      return BigInt(value);
    }
    
    throw new ValidationError(`Cannot convert ${typeof value} to BigInt`);
  };
  
  // Range validation
  export const validateRange = (value: bigint, min?: bigint, max?: bigint): void => {
    if (min !== undefined && value < min) {
      throw new ValidationError(`Value ${value} is below minimum ${min}`);
    }
    if (max !== undefined && value > max) {
      throw new ValidationError(`Value ${value} exceeds maximum ${max}`);
    }
  };
  
  // Operation safety checks
  export const checkAdditionOverflow = (a: bigint, b: bigint): void => {
    // Check if addition would overflow
    if (b > 0 && a > BigInt(Number.MAX_SAFE_INTEGER) - b) {
      throw new OverflowError('Addition would overflow');
    }
    if (b < 0 && a < BigInt(Number.MIN_SAFE_INTEGER) - b) {
      throw new OverflowError('Addition would underflow');
    }
  };
  
  export const checkMultiplicationOverflow = (a: bigint, b: bigint): void => {
    // Check if multiplication would overflow
    if (a !== BigInt(0) && b !== BigInt(0)) {
      const maxValue = BigInt(Number.MAX_SAFE_INTEGER);
      const minValue = BigInt(Number.MIN_SAFE_INTEGER);
      
      if (a > maxValue / b || a < minValue / b) {
        throw new OverflowError('Multiplication would overflow');
      }
    }
  };
  
  export const checkPowerOverflow = (base: bigint, exponent: bigint): void => {
    // Basic overflow checks for exponentiation
    if (exponent < BigInt(0)) {
      throw new ValidationError('Negative exponents not supported for integers');
    }
    
    if (base === BigInt(0) && exponent === BigInt(0)) {
      throw new ValidationError('Zero raised to zero is undefined');
    }
    
    if (exponent > BigInt(1000)) {
      throw new OverflowError('Exponent too large, computation would overflow');
    }
  };
  
  // Array and data structure validation
  export const validateArrayLength = (length: number): void => {
    if (!Number.isInteger(length) || length < 0) {
      throw new ValidationError('Array length must be a non-negative integer');
    }
    if (length > Number.MAX_SAFE_INTEGER) {
      throw new ValidationError('Array length exceeds maximum safe integer');
    }
  };
  
  export const validateArrayIndex = (index: number, length: number): void => {
    if (!Number.isInteger(index)) {
      throw new ValidationError('Array index must be an integer');
    }
    if (index < 0 || index >= length) {
      throw new ValidationError('Array index out of bounds');
    }
  };
  
  // Tree validation
  export const validateTreeNode = (value: unknown): void => {
    try {
      toBigInt(value);
    } catch (error) {
      throw new ValidationError('Invalid tree node value');
    }
  };
  
  // Heap validation
  export const validateHeapProperty = <T>(
    value: T,
    parent: T | undefined,
    comparator: (a: T, b: T) => -1 | 0 | 1,
    isMinHeap: boolean
  ): void => {
    if (!parent) return;
    
    const comparison = comparator(value, parent);
    if (isMinHeap && comparison < 0) {
      throw new ValidationError('Min heap property violated');
    }
    if (!isMinHeap && comparison > 0) {
      throw new ValidationError('Max heap property violated');
    }
  };
  
  // Ackermann function validation
  export const validateAckermannInput = (m: number, n: number): void => {
    if (!Number.isInteger(m) || !Number.isInteger(n)) {
      throw new ValidationError('Ackermann inputs must be integers');
    }
    if (m < 0 || n < 0) {
      throw new ValidationError('Ackermann inputs must be non-negative');
    }
    if (m > 4) {
      throw new ValidationError('First Ackermann parameter too large for computation');
    }
  };
  
  // General numeric validation utilities
  export const isInRange = (value: bigint, min: bigint, max: bigint): boolean => {
    return value >= min && value <= max;
  };
  
  export const isPowerOfTwo = (value: bigint): boolean => {
    return value > BigInt(0) && (value & (value - BigInt(1))) === BigInt(0);
  };
  
  export const validatePositive = (value: bigint): void => {
    if (value <= BigInt(0)) {
      throw new ValidationError('Value must be positive');
    }
  };
  
  export const validateNonNegative = (value: bigint): void => {
    if (value < BigInt(0)) {
      throw new ValidationError('Value must be non-negative');
    }
  };