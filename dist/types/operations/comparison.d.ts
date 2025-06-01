/**
 * Comparison operations module for Hypernum library
 * Provides functions for comparing large numbers with precision support
 */
import { RoundingMode } from '../utils/precision';
/**
 * Options for comparison operations
 */
export interface ComparisonOptions {
    precision?: number;
    roundingMode?: RoundingMode;
    tolerance?: number;
}
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
export declare function compare(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): ComparisonResult;
/**
 * Checks if two numbers are equal
 */
export declare function equals(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Checks if first number is less than second
 */
export declare function lessThan(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Checks if first number is less than or equal to second
 */
export declare function lessThanOrEqual(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Checks if first number is greater than second
 */
export declare function greaterThan(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Checks if first number is greater than or equal to second
 */
export declare function greaterThanOrEqual(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Checks if a number is between two others (inclusive)
 */
export declare function between(value: bigint | string | number, min: bigint | string | number, max: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Finds the maximum value in an array of numbers
 */
export declare function max(values: Array<bigint | string | number>, options?: ComparisonOptions): bigint;
/**
 * Finds the minimum value in an array of numbers
 */
export declare function min(values: Array<bigint | string | number>, options?: ComparisonOptions): bigint;
/**
 * Clamps a value between minimum and maximum bounds
 */
export declare function clamp(value: bigint | string | number, min: bigint | string | number, max: bigint | string | number, options?: ComparisonOptions): bigint;
/**
 * Checks if all values in array are equal within tolerance
 */
export declare function allEqual(values: Array<bigint | string | number>, options?: ComparisonOptions): boolean;
/**
 * Checks if values are in ascending order
 */
export declare function isAscending(values: Array<bigint | string | number>, options?: ComparisonOptions): boolean;
/**
 * Checks if values are in descending order
 */
export declare function isDescending(values: Array<bigint | string | number>, options?: ComparisonOptions): boolean;
/**
 * Creates a comparator function for sorting
 */
export declare function createComparator(options?: ComparisonOptions): (a: bigint | string | number, b: bigint | string | number) => number;
declare const _default: {
    compare: typeof compare;
    equals: typeof equals;
    lessThan: typeof lessThan;
    lessThanOrEqual: typeof lessThanOrEqual;
    greaterThan: typeof greaterThan;
    greaterThanOrEqual: typeof greaterThanOrEqual;
    between: typeof between;
    max: typeof max;
    min: typeof min;
    clamp: typeof clamp;
    allEqual: typeof allEqual;
    isAscending: typeof isAscending;
    isDescending: typeof isDescending;
    createComparator: typeof createComparator;
};
export default _default;
//# sourceMappingURL=comparison.d.ts.map