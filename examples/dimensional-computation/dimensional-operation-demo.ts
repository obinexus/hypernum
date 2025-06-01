/**
 * demo/dimensional-operations-demo.ts
 * Demonstration of Dimensional Game Theory in action with real-world scenarios
 */

import {
  computeSmartBinomial,
  computeSmartPower,
  createDGTContext,
  updateDGTContext,
  StrategyDimension,
  detectDimensions,
  resolveStrategy
} from '../src/operations/dimensional';
import { analyzeInput, createDimensionalReport } from '../src/utils/dimensionUtils';
import { HypernumConfig } from '../src/types/common';

/**
 * Scenario 1: Scientific Computing - Large Factorial Approximation
 * Problem: Computing 1000! exactly would overflow, but scientific applications
 * often need good approximations for statistical distributions.
 */
function scientificComputingScenario() {
  console.log('=== Scenario 1: Scientific Computing ===\n');
  
  const config: HypernumConfig = {
    precision: 15,
    checkOverflow: true,
    maxSteps: 1000,
    debug: true
  };
  
  const context = createDGTContext(config);
  
  // Attempt to compute large binomial: C(1000, 500)
  const n = 1000n;
  const k = 500n;
  
  console.log(`Computing C(${n}, ${k})...`);
  
  // DGT will detect GROWTH_RISK and HEURISTIC_FIT dimensions
  const startTime = performance.now();
  try {
    const result = computeSmartBinomial(n, k, config, context);
    const endTime = performance.now();
    
    console.log(`Result: ${result}`);
    console.log(`Execution time: ${(endTime - startTime).toFixed(2)}ms`);
    
    updateDGTContext(context, [n, k], typeof result === 'bigint' ? result : BigInt(result), endTime - startTime);
    
    // Show dimensional analysis
    const dimensions = detectDimensions([n, k], config, context);
    console.log('\nDimensional Analysis:');
    dimensions.forEach(dim => {
      console.log(`  ${dim.dimension}: ${(dim.activation * 100).toFixed(1)}% activation`);
      dim.evidence.forEach(evidence => console.log(`    - ${evidence}`));
    });
    
  } catch (error) {
    console.error(`Computation failed: ${error}`);
  }
}

/**
 * Scenario 2: Cryptographic Key Generation - Precision vs Performance
 * Problem: Generate large prime candidates efficiently while maintaining
 * cryptographic strength requirements.
 */
function cryptographicScenario() {
  console.log('\n=== Scenario 2: Cryptographic Computing ===\n');
  
  const config: HypernumConfig = {
    precision: 0, // Integer operations only
    checkOverflow: false, // Large numbers expected
    maxSteps: 10000,
    debug: false // Performance critical
  };
  
  const context = createDGTContext(config);
  
  // Generate 2048-bit number (approximately 2^2048)
  const base = 2n;
  const exponent = 2048n;
  
  console.log(`Computing 2^${exponent} for cryptographic operations...`);
  
  const startTime = performance.now();
  try {
    const result = computeSmartPower(base, exponent, config, context);
    const endTime = performance.now();
    
    console.log(`Result magnitude: ${typeof result === 'bigint' ? result.toString().length : 'N/A'} digits`);
    console.log(`Execution time: ${(endTime - startTime).toFixed(2)}ms`);
    
    // Analyze the strategy chosen
    const strategy = resolveStrategy([base, exponent], config, context);
    console.log(`\nStrategy Profile:`);
    console.log(`  Primary: ${strategy.primary}`);
    console.log(`  Reasoning: ${strategy.reasoning}`);
    console.log(`  Expected Precision: ${strategy.expectedPrecision}`);
    console.log(`  Complexity: ${strategy.estimatedComplexity}`);
    
  } catch (error) {
    console.error(`Computation failed: ${error}`);
  }
}

/**
 * Scenario 3: Financial Modeling - Precision Under Pressure
 * Problem: Calculate compound interest on large portfolios where precision
 * errors could mean millions in miscalculation.
 */
