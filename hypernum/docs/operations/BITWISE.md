# Bitwise Operations

Hypernum provides comprehensive bitwise operations for handling large numbers at the bit level. All operations work with BigInt values and support string/number inputs.

## Basic Operations

### AND Operation
```typescript
const result = hypernum.and(a, b);
```
Performs bitwise AND between two numbers.

### OR Operation 
```typescript
const result = hypernum.or(a, b);
```
Performs bitwise OR between two numbers.

### XOR Operation
```typescript
const result = hypernum.xor(a, b); 
```
Performs bitwise XOR between two numbers.

### NOT Operation
```typescript
const result = hypernum.not(a);
```
Performs bitwise NOT (inversion) of a number.

## Bit Manipulation

### getBit
```typescript
const isSet = hypernum.getBit(value, position);
```
Returns boolean indicating if bit at position is set.

### setBit 
```typescript
const result = hypernum.setBit(value, position);
```
Sets bit at specified position to 1.

### clearBit
```typescript
const result = hypernum.clearBit(value, position);
```
Clears (sets to 0) bit at specified position.

### toggleBit
```typescript
const result = hypernum.toggleBit(value, position);
```
Toggles (inverts) bit at specified position.

## Bit Shifting

### Left Shift
```typescript
const result = hypernum.leftShift(value, shift);
```
Shifts bits left by specified amount.

### Right Shift
```typescript
const result = hypernum.rightShift(value, shift);
```
Shifts bits right by specified amount.

### Unsigned Right Shift
```typescript
const result = hypernum.unsignedRightShift(value, shift);
```
Shifts bits right, filling with zeros.

## Bit Analysis

### popCount
```typescript
const count = hypernum.popCount(value);
```
Returns number of set bits (1s).

### leadingZeros
```typescript
const count = hypernum.leadingZeros(value);
```
Returns number of leading zero bits.

### trailingZeros
```typescript
const count = hypernum.trailingZeros(value);
```
Returns number of trailing zero bits.

## Configuration

Bitwise operations accept optional configuration:

```typescript
interface BitwiseOptions {
    maxBits?: number;    // Maximum bits (default: 1024)
    strict?: boolean;    // Throw on overflow (default: true)
}
```

Example with options:
```typescript
const result = hypernum.leftShift(value, 5, {
    maxBits: 2048,
    strict: false
});
```