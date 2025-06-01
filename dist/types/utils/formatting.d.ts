/**
 * Formatting utilities for Hypernum library
 * Provides functions for formatting large numbers and converting between different representations
 */
export interface FormatOptions {
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
    precision?: number;
    grouping?: boolean;
    groupSize?: number;
    decimalSeparator?: string;
    groupSeparator?: string;
}
export interface ScientificNotation {
    coefficient: string;
    exponent: number;
}
export interface ScientificNotation {
    coefficient: string;
    exponent: number;
}
/**
 * Formats a BigInt value according to specified options
 */
export declare const formatBigInt: (value: bigint, options?: FormatOptions) => string;
/**
 * Parses a formatted string back to BigInt
 */
export declare const parseBigIntString: (str: string, options?: FormatOptions) => bigint;
/**
 * Normalizes a string representation for comparison
 */
export declare const normalizeNumberString: (str: string) => string;
/**
 * Formats a number for display in a tree structure
 */
export declare const formatTreeValue: (value: bigint, depth?: number) => string;
/**
 * Formats a range of numbers for display
 */
export declare const formatRange: (start: bigint, end: bigint, options?: FormatOptions) => string;
/**
 * Formats a percentage
 */
export declare const formatPercentage: (value: bigint, total: bigint, precision?: number) => string;
//# sourceMappingURL=formatting.d.ts.map