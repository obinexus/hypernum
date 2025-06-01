import { RoundingMode } from '../utils/precision';

/**
 * Valid input types for numeric values
 */
export type NumericInput = bigint | string | number;

/**
 * Result type for operations that may fail
 */
export type Result<T> = {
  success: boolean;
  value?: T;
  error?: string;
};

/**
 * Base options interface for operations
 */
export interface BaseOptions {
  precision?: number;
  roundingMode?: RoundingMode;
  checkOverflow?: boolean;
}

/**
 * Basic configuration options
 */
export interface BasicConfig {
  precision?: number;
  roundingMode?: RoundingMode;
  checkOverflow?: boolean;
  maxSteps?: number;
  debug?: boolean;
}

/**
 * Configuration for arithmetic operations
 */
export interface ArithmeticConfig {
  defaultPrecision: number;
  defaultRoundingMode: RoundingMode;
  checkOverflow: boolean;
  maxComputationSteps: number;
  autoPrecision: {
    enabled: boolean;
    maxPrecision: number;
    minPrecision: number;
  };
  constants: MathConstantsConfig;
}

/**
 * Configuration for data structures
 */
export interface DataStructuresConfig {
  array: {
    initialCapacity: number;
    growthFactor: number;
    maxSize: number;
  };
  tree: {
    maxDepth: number;
    autoBalance: boolean;
    nodeLimit: number;
  };
  heap: {
    initialCapacity: number;
    growthPolicy: 'double' | 'linear' | 'fibonacci';
    validatePropertyOnOperation: boolean;
  };
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
  scientific: {
    minExponent: number;
    maxSignificantDigits: number;
    exponentSeparator: string;
  };
  engineering: {
    useSIPrefixes: boolean;
    customUnits?: Map<number, string>;
  };
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
  enableTracking: boolean;
  samplingRate: number;
  thresholds: {
    warnThresholdMs: number;
    errorThresholdMs: number;
    maxMemoryBytes: number;
  };
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
  experimentalFeatures: boolean;
  useWasm: boolean;
  workerThreads: boolean;
  sharedArrayBuffer: boolean;
  bigIntTypedArrays: boolean;
}

/**
 * Full configuration interface
 */
export interface FullConfig {
  arithmetic: ArithmeticConfig;
  dataStructures: DataStructuresConfig;
  formatting: FormattingConfig;
  performance: PerformanceConfig;
  debug: DebugConfig;
  features: FeatureFlags;
}

/**
 * Combined configuration type
 */
export type HypernumConfig = BasicConfig | FullConfig;

/**
 * Default basic configuration
 */
export const DEFAULT_BASIC_CONFIG: Required<BasicConfig> = {
  precision: 0,
  roundingMode: RoundingMode.HALF_EVEN,
  checkOverflow: true,
  maxSteps: 1000,
  debug: false
};

/**
 * Default full configuration
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
      ttl: 3600000,
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
      maxMemoryBytes: 1024 * 1024 * 1024
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
 * Merges configuration with appropriate defaults
 */
export function mergeConfig(custom: Partial<HypernumConfig> = {}): HypernumConfig {
  if (isFullConfig(custom)) {
    return {
      ...DEFAULT_FULL_CONFIG,
      ...custom,
      arithmetic: { ...DEFAULT_FULL_CONFIG.arithmetic, ...custom.arithmetic },
      dataStructures: { ...DEFAULT_FULL_CONFIG.dataStructures, ...custom.dataStructures },
      formatting: { ...DEFAULT_FULL_CONFIG.formatting, ...custom.formatting },
      performance: { ...DEFAULT_FULL_CONFIG.performance, ...custom.performance },
      debug: { ...DEFAULT_FULL_CONFIG.debug, ...custom.debug },
      features: { ...DEFAULT_FULL_CONFIG.features, ...custom.features }
    };
  }
  
  return {
    ...DEFAULT_BASIC_CONFIG,
    ...custom
  };
}

// Additional required types
export interface FormatOptions {
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  precision?: number;
  grouping?: boolean;
  groupSize?: number;
  decimalSeparator?: string;
  groupSeparator?: string;
  uppercase?: boolean;
}

export interface CacheConfig {
  maxSize: number;
  ttl?: number;
  evictionPolicy?: 'LRU' | 'LFU' | 'FIFO';
}

export interface MathConstantsConfig {
  precision: number;
  cache?: boolean;
  algorithm?: 'series' | 'iteration' | 'approximation';
}

export interface DebugConfig {
  verbose: boolean;
  trackPerformance: boolean;
  logLevel: 'error' | 'warn' | 'info' | 'debug';
}

export interface NumericRange {
  min: bigint;
  max: bigint;
}

export interface OperationStatus {
  success: boolean;
  message: string;
}

export interface PerformanceMetrics {
  timing: number;
  memory: number;
  cache: number;
  custom: Map<string, number>;
}

export interface NodeStats {
  depth: number;
  children: number;
  size: number;
}

export interface OperationOptions {
  precision?: number;
  roundingMode?: RoundingMode;
  checkOverflow?: boolean;
  maxSteps?: number;
  debug?: boolean;
}