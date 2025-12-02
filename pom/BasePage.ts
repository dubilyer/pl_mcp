import { expect, type Page, type Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected skipperLogo: Locator;
  protected hamburgerMenuButton: Locator;
  protected navigationMenuOverlay: Locator;
  protected menuCloseButton: Locator;
  protected aboutSkipperLink: Locator;
  protected solutionsServicesLink: Locator;
  protected caseStudiesLink: Locator;
  protected careersLink: Locator;
  protected blogLink: Locator;
  protected contactUsLink: Locator;
  protected breadcrumb: Locator;
  protected homeLink: Locator;
  protected footer: Locator;
  protected footerLinks: Locator;
  protected accessibilityButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.skipperLogo = page.getByRole('img', { name: /skipper.*logo/i });
    this.hamburgerMenuButton = page.getByRole('button', { name: /menu|navigation/i });
    this.navigationMenuOverlay = page.getByRole('navigation');
    this.menuCloseButton = page.getByRole('button', { name: /close.*menu/i });
    
    this.aboutSkipperLink = page.getByRole('link', { name: /about.*skipper/i });
    this.solutionsServicesLink = page.getByRole('link', { name: /solutions.*services/i });
    this.caseStudiesLink = page.getByRole('link', { name: /case.*studies/i });
    this.careersLink = page.getByRole('link', { name: /careers/i });
    this.blogLink = page.getByRole('link', { name: /blog/i });
    this.contactUsLink = page.getByRole('link', { name: /contact.*us/i });
    
    this.breadcrumb = page.getByRole('navigation', { name: /breadcrumb/i });
    this.homeLink = page.getByRole('link', { name: /home/i });
    
    this.footer = page.getByRole('contentinfo');
    this.footerLinks = page.getByRole('contentinfo').getByRole('link');
    
    this.accessibilityButton = page.getByRole('button', { name: /accessibility/i });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openNavigationMenu(): Promise<void> {
    await this.hamburgerMenuButton.click();
  }

  async closeNavigationMenu(): Promise<void> {
    await this.menuCloseButton.click();
  }

  async navigateToHome(): Promise<void> {
    await this.skipperLogo.click();
  }

  async navigateToAbout(): Promise<void> {
    await this.openNavigationMenu();
    await this.aboutSkipperLink.click();
  }

  async navigateToServices(): Promise<void> {
    await this.openNavigationMenu();
    await this.solutionsServicesLink.click();
  }

  async navigateToContact(): Promise<void> {
    await this.openNavigationMenu();
    await this.contactUsLink.click();
  }

  async navigateToCaseStudies(): Promise<void> {
    await this.openNavigationMenu();
    await this.caseStudiesLink.click();
  }

  async navigateToCareers(): Promise<void> {
    await this.openNavigationMenu();
    await this.careersLink.click();
  }

  async navigateToBlog(): Promise<void> {
    await this.openNavigationMenu();
    await this.blogLink.click();
  }

  async verifyCommonHeader(): Promise<void> {
    await expect(this.skipperLogo).toBeVisible();
    await expect(this.hamburgerMenuButton).toBeVisible();
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
}
