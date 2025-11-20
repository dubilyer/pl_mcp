import { test, expect } from '@playwright/test';
import { ContactFormPage } from '../pom/ContactFormPage.js';

test.describe('Skipper Soft Contact Form Tests', () => {
  test('should navigate to homepage, fill contact form with valid data, and validate submission', async ({ page }) => {
    const contactFormPage = new ContactFormPage(page);
    
    // Navigate to Skipper Soft homepage
    await contactFormPage.navigateToHomePage();
    
    // Scroll down to contact form section
    await contactFormPage.scrollToContactForm();
    
    // Generate unique test data
    const testContactData = contactFormPage.generateTestContactData();
    
    // Fill out the contact form
    await contactFormPage.fillContactForm(testContactData);
    
    // Submit the form
    await contactFormPage.submitForm();
    
    // Verify form submission response (passes for both success and reCaptcha errors)
    const submissionResult = await contactFormPage.verifyFormSubmissionResponse();
    expect(submissionResult.testPassed).toBe(true);
  });
});
