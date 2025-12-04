import {test, expect} from '@playwright/test';
import {ContactFormPage} from '@/pom/ContactFormPage';
import {buildContactFormSubmission} from '@/data/contactFormData';

test.describe('Skipper Soft Contact Form', () => {
    test('Robot cannot submit contact form and receive reCaptcha response', async ({page}) => {
        const contactFormPage = new ContactFormPage(page);
        const formData = buildContactFormSubmission();

        await contactFormPage.navigateToHomePage();
        await contactFormPage.scrollToContactForm();
        await contactFormPage.fillAndSubmitContactForm(
            formData.name,
            formData.email,
            formData.phone,
            formData.company,
            formData.message,
        );

        const submissionSuccessful = await contactFormPage.verifyFormSubmissionResult();
        expect(submissionSuccessful).toBe(false);
    });
});
