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
class NumberNode {
  value: bigint;
  left: NumberNode | null;
  right: NumberNode | null;
  parent: NumberNode | null;
  height: number;
  size: number;
  sum: bigint;

  constructor(value: bigint | string | number) {
    this.value = typeof value === 'bigint' ? value : BigInt(value);
    this.left = null;
    this.right = null;
    this.parent = null;
    this.height = 1;
    this.size = 1;
    this.sum = this.value;
  }

  /**
   * Updates node statistics based on children
   */
  updateStats(): void {
    this.height = 1 + Math.max(
      this.left?.height ?? 0,
      this.right?.height ?? 0
    );
    this.size = 1 + (this.left?.size ?? 0) + (this.right?.size ?? 0);
    this.sum = this.value + 
      (this.left?.sum ?? BigInt(0)) + 
      (this.right?.sum ?? BigInt(0));
  }

  /**
   * Gets balance factor of the node
   */
  getBalance(): number {
    return (this.left?.height ?? 0) - (this.right?.height ?? 0);
  }

  /**
   * Gets complete statistics for the node and its subtree
   */
  getStats(): NodeStats {
    return {
      height: this.height,
      size: this.size,
      sum: this.sum,
      min: this.findMin().value,
      max: this.findMax().value
    };
  }

  /**
   * Finds minimum value node in the subtree
   */
  findMin(): NumberNode {
    let current: NumberNode = this;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  /**
   * Finds maximum value node in the subtree
   */
  findMax(): NumberNode {
    let current: NumberNode = this;
    while (current.right) {
      current = current.right;
    }
    return current;
  }
}

/**
 * AVL Tree implementation specialized for handling large numbers
 */
export class NumberTree {
  private root: NumberNode | null;
  private readonly comparator: Comparator<bigint>;

