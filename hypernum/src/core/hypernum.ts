/**
 * Main Hypernum class that provides a high-level interface to all library functionality
 */


import {
  DEFAULT_OPTIONS,
  FEATURES,
  MAX_PRECISION,
  MAX_COMPUTATION_STEPS
} from './constants';
import { 
  HypernumError, 
  ValidationError, 
  OverflowError 
} from './errors';


// Import all operations and structures
import * as arithmetic from '../operations/arithmetic';
import * as bitwise from '../operations/bitwise';
import * as power from '../operations/power';
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

export class Hypernum {
  private readonly config: Required<HypernumConfig>;
  private readonly structures: {
    arrays: Map<string, BigArray<bigint>>;
    trees: Map<string, NumberTree>;
    heaps: Map<string, MinHeap<bigint> | MaxHeap<bigint>>;
  };

  constructor(config: HypernumConfig = {}) {
    this.config = {
      precision: config.precision ?? DEFAULT_OPTIONS.precision,
      roundingMode: config.roundingMode ?? DEFAULT_OPTIONS.roundingMode as precision.RoundingMode,
      checkOverflow: config.checkOverflow ?? DEFAULT_OPTIONS.checkOverflow,
      maxSteps: config.maxSteps ?? DEFAULT_OPTIONS.maxSteps,
      debug: config.debug ?? FEATURES.DEBUG_MODE
    };

    // Validate configuration
    if (this.config.precision < 0 || this.config.precision > MAX_PRECISION) {
      throw new ValidationError(`Precision must be between 0 and ${MAX_PRECISION}`);
    }
    if (this.config.maxSteps < 1 || this.config.maxSteps > MAX_COMPUTATION_STEPS) {
      throw new ValidationError(`Max steps must be between 1 and ${MAX_COMPUTATION_STEPS}`);
    }

    // Initialize data structure storage
    this.structures = {
      arrays: new Map(),
      trees: new Map(),
      heaps: new Map()
    };
  }

  // Arithmetic Operations
  public add(a: bigint | string | number, b: bigint | string | number): bigint {
    return arithmetic.add(a, b, this.config);
  }

  public subtract(a: bigint | string | number, b: bigint | string | number): bigint {
    return arithmetic.subtract(a, b, this.config);
  }

  public multiply(a: bigint | string | number, b: bigint | string | number): bigint {
    return arithmetic.multiply(a, b, this.config);
  }

  public divide(a: bigint | string | number, b: bigint | string | number): bigint {
    return arithmetic.divide(a, b, this.config);
  }

  public mod(a: bigint | string | number, b: bigint | string | number): bigint {
    return arithmetic.remainder(a, b, this.config);
  }

  // Power Operations
  public power(base: bigint | string | number, exponent: bigint | string | number): bigint {
    return power.power(base, exponent, this.config);
  }

  public sqrt(value: bigint | string | number): bigint {
    return power.sqrt(value, this.config);
  }

  public nthRoot(value: bigint | string | number, n: bigint | string | number): bigint {
    return power.nthRoot(value, n, this.config);
  }

  // Bitwise Operations
  public and(a: bigint | string | number, b: bigint | string | number): bigint {
    return bitwise.and(a, b);
  }

  public or(a: bigint | string | number, b: bigint | string | number): bigint {
    return bitwise.or(a, b);
  }

  public xor(a: bigint | string | number, b: bigint | string | number): bigint {
    return bitwise.xor(a, b);
  }

  public not(value: bigint | string | number): bigint {
    return bitwise.not(value);
  }
 /**
   * Calculates the greatest common divisor of two numbers
   */
 public gcd(a: bigint | string | number, b: bigint | string | number): bigint {
  return arithmetic.gcd(a, b);
}

/**
 * Calculates the least common multiple of two numbers
 */
public lcm(a: bigint | string | number, b: bigint | string | number): bigint {
  return arithmetic.lcm(a, b);
}
  // Data Structure Management
  public createArray(id: string): BigArray<bigint> {
    if (this.structures.arrays.has(id)) {
      throw new ValidationError(`Array with id '${id}' already exists`);
    }
    const array = new BigArray<bigint>();
    this.structures.arrays.set(id, array);
    return array;
  }

  public getArray(id: string): BigArray<bigint> {
    const array = this.structures.arrays.get(id);
    if (!array) {
      throw new ValidationError(`Array with id '${id}' not found`);
    }
    return array;
  }

  public createTree(id: string): NumberTree {
    if (this.structures.trees.has(id)) {
      throw new ValidationError(`Tree with id '${id}' already exists`);
    }
    const tree = new NumberTree();
    this.structures.trees.set(id, tree);
    return tree;
  }

  public getTree(id: string): NumberTree {
    const tree = this.structures.trees.get(id);
    if (!tree) {
      throw new ValidationError(`Tree with id '${id}' not found`);
    }
    return tree;
  }

  public createHeap(id: string, isMinHeap: boolean = true): MinHeap<bigint> | MaxHeap<bigint> {
    if (this.structures.heaps.has(id)) {
      throw new ValidationError(`Heap with id '${id}' already exists`);
    }
    const heap = isMinHeap ? new MinHeap<bigint>(this.compareValues) : new MaxHeap<bigint>(this.compareValues);
    this.structures.heaps.set(id, heap);
    return heap;
  }

  public getHeap(id: string): MinHeap<bigint> | MaxHeap<bigint> {
    const heap = this.structures.heaps.get(id);
    if (!heap) {
      throw new ValidationError(`Heap with id '${id}' not found`);
    }
    return heap;
  }

  // Special Functions
  public createAckermannStructure(): AckermannStructure {
    return new AckermannStructure();
  }

  // Formatting and Validation
  public format(value: bigint | string | number, options?: formatting.FormatOptions): string {
    const bigValue = validation.toBigInt(value);
    return formatting.formatBigInt(bigValue, options);
  }

  public validate(value: unknown): boolean {
    try {
      validation.toBigInt(value);
      return true;
    } catch {
      return false;
    }
  }

  // Configuration Management
  public updateConfig(newConfig: Partial<HypernumConfig>): void {
    Object.assign(this.config, newConfig);
  }

  public getConfig(): Readonly<Required<HypernumConfig>> {
    return { ...this.config };
  }

  // Utility Functions
  private compareValues(a: bigint, b: bigint): -1 | 0 | 1 {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  // Cleanup
  public dispose(): void {
    this.structures.arrays.clear();
    this.structures.trees.clear();
    this.structures.heaps.clear();
  }
}

// Export additional types and utilities
export {
  HypernumError,
  ValidationError,
  OverflowError,
  precision,
  formatting,
  validation
};

export default Hypernum;