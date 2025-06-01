/**
 * src/operations/dimensional.ts
 * Dimensional Game Theory operations for adaptive numerical computation
 */

import { toBigInt, ValidationError } from '../utils/validation';
import { RoundingMode } from '../utils/precision';
import { HypernumConfig, NumericInput } from '../types/common';
import * as arithmetic from './arithmetic';
import * as power from './power';
import { factorial, binomial } from './factorial';

/**
 * Strategic dimensions that can be detected in numerical operations
 */
export enum StrategyDimension {
  GROWTH_RISK = 'growth-risk',           // Input tends toward exponential explosion
  PRECISION_TENSION = 'precision-tension', // Operations risk floating-point errors
  RECURSION_DEPTH = 'recursion-depth',    // Likelihood of overflow or stack crash
  HEURISTIC_FIT = 'heuristic-fit',       // Fast approximations are acceptable
  MEMORY_PRESSURE = 'memory-pressure',    // Large intermediate values
  USER_INTENT = 'user-intent'            // Meta-dimension from config preferences
}

/**
 * Dimension activation profile
 */
export interface DimensionProfile {
  dimension: StrategyDimension;
  activation: number;        // 0-1 strength of activation
  threshold: number;         // Threshold that triggered activation
  evidence: string[];        // Reasons for activation
}

/**
 * Strategic context for operations
 */
export interface DGTContext {
  activeDimensions: StrategyDimension[];
  profiles: Map<StrategyDimension, DimensionProfile>;
  config: HypernumConfig;
  inputHistory: NumericInput[];
  metadata: {
    operationCount: number;
    maxValueSeen: bigint;
    avgComputationTime: number;
  };
}

/**
 * Strategy recommendations
 */
export interface StrategyProfile {
  primary: 'exact' | 'heuristic' | 'staged' | 'memory-safe';
  fallbacks: string[];
  expectedPrecision: number;
  estimatedComplexity: 'low' | 'medium' | 'high' | 'extreme';
  reasoning: string;
}

/**
 * Thresholds for dimension activation
 */
const DIMENSION_THRESHOLDS = {
  [StrategyDimension.GROWTH_RISK]: {
    base_size: 1000n,           // Input magnitude
    growth_rate: 2.0,           // Rate of value increase
    exponent_threshold: 100n    // Exponent size trigger
  },
  [StrategyDimension.PRECISION_TENSION]: {
    decimal_places: 10,         // Required precision
    operation_chain_length: 5,  // Chained operations
    rounding_sensitivity: 0.001 // Acceptable error margin
  },
  [StrategyDimension.RECURSION_DEPTH]: {
    max_steps: 1000,           // Computation steps
    stack_depth: 100,          // Recursion levels
    memory_per_step: 1024      // Bytes per recursive call
  },
  [StrategyDimension.HEURISTIC_FIT]: {
    accuracy_tolerance: 0.05,  // 5% error acceptable
    speed_priority: 0.8,       // Speed vs accuracy weight
    approximation_benefit: 10  // Speedup factor threshold
  }
};

/**
 * Detects if a scalar input should be promoted to a strategic dimension
 */
export function isPromotableScalar(input: NumericInput): boolean {
  try {
    const value = toBigInt(input);
    const magnitude = value < 0n ? -value : value;
    
    // Check if magnitude indicates potential for multi-dimensional strategy
    return magnitude > 1000n || 
           magnitude.toString().length > 10 ||
           (typeof input === 'string' && input.includes('e'));
  } catch {
    return false;
  }
}

/**
 * Promotes scalar to dimension profile
 */
export function promoteToDimension(input: NumericInput): DimensionProfile | null {
  if (!isPromotableScalar(input)) return null;
  
  const value = toBigInt(input);
  const magnitude = value < 0n ? -value : value;
  const evidence: string[] = [];
  
  // Analyze growth characteristics
  let activation = 0;
  if (magnitude > DIMENSION_THRESHOLDS[StrategyDimension.GROWTH_RISK].base_size) {
    activation += 0.3;
    evidence.push(`Large magnitude: ${magnitude}`);
  }
  
  if (magnitude.toString().length > 50) {
    activation += 0.4;
    evidence.push(`Extremely large number: ${magnitude.toString().length} digits`);
  }
  
  if (typeof input === 'string' && input.includes('e')) {
    activation += 0.3;
    evidence.push('Scientific notation input detected');
  }
  
  return {
    dimension: StrategyDimension.GROWTH_RISK,
    activation: Math.min(activation, 1.0),
    threshold: 0.5,
    evidence
  };
}

/**
 * Detects active dimensions from inputs and context
 */
