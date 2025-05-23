import { Comparator as Comparator$1 } from '@/core';
import { MinHeap as MinHeap$1, MaxHeap as MaxHeap$1 } from '@/storage';

/**
 * Precision utilities for Hypernum library
 * Provides functions for handling decimal precision and rounding operations
 */
/**
 * Rounding modes for decimal operations
 */
declare enum RoundingMode {
    FLOOR = "FLOOR",// Round towards negative infinity
    CEIL = "CEIL",// Round towards positive infinity
    DOWN = "DOWN",// Round towards zero
    UP = "UP",// Round away from zero
    HALF_EVEN = "HALF_EVEN",// Round to nearest even number when tied (Banker's rounding)
    HALF_UP = "HALF_UP",// Round up when tied
    HALF_DOWN = "HALF_DOWN"
}
/**
 * Scale a bigint by a power of 10
 */
declare const scaleByPowerOfTen: (value: bigint, power: number) => bigint;
/**
 * Round a number according to specified mode and precision
 */
declare const round: (value: bigint, precision?: number, mode?: RoundingMode) => bigint;
/**
 * Normalize two numbers to the same precision
 */
declare const normalizePrecision: (a: bigint, b: bigint, precisionA: number, precisionB: number) => [bigint, bigint];
/**
 * Scale a division operation to achieve desired precision
 */
declare const scaledDivision: (numerator: bigint, denominator: bigint, precision: number, roundingMode?: RoundingMode) => bigint;

/**
 * Common type definitions for Hypernum library
 * Contains shared types used throughout the library's modules
 */

/**
 * Valid input types for numeric values
 */
type NumericInput = bigint | string | number;
/**
 * Result type for operations that may fail
 */
type Result<T> = {
    /** Whether the operation succeeded */
    success: boolean;
    /** The operation result if successful */
    value?: T;
    /** Error message if operation failed */
    error?: string;
};
/**
 * Base options interface for operations
 */
interface BaseOptions {
    /** Decimal precision for operations */
    precision?: number;
    /** Rounding mode for decimal operations */
    roundingMode?: RoundingMode;
    /** Whether to check for overflow */
    checkOverflow?: boolean;
}
/**
 * Options for number formatting
 */
interface FormatOptions$1 extends BaseOptions {
    /** Number notation style */
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
    /** Enable grouping separators */
    grouping?: boolean;
    /** Size of digit groups */
    groupSize?: number;
    /** Decimal point character */
    decimalSeparator?: string;
    /** Grouping separator character */
    groupSeparator?: string;
    /** Convert to uppercase (for special formats) */
    uppercase?: boolean;
}
/**
 * Cache configuration
 */
interface CacheConfig {
    /** Maximum number of entries */
    maxSize: number;
    /** Time-to-live in milliseconds */
    ttl?: number;
    /** Eviction policy */
    evictionPolicy?: 'LRU' | 'LFU' | 'FIFO';
}
/**
 * Mathematical constants configuration
 */
interface MathConstantsConfig {
    /** Precision for constant calculations */
    precision: number;
    /** Enable caching of computed values */
    cache?: boolean;
    /** Custom calculation algorithm */
    algorithm?: 'series' | 'iteration' | 'approximation';
}
/**
 * Debug configuration
 */
interface DebugConfig {
    /** Enable detailed logging */
    verbose: boolean;
    /** Track operation performance */
    trackPerformance: boolean;
    /** Log level */
    logLevel: 'error' | 'warn' | 'info' | 'debug';
}
/**
 * Numeric range specification
 */
interface NumericRange {
    /** Start of range (inclusive) */
    start: bigint;
    /** End of range (inclusive) */
    end: bigint;
    /** Step size for iteration */
    step?: bigint;
}
/**
 * Operation status monitoring
 */
interface OperationStatus {
    /** Current phase of operation */
    phase: string;
    /** Percentage complete (0-100) */
    progress: number;
    /** Estimated time remaining (ms) */
    estimatedTimeRemaining?: number;
    /** Memory usage in bytes */
    memoryUsage?: number;
    /** Computation steps completed */
    steps: number;
}
/**
 * Performance metrics
 */
interface PerformanceMetrics {
    /** Operation execution time (ms) */
    executionTime: number;
    /** Number of computation steps */
    steps: number;
    /** Peak memory usage (bytes) */
    peakMemory: number;
    /** Cache hit rate (0-1) */
    cacheHitRate?: number;
}
/**
 * Progress callback type
 */
type ProgressCallback = (status: OperationStatus) => void;
/**
 * Error callback type
 */
type ErrorCallback = (error: Error, phase: string) => void;
/**
 * Value validation function type
 */
type Validator<T> = (value: T) => boolean;
/**
 * Node statistics interface
 */
interface NodeStats$1 {
    /** Node height in tree */
    height: number;
    /** Subtree size */
    size: number;
    /** Sum of subtree values */
    sum: bigint;
    /** Minimum value in subtree */
    min: bigint;
    /** Maximum value in subtree */
    max: bigint;
}
/**
 * Operation options interface
 */
