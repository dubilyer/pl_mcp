import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from '@/pom/BasePage';

export class SkipperHomePage extends BasePage {
  private mainHeading: Locator;
  private subHeading: Locator;
  private frameworksText: Locator;
  private startJourneyButton: Locator;
  private stat50Percent: Locator;
  private escapeBerugsReduction: Locator;
  private stat30Percent: Locator;
  private rootCauseAnalysisTime: Locator;
  private stat83Percent: Locator;
  private testExecutionTimeReduction: Locator;
  private fastSolutionDelivery: Locator;
  private deliveryTimeframe: Locator;

  constructor(page: Page) {
    super(page);
    
    // Main content locators specific to home page
    this.mainHeading = page.getByRole('heading', { name: /boosting quality without compromising delivery/i });
    this.subHeading = page.getByText('PEOPLE. PROCESSES. TECHNOLOGIES.');
    this.frameworksText = page.getByText('Frameworks tailored to your stack');
    this.startJourneyButton = page.getByRole('link', { name: /start the journey/i });
    
    // Statistics locators - Home page metrics
    this.stat50Percent = page.getByText('50%');
    this.escapeBerugsReduction = page.getByText('Reduction of Escape Bugs');
    this.stat30Percent = page.getByText('30%');
    this.rootCauseAnalysisTime = page.getByText('Decrease Root Cause Analysis Time');
    this.stat83Percent = page.getByText('83%');
    this.testExecutionTimeReduction = page.getByText('Reduction of Test Execution Time');
    this.fastSolutionDelivery = page.getByText('Fast Solution Delivery');
    this.deliveryTimeframe = page.getByText('3 weeks', { exact: false });
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.skipper-soft.com');
    await this.waitForPageLoad();
  }

  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/Skipper/);
  }

  async verifyMainContent(): Promise<void> {
    await expect(this.mainHeading).toBeVisible();
    await expect(this.startJourneyButton).toBeVisible();
    await expect(this.skipperLogo).toBeVisible();
  }

  async verifyStatistics(): Promise<void> {
    // Verify 50% statistics
    await expect(this.stat50Percent).toBeVisible();
    await expect(this.escapeBerugsReduction).toBeVisible();
    
    // Verify 30% statistics
    await expect(this.stat30Percent).toBeVisible();
    await expect(this.rootCauseAnalysisTime).toBeVisible();
    
    // Verify 83% statistics
    await expect(this.stat83Percent).toBeVisible();
    await expect(this.testExecutionTimeReduction).toBeVisible();
  }

  async verifyDeliveryInfo(): Promise<void> {
    await expect(this.fastSolutionDelivery).toBeVisible();
    await expect(this.deliveryTimeframe).toBeVisible();
  }

  async clickStartJourney(): Promise<void> {
    await this.startJourneyButton.click();
  }

  async verifyFullPage(): Promise<void> {
    await this.verifyPageTitle();
    await this.verifyMainContent();
    await this.verifyStatistics();
    await this.verifyDeliveryInfo();
  }
}
