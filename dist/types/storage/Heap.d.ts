/**
 * Represents the result of a comparison operation
 * -1: first value is less than second value
 *  0: values are equal
 *  1: first value is greater than second value
 */
export type ComparisonResult = -1 | 0 | 1;
/**
 * Generic comparator function type for heap elements
 */
export type Comparator<T> = (a: T, b: T) => ComparisonResult;
/**
 * Abstract base heap class implementing common heap operations
 */
declare abstract class Heap<T> {
    protected heap: T[];
    protected readonly compare: Comparator<T>;
    constructor(comparator: Comparator<T>);
    /**
     * Gets the size of the heap
     */
    size(): number;
    /**
     * Checks if the heap is empty
     */
    isEmpty(): boolean;
    /**
     * Peeks at the root element without removing it
     */
    peek(): T | undefined;
    /**
     * Inserts a new element into the heap
     */
    push(value: T): void;
    /**
     * Removes and returns the root element
     */
    pop(): T | undefined;
    /**
     * Removes all elements from the heap
     */
    clear(): void;
    /**
     * Creates a heap from an array of elements
     */
    static heapify<T extends {}>(array: T[], comparator: Comparator<T>): Heap<T>;
    /**
     * Gets the parent index of a node
     */
    protected getParentIndex(index: number): number;
    /**
     * Gets the left child index of a node
     */
    protected getLeftChildIndex(index: number): number;
    /**
     * Gets the right child index of a node
     */
    protected getRightChildIndex(index: number): number;
    /**
     * Swaps two elements in the heap
     */
    protected swap(i: number, j: number): void;
    /**
     * Moves an element up the heap until heap property is satisfied
     */
    protected abstract siftUp(index: number): void;
    /**
     * Moves an element down the heap until heap property is satisfied
     */
    protected abstract siftDown(index: number): void;
}
/**
 * MinHeap implementation where the root is the smallest element
 */
export declare class MinHeap<T> extends Heap<T> {
    constructor(comparator: Comparator<T>);
    protected siftUp(index: number): void;
    protected siftDown(index: number): void;
}
/**
 * MaxHeap implementation where the root is the largest element
 */
export declare class MaxHeap<T> extends Heap<T> {
    constructor(comparator: Comparator<T>);
    protected siftUp(index: number): void;
    protected siftDown(index: number): void;
}
export declare const isMinHeap: <T>(heap: Heap<T>) => heap is MinHeap<T>;
export declare const isMaxHeap: <T>(heap: Heap<T>) => heap is MaxHeap<T>;
/**
 * Custom comparator for large numbers
 */
export declare function createLargeNumberComparator(): (a: bigint, b: bigint) => number;
export {};
//# sourceMappingURL=Heap.d.ts.map