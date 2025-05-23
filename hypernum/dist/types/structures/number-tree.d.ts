import { Comparator } from "@/core";
/**
 * Interface for tree node statistics
 */
interface NodeStats {
    height: number;
    size: number;
    sum: bigint;
    min: bigint;
    max: bigint;
}
/**
 * Interface for tree traversal configuration
 */
interface TraversalConfig {
    includeStats?: boolean;
    skipSubtrees?: boolean;
    maxDepth?: number;
}
/**
 * Class representing a node in the number tree
 */
declare class NumberNode {
    value: bigint;
    left: NumberNode | null;
    right: NumberNode | null;
    parent: NumberNode | null;
    height: number;
    size: number;
    sum: bigint;
    constructor(value: bigint | string | number);
    /**
     * Updates node statistics based on children
     */
    updateStats(): void;
    /**
     * Gets balance factor of the node
     */
    getBalance(): number;
    /**
     * Gets complete statistics for the node and its subtree
     */
    getStats(): NodeStats;
    /**
     * Finds minimum value node in the subtree
     */
    findMin(): NumberNode;
    /**
     * Finds maximum value node in the subtree
     */
    findMax(): NumberNode;
}
/**
 * AVL Tree implementation specialized for handling large numbers
 */
export declare class NumberTree {
    private root;
    private readonly comparator;
    constructor(comparator?: Comparator<bigint>);
    /**
     * Gets the root node if it exists
     */
    getRoot(): NumberNode | null;
    /**
     * Inserts a new value into the tree
     */
    insert(value: bigint | string | number): NumberNode;
    /**
     * Recursively inserts a new node
     */
    private insertNode;
    /**
     * Balances a node using AVL rotations
     */
    private balance;
    /**
     * Performs left rotation
     */
    private rotateLeft;
    /**
     * Performs right rotation
     */
    private rotateRight;
    /**
     * Removes a value from the tree
     */
    remove(value: bigint | string | number): boolean;
    /**
     * Recursively removes a node
     */
    private removeNode;
    /**
     * Finds a node by value
     */
    find(value: bigint | string | number): NumberNode | null;
    /**
     * Traverses the tree in specified order and returns values
     */
    traverse(order?: 'inOrder' | 'preOrder' | 'postOrder', config?: TraversalConfig): bigint[];
    /**
     * Gets overall tree statistics
     */
    getTreeStats(): NodeStats | null;
    /**
     * Gets the nth smallest value in the tree
     */
    getNthValue(n: number): bigint | null;
    /**
     * Gets a range of values between start and end (inclusive)
     */
    getRange(start: bigint | string | number, end: bigint | string | number): bigint[];
}
export default NumberTree;
//# sourceMappingURL=number-tree.d.ts.map