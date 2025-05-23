/**
 * Conversion operations module for Hypernum library
 * Provides functions for converting numbers between different formats and bases
 */

import {
    toBigInt,
    ValidationError,
  } from '../utils/validation';
  
  import {
    RoundingMode,

  } from '../utils/precision';
  
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
  
  const DEFAULT_OPTIONS: Required<ConversionOptions> = {
    precision: 0,
    roundingMode: RoundingMode.HALF_EVEN,
    uppercase: false,
    prefix: false,
    minDigits: 1
  };
  
  /**
   * Converts number to binary string representation
   */
  export function toBinary(
    value: bigint | string | number,
    options: ConversionOptions = {}
  ): string {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    
    let binary = bigValue.toString(2);
    
    // Pad with zeros if needed
    while (binary.length < opts.minDigits) {
      binary = '0' + binary;
    }
    
    return opts.prefix ? '0b' + binary : binary;
  }
  
  /**
   * Converts number to octal string representation
   */
  export function toOctal(
    value: bigint | string | number,
    options: ConversionOptions = {}
  ): string {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    
    let octal = bigValue.toString(8);
    
    while (octal.length < opts.minDigits) {
      octal = '0' + octal;
    }
    
    return opts.prefix ? '0o' + octal : octal;
  }
  
  /**
   * Converts number to hexadecimal string representation
   */
  export function toHexadecimal(
    value: bigint | string | number,
    options: ConversionOptions = {}
  ): string {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    
    let hex = bigValue.toString(16);
    
    if (opts.uppercase) {
      hex = hex.toUpperCase();
    }
    
    while (hex.length < opts.minDigits) {
      hex = '0' + hex;
    }
    
    return opts.prefix ? '0x' + hex : hex;
  }
  
  /**
   * Converts number to string in specified base
   */
  export function toBase(
    value: bigint | string | number,
    base: number,
    options: ConversionOptions = {}
  ): string {
    if (base < 2 || base > 36) {
      throw new ValidationError('Base must be between 2 and 36');
    }
    
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    
    let result = bigValue.toString(base);
    
    if (opts.uppercase) {
      result = result.toUpperCase();
    }
    
    while (result.length < opts.minDigits) {
      result = '0' + result;
    }
    
    return result;
  }
  
  /**
   * Converts string from specified base to bigint
   */
  export function fromBase(
    value: string,
    base: number
  ): bigint {
    if (base < 2 || base > 36) {
      throw new ValidationError('Base must be between 2 and 36');
    }
    
    // Remove base prefixes if present
    const cleanValue = value.toLowerCase()
      .replace(/^0x/, '')  // hex
      .replace(/^0b/, '')  // binary
      .replace(/^0o/, ''); // octal
    
    try {
      return BigInt(`${base}n${cleanValue}`);
    } catch (error) {
      throw new ValidationError(`Invalid number format for base ${base}: ${value}`);
    }
  }
  
  /**
   * Converts decimal string to fraction representation
   */
  export function toFraction(
    value: string,
  ): [bigint, bigint] {
    
    // Split into integer and decimal parts
    const [intPart, decPart = ''] = value.split('.');
    
    if (!decPart) {
      return [toBigInt(intPart), 1n];
    }
    
    // Convert decimal to fraction
    const numerator = toBigInt(intPart + decPart);
    const denominator = 10n ** BigInt(decPart.length);
    
    // Simplify fraction
    const gcd = calculateGCD(numerator, denominator);
    
    return [numerator / gcd, denominator / gcd];
  }
  
  /**
   * Converts fraction to decimal string with specified precision
   */
  export function fromFraction(
    numerator: bigint | string | number,
    denominator: bigint | string | number,
    options: ConversionOptions = {}
  ): string {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigNumerator = toBigInt(numerator);
    const bigDenominator = toBigInt(denominator);
    
    if (bigDenominator === 0n) {
      throw new ValidationError('Denominator cannot be zero');
    }
    
    const quotient = bigNumerator / bigDenominator;
    const remainder = bigNumerator % bigDenominator;
    
    if (remainder === 0n || opts.precision === 0) {
      return quotient.toString();
    }
    
    // Calculate decimal part
    const scaleFactor = 10n ** BigInt(opts.precision);
    const scaledRemainder = (remainder * scaleFactor) / bigDenominator;
    
    return `${quotient}.${scaledRemainder.toString().padStart(opts.precision, '0')}`;
  }
  
  /**
   * Converts scientific notation to decimal string
   */
  export function fromScientific(
    value: string,
  ): string {
    
    // Parse scientific notation format
    const match = value.match(/^(-?\d+\.?\d*)[eE]([+-]?\d+)$/);
    if (!match) {
      throw new ValidationError('Invalid scientific notation format');
    }
    
    const [, significand, exponent] = match;
    const exp = parseInt(exponent || '0', 10);
    
    // Convert to regular decimal
    if (exp >= 0) {
      if (significand === undefined) {
        throw new ValidationError('Invalid scientific notation format');
      }
      return (BigInt(significand.replace('.', '')) * (10n ** BigInt(exp))).toString();
    } else {
      const absExp = Math.abs(exp);
      if (significand === undefined) {
        throw new ValidationError('Invalid scientific notation format');
      }
      const scaledValue = BigInt(significand.replace('.', ''));
      return (scaledValue / (10n ** BigInt(absExp))).toString();
    }
  }
  
  /**
   * Converts decimal to scientific notation
   */
  export function toScientific(
    value: bigint | string | number,
    options: ConversionOptions = {}
  ): string {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const bigValue = toBigInt(value);
    
    if (bigValue === 0n) {
      return '0e0';
    }
    
    const str = bigValue.toString();
    const firstDigit = str[0] === '-' ? str[1] : str[0];
    const exponent = str.length - (str[0] === '-' ? 2 : 1);
    
    let result = firstDigit;
    if (str.length > 1) {
      const restDigits = str.slice(str[0] === '-' ? 2 : 1);
      if (opts.precision > 0) {
        result += '.' + restDigits.slice(0, opts.precision);
      }
    }
    
    if (str[0] === '-') {
      result = '-' + result;
    }
    
    return `${result}e${exponent}`;
  }
  
  /**
   * Calculates Greatest Common Divisor (helper function)
   */
  function calculateGCD(a: bigint, b: bigint): bigint {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    
    while (b !== 0n) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    
    return a;
  }
  

  /**
 * Converts Roman numeral to number
 */
