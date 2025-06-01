import { Comparator } from '@/core';
import { MinHeap, MaxHeap } from '../storage/Heap';
/**
 * Interface for segment tree node operations
 */
export interface SegmentTreeNode<T> {
    value: T;
    lazy?: T;
    start: number;
    end: number;
}
/**
 * Type for BigArray operation result
 */
export type OperationResult<T> = {
    success: boolean;
    value?: T;
    error?: string;
};
/**
 * Options for BigArray initialization
 */
export interface BigArrayOptions<T> {
    initialCapacity?: number;
    growthFactor?: number;
    comparator?: Comparator<T>;
}
/**
 * A specialized array implementation for handling large numbers and providing
 * efficient operations with segment tree support
 */
export declare class BigArray<T> {
    private data;
    private segmentTree;
    private readonly growthFactor;
    private readonly comparator;
    private size;
    private capacity;
    constructor(options?: BigArrayOptions<T>);
    /**
     * Gets the current size of the array
     */
    getSize(): number;
    /**
     * Gets the current capacity of the array
     */
    getCapacity(): number;
    /**
     * Resizes the internal array when needed
     */
    private resize;
    /**
     * Appends an element to the end of the array
     */
    push(value: T): OperationResult<number>;
    /**
     * Removes and returns the last element
     */
    pop(): OperationResult<T>;
    /**
     * Gets element at specified index
     */
    get(index: number): OperationResult<T>;
    /**
     * Sets element at specified index
     */
    set(index: number, value: T): OperationResult<T>;
    /**
     * Rebuilds the segment tree after major changes
     */
    private rebuildSegmentTree;
    /**
     * Builds a segment tree node recursively
     */
    private buildSegmentTree;
    /**
     * Updates the segment tree after a value change
     */
    private updateSegmentTree;
    /**
     * Queries the maximum value in a range
     */
    queryRange(start: number, end: number): OperationResult<T>;
    /**
     * Recursively queries the segment tree
     */
    private querySegmentTree;
    /**
     * Creates a heap from the current array
     */
    toHeap(isMin?: boolean): MinHeap<T> | MaxHeap<T>;
    /**
     * Sorts the array in-place
     */
    sort(ascending?: boolean): void;
    /**
     * Returns array as native array
     */
    toArray(): T[];
}
export default BigArray;
//# sourceMappingURL=big-array.d.ts.map