interface OperationOptions extends BaseOptions {
    /** Maximum computation steps */
    maxSteps?: number;
    /** Progress callback */
    onProgress?: ProgressCallback;
    /** Error callback */
    onError?: ErrorCallback;
    /** Value validator */
    validator?: Validator<bigint>;
}

/**
 * Configuration type definitions for Hypernum library
 * Defines all configuration options and their default values
 */

/**
 * Basic configuration options for simple usage
 */
interface BasicConfig {
    /** Decimal precision for operations */
    precision?: number;
    /** Rounding mode for decimal operations */
    roundingMode?: RoundingMode;
    /** Whether to check for overflow */
    checkOverflow?: boolean;
    /** Maximum allowed computation steps */
    maxSteps?: number;
    /** Enable debug mode */
    debug?: boolean;
}
/**
 * Configuration for arithmetic operations
 */
interface ArithmeticConfig {
    /** Default precision for decimal operations */
    defaultPrecision: number;
    /** Default rounding mode */
    defaultRoundingMode: RoundingMode;
    /** Whether to check for overflow by default */
    checkOverflow: boolean;
    /** Maximum steps for iterative calculations */
    maxComputationSteps: number;
    /** Configure automatic precision adjustment */
    autoPrecision: {
        enabled: boolean;
        maxPrecision: number;
        minPrecision: number;
    };
    /** Constants calculation configuration */
    constants: MathConstantsConfig;
}
/**
 * Configuration for data structures
 */
interface DataStructuresConfig {
    /** Array configuration */
    array: {
        initialCapacity: number;
        growthFactor: number;
        maxSize: number;
    };
    /** Tree configuration */
    tree: {
        maxDepth: number;
        autoBalance: boolean;
        nodeLimit: number;
    };
    /** Heap configuration */
    heap: {
        initialCapacity: number;
        growthPolicy: 'double' | 'linear' | 'fibonacci';
        validatePropertyOnOperation: boolean;
    };
    /** Cache configuration */
    cache: CacheConfig & {
        enabled: boolean;
        persistToDisk: boolean;
        compressionEnabled: boolean;
    };
}
/**
 * Configuration for number formatting
 */
interface FormattingConfig extends FormatOptions$1 {
    /** Scientific notation configuration */
    scientific: {
        /** Minimum exponent to trigger scientific notation */
        minExponent: number;
        /** Maximum significant digits */
        maxSignificantDigits: number;
        /** Exponent separator character */
        exponentSeparator: string;
    };
    /** Engineering notation configuration */
    engineering: {
        /** Use SI prefixes */
        useSIPrefixes: boolean;
        /** Custom unit definitions */
        customUnits?: Map<number, string>;
    };
    /** Localization settings */
    localization: {
        /** Locale identifier */
        locale: string;
        /** Custom number formatting */
        numberFormat?: Intl.NumberFormatOptions;
        /** Use locale-specific grouping */
        useLocaleGrouping: boolean;
    };
}
/**
 * Configuration for performance monitoring
 */
interface PerformanceConfig {
    /** Enable performance tracking */
    enableTracking: boolean;
    /** Sampling rate for metrics (0-1) */
    samplingRate: number;
    /** Performance thresholds */
    thresholds: {
        /** Warning threshold in milliseconds */
        warnThresholdMs: number;
        /** Error threshold in milliseconds */
        errorThresholdMs: number;
        /** Maximum allowed memory usage in bytes */
        maxMemoryBytes: number;
    };
    /** Metrics collection configuration */
    metrics: {
        /** Enable detailed operation timing */
        timing: boolean;
        /** Track memory usage */
        memory: boolean;
        /** Track cache performance */
        cache: boolean;
        /** Custom metrics to track */
        custom?: Map<string, (operation: any) => number>;
    };
}
/**
 * Feature flags for optional functionality
 */
interface FeatureFlags {
    /** Enable experimental features */
    experimentalFeatures: boolean;
    /** Use WebAssembly implementations when available */
    useWasm: boolean;
    /** Enable worker thread support */
    workerThreads: boolean;
    /** Enable SharedArrayBuffer support */
    sharedArrayBuffer: boolean;
    /** Enable BigInt64Array support */
    bigIntTypedArrays: boolean;
}
/**
 * Full configuration interface with all options
 */
interface FullConfig {
    /** Arithmetic operation configuration */
    arithmetic: ArithmeticConfig;
    /** Data structure configuration */
    dataStructures: DataStructuresConfig;
    /** Formatting configuration */
    formatting: FormattingConfig;
    /** Performance configuration */
    performance: PerformanceConfig;
    /** Debug configuration */
    debug: DebugConfig;
    /** Feature flags */
    features: FeatureFlags;
    /** Custom configuration options */
    custom?: Map<string, any>;
}
/**
 * Converts FullConfig to BasicConfig if necessary
 */
declare function convertToBasicConfig(config: HypernumConfig$1): BasicConfig;
/**
 * Combined configuration type that can be either basic or full
 */
type HypernumConfig$1 = BasicConfig | FullConfig;
/**
 * Default configuration values for basic config
 */
declare const DEFAULT_BASIC_CONFIG: Required<BasicConfig>;
/**
 * Full default configuration values
 */
