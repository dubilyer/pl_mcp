import { test, expect } from '@playwright/test';
import { DigiDatesApi } from '../../api/DigiDatesApi.js';

test.describe('DigiDates API Tests', () => {
  let digiDatesApi;
  let testData;

  test.beforeEach(async ({ request }) => {
    digiDatesApi = new DigiDatesApi(request);
    testData = digiDatesApi.generateTestData();
  });

  test('should get current unix timestamp', async () => {
    // Get current unix time using API specification
    const response = await digiDatesApi.getUnixTime();
    
    // Verify response using API specification method
    const unixTime = await digiDatesApi.verifyUnixTimeResponse(response);
    
    // Additional validation - should be close to current time
    if (unixTime) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeDiff = Math.abs(currentTime - unixTime);
      // Should be within reasonable range (allowing for some API delay)
      expect(timeDiff).toBeLessThan(60);
    }
  });

  test('should check if year is leap year', async () => {
    // Test with known leap year using API specification
    const response = await digiDatesApi.checkLeapYear(testData.leapYear);

    // Verify response using API specification method
    const isLeapYear = await digiDatesApi.verifyLeapYearResponse(response);
    
    // Validate that 2024 is correctly identified as leap year
    if (isLeapYear !== null) {
      expect(isLeapYear).toBe(true);
    }
    
    // Test with non-leap year
    const nonLeapResponse = await digiDatesApi.checkLeapYear(testData.nonLeapYear);
    const isNotLeapYear = await digiDatesApi.verifyLeapYearResponse(nonLeapResponse);
    
    // Validate that 2023 is correctly identified as non-leap year
    if (isNotLeapYear !== null) {
      expect(isNotLeapYear).toBe(false);
    }
  });

  test('should calculate age from birthdate', async () => {
    // Calculate age using API specification
    const response = await digiDatesApi.calculateAge(testData.birthDate);
    console.log('Age Calculation Response:', await response.json());
    // Verify response using API specification method
    const ageData = await digiDatesApi.verifyAgeResponse(response);
    
    // Additional validation - age should be reasonable
    if (ageData) {
      // Person born on 1990-01-01 should be around 34 years old (as of 2024)
      expect(ageData.age).toBeGreaterThan(30);
      expect(ageData.age).toBeLessThan(40);
      
      // If extended age data is present, validate structure
      if (ageData.ageextended) {
        expect(ageData.ageextended.years).toBe(ageData.age);
        expect(ageData.ageextended.months).toBeGreaterThanOrEqual(0);
        expect(ageData.ageextended.months).toBeLessThan(12);
        expect(ageData.ageextended.days).toBeGreaterThanOrEqual(0);
        expect(ageData.ageextended.days).toBeLessThan(32);
      }
    }
  });

});
