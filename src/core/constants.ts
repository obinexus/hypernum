/**
 * Core constants for Hypernum library
 * Defines fundamental values and limits used across the library
 */

// Numerical limits
export const MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
export const MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
export const MAX_PRECISION = 100;
export const MAX_COMPUTATION_STEPS = 1000;
export const MAX_BITS = 1024;

// Commonly used values
export const ZERO = BigInt(0);
export const ONE = BigInt(1);
export const TWO = BigInt(2);
export const TEN = BigInt(10);
export const NEGATIVE_ONE = BigInt(-1);

// Power operation limits
export const MAX_POWER_BASE = BigInt(2) ** BigInt(53);
export const MAX_POWER_EXPONENT = BigInt(1000);
export const MAX_TETRATION_HEIGHT = BigInt(4);
export const MAX_FACTORIAL_INPUT = BigInt(1000);

// Tree and heap configuration
export const DEFAULT_TREE_MAX_DEPTH = 1000;
export const DEFAULT_HEAP_INITIAL_CAPACITY = 16;
export const DEFAULT_ARRAY_GROWTH_FACTOR = 2;
export const MIN_ARRAY_CAPACITY = 16;

// Formatting configuration
export const DEFAULT_DECIMAL_SEPARATOR = '.';
export const DEFAULT_GROUP_SEPARATOR = ',';
export const DEFAULT_GROUP_SIZE = 3;
export const MAX_GROUP_SIZE = 10;

// Roman numeral limits
export const MIN_ROMAN_VALUE = 1;
export const MAX_ROMAN_VALUE = 3999;

// Ackermann function limits
export const MAX_ACKERMANN_M = 4;
export const MAX_ACKERMANN_N = 1000;

// Cache configuration
export const DEFAULT_CACHE_SIZE = 1000;
export const MAX_CACHE_SIZE = 10000;

// Error messages
export const ERROR_MESSAGES = {
  OVERFLOW: 'Operation would result in overflow',
  UNDERFLOW: 'Operation would result in underflow',
  NEGATIVE_ROOT: 'Cannot compute root of negative number',
  NEGATIVE_EXPONENT: 'Negative exponents not supported for integers',
  DIVISION_BY_ZERO: 'Division by zero',
  INVALID_PRECISION: 'Precision must be non-negative and not exceed MAX_PRECISION',
  INVALID_BASE: 'Base must be a positive integer',
  INVALID_ROMAN: 'Invalid Roman numeral',
  COMPUTATION_LIMIT: 'Computation exceeded maximum allowed steps',
  NEGATIVE_INDEX: 'Array index cannot be negative',
  TREE_DEPTH_EXCEEDED: 'Maximum tree depth exceeded',
  INVALID_HEAP_PROPERTY: 'Heap property violation detected'
} as const;

// Feature flags for optional functionality
export const FEATURES = {
  OVERFLOW_CHECKING: true,
  AUTOMATIC_PRECISION: true,
  MEMOIZATION: true,
  TREE_BALANCING: true,
  DEBUG_MODE: false
} as const;

// Default options for various operations
export const DEFAULT_OPTIONS = {
  precision: 0,
  roundingMode: 'HALF_EVEN',
  checkOverflow: true,
  maxSteps: MAX_COMPUTATION_STEPS,
  grouping: true,
  uppercase: false,
  cache: true
} as const;

// Units for number formatting (powers of 1000)
export const NUMBER_UNITS = [
  { value: 1n, symbol: '' },
  { value: 1000n, symbol: 'K' },
  { value: 1000000n, symbol: 'M' },
  { value: 1000000000n, symbol: 'B' },
  { value: 1000000000000n, symbol: 'T' },
  { value: 1000000000000000n, symbol: 'Q' }
] as const;

// Performance monitoring thresholds
export const PERFORMANCE = {
  WARN_THRESHOLD_MS: 100,
  ERROR_THRESHOLD_MS: 1000,
  MAX_ARRAY_SIZE: 1000000,
  MAX_TREE_SIZE: 1000000
} as const;