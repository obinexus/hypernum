/**
 * Parser utilities for Hypernum library
 * Provides functions for parsing various number formats and notations
 */

import { ValidationError } from './validation';
import { RoundingMode } from './precision';

/**
 * Supported number format types
 */
export enum NumberFormat {
  STANDARD = 'STANDARD',         // Regular decimal notation
  SCIENTIFIC = 'SCIENTIFIC',     // Scientific notation (e.g., 1.23e4)
  ENGINEERING = 'ENGINEERING',   // Engineering notation (e.g., 1.23e6)
  COMPACT = 'COMPACT',          // Compact notation with suffixes (e.g., 1.23M)
  FRACTION = 'FRACTION',        // Fractional notation (e.g., 1/3)
  PERCENTAGE = 'PERCENTAGE',    // Percentage notation (e.g., 12.3%)
  HEXADECIMAL = 'HEXADECIMAL',  // Hex notation (e.g., 0xFF)
  BINARY = 'BINARY',           // Binary notation (e.g., 0b1010)
  OCTAL = 'OCTAL'             // Octal notation (e.g., 0o777)
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

const DEFAULT_PARSE_OPTIONS: Required<ParseOptions> = {
  format: NumberFormat.STANDARD,
  base: 10,
  allowFractions: false,
  rounding: RoundingMode.HALF_EVEN,
  precision: 0,
  strict: true
};

/**
 * Parse any supported number format to BigInt
 */
export const parseNumber = (input: string, options: ParseOptions = {}): bigint => {
  const opts: Required<ParseOptions> = { ...DEFAULT_PARSE_OPTIONS, ...options };
  
  // Remove whitespace if not in strict mode
  const str = opts.strict ? input : input.trim();
  
  if (str === '') {
    throw new ValidationError('Empty string cannot be parsed as a number');
  }
  
  try {
    switch (opts.format) {
      case NumberFormat.SCIENTIFIC:
      case NumberFormat.ENGINEERING:
        return parseScientificNotation(str);
      case NumberFormat.COMPACT:
        return parseCompactNotation(str);
      case NumberFormat.FRACTION:
        return parseFraction(str, opts.rounding, opts.precision);
      case NumberFormat.PERCENTAGE:
        return parsePercentage(str);
      case NumberFormat.HEXADECIMAL:
        return parseBaseNotation(str, 16);
      case NumberFormat.BINARY:
        return parseBaseNotation(str, 2);
      case NumberFormat.OCTAL:
        return parseBaseNotation(str, 8);
      default:
        return parseStandardNotation(str);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError(`Failed to parse number: ${input}`);
  }
};

/**
 * Parse standard decimal notation
 */
const parseStandardNotation = (str: string): bigint => {
  // Remove commas and validate format
  const cleanStr = str.replace(/,/g, '');
  if (!/^-?\d+$/.test(cleanStr)) {
    throw new ValidationError('Invalid standard notation format');
  }
  
  return BigInt(cleanStr);
};

/**
 * Parse scientific notation (e.g., 1.23e4)
 */
const parseScientificNotation = (str: string): bigint => {
  const match = str.match(/^(-?\d*\.?\d+)e([+-]?\d+)$/i);
  if (!match) {
    throw new ValidationError('Invalid scientific notation format');
  }
  
  const [, coefficient, exponent] = match;
  if (!coefficient) {
    throw new ValidationError('Invalid scientific notation format');
  }
  const [intPart, fracPart = ''] = coefficient.split('.');
  const normalizedCoef = intPart + fracPart;
  const adjustedExp = parseInt(exponent || '0') - fracPart.length;
  
  if (adjustedExp >= 0) {
    return BigInt(normalizedCoef) * (BigInt(10) ** BigInt(adjustedExp));
  } else {
    return BigInt(normalizedCoef) / (BigInt(10) ** BigInt(-adjustedExp));
  }
};

/**
 * Parse compact notation with suffixes (e.g., 1.23M)
 */
const parseCompactNotation = (str: string): bigint => {
  const match = str.match(/^(-?\d*\.?\d+)\s*([KMBTQ])$/i);
  if (!match) {
    throw new ValidationError('Invalid compact notation format');
  }
  
  const [, number, suffix] = match;
  const value = parseFloat(number || '0');
  
  const multipliers = {
    K: 1000n,
    M: 1000000n,
    B: 1000000000n,
    T: 1000000000000n,
    Q: 1000000000000000n
  };
  
  if (!suffix) {
    throw new ValidationError('Invalid compact notation format');
  }
  
  const multiplier = multipliers[suffix.toUpperCase() as keyof typeof multipliers];
  return BigInt(Math.round(value * Number(multiplier)));
};

/**
 * Parse fraction notation (e.g., 1/3)
 */
const parseFraction = (
  str: string,
  rounding: RoundingMode = RoundingMode.HALF_EVEN,
  precision: number = 0
): bigint => {
  const [numerator, denominator] = str.split('/');
  if (!numerator || !denominator) {
    throw new ValidationError('Invalid fraction format');
  }
  
  const num = BigInt(numerator);
  const den = BigInt(denominator);
  
  if (den === 0n) {
    throw new ValidationError('Division by zero in fraction');
  }
  
  const scale = BigInt(10) ** BigInt(precision);
  const scaledResult = (num * scale) / den;
  
  // Apply rounding if needed
  if (rounding === RoundingMode.FLOOR) {
    return scaledResult;
  } else if (rounding === RoundingMode.CEIL) {
    return scaledResult + (num * scale % den === 0n ? 0n : 1n);
  }
  
  return scaledResult;
};

/**
 * Parse percentage notation (e.g., 12.3%)
 */
const parsePercentage = (str: string): bigint => {
  const match = str.match(/^(-?\d*\.?\d+)%$/);
  if (!match) {
    throw new ValidationError('Invalid percentage format');
  }
  
  const value = parseFloat(match[1] || '0');
  return BigInt(Math.round(value * 100));
};

/**
 * Parse number in different bases (binary, octal, hex)
 */
const parseBaseNotation = (str: string, base: number): bigint => {
  let cleanStr = str.toLowerCase();
  
  // Remove prefix if present
  const prefixes: Record<number, string> = {
    2: '0b',
    8: '0o',
    16: '0x'
  };
  
  const prefix = prefixes[base];
  if (prefix && cleanStr.startsWith(prefix)) {
    cleanStr = cleanStr.slice(2);
  }
  
  // Validate characters based on base
  const validChars = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    16: /^[0-9a-f]+$/
  };
  
  if (!validChars[base as keyof typeof validChars].test(cleanStr)) {
    throw new ValidationError(`Invalid ${base}-base number format`);
  }
  
  return BigInt(`0${prefixes[base]}${cleanStr}`);
};

/**
 * Detect number format from string
 */
export const detectNumberFormat = (str: string): NumberFormat => {
  const cleanStr = str.trim();
  
  if (/^-?\d+$/.test(cleanStr)) return NumberFormat.STANDARD;
  if (/^-?\d*\.?\d+e[+-]?\d+$/i.test(cleanStr)) return NumberFormat.SCIENTIFIC;
  if (/^-?\d*\.?\d+[KMBTQ]$/i.test(cleanStr)) return NumberFormat.COMPACT;
  if (/^-?\d+\/\d+$/.test(cleanStr)) return NumberFormat.FRACTION;
  if (/^-?\d*\.?\d+%$/.test(cleanStr)) return NumberFormat.PERCENTAGE;
  if (/^(0x|0X)[0-9a-fA-F]+$/.test(cleanStr)) return NumberFormat.HEXADECIMAL;
  if (/^(0b|0B)[01]+$/.test(cleanStr)) return NumberFormat.BINARY;
  if (/^(0o|0O)[0-7]+$/.test(cleanStr)) return NumberFormat.OCTAL;
  
  throw new ValidationError('Unable to detect number format');
};