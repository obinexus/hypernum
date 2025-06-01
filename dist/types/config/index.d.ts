/**
 * src/config/index.ts
 * Main configuration module
 */
import { HypernumConfig } from '../core/config';
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
export declare class ConfigurationModule {
    configLoader: ConfigLoader;
    configParser: ConfigParser;
    configResolver: ConfigResolver;
    cachedConfig: HypernumConfig | null;
    constructor();
    /**
     * Gets the configuration, loading from all available sources
     */
    getConfig(options?: ConfigurationOptions): HypernumConfig;
    /**
     * Initializes configuration from a file
     */
    initializeFromFile(filePath: string, options?: ConfigurationOptions): HypernumConfig;
    /**
     * Creates a default configuration
     */
    createDefaultConfig(type: 'basic' | 'full'): HypernumConfig;
    /**
     * Saves configuration to a file
     */
    saveConfigToFile(config: HypernumConfig, filePath: string): void;
    getConfigSourceFromFilename(filename: string): ConfigSource;
    /**
     * Clears the configuration cache
     */
    clearCache(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map