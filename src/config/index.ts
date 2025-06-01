/**
 * src/config/index.ts
 * Main configuration module
 */
import { HypernumConfig,DEFAULT_BASIC_CONFIG, DEFAULT_FULL_CONFIG } from '../core/config';
import { ConfigLoader } from './config-loader';
import { ConfigParser } from './config-parser';
import { ConfigResolver } from './config-resolver';
import { ConfigSource } from './config-source';

interface ConfigurationOptions {
  /**
   * Path to a configuration file to use
   */
  configFile?: string;
  
  /**
   * Whether to search for configuration files in parent directories
   */
  searchParentDirs?: boolean;
  
  /**
   * Additional paths to search for configuration files
   */
  additionalSearchPaths?: string[];
  
  /**
   * Whether to use environment variables
   */
  useEnvVars?: boolean;
  
  /**
   * Whether to cache the configuration
   */
  cacheConfig?: boolean;
  
  /**
   * Inline configuration to use as a base
   */
  baseConfig?: Partial<HypernumConfig>;
}

/**
 * Main configuration module for Hypernum
 */
export class ConfigurationModule {
  public configLoader: ConfigLoader;
  public configParser: ConfigParser;
  public configResolver: ConfigResolver;
  public cachedConfig: HypernumConfig | null = null;
  
  constructor() {
    this.configLoader = new ConfigLoader();
    this.configParser = new ConfigParser();
    this.configResolver = new ConfigResolver();
  }
  
  /**
   * Gets the configuration, loading from all available sources
   */
  public getConfig(options: ConfigurationOptions = {}): HypernumConfig {
    const {
      configFile,
      searchParentDirs = true,
      additionalSearchPaths = [],
      useEnvVars = true,
      cacheConfig = true,
      baseConfig = {}
    } = options;
    
    // Return cached config if available and caching is enabled
    if (this.cachedConfig && cacheConfig) {
      return this.cachedConfig;
    }
    
    const configs = new Map<ConfigSource, Partial<HypernumConfig>>();
    
    // Add base config (lowest priority)
    if (Object.keys(baseConfig).length > 0) {
      configs.set(ConfigSource.INLINE_CONFIG, baseConfig);
    }
    
    // Load from specific file if provided
    if (configFile) {
      const fileConfig = this.configLoader.loadConfigFromFile(configFile);
      const source = this.configLoader.getConfigSourceFromFilename(configFile);
      if (this.configResolver.validateConfigSource(fileConfig)) {
        configs.set(source, fileConfig);
      }
    } else {
      // Search for configuration files
      const configFiles = this.configLoader.findConfigFiles({
        searchParentDirs,
        additionalPaths: additionalSearchPaths
      });
      
      for (const [source, filePath] of configFiles.entries()) {
        const fileConfig = this.configLoader.loadConfigFromFile(filePath);
        if (this.configResolver.validateConfigSource(fileConfig)) {
          configs.set(source, fileConfig);
        }
      }
    }
    
    // Load environment variables if enabled
    if (useEnvVars) {
      const envConfig = this.configLoader.loadEnvConfig();
      if (Object.keys(envConfig).length > 0) {
        configs.set(ConfigSource.ENV_VARIABLES, envConfig);
      }
    }
    
    // Resolve the final configuration
    const finalConfig = this.configResolver.resolveConfig(configs);
    
    // Cache the configuration if caching is enabled
    if (cacheConfig) {
      this.cachedConfig = finalConfig;
    }
    
    return finalConfig;
  }
  
  /**
   * Initializes configuration from a file
   */
  public initializeFromFile(filePath: string, options: ConfigurationOptions = {}): HypernumConfig {
    return this.getConfig({
      ...options,
      configFile: filePath
    });
  }
  
  /**
   * Creates a default configuration
   */
  public createDefaultConfig(type: 'basic' | 'full'): HypernumConfig {
    return type === 'basic' ? DEFAULT_BASIC_CONFIG : DEFAULT_FULL_CONFIG;
  }
  
  /**
   * Saves configuration to a file
   */
  public saveConfigToFile(config: HypernumConfig, filePath: string): void {
    this.configLoader.saveConfig(config, filePath);
  }
  
  public getConfigSourceFromFilename(filename: string): ConfigSource {
    return this.configLoader.getConfigSourceFromFilename(filename);
  }

  /**
   * Clears the configuration cache
   */
  public clearCache(): void {
    this.cachedConfig = null;
    this.configLoader.clearCache();
  }
}