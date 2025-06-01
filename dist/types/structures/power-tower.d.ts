/**
 * Interface for power tower computation options
 */
interface PowerTowerOptions {
    maxHeight?: number;
    maxValue?: bigint;
    checkOverflow?: boolean;
    precision?: number;
}
/**
 * Class representing a power tower (tetration) computation structure
 * Handles expressions of the form: a↑↑b = a^(a^(a^...)) (b times)
 */
export declare class PowerTower {
    private readonly options;
    private head;
    private tail;
    private size;
    constructor(options?: PowerTowerOptions);
    /**
     * Creates a new power tower node
     */
    private createNode;
    /**
     * Validates power tower height
     */
    private validateHeight;
    /**
     * Validates value for computation
     */
    private validateValue;
    /**
     * Computes power with overflow checking
     */
    private computePower;
    /**
     * Builds a power tower of specified height with given base
     */
    build(base: bigint | number | string, height: number): void;
    /**
     * Evaluates the power tower up to specified height
     */
    evaluate(height?: number): bigint;
    /**
     * Gets the current height of the power tower
     */
    getHeight(): number;
    /**
     * Checks if the tower can be evaluated to a given height
     */
    isComputable(height?: number): boolean;
    /**
     * Gets the computation state at each level
     */
    getState(): {
        height: number;
        value: bigint;
        evaluated: boolean;
    }[];
    /**
     * Clears the power tower
     */
    clear(): void;
    /**
     * Gets the maximum computationally feasible height for a given base
     */
    static getMaxFeasibleHeight(base: bigint | number | string): number;
    /**
     * Creates a string representation of the power tower
     */
    toString(): string;
}
export default PowerTower;
//# sourceMappingURL=power-tower.d.ts.map