# Arithmetic Operations

This document outlines the arithmetic operations available in the HyperNum package.

## Basic Operations

### Addition (+)
Adds two or more numbers together.add
```typescript
const a = hypernum(5);
const b = hypernum(3);
const sum = a.add(b); // 8
```

### Subtraction (-)
Subtracts one number from another.
```typescript
const difference = a.subtract(b); // 2
```

### Multiplication (*)
Multiplies two or more numbers.
```typescript
const product = a.multiply(b); // 15
```

### Division (/)
Divides one number by another.
```typescript
const quotient = a.divide(b); // 1.666...
```

## Advanced Operations

### Power (^)
Raises a number to the specified power.
```typescript
const power = a.pow(b); // 125
```

### Square Root (√)
Calculates the square root of a number.
```typescript
const sqrt = a.sqrt(); // 2.236...
```

### Absolute Value (|x|)
Returns the absolute value of a number.
```typescript
const abs = hypernum(-5).abs(); // 5
```

## Precision Handling

All arithmetic operations maintain precision according to the configured settings. Results are automatically rounded based on the specified precision level.

## Error Handling

Operations that could result in invalid mathematical states (like division by zero) throw appropriate errors with descriptive messages.

## Chain Operations

Operations can be chained for complex calculations:
```typescript
const result = hypernum(10)
    .add(5)
    .multiply(2)
    .divide(3)
    .sqrt();
```