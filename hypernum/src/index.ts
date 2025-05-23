/**
 * Hypernum - A TypeScript/JavaScript library for large number operations
 */
import { HypernumConfig, mergeConfig, validateConfig } from './core';
import { Hypernum } from './core/hypernum';
import { RoundingMode } from './utils/precision';

// Version
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const packagePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../package.json');
const { version: VERSION } = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

// Core exports
export { Hypernum } from './core/hypernum';
export * from './core/constants';
export * from './core/common';
export * from './core/config';

// Re-export errors with explicit names to avoid conflicts
export { 
  HypernumError,
  ComputationLimitError,
  DataStructureError,
  DivisionByZeroError,
  FormatError,
  HeapPropertyError,
  IndexError,
  PrecisionError,
  RomanNumeralError,
  TreeError,
  UnderflowError
} from './core/errors';

// Data structures with explicit imports and exports
export { AckermannStructure } from './structures/ackermann';
export { BigArray, type BigArrayOptions } from './structures/big-array';
export { NumberTree } from './structures/number-tree';
export { PowerTower } from './structures/power-tower';
export { MinHeap, MaxHeap, type Comparator } from './storage/';

// Operations with explicit exports
export {
  add,
  subtract,
  multiply,
  divide,
  remainder,
  abs,
  sign,
  gcd,
  lcm
} from './operations/arithmetic';

export {
  and,
  or,
  xor,
  not,
  leftShift,
  rightShift,
  unsignedRightShift,
  rotateLeft,
  rotateRight,
  popCount,
  trailingZeros,
  leadingZeros,
  getBit,
  setBit,
  clearBit,
  toggleBit
} from './operations/bitwise';

export {
  compare,
  equals,
  lessThan,
  lessThanOrEqual,
  greaterThan,
  greaterThanOrEqual,
  between,
  max,
  min,
  clamp,
  allEqual,
  isAscending,
  isDescending,
  createComparator
} from './operations/comparison';

export {
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
} from './operations/conversion';

export {
  factorial,
  binomial,
  subfactorial,
  risingFactorial,
  fallingFactorial,
  multiFactorial,
  primorial
} from './operations/factorial';

export {
  power,
  sqrt,
  nthRoot,
  tetration,
  superRoot
} from './operations/power';

// Utils with explicit exports
export {
  toBigInt,
  validateNonNegative,
  validatePositive,
  checkAdditionOverflow,
  checkMultiplicationOverflow,
  checkPowerOverflow
} from './utils/validation';

export {
  formatBigInt,
  parseBigIntString,
  normalizeNumberString
} from './utils/formatting';

export {
  RoundingMode,
  round,
  scaleByPowerOfTen,
  scaledDivision,
  normalizePrecision
} from './utils/precision';

/**
 * Creates a new Hypernum instance with custom configuration
 */
export function createHypernum(config?: Partial<HypernumConfig>): Hypernum {
  const mergedConfig = mergeConfig(config || {});
  validateConfig(mergedConfig);
  
  const instanceConfig = {
    precision: 'arithmetic' in mergedConfig 
      ? mergedConfig.arithmetic.defaultPrecision 
      : mergedConfig.precision ?? 0,
    roundingMode: 'arithmetic' in mergedConfig 
      ? mergedConfig.arithmetic.defaultRoundingMode 
      : (mergedConfig.roundingMode as RoundingMode) ?? RoundingMode.HALF_EVEN,
    checkOverflow: 'arithmetic' in mergedConfig 
      ? mergedConfig.arithmetic.checkOverflow 
      : mergedConfig.checkOverflow ?? true,
    maxSteps: 'arithmetic' in mergedConfig 
      ? mergedConfig.arithmetic.maxComputationSteps 
      : mergedConfig.maxSteps ?? 1000,
    debug: 'debug' in mergedConfig && typeof mergedConfig.debug === 'object' 
      ? mergedConfig.debug.verbose 
      : false
  };
  
  return new Hypernum(instanceConfig);
}

// Default instance
export const defaultHypernum = createHypernum();

// Export version
export { VERSION };

// Default export
export default Hypernum;