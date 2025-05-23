import { Hypernum, createHypernum } from '../dist/index.js';

// Create a new Hypernum instance with overflow checking disabled for large numbers
const hypernum = createHypernum({
  checkOverflow: false,
  precision: 0
});

try {
  // Basic arithmetic with smaller numbers first
  console.log('\n=== Basic Arithmetic ===');
  const a = 12345678901234567890n;
  const b = 98765432109876543210n;
  
  console.log(`a = ${a}`);
  console.log(`b = ${b}`);
  console.log(`Sum: ${hypernum.add(a, b)}`);
  console.log(`Difference: ${hypernum.subtract(a, b)}`);
  console.log(`Product: ${hypernum.multiply(a, b)}`);
  console.log(`Quotient: ${hypernum.divide(b, a)}`);

  // Bitwise operations
  console.log('\n=== Bitwise Operations ===');
  const x = 123456789n;
  const y = 987654321n;
  
  console.log(`x = ${x}`);
  console.log(`y = ${y}`);
  console.log(`Bitwise AND: ${hypernum.and(x, y)}`);
  console.log(`Bitwise OR: ${hypernum.or(x, y)}`);
  console.log(`Bitwise XOR: ${hypernum.xor(x, y)}`);
  console.log(`Bitwise NOT of x: ${hypernum.not(x)}`);

  // Power operations with reasonable numbers
  console.log('\n=== Power Operations ===');
  const base = 16n;
  console.log(`base = ${base}`);
  console.log(`Square: ${hypernum.power(base, 2n)}`);
  console.log(`Cube: ${hypernum.power(base, 3n)}`);
  console.log(`Square Root: ${hypernum.sqrt(base)}`);
  console.log(`Cube Root: ${hypernum.nthRoot(base, 3n)}`);

  // Demonstrate some special functions
  console.log('\n=== Special Functions ===');
  console.log(`GCD of 48 and 18: ${hypernum.gcd(48n, 18n)}`);
  console.log(`LCM of 48 and 18: ${hypernum.lcm(48n, 18n)}`);
  
  // Working with precision
  console.log('\n=== Precision Handling ===');
  const preciseHypernum = createHypernum({ precision: 4 });
  const divResult = preciseHypernum.divide(1n, 3n);
  console.log(`1/3 with 4 decimal precision: ${divResult}`);

} catch (error) {
  console.error('An error occurred:', error.message);
} 