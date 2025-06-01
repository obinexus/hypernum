/**
 * src/utils/dimensionUtils.ts
 * Utility functions for dimensional analysis and strategic detection
 */

import { toBigInt, ValidationError } from './validation';
import { NumericInput } from '../types/common';
import { StrategyDimension, DimensionProfile, DGTContext } from '../operations/dimensional';

/**
 * Input characteristics analyzer
 */
export interface InputCharacteristics {
  magnitude: bigint;
  digitCount: number;
  isScientific: boolean;
  hasDecimals: boolean;
  isNegative: boolean;
  estimatedComplexity: number; // 0-1 scale
}

/**
 * Dimension activation mapping
 */
export interface ActivationMap {
  dimension: StrategyDimension;
  activationFunction: (input: InputCharacteristics, context?: DGTContext) => number;
  threshold: number;
  priority: number; // Higher priority dimensions override lower ones
}

/**
 * Predefined activation maps for each strategic dimension
 */
export const ACTIVATION_MAPS: ActivationMap[] = [
  {
    dimension: StrategyDimension.GROWTH_RISK,
    activationFunction: (input: InputCharacteristics, context?: DGTContext): number => {
      let activation = 0;
      
      // Magnitude-based activation
      if (input.magnitude > 1000000n) activation += 0.3;
      if (input.magnitude > 1000000000n) activation += 0.3;
      if (input.digitCount > 20) activation += 0.2;
      if (input.digitCount > 50) activation += 0.2;
      
      // Scientific notation often indicates large numbers
      if (input.isScientific) activation += 0.2;
      
      // Context-based enhancement
      if (context && context.metadata.maxValueSeen > 1000000n) {
        activation += 0.1;
      }
      
      return Math.min(activation, 1.0);
    },
    threshold: 0.4,
    priority: 3
  },
  
  {
    dimension: StrategyDimension.PRECISION_TENSION,
    activationFunction: (input: InputCharacteristics, context?: DGTContext): number => {
      let activation = 0;
      
      // Decimal precision indicators
      if (input.hasDecimals) activation += 0.3;
      
      // Large numbers with precision requirements
      if (input.digitCount > 15 && input.hasDecimals) activation += 0.4;
      
      // Chain of operations increases precision tension
      if (context && context.metadata.operationCount > 5) {
        activation += 0.2;
      }
      
      // High complexity estimates need precision
      if (input.estimatedComplexity > 0.7) activation += 0.1;
      
      return Math.min(activation, 1.0);
    },
    threshold: 0.3,
    priority: 4
  },
  
  {
    dimension: StrategyDimension.RECURSION_DEPTH,
    activationFunction: (input: InputCharacteristics, context?: DGTContext): number => {
      let activation = 0;
      
      // Large magnitudes often require recursive algorithms
      if (input.magnitude > 1000n) activation += 0.2;
      if (input.magnitude > 100000n) activation += 0.3;
      
      // Complexity estimation
      if (input.estimatedComplexity > 0.8) activation += 0.4;
      
      // Historical depth issues
      if (context && context.metadata.avgComputationTime > 1000) {
        activation += 0.2; // Long computation times suggest deep recursion
      }
      
      return Math.min(activation, 1.0);
    },
    threshold: 0.5,
    priority: 2
  },
  
  {
    dimension: StrategyDimension.MEMORY_PRESSURE,
    activationFunction: (input: InputCharacteristics, context?: DGTContext): number => {
      let activation = 0;
      
      // Very large numbers create memory pressure
      if (input.digitCount > 100) activation += 0.4;
      if (input.digitCount > 1000) activation += 0.4;
      
      // Multiple large inputs compound the issue
      if (context && context.inputHistory.length > 10) {
        const recentLargeInputs = context.inputHistory
          .slice(-10)
          .filter(inp => {
            try {
              const val = toBigInt(inp);
              return val.toString().length > 50;
            } catch {
              return false;
            }
          }).length;
        
        activation += recentLargeInputs * 0.05;
      }
      
      return Math.min(activation, 1.0);
    },
    threshold: 0.4,
    priority: 1
  },
  
  {
    dimension: StrategyDimension.HEURISTIC_FIT,
    activationFunction: (input: InputCharacteristics, context?: DGTContext): number => {
      let activation = 0;
      
      // Large inputs benefit from approximations
      if (input.magnitude > 1000000n) activation += 0.3;
      if (input.digitCount > 30) activation += 0.3;
      
      // High complexity suggests heuristics might be beneficial
      if (input.estimatedComplexity > 0.6) activation += 0.2;
      
      // Performance history suggests heuristics needed
      if (context && context.metadata.avgComputationTime > 500) {
        activation += 0.2;
      }
      
      return Math.min(activation, 1.0);
    },
    threshold: 0.5,
    priority: 1
  }
];

