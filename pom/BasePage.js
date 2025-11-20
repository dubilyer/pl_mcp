import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
    
    // Common header elements across all pages
    this.skipperLogo = page.locator('[alt*="Skipper"], [src*="logo"], [class*="logo"], img[alt*="skipper" i]').first();
    this.hamburgerMenuButton = page.locator('button').last(); // The turquoise circular button in top right
    this.navigationMenuOverlay = page.locator('.menu-overlay, .navigation-menu');
    this.menuCloseButton = page.locator('button').filter({ hasText: '×' }).or(page.locator('.menu-close'));
    
    // Common navigation menu items
    this.aboutSkipperLink = page.getByText('About SKIPPER');
    this.solutionsServicesLink = page.getByText('Solutions / Services');
    this.caseStudiesLink = page.getByText('Case Studies');
    this.careersLink = page.getByText('Careers');
    this.blogLink = page.getByText('Blog');
    this.contactUsLink = page.getByText('Contact us');
    
    // Common breadcrumb elements
    this.breadcrumb = page.locator('.breadcrumb, nav[aria-label="breadcrumb"]');
    this.homeLink = page.getByText('Home');
    
    // Common footer elements (if present)
    this.footer = page.locator('footer');
    this.footerLinks = page.locator('footer a');
    
    // Accessibility elements
    this.accessibilityButton = page.locator('[aria-label*="accessibility"], .accessibility-button');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState();
  }

  async openNavigationMenu() {
    await this.hamburgerMenuButton.click();
  }

  async closeNavigationMenu() {
    // Close menu using the X button or click outside
    if (await this.menuCloseButton.isVisible()) {
      await this.menuCloseButton.click();
    } else {
      // Click outside the menu to close it
      await this.page.click('body', { position: { x: 50, y: 50 } });
    }
  }

  async navigateToHome() {
    await this.skipperLogo.click();
  }

  async navigateToAbout() {
    await this.openNavigationMenu();
    await this.aboutSkipperLink.click();
  }

  async navigateToServices() {
    await this.openNavigationMenu();
    await this.solutionsServicesLink.click();
  }

  async navigateToContact() {
    await this.openNavigationMenu();
    await this.contactUsLink.click();
  }

  async navigateToCaseStudies() {
    await this.openNavigationMenu();
    await this.caseStudiesLink.click();
  }

  async navigateToCareers() {
    await this.openNavigationMenu();
    await this.careersLink.click();
  }

  async navigateToBlog() {
    await this.openNavigationMenu();
    await this.blogLink.click();
  }

  async verifyCommonHeader() {
    await expect(this.skipperLogo).toBeVisible();
    await expect(this.hamburgerMenuButton).toBeVisible();
  }

  async verifyNavigationMenuItems() {
    await this.openNavigationMenu();
    await expect(this.aboutSkipperLink).toBeVisible();
    await expect(this.solutionsServicesLink).toBeVisible();
    await expect(this.caseStudiesLink).toBeVisible();
    await expect(this.careersLink).toBeVisible();
    await expect(this.blogLink).toBeVisible();
    await expect(this.contactUsLink).toBeVisible();
  }

  async verifyBreadcrumb() {
    if (await this.breadcrumb.isVisible()) {
      await expect(this.breadcrumb).toBeVisible();
      await expect(this.homeLink).toBeVisible();
    }
  }

  async verifyFooter() {
    if (await this.footer.isVisible()) {
      await expect(this.footer).toBeVisible();
    }
  }

  async scrollToTop() {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async scrollToElement(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async verifyPageResponsiveness() {
    // Test mobile viewport
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.verifyCommonHeader();
    
    // Test tablet viewport
    await this.page.setViewportSize({ width: 768, height: 1024 });
    await this.verifyCommonHeader();
    
    // Reset to desktop
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.verifyCommonHeader();
  }
}