declare const DEFAULT_FULL_CONFIG: FullConfig;
/**
 * Type guard to check if config is a full configuration
 */
declare function isFullConfig(config: HypernumConfig$1): config is FullConfig;
/**
 * Type guard to check if config is a basic configuration
 */
declare function isBasicConfig(config: HypernumConfig$1): config is BasicConfig;
/**
 * Validates configuration values
 */
declare function validateConfig(config: HypernumConfig$1): void;
/**
 * Merges configuration with appropriate defaults
 */
declare function mergeConfig(custom?: Partial<HypernumConfig$1>): HypernumConfig$1;

/**
 * Custom error types for Hypernum library
 * Provides specific error classes for different types of errors that can occur
 * during mathematical operations and data structure manipulations
 */
/**
 * Base error class for Hypernum library
 * All other error classes inherit from this
 */
declare class HypernumError extends Error {
    constructor(message: string);
}
/**
 * Error for arithmetic underflow conditions
 */
declare class UnderflowError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for division by zero
 */
declare class DivisionByZeroError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for precision-related issues
 */
declare class PrecisionError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for computation limits exceeded
 */
declare class ComputationLimitError extends HypernumError {
    constructor(message?: string);
}
/**
 * Error for invalid operations on data structures
 */
declare class DataStructureError extends HypernumError {
    constructor(message: string);
}
/**
 * Error for heap property violations
 */
declare class HeapPropertyError extends DataStructureError {
    constructor(message?: string);
}
/**
 * Error for tree-related issues
 */
declare class TreeError extends DataStructureError {
    constructor(message?: string);
}
/**
 * Error for array index out of bounds
 */
declare class IndexError extends DataStructureError {
    constructor(message?: string);
}
/**
 * Error for invalid number format or conversion
 */
declare class FormatError extends HypernumError {
    constructor(message: string);
}
/**
 * Error for invalid Roman numeral operations
 */
declare class RomanNumeralError extends FormatError {
    constructor(message?: string);
}

/**
 * Core constants for Hypernum library
 * Defines fundamental values and limits used across the library
 */
declare const MAX_SAFE_INTEGER: bigint;
declare const MIN_SAFE_INTEGER: bigint;
declare const MAX_PRECISION = 100;
declare const MAX_COMPUTATION_STEPS = 1000;
declare const MAX_BITS = 1024;
declare const ZERO: bigint;
declare const ONE: bigint;
declare const TWO: bigint;
declare const TEN: bigint;
declare const NEGATIVE_ONE: bigint;
declare const MAX_POWER_BASE: bigint;
declare const MAX_POWER_EXPONENT: bigint;
declare const MAX_TETRATION_HEIGHT: bigint;
declare const MAX_FACTORIAL_INPUT: bigint;
declare const DEFAULT_TREE_MAX_DEPTH = 1000;
declare const DEFAULT_HEAP_INITIAL_CAPACITY = 16;
declare const DEFAULT_ARRAY_GROWTH_FACTOR = 2;
declare const MIN_ARRAY_CAPACITY = 16;
declare const DEFAULT_DECIMAL_SEPARATOR = ".";
declare const DEFAULT_GROUP_SEPARATOR = ",";
declare const DEFAULT_GROUP_SIZE = 3;
declare const MAX_GROUP_SIZE = 10;
declare const MIN_ROMAN_VALUE = 1;
declare const MAX_ROMAN_VALUE = 3999;
declare const MAX_ACKERMANN_M = 4;
declare const MAX_ACKERMANN_N = 1000;
declare const DEFAULT_CACHE_SIZE = 1000;
declare const MAX_CACHE_SIZE = 10000;
declare const ERROR_MESSAGES: {
    readonly OVERFLOW: "Operation would result in overflow";
    readonly UNDERFLOW: "Operation would result in underflow";
    readonly NEGATIVE_ROOT: "Cannot compute root of negative number";
    readonly NEGATIVE_EXPONENT: "Negative exponents not supported for integers";
    readonly DIVISION_BY_ZERO: "Division by zero";
    readonly INVALID_PRECISION: "Precision must be non-negative and not exceed MAX_PRECISION";
    readonly INVALID_BASE: "Base must be a positive integer";
    readonly INVALID_ROMAN: "Invalid Roman numeral";
    readonly COMPUTATION_LIMIT: "Computation exceeded maximum allowed steps";
    readonly NEGATIVE_INDEX: "Array index cannot be negative";
    readonly TREE_DEPTH_EXCEEDED: "Maximum tree depth exceeded";
    readonly INVALID_HEAP_PROPERTY: "Heap property violation detected";
};
declare const FEATURES: {
    readonly OVERFLOW_CHECKING: true;
    readonly AUTOMATIC_PRECISION: true;
    readonly MEMOIZATION: true;
    readonly TREE_BALANCING: true;
    readonly DEBUG_MODE: false;
};
declare const DEFAULT_OPTIONS: {
    readonly precision: 0;
    readonly roundingMode: "HALF_EVEN";
    readonly checkOverflow: true;
    readonly maxSteps: 1000;
    readonly grouping: true;
    readonly uppercase: false;
    readonly cache: true;
};
declare const NUMBER_UNITS: readonly [{
    readonly value: 1n;
    readonly symbol: "";
}, {
    readonly value: 1000n;
    readonly symbol: "K";
}, {
    readonly value: 1000000n;
    readonly symbol: "M";
}, {
    readonly value: 1000000000n;
    readonly symbol: "B";
}, {
    readonly value: 1000000000000n;
    readonly symbol: "T";
}, {
    readonly value: 1000000000000000n;
    readonly symbol: "Q";
}];
declare const PERFORMANCE: {
    readonly WARN_THRESHOLD_MS: 100;
    readonly ERROR_THRESHOLD_MS: 1000;
    readonly MAX_ARRAY_SIZE: 1000000;
    readonly MAX_TREE_SIZE: 1000000;
};