/**
 * Analyzes input characteristics for dimensional detection
 */
export function analyzeInput(input: NumericInput): InputCharacteristics {
  try {
    const inputStr = input.toString();
    const value = toBigInt(input);
    const magnitude = value < 0n ? -value : value;
    
    // Basic characteristics
    const digitCount = magnitude.toString().length;
    const isScientific = inputStr.toLowerCase().includes('e');
    const hasDecimals = inputStr.includes('.');
    const isNegative = value < 0n;
    
    // Estimate computational complexity based on various factors
    let complexity = 0;
    if (digitCount > 10) complexity += 0.2;
    if (digitCount > 50) complexity += 0.3;
    if (digitCount > 100) complexity += 0.3;
    if (isScientific) complexity += 0.1;
    if (hasDecimals) complexity += 0.1;
    
    return {
      magnitude,
      digitCount,
      isScientific,
      hasDecimals,
      isNegative,
      estimatedComplexity: Math.min(complexity, 1.0)
    };
  } catch (error) {
    throw new ValidationError(`Failed to analyze input: ${input}`);
  }
}

/**
 * Detects all active dimensions for a set of inputs
 */
export function detectActiveDimensions(
  inputs: NumericInput[],
  context?: DGTContext
): DimensionProfile[] {
  const profiles: DimensionProfile[] = [];
  
  // Analyze each input
  const characteristics = inputs.map(analyzeInput);
  
  // Evaluate each dimension against all inputs
  for (const map of ACTIVATION_MAPS) {
    const activations = characteristics.map(char => 
      map.activationFunction(char, context)
    );
    
    // Use maximum activation across all inputs for this dimension
    const maxActivation = Math.max(...activations);
    
    if (maxActivation >= map.threshold) {
      const evidence = buildEvidence(characteristics, map.dimension, maxActivation);
      
      profiles.push({
        dimension: map.dimension,
        activation: maxActivation,
        threshold: map.threshold,
        evidence
      });
    }
  }
  
  // Sort by priority (higher priority first)
  return profiles.sort((a, b) => {
    const priorityA = ACTIVATION_MAPS.find(m => m.dimension === a.dimension)?.priority || 0;
    const priorityB = ACTIVATION_MAPS.find(m => m.dimension === b.dimension)?.priority || 0;
    return priorityB - priorityA;
  });
}

/**
 * Builds evidence list for dimension activation
 */
function buildEvidence(
  characteristics: InputCharacteristics[],
  dimension: StrategyDimension,
  activation: number
): string[] {
  const evidence: string[] = [];
  
  switch (dimension) {
    case StrategyDimension.GROWTH_RISK:
      const largeInputs = characteristics.filter(c => c.magnitude > 1000000n);
      if (largeInputs.length > 0) {
        evidence.push(`${largeInputs.length} inputs with magnitude > 1M`);
      }
      
      const extremeInputs = characteristics.filter(c => c.digitCount > 50);
      if (extremeInputs.length > 0) {
        evidence.push(`${extremeInputs.length} inputs with >50 digits`);
      }
      break;
      
    case StrategyDimension.PRECISION_TENSION:
      const decimalInputs = characteristics.filter(c => c.hasDecimals);
      if (decimalInputs.length > 0) {
        evidence.push(`${decimalInputs.length} decimal inputs requiring precision`);
      }
      break;
      
    case StrategyDimension.RECURSION_DEPTH:
      const complexInputs = characteristics.filter(c => c.estimatedComplexity > 0.7);
      if (complexInputs.length > 0) {
        evidence.push(`${complexInputs.length} high-complexity inputs`);
      }
      break;
      
    case StrategyDimension.MEMORY_PRESSURE:
      const hugeInputs = characteristics.filter(c => c.digitCount > 100);
      if (hugeInputs.length > 0) {
        evidence.push(`${hugeInputs.length} inputs with >100 digits`);
      }
      break;
      
    case StrategyDimension.HEURISTIC_FIT:
      const approximatableInputs = characteristics.filter(c => 
        c.magnitude > 1000000n && c.estimatedComplexity > 0.5
      );
      if (approximatableInputs.length > 0) {
        evidence.push(`${approximatableInputs.length} inputs suitable for approximation`);
      }
      break;
  }
  
  evidence.push(`Activation strength: ${(activation * 100).toFixed(1)}%`);
  return evidence;
}

/**
 * Filters dimensions by activation strength
 */
export function filterByActivation(
  profiles: DimensionProfile[],
  minActivation: number = 0.5
): DimensionProfile[] {
  return profiles.filter(profile => profile.activation >= minActivation);
}

/**
 * Gets the dominant dimension (highest activation)
 */
export function getDominantDimension(profiles: DimensionProfile[]): DimensionProfile | null {
  if (profiles.length === 0) return null;
  
  return profiles.reduce((dominant, current) => 
    current.activation > dominant.activation ? current : dominant
  );
}

