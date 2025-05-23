# BigArray Data Structure

The `BigArray<T>` is a specialized array implementation designed for handling large numbers efficiently with built-in segment tree support for range queries.

## Features

- Dynamic resizing with configurable growth factor
- Efficient range query operations using segment trees
- Support for custom comparators
- Built-in heap conversion capabilities
- In-place sorting

## Usage

### Basic Operations

```typescript
import { BigArray } from '@obinexuscomputing/hypernum';

// Create a new BigArray instance
const array = new BigArray<bigint>();

// Add elements
array.push(12345678901234567890n);
array.push(98765432109876543210n);

// Get size and capacity
const size = array.getSize();      // 2
const capacity = array.getCapacity(); // 16 (default)
```

### Initialization Options

```typescript
const options = {
    initialCapacity: 32,
    growthFactor: 1.5,
    comparator: (a: bigint, b: bigint) => a < b ? -1 : a > b ? 1 : 0
};

const array = new BigArray<bigint>(options);
```

### Range Queries

```typescript
// Query maximum value in range [start, end]
const result = array.queryRange(0, 1);
if (result.success) {
    console.log(`Maximum value: ${result.value}`);
}
```

### Conversion Methods

```typescript
// Convert to heap
const minHeap = array.toHeap(true);  // MinHeap
const maxHeap = array.toHeap(false); // MaxHeap

// Convert to native array
const nativeArray = array.toArray();
```

### Sorting

```typescript
// Sort in ascending order
array.sort(true);

// Sort in descending order
array.sort(false);
```

## Implementation Details

### Internal Structure

- `data`: Underlying array storage
- `segmentTree`: Binary tree for range queries
- `size`: Current number of elements
- `capacity`: Total allocated space
- `growthFactor`: Expansion rate for resizing
- `comparator`: Custom comparison function

### Time Complexities

| Operation     | Time Complexity |
|--------------|-----------------|
| push         | O(log n)       |
| pop          | O(log n)       |
| queryRange   | O(log n)       |
| sort         | O(n log n)     |
| toHeap       | O(n)           |
| toArray      | O(n)           |

## Error Handling

```typescript
try {
    const value = array.queryRange(-1, 100);
} catch (error) {
    if (error instanceof ValidationError) {
        console.error('Invalid range parameters');
    }
}
```

## Best Practices

1. Initialize with appropriate capacity for known data sizes
2. Use custom comparators for specialized sorting needs
3. Leverage range queries instead of iterating manually
4. Consider memory usage with very large datasets
5. Use heap conversion for priority queue operations

## Example Use Cases

```typescript
// Advanced usage example
const numbers = new BigArray<bigint>();

// Populate array
for (let i = 0; i < 1000; i++) {
    numbers.push(BigInt(i * 1000));
}

// Find maximum in first half
const maxFirstHalf = numbers.queryRange(0, 499);

// Convert to min heap for priority queue operations
const priorityQueue = numbers.toHeap(true);

// Sort in descending order
numbers.sort(false);
```

## Related Structures

- `MinHeap<T>`
- `MaxHeap<T>`
- `NumberTree`

For more information, see the [GitHub repository](https://github.com/obinexuscomputing/hypernum).