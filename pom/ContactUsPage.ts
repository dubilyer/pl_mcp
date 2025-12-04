import {expect, type Page, type Locator} from '@playwright/test';
import {BasePage} from '@/pom/BasePage';
import {EnvironmentFactory} from '@/config/env/EnvironmentFactory';

export class ContactUsPage extends BasePage {
    private pageTitle: Locator;
    private mainHeading: Locator;
    private mainDescription: Locator;
    private projectsExperience: Locator;
    private startJourneyHeading: Locator;
    private bookCallSection: Locator;
    private bookCallButton: Locator;
    private contactForm: Locator;
    private nameField: Locator;
    private emailField: Locator;
    private messageField: Locator;
    private submitButton: Locator;
    private contactInfo: Locator;
    private phoneNumber: Locator;
    private emailAddress: Locator;
    private address: Locator;
    private environment = EnvironmentFactory.create();

    constructor(page: Page) {
        super(page);

        // Header elements
        this.pageTitle = page.getByRole('heading', {name: /contact us/i});

        // Main content
        this.mainHeading = page.getByRole('heading', {name: /ready to ship with confidence/i});
        this.mainDescription = page.getByText('Whether you\'re dealing with flaky tests, slow release cycles, or scaling QA challenges');
        this.projectsExperience = page.getByText('We\'ve guided 80+ projects from chaos to confidence');

        // Call-to-action section
        this.startJourneyHeading = page.getByRole('heading', {name: /let's start the journey/i});
        this.bookCallSection = page.getByRole('heading', {name: /book a call/i});
        this.bookCallButton = page.getByRole('link', {name: /book.*call/i});

        // Contact form elements (if present)
        this.contactForm = page.getByRole('form');
        this.nameField = page.getByRole('textbox', {name: /name/i});
        this.emailField = page.getByRole('textbox', {name: /email/i});
        this.messageField = page.getByRole('textbox', {name: /message/i});
        this.submitButton = page.getByRole('button', {name: /submit/i});

        // Contact information
        this.contactInfo = page.getByRole('region', {name: /contact.*info/i});
        this.phoneNumber = page.getByRole('link', {name: /tel:/i});
        this.emailAddress = page.getByRole('link', {name: /mailto:/i});
        this.address = page.getByRole('region', {name: /address|location/i});
    }

    async navigate(): Promise<void> {
        await this.page.goto(`${this.environment.baseUrl}/contact-us/`);
        await this.waitForPageLoad();
    }

    async verifyPageTitle(): Promise<void> {
        await expect(this.page).toHaveTitle(/Contact|Skipper/);
    }

    async verifyPageHeading(): Promise<void> {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.mainHeading).toBeVisible();
    }

    async verifyBreadcrumb(): Promise<void> {
        await expect(this.homeLink).toBeVisible();
    }

    async verifyMainContent(): Promise<void> {
        await expect(this.mainDescription).toBeVisible();
        await expect(this.projectsExperience).toBeVisible();
    }

    async verifyCallToAction(): Promise<void> {
        await expect(this.startJourneyHeading).toBeVisible();
        await expect(this.bookCallSection).toBeVisible();
    }

    async clickBookCall(): Promise<void> {
        await this.bookCallButton.click();
    }

    async verifyContactForm(): Promise<void> {
        if (await this.contactForm.isVisible()) {
            await expect(this.contactForm).toBeVisible();
            await expect(this.nameField).toBeVisible();
            await expect(this.emailField).toBeVisible();
            await expect(this.messageField).toBeVisible();
            await expect(this.submitButton).toBeVisible();
        }
    }

    async fillContactForm(name: string, email: string, message: string): Promise<void> {
        if (await this.contactForm.isVisible()) {
            await this.nameField.fill(name);
            await this.emailField.fill(email);
            await this.messageField.fill(message);
        }
    }

    async submitContactForm(): Promise<void> {
        if (await this.contactForm.isVisible()) {
            await this.submitButton.click();
        }
    }

    async verifyContactInfo(): Promise<void> {
        // This will check if contact information is displayed (optional)
        if (await this.contactInfo.isVisible()) {
            await expect(this.contactInfo).toBeVisible();
        }
    }

    async verifyFullPage(): Promise<void> {
        await this.verifyPageTitle();
        await this.verifyPageHeading();
        await this.verifyBreadcrumb();
        await this.verifyMainContent();
        await this.verifyCallToAction();
        await this.verifyContactForm();
        await this.verifyContactInfo();
    }
}