function financialModelingScenario() {
  console.log('\n=== Scenario 3: Financial Modeling ===\n');
  
  const config: HypernumConfig = {
    precision: 8, // Financial precision
    checkOverflow: true,
    maxSteps: 500,
    debug: true
  };
  
  const context = createDGTContext(config);
  
  // Portfolio calculation: $500M at 3.7% annually for 25 years
  // Using formula: A = P(1 + r)^t
  const principal = "500000000"; // $500M
  const rate = "1.037"; // 3.7% = 1.037 multiplier
  const years = 25n;
  
  console.log(`Computing compound growth: $500M at 3.7% for 25 years...`);
  
  // First, analyze the inputs
  const inputs = [principal, rate, years];
  const inputAnalysis = inputs.map(analyzeInput);
  
  console.log('\nInput Analysis:');
  inputAnalysis.forEach((analysis, i) => {
    console.log(`  Input ${i + 1}: ${inputs[i]}`);
    console.log(`    Magnitude: ${analysis.magnitude}`);
    console.log(`    Complexity: ${(analysis.estimatedComplexity * 100).toFixed(1)}%`);
    console.log(`    Has decimals: ${analysis.hasDecimals}`);
  });
  
  // DGT should detect PRECISION_TENSION due to financial requirements
  const dimensions = detectDimensions(inputs, config, context);
  console.log('\nActive Dimensions:');
  dimensions.forEach(dim => {
    console.log(`  ${dim.dimension}: ${(dim.activation * 100).toFixed(1)}%`);
  });
  
  // Generate comprehensive report
  const report = createDimensionalReport(inputs, dimensions, context);
  console.log('\n' + report);
}

/**
 * Scenario 4: Machine Learning - Adaptive Precision
 * Problem: Training neural networks requires different precision at different
 * stages - high precision for gradients, lower for forward pass.
 */
function machineLearningScenario() {
  console.log('\n=== Scenario 4: Machine Learning Adaptation ===\n');
  
  // Simulate different ML phases with varying requirements
  const phases = [
    {
      name: 'Gradient Calculation',
      config: { precision: 16, checkOverflow: true, maxSteps: 100, debug: false },
      inputs: ['0.00001234', '0.99999876'] // Small gradients need precision
    },
    {
      name: 'Weight Updates',
      config: { precision: 8, checkOverflow: true, maxSteps: 50, debug: false },
      inputs: ['2.5', '1000000'] // Larger weights, less precision needed
    },
    {
      name: 'Batch Processing',
      config: { precision: 4, checkOverflow: false, maxSteps: 1000, debug: false },
      inputs: ['1000', '256', '224', '224'] // Large tensors, speed priority
    }
  ];
  
  phases.forEach(phase => {
    console.log(`\n--- ${phase.name} ---`);
    
    const context = createDGTContext(phase.config);
    const dimensions = detectDimensions(phase.inputs, phase.config, context);
    const strategy = resolveStrategy(phase.inputs, phase.config, context);
    
    console.log(`Detected dimensions: ${dimensions.map(d => d.dimension).join(', ')}`);
    console.log(`Recommended strategy: ${strategy.primary}`);
    console.log(`Reasoning: ${strategy.reasoning}`);
    
    // Show adaptive behavior
    if (dimensions.some(d => d.dimension === StrategyDimension.PRECISION_TENSION)) {
      console.log('?? High precision mode activated for critical calculations');
    }
    if (dimensions.some(d => d.dimension === StrategyDimension.HEURISTIC_FIT)) {
      console.log('? Fast approximation mode available for bulk operations');
    }
    if (dimensions.some(d => d.dimension === StrategyDimension.MEMORY_PRESSURE)) {
      console.log('?? Memory-efficient algorithms selected for large datasets');
    }
  });
}

