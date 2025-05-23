
# Ackermann Structure Documentation

## Overview
The `AckermannStructure` class implements a computational structure for calculating and managing Ackermann function values. It provides efficient caching, relationship tracking, and analysis capabilities for these rapidly growing numbers.

## Core Features
- Memoized computation of Ackermann function values
- Bidirectional relationship tracking between computed values
- Growth rate analysis capabilities
- Computation path tracing
- Safe handling of large numbers using BigInt

## Interface Structure

### IAckermannNode
```typescript
interface IAckermannNode {
    m: number;
    n: number;
    value: bigint;
    prevM?: IAckermannNode;  // Link to A(m-1, n)
    prevN?: IAckermannNode;  // Link to A(m, n-1)
    nextM?: IAckermannNode;  // Link to A(m+1, n)
    nextN?: IAckermannNode;  // Link to A(m, n+1)
}
```

## API Reference

### Constructor
```typescript
constructor()
```
Creates a new AckermannStructure instance with initialized storage.

### Public Methods

#### addNode
```typescript
public addNode(m: number, n: number): IAckermannNode
```
Adds a new computation node to the structure.

#### buildRange
```typescript
public buildRange(mRange: number, nRange: number): void
```
Computes and stores Ackermann values for a range of inputs.

#### getComputationPath
```typescript
public getComputationPath(m: number, n: number): ComputationStep[]
```
Returns the sequence of computations needed to reach A(m,n).

#### analyzeGrowthRate
```typescript
public analyzeGrowthRate(m: number): Map<number, GrowthAnalysis>
```
Analyzes value growth patterns for a fixed m value.

#### getLargestValue
```typescript
public getLargestValue(): bigint
```
Returns the largest computed Ackermann value.

#### getValue
```typescript
public getValue(m: number, n: number): bigint | undefined
```
Retrieves a specific computed Ackermann value.

## Usage Examples

### Basic Usage
```typescript
const ackermann = new AckermannStructure();

// Compute single value
const node = ackermann.addNode(3, 2);
console.log(node.value);

// Build range of values
ackermann.buildRange(2, 3);
```

### Growth Analysis
```typescript
const ackermann = new AckermannStructure();
ackermann.buildRange(2, 5);

const growth = ackermann.analyzeGrowthRate(2);
for (const [n, analysis] of growth) {
    console.log(`A(2,${n}):`, {
        value: analysis.value.toString(),
        increase: analysis.increase.toString(),
        multiplier: analysis.multiplier.toString()
    });
}
```

### Computation Path
```typescript
const ackermann = new AckermannStructure();
const path = ackermann.getComputationPath(2, 2);
console.log('Computation steps:', path);
```

## Implementation Notes
- Uses BigInt for arbitrary-precision arithmetic
- Implements memoization for performance optimization
- Handles stack overflow protection for large inputs
- Maintains a max heap for tracking largest values
- Provides bidirectional relationship tracking

## Performance Considerations
- Memory usage grows significantly with input size
- Computation time increases exponentially
- Use buildRange carefully with large ranges
- Consider memory limits when tracking relationships