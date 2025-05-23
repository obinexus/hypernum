# Comparison Operations

The comparison module provides a comprehensive set of functions for comparing large numbers with precision support.

## Overview

Comparison operations allow you to compare BigInt values, strings, or numbers with optional precision and tolerance settings.

## Options

```typescript
interface ComparisonOptions {
    precision?: number;        // Decimal precision for comparison
    roundingMode?: RoundingMode; // Rounding mode for decimal operations  
    tolerance?: number;        // Comparison tolerance
}
```

## Core Functions

### compare(a, b, options?)
Compares two numbers and returns:
- `-1` if a < b
- `0` if a = b 
- `1` if a > b

```typescript
const result = compare("123", "456");  // Returns -1
```

### equals(a, b, options?)
Checks if two numbers are equal.

```typescript
const areEqual = equals("100", "100");  // Returns true
```

### lessThan(a, b, options?)
Checks if first number is less than second.

```typescript
const isLess = lessThan("50", "100");  // Returns true
```

### greaterThan(a, b, options?) 
Checks if first number is greater than second.

```typescript
const isGreater = greaterThan("200", "100");  // Returns true
```

## Range Operations

### between(value, min, max, options?)
Checks if a number is between two others (inclusive).

```typescript
const inRange = between("50", "1", "100");  // Returns true
```

### clamp(value, min, max, options?)
Clamps a value between minimum and maximum bounds.

```typescript
const clamped = clamp("150", "1", "100");  // Returns 100n
```

## Array Operations

### max(values, options?)
Finds the maximum value in an array of numbers.

```typescript
const maximum = max(["1", "5", "3"]);  // Returns 5n
```

### min(values, options?)
Finds the minimum value in an array of numbers.

```typescript
const minimum = min(["1", "5", "3"]);  // Returns 1n
```

### allEqual(values, options?)
Checks if all values in array are equal within tolerance.

```typescript
const equal = allEqual(["100", "100", "100"]);  // Returns true
```

## Order Checking

### isAscending(values, options?)
Checks if values are in ascending order.

```typescript
const ascending = isAscending(["1", "2", "3"]);  // Returns true
```

### isDescending(values, options?)
Checks if values are in descending order.

```typescript
const descending = isDescending(["3", "2", "1"]);  // Returns true
```

## Helper Functions

### createComparator(options?)
Creates a comparator function for sorting.

```typescript
const comparator = createComparator({ precision: 2 });
const sorted = ["3", "1", "2"].sort(comparator);  // Returns ["1", "2", "3"]
```

## Input Types
All comparison functions accept:
- `bigint` values
- Number strings
- JavaScript numbers

## Error Handling
- Throws `ValidationError` for empty arrays in max/min operations
- Throws `ValidationError` for invalid bounds in clamp operation
- Handles undefined array elements gracefully

## Examples

```typescript
// Basic comparison
compare("123456789", "987654321");  // Returns -1

// With precision
equals("1.23", "1.234", { precision: 2 });  // Returns true

// With tolerance
equals("100", "99", { tolerance: 1 });  // Returns true

// Array operations
max(["123", "456", "789"]);  // Returns 789n
min(["123", "456", "789"]);  // Returns 123n

// Range operations
between("500", "100", "1000");  // Returns true
clamp("1500", "100", "1000");  // Returns 1000n
```