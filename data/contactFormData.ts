import {faker} from '@faker-js/faker';

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
}

export function buildContactFormSubmission(overrides: Partial<ContactFormData> = {}): ContactFormData {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        company: faker.company.name(),
        message: faker.lorem.paragraph({min: 2, max: 4}),
        ...overrides,
    };
}
