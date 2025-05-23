# Precision Handling in Hypernum

This document describes how Hypernum handles numerical precision and rounding operations for large number computations.

## Table of Contents

- [Rounding Modes](#rounding-modes)
- [Core Functions](#core-functions) 
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)

## Rounding Modes

Hypernum supports the following rounding modes:

- `FLOOR` - Round towards negative infinity
- `CEIL` - Round towards positive infinity 
- `DOWN` - Round towards zero
- `UP` - Round away from zero
- `HALF_EVEN` - Round to nearest even number when tied (Banker's rounding)
- `HALF_UP` - Round up when tied
- `HALF_DOWN` - Round down when tied

## Core Functions

### Precision Scaling

```typescript
// Scale a number by a power of 10
const scaled = scaleByPowerOfTen(value, power);

// Normalize two numbers to same precision
const [a, b] = normalizePrecision(value1, value2, precision1, precision2);
```

### Rounding Operations

```typescript
// Round a number with specified precision and mode
const rounded = round(value, precision, RoundingMode.HALF_EVEN);

// Truncate to significant digits
const truncated = truncateToSignificantDigits(value, digits);
```

### Precision Analysis

```typescript
// Calculate required precision
const requiredPrecision = calculateRequiredPrecision(value);

// Get number of significant digits
const digits = significantDigits(value);

// Get fractional part
const fraction = getFractionalPart(value, precision);
```

## Configuration

Configure precision handling when creating a Hypernum instance:

```typescript
const hypernum = createHypernum({
    precision: 10,  // Default decimal precision
    roundingMode: 'HALF_EVEN',  // Default rounding strategy
});
```

## Usage Examples

### Basic Precision Operations

```typescript
const hypernum = createHypernum();

// Division with precision
const result = hypernum.divide("10", "3", { precision: 4 });
// Returns: "3.3333"

// Multiplication maintaining precision
const product = hypernum.multiply("1.23", "4.56", { precision: 4 });
// Returns: "5.6088"
```

### Exact Precision Formatting

```typescript
// Format with exact precision
const formatted = toExactPrecision(123456n, 4);
// Returns: "12.3456"

// Compare numbers within precision
const areEqual = equalWithinPrecision(value1, value2, precision);
```

### Advanced Usage

```typescript
// Scale division operation
const quotient = scaledDivision(
    numerator,
    denominator, 
    precision,
    RoundingMode.HALF_EVEN
);

// Handle fractional parts
const fraction = getFractionalPart(value, precision);
```

## Error Handling

Precision operations may throw the following errors:

```typescript
try {
    const result = round(value, -1); // Invalid precision
} catch (error) {
    if (error instanceof ValidationError) {
        // Handle precision validation error
    }
}
```

Common error cases:
- Negative precision values
- Division by zero
- Invalid rounding modes
- Precision exceeding maximum allowed value

## Best Practices

1. Choose appropriate precision for your use case
2. Use HALF_EVEN rounding for financial calculations
3. Consider performance impact of high precision operations
4. Validate inputs before precision operations
5. Handle precision errors appropriately

## Limitations

- Maximum precision: 100 decimal places
- Minimum precision: 0 (integer operations)
- Performance impact increases with precision
- Memory usage scales with precision

## See Also

- [Arithmetic Operations](./ARITHMETIC.md)
- [Configuration Guide](../CONFIG.md)
- [Error Handling](./ERRORS.md)