  constructor(comparator?: Comparator<bigint>) {
    this.root = null;
    this.comparator = comparator ?? ((a: bigint, b: bigint): -1 | 0 | 1 => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  /**
   * Gets the root node if it exists
   */
  public getRoot(): NumberNode | null {
    return this.root;
  }

  /**
   * Inserts a new value into the tree
   */
  public insert(value: bigint | string | number): NumberNode {
    const newValue = typeof value === 'bigint' ? value : BigInt(value);
    this.root = this.insertNode(this.root, newValue);
    return this.find(newValue)!;
  }

  /**
   * Recursively inserts a new node
   */
  private insertNode(node: NumberNode | null, value: bigint): NumberNode {
    if (!node) {
      return new NumberNode(value);
    }

    const compareResult = this.comparator(value, node.value);
    if (compareResult < 0) {
      node.left = this.insertNode(node.left, value);
      node.left.parent = node;
    } else if (compareResult > 0) {
      node.right = this.insertNode(node.right, value);
      node.right.parent = node;
    } else {
      return node; // Duplicate value, return existing node
    }

    node.updateStats();
    return this.balance(node);
  }

  /**
   * Balances a node using AVL rotations
   */
  private balance(node: NumberNode): NumberNode {
    const balance = node.getBalance();

    // Left heavy
    if (balance > 1) {
      if (node.left && node.left.getBalance() < 0) {
        node.left = this.rotateLeft(node.left);
      }
      return this.rotateRight(node);
    }

    // Right heavy
    if (balance < -1) {
      if (node.right && node.right.getBalance() > 0) {
        node.right = this.rotateRight(node.right);
      }
      return this.rotateLeft(node);
    }

    return node;
  }

  /**
   * Performs left rotation
   */
  private rotateLeft(node: NumberNode): NumberNode {
    const rightChild = node.right!;
    const rightLeftChild = rightChild.left;

    rightChild.left = node;
    node.right = rightLeftChild;

    if (rightLeftChild) {
      rightLeftChild.parent = node;
    }
    rightChild.parent = node.parent;
    node.parent = rightChild;

    node.updateStats();
    rightChild.updateStats();

    return rightChild;
  }

  /**
   * Performs right rotation
   */
  private rotateRight(node: NumberNode): NumberNode {
    const leftChild = node.left!;
    const leftRightChild = leftChild.right;

    leftChild.right = node;
    node.left = leftRightChild;

    if (leftRightChild) {
      leftRightChild.parent = node;
    }
    leftChild.parent = node.parent;
    node.parent = leftChild;

    node.updateStats();
    leftChild.updateStats();

    return leftChild;
  }

  /**
   * Removes a value from the tree
   */
  public remove(value: bigint | string | number): boolean {
    const searchValue = typeof value === 'bigint' ? value : BigInt(value);
    const nodeToRemove = this.find(searchValue);
    
    if (!nodeToRemove) {
      return false;
    }

    this.root = this.removeNode(this.root, searchValue);
    return true;
  }

  /**
   * Recursively removes a node
   */
  private removeNode(node: NumberNode | null, value: bigint): NumberNode | null {
    if (!node) {
      return null;
    }

    const compareResult = this.comparator(value, node.value);
    if (compareResult < 0) {
      node.left = this.removeNode(node.left, value);
      if (node.left) {
        node.left.parent = node;
      }
    } else if (compareResult > 0) {
      node.right = this.removeNode(node.right, value);
      if (node.right) {
        node.right.parent = node;
      }
    } else {
      // Node to delete found
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      // Node has two children
      const successor = node.right.findMin();
      node.value = successor.value;
      node.right = this.removeNode(node.right, successor.value);
      if (node.right) {
        node.right.parent = node;
      }
    }

    node.updateStats();
    return this.balance(node);
  }

  /**
   * Finds a node by value
   */
  public find(value: bigint | string | number): NumberNode | null {
    const searchValue = typeof value === 'bigint' ? value : BigInt(value);
    let current = this.root;

    while (current) {
      const compareResult = this.comparator(searchValue, current.value);
      if (compareResult === 0) {
        return current;
      }
      current = compareResult < 0 ? current.left : current.right;
    }

    return null;
  }

  /**
   * Traverses the tree in specified order and returns values
   */
  public traverse(order: 'inOrder' | 'preOrder' | 'postOrder' = 'inOrder', 
                 config: TraversalConfig = {}): bigint[] {
    const result: bigint[] = [];
    
    const traverse = (node: NumberNode | null, depth: number = 0): void => {
      if (!node || (config.maxDepth !== undefined && depth >= config.maxDepth)) {
        return;
      }

      if (order === 'preOrder') {
        result.push(node.value);
      }

      if (!config.skipSubtrees) {
        traverse(node.left, depth + 1);
      }

      if (order === 'inOrder') {
        result.push(node.value);
      }

      if (!config.skipSubtrees) {
        traverse(node.right, depth + 1);
      }

      if (order === 'postOrder') {
        result.push(node.value);
      }
    };

    traverse(this.root);
    return result;
  }

  /**
   * Gets overall tree statistics
   */
  public getTreeStats(): NodeStats | null {
    return this.root?.getStats() ?? null;
  }

  /**
   * Gets the nth smallest value in the tree
   */
  public getNthValue(n: number): bigint | null {
    if (!this.root || n < 1 || n > this.root.size) {
      return null;
    }

    const findNth = (node: NumberNode | null, position: number): bigint | null => {
      if (!node) {
        return null;
      }

      const leftSize = node.left?.size ?? 0;
      
      if (position === leftSize + 1) {
        return node.value;
      }
      
      if (position <= leftSize) {
        return findNth(node.left, position);
      }
      
      return findNth(node.right, position - leftSize - 1);
    };

    return findNth(this.root, n);
  }

  /**
   * Gets a range of values between start and end (inclusive)
   */
  public getRange(start: bigint | string | number, 
                 end: bigint | string | number): bigint[] {
    const startValue = typeof start === 'bigint' ? start : BigInt(start);
    const endValue = typeof end === 'bigint' ? end : BigInt(end);
    const result: bigint[] = [];

    const collectRange = (node: NumberNode | null): void => {
      if (!node) {
        return;
      }

      if (this.comparator(node.value, startValue) >= 0 && 
          this.comparator(node.value, endValue) <= 0) {
        collectRange(node.left);
        result.push(node.value);
        collectRange(node.right);
      } else if (this.comparator(node.value, startValue) > 0) {
        collectRange(node.left);
      } else {
        collectRange(node.right);
      }
    };

    collectRange(this.root);
    return result;
  }
}

export default NumberTree;