const { createHypernum } = require('@obinexuscomputing/hypernum');
const fs = require('fs');
const path = require('path');

// Import the Hypernum library and file system module

// Load configuration from hypernum.json
const loadConfig = () => {
    try {
        const configPath = path.join(__dirname, 'hypernum.json');
        const configData = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(configData);
    } catch (error) {
        console.error('Error loading config:', error.message);
        return null;
    }
};

// Main function to demonstrate Hypernum with configuration
const demonstrateHypernum = () => {
    // Load configuration
    const config = loadConfig() || {
        precision: 50,
        roundingMode: 'HALF_EVEN',
        checkOverflow: false,
        maxSteps: 1000,
        debug: false
    };

    // Create Hypernum instance with loaded configuration
    const hypernum = createHypernum(config);

    try {
        console.log('=== Hypernum Configuration Demo ===');
        console.log('Current Configuration:', hypernum.getConfig());

        // Large number arithmetic demonstrations
        console.log('\n=== Basic Arithmetic with Large Numbers ===');
        const num1 = '12345678901234567890';
        const num2 = '98765432109876543210';
        
        console.log(`Number 1: ${num1}`);
        console.log(`Number 2: ${num2}`);
        console.log(`Addition: ${hypernum.add(num1, num2)}`);
        console.log(`Subtraction: ${hypernum.subtract(num1, num2)}`);
        console.log(`Multiplication: ${hypernum.multiply(num1, num2)}`);
        console.log(`Division: ${hypernum.divide(num2, num1)}`);

        // Precision-sensitive operations
        console.log('\n=== Precision-Sensitive Operations ===');
        const precisionExample = hypernum.divide('10', '3');
        console.log(`10/3 with ${config.precision} decimal precision: ${precisionExample}`);

        // Power operations
        console.log('\n=== Power Operations ===');
        const base = '16';
        const exp = '4';
        console.log(`Power: ${base}^${exp} = ${hypernum.power(base, exp)}`);
        console.log(`Square Root of ${base}: ${hypernum.sqrt(base)}`);
        console.log(`Cube Root of ${base}: ${hypernum.nthRoot(base, '3')}`);

        // Bitwise operations
        console.log('\n=== Bitwise Operations ===');
        const x = '123456789';
        const y = '987654321';
        console.log(`Bitwise AND of ${x} & ${y}: ${hypernum.and(x, y)}`);
        console.log(`Bitwise OR of ${x} | ${y}: ${hypernum.or(x, y)}`);
        console.log(`Bitwise XOR of ${x} ^ ${y}: ${hypernum.xor(x, y)}`);
        console.log(`Bitwise NOT of ${x}: ${hypernum.not(x)}`);

        // Special mathematical functions
        console.log('\n=== Special Mathematical Functions ===');
        const a = '48';
        const b = '18';
        console.log(`GCD of ${a} and ${b}: ${hypernum.gcd(a, b)}`);
        console.log(`LCM of ${a} and ${b}: ${hypernum.lcm(a, b)}`);

        // Configuration update demonstration
        console.log('\n=== Configuration Update Demo ===');
        hypernum.updateConfig({ precision: 5 });
        console.log('Updated Configuration:', hypernum.getConfig());
        console.log(`10/3 with new precision: ${hypernum.divide('10', '3')}`);

    } catch (error) {
        console.error('\nError occurred:', error.message);
    } finally {
        // Clean up resources
        hypernum.dispose();
    }
};

// Execute the demonstration
demonstrateHypernum();