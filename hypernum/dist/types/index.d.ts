/**
 * Hypernum - A TypeScript/JavaScript library for large number operations
 */
import { HypernumConfig } from './core';
import { Hypernum } from './core/hypernum';
declare const VERSION: any;
export { Hypernum } from './core/hypernum';
export * from './core/constants';
export * from './core/common';
export * from './core/config';
export { HypernumError, ComputationLimitError, DataStructureError, DivisionByZeroError, FormatError, HeapPropertyError, IndexError, PrecisionError, RomanNumeralError, TreeError, UnderflowError } from './core/errors';
export { AckermannStructure } from './structures/ackermann';
export { BigArray, type BigArrayOptions } from './structures/big-array';
export { NumberTree } from './structures/number-tree';
export { PowerTower } from './structures/power-tower';
export { MinHeap, MaxHeap, type Comparator } from './storage/';
export { add, subtract, multiply, divide, remainder, abs, sign, gcd, lcm } from './operations/arithmetic';
export { and, or, xor, not, leftShift, rightShift, unsignedRightShift, rotateLeft, rotateRight, popCount, trailingZeros, leadingZeros, getBit, setBit, clearBit, toggleBit } from './operations/bitwise';
export { compare, equals, lessThan, lessThanOrEqual, greaterThan, greaterThanOrEqual, between, max, min, clamp, allEqual, isAscending, isDescending, createComparator } from './operations/comparison';
export { toBinary, toOctal, toHexadecimal, toBase, fromBase, toFraction, fromFraction, fromScientific, toScientific, fromRoman, toRoman } from './operations/conversion';
export { factorial, binomial, subfactorial, risingFactorial, fallingFactorial, multiFactorial, primorial } from './operations/factorial';
export { power, sqrt, nthRoot, tetration, superRoot } from './operations/power';
export { toBigInt, validateNonNegative, validatePositive, checkAdditionOverflow, checkMultiplicationOverflow, checkPowerOverflow } from './utils/validation';
export { formatBigInt, parseBigIntString, normalizeNumberString } from './utils/formatting';
export { RoundingMode, round, scaleByPowerOfTen, scaledDivision, normalizePrecision } from './utils/precision';
/**
 * Creates a new Hypernum instance with custom configuration
 */
export declare function createHypernum(config?: Partial<HypernumConfig>): Hypernum;
export declare const defaultHypernum: Hypernum;
export { VERSION };
export default Hypernum;
//# sourceMappingURL=index.d.ts.map