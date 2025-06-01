/**
 * Custom error types for Hypernum library
 * Provides specific error classes for different types of errors that can occur
 * during mathematical operations and data structure manipulations
 */
/**
 * Base error class for Hypernum library
 * All other error classes inherit from this
 */
export declare class HypernumError extends Error {
    constructor(message: string);
}
/**
 * Error for validation failures
 */
export declare class ValidationError extends HypernumError {
    constructor(message: string);
}
/**
 * Error for arithmetic overflow conditions
 */
export declare class OverflowError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for arithmetic underflow conditions
 */
export declare class UnderflowError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for division by zero
 */
export declare class DivisionByZeroError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for precision-related issues
 */
export declare class PrecisionError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for computation limits exceeded
 */
export declare class ComputationLimitError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for invalid operations on data structures
 */
export declare class DataStructureError extends HypernumError {
    constructor(message: string);
}
/**
 * Error for heap property violations
 */
export declare class HeapPropertyError extends DataStructureError {
    constructor(message?: string);
}
/**
 * Error for tree-related issues
 */
export declare class TreeError extends DataStructureError {
    constructor(message?: string);
}
/**
 * Error for array index out of bounds
 */
export declare class IndexError extends DataStructureError {
    constructor(message?: string);
}
/**
 * Error for invalid number format or conversion
 */
export declare class FormatError extends HypernumError {
    constructor(message: string);
}
/**
 * Error for invalid Roman numeral operations
 */
export declare class RomanNumeralError extends FormatError {
    constructor(message?: string);
}
/**
 * Type guard to check if an error is a Hypernum error
 */
export declare function isHypernumError(error: unknown): error is HypernumError;
/**
 * Helper function to wrap unknown errors into HypernumError
 */
export declare function wrapError(error: unknown): HypernumError;
/**
 * Helper function to create an appropriate error from a message and optional type
 */
export declare function createError(message: string, type?: string): HypernumError;
//# sourceMappingURL=errors.d.ts.map