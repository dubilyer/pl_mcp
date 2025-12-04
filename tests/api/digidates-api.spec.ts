import {test, expect} from '@playwright/test';
import {DigiDatesApi} from '@/api/DigiDatesApi';

const EXPECTED_CURRENT_TIME = Math.floor(Date.now() / 1000);
const EXPECTED_AGE_RANGE = {min: 30, max: 40} as const;
const TIME_TOLERANCE_SECONDS = 60;

test.describe('DigiDates API Tests', () => {
    test('User can retrieve unix timestamp, validate leap years, and calculate age from API', async ({request}) => {
        const api = new DigiDatesApi(request);
        const testData = api.generateTestData();

        const unixTime = await api.getUnixTimeAndValidate();
        const timeDiff = Math.abs(EXPECTED_CURRENT_TIME - unixTime);
        expect(timeDiff).toBeLessThan(TIME_TOLERANCE_SECONDS);

        const isLeapYear = await api.checkLeapYearAndValidate(testData.leapYear);
        expect(isLeapYear).toBe(true);

        const isNotLeapYear = await api.checkLeapYearAndValidate(testData.nonLeapYear);
        expect(isNotLeapYear).toBe(false);

        const ageData = await api.calculateAgeAndValidate(testData.birthDate);
        expect(ageData.age).toBeGreaterThan(EXPECTED_AGE_RANGE.min);
        expect(ageData.age).toBeLessThan(EXPECTED_AGE_RANGE.max);
    });
});
