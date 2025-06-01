
/**
 * src/config/config-loader.ts
 * Responsible for finding and loading configuration files
 */

import { HypernumConfig, mergeConfig } from "@/core";
import path from "path";
import { ConfigParser } from "./config-parser";
import { ConfigSource } from "./config-source";
import fs from 'fs';


export interface ConfigSearchOptions {
  /**
   * Whether to search in parent directories
   */
  searchParentDirs?: boolean;
  
  /**
   * Additional paths to search
   */
  additionalPaths?: string[];
  
  /**
   * Base directory to start searching from
   */
  baseDir?: string;
}

export class ConfigLoader {
  private readonly DEFAULT_CONFIG_FILES = [
    '.hypernumrc',
    '.hypernumrc.json',
    '.hypernumrc.js',
    'hypernum.config.js',
    'hypernum.config.json',
  ];
  
  private readonly DEFAULT_CONFIG_PATHS = [
    process.cwd(),
    path.join(process.cwd(), 'config'),
    path.resolve(process.env['HOME'] || process.env['USERPROFILE'] || '', '.hypernum')
  ];
  
  private configParser: ConfigParser;
  private cachedConfig: HypernumConfig | null = null;
  
  constructor() {
    this.configParser = new ConfigParser();
  }
  
  /**
   * Finds configuration files in standard locations
   */
  public findConfigFiles(options: ConfigSearchOptions = {}): Map<ConfigSource, string> {
    const {
      searchParentDirs = true,
      additionalPaths = [],
      baseDir = process.cwd()
    } = options;
    
    const searchPaths = [
      ...this.DEFAULT_CONFIG_PATHS,
      ...additionalPaths
    ];
    
    const configFiles = new Map<ConfigSource, string>();
    
    // Search for configuration files
    for (const searchPath of searchPaths) {
      for (const filename of this.DEFAULT_CONFIG_FILES) {
        const filePath = path.join(searchPath, filename);
        
        if (fs.existsSync(filePath)) {
          const source = this.getConfigSourceFromFilename(filename);
          configFiles.set(source, filePath);
        }
      }
    }
    
    // Search parent directories if enabled
    if (searchParentDirs && baseDir !== path.parse(baseDir).root) {
      let currentDir = baseDir;
      let parentDir = path.dirname(currentDir);
      
      while (currentDir !== parentDir) {
        for (const filename of this.DEFAULT_CONFIG_FILES) {
          const filePath = path.join(currentDir, filename);
          
          if (fs.existsSync(filePath)) {
            const source = this.getConfigSourceFromFilename(filename);
            configFiles.set(source, filePath);
          }
        }
        
        currentDir = parentDir;
        parentDir = path.dirname(currentDir);
      }
    }
    
    return configFiles;
  }
  
  /**
   * Determines the config source type from filename
   */
  public getConfigSourceFromFilename(filename: string): ConfigSource {
    if (filename.endsWith('.js')) {
      return ConfigSource.JS_FILE;
    } else if (filename.endsWith('.json')) {
      return ConfigSource.JSON_FILE;
    } else if (filename.startsWith('.hypernumrc')) {
      return ConfigSource.RC_FILE;
    }
    
    return ConfigSource.JSON_FILE; // Default fallback
  }
 
  /**
   * Loads configuration from a file
   */
  public loadConfigFromFile(filePath: string): Partial<HypernumConfig> {
    try {
      const extension = path.extname(filePath);
      
      switch (extension) {
        case '.js':
          return this.configParser.parseJsConfig(filePath);
        case '.json':
          return this.configParser.parseJsonConfig(filePath);
        default:
          if (filePath.includes('.hypernumrc')) {
            return this.configParser.parseRcConfig(filePath);
          }
          throw new Error(`Unsupported config file extension: ${extension}`);
      }
    } catch (error) {
      console.error(`Error loading config from ${filePath}:`, error);
      return {};
    }
  }
  
  /**
   * Loads configuration from all available sources
   */
  public loadConfig(options: ConfigSearchOptions = {}): HypernumConfig {
    // Return cached config if available
    if (this.cachedConfig) {
      return this.cachedConfig;
    }
    
    const configFiles = this.findConfigFiles(options);
    const configs: Partial<HypernumConfig>[] = [];
    
    // Load environment variables first (highest priority)
    const envConfig = this.loadEnvConfig();
    if (Object.keys(envConfig).length > 0) {
      configs.push(envConfig);
    }
    
    // Load from config files in order of priority
    for (const source of [ConfigSource.RC_FILE, ConfigSource.JSON_FILE, ConfigSource.JS_FILE]) {
      const filePath = configFiles.get(source);
      if (filePath) {
        const fileConfig = this.loadConfigFromFile(filePath);
        configs.push(fileConfig);
      }
    }
    
    // Merge configurations with default config as base
    let finalConfig = {} as HypernumConfig;
    for (const config of configs.reverse()) {
      finalConfig = mergeConfig({ ...finalConfig, ...config });
    }
    
    // Cache the configuration
    this.cachedConfig = finalConfig;
    return finalConfig;
  }
  
  /**
   * Loads environment variables as configuration
   */
  public loadEnvConfig(): Partial<HypernumConfig> {
    const envConfig: Partial<HypernumConfig> = {};
    // Load environment variables here and populate envConfig
    // Example: envConfig.someKey = process.env.SOME_ENV_VAR;
    return envConfig;
  }

  
  /**
   * Saves configuration to a file
   */
  public saveConfig(config: HypernumConfig, filePath: string): void {
    try {
      const extension = path.extname(filePath);
      
      switch (extension) {
        case '.js':
          const jsContent = `module.exports = ${this.configParser.stringifyConfig(config)};`;
          fs.writeFileSync(filePath, jsContent, 'utf-8');
          break;
        case '.json':
          fs.writeFileSync(filePath, this.configParser.stringifyConfig(config), 'utf-8');
          break;
        default:
          if (filePath.includes('.hypernumrc')) {
            fs.writeFileSync(filePath, this.configParser.stringifyConfig(config), 'utf-8');
          } else {
            throw new Error(`Unsupported config file extension: ${extension}`);
          }
      }
    } catch (error) {
      console.error(`Error saving config to ${filePath}:`, error);
    }
  }
  
  /**
   * Clears the configuration cache
   */
  public clearCache(): void {
    this.cachedConfig = null;
  }
}