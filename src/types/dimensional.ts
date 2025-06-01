/**
 * src/types/dimensional.ts
 * Type definitions for Dimensional Game Theory operations
 */

import { NumericInput, HypernumConfig } from './common';
import { RoundingMode } from '../utils/precision';

/**
 * Strategic dimensions that can be detected in numerical operations
 */
export enum StrategyDimension {
  GROWTH_RISK = 'growth-risk',
  PRECISION_TENSION = 'precision-tension',
  RECURSION_DEPTH = 'recursion-depth',
  HEURISTIC_FIT = 'heuristic-fit',
  MEMORY_PRESSURE = 'memory-pressure',
  USER_INTENT = 'user-intent',
  TEMPORAL_CONSTRAINT = 'temporal-constraint',
  NUMERICAL_STABILITY = 'numerical-stability'
}

/**
 * Dimension activation profile
 */
export interface DimensionProfile {
  dimension: StrategyDimension;
  activation: number;        // 0-1 strength of activation
  threshold: number;         // Threshold that triggered activation
  evidence: string[];        // Reasons for activation
  confidence: number;        // 0-1 confidence in detection
  timestamp: number;         // When dimension was detected
}

/**
 * Strategic context for operations
 */
export interface DGTContext {
  activeDimensions: StrategyDimension[];
  profiles: Map<StrategyDimension, DimensionProfile>;
  config: HypernumConfig;
  inputHistory: NumericInput[];
  operationHistory: OperationRecord[];
  metadata: ContextMetadata;
  adaptiveSettings: AdaptiveSettings;
}

/**
 * Context metadata for tracking computational patterns
 */
export interface ContextMetadata {
  operationCount: number;
  maxValueSeen: bigint;
  avgComputationTime: number;
  totalMemoryUsed: number;
  errorCount: number;
  lastAdaptation: number;     // timestamp
  successRate: number;        // 0-1
  performanceScore: number;   // 0-1
}

/**
 * Adaptive settings that change based on dimensional analysis
 */
export interface AdaptiveSettings {
  enableHeuristics: boolean;
  maxRecursionDepth: number;
  memoryThreshold: number;
  timeoutMs: number;
  precisionTolerance: number;
  fallbackStrategy: FallbackStrategy;
}

/**
 * Strategy recommendations
 */
export interface StrategyProfile {
  primary: StrategyType;
  fallbacks: StrategyType[];
  expectedPrecision: number;
  estimatedComplexity: ComplexityLevel;
  reasoning: string;
  confidence: number;
  adaptiveHints: AdaptiveHint[];
}

/**
 * Types of computational strategies
 */
export type StrategyType = 
  | 'exact'          // Precise computation
  | 'heuristic'      // Approximation-based
  | 'staged'         // Step-by-step computation
  | 'memory-safe'    // Limited memory usage
  | 'iterative'      // Loop-based instead of recursive
  | 'parallel'       // Multi-threaded when possible
  | 'cached'         // Memoization-heavy
  | 'streaming';     // Process in chunks

/**
 * Complexity estimation levels
 */
export type ComplexityLevel = 'trivial' | 'low' | 'medium' | 'high' | 'extreme' | 'intractable';

/**
 * Fallback strategy options
 */
export type FallbackStrategy = 
  | 'graceful_degradation'  // Reduce precision/features
  | 'alternative_algorithm' // Switch to different approach
  | 'chunked_processing'    // Break into smaller parts
  | 'approximate_result'    // Return best estimate
  | 'error_boundary';       // Fail safely with explanation

/**
 * Adaptive hints for strategy optimization
 */
export interface AdaptiveHint {
  type: 'optimization' | 'warning' | 'recommendation' | 'constraint';
  message: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  autoApplicable: boolean;
}

/**
 * Record of computational operations for learning
 */
export interface OperationRecord {
  operation: string;
  inputs: NumericInput[];
  result: bigint | number | string;
  strategy: StrategyType;
  executionTime: number;
  memoryUsed: number;
  dimensionsActive: StrategyDimension[];
  success: boolean;
  errorMessage?: string;
  timestamp: number;
}

/**
 * Input analysis results
 */
export interface InputCharacteristics {
  magnitude: bigint;
  digitCount: number;
  isScientific: boolean;
  hasDecimals: boolean;
  isNegative: boolean;
  estimatedComplexity: number;
  inputType: InputType;
  riskFactors: RiskFactor[];
}

/**
 * Types of numeric inputs
 */
