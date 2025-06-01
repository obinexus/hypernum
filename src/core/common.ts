/**
 * Common type definitions for Hypernum library
 * Contains shared types used throughout the library's modules
 */

import { RoundingMode } from '../utils/precision';

/**
 * Valid input types for numeric values
 */
export type NumericInput = bigint | string | number;

/**
 * Result type for operations that may fail
 */
export type Result<T> = {
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
export interface BaseOptions {
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
export interface FormatOptions extends BaseOptions {
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
export interface CacheConfig {
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
export interface MathConstantsConfig {
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
export interface DebugConfig {
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
export interface NumericRange {
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
export interface OperationStatus {
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
export interface PerformanceMetrics {
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
 * Comparison function type
 * Returns:
 *  -1: a < b
 *   0: a = b
 *   1: a > b
 */
export type Comparator<T> = (a: T, b: T) => -1 | 0 | 1;

/**
 * Progress callback type
 */
export type ProgressCallback = (status: OperationStatus) => void;

/**
 * Error callback type
 */
export type ErrorCallback = (error: Error, phase: string) => void;

/**
 * Value validation function type
 */
export type Validator<T> = (value: T) => boolean;

/**
 * Node statistics interface
 */
export interface NodeStats {
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
export interface OperationOptions extends BaseOptions {
  /** Maximum computation steps */
  maxSteps?: number;
  /** Progress callback */
  onProgress?: ProgressCallback;
  /** Error callback */
  onError?: ErrorCallback;
  /** Value validator */
  validator?: Validator<bigint>;
}