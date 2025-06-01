/**
 * src/config/config-source.ts
 * Enum defining possible configuration sources
 */
export declare enum ConfigSource {
    /**
     * Environment variables with HYPERNUM_ prefix
     */
    ENV_VARIABLES = "ENV_VARIABLES",
    /**
     * RC file (.hypernumrc, .hypernumrc.json, etc.)
     */
    RC_FILE = "RC_FILE",
    /**
     * JSON configuration file (hypernum.config.json)
     */
    JSON_FILE = "JSON_FILE",
    /**
     * JavaScript configuration file (hypernum.config.js)
     */
    JS_FILE = "JS_FILE",
    /**
     * Inline configuration passed to createHypernum()
     */
    INLINE_CONFIG = "INLINE_CONFIG"
}
//# sourceMappingURL=config-source.d.ts.map