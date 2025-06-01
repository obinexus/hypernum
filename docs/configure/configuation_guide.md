# Hypernum Configuration Guide

## 🚀 Quick Start with JSON Configuration

Hypernum now supports flexible JSON-based configuration that works seamlessly across Node.js and browser environments.

### 1. Create Configuration File

Create a `hypernum.json` file in your project root:

```json
{
  "precision": 10,
  "roundingMode": "HALF_EVEN",
  "checkOverflow": true,
  "maxSteps": 2000,
  "debug": false,
  "investment": {
    "riskTolerance": "conservative",
    "decisionThreshold": 0.7,
    "maxPositionSize": 10000
  }
}
```

### 2. Import and Use Hypernum

#### ES6 Modules (Browser/Modern Node.js)
```javascript
import { createHypernum } from '@obinexuscomputing/hypernum';
import { loadHypernumConfig } from '@obinexuscomputing/hypernum/config';

// Load configuration and create instance
const config = await loadHypernumConfig('./hypernum.json');
const hypernum = createHypernum(config);

// Use with precise calculations
const result = hypernum.add("12345678901234567890", "98765432109876543210");
console.log('Result:', result.toString());
```

#### CommonJS (Node.js)
```javascript
const { createHypernum } = require('@obinexuscomputing/hypernum');
const { loadHypernumConfig } = require('@obinexuscomputing/hypernum/config');

async function initializeHypernum() {
  const config = await loadHypernumConfig('./hypernum.json');
  const hypernum = createHypernum(config);
  return hypernum;
}
```

#### UMD (Browser via CDN)
```html
<script src="https://unpkg.com/@obinexuscomputing/hypernum/dist/index.umd.js"></script>
<script>
  // Configuration will be automatically loaded from ./hypernum.json
  // or use embedded defaults
  const hypernum = Hypernum.createHypernum();
</script>
```

## 📊 Warren Buffett Investment Strategy Example

The updated investment strategy demonstrates real-world usage with configurable precision:

### File Structure
```
examples/warren-buffett-investment/
├── hypernum.json          # Configuration file
├── warren-buffett-strategy.js  # Main strategy code
├── index.html             # Demo interface
├── styles.css             # Styling
└── prices.json            # Sample market data
```

### Key Features
- **JSON Configuration**: Easily adjust precision, risk tolerance, and decision thresholds
- **Modular Imports**: Clean separation of configuration and logic
- **Environment Support**: Works in both Node.js and browser environments
- **Precision Trading**: Uses BigInt for exact financial calculations

### Running the Example

#### Development Mode
```bash
npm install
npm run build:examples
npm run serve-example
```

#### Production Build
```bash
npm run build
# Files will be in dist/ folder with embedded configuration
```

## ⚙️ Configuration Options

### Core Configuration
```json
{
  "precision": 10,           // Decimal precision for calculations
  "roundingMode": "HALF_EVEN", // Rounding strategy
  "checkOverflow": true,     // Enable overflow checking
  "maxSteps": 2000,          // Maximum computation steps
  "debug": false             // Enable debug logging
}
```

### Investment-Specific Configuration
```json
{
  "investment": {
    "riskTolerance": "conservative",  // "conservative" | "aggressive"
    "decisionThreshold": 0.7,         // Confidence threshold (0-1)
    "maxPositionSize": 10000,         // Maximum single investment
    "diversificationFactor": 0.3      // Portfolio diversification ratio
  }
}
```

### Performance Configuration
```json
{
  "performance": {
    "enableTracking": false,   // Track operation performance
    "samplingRate": 0.1        // Metrics sampling rate
  }
}
```

## 🔧 Build Configuration

The updated `rollup.config.js` provides:

- **Multiple Formats**: UMD, ESM, and CommonJS builds
- **JSON Support**: Automatic JSON loading and embedding
- **Environment Injection**: Configuration loading for different environments
- **Example Bundling**: Complete example applications with dependencies

### Build Targets

```bash
npm run build              # Build all formats
npm run build:examples     # Build with examples
npm run build:watch        # Watch mode for development
```

### Output Structure
```
dist/
├── index.js              # ESM build
├── index.cjs             # CommonJS build
├── index.umd.js          # UMD build (browser)
├── index.d.ts            # TypeScript definitions
├── config-loader.cjs     # Configuration utilities
├── hypernum.json         # Default configuration
└── examples/
    └── warren-buffett-investment/
        ├── bundle.js     # Bundled example
        ├── index.html    # Demo page
        └── hypernum.json # Example configuration
```

## 🧪 Environment Variables

Override configuration with environment variables:

```bash
export HYPERNUM_PRECISION=15
export HYPERNUM_CHECK_OVERFLOW=false
export HYPERNUM_DEBUG=true

node your-app.js
```

## 📝 Migration Guide

### From Hardcoded Configuration
```javascript
// Before
const hypernum = createHypernum({
  precision: 10,
  checkOverflow: true
});

// After
const config = await loadHypernumConfig();
const hypernum = createHypernum(config);
```

### From Manual Imports
```javascript
// Before
import { Hypernum } from '@obinexuscomputing/hypernum';
const instance = new Hypernum({ precision: 10 });

// After
import { createHypernum } from '@obinexuscomputing/hypernum';
import config from './hypernum.json';
const hypernum = createHypernum(config);
```

## 🎯 Best Practices

1. **Version Control**: Include `hypernum.json` in your repository
2. **Environment-Specific Configs**: Use different configs for dev/prod
3. **Validation**: Always validate configuration before use
4. **Caching**: Configuration is cached automatically for performance
5. **Error Handling**: Implement fallbacks for configuration loading

## 🔍 Troubleshooting

### Common Issues

**Configuration Not Loading**
```javascript
// Check if file exists and is valid JSON
try {
  const config = await loadHypernumConfig('./hypernum.json');
  console.log('Config loaded:', config);
} catch (error) {
  console.error('Config error:', error);
}
```

**Precision Issues**
```javascript
// Ensure precision is set correctly
const hypernum = createHypernum({ precision: 10 });
console.log('Precision:', hypernum.getConfig().precision);
```

**Build Errors**
```bash
# Clean and rebuild
npm run clean
npm run build
```

This modular approach provides maximum flexibility while maintaining simplicity for basic use cases. The Warren Buffett investment example demonstrates real-world application with configurable precision and risk management.