/**
 * Checks if dimensions conflict with each other
 */
export function checkDimensionConflicts(profiles: DimensionProfile[]): string[] {
  const conflicts: string[] = [];
  const activeDimensions = profiles.map(p => p.dimension);
  
  // Precision tension conflicts with heuristic fit
  if (activeDimensions.includes(StrategyDimension.PRECISION_TENSION) &&
      activeDimensions.includes(StrategyDimension.HEURISTIC_FIT)) {
    conflicts.push('Precision requirements conflict with heuristic approximations');
  }
  
  // Growth risk with recursion depth can cause stack overflow
  if (activeDimensions.includes(StrategyDimension.GROWTH_RISK) &&
      activeDimensions.includes(StrategyDimension.RECURSION_DEPTH)) {
    conflicts.push('Growth risk combined with recursion depth may cause overflow');
  }
  
  return conflicts;
}

/**
 * Suggests dimension resolution strategies for conflicts
 */
export function resolveDimensionConflicts(
  profiles: DimensionProfile[]
): { resolution: string; adjustedProfiles: DimensionProfile[] } {
  const conflicts = checkDimensionConflicts(profiles);
  
  if (conflicts.length === 0) {
    return { resolution: 'No conflicts detected', adjustedProfiles: profiles };
  }
  
  const adjustedProfiles = [...profiles];
  let resolution = 'Conflicts resolved by: ';
  
  // Precision takes priority over heuristics
  const precisionIndex = adjustedProfiles.findIndex(p => 
    p.dimension === StrategyDimension.PRECISION_TENSION
  );
  const heuristicIndex = adjustedProfiles.findIndex(p => 
    p.dimension === StrategyDimension.HEURISTIC_FIT
  );
  
  if (precisionIndex !== -1 && heuristicIndex !== -1) {
    // Reduce heuristic activation when precision is needed
    adjustedProfiles[heuristicIndex].activation *= 0.5;
    resolution += 'reducing heuristic priority for precision; ';
  }
  
  // Memory pressure takes priority over recursion depth
  const memoryIndex = adjustedProfiles.findIndex(p => 
    p.dimension === StrategyDimension.MEMORY_PRESSURE
  );
  const recursionIndex = adjustedProfiles.findIndex(p => 
    p.dimension === StrategyDimension.RECURSION_DEPTH
  );
  
  if (memoryIndex !== -1 && recursionIndex !== -1) {
    // Boost memory-safe strategies
    adjustedProfiles[memoryIndex].activation = Math.min(
      adjustedProfiles[memoryIndex].activation * 1.2, 
      1.0
    );
    resolution += 'prioritizing memory safety over recursion optimization';
  }
  
  return { resolution, adjustedProfiles };
}

/**
 * Creates a summary report of dimensional analysis
 */
export function createDimensionalReport(
  inputs: NumericInput[],
  profiles: DimensionProfile[],
  context?: DGTContext
): string {
  const characteristics = inputs.map(analyzeInput);
  const conflicts = checkDimensionConflicts(profiles);
  
  let report = '=== Dimensional Analysis Report ===\n\n';
  
  // Input summary
  report += `Inputs Analyzed: ${inputs.length}\n`;
  report += `Average Complexity: ${(
    characteristics.reduce((sum, c) => sum + c.estimatedComplexity, 0) / 
    characteristics.length
  ).toFixed(2)}\n`;
  report += `Largest Magnitude: ${Math.max(...characteristics.map(c => Number(c.magnitude)))}\n\n`;
  
  // Active dimensions
  report += 'Active Dimensions:\n';
  if (profiles.length === 0) {
    report += '  None detected\n';
  } else {
    profiles.forEach(profile => {
      report += `  ${profile.dimension}: ${(profile.activation * 100).toFixed(1)}% activation\n`;
      profile.evidence.forEach(evidence => {
        report += `    - ${evidence}\n`;
      });
    });
  }
  report += '\n';
  
  // Conflicts
  if (conflicts.length > 0) {
    report += 'Detected Conflicts:\n';
    conflicts.forEach(conflict => {
      report += `  - ${conflict}\n`;
    });
    report += '\n';
  }
  
  // Context information
  if (context) {
    report += 'Context Information:\n';
    report += `  Operations: ${context.metadata.operationCount}\n`;
    report += `  Max Value Seen: ${context.metadata.maxValueSeen}\n`;
    report += `  Avg Computation Time: ${context.metadata.avgComputationTime.toFixed(2)}ms\n`;
  }
  
  return report;
}

export default {
  analyzeInput,
  detectActiveDimensions,
  filterByActivation,
  getDominantDimension,
  checkDimensionConflicts,
  resolveDimensionConflicts,
  createDimensionalReport,
  ACTIVATION_MAPS
};
