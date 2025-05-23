import { validateNonNegative, ValidationError, OverflowError } from '../utils/validation';

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
 * Interface for power tower node to track computation state
 */
interface PowerTowerNode {
  value: bigint;
  height: number;
  evaluated: boolean;
  previous: PowerTowerNode | null;
  next: PowerTowerNode | null;
}

/**
 * Default options for power tower computations
 */
const DEFAULT_OPTIONS: Required<PowerTowerOptions> = {
  maxHeight: 100,
  maxValue: BigInt(Number.MAX_SAFE_INTEGER),
  checkOverflow: true,
  precision: 0
};

/**
 * Class representing a power tower (tetration) computation structure
 * Handles expressions of the form: a↑↑b = a^(a^(a^...)) (b times)
 */
export class PowerTower {
  private readonly options: Required<PowerTowerOptions>;
  private head: PowerTowerNode | null;
  private tail: PowerTowerNode | null;
  private size: number;

  constructor(options: PowerTowerOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Creates a new power tower node
   */
  private createNode(value: bigint, height: number): PowerTowerNode {
    return {
      value,
      height,
      evaluated: false,
      previous: null,
      next: null
    };
  }

  /**
   * Validates power tower height
   */
  private validateHeight(height: number): void {
    if (height < 0) {
      throw new ValidationError('Height cannot be negative');
    }
    if (height > this.options.maxHeight) {
      throw new ValidationError(`Height exceeds maximum of ${this.options.maxHeight}`);
    }
  }

  /**
   * Validates value for computation
   */
  private validateValue(value: bigint): void {
    validateNonNegative(value);
    if (this.options.checkOverflow && value > this.options.maxValue) {
      throw new OverflowError(`Value exceeds maximum of ${this.options.maxValue}`);
    }
  }

  /**
   * Computes power with overflow checking
   */
  private computePower(base: bigint, exponent: bigint): bigint {
    if (exponent === BigInt(0)) {
      return BigInt(1);
    }
    if (exponent === BigInt(1)) {
      return base;
    }

    let result = base;
    for (let i = BigInt(1); i < exponent; i++) {
      if (this.options.checkOverflow) {
        // Check if next multiplication would overflow
        const next = result * base;
        if (next > this.options.maxValue) {
          throw new OverflowError('Power computation would overflow');
        }
        result = next;
      } else {
        result *= base;
      }
    }
    return result;
  }

  /**
   * Builds a power tower of specified height with given base
   */
  public build(base: bigint | number | string, height: number): void {
    this.validateHeight(height);
    const baseValue = typeof base === 'bigint' ? base : BigInt(base);
    this.validateValue(baseValue);

    this.clear(); // Clear existing tower

    for (let i = 0; i < height; i++) {
      const node = this.createNode(baseValue, i + 1);
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        node.previous = this.tail;
        this.tail!.next = node;
        this.tail = node;
      }
      this.size++;
    }
  }

  /**
   * Evaluates the power tower up to specified height
   */
  public evaluate(height?: number): bigint {
    if (!this.head) {
      return BigInt(1); // Empty tower evaluates to 1
    }

    const targetHeight = height ?? this.size;
    this.validateHeight(targetHeight);

    let current = this.head;
    let result = current.value;
    let currentHeight = 1;

    try {
      while (current.next && currentHeight < targetHeight) {
        result = this.computePower(current.next.value, result);
        current.evaluated = true;
        current = current.next;
        currentHeight++;
      }
      current.evaluated = true;
      return result;
    } catch (error) {
      if (error instanceof OverflowError) {
        // Mark nodes up to current height as evaluated
        let node = this.head;
        while (node !== current) {
          node.evaluated = true;
          node = node.next!;
        }
        throw error;
      }
      throw error;
    }
  }

  /**
   * Gets the current height of the power tower
   */
  public getHeight(): number {
    return this.size;
  }

  /**
   * Checks if the tower can be evaluated to a given height
   */
  public isComputable(height?: number): boolean {
    try {
      const targetHeight = height ?? this.size;
      this.validateHeight(targetHeight);
      
      // Check first few levels without full computation
      let current = this.head;
      let currentHeight = 0;
      
      while (current && currentHeight < targetHeight) {
        // Quick check for obvious overflow conditions
        if (current.value > BigInt(4) && currentHeight > 3) {
          return false;
        }
        current = current.next;
        currentHeight++;
      }
      
      // Try actual computation with a lower overflow threshold
      const safeOptions = { ...this.options, maxValue: this.options.maxValue >> BigInt(1) };
      const safeTower = new PowerTower(safeOptions);
      safeTower.build(this.head!.value, targetHeight);
      safeTower.evaluate();
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets the computation state at each level
   */
  public getState(): { height: number; value: bigint; evaluated: boolean }[] {
    const state = [];
    let current = this.head;
    
    while (current) {
      state.push({
        height: current.height,
        value: current.value,
        evaluated: current.evaluated
      });
      current = current.next;
    }
    
    return state;
  }

  /**
   * Clears the power tower
   */
  public clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Gets the maximum computationally feasible height for a given base
   */
  public static getMaxFeasibleHeight(base: bigint | number | string): number {
    const baseValue = typeof base === 'bigint' ? base : BigInt(base);
    validateNonNegative(baseValue);

    if (baseValue === BigInt(0)) return 0;
    if (baseValue === BigInt(1)) return Infinity;
    if (baseValue === BigInt(2)) return 4; // 2↑↑4 is already enormous
    if (baseValue === BigInt(3)) return 3; // 3↑↑3 is already astronomical
    if (baseValue === BigInt(4)) return 2;
    return 1; // For bases > 4, only height 1 is reliably computable
  }

  /**
   * Creates a string representation of the power tower
   */
  public toString(): string {
    if (!this.head) {
      return "Empty Tower";
    }

    let result = this.head.value.toString();
    let current = this.head;
    
    while (current.next) {
      result = `${current.next.value}^(${result})`;
      current = current.next;
    }
    
    return result;
  }
}

export default PowerTower;