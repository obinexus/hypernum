# Validation Utilities

The validation module provides comprehensive type checking and validation functions for handling large number operations safely in Hypernum.

## Type Guards

### isBigInt
Checks if a value is a native BigInt:
```typescript
const value = 123n;
if (isBigInt(value)) {
    // Value is confirmed to be BigInt
}
```

### isValidNumberString  
Validates string representation of numbers:
```typescript
isValidNumberString("123"); // true
isValidNumberString("12.3"); // false
isValidNumberString("abc"); // false
```

### isValidNumber
Validates if value is a proper finite number:
```typescript 
isValidNumber(123); // true
isValidNumber(NaN); // false
isValidNumber(Infinity); // false
```

## Type Conversions

### toBigInt
Safely converts various inputs to BigInt:
```typescript
toBigInt(123n); // Returns BigInt
toBigInt("123"); // Converts string to BigInt
toBigInt(123); // Converts number to BigInt

// Throws ValidationError for invalid inputs:
toBigInt("12.3"); // Error: Invalid number string
toBigInt(12.3); // Error: Cannot convert non-integer
toBigInt(null); // Error: Cannot convert null to BigInt
```

## Range Validation

### validateRange
Checks if value is within specified range:
```typescript
validateRange(value, min, max);
// Throws ValidationError if outside range
```

### validatePositive
Ensures value is greater than zero:
```typescript
validatePositive(value);
// Throws ValidationError if <= 0
```

### validateNonNegative  
Ensures value is zero or greater:
```typescript
validateNonNegative(value);
// Throws ValidationError if < 0
```

## Overflow Protection

### checkAdditionOverflow
Prevents arithmetic overflow in addition:
```typescript
checkAdditionOverflow(a, b);
// Throws OverflowError if result would overflow
```

### checkMultiplicationOverflow
Prevents arithmetic overflow in multiplication:
```typescript
checkMultiplicationOverflow(a, b); 
// Throws OverflowError if result would overflow
```

### checkPowerOverflow
Prevents overflow in exponentiation:
```typescript
checkPowerOverflow(base, exponent);
// Throws OverflowError if result would overflow
```

## Data Structure Validation

### validateArrayLength
Validates array size constraints:
```typescript
validateArrayLength(length);
// Throws ValidationError if invalid
```

### validateArrayIndex  
Ensures array index is in bounds:
```typescript
validateArrayIndex(index, length);
// Throws ValidationError if out of bounds
```

### validateTreeNode
Validates tree node values:
```typescript
validateTreeNode(value);
// Throws ValidationError if invalid
```

### validateHeapProperty
Ensures heap property is maintained:
```typescript
validateHeapProperty(value, parent, comparator, isMinHeap);
// Throws ValidationError if property violated
```

## Special Function Validation

### validateAckermannInput
Validates Ackermann function parameters:
```typescript
validateAckermannInput(m, n);
// Throws ValidationError if invalid
```

## Helper Functions

### isInRange
Checks if value is within inclusive range:
```typescript
isInRange(value, min, max); // Returns boolean
```

### isPowerOfTwo
Tests if number is a power of 2:
```typescript
isPowerOfTwo(value); // Returns boolean
```

## Error Types

### ValidationError
Thrown for invalid inputs or states:
```typescript
try {
    validatePositive(-1n);
} catch (e) {
    if (e instanceof ValidationError) {
        console.log(e.message);
    }
}
```

### OverflowError 
Thrown for arithmetic overflow conditions:
```typescript
try {
    checkAdditionOverflow(MAX_SAFE_INTEGER, 1n);
} catch (e) {
    if (e instanceof OverflowError) {
        console.log(e.message);
    }
}
```