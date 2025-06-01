/**
 * Formatting utilities for Hypernum library
 * Provides functions for formatting large numbers and converting between different representations
 */

import { ValidationError } from './validation';

// Types for formatting options
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

// Default formatting options
const DEFAULT_OPTIONS: Required<FormatOptions> = {
  notation: 'standard',
  precision: 0,
  grouping: true,
  groupSize: 3,
  decimalSeparator: '.',
  groupSeparator: ',',
};

/**
 * Formats a BigInt value according to specified options
 */
export const formatBigInt = (value: bigint, options: FormatOptions = {}): string => {
  const opts: Required<FormatOptions> = { ...DEFAULT_OPTIONS, ...options };
  
  // Handle negative numbers
  const isNegative = value < BigInt(0);
  const absValue = isNegative ? -value : value;
  
  let result: string;
  switch (opts.notation) {
    case 'scientific':
      result = formatScientific(absValue, opts).coefficient + 'e' + 
               formatScientific(absValue, opts).exponent;
      break;
    case 'engineering':
      result = formatEngineering(absValue, opts);
      break;
    case 'compact':
      result = formatCompact(absValue, opts);
      break;
    default:
      result = formatStandard(absValue, opts);
  }
  
  return isNegative ? '-' + result : result;
};

/**
 * Formats a number in standard notation with grouping
 */
const formatStandard = (value: bigint, options: Required<FormatOptions>): string => {
  let str = value.toString();
  
  if (!options.grouping) {
    return str;
  }
  
  // Apply grouping from the right
  const result: string[] = [];
  let position = str.length;
  
  while (position > 0) {
    const start = Math.max(0, position - options.groupSize);
    result.unshift(str.slice(start, position));
    position = start;
  }
  
  return result.join(options.groupSeparator);
};

/**
 * Converts a number to scientific notation
 */
const formatScientific = (value: bigint, options: Required<FormatOptions>): ScientificNotation => {
  if (value === BigInt(0)) {
    return { coefficient: '0', exponent: 0 };
  }
  
  const str = value.toString();
  const exponent = str.length - 1;
  
  let coefficient = str[0] || '';
  coefficient += options.decimalSeparator + str.slice(1, options.precision + 1);
  
  return {
    coefficient: coefficient,
    exponent: exponent,
  };
};

/**
 * Formats a number in engineering notation (exponents divisible by 3)
 */
const formatEngineering = (value: bigint, options: Required<FormatOptions>): string => {
  if (value === BigInt(0)) {
    return '0';
  }
  
  const str = value.toString();
  const len = str.length;
  const exponent = Math.floor((len - 1) / 3) * 3;
  
  let coefficient = '';
  const digitsBeforePoint = len - exponent;
  
  for (let i = 0; i < Math.min(len, digitsBeforePoint + options.precision); i++) {
    if (i === digitsBeforePoint && i < len) {
      coefficient += options.decimalSeparator;
    }
    coefficient += str[i];
  }
  
  return `${coefficient}e${exponent}`;
};

/**
 * Formats a number in compact notation (K, M, B, T)
 */
const formatCompact = (value: bigint, options: Required<FormatOptions>): string => {
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
  const str = value.toString();
  const len = str.length;
  
  if (len <= 3) {
    return formatStandard(value, options);
  }
  
  const suffixIndex = Math.min(Math.floor((len - 1) / 3), suffixes.length - 1);
  const suffix = suffixes[suffixIndex];
  
  const scale = BigInt(10) ** BigInt(suffixIndex * 3);
  const scaledValue = value / scale;
  
  let result = scaledValue.toString();
  if (options.precision > 0) {
    const remainder = value % scale;
    if (remainder > BigInt(0)) {
      const decimalPart = remainder.toString().padStart(3, '0').slice(0, options.precision);
      result += options.decimalSeparator + decimalPart;
    }
  }
  
  return result + suffix;
};

/**
 * Parses a formatted string back to BigInt
 */
export const parseBigIntString = (str: string, options: FormatOptions = {}): bigint => {
  const opts: Required<FormatOptions> = { ...DEFAULT_OPTIONS, ...options };
  
  // Remove grouping separators
  let cleanStr = str.replace(new RegExp(`\\${opts.groupSeparator}`, 'g'), '');
  
  // Handle scientific notation
  if (cleanStr.toLowerCase().includes('e')) {
    const [coefficient, exponent] = cleanStr.toLowerCase().split('e');
    const base = BigInt(10);
    const exp = BigInt(exponent || '0');
    return BigInt(Math.floor(Number(coefficient))) * (base ** exp);
  }
  
  // Handle suffixes
  const suffixMap = new Map([
    ['k', BigInt(1000)],
    ['m', BigInt(1000000)],
    ['b', BigInt(1000000000)],
    ['t', BigInt(1000000000000)],
    ['q', BigInt(1000000000000000)],
  ]);
  
  const suffix = cleanStr.slice(-1).toLowerCase();
  const multiplier = suffixMap.get(suffix);
  if (multiplier) {
    cleanStr = cleanStr.slice(0, -1);
    const value = BigInt(Math.floor(Number(cleanStr)));
    return value * multiplier;
  }
  
  // Handle regular numbers
  return BigInt(cleanStr);
};

/**
 * Normalizes a string representation for comparison
 */
export const normalizeNumberString = (str: string): string => {
  // Remove all spaces and separators
  str = str.replace(/[\s,]/g, '');
  
  // Handle scientific notation
  if (str.toLowerCase().includes('e')) {
    const [coefficient, exponent] = str.toLowerCase().split('e');
    const exp = parseInt(exponent || '0');
    const coef = parseFloat(coefficient || '0');
    return (coef * Math.pow(10, exp)).toString();
  }
  
  return str;
};

/**
 * Formats a number for display in a tree structure
 */
export const formatTreeValue = (value: bigint, depth: number = 0): string => {
  const indent = '  '.repeat(depth);
  return `${indent}${formatBigInt(value, { notation: 'compact' })}`;
};

/**
 * Formats a range of numbers for display
 */
export const formatRange = (start: bigint, end: bigint, options: FormatOptions = {}): string => {
  return `[${formatBigInt(start, options)} ... ${formatBigInt(end, options)}]`;
};

/**
 * Formats a percentage
 */
export const formatPercentage = (value: bigint, total: bigint, precision: number = 2): string => {
  if (total === BigInt(0)) {
    throw new ValidationError('Cannot calculate percentage with zero total');
  }
  
  const percentage = (Number(value) * 100) / Number(total);
  return `${percentage.toFixed(precision)}%`;
};