/**
 * Interface representing an Ackermann node in the computation structure
 */
interface IAckermannNode {
    m: number;
    n: number;
    value: bigint;
    prevM?: IAckermannNode;
    prevN?: IAckermannNode;
    nextM?: IAckermannNode;
    nextN?: IAckermannNode;
}
/**
 * Type for Ackermann computation path step
 */
type ComputationStep = {
    m: number;
    n: number;
    value: bigint;
};
/**
 * Type for growth rate analysis
 */
type GrowthAnalysis = {
    value: bigint;
    increase: bigint;
    multiplier: bigint;
};
/**
 * Class representing the Ackermann function computation structure
 * Implements caching and relationship tracking between values
 */
declare class AckermannStructure {
    private nodes;
    private maxComputedM;
    private maxComputedN;
    private heap;
    constructor();
    /**
     * Generates a unique key for node storage
     */
    private static getNodeKey;
    /**
     * Computes the Ackermann function value
     * Uses recursion with memoization
     */
    private computeAckermann;
    /**
     * Adds a new node to the structure
     */
    addNode(m: number, n: number): IAckermannNode;
    /**
     * Builds nodes for a range of m and n values
     */
    buildRange(mRange: number, nRange: number): void;
    /**
     * Gets the computation path to reach A(m,n)
     */
    getComputationPath(m: number, n: number): ComputationStep[];
    /**
     * Analyzes growth rate for a fixed m value
     */
    analyzeGrowthRate(m: number): Map<number, GrowthAnalysis>;
    /**
     * Gets the largest computed value
     */
    getLargestValue(): bigint;
    /**
     * Gets a specific Ackermann value if it exists
     */
    getValue(m: number, n: number): bigint | undefined;
}

/**
 * Represents the result of a comparison operation
 * -1: first value is less than second value
 *  0: values are equal
 *  1: first value is greater than second value
 */
type ComparisonResult$1 = -1 | 0 | 1;
/**
 * Generic comparator function type for heap elements
 */
type Comparator<T> = (a: T, b: T) => ComparisonResult$1;
/**
 * Abstract base heap class implementing common heap operations
 */
declare abstract class Heap<T> {
    protected heap: T[];
    protected readonly compare: Comparator<T>;
    constructor(comparator: Comparator<T>);
    /**
     * Gets the size of the heap
     */
    size(): number;
    /**
     * Checks if the heap is empty
     */
    isEmpty(): boolean;
    /**
     * Peeks at the root element without removing it
     */
    peek(): T | undefined;
    /**
     * Inserts a new element into the heap
     */
    push(value: T): void;
    /**
     * Removes and returns the root element
     */
    pop(): T | undefined;
    /**
     * Removes all elements from the heap
     */
    clear(): void;
    /**
     * Creates a heap from an array of elements
     */
    static heapify<T extends {}>(array: T[], comparator: Comparator<T>): Heap<T>;
    /**
     * Gets the parent index of a node
     */
    protected getParentIndex(index: number): number;
    /**
     * Gets the left child index of a node
     */
    protected getLeftChildIndex(index: number): number;
    /**
     * Gets the right child index of a node
     */
    protected getRightChildIndex(index: number): number;
    /**
     * Swaps two elements in the heap
     */
    protected swap(i: number, j: number): void;
    /**
     * Moves an element up the heap until heap property is satisfied
     */
    protected abstract siftUp(index: number): void;
    /**
     * Moves an element down the heap until heap property is satisfied
     */
    protected abstract siftDown(index: number): void;
}
/**
 * MinHeap implementation where the root is the smallest element
 */
declare class MinHeap<T> extends Heap<T> {
    constructor(comparator: Comparator<T>);
    protected siftUp(index: number): void;
    protected siftDown(index: number): void;
}
/**
 * MaxHeap implementation where the root is the largest element
 */
declare class MaxHeap<T> extends Heap<T> {
    constructor(comparator: Comparator<T>);
    protected siftUp(index: number): void;
    protected siftDown(index: number): void;
}

/**
 * Type for BigArray operation result
 */
type OperationResult<T> = {
    success: boolean;
    value?: T;
    error?: string;
};
/**
 * Options for BigArray initialization
 */
interface BigArrayOptions<T> {
    initialCapacity?: number;
    growthFactor?: number;
    comparator?: Comparator$1<T>;
}
/**
 * A specialized array implementation for handling large numbers and providing
 * efficient operations with segment tree support
 */