export function fromRoman(value: string): bigint {
    const romanValues = new Map<string, number>([
      ['I', 1],
      ['V', 5],
      ['X', 10],
      ['L', 50],
      ['C', 100],
      ['D', 500],
      ['M', 1000]
    ]);
  
    let result = 0;
    let prevValue = 0;
  
    // Process from right to left
    for (let i = value.length - 1; i >= 0; i--) {
      const char = value[i]?.toUpperCase() ?? '';
      const current = romanValues.get(char);
  
      if (current === undefined) {
        throw new ValidationError(`Invalid Roman numeral character: ${char}`);
      }
  
      if (current >= prevValue) {
        result += current;
      } else {
        result -= current;
      }
  
      prevValue = current;
    }
  
    return BigInt(result);
  }
  
  /**
   * Converts number to Roman numeral
   */
  export function toRoman(
    value: bigint | string | number,
    options: ConversionOptions = {}
  ): string {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const num = Number(toBigInt(value));
  
    if (num <= 0 || num > 3999) {
      throw new ValidationError('Number must be between 1 and 3999 for Roman numerals');
    }
  
    // Define symbol pairs with proper typing
    type RomanPair = [string, string];
    type RomanSingle = [string];
    type RomanSymbol = RomanPair | RomanSingle;
  
    const romanSymbols: RomanSymbol[] = [
      ['I', 'V'], // ones
      ['X', 'L'], // tens
      ['C', 'D'], // hundreds
      ['M']       // thousands
    ];
  
    let result = '';
    let position = 0;
    let remaining = num;
  
    while (remaining > 0) {
      const digit = remaining % 10;
      const symbols = romanSymbols[position];
  
      if (!symbols) {
        break; // Safety check for position overflow
      }
  
      const unit = symbols[0];
      const five = symbols[1] ?? '';
      const next = position < 3 ? romanSymbols[position + 1]?.[0] ?? '' : '';
  
      let digitStr = '';
      if (digit === 9 && next) {
        digitStr = unit + next;
      } else if (digit >= 5 && five) {
        digitStr = five + unit.repeat(digit - 5);
      } else if (digit === 4 && five) {
        digitStr = unit + five;
      } else {
        digitStr = unit.repeat(digit);
      }
  
      result = digitStr + result;
      remaining = Math.floor(remaining / 10);
      position++;
    }
  
    return opts.uppercase ? result : result.toLowerCase();
  }
  export default {
    toBinary,
    toOctal,
    toHexadecimal,
    toBase,
    fromBase,
    toFraction,
    fromFraction,
    fromScientific,
    toScientific,
    fromRoman,
    toRoman
  };