import { expect } from '@playwright/test';

export class ContactUsPage {
  constructor(page) {
    this.page = page;
    
    // Header elements
    this.pageTitle = page.getByText('Contact us');
    this.breadcrumb = page.locator('.breadcrumb, nav[aria-label="breadcrumb"]');
    this.homeLink = page.getByText('Home');
    
    // Main content
    this.mainHeading = page.getByText('Ready to Ship with Confidence? Let\'s talk about transforming your QA from bottleneck to accelerator.');
    this.mainDescription = page.getByText('Whether you\'re dealing with flaky tests, slow release cycles, or scaling QA challenges');
    this.projectsExperience = page.getByText('We\'ve guided 80+ projects from chaos to confidence');
    
    // Call-to-action section
    this.startJourneyHeading = page.getByText('LET\'S START THE JOURNEY!');
    this.bookCallSection = page.getByText('Book a Call');
    this.bookCallButton = page.locator('button, a').filter({ hasText: 'Book a Call' });
    
    // Contact form elements (if present)
    this.contactForm = page.locator('form, .contact-form');
    this.nameField = page.locator('input[name="name"], input[placeholder*="name" i]');
    this.emailField = page.locator('input[name="email"], input[type="email"]');
    this.messageField = page.locator('textarea[name="message"], textarea[placeholder*="message" i]');
    this.submitButton = page.locator('button[type="submit"], input[type="submit"]');
    
    // Contact information
    this.contactInfo = page.locator('.contact-info, .contact-details');
    this.phoneNumber = page.locator('.phone, [href^="tel:"]');
    this.emailAddress = page.locator('.email, [href^="mailto:"]');
    this.address = page.locator('.address, .location');
  }

  async navigate() {
    await this.page.goto('https://www.skipper-soft.com/contact-us/');
  }

  async navigateFromHome(homePage) {
    await homePage.navigateToContact();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/Contact|Skipper/);
  }

  async verifyPageHeading() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.mainHeading).toBeVisible();
  }

  async verifyBreadcrumb() {
    await expect(this.homeLink).toBeVisible();
  }

  async verifyMainContent() {
    await expect(this.mainDescription).toBeVisible();
    await expect(this.projectsExperience).toBeVisible();
  }

  async verifyCallToAction() {
    await expect(this.startJourneyHeading).toBeVisible();
    await expect(this.bookCallSection).toBeVisible();
  }

  async clickBookCall() {
    await this.bookCallButton.click();
  }

  async verifyContactForm() {
    if (await this.contactForm.isVisible()) {
      await expect(this.contactForm).toBeVisible();
      await expect(this.nameField).toBeVisible();
      await expect(this.emailField).toBeVisible();
      await expect(this.messageField).toBeVisible();
      await expect(this.submitButton).toBeVisible();
    }
  }

  async fillContactForm(name, email, message) {
    if (await this.contactForm.isVisible()) {
      await this.nameField.fill(name);
      await this.emailField.fill(email);
      await this.messageField.fill(message);
    }
  }

  async submitContactForm() {
    if (await this.contactForm.isVisible()) {
      await this.submitButton.click();
    }
  }

  async verifyContactInfo() {
    // This will check if contact information is displayed (optional)
    if (await this.contactInfo.isVisible()) {
      await expect(this.contactInfo).toBeVisible();
    }
  }

  async scrollToBottomOfPage() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async verifyFullPage() {
    await this.verifyPageTitle();
    await this.verifyPageHeading();
    await this.verifyBreadcrumb();
    await this.verifyMainContent();
    await this.verifyCallToAction();
    await this.verifyContactForm();
    await this.verifyContactInfo();
  }
}