/**
 * Scenario 5: Real-time Gaming - Performance Under Time Pressure
 * Problem: Physics simulation needs accurate calculations but must maintain
 * 60fps - strategic switching between exact and approximate math.
 */
function gamingScenario() {
  console.log('\n=== Scenario 5: Real-time Gaming Physics ===\n');
  
  const frameTime = 16.67; // ~60fps
  const config: HypernumConfig = {
    precision: 6, // Good enough for visuals
    checkOverflow: false, // Speed priority
    maxSteps: 100, // Time constrained
    debug: true
  };
  
  const context = createDGTContext(config);
  
  // Simulate collision detection calculations
  const gameObjects = [
    { position: [100.5, 200.7], velocity: [15.2, -9.8], mass: 5.5 },
    { position: [150.8, 180.3], velocity: [-8.1, 12.4], mass: 3.2 }
  ];
  
  console.log('Simulating physics calculations for collision detection...');
  
  // Extract calculation inputs
  const physicsInputs = gameObjects.flatMap(obj => [
    ...obj.position.map(String),
    ...obj.velocity.map(String),
    obj.mass.toString()
  ]);
  
  const startTime = performance.now();
  
  // Analyze computational requirements
  const dimensions = detectDimensions(physicsInputs, config, context);
  const strategy = resolveStrategy(physicsInputs, config, context);
  
  const analysisTime = performance.now() - startTime;
  
  console.log(`\nDimensional analysis completed in ${analysisTime.toFixed(2)}ms`);
  console.log(`Strategy: ${strategy.primary} (${strategy.reasoning})`);
  
  if (analysisTime < frameTime * 0.1) { // Less than 10% of frame time
    console.log('? Analysis overhead acceptable for real-time use');
  } else {
    console.log('??  Analysis overhead too high - consider caching or simplification');
  }
  
  // Show adaptive behavior for different game states
  const gameStates = ['menu', 'gameplay', 'physics_heavy', 'particle_effects'];
  gameStates.forEach(state => {
    const stateConfig = { ...config };
    switch (state) {
      case 'menu':
        stateConfig.precision = 2;
        stateConfig.maxSteps = 10;
        break;
      case 'physics_heavy':
        stateConfig.precision = 8;
        stateConfig.maxSteps = 200;
        break;
      case 'particle_effects':
        stateConfig.precision = 3;
        stateConfig.maxSteps = 50;
        break;
    }
    
    const stateStrategy = resolveStrategy(physicsInputs, stateConfig, context);
    console.log(`${state}: ${stateStrategy.primary} strategy`);
  });
}

/**
 * Run all demonstration scenarios
 */
function runAllScenarios() {
  console.log('?? Dimensional Game Theory Demonstration\n');
  console.log('Showcasing adaptive numerical computation in real-world scenarios\n');
  
  try {
    scientificComputingScenario();
    cryptographicScenario();
    financialModelingScenario();
    machineLearningScenario();
    gamingScenario();
    
    console.log('\n=== Demonstration Complete ===');
    console.log('Dimensional Game Theory successfully adapted strategies across:');
    console.log(' Scientific computing with growth risk management');
    console.log(' Cryptographic operations with performance optimization');
    console.log(' Financial modeling with precision guarantees');
    console.log(' Machine learning with phase-appropriate strategies');
    console.log(' Real-time gaming with temporal constraints');
    console.log('\nKey benefits demonstrated:');
    console.log(' Automatic detection of computational challenges');
    console.log(' Strategic algorithm selection based on context');
    console.log(' Graceful degradation under constraints');
    console.log(' Performance-precision trade-off optimization');
    console.log(' Adaptive behavior across different domains');
    
  } catch (error) {
    console.error('Demonstration failed:', error);
  }
}

// Export for use in test suites or standalone execution
export {
  runAllScenarios,
  scientificComputingScenario,
  cryptographicScenario,
  financialModelingScenario,
  machineLearningScenario,
  gamingScenario
};

// If run directly
if (require.main === module) {
  runAllScenarios();
}
