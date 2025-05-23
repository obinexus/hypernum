/**
 * Precision utilities for Hypernum library
 * Provides functions for handling decimal precision and rounding operations
 */

import { ValidationError } from './validation';

/**
 * Rounding modes for decimal operations
 */
export enum RoundingMode {
  FLOOR = 'FLOOR',           // Round towards negative infinity
  CEIL = 'CEIL',             // Round towards positive infinity
  DOWN = 'DOWN',             // Round towards zero
  UP = 'UP',                 // Round away from zero
  HALF_EVEN = 'HALF_EVEN',   // Round to nearest even number when tied (Banker's rounding)
  HALF_UP = 'HALF_UP',       // Round up when tied
  HALF_DOWN = 'HALF_DOWN',   // Round down when tied
}

/**
 * Scale a bigint by a power of 10
 */
export const scaleByPowerOfTen = (value: bigint, power: number): bigint => {
  if (power === 0) return value;
  if (power > 0) {
    return value * (BigInt(10) ** BigInt(power));
  }
  return value / (BigInt(10) ** BigInt(-power));
};

/**
 * Round a number according to specified mode and precision
 */
export const round = (
  value: bigint,
  precision: number = 0,
  mode: RoundingMode = RoundingMode.HALF_EVEN
): bigint => {
  if (precision < 0) {
    throw new ValidationError('Precision must be non-negative');
  }

  if (precision === 0) {
    return value;
  }

  const scale = BigInt(10) ** BigInt(precision);
  const scaled = value / scale;
  const remainder = value % scale;

  switch (mode) {
    case RoundingMode.FLOOR:
      return scaled * scale;

    case RoundingMode.CEIL:
      return remainder > 0n ? (scaled + 1n) * scale : scaled * scale;

    case RoundingMode.DOWN:
      return value >= 0n ? scaled * scale : (scaled - 1n) * scale;

    case RoundingMode.UP:
      return value >= 0n ? (scaled + 1n) * scale : scaled * scale;

    case RoundingMode.HALF_UP:
      return remainder >= scale / 2n ? (scaled + 1n) * scale : scaled * scale;

    case RoundingMode.HALF_DOWN:
      return remainder > scale / 2n ? (scaled + 1n) * scale : scaled * scale;

    case RoundingMode.HALF_EVEN:
      if (remainder === scale / 2n) {
        return scaled % 2n === 0n ? scaled * scale : (scaled + 1n) * scale;
      }
      return remainder > scale / 2n ? (scaled + 1n) * scale : scaled * scale;

    default:
      throw new ValidationError('Invalid rounding mode');
  }
};

/**
 * Calculate precision required to represent a number without loss
 */
export const calculateRequiredPrecision = (value: bigint): number => {
  if (value === 0n) return 0;
  
  const str = value.toString();
  const nonZeroIndex = str.split('').reverse().findIndex(char => char !== '0');
  return nonZeroIndex === -1 ? 0 : nonZeroIndex;
};

/**
 * Normalize two numbers to the same precision
 */
export const normalizePrecision = (
  a: bigint,
  b: bigint,
  precisionA: number,
  precisionB: number
): [bigint, bigint] => {
  const targetPrecision = Math.max(precisionA, precisionB);
  
  const scaledA = scaleByPowerOfTen(a, targetPrecision - precisionA);
  const scaledB = scaleByPowerOfTen(b, targetPrecision - precisionB);
  
  return [scaledA, scaledB];
};

/**
 * Scale a division operation to achieve desired precision
 */
export const scaledDivision = (
  numerator: bigint,
  denominator: bigint,
  precision: number,
  roundingMode: RoundingMode = RoundingMode.HALF_EVEN
): bigint => {
  if (denominator === 0n) {
    throw new ValidationError('Division by zero');
  }

  if (precision < 0) {
    throw new ValidationError('Precision must be non-negative');
  }

  // Scale up numerator to handle desired precision
  const scaledNumerator = scaleByPowerOfTen(numerator, precision);
  const quotient = scaledNumerator / denominator;
  
  return round(quotient, 0, roundingMode);
};

/**
 * Calculate the number of significant digits
 */
export const significantDigits = (value: bigint): number => {
  const nonZeroPattern = /[1-9]/;
  const str = value.toString();
  const firstSignificant = str.search(nonZeroPattern);
  if (firstSignificant === -1) return 0;
  
  const lastSignificant = str.split('').reverse().findIndex(char => char !== '0');
  return str.length - firstSignificant - (lastSignificant === -1 ? 0 : lastSignificant);
};

/**
 * Truncate to specified number of significant digits
 */
export const truncateToSignificantDigits = (
  value: bigint,
  digits: number,
  roundingMode: RoundingMode = RoundingMode.HALF_EVEN
): bigint => {
  if (digits <= 0) {
    throw new ValidationError('Number of significant digits must be positive');
  }

  const currentDigits = significantDigits(value);
  
  if (currentDigits <= digits) {
    return value;
  }

  const scale = currentDigits - digits;
  return round(value, scale, roundingMode);
};

/**
 * Check if two numbers are equal within a specified precision
 */
export const equalWithinPrecision = (
  a: bigint,
  b: bigint,
  precision: number
): boolean => {
  const diff = a - b;
  const tolerance = BigInt(10) ** BigInt(precision);
  return diff.toString().length <= tolerance.toString().length;
};

/**
 * Get the fractional part of a number at a given precision
 */
export const getFractionalPart = (
  value: bigint,
  precision: number
): bigint => {
  if (precision <= 0) return 0n;
  
  const scale = BigInt(10) ** BigInt(precision);
  return value % scale;
};

/**
 * Format a number with exact precision (no rounding)
 */
export const toExactPrecision = (value: bigint, precision: number): string => {
  if (precision < 0) {
    throw new ValidationError('Precision must be non-negative');
  }

  let str = value.toString();
  const isNegative = str.startsWith('-');
  if (isNegative) {
    str = str.slice(1);
  }

  while (str.length <= precision) {
    str = '0' + str;
  }

  const integerPart = str.slice(0, -precision) || '0';
  const fractionalPart = str.slice(-precision);

  return `${isNegative ? '-' : ''}${integerPart}.${fractionalPart}`;
};