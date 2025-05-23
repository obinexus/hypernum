/**
 * Interface representing an Ackermann node in the computation structure
 */
interface IAckermannNode {
    m: number;
    n: number;
    value: bigint;
    prevM?: IAckermannNode;
    prevN?: IAckermannNode;
    nextM?: IAckermannNode;
    nextN?: IAckermannNode;
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
export declare class AckermannStructure {
    private nodes;
    private maxComputedM;
    private maxComputedN;
    private heap;
    constructor();
    /**
     * Generates a unique key for node storage
     */
    private static getNodeKey;
    /**
     * Computes the Ackermann function value
     * Uses recursion with memoization
     */
    private computeAckermann;
    /**
     * Adds a new node to the structure
     */
    addNode(m: number, n: number): IAckermannNode;
    /**
     * Builds nodes for a range of m and n values
     */
    buildRange(mRange: number, nRange: number): void;
    /**
     * Gets the computation path to reach A(m,n)
     */
    getComputationPath(m: number, n: number): ComputationStep[];
    /**
     * Analyzes growth rate for a fixed m value
     */
    analyzeGrowthRate(m: number): Map<number, GrowthAnalysis>;
    /**
     * Gets the largest computed value
     */
    getLargestValue(): bigint;
    /**
     * Gets a specific Ackermann value if it exists
     */
    getValue(m: number, n: number): bigint | undefined;
}
export default AckermannStructure;
//# sourceMappingURL=ackermann.d.ts.map