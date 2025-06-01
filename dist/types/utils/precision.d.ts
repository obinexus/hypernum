/**
 * Precision utilities for Hypernum library
 * Provides functions for handling decimal precision and rounding operations
 */
/**
 * Rounding modes for decimal operations
 */
export declare enum RoundingMode {
    FLOOR = "FLOOR",// Round towards negative infinity
    CEIL = "CEIL",// Round towards positive infinity
    DOWN = "DOWN",// Round towards zero
    UP = "UP",// Round away from zero
    HALF_EVEN = "HALF_EVEN",// Round to nearest even number when tied (Banker's rounding)
    HALF_UP = "HALF_UP",// Round up when tied
    HALF_DOWN = "HALF_DOWN"
}
/**
 * Scale a bigint by a power of 10
 */
export declare const scaleByPowerOfTen: (value: bigint, power: number) => bigint;
/**
 * Round a number according to specified mode and precision
 */
export declare const round: (value: bigint, precision?: number, mode?: RoundingMode) => bigint;
/**
 * Calculate precision required to represent a number without loss
 */
export declare const calculateRequiredPrecision: (value: bigint) => number;
/**
 * Normalize two numbers to the same precision
 */
export declare const normalizePrecision: (a: bigint, b: bigint, precisionA: number, precisionB: number) => [bigint, bigint];
/**
 * Scale a division operation to achieve desired precision
 */
export declare const scaledDivision: (numerator: bigint, denominator: bigint, precision: number, roundingMode?: RoundingMode) => bigint;
/**
 * Calculate the number of significant digits
 */
export declare const significantDigits: (value: bigint) => number;
/**
 * Truncate to specified number of significant digits
 */
export declare const truncateToSignificantDigits: (value: bigint, digits: number, roundingMode?: RoundingMode) => bigint;
/**
 * Check if two numbers are equal within a specified precision
 */
export declare const equalWithinPrecision: (a: bigint, b: bigint, precision: number) => boolean;
/**
 * Get the fractional part of a number at a given precision
 */
export declare const getFractionalPart: (value: bigint, precision: number) => bigint;
/**
 * Format a number with exact precision (no rounding)
 */
export declare const toExactPrecision: (value: bigint, precision: number) => string;
//# sourceMappingURL=precision.d.ts.map