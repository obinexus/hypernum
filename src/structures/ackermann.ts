import { Comparator } from "..";
import { MaxHeap, createLargeNumberComparator } from "../storage/Heap";

  /**
   * Interface representing an Ackermann node in the computation structure
   */
  interface IAckermannNode {
    m: number;
    n: number;
    value: bigint;
    prevM?: IAckermannNode;  // Link to A(m-1, n)
    prevN?: IAckermannNode;  // Link to A(m, n-1)
    nextM?: IAckermannNode;  // Link to A(m+1, n)
    nextN?: IAckermannNode;  // Link to A(m, n+1)
  }
  
  /**
   * Type for Ackermann computation path step
   */
  type ComputationStep = {
    m: number;
    n: number;
    value: bigint;
  };
  
  /**
   * Type for growth rate analysis
   */
  type GrowthAnalysis = {
    value: bigint;
    increase: bigint;
    multiplier: bigint;
  };
  
  /**
   * Class representing the Ackermann function computation structure
   * Implements caching and relationship tracking between values
   */
  export class AckermannStructure {
    private nodes: Map<string, IAckermannNode>;
    private maxComputedM: number;
    private maxComputedN: number;
    private heap: MaxHeap<bigint>;
  
    constructor() {
      this.nodes = new Map();
      this.maxComputedM = -1;
      this.maxComputedN = -1;
      this.heap = new MaxHeap<bigint>(createLargeNumberComparator() as Comparator<bigint>);
    }
  
    /**
     * Generates a unique key for node storage
     */
    private static getNodeKey(m: number, n: number): string {
      return `${m},${n}`;
    }
  
    /**
     * Computes the Ackermann function value
     * Uses recursion with memoization
     */
    private computeAckermann(m: number, n: number): bigint {
      // Handle invalid inputs
      if (m < 0 || n < 0) {
        throw new Error('Ackermann function undefined for negative numbers');
      }
  
      // Check if already computed
      const key = AckermannStructure.getNodeKey(m, n);
      const existing = this.nodes.get(key);
      if (existing) {
        return existing.value;
      }
  
      // Compute based on Ackermann function definition
      let value: bigint;
      try {
        if (m === 0) {
          value = BigInt(n + 1);
        } else if (n === 0) {
          value = this.computeAckermann(m - 1, 1);
        } else {
          const inner = this.computeAckermann(m, n - 1);
          // Convert bigint to number for recursion, being careful about size
          const innerNum = inner <= BigInt(Number.MAX_SAFE_INTEGER) 
            ? Number(inner) 
            : Number.MAX_SAFE_INTEGER;
          value = this.computeAckermann(m - 1, innerNum);
        }
      } catch (error) {
        // Handle stack overflow or computation limits
        if (error instanceof RangeError) {
          return BigInt(Number.MAX_SAFE_INTEGER);
        }
        throw error;
      }
  
      return value;
    }
  
    /**
     * Adds a new node to the structure
     */
    public addNode(m: number, n: number): IAckermannNode {
      const key = AckermannStructure.getNodeKey(m, n);
      if (this.nodes.has(key)) {
        return this.nodes.get(key)!;
      }
  
      // Create new node
      const value = this.computeAckermann(m, n);
      const node: IAckermannNode = { m, n, value };
      this.nodes.set(key, node);
  
      // Link to existing nodes
      const prevMKey = AckermannStructure.getNodeKey(m - 1, n);
      const prevNKey = AckermannStructure.getNodeKey(m, n - 1);
  
      if (this.nodes.has(prevMKey)) {
        const prevM = this.nodes.get(prevMKey)!;
        node.prevM = prevM;
        prevM.nextM = node;
      }
  
      if (this.nodes.has(prevNKey)) {
        const prevN = this.nodes.get(prevNKey)!;
        node.prevN = prevN;
        prevN.nextN = node;
      }
  
      // Update tracking
      this.maxComputedM = Math.max(this.maxComputedM, m);
      this.maxComputedN = Math.max(this.maxComputedN, n);
      this.heap.push(value);
  
      return node;
    }
  
    /**
     * Builds nodes for a range of m and n values
     */
    public buildRange(mRange: number, nRange: number): void {
      for (let m = 0; m <= mRange; m++) {
        for (let n = 0; n <= nRange; n++) {
          this.addNode(m, n);
        }
      }
    }
  
    /**
     * Gets the computation path to reach A(m,n)
     */
    public getComputationPath(m: number, n: number): ComputationStep[] {
      const path: ComputationStep[] = [];
      const key = AckermannStructure.getNodeKey(m, n);
      let current = this.nodes.get(key);
  
      while (current) {
        path.push({
          m: current.m,
          n: current.n,
          value: current.value
        });
  
        // Follow computation path backwards
        if (current.m === 0) {
          break;
        } else if (current.n === 0) {
          current = this.nodes.get(AckermannStructure.getNodeKey(current.m - 1, 1));
        } else {
          const prevN = this.nodes.get(AckermannStructure.getNodeKey(current.m, current.n - 1));
          if (prevN) {
            path.push({
              m: prevN.m,
              n: prevN.n,
              value: prevN.value
            });
          }
          // Convert bigint to number safely for the next lookup
          const nextValue = prevN?.value ?? BigInt(0);
          const safeNextValue = nextValue <= BigInt(Number.MAX_SAFE_INTEGER)
            ? Number(nextValue)
            : Number.MAX_SAFE_INTEGER;
          current = this.nodes.get(AckermannStructure.getNodeKey(current.m - 1, safeNextValue));
        }
      }
  
      return path.reverse();
    }
  
    /**
     * Analyzes growth rate for a fixed m value
     */
    public analyzeGrowthRate(m: number): Map<number, GrowthAnalysis> {
      const growth = new Map<number, GrowthAnalysis>();
      let prevValue = BigInt(1);
  
      for (let n = 0; n <= this.maxComputedN; n++) {
        const key = AckermannStructure.getNodeKey(m, n);
        const node = this.nodes.get(key);
        if (!node || node.value >= BigInt(Number.MAX_SAFE_INTEGER)) {
          break;
        }
  
        growth.set(n, {
          value: node.value,
          increase: node.value - prevValue,
          multiplier: prevValue === BigInt(0) ? BigInt(0) : node.value / prevValue
        });
  
        prevValue = node.value;
      }
  
      return growth;
    }
  
    /**
     * Gets the largest computed value
     */
    public getLargestValue(): bigint {
      return this.heap.peek() ?? BigInt(0);
    }
  
    /**
     * Gets a specific Ackermann value if it exists
     */
    public getValue(m: number, n: number): bigint | undefined {
      return this.nodes.get(AckermannStructure.getNodeKey(m, n))?.value;
    }
  }
  
  export default AckermannStructure;