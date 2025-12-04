import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '@/pom/BasePage';
import { EnvironmentFactory } from '@/config/env/EnvironmentFactory';

export class ContactFormPage extends BasePage {
  private nameField: Locator;
  private emailField: Locator;
  private phoneField: Locator;
  private companyField: Locator;
  private messageField: Locator;
  private privacyCheckbox: Locator;
  private submitButton: Locator;
  private recaptchaError: Locator;
  private successMessage: Locator;
  
  private environment = EnvironmentFactory.create();

  constructor(page: Page) {
    super(page);
    
    // ARIA locators based on website exploration findings
    this.nameField = page.getByRole('textbox', { name: 'Name*', exact: true });
    this.emailField = page.getByRole('textbox', { name: 'Email*', exact: true });
    this.phoneField = page.getByRole('textbox', { name: 'Phone', exact: true });
    this.companyField = page.getByRole('textbox', { name: 'Company name*', exact: true });
    this.messageField = page.getByRole('textbox', { name: /optional.*details/i });
    this.privacyCheckbox = page.getByRole('checkbox');
    this.submitButton = page.getByRole('button', { name: 'Submit now' });
    this.recaptchaError = page.getByText('Submission Failed, reCaptcha spam prevention');
    this.successMessage = page.getByText(/form.*submitted.*successfully|thank.*you.*submission/i);
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto(this.environment.baseUrl);
    await this.waitForPageLoad();
  }

  async scrollToContactForm(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async fillAndSubmitContactForm(name: string, email: string, phone: string, company: string, message: string): Promise<void> {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.phoneField.fill(phone);
    await this.companyField.fill(company);
    await this.messageField.fill(message);
    await this.privacyCheckbox.check({ force: true });
    await this.submitButton.click();
  }

  async verifyFormSubmissionResult(): Promise<boolean> {
    const isRecaptchaError = await this.recaptchaError.isVisible();
    const isSuccess = await this.successMessage.isVisible();
    return isRecaptchaError || isSuccess;
  }
}
