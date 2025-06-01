# Factorial Operations

This module provides functions for calculating factorials and related mathematical operations using arbitrary-precision integers.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Core Functions](#core-functions)
- [Configuration](#configuration)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Advanced Usage](#advanced-usage)

## Basic Usage

```typescript
import { factorial, binomial } from '@obinexuscomputing/hypernum';

// Calculate basic factorial
const fact5 = factorial(5n); // 120

// Calculate binomial coefficient
const combination = binomial(10n, 3n); // 120 (10 choose 3)
```

## Core Functions

### factorial(value, options?)

Calculates the factorial of a number (n!).

```typescript
const result = factorial(5n); // 5! = 5 * 4 * 3 * 2 * 1 = 120
```

### binomial(n, k, options?)

Calculates the binomial coefficient (n choose k).

```typescript
const result = binomial(10n, 3n); // C(10,3) = 120
```

### subfactorial(value, options?)

Calculates the derangement number - number of permutations with no fixed points.

```typescript
const result = subfactorial(4n); // !4 = 9
```

### risingFactorial(x, n, options?)

Calculates the rising factorial (Pochhammer symbol).

```typescript
const result = risingFactorial(3n, 4n); // 3 * 4 * 5 * 6 = 360
```

### fallingFactorial(x, n, options?)

Calculates the falling factorial.

```typescript
const result = fallingFactorial(6n, 3n); // 6 * 5 * 4 = 120
```

### multiFactorial(value, k, options?)

Calculates the k-factorial (multifactorial).

```typescript
const result = multiFactorial(9n, 2n); // 9!! = 9 * 7 * 5 * 3 * 1 = 945
```

### primorial(value, options?)

Calculates the primorial (product of prime numbers up to n).

```typescript
const result = primorial(10n); // 2 * 3 * 5 * 7 = 210
```

## Configuration

Factorial operations accept the following options:

```typescript
interface FactorialOptions {
    maxValue?: number;      // Maximum allowed input
    checkOverflow?: boolean; // Enable overflow checking  
    useCache?: boolean;     // Cache computed results
}
```

Example with options:

```typescript
const result = factorial(10n, {
    maxValue: 100,
    checkOverflow: true,
    useCache: true
});
```

## Examples

### Basic Factorial Operations

```typescript
const hypernum = createHypernum();

// Factorial
const fact6 = factorial(6n); // 720

// Binomial coefficient
const combination = binomial(8n, 2n); // 28

// Subfactorial
const derangement = subfactorial(5n); // 44
```

### Advanced Operations

```typescript
// Rising factorial
const rising = risingFactorial(2n, 3n); // 24

// Falling factorial 
const falling = fallingFactorial(5n, 3n); // 60

// Double factorial
const double = multiFactorial(7n, 2n); // 105

// Primorial
const primeProduct = primorial(11n); // 2310
```

## Error Handling

```typescript
try {
    const result = factorial(2000n);
} catch (error) {
    if (error instanceof OverflowError) {
        console.error('Input too large');
    } else if (error instanceof ValidationError) {
        console.error('Invalid input');
    }
}
```

Common error cases:
- Negative input values
- Input exceeds maximum allowed value
- Invalid k value in multifactorial
- Computation would overflow

## Advanced Usage

### Performance Optimization

```typescript
// Enable caching for repeated calculations
const cached = factorial(100n, {
    useCache: true
});

// Disable overflow checking when speed is critical
const fast = factorial(50n, {
    checkOverflow: false
});
```

### Memory Management

```typescript
// Set maximum input value to control memory usage
const safe = factorial(500n, {
    maxValue: 1000,
    checkOverflow: true
});
```

## See Also

- [Core Operations](../README.md)
- [Power Operations](./POWER.md)
- [Precision Handling](../utils/PRECISION.md)