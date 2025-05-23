/**
 * Custom error types for Hypernum library
 * Provides specific error classes for different types of errors that can occur
 * during mathematical operations and data structure manipulations
 */

import { ERROR_MESSAGES } from './constants';

/**
 * Base error class for Hypernum library
 * All other error classes inherit from this
 */
export class HypernumError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HypernumError';
    Object.setPrototypeOf(this, HypernumError.prototype);
  }
}

/**
 * Error for validation failures
 */
export class ValidationError extends HypernumError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Error for arithmetic overflow conditions
 */
export class OverflowError extends HypernumError {
  constructor(message: string = ERROR_MESSAGES.OVERFLOW) {
    super(message);
    this.name = 'OverflowError';
    Object.setPrototypeOf(this, OverflowError.prototype);
  }
}

/**
 * Error for arithmetic underflow conditions
 */
export class UnderflowError extends HypernumError {
  constructor(message: string = ERROR_MESSAGES.UNDERFLOW) {
    super(message);
    this.name = 'UnderflowError';
    Object.setPrototypeOf(this, UnderflowError.prototype);
  }
}

/**
 * Error for division by zero
 */
export class DivisionByZeroError extends HypernumError {
  constructor(message: string = ERROR_MESSAGES.DIVISION_BY_ZERO) {
    super(message);
    this.name = 'DivisionByZeroError';
    Object.setPrototypeOf(this, DivisionByZeroError.prototype);
  }
}

/**
 * Error for precision-related issues
 */
export class PrecisionError extends HypernumError {
  constructor(message: string = ERROR_MESSAGES.INVALID_PRECISION) {
    super(message);
    this.name = 'PrecisionError';
    Object.setPrototypeOf(this, PrecisionError.prototype);
  }
}

/**
 * Error for computation limits exceeded
 */
export class ComputationLimitError extends HypernumError {
  constructor(message: string = ERROR_MESSAGES.COMPUTATION_LIMIT) {
    super(message);
    this.name = 'ComputationLimitError';
    Object.setPrototypeOf(this, ComputationLimitError.prototype);
  }
}

/**
 * Error for invalid operations on data structures
 */
export class DataStructureError extends HypernumError {
  constructor(message: string) {
    super(message);
    this.name = 'DataStructureError';
    Object.setPrototypeOf(this, DataStructureError.prototype);
  }
}

/**
 * Error for heap property violations
 */
export class HeapPropertyError extends DataStructureError {
  constructor(message: string = ERROR_MESSAGES.INVALID_HEAP_PROPERTY) {
    super(message);
    this.name = 'HeapPropertyError';
    Object.setPrototypeOf(this, HeapPropertyError.prototype);
  }
}

/**
 * Error for tree-related issues
 */
export class TreeError extends DataStructureError {
  constructor(message: string = ERROR_MESSAGES.TREE_DEPTH_EXCEEDED) {
    super(message);
    this.name = 'TreeError';
    Object.setPrototypeOf(this, TreeError.prototype);
  }
}

/**
 * Error for array index out of bounds
 */
export class IndexError extends DataStructureError {
  constructor(message: string = ERROR_MESSAGES.NEGATIVE_INDEX) {
    super(message);
    this.name = 'IndexError';
    Object.setPrototypeOf(this, IndexError.prototype);
  }
}

/**
 * Error for invalid number format or conversion
 */
export class FormatError extends HypernumError {
  constructor(message: string) {
    super(message);
    this.name = 'FormatError';
    Object.setPrototypeOf(this, FormatError.prototype);
  }
}

/**
 * Error for invalid Roman numeral operations
 */
export class RomanNumeralError extends FormatError {
  constructor(message: string = ERROR_MESSAGES.INVALID_ROMAN) {
    super(message);
    this.name = 'RomanNumeralError';
    Object.setPrototypeOf(this, RomanNumeralError.prototype);
  }
}

/**
 * Type guard to check if an error is a Hypernum error
 */
export function isHypernumError(error: unknown): error is HypernumError {
  return error instanceof HypernumError;
}

/**
 * Helper function to wrap unknown errors into HypernumError
 */
export function wrapError(error: unknown): HypernumError {
  if (isHypernumError(error)) {
    return error;
  }
  if (error instanceof Error) {
    return new HypernumError(error.message);
  }
  return new HypernumError('An unknown error occurred');
}

/**
 * Helper function to create an appropriate error from a message and optional type
 */
export function createError(message: string, type?: string): HypernumError {
  switch (type) {
    case 'validation':
      return new ValidationError(message);
    case 'overflow':
      return new OverflowError(message);
    case 'underflow':
      return new UnderflowError(message);
    case 'division':
      return new DivisionByZeroError(message);
    case 'precision':
      return new PrecisionError(message);
    case 'computation':
      return new ComputationLimitError(message);
    case 'heap':
      return new HeapPropertyError(message);
    case 'tree':
      return new TreeError(message);
    case 'index':
      return new IndexError(message);
    case 'format':
      return new FormatError(message);
    case 'roman':
      return new RomanNumeralError(message);
    default:
      return new HypernumError(message);
  }
}