import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * Precision at Scale
 * ${pkg.description} 
 * @license ISC
 */`;

// Load default configuration for embedding
const defaultHypernumConfig = {
  precision: 10,
  roundingMode: "HALF_EVEN",
  checkOverflow: true,
  maxSteps: 2000,
  debug: false,
  performance: {
    enableTracking: false,
    samplingRate: 0.1
  },
  formatting: {
    notation: "standard",
    grouping: true,
    decimalSeparator: ".",
    groupSeparator: ","
  }
};

// External dependencies
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'tslib'
];

// Alias configurations for hypernum specific paths
const srcAliases = [
  { find: '@', replacement: path.resolve(__dirname, 'src') },
  { find: '@core', replacement: path.resolve(__dirname, 'src/core') },
  { find: '@operations', replacement: path.resolve(__dirname, 'src/operations') },
  { find: '@structures', replacement: path.resolve(__dirname, 'src/structures') },
  { find: '@storage', replacement: path.resolve(__dirname, 'src/storage') },
  { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
  { find: '@types', replacement: path.resolve(__dirname, 'src/types') }
];

// TypeScript configuration optimized for BigInt operations
const typeScriptConfig = {
  tsconfig: './tsconfig.json',
  clean: true,
  useTsconfigDeclarationDir: true,
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      declarationDir: './dist/types',
      sourceMap: true,
      module: 'esnext',
      moduleResolution: 'node',
      target: 'es2020', // Ensures BigInt compatibility
      lib: ['es2020', 'dom'],
      allowSyntheticDefaultImports: true
    },
    exclude: ['**/__tests__/**', '**/*.test.ts', 'src/**/*.spec.ts']
  }
};

// Base plugins configuration
const basePlugins = [
  alias({ entries: srcAliases }),
  json({
    compact: true,
    preferConst: true,
    namedExports: false // Ensure JSON files are imported as default exports
  }),
  resolve({
    browser: true,
    preferBuiltins: true,
    mainFields: ['module', 'browser', 'main'],
    extensions: ['.ts', '.js', '.json']
  }),
  commonjs({
    include: /node_modules/,
    requireReturnsDefault: 'auto'
  }),
  typescript(typeScriptConfig)
];

// Base output configuration
const baseOutput = {
  banner,
  sourcemap: true,
  exports: 'named'
};

// Configuration injection for different environments
const createEnvironmentConfig = (format) => {
  const envConfig = {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    'process.env.HYPERNUM_CONFIG_PATH': JSON.stringify('./hypernum.json'),
    'process.env.BUILD_FORMAT': JSON.stringify(format)
  };

  if (format === 'umd') {
    // Embed default config in UMD build for browser fallback
    envConfig['__HYPERNUM_DEFAULT_CONFIG__'] = JSON.stringify(defaultHypernumConfig);
    envConfig['__HYPERNUM_HAS_EMBEDDED_CONFIG__'] = 'true';
  } else {
    // CJS/ESM builds rely on external config files
    envConfig['__HYPERNUM_HAS_EMBEDDED_CONFIG__'] = 'false';
  }

  return replace({
    values: envConfig,
    preventAssignment: true
  });
};

// Main builds configuration
const mainBuilds = [
  // UMD build - Browser optimized with embedded config fallback
  {
    input: 'src/index.ts',
    output: {
      ...baseOutput,
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'Hypernum',
      globals: {
        tslib: 'tslib'
      }
    },
    external,
    plugins: [
      ...basePlugins,
      createEnvironmentConfig('umd'),
      terser({
        output: {
          comments: (node, comment) =>
            comment.type === 'comment2' && /@license/i.test(comment.value)
        }
      }),
      copy({
        targets: [
          { src: 'hypernum.json', dest: 'dist' },
          { src: 'examples', dest: 'dist', flatten: false }
        ]
      })
    ]
  },
  
  // CommonJS build - Node.js optimized, modular config loading
  {
    input: 'src/index.ts',
    output: {
      ...baseOutput,
      file: 'dist/index.cjs',
      format: 'cjs'
    },
    external,
    plugins: [
      ...basePlugins,
      createEnvironmentConfig('cjs'),
      copy({
        targets: [
          { src: 'hypernum.json', dest: 'dist' }
        ]
      })
    ]
  },
  
  // ESM build - Modern environments
  {
    input: 'src/index.ts',
    output: {
      ...baseOutput,
      file: 'dist/index.js',
      format: 'esm'
    },
    external,
    plugins: [
      ...basePlugins,
      createEnvironmentConfig('esm'),
      copy({
        targets: [
          { src: 'hypernum.json', dest: 'dist' }
        ]
      })
    ]
  }
];

// Types build configuration
const typesBuild = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es'
  },
  external: [
    ...external,
    /\.css$/,
    /@types\/.*/,
    /@core\/.*/,
    /@operations\/.*/,
    /@structures\/.*/,
    /@utils\/.*/,
    /@\/.*/
  ],
  plugins: [
    alias({
      entries: srcAliases.map(entry => ({
        ...entry,
        replacement: entry.replacement.replace('/src/', '/dist/types/')
      }))
    }),
    dts()
  ]
};

// Configuration helper build for Node.js environments
const configHelperBuild = {
  input: 'src/config/config-loader.ts',
  output: {
    file: 'dist/config-loader.cjs',
    format: 'cjs',
    exports: 'named'
  },
  external: ['fs', 'path'],
  plugins: [
    alias({ entries: srcAliases }),
    json(),
    resolve({
      preferBuiltins: true,
      mainFields: ['main', 'module'],
      extensions: ['.ts', '.js', '.json']
    }),
    commonjs(),
    typescript({
      ...typeScriptConfig,
      tsconfigOverride: {
        ...typeScriptConfig.tsconfigOverride,
        compilerOptions: {
          ...typeScriptConfig.tsconfigOverride.compilerOptions,
          target: 'es2018' // Better Node.js compatibility
        }
      }
    })
  ]
};

export default [
  ...mainBuilds,
  typesBuild,
  configHelperBuild
];
