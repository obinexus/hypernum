/**
 * Parser utilities for Hypernum library
 * Provides functions for parsing various number formats and notations
 */
import { RoundingMode } from './precision';
/**
 * Supported number format types
 */
export declare enum NumberFormat {
    STANDARD = "STANDARD",// Regular decimal notation
    SCIENTIFIC = "SCIENTIFIC",// Scientific notation (e.g., 1.23e4)
    ENGINEERING = "ENGINEERING",// Engineering notation (e.g., 1.23e6)
    COMPACT = "COMPACT",// Compact notation with suffixes (e.g., 1.23M)
    FRACTION = "FRACTION",// Fractional notation (e.g., 1/3)
    PERCENTAGE = "PERCENTAGE",// Percentage notation (e.g., 12.3%)
    HEXADECIMAL = "HEXADECIMAL",// Hex notation (e.g., 0xFF)
    BINARY = "BINARY",// Binary notation (e.g., 0b1010)
    OCTAL = "OCTAL"
}
/**
 * Options for parsing numbers
 */
export interface ParseOptions {
    format?: NumberFormat;
    base?: number;
    allowFractions?: boolean;
    rounding?: RoundingMode;
    precision?: number;
    strict?: boolean;
}
/**
 * Parse any supported number format to BigInt
 */
export declare const parseNumber: (input: string, options?: ParseOptions) => bigint;
/**
 * Detect number format from string
 */
export declare const detectNumberFormat: (str: string) => NumberFormat;
//# sourceMappingURL=parser.d.ts.map