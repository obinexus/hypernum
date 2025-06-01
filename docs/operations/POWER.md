# Power Operations

The power operations module provides functions for exponentiation and related mathematical computations using arbitrary-precision integers.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Core Functions](#core-functions)
- [Configuration](#configuration)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Advanced Usage](#advanced-usage)

## Basic Usage

```typescript
import { createHypernum } from '@obinexuscomputing/hypernum';

const hypernum = createHypernum();

// Basic exponentiation
const squared = hypernum.power(2n, 10n); // 2^10 = 1024

// Square root
const root = hypernum.sqrt(16n); // √16 = 4

// Nth root
const cubeRoot = hypernum.nthRoot(27n, 3n); // ∛27 = 3
```

## Core Functions

### power(base, exponent, options?)

Raises a number to an integer power using binary exponentiation.

```typescript
const result = hypernum.power(2n, 3n); // 2^3 = 8
```

### sqrt(value, options?)

Calculates square root using Newton's method.

```typescript
const result = hypernum.sqrt(144n); // √144 = 12
```

### nthRoot(value, n, options?)

Calculates nth root using Newton's method.

```typescript
const result = hypernum.nthRoot(125n, 3n); // ∛125 = 5
```

### tetration(base, height, options?)

Calculates tetration (repeated exponentiation).

```typescript
const result = hypernum.tetration(2n, 3n); // 2↑↑3 = 2^(2^2) = 16
```

### superRoot(value, height, options?)

Calculates super-root (inverse tetration).

```typescript
const result = hypernum.superRoot(16n, 3n); // Finds x where x↑↑3 = 16
```

## Configuration

Power operations accept the following options:

```typescript
interface PowerOptions {
    precision?: number;         // Decimal precision
    roundingMode?: RoundingMode; // Rounding strategy
    checkOverflow?: boolean;    // Enable overflow checking
    maxSteps?: number;         // Maximum computation steps
}
```

Example with options:

```typescript
const result = hypernum.power(2n, 10n, {
    precision: 2,
    roundingMode: 'HALF_EVEN',
    checkOverflow: true,
    maxSteps: 1000
});
```

## Examples

### Basic Power Operations

```typescript
const hypernum = createHypernum();

// Simple powers
const square = hypernum.power(5n, 2n);    // 25
const cube = hypernum.power(5n, 3n);      // 125

// Roots
const squareRoot = hypernum.sqrt(100n);    // 10
const cubeRoot = hypernum.nthRoot(64n, 3n); // 4
```

### Advanced Operations

```typescript
// Tetration
const tetration = hypernum.tetration(2n, 3n); // 2↑↑3 = 16

// Super-root
const superRoot = hypernum.superRoot(16n, 3n); // Find x where x↑↑3 = 16

// With precision
const preciseRoot = hypernum.sqrt(2n, { precision: 4 }); // √2 with 4 decimal places
```

## Error Handling

The power operations can throw several types of errors:

```typescript
try {
    const result = hypernum.power(2n, -1n);
} catch (error) {
    if (error instanceof ValidationError) {
        console.error('Negative exponents not supported');
    } else if (error instanceof OverflowError) {
        console.error('Computation would overflow');
    }
}
```

Common error cases:
- Negative exponents in integer power
- Zero raised to negative power
- Overflow in computation
- Exceeded maximum computation steps
- Invalid root indices
- Tetration overflow (e.g., base 2, height > 4)

## Advanced Usage

### Configuring Precision

```typescript
const preciseHypernum = createHypernum({
    precision: 10,
    roundingMode: 'HALF_EVEN'
});

const preciseRoot = preciseHypernum.sqrt(2n);
```

### Overflow Protection

```typescript
const safeHypernum = createHypernum({
    checkOverflow: true,
    maxSteps: 1000
});

try {
    const largeResult = safeHypernum.power(2n, 1000n);
} catch (error) {
    // Handle overflow
}
```

### Performance Optimization

```typescript
const fastHypernum = createHypernum({
    checkOverflow: false,  // Disable when speed is critical
    precision: 0          // Use integer-only operations
});

const result = fastHypernum.power(base, exponent);
```