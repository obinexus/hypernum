/**
 * src/config/config-resolver.ts
 * Resolves configuration from multiple sources
 */
import { HypernumConfig } from '../core/config';
import { ConfigSource } from './config-source';
export declare class ConfigResolver {
    /**
     * Default precedence order for configuration sources
     */
    private readonly DEFAULT_PRECEDENCE;
    /**
     * Resolves configuration from multiple sources
     */
    resolveConfig(configs: Map<ConfigSource, Partial<HypernumConfig>>): HypernumConfig;
    /**
     * Validates a configuration source
     */
    validateConfigSource(config: Partial<HypernumConfig>): boolean;
}
//# sourceMappingURL=config-resolver.d.ts.map