export function detectDimensions(
  inputs: NumericInput[], 
  config: HypernumConfig,
  context?: Partial<DGTContext>
): DimensionProfile[] {
  const profiles: DimensionProfile[] = [];
  
  // Analyze each input for dimension activation
  for (const input of inputs) {
    const profile = promoteToDimension(input);
    if (profile && profile.activation >= profile.threshold) {
      profiles.push(profile);
    }
  }
  
  // Check precision tension
  const basicConfig = config as any;
  if (basicConfig.precision && basicConfig.precision > 10) {
    profiles.push({
      dimension: StrategyDimension.PRECISION_TENSION,
      activation: Math.min(basicConfig.precision / 50, 1.0),
      threshold: 0.3,
      evidence: [`High precision required: ${basicConfig.precision}`]
    });
  }
  
  // Check recursion depth from config
  if (basicConfig.maxSteps && basicConfig.maxSteps > 500) {
    profiles.push({
      dimension: StrategyDimension.RECURSION_DEPTH,
      activation: Math.min(basicConfig.maxSteps / 2000, 1.0),
      threshold: 0.4,
      evidence: [`High step limit: ${basicConfig.maxSteps}`]
    });
  }
  
  // Check user intent from debug mode
  if (basicConfig.debug) {
    profiles.push({
      dimension: StrategyDimension.USER_INTENT,
      activation: 1.0,
      threshold: 0.5,
      evidence: ['Debug mode indicates development/testing context']
    });
  }
  
  return profiles;
}

/**
 * Resolves optimal strategy based on active dimensions
 */
export function resolveStrategy(
  inputs: NumericInput[], 
  config: HypernumConfig,
  context?: Partial<DGTContext>
): StrategyProfile {
  const profiles = detectDimensions(inputs, config, context);
  const activeDimensions = profiles
    .filter(p => p.activation >= p.threshold)
    .map(p => p.dimension);
  
  // Strategy decision logic
  if (activeDimensions.includes(StrategyDimension.GROWTH_RISK)) {
    if (activeDimensions.includes(StrategyDimension.HEURISTIC_FIT)) {
      return {
        primary: 'heuristic',
        fallbacks: ['staged', 'exact'],
        expectedPrecision: 0.95,
        estimatedComplexity: 'medium',
        reasoning: 'Growth risk detected, heuristics acceptable'
      };
    }
    return {
      primary: 'staged',
      fallbacks: ['memory-safe', 'heuristic'],
      expectedPrecision: 0.99,
      estimatedComplexity: 'high',
      reasoning: 'Growth risk requires careful staged computation'
    };
  }
  
  if (activeDimensions.includes(StrategyDimension.PRECISION_TENSION)) {
    return {
      primary: 'exact',
      fallbacks: ['staged'],
      expectedPrecision: 1.0,
      estimatedComplexity: 'high',
      reasoning: 'High precision required, no approximations'
    };
  }
  
  if (activeDimensions.includes(StrategyDimension.RECURSION_DEPTH)) {
    return {
      primary: 'memory-safe',
      fallbacks: ['heuristic', 'staged'],
      expectedPrecision: 0.98,
      estimatedComplexity: 'medium',
      reasoning: 'Recursion depth limits require iterative approach'
    };
  }
  
  // Default balanced strategy
  return {
    primary: 'exact',
    fallbacks: ['staged'],
    expectedPrecision: 1.0,
    estimatedComplexity: 'low',
    reasoning: 'No special dimensions detected, using exact computation'
  };
}

/**
 * Smart binomial computation with dimensional adaptation
 */
export function computeSmartBinomial(
  n: NumericInput,
  k: NumericInput,
  config: HypernumConfig,
  context?: DGTContext
): bigint | number {
  const bigN = toBigInt(n);
  const bigK = toBigInt(k);
  const strategy = resolveStrategy([n, k], config, context);
  
  // Log strategy decision if debug mode
  const basicConfig = config as any;
  if (basicConfig.debug) {
    console.log(`DGT Strategy: ${strategy.primary} - ${strategy.reasoning}`);
  }
  
  switch (strategy.primary) {
    case 'heuristic':
      return estimateBinomialViaStirling(bigN, bigK);
    
    case 'staged':
      return computeStagedBinomial(bigN, bigK, config);
    
    case 'memory-safe':
      return computeIterativeBinomial(bigN, bigK);
    
    default:
      return binomial(n, k, { checkOverflow: false });
  }
}

/**
 * Stirling's approximation for large binomial coefficients
 */
function estimateBinomialViaStirling(n: bigint, k: bigint): number {
  if (k > n) return 0;
  if (k === 0n || k === n) return 1;
  
  const nNum = Number(n);
  const kNum = Number(k);
  const nMinusKNum = nNum - kNum;
  
  // Stirling's approximation: n! ~ V(2pn) * (n/e)^n
  const stirling = (x: number): number => 
    Math.sqrt(2 * Math.PI * x) * Math.pow(x / Math.E, x);
  
  const nFactApprox = stirling(nNum);
  const kFactApprox = stirling(kNum);
  const nMinusKFactApprox = stirling(nMinusKNum);
  
  return nFactApprox / (kFactApprox * nMinusKFactApprox);
}

