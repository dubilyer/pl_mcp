import {expect, type APIRequestContext} from '@playwright/test';
import {EnvironmentFactory} from '@/config/env/EnvironmentFactory';

export interface TestData {
    currentYear: string;
    leapYear: string;
    nonLeapYear: string;
    birthDate: string;
    validTimestamp: string;
}

export interface AgeData {
    age: number;
    ageextended?: {
        years: number;
        months: number;
        days: number;
    };
}

export class DigiDatesApi {
    private request: APIRequestContext;
    private baseURL: string;
    private headers: Record<string, string>;
    private environment = EnvironmentFactory.create();

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseURL = this.environment.apiBaseUrl;
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }

    /**
     * Gets Unix timestamp and validates the response structure
     * @param timestamp - Optional timestamp parameter for conversion
     * @returns Promise resolving to Unix time as number
     */
    async getUnixTimeAndValidate(timestamp?: string): Promise<number> {
        let url = `${this.baseURL}/unixtime`;
        if (timestamp) {
            const params = new URLSearchParams({timestamp});
            url += `?${params}`;
        }

        const response = await this.request.get(url, {headers: this.headers});
        const responseBody = await response.json();

        expect(response.status()).toBe(200);
        expect(responseBody).toHaveProperty('time');
        expect(typeof responseBody.time).toBe('number');
        expect(responseBody.time).toBeGreaterThan(0);

        return responseBody.time;
    }

    /**
     * Checks if a given year is a leap year and validates the response
     * @param year - Year to check as string
     * @returns Promise resolving to boolean indicating if year is leap year
     */
    async checkLeapYearAndValidate(year: string): Promise<boolean> {
        const params = new URLSearchParams({year});
        const response = await this.request.get(`${this.baseURL}/leapyear?${params}`, {headers: this.headers});
        const responseBody = await response.json();

        expect(response.status()).toBe(200);
        expect(responseBody).toHaveProperty('leapyear');
        expect(typeof responseBody.leapyear).toBe('boolean');

        return responseBody.leapyear;
    }

    /**
     * Calculates age from birth date and validates the response structure
     * @param date - Birth date in YYYY-MM-DD format
     * @returns Promise resolving to AgeData with calculated age
     */
    async calculateAgeAndValidate(date: string): Promise<AgeData> {
        const response = await this.request.get(`${this.baseURL}/age/${date}`, {headers: this.headers});
        const responseBody = await response.json();

        expect(response.status()).toBe(200);
        expect(responseBody).toHaveProperty('age');
        expect(typeof responseBody.age).toBe('number');
        expect(responseBody.age).toBeGreaterThanOrEqual(0);

        return responseBody;
    }

    /**
     * Generates test data with predefined values for API testing
     * @returns TestData object with current year, leap years, and test dates
     */
    generateTestData(): TestData {
        return {
            currentYear: new Date().getFullYear().toString(),
            leapYear: '2024',
            nonLeapYear: '2023',
            birthDate: '1990-01-01',
            validTimestamp: '2020-01-01 00:00:00',
        };
    }
}
