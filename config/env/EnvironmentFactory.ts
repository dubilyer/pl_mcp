import {Environment} from './Environment';

export type EnvironmentName = 'dev' | 'staging' | 'prod';

export class EnvironmentFactory {
    private static readonly DEFAULT_ENVIRONMENT: EnvironmentName = 'dev';

    /**
     * Creates environment instance based on ENVIRONMENT env variable
     * Uses 'dev' as default if ENVIRONMENT variable is not set
     * @returns Environment instance loaded from JSON configuration
     */
    public static create(): Environment {
        const envName = (process.env.ENVIRONMENT as EnvironmentName) || this.DEFAULT_ENVIRONMENT;
        return Environment.loadFromFile(envName);
    }

    /**
     * Creates environment instance for a specific environment name
     * @param envName - The specific environment name to load
     * @returns Environment instance loaded from JSON configuration
     */
    public static createFor(envName: EnvironmentName): Environment {
        return Environment.loadFromFile(envName);
    }

    /**
     * Gets all available environment names that can be used with the factory
     * @returns Array of available environment names (dev, staging, prod)
     */
    public static getAvailableEnvironments(): EnvironmentName[] {
        return ['dev', 'staging', 'prod'];
    }
}
