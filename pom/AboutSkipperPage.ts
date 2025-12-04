import {expect, type Page, type Locator} from '@playwright/test';
import {BasePage} from '@/pom/BasePage';
import {EnvironmentFactory} from '@/config/env/EnvironmentFactory';

export class AboutSkipperPage extends BasePage {
    private pageTitle: Locator;
    private meetSkipperSoftHeading: Locator;
    private mainTagline: Locator;
    private companyDescription: Locator;
    private yearsOfExperience: Locator;
    private yearsOfExperienceLabel: Locator;
    private aboutUsSection: Locator;
    private missionSection: Locator;
    private visionSection: Locator;
    private environment = EnvironmentFactory.create();

    constructor(page: Page) {
        super(page);

        // Header elements
        this.pageTitle = page.getByRole('heading', {name: /about skipper/i});

        // Main content
        this.meetSkipperSoftHeading = page.getByRole('heading', {name: /meet skipper soft/i});
        this.mainTagline = page.getByText('WE\'RE NOT JUST AUTOMATING TESTS — WE\'RE BUILDING CONFIDENCE.');
        this.companyDescription = page.getByText('We help fast-moving tech teams navigate the complexity of software quality');

        // Statistics section
        this.yearsOfExperience = page.getByText('12+');
        this.yearsOfExperienceLabel = page.getByText('years of expertise');

        // Mission and vision sections
        this.aboutUsSection = page.getByText('About us');
        this.missionSection = page.getByText('Our mission');
        this.visionSection = page.getByText('Our vision');
    }

    async navigate(): Promise<void> {
        await this.page.goto(`${this.environment.baseUrl}/about-skipper/`);
        await this.waitForPageLoad();
    }

    async verifyPageTitle(): Promise<void> {
        await expect(this.page).toHaveTitle(/About|Skipper/);
    }

    async verifyPageHeading(): Promise<void> {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.meetSkipperSoftHeading).toBeVisible();
    }

    async verifyBreadcrumb(): Promise<void> {
        await expect(this.homeLink).toBeVisible();
    }

    async verifyMainContent(): Promise<void> {
        await expect(this.mainTagline).toBeVisible();
        await expect(this.companyDescription).toBeVisible();
    }

    async verifyCompanyStatistics(): Promise<void> {
        await expect(this.yearsOfExperience).toBeVisible();
        await expect(this.yearsOfExperienceLabel).toBeVisible();
    }

    async verifyAboutUsSection(): Promise<void> {
        await expect(this.aboutUsSection).toBeVisible();
    }

    async verifyFullPage(): Promise<void> {
        await this.verifyPageTitle();
        await this.verifyPageHeading();
        await this.verifyBreadcrumb();
        await this.verifyMainContent();
        await this.verifyCompanyStatistics();
        await this.verifyAboutUsSection();
    }
}
