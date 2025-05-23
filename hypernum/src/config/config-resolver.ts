/**
 * src/config/config-resolver.ts
 * Resolves configuration from multiple sources
 */
import { HypernumConfig, mergeConfig } from '../core/config';
import { ConfigSource } from './config-source';

export class ConfigResolver {
  /**
   * Default precedence order for configuration sources
   */
  private readonly DEFAULT_PRECEDENCE: ConfigSource[] = [
    ConfigSource.INLINE_CONFIG,    // Highest priority
    ConfigSource.ENV_VARIABLES,
    ConfigSource.RC_FILE,
    ConfigSource.JSON_FILE,
    ConfigSource.JS_FILE           // Lowest priority
  ];
  
  /**
   * Resolves configuration from multiple sources
   */
  public resolveConfig(configs: Map<ConfigSource, Partial<HypernumConfig>>): HypernumConfig {
    // Sort configurations by precedence
    const sortedEntries = Array.from(configs.entries())
      .sort((a, b) => {
        const indexA = this.DEFAULT_PRECEDENCE.indexOf(a[0]);
        const indexB = this.DEFAULT_PRECEDENCE.indexOf(b[0]);
        return indexA - indexB;
      });
    
    // Merge configurations in order (low to high priority)
    let finalConfig = {} as HypernumConfig;
    for (const [_, config] of sortedEntries) {
      finalConfig = mergeConfig({ ...finalConfig, ...config });
    }
    
    return finalConfig;
  }
  
  /**
   * Validates a configuration source
   */
  public validateConfigSource(config: Partial<HypernumConfig>): boolean {
    // Basic validation for now - can be extended with schema validation
    if (!config || typeof config !== 'object') {
      return false;
    }
    
    return true;
  }
}
