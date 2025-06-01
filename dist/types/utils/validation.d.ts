/**
 * Validation utilities for Hypernum library
 * Provides type checking and validation functions for large number operations
 */
export declare class ValidationError extends Error {
    constructor(message: string);
}
export declare class OverflowError extends Error {
    constructor(message: string);
}
export declare const isBigInt: (value: unknown) => value is bigint;
export declare const isValidNumberString: (value: string) => boolean;
export declare const isValidNumber: (value: unknown) => value is number;
export declare const toBigInt: (value: unknown) => bigint;
export declare const validateRange: (value: bigint, min?: bigint, max?: bigint) => void;
export declare const checkAdditionOverflow: (a: bigint, b: bigint) => void;
export declare const checkMultiplicationOverflow: (a: bigint, b: bigint) => void;
export declare const checkPowerOverflow: (base: bigint, exponent: bigint) => void;
export declare const validateArrayLength: (length: number) => void;
export declare const validateArrayIndex: (index: number, length: number) => void;
export declare const validateTreeNode: (value: unknown) => void;
export declare const validateHeapProperty: <T>(value: T, parent: T | undefined, comparator: (a: T, b: T) => -1 | 0 | 1, isMinHeap: boolean) => void;
export declare const validateAckermannInput: (m: number, n: number) => void;
export declare const isInRange: (value: bigint, min: bigint, max: bigint) => boolean;
export declare const isPowerOfTwo: (value: bigint) => boolean;
export declare const validatePositive: (value: bigint) => void;
export declare const validateNonNegative: (value: bigint) => void;
//# sourceMappingURL=validation.d.ts.map