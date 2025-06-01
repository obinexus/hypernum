
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
abstract class Heap<T> {
  protected heap: T[];
  protected readonly compare: Comparator<T>;

  constructor(comparator: Comparator<T>) {
    this.heap = [];
    this.compare = comparator;
  }

  /**
   * Gets the size of the heap
   */
  public size(): number {
    return this.heap.length;
  }

  /**
   * Checks if the heap is empty
   */
  public isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Peeks at the root element without removing it
   */
  public peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * Inserts a new element into the heap
   */
  public push(value: T): void {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  /**
   * Removes and returns the root element
   */
  public pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const root = this.heap[0];
    const last = this.heap.pop()!;

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.siftDown(0);
    }

    return root;
  }

  /**
   * Removes all elements from the heap
   */
  public clear(): void {
    this.heap = [];
  }

  /**
   * Creates a heap from an array of elements
   */
  public static heapify<T extends {}>(array: T[], comparator: Comparator<T>): Heap<T> {
    const heap = this instanceof MinHeap ? new MinHeap(comparator) : new MaxHeap(comparator);
    array.forEach(item => heap.push(item));
    return heap;
  }

  /**
   * Gets the parent index of a node
   */
  protected getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Gets the left child index of a node
   */
  protected getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  /**
   * Gets the right child index of a node
   */
  protected getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  /**
   * Swaps two elements in the heap
   */
  protected swap(i: number, j: number): void {
    const temp = this.heap[i]!;
    this.heap[i] = this.heap[j]!;
    this.heap[j] = temp;
  }

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
export class MinHeap<T> extends Heap<T> {
  constructor(comparator: Comparator<T>) {
    super(comparator);
  }

  protected siftUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.compare(this.heap[index]!, this.heap[parentIndex]!) >= 0) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  protected siftDown(index: number): void {
    const size = this.heap.length;
    
    while (true) {
      let smallest = index;
      const left = this.getLeftChildIndex(index);
      const right = this.getRightChildIndex(index);

      if (left < size && this.compare(this.heap[left]!, this.heap[smallest]!) < 0) {
        smallest = left;
      }

      if (right < size && this.heap[right] !== undefined && this.compare(this.heap[right] as T, this.heap[smallest] as T) < 0) {
        smallest = right;
      }

      if (smallest === index) {
        break;
      }

      this.swap(index, smallest);
      index = smallest;
    }
  }
}

/**
 * MaxHeap implementation where the root is the largest element
 */
export class MaxHeap<T> extends Heap<T> {
  constructor(comparator: Comparator<T>) {
    super(comparator);
  }

  protected siftUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.compare(this.heap[index]!, this.heap[parentIndex]!) <= 0) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  protected siftDown(index: number): void {
    const size = this.heap.length;
    
    while (true) {
      let largest = index;
      const left = this.getLeftChildIndex(index);
      const right = this.getRightChildIndex(index);

      if (left < size && this.heap[left] !== undefined && this.compare(this.heap[left]!, this.heap[largest]!) > 0) {
        largest = left;
      }

      if (right < size && this.heap[right] !== undefined && this.compare(this.heap[right]!, this.heap[largest]!) > 0) {
        largest = right;
      }

      if (largest === index) {
        break;
      }

      this.swap(index, largest);
      index = largest;
    }
  }
}

// Type Guards
export const isMinHeap = <T>(heap: Heap<T>): heap is MinHeap<T> => {
  return heap instanceof MinHeap;
};

export const isMaxHeap = <T>(heap: Heap<T>): heap is MaxHeap<T> => {
  return heap instanceof MaxHeap;
};

/**
 * Custom comparator for large numbers
 */
export function createLargeNumberComparator(): (a: bigint, b: bigint) => number {
  return (a, b) => {
    return a > b ? 1 : a < b ? -1 : 0;
  };
}