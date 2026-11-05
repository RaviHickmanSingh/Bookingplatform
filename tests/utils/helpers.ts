import { faker } from '@faker-js/faker';

export const bookingHelper = {
    rink1 : {
        name: 'Book Rink 6 at 16:',
    }
}

export const bookingDateHelper = {
    date1: '2026-11-27',
    date2: '2025-05-05'
}

export const randomRegisterDetails = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    slug: 'lakeview-bowls'
}

// "full:test": "playwright test",
// "test:headed": "playwright test --headed",
// "test:debug": "playwright test --debug",
// "test:ui": "playwright test --ui",
// "test:smoke": "playwright test --grep @smoke",
// "test:failed": "playwright test --last-failed",
// "codegen": "playwright codegen",
// "report": "playwright show-report",