declare class BigArray<T> {
    private data;
    private segmentTree;
    private readonly growthFactor;
    private readonly comparator;
    private size;
    private capacity;
    constructor(options?: BigArrayOptions<T>);
    /**
     * Gets the current size of the array
     */
    getSize(): number;
    /**
     * Gets the current capacity of the array
     */
    getCapacity(): number;
    /**
     * Resizes the internal array when needed
     */
    private resize;
    /**
     * Appends an element to the end of the array
     */
    push(value: T): OperationResult<number>;
    /**
     * Removes and returns the last element
     */
    pop(): OperationResult<T>;
    /**
     * Gets element at specified index
     */
    get(index: number): OperationResult<T>;
    /**
     * Sets element at specified index
     */
    set(index: number, value: T): OperationResult<T>;
    /**
     * Rebuilds the segment tree after major changes
     */
    private rebuildSegmentTree;
    /**
     * Builds a segment tree node recursively
     */
    private buildSegmentTree;
    /**
     * Updates the segment tree after a value change
     */
    private updateSegmentTree;
    /**
     * Queries the maximum value in a range
     */
    queryRange(start: number, end: number): OperationResult<T>;
    /**
     * Recursively queries the segment tree
     */
    private querySegmentTree;
    /**
     * Creates a heap from the current array
     */
    toHeap(isMin?: boolean): MinHeap<T> | MaxHeap<T>;
    /**
     * Sorts the array in-place
     */
    sort(ascending?: boolean): void;
    /**
     * Returns array as native array
     */
    toArray(): T[];
}

/**
 * Interface for tree node statistics
 */
interface NodeStats {
    height: number;
    size: number;
    sum: bigint;
    min: bigint;
    max: bigint;
}
/**
 * Interface for tree traversal configuration
 */
interface TraversalConfig {
    includeStats?: boolean;
    skipSubtrees?: boolean;
    maxDepth?: number;
}
/**
 * Class representing a node in the number tree
 */
declare class NumberNode {
    value: bigint;
    left: NumberNode | null;
    right: NumberNode | null;
    parent: NumberNode | null;
    height: number;
    size: number;
    sum: bigint;
    constructor(value: bigint | string | number);
    /**
     * Updates node statistics based on children
     */
    updateStats(): void;
    /**
     * Gets balance factor of the node
     */
    getBalance(): number;
    /**
     * Gets complete statistics for the node and its subtree
     */
    getStats(): NodeStats;
    /**
     * Finds minimum value node in the subtree
     */
    findMin(): NumberNode;
    /**
     * Finds maximum value node in the subtree
     */
    findMax(): NumberNode;
}
/**
 * AVL Tree implementation specialized for handling large numbers
 */
declare class NumberTree {
    private root;
    private readonly comparator;
    constructor(comparator?: Comparator$1<bigint>);
    /**
     * Gets the root node if it exists
     */
    getRoot(): NumberNode | null;
    /**
     * Inserts a new value into the tree
     */
    insert(value: bigint | string | number): NumberNode;
    /**
     * Recursively inserts a new node
     */
    private insertNode;
    /**
     * Balances a node using AVL rotations
     */
    private balance;
    /**
     * Performs left rotation
     */
    private rotateLeft;
    /**
     * Performs right rotation
     */
    private rotateRight;
    /**
     * Removes a value from the tree
     */
    remove(value: bigint | string | number): boolean;
    /**
     * Recursively removes a node
     */
    private removeNode;
    /**
     * Finds a node by value
     */
    find(value: bigint | string | number): NumberNode | null;
    /**
     * Traverses the tree in specified order and returns values
     */
    traverse(order?: 'inOrder' | 'preOrder' | 'postOrder', config?: TraversalConfig): bigint[];
    /**
     * Gets overall tree statistics
     */
    getTreeStats(): NodeStats | null;
    /**
     * Gets the nth smallest value in the tree
     */
    getNthValue(n: number): bigint | null;
    /**
     * Gets a range of values between start and end (inclusive)
     */
    getRange(start: bigint | string | number, end: bigint | string | number): bigint[];
}

/**
 * Interface for power tower computation options
 */
interface PowerTowerOptions {
    maxHeight?: number;
    maxValue?: bigint;
    checkOverflow?: boolean;
    precision?: number;
}
/**
 * Class representing a power tower (tetration) computation structure
 * Handles expressions of the form: a↑↑b = a^(a^(a^...)) (b times)
 */
declare class PowerTower {
    private readonly options;
    private head;
    private tail;
    private size;
    constructor(options?: PowerTowerOptions);
    /**
     * Creates a new power tower node
     */
    private createNode;
    /**
     * Validates power tower height
     */
    private validateHeight;
    /**
     * Validates value for computation
     */
    private validateValue;
    /**
     * Computes power with overflow checking
     */
    private computePower;
    /**
     * Builds a power tower of specified height with given base
     */
    build(base: bigint | number | string, height: number): void;
    /**
     * Evaluates the power tower up to specified height
     */
    evaluate(height?: number): bigint;
    /**
     * Gets the current height of the power tower
     */
    getHeight(): number;
    /**
     * Checks if the tower can be evaluated to a given height
     */
    isComputable(height?: number): boolean;
    /**
     * Gets the computation state at each level
     */
    getState(): {
        height: number;
        value: bigint;
        evaluated: boolean;
    }[];
    /**
     * Clears the power tower
     */
    clear(): void;
    /**
     * Gets the maximum computationally feasible height for a given base
     */
    static getMaxFeasibleHeight(base: bigint | number | string): number;
    /**
     * Creates a string representation of the power tower
     */
    toString(): string;
}

