/**
 * src/config/config-parser.ts
 * Parses configuration files in different formats
 */
import { HypernumConfig } from "@/core";
export declare class ConfigParser {
    /**
     * Parses a JSON configuration file
     */
    parseJsonConfig(filePath: string): Partial<HypernumConfig>;
    /**
     * Parses a JavaScript configuration file
     */
    parseJsConfig(filePath: string): Partial<HypernumConfig>;
    /**
     * Parses an RC configuration file
     */
    parseRcConfig(filePath: string): Partial<HypernumConfig>;
    /**
     * Parses an INI-style configuration
     */
    private parseIniStyleConfig;
    /**
     * Stringifies a configuration object for saving
     */
    stringifyConfig(config: HypernumConfig): string;
}
//# sourceMappingURL=config-parser.d.ts.map