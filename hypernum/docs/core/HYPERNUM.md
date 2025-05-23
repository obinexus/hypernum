# Hypernum Core Module Documentation

## Overview

Hypernum is a high-precision mathematics library for large number operations with BigInt support. It provides comprehensive arithmetic operations, data structures, and utilities for handling large numbers.

## Basic Usage

```typescript
import { createHypernum } from '@obinexuscomputing/hypernum';

// Create instance with default configuration
const hypernum = createHypernum();

// Basic operations
const sum = hypernum.add("123456789", "987654321");
const product = hypernum.multiply(2n, 1000000n);
const root = hypernum.sqrt(144n);
```

## Configuration

The Hypernum class accepts configuration options:

```typescript
interface HypernumConfig {
    precision?: number;        // Decimal precision
    roundingMode?: RoundingMode; // Rounding strategy
    checkOverflow?: boolean;   // Overflow checking
    maxSteps?: number;        // Max computation steps
    debug?: boolean;          // Debug mode
}

// Example with custom config
const customHypernum = createHypernum({
    precision: 10,
    roundingMode: 'HALF_EVEN',
    checkOverflow: true,
    maxSteps: 1000
});
```

## Core Operations

### Arithmetic Operations

```typescript
// Basic arithmetic
hypernum.add(a, b);       // Addition
hypernum.subtract(a, b);  // Subtraction  
hypernum.multiply(a, b);  // Multiplication
hypernum.divide(a, b);    // Division
hypernum.mod(a, b);       // Modulo

// Special operations
hypernum.gcd(a, b);       // Greatest Common Divisor
hypernum.lcm(a, b);       // Least Common Multiple
```

### Power Operations 

```typescript
hypernum.power(base, exp);     // Exponentiation
hypernum.sqrt(value);          // Square root
hypernum.nthRoot(value, n);    // Nth root
```

### Bitwise Operations

```typescript
hypernum.and(a, b);      // Bitwise AND
hypernum.or(a, b);       // Bitwise OR
hypernum.xor(a, b);      // Bitwise XOR
hypernum.not(value);     // Bitwise NOT
```

## Data Structures

### BigArray

```typescript
const array = hypernum.createArray("myArray");
array.push(123456789n);
const value = array.get(0);
```

### NumberTree

```typescript
const tree = hypernum.createTree("myTree");
tree.insert(123456789n);
const found = tree.find(123456789n);
```

### Heap

```typescript
const minHeap = hypernum.createHeap("myHeap", true);
minHeap.insert(123456789n);
const min = minHeap.peek();
```

## Error Handling

The library provides specific error types:

```typescript
try {
    const result = hypernum.power(2n, 1000n);
} catch (error) {
    if (error instanceof OverflowError) {
        // Handle overflow
    } else if (error instanceof ValidationError) {
        // Handle validation error
    }
}
```

## Utility Functions

```typescript
// Formatting
const formatted = hypernum.format(123456789n, {
    notation: 'scientific',
    precision: 2
});

// Validation
const isValid = hypernum.validate("123456789");

// Configuration
hypernum.updateConfig({ precision: 4 });
const config = hypernum.getConfig();
```

## Resource Management

```typescript
// Clean up resources
hypernum.dispose();
```

## Constants

Important limits and defaults:

- MAX_PRECISION: 100
- MAX_COMPUTATION_STEPS: 1000
- MAX_BITS: 1024
- MAX_POWER_EXPONENT: 1000
- DEFAULT_TREE_MAX_DEPTH: 1000

## Type Safety

Full TypeScript support with type definitions:

```typescript
import type { 
    HypernumConfig,
    NumericInput,
    OperationOptions
} from '@obinexuscomputing/hypernum';

const config: HypernumConfig = {
    precision: 10,
    checkOverflow: true
};
```

## Best Practices

1. Use BigInt literals when possible
2. Enable overflow checking for critical calculations
3. Configure precision based on requirements
4. Properly dispose of resources when done
5. Handle errors appropriately
6. Use type definitions in TypeScript projects

## See Also

- [Arithmetic Operations](./ARITHMETIC.md)
- [Power Operations](./POWER.md)
- [Bitwise Operations](./BITWISE.md)
- [Error Handling](./ERRORS.md)
- [Configuration Guide](./CONFIG.md)