/**
 * Formatting utilities for Hypernum library
 * Provides functions for formatting large numbers and converting between different representations
 */
interface FormatOptions {
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
    precision?: number;
    grouping?: boolean;
    groupSize?: number;
    decimalSeparator?: string;
    groupSeparator?: string;
}
/**
 * Formats a BigInt value according to specified options
 */
declare const formatBigInt: (value: bigint, options?: FormatOptions) => string;
/**
 * Parses a formatted string back to BigInt
 */
declare const parseBigIntString: (str: string, options?: FormatOptions) => bigint;
/**
 * Normalizes a string representation for comparison
 */
declare const normalizeNumberString: (str: string) => string;

declare const toBigInt: (value: unknown) => bigint;
declare const checkAdditionOverflow: (a: bigint, b: bigint) => void;
declare const checkMultiplicationOverflow: (a: bigint, b: bigint) => void;
declare const checkPowerOverflow: (base: bigint, exponent: bigint) => void;
declare const validatePositive: (value: bigint) => void;
declare const validateNonNegative: (value: bigint) => void;

/**
 * Main Hypernum class that provides a high-level interface to all library functionality
 */

/**
 * Configuration options for Hypernum instance
 */
interface HypernumConfig {
    precision?: number;
    roundingMode?: RoundingMode;
    checkOverflow?: boolean;
    maxSteps?: number;
    debug?: boolean;
}
declare class Hypernum {
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
    createHeap(id: string, isMinHeap?: boolean): MinHeap$1<bigint> | MaxHeap$1<bigint>;
    getHeap(id: string): MinHeap$1<bigint> | MaxHeap$1<bigint>;
    createAckermannStructure(): AckermannStructure;
    format(value: bigint | string | number, options?: FormatOptions): string;
    validate(value: unknown): boolean;
    updateConfig(newConfig: Partial<HypernumConfig>): void;
    getConfig(): Readonly<Required<HypernumConfig>>;
    private compareValues;
    dispose(): void;
}

/**
 * Arithmetic operations module for Hypernum library
 * Provides high-precision arithmetic operations with BigInt support
 */

/**
 * Options for arithmetic operations
 */
interface ArithmeticOptions {
    precision?: number;
    roundingMode?: RoundingMode;
    checkOverflow?: boolean;
}
/**
 * Adds two numbers with optional precision and overflow checking
 */
