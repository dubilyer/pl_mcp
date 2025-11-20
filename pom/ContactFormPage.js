import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ContactFormPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Contact form locators
    this.nameField = page.locator('input[name="Name"], input[placeholder*="Name"], input[aria-label*="Name"]').first();
    this.emailField = page.locator('input[name="Email"], input[type="email"], input[placeholder*="email"], input[aria-label*="Email"]').first();
    this.phoneField = page.locator('input[name="Phone"], input[type="tel"], input[placeholder*="phone"], input[aria-label*="Phone"]').first();
    this.companyField = page.locator('input[name="Company"], input[placeholder*="company"], input[aria-label*="Company"]').first();
    this.messageField = page.locator('textarea, input[name="Message"], [placeholder*="details"], [aria-label*="Message"]').first();
    this.privacyCheckbox = page.locator('input[type="checkbox"]').first();
    this.submitButton = page.getByText('Submit now');
    
    // Success and error messages
    this.successMessage = page.locator('.success-message, .form-success, [class*="success"]');
    this.errorMessage = page.locator('.error-message, .form-error, [class*="error"]');
    this.recaptchaError = page.getByText('Submission Failed, reCaptcha spam prevention');
    
    // Contact form section
    this.contactSection = page.locator('form, .contact-form, [class*="contact"]').first();
    this.bookCallSection = page.getByText('Book a Call');
  }

  async navigateToHomePage() {
    await this.page.goto('https://www.skipper-soft.com');
    await this.waitForPageLoad();
  }

  async scrollToContactForm() {
    // Scroll to the bottom of the page where the contact form is located
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    // Wait a moment for any animations and form to load
    await this.page.waitForTimeout(2000);
  }

  async fillContactForm(contactData) {
    // Fill name field
    await this.nameField.fill(contactData.name);
    
    // Fill email field
    await this.emailField.fill(contactData.email);
    
    // Fill phone field (optional)
    if (contactData.phone) {
      await this.phoneField.fill(contactData.phone);
    }
    
    // Fill company field
    await this.companyField.fill(contactData.company);
    
    // Fill message field (optional)
    if (contactData.message) {
      await this.messageField.fill(contactData.message);
    }
    
    // Check privacy policy checkbox
    await this.privacyCheckbox.check();
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async verifyFormFields() {
    await expect(this.nameField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.phoneField).toBeVisible();
    await expect(this.companyField).toBeVisible();
    await expect(this.messageField).toBeVisible();
    await expect(this.privacyCheckbox).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async verifySuccessMessage() {
    // Check for success indicators
    const hasSuccessMessage = await this.successMessage.isVisible();
    if (hasSuccessMessage) {
      await expect(this.successMessage).toBeVisible();
      return true;
    }
    return false;
  }

  async verifyRecaptchaError() {
    // Check for reCaptcha error (expected for automated tests)
    const hasRecaptchaError = await this.recaptchaError.isVisible();
    if (hasRecaptchaError) {
      await expect(this.recaptchaError).toBeVisible();
      return true;
    }
    return false;
  }

  async verifyFormSubmissionResponse() {
    // Wait for either success or error response
    await this.page.waitForTimeout(2000);
    
    const isSuccess = await this.verifySuccessMessage();
    const isRecaptchaError = await this.verifyRecaptchaError();
    
    // For automated tests, reCaptcha errors are expected and should pass
    if (isRecaptchaError) {
      console.log('✅ reCaptcha error detected - This is expected behavior for automated tests');
      return { isSuccess: false, isRecaptchaError: true, testPassed: true };
    }
    
    if (isSuccess) {
      console.log('✅ Form submitted successfully');
      return { isSuccess: true, isRecaptchaError: false, testPassed: true };
    }
    
    // If neither success nor reCaptcha error, the test should fail
    throw new Error('Form submission did not result in success or expected reCaptcha error');
  }

  generateTestContactData() {
    const timestamp = Date.now();
    return {
      name: `Test User ${timestamp}`,
      email: `test.user.${timestamp}@testautomation.com`,
      phone: '+1-555-TEST-001',
      company: `Test Automation Corp ${timestamp}`,
      message: `This is an automated test message generated at ${new Date().toISOString()}. Testing contact form functionality.`
    };
  }
}
