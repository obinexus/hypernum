/**
 * Configuration type definitions for Hypernum library
 * Defines all configuration options and their default values
 */
import { RoundingMode } from '../utils/precision';
import { FormatOptions, DebugConfig, CacheConfig, MathConstantsConfig } from './common';
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
export declare function convertToBasicConfig(config: HypernumConfig): BasicConfig;
/**
 * Combined configuration type that can be either basic or full
 */
export type HypernumConfig = BasicConfig | FullConfig;
/**
 * Default configuration values for basic config
 */
export declare const DEFAULT_BASIC_CONFIG: Required<BasicConfig>;
/**
 * Full default configuration values
 */
export declare const DEFAULT_FULL_CONFIG: FullConfig;
/**
 * Type guard to check if config is a full configuration
 */
export declare function isFullConfig(config: HypernumConfig): config is FullConfig;
/**
 * Type guard to check if config is a basic configuration
 */
export declare function isBasicConfig(config: HypernumConfig): config is BasicConfig;
/**
 * Validates configuration values
 */
export declare function validateConfig(config: HypernumConfig): void;
/**
 * Merges configuration with appropriate defaults
 */
export declare function mergeConfig(custom?: Partial<HypernumConfig>): HypernumConfig;
//# sourceMappingURL=config.d.ts.map