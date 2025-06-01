# Hypernum Dimensional Game Theory Integration Guide

## Overview

This guide shows how to integrate the Dimensional Game Theory (DGT) operations module into the existing Hypernum library, enabling strategic numerical computation that adapts to real-world contexts.

## Integration Steps

### 1. File Structure Integration

Add the new files to the existing Hypernum structure:

```
src/
├── operations/
│   ├── dimensional.ts          # Main DGT operations module
│   └── index.ts               # Export dimensional operations
├── utils/
│   ├── dimensionUtils.ts      # Dimension detection utilities  
│   └── index.ts              # Export dimension utils
├── types/
│   ├── dimensional.ts         # DGT type definitions
│   └── index.ts              # Export dimensional types
└── core/
    └── hypernum.ts           # Update main class
```

### 2. Update Main Hypernum Class

Modify `src/core/hypernum.ts` to support dimensional operations:

```typescript
// Add imports
import {
  computeSmartBinomial,
  computeSmartPower,
  createDGTContext,
  StrategyDimension,
  DGTContext
} from '../operations/dimensional';

export class Hypernum {
  private dgtContext?: DGTContext;
  private dimensionalMode: boolean = false;

  constructor(config: HypernumConfig = {}) {
    // ... existing constructor code ...
    
    // Initialize dimensional context if enabled
    if (config.dimensional?.enabled) {
      this.dimensionalMode = true;
      this.dgtContext = createDGTContext(config);
    }
  }

  // Enhanced arithmetic with dimensional awareness
  public smartBinomial(n: bigint | string | number, k: bigint | string | number): bigint | number {
    if (this.dimensionalMode && this.dgtContext) {
      return computeSmartBinomial(n, k, this.config, this.dgtContext);
    }
    return binomial(n, k, { checkOverflow: this.config.checkOverflow });
  }

  public smartPower(base: bigint | string | number, exponent: bigint | string | number): bigint | number {
    if (this.dimensionalMode && this.dgtContext) {
      return computeSmartPower(base, exponent, this.config, this.dgtContext);
    }
    return power.power(base, exponent, this.config);
  }

  // Enable/disable dimensional mode at runtime
  public setDimensionalMode(enabled: boolean): void {
    this.dimensionalMode = enabled;
    if (enabled && !this.dgtContext) {
      this.dgtContext = createDGTContext(this.config);
    }
  }

  // Get dimensional analysis report
  public getDimensionalReport(): string | null {
    if (!this.dimensionalMode || !this.dgtContext) return null;
    return createDimensionalReport(
      this.dgtContext.inputHistory,
      Array.from(this.dgtContext.profiles.values()),
      this.dgtContext
    );
  }
}
```

### 3. Configuration Enhancement

Update the configuration type in `src/types/common.ts`:

```typescript
import { DimensionalConfig } from './dimensional';

// Extend existing HypernumConfig
export interface EnhancedHypernumConfig extends HypernumConfig {
  dimensional?: {
    enabled: boolean;
    detection?: {
      enabledDimensions?: StrategyDimension[];
      thresholds?: Partial<Record<StrategyDimension, number>>;
      adaptiveThresholds?: boolean;
    };
    strategy?: {
      preferExact?: boolean;
      allowApproximations?: boolean;
      maxComplexity?: ComplexityLevel;
      timeConstraint?: number;
    };
    logging?: {
      enabled?: boolean;
      level?: 'minimal' | 'standard' | 'verbose';
      logDimensions?: boolean;
      logStrategies?: boolean;
    };
  };
}
```

### 4. Factory Function Enhancement

Update `src/index.ts` to include dimensional creation:

```typescript
import { EnhancedHypernumConfig } from './types/common';
import { StrategyDimension } from './operations/dimensional';

export function createHypernum(config: EnhancedHypernumConfig = {}): Hypernum {
  return new Hypernum(config);
}

export function createDimensionalHypernum(
  dimensions: StrategyDimension[] = Object.values(StrategyDimension)
): Hypernum {
  return new Hypernum({
    dimensional: {
      enabled: true,
      detection: {
        enabledDimensions: dimensions,
        adaptiveThresholds: true
      },
      strategy: {
        allowApproximations: true,
        maxComplexity: 'high'
      },
      logging: {
        enabled: true,
        level: 'standard',
        logDimensions: true,
        logStrategies: true
      }
    }
  });
}

// Export dimensional types and utilities
export * from './operations/dimensional';
export * from './utils/dimensionUtils';
export * from './types/dimensional';
```

## Usage Examples

### Basic Dimensional Operations

```typescript
import { createDimensionalHypernum } from '@obinexuscomputing/hypernum';

// Create instance with dimensional capabilities
const hypernum = createDimensionalHypernum();

// Large binomial computation - automatically switches to approximation
const largeBinomial = hypernum.smartBinomial(1000n, 500n);
console.log('Result:', largeBinomial);

// Get analysis of what happened
const report = hypernum.getDimensionalReport();
console.log(report);
```

### Custom Dimensional Configuration

```typescript
import { createHypernum, StrategyDimension } from '@obinexuscomputing/hypernum';

const hypernum = createHypernum({
  precision: 10,
  dimensional: {
    enabled: true,
    detection: {
      enabledDimensions: [
        StrategyDimension.GROWTH_RISK,
        StrategyDimension.PRECISION_TENSION,
        StrategyDimension.HEURISTIC_FIT
      ],
      thresholds: {
        [StrategyDimension.GROWTH_RISK]: 0.3,
        [StrategyDimension.HEURISTIC_FIT]: 0.6
      }
    },
    strategy: {
      preferExact: false,
      allowApproximations: true,
      timeConstraint: 1000 // 1 second max
    },
    logging: {
      enabled: true,
      level: 'verbose',
      logDimensions: true,
      logStrategies: true
    }
  }
});

// This will use dimensional analysis
const result = hypernum.smartPower(2n, 1000n);
```

### Real-World Application Examples

#### Scientific Computing
```typescript
const scientificHypernum = createHypernum({
  precision: 15,
  dimensional: {
    enabled: true,
    strategy: {
      allowApproximations: true,
      maxComplexity: 'high'
    }
  }
});

// Automatically chooses Stirling's approximation for large factorials
const approxFactorial = scientificHypernum.smartBinomial(500n, 250n);
```

#### Financial Calculations
```typescript
const financialHypernum = createHypernum({
  precision: 8,
  dimensional: {
    enabled: true,
    strategy: {
      preferExact: true,
      allowApproximations: false // Precision critical
    }
  }
});

// Guarantees exact computation for financial accuracy
const compoundInterest = financialHypernum.smartPower(