export type InputType = 
  | 'integer'
  | 'decimal'
  | 'scientific'
  | 'fraction'
  | 'percentage'
  | 'large_integer'
  | 'tiny_decimal'
  | 'irrational_estimate';

/**
 * Risk factors identified in inputs
 */
export interface RiskFactor {
  type: 'overflow' | 'underflow' | 'precision_loss' | 'infinite_loop' | 'memory_exhaustion';
  severity: number; // 0-1
  description: string;
  mitigation?: string;
}

/**
 * Dimension detection configuration
 */
export interface DimensionDetectionConfig {
  enabledDimensions: StrategyDimension[];
  thresholds: Record<StrategyDimension, number>;
  activationHistory: boolean;
  adaptiveThresholds: boolean;
  contextSensitivity: number; // 0-1
}

/**
 * Strategy resolution options
 */
export interface StrategyResolutionOptions {
  preferExact: boolean;
  allowApproximations: boolean;
  maxComplexity: ComplexityLevel;
  timeConstraint?: number; // milliseconds
  memoryConstraint?: number; // bytes
  precisionRequirement?: number; // decimal places
}

/**
 * Dimensional operation configuration
 */
export interface DimensionalConfig extends HypernumConfig {
  dimensional?: {
    enabled: boolean;
    detection: DimensionDetectionConfig;
    resolution: StrategyResolutionOptions;
    adaptive: AdaptiveSettings;
    logging: DimensionalLogging;
  };
}

/**
 * Logging configuration for dimensional operations
 */
export interface DimensionalLogging {
  enabled: boolean;
  level: 'minimal' | 'standard' | 'verbose' | 'debug';
  logDimensions: boolean;
  logStrategies: boolean;
  logPerformance: boolean;
  logAdaptations: boolean;
  outputFormat: 'console' | 'structured' | 'report';
}

/**
 * Result of dimensional operation with metadata
 */
export interface DimensionalResult<T> {
  value: T;
  strategy: StrategyProfile;
  dimensionsUsed: StrategyDimension[];
  executionTime: number;
  memoryUsed: number;
  adaptationsApplied: string[];
  confidenceScore: number; // 0-1
  metadata: {
    inputCharacteristics: InputCharacteristics[];
    conflictsResolved: string[];
    fallbacksTriggered: string[];
    optimizationsApplied: string[];
  };
}

/**
 * Dimensional operation interface
 */
export interface DimensionalOperation<TInput, TOutput> {
  name: string;
  execute: (
    inputs: TInput[],
    config: DimensionalConfig,
    context?: DGTContext
  ) => DimensionalResult<TOutput>;
  
  detectDimensions: (
    inputs: TInput[],
    context?: DGTContext
  ) => DimensionProfile[];
  
  resolveStrategy: (
    dimensions: DimensionProfile[],
    config: DimensionalConfig
  ) => StrategyProfile;
  
  supportedStrategies: StrategyType[];
  complexityBounds: {
    min: ComplexityLevel;
    max: ComplexityLevel;
  };
}

/**
 * Dimensional analysis report
 */
export interface DimensionalReport {
  summary: {
    inputCount: number;
    dimensionsDetected: number;
    conflictsFound: number;
    strategiesRecommended: number;
    overallComplexity: ComplexityLevel;
  };
  
  dimensions: {
    profile: DimensionProfile;
    impact: 'low' | 'medium' | 'high';
    recommendations: string[];
  }[];
  
  strategies: {
    profile: StrategyProfile;
    suitability: number; // 0-1
    tradeoffs: string[];
  }[];
  
  conflicts: {
    description: string;
    severity: 'low' | 'medium' | 'high';
    resolution: string;
  }[];
  
  performance: {
    estimatedExecutionTime: number;
    estimatedMemoryUsage: number;
    scalabilityFactor: number;
    riskAssessment: string;
  };
  
  recommendations: {
    immediate: string[];
    optimization: string[];
    monitoring: string[];
  };
  
  rawData: {
    inputCharacteristics: InputCharacteristics[];
    dimensionProfiles: DimensionProfile[];
    contextMetadata: ContextMetadata;
  };
}

/**
 * Variadic input handler for dynamic argument processing
 */
export interface VariadicHandler {
  canHandle: (inputs: unknown[]) => boolean;
  normalize: (inputs: unknown[]) => NumericInput[];
  validate: (inputs: NumericInput[]) => ValidationResult;
  optimize: (inputs: NumericInput[]) => OptimizedInputs;
}

/**
 * Validation result for inputs
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Optimized inputs
