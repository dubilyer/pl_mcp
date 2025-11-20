import { expect } from '@playwright/test';

export class DigiDatesApi {
  constructor(request, baseURL = 'https://digidates.de/api/v1') {
    this.request = request;
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Get unix time (optionally convert from timestamp)
   * @param {string} timestamp - Optional timestamp to convert
   * @returns {Promise} Response
   */
  async getUnixTime(timestamp = null) {
    let url = `${this.baseURL}/unixtime`;
    if (timestamp) {
      const params = new URLSearchParams({ timestamp });
      url += `?${params}`;
    }
    
    const response = await this.request.get(url, {
      headers: this.headers
    });
    return response;
  }

  /**
   * Check if a year is a leap year
   * @param {string} year - Year to check
   * @returns {Promise} Response
   */
  async checkLeapYear(year) {
    const params = new URLSearchParams({ year });
    const response = await this.request.get(`${this.baseURL}/leapyear?${params}`, {
      headers: this.headers
    });
    return response;
  }

  /**
   * Calculate age from birthdate
   * @param {string} date - Birthdate in YYYY-MM-DD format
   * @returns {Promise} Response
   */
  async calculateAge(date) {
    const response = await this.request.get(`${this.baseURL}/age/${date}`, {
      headers: this.headers
    });
    return response;
  }

  /**
   * Verify unix time response
   * @param {Response} response - API response
   * @returns {Promise<number>} Unix timestamp
   */
  async verifyUnixTimeResponse(response) {
    if (response.status() === 200) {
      const responseData = await response.json();
      expect(responseData).toBeDefined();
      expect(typeof responseData).toBe('object');
      expect(responseData).toHaveProperty('time');
      expect(typeof responseData.time).toBe('number');
      expect(responseData.time).toBeGreaterThan(0);
      return responseData.time;
    } else if (response.status() === 400) {
      console.log('Invalid timestamp provided');
      return null;
    } else {
      expect(response.status()).toBeLessThanOrEqual(500);
      return null;
    }
  }

  /**
   * Verify leap year response
   * @param {Response} response - API response
   * @returns {Promise<boolean>} Is leap year
   */
  async verifyLeapYearResponse(response) {
    if (response.status() === 200) {
      const responseData = await response.json();
      console.log(responseData);
      expect(responseData).toBeDefined();
      expect(typeof responseData).toBe('object');
      expect(responseData).toHaveProperty('leapyear');
      expect(typeof responseData.leapyear).toBe('boolean');
      return responseData.leapyear;
    } else {
      expect(response.status()).toBeLessThanOrEqual(500);
      return null;
    }
  }

  /**
   * Verify age calculation response
   * @param {Response} response - API response
   * @returns {Promise<object>} Age data
   */
  async verifyAgeResponse(response) {
    if (response.status() === 200) {
      const responseData = await response.json();
      expect(responseData).toBeDefined();
      expect(typeof responseData).toBe('object');
      
      // Validate age structure
      expect(responseData).toHaveProperty('age');
      expect(typeof responseData.age).toBe('number');
      expect(responseData.age).toBeGreaterThanOrEqual(0);
      
      if (responseData.ageextended) {
        expect(typeof responseData.ageextended).toBe('object');
        expect(typeof responseData.ageextended.years).toBe('number');
        expect(typeof responseData.ageextended.months).toBe('number');
        expect(typeof responseData.ageextended.days).toBe('number');
      }
      
      return responseData;
    } else {
      expect(response.status()).toBeLessThanOrEqual(500);
      return null;
    }
  }

  /**
   * Generate test data for API calls
   * @returns {object} Test data
   */
  generateTestData() {
    return {
      currentYear: new Date().getFullYear().toString(),
      leapYear: '2024',
      nonLeapYear: '2023',
      birthDate: '1990-01-01',
      validTimestamp: '2020-01-01 00:00:00'
    };
  }
}
