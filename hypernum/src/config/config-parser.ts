

/**
 * src/config/config-parser.ts
 * Parses configuration files in different formats
 */

import { HypernumConfig } from "@/core";
import path from "path";
import fs from 'fs';


export class ConfigParser {
  /**
   * Parses a JSON configuration file
   */
  public parseJsonConfig(filePath: string): Partial<HypernumConfig> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as Partial<HypernumConfig>;
    } catch (error) {
      console.error(`Error parsing JSON config file ${filePath}:`, error);
      return {};
    }
  }
  
  /**
   * Parses a JavaScript configuration file
   */
  public parseJsConfig(filePath: string): Partial<HypernumConfig> {
    try {
      // Use dynamic import for ESM compatibility
      if (path.isAbsolute(filePath)) {
        // For Node.js environments
        const config = require(filePath);
        return config.default || config;
      } else {
        // For browser environments or when relative path is used
        const absolutePath = path.resolve(process.cwd(), filePath);
        const config = require(absolutePath);
        return config.default || config;
      }
    } catch (error) {
      console.error(`Error parsing JS config file ${filePath}:`, error);
      return {};
    }
  }
  
  /**
   * Parses an RC configuration file
   */
  public parseRcConfig(filePath: string): Partial<HypernumConfig> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Try to parse as JSON first
      try {
        return JSON.parse(content) as Partial<HypernumConfig>;
      } catch {
        // Not valid JSON, try to parse as JS if it has JS-like syntax
        if (content.includes('module.exports') || content.includes('export default')) {
          // Create a temporary JS file to require
          const tempFilePath = `${filePath}.temp.js`;
          fs.writeFileSync(tempFilePath, content);
          
          try {
            const config = require(tempFilePath);
            fs.unlinkSync(tempFilePath); // Clean up temp file
            return config.default || config;
          } catch (jsError) {
            fs.unlinkSync(tempFilePath); // Clean up temp file even on error
            throw jsError;
          }
        }
        
        // Handle INI-style RC files
        return this.parseIniStyleConfig(content);
      }
    } catch (error) {
      console.error(`Error parsing RC config file ${filePath}:`, error);
      return {};
    }
  }
  
  /**
   * Parses an INI-style configuration
   */
  private parseIniStyleConfig(content: string): Partial<HypernumConfig> {
    const config: Record<string, any> = {};
    let currentSection = '';
    
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip comments and empty lines
      if (trimmedLine.startsWith('#') || trimmedLine.startsWith(';') || !trimmedLine) {
        continue;
      }
      
      // Section header
      const sectionMatch = trimmedLine.match(/^\[([^\]]+)\]$/);
      if (sectionMatch) {
        if (sectionMatch[1]) {
          currentSection = sectionMatch[1];
          if (!config[currentSection]) {
            config[currentSection] = {};
          }
          continue;
        }
      }
      
      // Key-value pair
      const keyValueMatch = trimmedLine.match(/^([^=]+)=(.*)$/);
      if (keyValueMatch) {
        const key = keyValueMatch[1]?.trim() || '';
        let value: any = keyValueMatch[2] ? keyValueMatch[2].trim() : '';
        
        // Try to parse the value
        if (value === 'true' || value === 'false') {
          value = value === 'true';
        } else if (!isNaN(Number(value))) {
          value = Number(value);
        } else if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        
        if (currentSection) {
          config[currentSection][key] = value;
        } else {
          config[key] = value;
        }
      }
    }
    
    return config as Partial<HypernumConfig>;
  }
  
  /**
   * Stringifies a configuration object for saving
   */
  public stringifyConfig(config: HypernumConfig): string {
    // Use a custom replacer function to handle BigInt and circular references
    const seen = new WeakSet();
    return JSON.stringify(config, (_, value) => {
      if (typeof value === 'bigint') {
        return value.toString() + 'n';
      }
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return value;
    }, 2);
  }
}