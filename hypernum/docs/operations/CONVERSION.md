# Conversion Operations

This module provides functions for converting numbers between different formats and bases. It supports various number representations including binary, octal, hexadecimal, scientific notation, fractions, and Roman numerals.

## Basic Usage

```typescript
import { 
    toBinary,
    toHexadecimal,
    toRoman,
    fromRoman,
    toScientific,
    fromScientific
} from '@obinexuscomputing/hypernum';

// Basic conversions
const binary = toBinary(123456789n);        // "111010110111100110100010101"
const hex = toHexadecimal(123456789n);      // "75bcd15"
const roman = toRoman(3549);                // "MMMDXLIX"
const number = fromRoman("MMMDXLIX");       // 3549n
const scientific = toScientific(123456789n); // "1.23456789e8"
```

## Configuration Options

All conversion functions accept an optional configuration object:

```typescript
interface ConversionOptions {
    precision?: number;        // Decimal precision for operations
    roundingMode?: RoundingMode; // Rounding mode for decimal operations
    uppercase?: boolean;       // Use uppercase for hex/base-N output
    prefix?: boolean;         // Add prefix for base-N output (0x, 0b, etc.)
    minDigits?: number;       // Minimum number of digits (pad with zeros)
}
```

## Base Conversion Functions

### toBinary(value, options?)
Converts a number to binary string representation.

```typescript
const bin1 = toBinary(42n);              // "101010"
const bin2 = toBinary(42n, { prefix: true }); // "0b101010"
const bin3 = toBinary(42n, { minDigits: 8 }); // "00101010"
```

### toOctal(value, options?)
Converts a number to octal string representation.

```typescript
const oct1 = toOctal(42n);              // "52"
const oct2 = toOctal(42n, { prefix: true }); // "0o52"
```

### toHexadecimal(value, options?)
Converts a number to hexadecimal string representation.

```typescript
const hex1 = toHexadecimal(255n);                    // "ff"
const hex2 = toHexadecimal(255n, { uppercase: true }); // "FF"
const hex3 = toHexadecimal(255n, { prefix: true });    // "0xff"
```

### toBase(value, base, options?)
Converts a number to a string in any specified base (2-36).

```typescript
const base16 = toBase(255n, 16);  // "ff"
const base32 = toBase(255n, 32);  // "7v"
```

### fromBase(value, base)
Converts a string from specified base to bigint.

```typescript
const num1 = fromBase("ff", 16);    // 255n
const num2 = fromBase("0xff", 16);  // 255n (handles prefixes)
```

## Scientific Notation

### toScientific(value, options?)
Converts a number to scientific notation.

```typescript
const sci1 = toScientific(123456789n);                   // "1e8"
const sci2 = toScientific(123456789n, { precision: 3 }); // "1.234e8"
```

### fromScientific(value)
Converts scientific notation to decimal string.

```typescript
const num1 = fromScientific("1.234e8");  // "123400000"
const num2 = fromScientific("1.234e-2"); // "0.01234"
```

## Fraction Conversion

### toFraction(value)
Converts a decimal string to a fraction representation.

```typescript
const [num, den] = toFraction("1.25"); // [5n, 4n]
```

### fromFraction(numerator, denominator, options?)
Converts a fraction to decimal string with specified precision.

```typescript
const dec1 = fromFraction(5n, 4n);                     // "1.25"
const dec2 = fromFraction(1n, 3n, { precision: 4 });   // "0.3333"
```

## Roman Numerals

### toRoman(value, options?)
Converts a number to Roman numeral representation.

```typescript
const rom1 = toRoman(3549);                     // "MMMDXLIX"
const rom2 = toRoman(3549, { uppercase: false }); // "mmmdxlix"
```

### fromRoman(value)
Converts Roman numeral to number.

```typescript
const num1 = fromRoman("MMMDXLIX");  // 3549n
const num2 = fromRoman("mmmdxlix");  // 3549n (case insensitive)
```

## Error Handling

All conversion functions will throw `ValidationError` for invalid inputs:

```typescript
try {
    const invalid = toRoman(5000); // Error: Number must be between 1 and 3999
} catch (error) {
    console.error(error.message);
}
```

## Type Safety

The module provides full TypeScript support with proper type definitions for all functions and options.

```typescript
import type { ConversionOptions } from '@obinexuscomputing/hypernum';

const options: ConversionOptions = {
    precision: 2,
    uppercase: true,
    prefix: true
};
```