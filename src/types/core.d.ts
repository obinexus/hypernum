
import { RoundingMode } from '../utils/precision';
import { 
  CacheConfig,
  MathConstantsConfig,
  FormatOptions,
  DebugConfig
} from './common';

/**
 * Basic configuration options for simple usage
 */
export interface BasicConfig {
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
export interface ArithmeticConfig {
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
export interface DataStructuresConfig {
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
export interface FormattingConfig extends FormatOptions {
  /** Scientific notation configuration */
  scientific: {
    minExponent: number;
    maxSignificantDigits: number;
    exponentSeparator: string;
  };
  /** Engineering notation configuration */
  engineering: {
    useSIPrefixes: boolean;
    customUnits?: Map<number, string>;
  };
  /** Localization settings */
  localization: {
    locale: string;
    numberFormat?: Intl.NumberFormatOptions;
    useLocaleGrouping: boolean;
  };
}

/**
 * Configuration for performance monitoring
 */
export interface PerformanceConfig {
  /** Enable performance tracking */
  enableTracking: boolean;
  /** Sampling rate for metrics (0-1) */
  samplingRate: number;
  /** Performance thresholds */
  thresholds: {
    warnThresholdMs: number;
    errorThresholdMs: number;
    maxMemoryBytes: number;
  };
  /** Metrics collection configuration */
  metrics: {
    timing: boolean;
    memory: boolean;
    cache: boolean;
    custom?: Map<string, (operation: any) => number>;
  };
}

/**
 * Feature flags for optional functionality
 */
export interface FeatureFlags {
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
 * Complete configuration interface
 */
export interface FullConfig {
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
}

/**
 * Combined configuration type that can be either basic or full
 */
export type HypernumConfig = BasicConfig | FullConfig;