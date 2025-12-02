import { expect, APIRequestContext, APIResponse } from '@playwright/test';

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

  constructor(request: APIRequestContext, baseURL: string = 'https://digidates.de/api/v1') {
    this.request = request;
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  async getUnixTimeAndValidate(timestamp?: string): Promise<number> {
    let url = `${this.baseURL}/unixtime`;
    if (timestamp) {
      const params = new URLSearchParams({ timestamp });
      url += `?${params}`;
    }
    
    const response = await this.request.get(url, { headers: this.headers });
    const responseBody = await response.json();
    console.log('Unix Time Response:', JSON.stringify(responseBody));
    
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('time');
    expect(typeof responseBody.time).toBe('number');
    expect(responseBody.time).toBeGreaterThan(0);
    
    return responseBody.time;
  }

  async checkLeapYearAndValidate(year: string): Promise<boolean> {
    const params = new URLSearchParams({ year });
    const response = await this.request.get(`${this.baseURL}/leapyear?${params}`, { headers: this.headers });
    const responseBody = await response.json();
    console.log('Leap Year Response:', JSON.stringify(responseBody));
    
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('leapyear');
    expect(typeof responseBody.leapyear).toBe('boolean');
    
    return responseBody.leapyear;
  }

  async calculateAgeAndValidate(date: string): Promise<AgeData> {
    const response = await this.request.get(`${this.baseURL}/age/${date}`, { headers: this.headers });
    const responseBody = await response.json();
    console.log('Age Calculation Response:', JSON.stringify(responseBody));
    
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('age');
    expect(typeof responseBody.age).toBe('number');
    expect(responseBody.age).toBeGreaterThanOrEqual(0);
    
    return responseBody;
  }

  generateTestData(): TestData {
    return {
      currentYear: new Date().getFullYear().toString(),
      leapYear: '2024',
      nonLeapYear: '2023',
      birthDate: '1990-01-01',
      validTimestamp: '2020-01-01 00:00:00'
    };
  }
}
