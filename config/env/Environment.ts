import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface IEnvironment {
  baseUrl: string;
  apiBaseUrl: string;
  credentials: {
    username?: string;
    password?: string;
    apiKey?: string;
  };
  timeout: number;
  useEnvCredentials?: boolean;
}

export class Environment implements IEnvironment {
  public baseUrl: string;
  public apiBaseUrl: string;
  public credentials: {
    username?: string;
    password?: string;
    apiKey?: string;
  };
  public timeout: number;
  public useEnvCredentials?: boolean;

  constructor(config: IEnvironment) {
    this.baseUrl = config.baseUrl;
    this.apiBaseUrl = config.apiBaseUrl;
    this.timeout = config.timeout;
    this.useEnvCredentials = config.useEnvCredentials;

    // Handle environment-specific credentials
    if (config.useEnvCredentials) {
      this.credentials = {
        username: process.env.PROD_USERNAME || config.credentials.username || '',
        password: process.env.PROD_PASSWORD || config.credentials.password || '',
        apiKey: process.env.PROD_API_KEY || config.credentials.apiKey || '',
      };
    } else {
      this.credentials = config.credentials;
    }
  }

  /**
   * Loads environment configuration from centralized JSON file
   * @param environmentName - The name of the environment to load (dev, staging, prod)
   * @returns Environment instance with loaded configuration
   * @throws Error if configuration file or environment not found
   */
  public static loadFromFile(environmentName: string): Environment {
    const configPath = path.join(__dirname, 'data', 'environments.json');
    
    if (!fs.existsSync(configPath)) {
      throw new Error(`Environment configuration file not found: ${configPath}`);
    }

    const allEnvironments = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const configData = allEnvironments[environmentName] as IEnvironment;
    
    if (!configData) {
      throw new Error(`Environment '${environmentName}' not found in environments.json. Available: ${Object.keys(allEnvironments).join(', ')}`);
    }

    return new Environment(configData);
  }
}
