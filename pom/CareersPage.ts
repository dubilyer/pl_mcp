import { expect, type Page, type Locator } from '@playwright/test';
import { BasePage } from '@/pom/BasePage';
import { EnvironmentFactory } from '@/config/env/EnvironmentFactory';

export class CareersPage extends BasePage {
  private mainHeading: Locator;
  private descriptionText: Locator;
  private readyToJoinHeading: Locator;
  
  // Job position toggles
  private seniorQAPosition: Locator;
  private frontEndDeveloperPosition: Locator;
  private infraDevelopmentLeadPosition: Locator;
  
  // Form fields - based on actual exploration
  private nameField: Locator;
  private emailField: Locator;
  private phoneField: Locator;
  private messageField: Locator;
  private submitButton: Locator;
  
  // Additional content
  private whatWeLookForSection: Locator;
  private technicalExcellenceText: Locator;
  private communicationSkillsText: Locator;
  private problemSolvingMindsetText: Locator;
  private continuousLearningText: Locator;
  
  private environment = EnvironmentFactory.create();

  constructor(page: Page) {
    super(page);
    
    // Main content locators - verified during exploration
    this.mainHeading = page.getByRole('heading', { name: /careers/i });
    this.descriptionText = page.getByText(/build the future of quality engineering/i);
    this.readyToJoinHeading = page.getByText('Ready to Join Our Crew?');
    
    // Job position toggles - observed during exploration
    this.seniorQAPosition = page.getByText('Senior – Mid QA Engineer');
    this.frontEndDeveloperPosition = page.getByText('Front-End Developer (React)');
    this.infraDevelopmentLeadPosition = page.getByText('Infra Development Team Lead');
    
    // Form fields - targeting the careers application form specifically by ID pattern
    this.nameField = page.locator('[id*="field1482"][data-label*="Name"]');
    this.emailField = page.locator('[id*="field1482"][data-label*="Email"]');
    this.phoneField = page.locator('[id*="field1482"][data-label*="Phone"]');
    this.messageField = page.locator('[id*="field1482"][data-label="Message"]');
    this.submitButton = page.locator('button:has-text("Submit")').first();
    
    // Additional content sections - verified during exploration
    this.whatWeLookForSection = page.getByText('What We Look For');
    this.technicalExcellenceText = page.getByText('Technical Excellence');
    this.communicationSkillsText = page.getByText('Communication Skills');
    this.problemSolvingMindsetText = page.getByText('Problem-Solving Mindset');
    this.continuousLearningText = page.getByText('Continuous Learning');
  }

  async navigate(): Promise<void> {
    await this.page.goto(`${this.environment.baseUrl}/careers`);
    await this.waitForPageLoad();
    // Wait for the specific careers form to be visible
    await this.readyToJoinHeading.waitFor({ state: 'visible' });
    // Scroll down to make sure the form is visible
    await this.readyToJoinHeading.scrollIntoViewIfNeeded();
  }

  async navigateFromHomePage(): Promise<void> {
    await this.navigate();
  }

  async verifyPageContent(): Promise<void> {
    await expect(this.mainHeading).toBeVisible();
    await expect(this.descriptionText).toBeVisible();
    await expect(this.readyToJoinHeading).toBeVisible();
  }

  async verifyJobPositions(): Promise<void> {
    await expect(this.seniorQAPosition).toBeVisible();
    await expect(this.frontEndDeveloperPosition).toBeVisible();
    await expect(this.infraDevelopmentLeadPosition).toBeVisible();
  }

  async selectJobPosition(position: 'senior-qa' | 'frontend-developer' | 'infra-lead'): Promise<void> {
    switch (position) {
      case 'senior-qa':
        await this.seniorQAPosition.click();
        break;
      case 'frontend-developer':
        await this.frontEndDeveloperPosition.click();
        break;
      case 'infra-lead':
        await this.infraDevelopmentLeadPosition.click();
        break;
    }
  }

  async fillApplicationForm(applicationData: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  }): Promise<void> {
    // Wait for form to be ready
    await this.nameField.waitFor({ state: 'visible' });
    
    // Clear and fill each field explicitly
    await this.nameField.clear();
    await this.nameField.fill(applicationData.name);
    
    await this.emailField.clear();
    await this.emailField.fill(applicationData.email);
    
    if (applicationData.phone) {
      await this.phoneField.clear();
      await this.phoneField.fill(applicationData.phone);
    }
    
    if (applicationData.message) {
      await this.messageField.clear();
      await this.messageField.fill(applicationData.message);
    }
  }

  async submitApplication(): Promise<void> {
    await this.submitButton.click();
  }

  async verifyFormFields(): Promise<void> {
    await expect(this.nameField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.phoneField).toBeVisible();
    await expect(this.messageField).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async verifyWhatWeLookForSection(): Promise<void> {
    await expect(this.whatWeLookForSection).toBeVisible();
    await expect(this.technicalExcellenceText).toBeVisible();
    await expect(this.communicationSkillsText).toBeVisible();
    await expect(this.problemSolvingMindsetText).toBeVisible();
    await expect(this.continuousLearningText).toBeVisible();
  }

  async verifyApplicationSubmitted(): Promise<void> {
    // Wait for success popup message after submission - using first() to avoid strict mode violation
    await expect(this.page.locator('text=Submission Success').first()).toBeVisible({ timeout: 10000 });
    await expect(this.page.locator('text=Thanks for getting in touch!').first()).toBeVisible();
  }
}
