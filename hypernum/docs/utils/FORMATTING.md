# Formatting Utilities Documentation

The formatting module provides utilities for converting and displaying large numbers in various notations and formats.

## Basic Usage

```typescript
import { formatBigInt } from '@obinexuscomputing/hypernum';

// Basic formatting
formatBigInt(123456789n); // "123,456,789"

// Scientific notation
formatBigInt(123456789n, { notation: 'scientific' }); // "1.23456789e8" 

// Compact notation
formatBigInt(123456789n, { notation: 'compact' }); // "123.45M"

// Engineering notation
formatBigInt(123456789n, { notation: 'engineering' }); // "123.456e6"
```

## Format Options

```typescript
interface FormatOptions {
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
    precision?: number;
    grouping?: boolean; 
    groupSize?: number;
    decimalSeparator?: string;
    groupSeparator?: string;
}
```

### Default Options
- notation: 'standard'
- precision: 0
- grouping: true
- groupSize: 3
- decimalSeparator: '.'
- groupSeparator: ','

## Supported Notations

### Standard Notation
Basic number formatting with optional grouping.
```typescript
formatBigInt(123456789n, { 
    grouping: true,
    groupSize: 3
}); // "123,456,789"
```

### Scientific Notation 
Formats numbers in scientific notation (1.23e4).
```typescript
formatBigInt(123456789n, {
    notation: 'scientific',
    precision: 3
}); // "1.234e8"
```

### Engineering Notation
Like scientific notation but exponents are multiples of 3.
```typescript
formatBigInt(123456789n, {
    notation: 'engineering',
    precision: 3
}); // "123.456e6" 
```

### Compact Notation
Uses letter suffixes (K, M, B, T, Q) for large numbers.
```typescript
formatBigInt(123456789n, {
    notation: 'compact',
    precision: 2
}); // "123.45M"
```

## Additional Functions

### parseBigIntString
Converts formatted strings back to BigInt.
```typescript
parseBigIntString("1.23M"); // 1230000n
parseBigIntString("1.23e6"); // 1230000n
```

### formatTreeValue
Formats numbers for tree structure display.
```typescript
formatTreeValue(123456789n, 2); // "  123.45M"
```

### formatRange
Formats numeric ranges.
```typescript
formatRange(1000n, 2000n); // "[1,000 ... 2,000]"
```

### formatPercentage
Formats numbers as percentages.
```typescript
formatPercentage(25n, 100n, 1); // "25.0%"
```

## Error Handling

The formatting functions will throw `ValidationError` for invalid inputs:
```typescript
try {
    formatPercentage(10n, 0n);
} catch (error) {
    // Handle validation error
}
```