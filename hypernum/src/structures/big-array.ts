import { Comparator } from '@/core';
import { MinHeap, MaxHeap } from '../storage/Heap';

/**
 * Interface for segment tree node operations
 */
export interface SegmentTreeNode<T> {  value: T;
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
export class BigArray<T> {
  private data: T[];
  private segmentTree: Array<SegmentTreeNode<T> | null>;
  private readonly growthFactor: number;
  private readonly comparator: Comparator<T>;
  private size: number;
  private capacity: number;

  constructor(options: BigArrayOptions<T> = {}) {
    const {
      initialCapacity = 16,
      growthFactor = 2,
      comparator = ((a: T, b: T): -1 | 0 | 1 => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      }) as Comparator<T>
    } = options;

    this.capacity = initialCapacity;
    this.growthFactor = growthFactor;
    this.comparator = comparator;
    this.size = 0;
    this.data = new Array(this.capacity);
    this.segmentTree = new Array(4 * this.capacity).fill(null);
  }

  /**
   * Gets the current size of the array
   */
  public getSize(): number {
    return this.size;
  }

  /**
   * Gets the current capacity of the array
   */
  public getCapacity(): number {
    return this.capacity;
  }

  /**
   * Resizes the internal array when needed
   */
  private resize(newCapacity: number): void {
    const newData = new Array(newCapacity);
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i];
    }
    this.data = newData;
    this.capacity = newCapacity;
    this.rebuildSegmentTree();
  }

  /**
   * Appends an element to the end of the array
   */
  public push(value: T): OperationResult<number> {
    try {
      if (this.size >= this.capacity) {
        this.resize(this.capacity * this.growthFactor);
      }
      this.data[this.size] = value;
      this.updateSegmentTree(0, this.size, value);
      this.size++;
      return { success: true, value: this.size - 1 };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error during push'
      };
    }
  }

  /**
   * Removes and returns the last element
   */
  public pop(): OperationResult<T> {
    if (this.size === 0) {
      return { success: false, error: 'Array is empty' };
    }

    const value = this.data[this.size - 1];
    this.size--;
    
    // Shrink array if it's too sparse
    if (this.size < this.capacity / (this.growthFactor * 2)) {
      this.resize(Math.max(16, Math.floor(this.capacity / this.growthFactor)));
    }

    return { success: true, value };
  }

  /**
   * Gets element at specified index
   */
  public get(index: number): OperationResult<T> {
    if (index < 0 || index >= this.size) {
      return { success: false, error: 'Index out of bounds' };
    }
    return { success: true, value: this.data[index] };
  }

  /**
   * Sets element at specified index
   */
  public set(index: number, value: T): OperationResult<T> {
    if (index < 0 || index >= this.size) {
      return { success: false, error: 'Index out of bounds' };
    }
    
    const oldValue = this.data[index];
    this.data[index] = value;
    this.updateSegmentTree(0, index, value);
    
    return { success: true, value: oldValue };
  }

  /**
   * Rebuilds the segment tree after major changes
   */
  private rebuildSegmentTree(): void {
    this.segmentTree = new Array(4 * this.capacity).fill(null);
    if (this.size > 0) {
      this.buildSegmentTree(0, 0, this.size - 1);
    }
  }

  /**
   * Builds a segment tree node recursively
   */
  private buildSegmentTree(node: number, start: number, end: number): void {
    if (start === end) {
      this.segmentTree[node] = {
        value: this.data[start] as T,
        start,
        end
      };
      return;
    }

    const mid = Math.floor((start + end) / 2);
    this.buildSegmentTree(2 * node + 1, start, mid);
    this.buildSegmentTree(2 * node + 2, mid + 1, end);

    const leftNode = this.segmentTree[2 * node + 1];
    const rightNode = this.segmentTree[2 * node + 2];

    if (leftNode && rightNode) {
      this.segmentTree[node] = {
        value: this.comparator(leftNode.value, rightNode.value) >= 0 
          ? leftNode.value 
          : rightNode.value,
        start,
        end
      };
    }
  }

  /**
   * Updates the segment tree after a value change
   */
  private updateSegmentTree(node: number, index: number, value: T): void {
    if (!this.segmentTree[node]) {
      return;
    }

    const currentNode = this.segmentTree[node]!;
    if (currentNode.start === currentNode.end) {
      currentNode.value = value;
      return;
    }

    const mid = Math.floor((currentNode.start + currentNode.end) / 2);
    if (index <= mid) {
      this.updateSegmentTree(2 * node + 1, index, value);
    } else {
      this.updateSegmentTree(2 * node + 2, index, value);
    }

    const leftNode = this.segmentTree[2 * node + 1];
    const rightNode = this.segmentTree[2 * node + 2];

    if (leftNode && rightNode) {
      currentNode.value = this.comparator(leftNode.value, rightNode.value) >= 0 
        ? leftNode.value 
        : rightNode.value;
    }
  }

  /**
   * Queries the maximum value in a range
   */
  public queryRange(start: number, end: number): OperationResult<T> {
    if (start < 0 || end >= this.size || start > end) {
      return { success: false, error: 'Invalid range' };
    }

    const result = this.querySegmentTree(0, start, end);
    return result 
      ? { success: true, value: result }
      : { success: false, error: 'Range query failed' };
  }

  /**
   * Recursively queries the segment tree
   */
  private querySegmentTree(node: number, queryStart: number, queryEnd: number): T | null {
    const currentNode = this.segmentTree[node];
    if (!currentNode) {
      return null;
    }

    if (queryStart <= currentNode.start && queryEnd >= currentNode.end) {
      return currentNode.value;
    }

    if (queryEnd < currentNode.start || queryStart > currentNode.end) {
      return null;
    }

    const leftResult = this.querySegmentTree(2 * node + 1, queryStart, queryEnd);
    const rightResult = this.querySegmentTree(2 * node + 2, queryStart, queryEnd);

    if (leftResult === null) return rightResult;
    if (rightResult === null) return leftResult;

    return this.comparator(leftResult, rightResult) >= 0 ? leftResult : rightResult;
  }

  /**
   * Creates a heap from the current array
   */
  public toHeap(isMin: boolean = true): MinHeap<T> | MaxHeap<T> {
    const heap = isMin 
      ? new MinHeap<T>(this.comparator)
      : new MaxHeap<T>(this.comparator);
      
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] !== undefined) {
        if (this.data[i] !== undefined) {
          heap.push(this.data[i] as T);
        }
      }
    }
    
    return heap;
  }

  /**
   * Sorts the array in-place
   */
  public sort(ascending: boolean = true): void {
    const heap = this.toHeap(!ascending);
    for (let i = this.size - 1; i >= 0; i--) {
      const value = heap.pop();
      if (value !== undefined) {
        this.data[i] = value;
      }
    }
    this.rebuildSegmentTree();
  }

  /**
   * Returns array as native array
   */
  public toArray(): T[] {
    return this.data.slice(0, this.size);
  }
}

export default BigArray;