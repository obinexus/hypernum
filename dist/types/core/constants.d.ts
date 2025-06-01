/**
 * Core constants for Hypernum library
 * Defines fundamental values and limits used across the library
 */
export declare const MAX_SAFE_INTEGER: bigint;
export declare const MIN_SAFE_INTEGER: bigint;
export declare const MAX_PRECISION = 100;
export declare const MAX_COMPUTATION_STEPS = 1000;
export declare const MAX_BITS = 1024;
export declare const ZERO: bigint;
export declare const ONE: bigint;
export declare const TWO: bigint;
export declare const TEN: bigint;
export declare const NEGATIVE_ONE: bigint;
export declare const MAX_POWER_BASE: bigint;
export declare const MAX_POWER_EXPONENT: bigint;
export declare const MAX_TETRATION_HEIGHT: bigint;
export declare const MAX_FACTORIAL_INPUT: bigint;
export declare const DEFAULT_TREE_MAX_DEPTH = 1000;
export declare const DEFAULT_HEAP_INITIAL_CAPACITY = 16;
export declare const DEFAULT_ARRAY_GROWTH_FACTOR = 2;
export declare const MIN_ARRAY_CAPACITY = 16;
export declare const DEFAULT_DECIMAL_SEPARATOR = ".";
export declare const DEFAULT_GROUP_SEPARATOR = ",";
export declare const DEFAULT_GROUP_SIZE = 3;
export declare const MAX_GROUP_SIZE = 10;
export declare const MIN_ROMAN_VALUE = 1;
export declare const MAX_ROMAN_VALUE = 3999;
export declare const MAX_ACKERMANN_M = 4;
export declare const MAX_ACKERMANN_N = 1000;
export declare const DEFAULT_CACHE_SIZE = 1000;
export declare const MAX_CACHE_SIZE = 10000;
export declare const ERROR_MESSAGES: {
    readonly OVERFLOW: "Operation would result in overflow";
    readonly UNDERFLOW: "Operation would result in underflow";
    readonly NEGATIVE_ROOT: "Cannot compute root of negative number";
    readonly NEGATIVE_EXPONENT: "Negative exponents not supported for integers";
    readonly DIVISION_BY_ZERO: "Division by zero";
    readonly INVALID_PRECISION: "Precision must be non-negative and not exceed MAX_PRECISION";
    readonly INVALID_BASE: "Base must be a positive integer";
    readonly INVALID_ROMAN: "Invalid Roman numeral";
    readonly COMPUTATION_LIMIT: "Computation exceeded maximum allowed steps";
    readonly NEGATIVE_INDEX: "Array index cannot be negative";
    readonly TREE_DEPTH_EXCEEDED: "Maximum tree depth exceeded";
    readonly INVALID_HEAP_PROPERTY: "Heap property violation detected";
};
export declare const FEATURES: {
    readonly OVERFLOW_CHECKING: true;
    readonly AUTOMATIC_PRECISION: true;
    readonly MEMOIZATION: true;
    readonly TREE_BALANCING: true;
    readonly DEBUG_MODE: false;
};
export declare const DEFAULT_OPTIONS: {
    readonly precision: 0;
    readonly roundingMode: "HALF_EVEN";
    readonly checkOverflow: true;
    readonly maxSteps: 1000;
    readonly grouping: true;
    readonly uppercase: false;
    readonly cache: true;
};
export declare const NUMBER_UNITS: readonly [{
    readonly value: 1n;
    readonly symbol: "";
}, {
    readonly value: 1000n;
    readonly symbol: "K";
}, {
    readonly value: 1000000n;
    readonly symbol: "M";
}, {
    readonly value: 1000000000n;
    readonly symbol: "B";
}, {
    readonly value: 1000000000000n;
    readonly symbol: "T";
}, {
    readonly value: 1000000000000000n;
    readonly symbol: "Q";
}];
export declare const PERFORMANCE: {
    readonly WARN_THRESHOLD_MS: 100;
    readonly ERROR_THRESHOLD_MS: 1000;
    readonly MAX_ARRAY_SIZE: 1000000;
    readonly MAX_TREE_SIZE: 1000000;
};
//# sourceMappingURL=constants.d.ts.map