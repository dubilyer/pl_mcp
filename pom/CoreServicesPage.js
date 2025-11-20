import { expect } from '@playwright/test';

export class CoreServicesPage {
  constructor(page) {
    this.page = page;
    
    // Header elements
    this.pageTitle = page.getByText('Core Services');
    this.breadcrumb = page.locator('.breadcrumb, nav[aria-label="breadcrumb"]');
    this.homeLink = page.getByText('Home');
    
    // Main content
    this.mainDescription = page.getByText('AT SKIPPER SOFT, WE DELIVER SCALABLE, HIGH-IMPACT QA AND AUTOMATION SOLUTIONS TAILORED TO YOUR NEEDS');
    this.subDescription = page.getByText('Helping tech teams deliver faster, safer, and with confidence – from QA strategy to full automation');
    
    // Service sections
    this.qualityEngineeringSection = page.getByText('Quality Engineering');
    this.qualityEngineeringDescription = page.getByText('We establish QA architecture, metrics, and planning to remove bottlenecks');
    this.qualityEngineeringImpact = page.getByText('Release risk reduced by 60%');
    
    this.testAutomationSection = page.getByText('Test Automation');
    this.testAutomationDescription = page.getByText('We design and build scalable automation frameworks');
    this.testAutomationImpact = page.getByText('Regression time cut by 50%');
    
    this.performanceTestingSection = page.getByText('Performance Testing');
    this.performanceTestingDescription = page.getByText('We simulate both real-world and extreme load conditions');
    this.performanceTestingImpact = page.getByText('Peak load capacity improved by 45%');
    
    this.cicdIntegrationSection = page.getByText('CI/CD Integration');
    this.cicdIntegrationDescription = page.getByText('We optimize and integrate continuous testing into your delivery pipeline');
    this.cicdIntegrationImpact = page.getByText('Deployment speed improved by 50%');
    
    this.qaAgentsSection = page.getByText('QA Agents (AI-Powered)');
    this.qaAgentsDescription = page.getByText('Our AI agents help QA engineers work 2-3x faster');
    this.qaAgentsImpact = page.getByText('Test creation time reduced by 35%');
    
    this.additionalServicesSection = page.getByText('Additional Services');
    this.additionalServicesDescription = page.getByText('We upgrade your QA team\'s approach with hands-on workshops');
    
    // Statistical elements
    this.stat60Percent = page.getByText('60%');
    this.stat50Percent = page.getByText('50%');
    this.stat45Percent = page.getByText('45%');
    this.stat35Percent = page.getByText('35%');
    this.stat70Percent = page.getByText('70%');
  }

  async navigate() {
    await this.page.goto('https://www.skipper-soft.com/solutions-services/');
  }

  async navigateFromHome(homePage) {
    await homePage.navigateToServices();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState();
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/Core Services|Services|Skipper/);
  }

  async verifyPageHeading() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.mainDescription).toBeVisible();
  }

  async verifyBreadcrumb() {
    await expect(this.homeLink).toBeVisible();
  }

  async verifyQualityEngineeringService() {
    await expect(this.qualityEngineeringSection).toBeVisible();
    await expect(this.qualityEngineeringDescription).toBeVisible();
    await expect(this.qualityEngineeringImpact).toBeVisible();
  }

  async verifyTestAutomationService() {
    await expect(this.testAutomationSection).toBeVisible();
    await expect(this.testAutomationDescription).toBeVisible();
    await expect(this.testAutomationImpact).toBeVisible();
  }

  async verifyPerformanceTestingService() {
    await expect(this.performanceTestingSection).toBeVisible();
    await expect(this.performanceTestingDescription).toBeVisible();
    await expect(this.performanceTestingImpact).toBeVisible();
  }

  async verifyCICDIntegrationService() {
    await expect(this.cicdIntegrationSection).toBeVisible();
    await expect(this.cicdIntegrationDescription).toBeVisible();
    await expect(this.cicdIntegrationImpact).toBeVisible();
  }

  async verifyQAAgentsService() {
    await expect(this.qaAgentsSection).toBeVisible();
    await expect(this.qaAgentsDescription).toBeVisible();
    await expect(this.qaAgentsImpact).toBeVisible();
  }

  async verifyAdditionalServices() {
    await expect(this.additionalServicesSection).toBeVisible();
    await expect(this.additionalServicesDescription).toBeVisible();
  }

  async verifyAllServices() {
    await this.verifyQualityEngineeringService();
    await this.verifyTestAutomationService();
    await this.verifyPerformanceTestingService();
    await this.verifyCICDIntegrationService();
    await this.verifyQAAgentsService();
    await this.verifyAdditionalServices();
  }

  async verifyServiceStatistics() {
    await expect(this.stat60Percent).toBeVisible();
    await expect(this.stat50Percent).toBeVisible();
    await expect(this.stat45Percent).toBeVisible();
    await expect(this.stat35Percent).toBeVisible();
  }

  async verifyFullPage() {
    await this.verifyPageTitle();
    await this.verifyPageHeading();
    await this.verifyBreadcrumb();
    await this.verifyAllServices();
    await this.verifyServiceStatistics();
  }
}
