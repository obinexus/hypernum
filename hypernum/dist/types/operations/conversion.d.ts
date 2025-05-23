/**
 * Conversion operations module for Hypernum library
 * Provides functions for converting numbers between different formats and bases
 */
import { RoundingMode } from '../utils/precision';
/**
 * Options for conversion operations
 */
export interface ConversionOptions {
    /** Precision for decimal operations */
    precision?: number;
    /** Rounding mode for decimal operations */
    roundingMode?: RoundingMode;
    /** Whether to use uppercase for hex/base-N output */
    uppercase?: boolean;
    /** Whether to add prefix for base-N output (0x, 0b, etc.) */
    prefix?: boolean;
    /** Minimum number of digits (pad with zeros) */
    minDigits?: number;
}
/**
 * Converts number to binary string representation
 */
export declare function toBinary(value: bigint | string | number, options?: ConversionOptions): string;
/**
 * Converts number to octal string representation
 */
export declare function toOctal(value: bigint | string | number, options?: ConversionOptions): string;
/**
 * Converts number to hexadecimal string representation
 */
export declare function toHexadecimal(value: bigint | string | number, options?: ConversionOptions): string;
/**
 * Converts number to string in specified base
 */
export declare function toBase(value: bigint | string | number, base: number, options?: ConversionOptions): string;
/**
 * Converts string from specified base to bigint
 */
export declare function fromBase(value: string, base: number): bigint;
/**
 * Converts decimal string to fraction representation
 */
export declare function toFraction(value: string): [bigint, bigint];
/**
 * Converts fraction to decimal string with specified precision
 */
export declare function fromFraction(numerator: bigint | string | number, denominator: bigint | string | number, options?: ConversionOptions): string;
/**
 * Converts scientific notation to decimal string
 */
export declare function fromScientific(value: string): string;
/**
 * Converts decimal to scientific notation
 */
export declare function toScientific(value: bigint | string | number, options?: ConversionOptions): string;
/**
* Converts Roman numeral to number
*/
export declare function fromRoman(value: string): bigint;
/**
 * Converts number to Roman numeral
 */
export declare function toRoman(value: bigint | string | number, options?: ConversionOptions): string;
declare const _default: {
    toBinary: typeof toBinary;
    toOctal: typeof toOctal;
    toHexadecimal: typeof toHexadecimal;
    toBase: typeof toBase;
    fromBase: typeof fromBase;
    toFraction: typeof toFraction;
    fromFraction: typeof fromFraction;
    fromScientific: typeof fromScientific;
    toScientific: typeof toScientific;
    fromRoman: typeof fromRoman;
    toRoman: typeof toRoman;
};
export default _default;
//# sourceMappingURL=conversion.d.ts.map