import {faker} from '@faker-js/faker';

export interface CareerApplicationData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export function buildCareerApplication(overrides: Partial<CareerApplicationData> = {}): CareerApplicationData {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        message: faker.lorem.paragraph({min: 2, max: 4}),
        ...overrides,
    };
}
