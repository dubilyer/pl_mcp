import {test} from '@playwright/test';
import {CareersPage} from '@/pom/CareersPage';
import {buildCareerApplication} from '@/data/careerApplicationData';

test.describe('Skipper Careers Application', () => {
    test('User can navigate to careers page and submit application without file upload', async ({page}) => {
        const applicationData = buildCareerApplication({
            name: 'John Quality Engineer',
            email: 'john.qa@example.com',
            phone: '+1-555-123-4567',
            message: 'I am passionate about quality engineering and would love to join your team.',
        });

        const careersPage = new CareersPage(page);

        await careersPage.navigate();
        await careersPage.verifyPageContent();
        await careersPage.fillApplicationForm(applicationData);
        await careersPage.submitApplication();
        await careersPage.verifyApplicationSubmitted();
    });
});
