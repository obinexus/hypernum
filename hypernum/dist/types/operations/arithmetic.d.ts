/**
 * Arithmetic operations module for Hypernum library
 * Provides high-precision arithmetic operations with BigInt support
 */
import { RoundingMode } from '../utils/precision';
/**
 * Options for arithmetic operations
 */
export interface ArithmeticOptions {
    precision?: number;
    roundingMode?: RoundingMode;
    checkOverflow?: boolean;
}
/**
 * Adds two numbers with optional precision and overflow checking
 */
export declare function add(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Subtracts two numbers with optional precision and overflow checking
 */
export declare function subtract(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Multiplies two numbers with optional precision and overflow checking
 */
export declare function multiply(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Divides two numbers with specified precision and rounding
 */
export declare function divide(numerator: bigint | string | number, denominator: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Calculates remainder with optional precision
 */
export declare function remainder(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Raises a number to a power with optional precision
 */
export declare function power(base: bigint | string | number, exponent: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Calculates the square root with specified precision
 */
export declare function sqrt(value: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Calculates the absolute value
 */
export declare function abs(value: bigint | string | number): bigint;
/**
 * Returns the sign of a number (-1, 0, or 1)
 */
export declare function sign(value: bigint | string | number): bigint;
/**
 * Calculates the greatest common divisor of two numbers
 */
export declare function gcd(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Calculates the least common multiple of two numbers
 */
export declare function lcm(a: bigint | string | number, b: bigint | string | number): bigint;
declare const _default: {
    add: typeof add;
    subtract: typeof subtract;
    multiply: typeof multiply;
    divide: typeof divide;
    remainder: typeof remainder;
    power: typeof power;
    sqrt: typeof sqrt;
    abs: typeof abs;
    sign: typeof sign;
    gcd: typeof gcd;
    lcm: typeof lcm;
};
export default _default;
//# sourceMappingURL=arithmetic.d.ts.map