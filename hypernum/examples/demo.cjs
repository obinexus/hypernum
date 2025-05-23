// Import correctly using CommonJS syntax
const { createHypernum } = require('@obinexuscomputing/hypernum');

// Create a Hypernum instance with overflow checking disabled
const hypernum = createHypernum({
    checkOverflow: false,
    precision: 0
});

// Example numbers (using BigInt notation for clarity)
const num1 = "12345678901234567890";
const num2 = "98765432109876543210";

try {
    // Basic arithmetic
    console.log("\n=== Basic Arithmetic ===");
    console.log(`Number 1: ${num1}`);
    console.log(`Number 2: ${num2}`);

    const sum = hypernum.add(num1, num2);
    console.log(`Sum: ${sum}`);

    const difference = hypernum.subtract(num1, num2);
    console.log(`Difference: ${difference}`);

    const product = hypernum.multiply(num1, num2);
    console.log(`Product: ${product}`);

    const quotient = hypernum.divide(num2, num1);
    console.log(`Quotient: ${quotient}`);

    // Bitwise operations (using smaller numbers for demonstration)
    console.log("\n=== Bitwise Operations ===");
    const x = "123456789";
    const y = "987654321";
    console.log(`x = ${x}`);
    console.log(`y = ${y}`);
    console.log(`Bitwise AND: ${hypernum.and(x, y)}`);
    console.log(`Bitwise OR: ${hypernum.or(x, y)}`);
    console.log(`Bitwise XOR: ${hypernum.xor(x, y)}`);
    console.log(`Bitwise NOT of x: ${hypernum.not(x)}`);

    // Power operations (using smaller numbers)
    console.log("\n=== Power Operations ===");
    const base = "16";
    console.log(`base = ${base}`);
    console.log(`Square: ${hypernum.power(base, "2")}`);
    console.log(`Cube: ${hypernum.power(base, "3")}`);
    console.log(`Square Root: ${hypernum.sqrt(base)}`);
    console.log(`Cube Root: ${hypernum.nthRoot(base, "3")}`);

} catch (error) {
    console.error("An error occurred:", error.message);
}