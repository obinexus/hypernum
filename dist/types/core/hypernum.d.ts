/**
 * Main Hypernum class that provides a high-level interface to all library functionality
 */
import { HypernumError, ValidationError, OverflowError } from './errors';
import { BigArray, NumberTree, AckermannStructure } from '../structures';
import * as formatting from '../utils/formatting';
import * as validation from '../utils/validation';
import * as precision from '../utils/precision';
import { MinHeap, MaxHeap } from '@/storage';
/**
 * Configuration options for Hypernum instance
 */
export interface HypernumConfig {
    precision?: number;
    roundingMode?: precision.RoundingMode;
    checkOverflow?: boolean;
    maxSteps?: number;
    debug?: boolean;
}
export declare class Hypernum {
    private readonly config;
    private readonly structures;
    constructor(config?: HypernumConfig);
    add(a: bigint | string | number, b: bigint | string | number): bigint;
    subtract(a: bigint | string | number, b: bigint | string | number): bigint;
    multiply(a: bigint | string | number, b: bigint | string | number): bigint;
    divide(a: bigint | string | number, b: bigint | string | number): bigint;
    mod(a: bigint | string | number, b: bigint | string | number): bigint;
    power(base: bigint | string | number, exponent: bigint | string | number): bigint;
    sqrt(value: bigint | string | number): bigint;
    nthRoot(value: bigint | string | number, n: bigint | string | number): bigint;
    and(a: bigint | string | number, b: bigint | string | number): bigint;
    or(a: bigint | string | number, b: bigint | string | number): bigint;
    xor(a: bigint | string | number, b: bigint | string | number): bigint;
    not(value: bigint | string | number): bigint;
    /**
      * Calculates the greatest common divisor of two numbers
      */
    gcd(a: bigint | string | number, b: bigint | string | number): bigint;
    /**
     * Calculates the least common multiple of two numbers
     */
    lcm(a: bigint | string | number, b: bigint | string | number): bigint;
    createArray(id: string): BigArray<bigint>;
    getArray(id: string): BigArray<bigint>;
    createTree(id: string): NumberTree;
    getTree(id: string): NumberTree;
    createHeap(id: string, isMinHeap?: boolean): MinHeap<bigint> | MaxHeap<bigint>;
    getHeap(id: string): MinHeap<bigint> | MaxHeap<bigint>;
    createAckermannStructure(): AckermannStructure;
    format(value: bigint | string | number, options?: formatting.FormatOptions): string;
    validate(value: unknown): boolean;
    updateConfig(newConfig: Partial<HypernumConfig>): void;
    getConfig(): Readonly<Required<HypernumConfig>>;
    private compareValues;
    dispose(): void;
}
export { HypernumError, ValidationError, OverflowError, precision, formatting, validation };
export default Hypernum;
//# sourceMappingURL=hypernum.d.ts.map