import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class SkipperHomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Main content locators specific to home page
    this.mainHeading = page.getByText('Boosting Quality Without Compromising Delivery');
    this.subHeading = page.getByText('PEOPLE. PROCESSES. TECHNOLOGIES.');
    this.frameworksText = page.getByText('Frameworks tailored to your stack');
    this.startJourneyButton = page.getByText('Start the Journey');
    
    // Statistics locators - Home page metrics
    this.stat50Percent = page.getByText('50%');
    this.escapeBerugsReduction = page.getByText('Reduction of Escape Bugs');
    this.stat30Percent = page.getByText('30%');
    this.rootCauseAnalysisTime = page.getByText('Decrease Root Cause Analysis Time');
    this.stat83Percent = page.getByText('83%');
    this.testExecutionTimeReduction = page.getByText('Reduction of Test Execution Time');
    this.fastSolutionDelivery = page.getByText('Fast Solution Delivery');
    this.threeWeeksText = page.getByText('3').first();
    this.weeksText = page.getByText('weeks');
    
    // Client logos section
    this.clientLogosSection = page.locator('.client-logos, .clients-section');
  }

  async navigate() {
    await this.page.goto('https://www.skipper-soft.com');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState();
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/Skipper/);
  }

  async verifyMainContent() {
    await expect(this.mainHeading).toBeVisible();
    await expect(this.startJourneyButton).toBeVisible();
    await expect(this.skipperLogo).toBeVisible();
  }

  async verifyStatistics() {
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

  async verifyDeliveryInfo() {
    await expect(this.fastSolutionDelivery).toBeVisible();
    await expect(this.threeWeeksText).toBeVisible();
  }

  async clickStartJourney() {
    await this.startJourneyButton.click();
  }

  async verifyFullPage() {
    await this.verifyPageTitle();
    await this.verifyMainContent();
    await this.verifyStatistics();
    await this.verifyDeliveryInfo();
  }
}
