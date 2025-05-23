# Parser Module Documentation

The Parser module provides utilities for parsing various numeric formats and notations in the Hypernum library.

## Supported Number Formats

The following number formats are supported:

| Format      | Description                 | Example        |
|-------------|-----------------------------|----------------|
| STANDARD    | Regular decimal notation    | `1234`        |
| SCIENTIFIC  | Scientific notation         | `1.23e4`      |
| ENGINEERING | Engineering notation        | `1.23e6`      |
| COMPACT     | Notation with suffixes      | `1.23M`       |
| FRACTION    | Fractional notation         | `1/3`         |
| PERCENTAGE  | Percentage notation         | `12.3%`       |
| HEXADECIMAL | Hexadecimal notation       | `0xFF`        |
| BINARY      | Binary notation            | `0b1010`      |
| OCTAL       | Octal notation             | `0o777`       |

## Main Functions

### `parseNumber(input: string, options?: ParseOptions): bigint`

The primary parsing function that handles all supported number formats.

```typescript
const result = parseNumber("1.23e6", {
    format: NumberFormat.SCIENTIFIC,
    precision: 2
});
```

#### Parse Options

```typescript
interface ParseOptions {
    format?: NumberFormat;       // Target format to parse
    base?: number;              // Base for number system (2, 8, 10, 16)
    allowFractions?: boolean;   // Allow fraction parsing
    rounding?: RoundingMode;    // Rounding mode for decimal conversion
    precision?: number;         // Decimal precision
    strict?: boolean;           // Strict parsing mode
}
```

### `detectNumberFormat(str: string): NumberFormat`

Automatically detects the format of a number string.

```typescript
const format = detectNumberFormat("1.23M"); // Returns NumberFormat.COMPACT
```

## Format-Specific Parsing

### Standard Notation
```typescript
parseNumber("12345"); // Returns 12345n
```

### Scientific Notation
```typescript
parseNumber("1.23e4", { format: NumberFormat.SCIENTIFIC }); // Returns 12300n
```

### Compact Notation
Supports suffixes: K (thousands), M (millions), B (billions), T (trillions), Q (quadrillions)
```typescript
parseNumber("1.23M", { format: NumberFormat.COMPACT }); // Returns 1230000n
```

### Fraction Notation
```typescript
parseNumber("1/3", { 
    format: NumberFormat.FRACTION,
    precision: 2,
    rounding: RoundingMode.HALF_EVEN 
}); // Returns 33n (0.33 scaled by 100)
```

### Base-N Notation
```typescript
// Binary
parseNumber("0b1010", { format: NumberFormat.BINARY }); // Returns 10n

// Octal
parseNumber("0o777", { format: NumberFormat.OCTAL });   // Returns 511n

// Hexadecimal
parseNumber("0xFF", { format: NumberFormat.HEXADECIMAL }); // Returns 255n
```

## Error Handling

The parser throws `ValidationError` for invalid inputs:

```typescript
try {
    parseNumber("invalid");
} catch (error) {
    // Handle parsing error
}
```

Common validation errors:
- Empty string
- Invalid format
- Invalid characters for base
- Division by zero in fractions
- Unrecognized number format

## Best Practices

1. **Format Specification**
     - Always specify the format when known for better performance
     - Use `detectNumberFormat()` only when format is unknown

2. **Precision Handling**
     - Set appropriate precision for fraction parsing
     - Consider rounding mode impact on calculations

3. **Error Handling**
     - Always wrap parsing in try-catch blocks
     - Validate input strings before parsing

4. **Performance**
     - Use strict mode for trusted input
     - Disable strict mode for user input that may need trimming

## Examples

```typescript
// Parse various formats
const examples = {
    standard: parseNumber("12345"),
    scientific: parseNumber("1.23e4", { format: NumberFormat.SCIENTIFIC }),
    compact: parseNumber("1.23M", { format: NumberFormat.COMPACT }),
    fraction: parseNumber("1/3", { 
        format: NumberFormat.FRACTION, 
        precision: 3 
    }),
    percentage: parseNumber("12.3%", { format: NumberFormat.PERCENTAGE }),
    binary: parseNumber("0b1010", { format: NumberFormat.BINARY }),
    hex: parseNumber("0xFF", { format: NumberFormat.HEXADECIMAL })
};
```