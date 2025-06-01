// ===========================================
// CommonJS Usage Example (Node.js)
// ===========================================

// example-node.js
const { createHypernum } = require('@obinexuscomputing/hypernum');
const config = require('./hypernum.json');

async function demonstrateNodeUsage() {
  try {
    // Create Hypernum instance with external config
    const hypernum = createHypernum(config);
    
    console.log('?? Hypernum CJS Demo');
    console.log('Config loaded:', config.precision, config.roundingMode);
    
    // Perform high-precision calculations
    const result1 = hypernum.add("12345678901234567890", "98765432109876543210");
    const result2 = hypernum.multiply("123456789", "987654321");
    
    console.log('Addition result:', result1.toString());
    console.log('Multiplication result:', result2.toString());
    
    // Investment calculation example
    const investmentAmount = hypernum.multiply(BigInt(1000), BigInt(100)); // $1000 in cents
    const sharePrice = hypernum.multiply(BigInt(12050), BigInt(1)); // $120.50 in cents
    const shares = hypernum.divide(investmentAmount, sharePrice);
    
    console.log(`Investment: $1000 at $120.50 = ${shares} shares (precise)`);
    
  } catch (error) {
    console.error('CJS Demo failed:', error);
  }
}

// Alternative: Using the config helper
const { loadHypernumConfig } = require('@obinexuscomputing/hypernum/config');

async function demonstrateConfigHelper() {
  try {
    const config = await loadHypernumConfig('./hypernum.json');
    const hypernum = createHypernum(config);
    
    console.log('? Config helper loaded successfully');
    console.log('Precision:', config.precision);
    
  } catch (error) {
    console.error('Config helper demo failed:', error);
  }
}

// Run both demos
demonstrateNodeUsage();
demonstrateConfigHelper();

// ===========================================
// UMD Usage Example (Browser)
// ===========================================

/* 
<!-- example-browser.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Hypernum UMD Demo</title>
    <script src="dist/index.umd.js"></script>
</head>
<body>
    <h1>Hypernum UMD Demo</h1>
    <div id="results"></div>
    
    <script>
        async function demonstrateBrowserUsage() {
            const resultsDiv = document.getElementById('results');
            
            try {
                // Method 1: Load external config file
                const config = await fetch('./hypernum.json')
                    .then(res => res.json())
                    .catch(() => {
                        console.log('External config not found, using embedded defaults');
                        return null; // Will trigger embedded config
                    });
                
                // Create Hypernum instance (will use embedded config if external fails)
                const hypernum = Hypernum.createHypernum(config);
                
                resultsDiv.innerHTML += '<h3>?? Browser UMD Demo</h3>';
                resultsDiv.innerHTML += `<p>Config source: ${config ? 'External JSON' : 'Embedded Default'}</p>`;
                
                // Perform calculations
                const result1 = hypernum.add("999999999999999999", "1");
                const result2 = hypernum.multiply("123456789", "987654321");
                
                resultsDiv.innerHTML += `<p>Addition: ${result1.toString()}</p>`;
                resultsDiv.innerHTML += `<p>Multiplication: ${result2.toString()}</p>`;
                
                // Investment example
                const investment = calculateInvestment(hypernum, 1000, 120.50);
                resultsDiv.innerHTML += `<p>Investment: ${investment}</p>`;
                
            } catch (error) {
                resultsDiv.innerHTML += `<p style="color: red;">Error: ${error.message}</p>`;
            }
        }
        
        function calculateInvestment(hypernum, amount, price) {
            const investmentCents = hypernum.multiply(BigInt(amount), BigInt(100));
            const priceCents = hypernum.multiply(BigInt(Math.floor(price * 100)), BigInt(1));
            const shares = hypernum.divide(investmentCents, priceCents);
            
            return `$${amount} at $${price} = ${Number(shares)/1000} shares`;
        }
        
        // Method 2: Using embedded config directly (fallback)
        function demonstrateEmbeddedConfig() {
            try {
                // This will use the embedded default config
                const hypernum = Hypernum.createHypernum();
                
                const result = hypernum.add("1000000000000000000", "1");
                
                document.getElementById('results').innerHTML += 
                    `<h3>?? Embedded Config Demo</h3>
                     <p>Result with defaults: ${result.toString()}</p>`;
                     
            } catch (error) {
                console.error('Embedded config demo failed:', error);
            }
        }
        
        // Run demos when page loads
        document.addEventListener('DOMContentLoaded', () => {
            demonstrateBrowserUsage();
            demonstrateEmbeddedConfig();
        });
    </script>
</body>
</html>
*/

// ===========================================
// ESM Usage Example (Modern environments)
// ===========================================

// example-esm.js
import { createHypernum } from '@obinexuscomputing/hypernum';
import config from './hypernum.json' assert { type: 'json' };

async function demonstrateESMUsage() {
  try {
    const hypernum = createHypernum(config);
    
    console.log('?? Hypernum ESM Demo');
    console.log('Config precision:', config.precision);
    
    // Complex calculation example
    const base = "12345678901234567890";
    const exponent = "2";
    const result = hypernum.power(base, exponent);
    
    console.log(`${base}^${exponent} = ${result.toString()}`);
    
    // Financial precision example
    const price1 = "120.50";
    const price2 = "98.75"; 
    const avgPrice = hypernum.divide(
      hypernum.add(
        hypernum.multiply(price1.replace('.', ''), BigInt(1)),
        hypernum.multiply(price2.replace('.', ''), BigInt(1))
      ),
      BigInt(2)
    );
    
    console.log(`Average price: $${Number(avgPrice)/100}`);
    
  } catch (error) {
    console.error('ESM Demo failed:', error);
  }
}

demonstrateESMUsage();

// ===========================================
// Mixed Environment Detection
// ===========================================

// universal-usage.js - Works in both Node.js and browser
(async function() {
  const isNode = typeof process !== 'undefined' && process.versions?.node;
  const isBrowser = typeof window !== 'undefined';
  
  console.log(`Running in: ${isNode ? 'Node.js' : isBrowser ? 'Browser' : 'Unknown'}`);
  
  let hypernum;
  
  if (isNode) {
    // Node.js CJS pattern
    const { createHypernum } = require('@obinexuscomputing/hypernum');
    const config = require('./hypernum.json');
    hypernum = createHypernum(config);
    
  } else if (isBrowser) {
    // Browser UMD pattern
    const config = await fetch('./hypernum.json')
      .then(res => res.json())
      .catch(() => null);
    hypernum = Hypernum.createHypernum(config);
  }
  
  if (hypernum) {
    const result = hypernum.add("123", "456");
    console.log('Universal result:', result.toString());
  }
})();
