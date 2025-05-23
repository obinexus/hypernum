/**
 * src/config/config-loader.ts
 * Responsible for finding and loading configuration files
 */
import { HypernumConfig } from "@/core";
import { ConfigSource } from "./config-source";
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
export declare class ConfigLoader {
    private readonly DEFAULT_CONFIG_FILES;
    private readonly DEFAULT_CONFIG_PATHS;
    private configParser;
    private cachedConfig;
    constructor();
    /**
     * Finds configuration files in standard locations
     */
    findConfigFiles(options?: ConfigSearchOptions): Map<ConfigSource, string>;
    /**
     * Determines the config source type from filename
     */
    getConfigSourceFromFilename(filename: string): ConfigSource;
    /**
     * Loads configuration from a file
     */
    loadConfigFromFile(filePath: string): Partial<HypernumConfig>;
    /**
     * Loads configuration from all available sources
     */
    loadConfig(options?: ConfigSearchOptions): HypernumConfig;
    /**
     * Loads environment variables as configuration
     */
    loadEnvConfig(): Partial<HypernumConfig>;
    /**
     * Saves configuration to a file
     */
    saveConfig(config: HypernumConfig, filePath: string): void;
    /**
     * Clears the configuration cache
     */
    clearCache(): void;
}
//# sourceMappingURL=config-loader.d.ts.map