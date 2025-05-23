/**
 * Factorial operations module for Hypernum library
 * Provides efficient implementations for factorial and related computations
 */
/**
 * Options for factorial operations
 */
export interface FactorialOptions {
    /** Maximum allowed computation value */
    maxValue?: number;
    /** Whether to check for overflow */
    checkOverflow?: boolean;
    /** Cache computed values */
    useCache?: boolean;
}
/**
 * Calculates factorial of a number (n!)
 */
export declare function factorial(value: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates binomial coefficient (n choose k)
 */
export declare function binomial(n: bigint | string | number, k: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates subfactorial (derangement number)
 * Number of permutations of n elements with no fixed points
 */
export declare function subfactorial(value: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates rising factorial (Pochhammer symbol)
 * x^(n) = x(x+1)(x+2)...(x+n-1)
 */
export declare function risingFactorial(x: bigint | string | number, n: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates falling factorial
 * x_(n) = x(x-1)(x-2)...(x-n+1)
 */
export declare function fallingFactorial(x: bigint | string | number, n: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates multifactorial (n!!)
 * Product of numbers from 1 to n that leave the same remainder as n when divided by k
 */
export declare function multiFactorial(value: bigint | string | number, k?: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates primorial (product of primes up to n)
 */
export declare function primorial(value: bigint | string | number, options?: FactorialOptions): bigint;
declare const _default: {
    factorial: typeof factorial;
    binomial: typeof binomial;
    subfactorial: typeof subfactorial;
    risingFactorial: typeof risingFactorial;
    fallingFactorial: typeof fallingFactorial;
    multiFactorial: typeof multiFactorial;
    primorial: typeof primorial;
};
export default _default;
//# sourceMappingURL=factorial.d.ts.map