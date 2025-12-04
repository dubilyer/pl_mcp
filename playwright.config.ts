import {defineConfig, devices} from '@playwright/test';
import {EnvironmentFactory} from './config/env/EnvironmentFactory';

const isCI = process.env.CI === 'true';
const environment = EnvironmentFactory.create();

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    workers: 3,
    reporter: 'html',
    timeout: environment.timeout,

    projects: [
        {
            name: 'api-tests',
            testMatch: '**/tests/api/**/*.spec.ts',
            use: {
                // API tests don't need browser context
                // This improves performance by not initializing browser for API tests
                baseURL: environment.apiBaseUrl,
            },
            timeout: 15000, // API tests typically faster
        },
        {
            name: 'web-tests',
            testMatch: '**/tests/web/**/*.spec.ts',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: environment.baseUrl,
                headless: true,
                trace: 'on-first-retry',
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
            },
            timeout: environment.timeout, // Use environment-specific timeout
        },
    ],
});
