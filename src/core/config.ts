/**
 * Configuration type definitions for Hypernum library
 * Defines all configuration options and their default values
 */

import { RoundingMode } from '../utils/precision';
import { 
  FormatOptions,
  DebugConfig,
  CacheConfig,
  MathConstantsConfig
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
export interface PerformanceConfig {
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
 * Full configuration interface with all options
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
  /** Custom configuration options */
  custom?: Map<string, any>;
}

/**
 * Converts FullConfig to BasicConfig if necessary
 */
export function convertToBasicConfig(config: HypernumConfig): BasicConfig {
  if (isBasicConfig(config)) {
    return config;
  }
  return {
    precision: config.arithmetic.defaultPrecision,
    roundingMode: config.arithmetic.defaultRoundingMode,
    checkOverflow: config.arithmetic.checkOverflow,
    maxSteps: config.arithmetic.maxComputationSteps,
    debug: config.debug.verbose
  };
}

/**
 * Combined configuration type that can be either basic or full
 */
export type HypernumConfig = BasicConfig | FullConfig;

/**
 * Default configuration values for basic config
 */
export const DEFAULT_BASIC_CONFIG: Required<BasicConfig> = {
  precision: 0,
  roundingMode: RoundingMode.HALF_EVEN,
  checkOverflow: true,
  maxSteps: 1000,
  debug: false
};

/**
 * Full default configuration values
 */
export const DEFAULT_FULL_CONFIG: FullConfig = {
  arithmetic: {
    defaultPrecision: 0,
    defaultRoundingMode: RoundingMode.HALF_EVEN,
    checkOverflow: true,
    maxComputationSteps: 1000,
    autoPrecision: {
      enabled: true,
      maxPrecision: 100,
      minPrecision: 0
    },
    constants: {
      precision: 50,
      cache: true,
      algorithm: 'series'
    }
  },
  dataStructures: {
    array: {
      initialCapacity: 16,
      growthFactor: 2,
      maxSize: 1_000_000
    },
    tree: {
      maxDepth: 1000,
      autoBalance: true,
      nodeLimit: 1_000_000
    },
    heap: {
      initialCapacity: 16,
      growthPolicy: 'double',
      validatePropertyOnOperation: true
    },
    cache: {
      enabled: true,
      maxSize: 1000,
      ttl: 3600000, // 1 hour
      evictionPolicy: 'LRU',
      persistToDisk: false,
      compressionEnabled: false
    }
  },
  formatting: {
    notation: 'standard',
    precision: 0,
    grouping: true,
    groupSize: 3,
    decimalSeparator: '.',
    groupSeparator: ',',
    uppercase: false,
    scientific: {
      minExponent: 6,
      maxSignificantDigits: 6,
      exponentSeparator: 'e'
    },
    engineering: {
      useSIPrefixes: true
    },
    localization: {
      locale: 'en-US',
      useLocaleGrouping: false
    }
  },
  performance: {
    enableTracking: false,
    samplingRate: 0.1,
    thresholds: {
      warnThresholdMs: 100,
      errorThresholdMs: 1000,
      maxMemoryBytes: 1024 * 1024 * 1024 // 1GB
    },
    metrics: {
      timing: true,
      memory: true,
      cache: true
    }
  },
  debug: {
    verbose: false,
    trackPerformance: false,
    logLevel: 'error'
  },
  features: {
    experimentalFeatures: false,
    useWasm: false,
    workerThreads: false,
    sharedArrayBuffer: false,
    bigIntTypedArrays: true
  }
};

/**
 * Type guard to check if config is a full configuration
 */
export function isFullConfig(config: HypernumConfig): config is FullConfig {
  return 'arithmetic' in config && 'dataStructures' in config;
}

/**
 * Type guard to check if config is a basic configuration
 */
export function isBasicConfig(config: HypernumConfig): config is BasicConfig {
  return !isFullConfig(config);
}

/**
 * Validates configuration values
 */
export function validateConfig(config: HypernumConfig): void {
  if (isFullConfig(config)) {
    validateFullConfig(config);
  } else {
    validateBasicConfig(config);
  }
}

/**
 * Validates basic configuration values
 */
function validateBasicConfig(config: BasicConfig): void {
  if (config.precision !== undefined && config.precision < 0) {
    throw new Error('Precision cannot be negative');
  }
  if (config.maxSteps !== undefined && config.maxSteps <= 0) {
    throw new Error('Maximum steps must be positive');
  }
  if (config.debug !== undefined && typeof config.debug !== 'boolean') {
    throw new Error('Debug flag must be a boolean');
  }
}

/**
 * Validates full configuration values
 */
function validateFullConfig(config: FullConfig): void {
  if (config.arithmetic.defaultPrecision < 0) {
    throw new Error('Default precision cannot be negative');
  }
  if (config.arithmetic.maxComputationSteps <= 0) {
    throw new Error('Max computation steps must be positive');
  }
  if (config.dataStructures.array.initialCapacity <= 0) {
    throw new Error('Initial capacity must be positive');
  }
  if (config.dataStructures.array.growthFactor <= 1) {
    throw new Error('Growth factor must be greater than 1');
  }
  if (config.performance.samplingRate < 0 || config.performance.samplingRate > 1) {
    throw new Error('Sampling rate must be between 0 and 1');
  }
}

/**
 * Merges configuration with appropriate defaults
 */
export function mergeConfig(custom: Partial<HypernumConfig> = {}): HypernumConfig {
  if (isFullConfig(custom  as FullConfig)) {
    const fullConfig = custom as FullConfig;
    return {
      ...DEFAULT_FULL_CONFIG,
      ...fullConfig,
      arithmetic: { ...DEFAULT_FULL_CONFIG.arithmetic, ...fullConfig.arithmetic },
      dataStructures: { ...DEFAULT_FULL_CONFIG.dataStructures, ...fullConfig.dataStructures },
      formatting: { ...DEFAULT_FULL_CONFIG.formatting, ...fullConfig.formatting },
      performance: { ...DEFAULT_FULL_CONFIG.performance, ...fullConfig.performance },
      debug: { ...DEFAULT_FULL_CONFIG.debug, ...fullConfig.debug },
      features: { ...DEFAULT_FULL_CONFIG.features, ...fullConfig.features }
    };
  }
  
  const basicConfig: BasicConfig = {
    precision: (custom as Partial<BasicConfig>).precision ?? DEFAULT_BASIC_CONFIG.precision,
    roundingMode: (custom as Partial<BasicConfig>).roundingMode ?? DEFAULT_BASIC_CONFIG.roundingMode,
    checkOverflow: (custom as Partial<BasicConfig>).checkOverflow ?? DEFAULT_BASIC_CONFIG.checkOverflow,
    maxSteps: (custom as Partial<BasicConfig>).maxSteps ?? DEFAULT_BASIC_CONFIG.maxSteps,
    debug: (custom as Partial<BasicConfig>).debug ?? DEFAULT_BASIC_CONFIG.debug
  };

  return basicConfig;
}