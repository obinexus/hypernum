/**
 * Power operations module for Hypernum library
 * Provides efficient implementations for exponentiation and related operations
 */
import { RoundingMode } from '../utils/precision';
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
/**
 * Raises a number to an integer power using binary exponentiation
 */
export declare function power(baseValue: bigint | string | number, exponentValue: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates square root using Newton's method
 */
export declare function sqrt(value: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates nth root using Newton's method
 */
export declare function nthRoot(value: bigint | string | number, n: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates tetration (repeated exponentiation)
 * a↑↑n = a^(a^(a^...)) (n times)
 */
export declare function tetration(base: bigint | string | number, height: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates super-root (inverse tetration)
 * Finds x where x↑↑n = value
 */
export declare function superRoot(value: bigint | string | number, height: bigint | string | number, options?: PowerOptions): bigint;
declare const _default: {
    power: typeof power;
    sqrt: typeof sqrt;
    nthRoot: typeof nthRoot;
    tetration: typeof tetration;
    superRoot: typeof superRoot;
};
export default _default;
//# sourceMappingURL=power.d.ts.map