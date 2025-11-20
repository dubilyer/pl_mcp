import { expect } from '@playwright/test';

export class AboutSkipperPage {
  constructor(page) {
    this.page = page;
    
    // Header elements
    this.pageTitle = page.getByText('About SKIPPER');
    this.breadcrumb = page.locator('.breadcrumb, nav[aria-label="breadcrumb"]');
    this.homeLink = page.getByText('Home');
    
    // Main content
    this.meetSkipperSoftHeading = page.getByText('Meet Skipper Soft');
    this.mainTagline = page.getByText('WE\'RE NOT JUST AUTOMATING TESTS — WE\'RE BUILDING CONFIDENCE.');
    this.companyDescription = page.getByText('We help fast-moving tech teams navigate the complexity of software quality');
    
    // Statistics section
    this.yearsOfExperience = page.getByText('12+');
    this.yearsOfExperienceLabel = page.getByText('years of expertise');
    
    // About us section
    this.aboutUsSection = page.getByText('About us');
    this.aboutUsImages = page.locator('.about-images, .company-images');
    
    // Values/Mission sections (if present)
    this.valuesSection = page.locator('.values-section, .mission-section');
    this.teamSection = page.locator('.team-section, .our-team');
  }

  async navigate() {
    await this.page.goto('https://www.skipper-soft.com/about-skipper/');
  }

  async navigateFromHome(homePage) {
    await homePage.navigateToAbout();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(/About|Skipper/);
  }

  async verifyPageHeading() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.meetSkipperSoftHeading).toBeVisible();
  }

  async verifyBreadcrumb() {
    await expect(this.homeLink).toBeVisible();
  }

  async verifyMainContent() {
    await expect(this.mainTagline).toBeVisible();
    await expect(this.companyDescription).toBeVisible();
  }

  async verifyCompanyStatistics() {
    await expect(this.yearsOfExperience).toBeVisible();
    await expect(this.yearsOfExperienceLabel).toBeVisible();
  }

  async verifyAboutUsSection() {
    await expect(this.aboutUsSection).toBeVisible();
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
    await this.verifyCompanyStatistics();
    await this.verifyAboutUsSection();
  }
}