/**
 * Staged computation for large binomials
 */
function computeStagedBinomial(n: bigint, k: bigint, config: HypernumConfig): bigint {
  // Use symmetry property: C(n,k) = C(n,n-k)
  const actualK = k > n - k ? n - k : k;
  
  // Compute in stages to avoid intermediate overflow
  let result = 1n;
  let currentN = n;
  
  for (let i = 0n; i < actualK; i++) {
    result = result * currentN / (i + 1n);
    currentN--;
  }
  
  return result;
}

/**
 * Memory-safe iterative binomial
 */
function computeIterativeBinomial(n: bigint, k: bigint): bigint {
  if (k > n) return 0n;
  if (k === 0n || k === n) return 1n;
  
  k = k > n - k ? n - k : k; // Use symmetry
  
  let result = 1n;
  for (let i = 1n; i <= k; i++) {
    result = result * (n - i + 1n) / i;
  }
  
  return result;
}

/**
 * Smart power computation with growth risk detection
 */
export function computeSmartPower(
  base: NumericInput,
  exponent: NumericInput,
  config: HypernumConfig,
  context?: DGTContext
): bigint | number {
  const bigBase = toBigInt(base);
  const bigExponent = toBigInt(exponent);
  const strategy = resolveStrategy([base, exponent], config, context);
  
  // Check for extreme growth risk
  if (bigBase > 10n && bigExponent > 100n) {
    if (strategy.primary === 'heuristic') {
      // Return logarithmic representation
      return Math.log(Number(bigBase)) * Number(bigExponent);
    }
    throw new ValidationError('Power computation would exceed safe bounds');
  }
  
  switch (strategy.primary) {
    case 'staged':
      return computeStagedPower(bigBase, bigExponent, config);
    
    case 'memory-safe':
      return computeIterativePower(bigBase, bigExponent, 1000n);
    
    default:
      return power.power(base, exponent, config);
  }
}

/**
 * Staged power computation
 */
function computeStagedPower(base: bigint, exponent: bigint, config: HypernumConfig): bigint {
  const basicConfig = config as any;
  const maxSteps = basicConfig.maxSteps || 1000;
  
  if (exponent > BigInt(maxSteps)) {
    throw new ValidationError(`Exponent too large for staged computation: ${exponent}`);
  }
  
  return power.power(base, exponent, { ...config, maxSteps });
}

/**
 * Memory-safe power with chunking
 */
function computeIterativePower(base: bigint, exponent: bigint, chunkSize: bigint): bigint {
  if (exponent === 0n) return 1n;
  if (exponent === 1n) return base;
  
  let result = 1n;
  let remaining = exponent;
  let currentBase = base;
  
  while (remaining > 0n) {
    const chunk = remaining > chunkSize ? chunkSize : remaining;
    
    // Compute base^chunk
    let chunkResult = 1n;
    for (let i = 0n; i < chunk; i++) {
      chunkResult *= currentBase;
    }
    
    result *= chunkResult;
    remaining -= chunk;
    
    // Prevent intermediate overflow
    if (result.toString().length > 1000) {
      throw new ValidationError('Power computation exceeds memory limits');
    }
  }
  
  return result;
}

/**
 * Creates a DGT context for tracking operations
 */
export function createDGTContext(config: HypernumConfig): DGTContext {
  return {
    activeDimensions: [],
    profiles: new Map(),
    config,
    inputHistory: [],
    metadata: {
      operationCount: 0,
      maxValueSeen: 0n,
      avgComputationTime: 0
    }
  };
}

/**
 * Updates context with operation results
 */
export function updateDGTContext(
  context: DGTContext,
  inputs: NumericInput[],
  result: bigint | number,
  executionTime: number
): void {
  context.inputHistory.push(...inputs);
  context.metadata.operationCount++;
  context.metadata.avgComputationTime = 
    (context.metadata.avgComputationTime + executionTime) / 2;
  
  // Track maximum value seen
  const maxInput = inputs.reduce((max, input) => {
    try {
      const value = toBigInt(input);
      const absValue = value < 0n ? -value : value;
      return absValue > max ? absValue : max;
    } catch {
      return max;
    }
  }, 0n);
  
  if (maxInput > context.metadata.maxValueSeen) {
    context.metadata.maxValueSeen = maxInput;
  }
}

export default {
  detectDimensions,
  resolveStrategy,
  computeSmartBinomial,
  computeSmartPower,
  createDGTContext,
  updateDGTContext,
  isPromotableScalar,
  promoteToDimension
};