declare function add(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Subtracts two numbers with optional precision and overflow checking
 */
declare function subtract(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Multiplies two numbers with optional precision and overflow checking
 */
declare function multiply(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Divides two numbers with specified precision and rounding
 */
declare function divide(numerator: bigint | string | number, denominator: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Calculates remainder with optional precision
 */
declare function remainder(a: bigint | string | number, b: bigint | string | number, options?: ArithmeticOptions): bigint;
/**
 * Calculates the absolute value
 */
declare function abs(value: bigint | string | number): bigint;
/**
 * Returns the sign of a number (-1, 0, or 1)
 */
declare function sign(value: bigint | string | number): bigint;
/**
 * Calculates the greatest common divisor of two numbers
 */
declare function gcd(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Calculates the least common multiple of two numbers
 */
declare function lcm(a: bigint | string | number, b: bigint | string | number): bigint;

/**
 * Bitwise operations module for Hypernum library
 * Provides functions for bit-level manipulations of large numbers
 */
/**
 * Options for bitwise operations
 */
interface BitwiseOptions {
    /** Maximum bits to consider in operations */
    maxBits?: number;
    /** Whether to throw on overflow */
    strict?: boolean;
}
/**
 * Performs bitwise AND operation
 */
declare function and(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Performs bitwise OR operation
 */
declare function or(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Performs bitwise XOR operation
 */
declare function xor(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Performs bitwise NOT operation
 */
declare function not(value: bigint | string | number): bigint;
/**
 * Performs left shift operation
 */
declare function leftShift(value: bigint | string | number, shift: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Performs right shift operation
 */
declare function rightShift(value: bigint | string | number, shift: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Performs unsigned right shift operation
 * Note: BigInt doesn't have >>> operator, so we implement it manually
 */
declare function unsignedRightShift(value: bigint | string | number, shift: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Rotates bits left by specified amount
 */
declare function rotateLeft(value: bigint | string | number, rotation: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Rotates bits right by specified amount
 */
declare function rotateRight(value: bigint | string | number, rotation: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Counts number of set bits (1s)
 */
declare function popCount(value: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Returns number of trailing zero bits
 */
declare function trailingZeros(value: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Returns number of leading zero bits
 */
declare function leadingZeros(value: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Returns bit at specified position
 */
declare function getBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): boolean;
/**
 * Sets bit at specified position
 */
declare function setBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Clears bit at specified position
 */
declare function clearBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Toggles bit at specified position
 */
declare function toggleBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): bigint;

/**
 * Comparison operations module for Hypernum library
 * Provides functions for comparing large numbers with precision support
 */

/**
 * Options for comparison operations
 */
interface ComparisonOptions {
    precision?: number;
    roundingMode?: RoundingMode;
    tolerance?: number;
}
/**
 * Result type for comparison operations
 * -1: first value is less than second value
 *  0: values are equal
 *  1: first value is greater than second value
 */
type ComparisonResult = -1 | 0 | 1;
/**
 * Compares two numbers with optional precision
 */
declare function compare(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): ComparisonResult;
/**
 * Checks if two numbers are equal
 */
declare function equals(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Checks if first number is less than second
 */
declare function lessThan(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Checks if first number is less than or equal to second
 */
declare function lessThanOrEqual(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Checks if first number is greater than second
 */
declare function greaterThan(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Checks if first number is greater than or equal to second
 */
declare function greaterThanOrEqual(a: bigint | string | number, b: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Checks if a number is between two others (inclusive)
 */
declare function between(value: bigint | string | number, min: bigint | string | number, max: bigint | string | number, options?: ComparisonOptions): boolean;
/**
 * Finds the maximum value in an array of numbers
 */
declare function max(values: Array<bigint | string | number>, options?: ComparisonOptions): bigint;
/**
 * Finds the minimum value in an array of numbers
 */
declare function min(values: Array<bigint | string | number>, options?: ComparisonOptions): bigint;
/**
 * Clamps a value between minimum and maximum bounds
 */
declare function clamp(value: bigint | string | number, min: bigint | string | number, max: bigint | string | number, options?: ComparisonOptions): bigint;
/**
 * Checks if all values in array are equal within tolerance
 */
declare function allEqual(values: Array<bigint | string | number>, options?: ComparisonOptions): boolean;
/**
 * Checks if values are in ascending order
 */
declare function isAscending(values: Array<bigint | string | number>, options?: ComparisonOptions): boolean;
/**
 * Checks if values are in descending order
 */
declare function isDescending(values: Array<bigint | string | number>, options?: ComparisonOptions): boolean;
/**
 * Creates a comparator function for sorting
 */
declare function createComparator(options?: ComparisonOptions): (a: bigint | string | number, b: bigint | string | number) => number;

/**
 * Conversion operations module for Hypernum library
 * Provides functions for converting numbers between different formats and bases
 */

/**
 * Options for conversion operations
 */
interface ConversionOptions {
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
declare function toBinary(value: bigint | string | number, options?: ConversionOptions): string;
/**
 * Converts number to octal string representation
 */
declare function toOctal(value: bigint | string | number, options?: ConversionOptions): string;
/**
 * Converts number to hexadecimal string representation
 */
declare function toHexadecimal(value: bigint | string | number, options?: ConversionOptions): string;
/**
 * Converts number to string in specified base
 */
declare function toBase(value: bigint | string | number, base: number, options?: ConversionOptions): string;
/**
 * Converts string from specified base to bigint
 */
declare function fromBase(value: string, base: number): bigint;
/**
 * Converts decimal string to fraction representation
 */
declare function toFraction(value: string): [bigint, bigint];
/**
 * Converts fraction to decimal string with specified precision
 */
declare function fromFraction(numerator: bigint | string | number, denominator: bigint | string | number, options?: ConversionOptions): string;
/**
 * Converts scientific notation to decimal string
 */
declare function fromScientific(value: string): string;
/**
 * Converts decimal to scientific notation
 */
declare function toScientific(value: bigint | string | number, options?: ConversionOptions): string;
/**
* Converts Roman numeral to number
*/
declare function fromRoman(value: string): bigint;
/**
 * Converts number to Roman numeral
 */
declare function toRoman(value: bigint | string | number, options?: ConversionOptions): string;

/**
 * Factorial operations module for Hypernum library
 * Provides efficient implementations for factorial and related computations
 */
/**
 * Options for factorial operations
 */
interface FactorialOptions {
    /** Maximum allowed computation value */
    maxValue?: number;
    /** Whether to check for overflow */
    checkOverflow?: boolean;
    /** Cache computed values */
    useCache?: boolean;
}
/**
 * Calculates factorial of a number (n!)
 */
declare function factorial(value: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates binomial coefficient (n choose k)
 */
declare function binomial(n: bigint | string | number, k: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates subfactorial (derangement number)
 * Number of permutations of n elements with no fixed points
 */
declare function subfactorial(value: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates rising factorial (Pochhammer symbol)
 * x^(n) = x(x+1)(x+2)...(x+n-1)
 */
declare function risingFactorial(x: bigint | string | number, n: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates falling factorial
 * x_(n) = x(x-1)(x-2)...(x-n+1)
 */
declare function fallingFactorial(x: bigint | string | number, n: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates multifactorial (n!!)
 * Product of numbers from 1 to n that leave the same remainder as n when divided by k
 */
declare function multiFactorial(value: bigint | string | number, k?: bigint | string | number, options?: FactorialOptions): bigint;
/**
 * Calculates primorial (product of primes up to n)
 */
declare function primorial(value: bigint | string | number, options?: FactorialOptions): bigint;

/**
 * Power operations module for Hypernum library
 * Provides efficient implementations for exponentiation and related operations
 */

/**
 * Options for power operations
 */
interface PowerOptions {
    /** Precision for decimal operations */
    precision?: number;
    /** Rounding mode for decimal operations */
    roundingMode?: RoundingMode;
    /** Whether to check for overflow */
    checkOverflow?: boolean;
    /** Maximum allowed computation steps */
    maxSteps?: number;
}
/**
 * Raises a number to an integer power using binary exponentiation
 */
declare function power(baseValue: bigint | string | number, exponentValue: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates square root using Newton's method
 */
declare function sqrt(value: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates nth root using Newton's method
 */
declare function nthRoot(value: bigint | string | number, n: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates tetration (repeated exponentiation)
 * a↑↑n = a^(a^(a^...)) (n times)
 */
declare function tetration(base: bigint | string | number, height: bigint | string | number, options?: PowerOptions): bigint;
/**
 * Calculates super-root (inverse tetration)
 * Finds x where x↑↑n = value
 */
declare function superRoot(value: bigint | string | number, height: bigint | string | number, options?: PowerOptions): bigint;

/**
 * Hypernum - A TypeScript/JavaScript library for large number operations
 */

declare const VERSION: any;

/**
 * Creates a new Hypernum instance with custom configuration
 */
declare function createHypernum(config?: Partial<HypernumConfig$1>): Hypernum;
declare const defaultHypernum: Hypernum;

export { AckermannStructure, type ArithmeticConfig, type BaseOptions, type BasicConfig, BigArray, type BigArrayOptions, type CacheConfig, type Comparator, ComputationLimitError, DEFAULT_ARRAY_GROWTH_FACTOR, DEFAULT_BASIC_CONFIG, DEFAULT_CACHE_SIZE, DEFAULT_DECIMAL_SEPARATOR, DEFAULT_FULL_CONFIG, DEFAULT_GROUP_SEPARATOR, DEFAULT_GROUP_SIZE, DEFAULT_HEAP_INITIAL_CAPACITY, DEFAULT_OPTIONS, DEFAULT_TREE_MAX_DEPTH, DataStructureError, type DataStructuresConfig, type DebugConfig, DivisionByZeroError, ERROR_MESSAGES, type ErrorCallback, FEATURES, type FeatureFlags, FormatError, type FormatOptions$1 as FormatOptions, type FormattingConfig, type FullConfig, HeapPropertyError, Hypernum, type HypernumConfig$1 as HypernumConfig, HypernumError, IndexError, MAX_ACKERMANN_M, MAX_ACKERMANN_N, MAX_BITS, MAX_CACHE_SIZE, MAX_COMPUTATION_STEPS, MAX_FACTORIAL_INPUT, MAX_GROUP_SIZE, MAX_POWER_BASE, MAX_POWER_EXPONENT, MAX_PRECISION, MAX_ROMAN_VALUE, MAX_SAFE_INTEGER, MAX_TETRATION_HEIGHT, MIN_ARRAY_CAPACITY, MIN_ROMAN_VALUE, MIN_SAFE_INTEGER, type MathConstantsConfig, MaxHeap, MinHeap, NEGATIVE_ONE, NUMBER_UNITS, type NodeStats$1 as NodeStats, NumberTree, type NumericInput, type NumericRange, ONE, type OperationOptions, type OperationStatus, PERFORMANCE, type PerformanceConfig, type PerformanceMetrics, PowerTower, PrecisionError, type ProgressCallback, type Result, RomanNumeralError, RoundingMode, TEN, TWO, TreeError, UnderflowError, VERSION, type Validator, ZERO, abs, add, allEqual, and, between, binomial, checkAdditionOverflow, checkMultiplicationOverflow, checkPowerOverflow, clamp, clearBit, compare, convertToBasicConfig, createComparator, createHypernum, Hypernum as default, defaultHypernum, divide, equals, factorial, fallingFactorial, formatBigInt, fromBase, fromFraction, fromRoman, fromScientific, gcd, getBit, greaterThan, greaterThanOrEqual, isAscending, isBasicConfig, isDescending, isFullConfig, lcm, leadingZeros, leftShift, lessThan, lessThanOrEqual, max, mergeConfig, min, multiFactorial, multiply, normalizeNumberString, normalizePrecision, not, nthRoot, or, parseBigIntString, popCount, power, primorial, remainder, rightShift, risingFactorial, rotateLeft, rotateRight, round, scaleByPowerOfTen, scaledDivision, setBit, sign, sqrt, subfactorial, subtract, superRoot, tetration, toBase, toBigInt, toBinary, toFraction, toHexadecimal, toOctal, toRoman, toScientific, toggleBit, trailingZeros, unsignedRightShift, validateConfig, validateNonNegative, validatePositive, xor };
