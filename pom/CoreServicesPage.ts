import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from '@/pom/BasePage';

export class CoreServicesPage extends BasePage {
  private pageTitle: Locator;
  private mainDescription: Locator;
  private subDescription: Locator;
  private qualityEngineeringSection: Locator;
  private qualityEngineeringDescription: Locator;
  private qualityEngineeringImpact: Locator;
  private testAutomationSection: Locator;
  private testAutomationDescription: Locator;
  private testAutomationImpact: Locator;
  private performanceTestingSection: Locator;
  private performanceTestingDescription: Locator;
  private performanceTestingImpact: Locator;
  private cicdIntegrationSection: Locator;
  private cicdIntegrationDescription: Locator;
  private cicdIntegrationImpact: Locator;
  private qaAgentsSection: Locator;
  private qaAgentsDescription: Locator;
  private qaAgentsImpact: Locator;
  private additionalServicesSection: Locator;
  private additionalServicesDescription: Locator;
  private stat60Percent: Locator;
  private stat50Percent: Locator;
  private stat45Percent: Locator;
  private stat35Percent: Locator;
  private stat70Percent: Locator;

  constructor(page: Page) {
    super(page);
    
    // Header elements
    this.pageTitle = page.getByRole('heading', { name: /core services/i });
    
    // Main content - long text broken into parts for better matching
    this.mainDescription = page.getByText('AT SKIPPER SOFT, WE DELIVER SCALABLE, HIGH-IMPACT QA AND AUTOMATION SOLUTIONS', { exact: false });
    this.subDescription = page.getByText('Helping tech teams deliver faster, safer, and with confidence');
    
    // Service sections - using heading roles
    this.qualityEngineeringSection = page.getByRole('heading', { name: /quality engineering/i });
    this.qualityEngineeringDescription = page.getByText('We establish QA architecture, metrics, and planning');
    this.qualityEngineeringImpact = page.getByText('Release risk reduced by 60%');
    
    this.testAutomationSection = page.getByRole('heading', { name: /test automation/i });
    this.testAutomationDescription = page.getByText('We design and build scalable automation frameworks');
    this.testAutomationImpact = page.getByText('Regression time cut by 50%');
    
    this.performanceTestingSection = page.getByRole('heading', { name: /performance testing/i });
    this.performanceTestingDescription = page.getByText('We simulate both real-world and extreme load conditions');
    this.performanceTestingImpact = page.getByText('Peak load capacity improved by 45%');
    
    this.cicdIntegrationSection = page.getByRole('heading', { name: /ci\/cd integration/i });
    this.cicdIntegrationDescription = page.getByText('We optimize and integrate continuous testing into your delivery pipeline');
    this.cicdIntegrationImpact = page.getByText('Deployment speed improved by 50%');
    
    this.qaAgentsSection = page.getByRole('heading', { name: /qa agents.*ai.*powered/i });
    this.qaAgentsDescription = page.getByText('Our AI agents help QA engineers work 2-3x faster');
    this.qaAgentsImpact = page.getByText('Test creation time reduced by 35%');
    
    this.additionalServicesSection = page.getByRole('heading', { name: /additional services/i });
    this.additionalServicesDescription = page.getByText('We upgrade your QA team\'s approach with hands-on workshops');
    
    // Statistical elements
    this.stat60Percent = page.getByText('60%');
    this.stat50Percent = page.getByText('50%');
    this.stat45Percent = page.getByText('45%');
    this.stat35Percent = page.getByText('35%');
    this.stat70Percent = page.getByText('70%');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.skipper-soft.com/solutions-services/');
    await this.waitForPageLoad();
  }

  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/Core Services|Services|Skipper/);
  }

  async verifyPageHeading(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.mainDescription).toBeVisible();
  }

  async verifyBreadcrumb(): Promise<void> {
    await expect(this.homeLink).toBeVisible();
  }

  async verifyQualityEngineeringService(): Promise<void> {
    await expect(this.qualityEngineeringSection).toBeVisible();
    await expect(this.qualityEngineeringDescription).toBeVisible();
    await expect(this.qualityEngineeringImpact).toBeVisible();
  }

  async verifyTestAutomationService(): Promise<void> {
    await expect(this.testAutomationSection).toBeVisible();
    await expect(this.testAutomationDescription).toBeVisible();
    await expect(this.testAutomationImpact).toBeVisible();
  }

  async verifyPerformanceTestingService(): Promise<void> {
    await expect(this.performanceTestingSection).toBeVisible();
    await expect(this.performanceTestingDescription).toBeVisible();
    await expect(this.performanceTestingImpact).toBeVisible();
  }

  async verifyCICDIntegrationService(): Promise<void> {
    await expect(this.cicdIntegrationSection).toBeVisible();
    await expect(this.cicdIntegrationDescription).toBeVisible();
    await expect(this.cicdIntegrationImpact).toBeVisible();
  }

  async verifyQAAgentsService(): Promise<void> {
    await expect(this.qaAgentsSection).toBeVisible();
    await expect(this.qaAgentsDescription).toBeVisible();
    await expect(this.qaAgentsImpact).toBeVisible();
  }

  async verifyAdditionalServices(): Promise<void> {
    await expect(this.additionalServicesSection).toBeVisible();
    await expect(this.additionalServicesDescription).toBeVisible();
  }

  async verifyAllServices(): Promise<void> {
    await this.verifyQualityEngineeringService();
    await this.verifyTestAutomationService();
    await this.verifyPerformanceTestingService();
    await this.verifyCICDIntegrationService();
    await this.verifyQAAgentsService();
    await this.verifyAdditionalServices();
  }

  async verifyServiceStatistics(): Promise<void> {
    await expect(this.stat60Percent).toBeVisible();
    await expect(this.stat50Percent).toBeVisible();
    await expect(this.stat45Percent).toBeVisible();
    await expect(this.stat35Percent).toBeVisible();
  }

  async verifyFullPage(): Promise<void> {
    await this.verifyPageTitle();
    await this.verifyPageHeading();
    await this.verifyBreadcrumb();
    await this.verifyAllServices();
    await this.verifyServiceStatistics();
  }
}
