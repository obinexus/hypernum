/**
 * Bitwise operations module for Hypernum library
 * Provides functions for bit-level manipulations of large numbers
 */
/**
 * Options for bitwise operations
 */
export interface BitwiseOptions {
    /** Maximum bits to consider in operations */
    maxBits?: number;
    /** Whether to throw on overflow */
    strict?: boolean;
}
/**
 * Performs bitwise AND operation
 */
export declare function and(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Performs bitwise OR operation
 */
export declare function or(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Performs bitwise XOR operation
 */
export declare function xor(a: bigint | string | number, b: bigint | string | number): bigint;
/**
 * Performs bitwise NOT operation
 */
export declare function not(value: bigint | string | number): bigint;
/**
 * Performs left shift operation
 */
export declare function leftShift(value: bigint | string | number, shift: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Performs right shift operation
 */
export declare function rightShift(value: bigint | string | number, shift: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Performs unsigned right shift operation
 * Note: BigInt doesn't have >>> operator, so we implement it manually
 */
export declare function unsignedRightShift(value: bigint | string | number, shift: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Rotates bits left by specified amount
 */
export declare function rotateLeft(value: bigint | string | number, rotation: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Rotates bits right by specified amount
 */
export declare function rotateRight(value: bigint | string | number, rotation: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Counts number of set bits (1s)
 */
export declare function popCount(value: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Returns number of trailing zero bits
 */
export declare function trailingZeros(value: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Returns number of leading zero bits
 */
export declare function leadingZeros(value: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Returns bit at specified position
 */
export declare function getBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): boolean;
/**
 * Sets bit at specified position
 */
export declare function setBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Clears bit at specified position
 */
export declare function clearBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): bigint;
/**
 * Toggles bit at specified position
 */
export declare function toggleBit(value: bigint | string | number, position: bigint | string | number, options?: BitwiseOptions): bigint;
declare const _default: {
    and: typeof and;
    or: typeof or;
    xor: typeof xor;
    not: typeof not;
    leftShift: typeof leftShift;
    rightShift: typeof rightShift;
    unsignedRightShift: typeof unsignedRightShift;
    rotateLeft: typeof rotateLeft;
    rotateRight: typeof rotateRight;
    popCount: typeof popCount;
    trailingZeros: typeof trailingZeros;
    leadingZeros: typeof leadingZeros;
    getBit: typeof getBit;
    setBit: typeof setBit;
    clearBit: typeof clearBit;
    toggleBit: typeof toggleBit;
};
export default _default;
//# sourceMappingURL=bitwise.d.ts.map