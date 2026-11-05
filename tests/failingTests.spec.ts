//DEF-002 booking a rink in the past 
//DEF-007 registering without a club-slug

import { test, expect } from './utils/fixtures';
import { routes } from './utils/routes';
import { bookingDateHelper } from './utils/helpers';
import { faker } from '@faker-js/faker';

test.describe('Booking in the past', { tag: '@defect',
    annotation: {
        type: 'defect',
        description: 'DEF-002 booking a rink in the past'
    }
}, () => {
    test.beforeEach(async ({ page, dashboardPage }) => {
        await page.goto(routes.lakeview);
        await dashboardPage.clickBook();
    });
    test.use({ storageState: 'playwright/.auth/user.json' });
    test('Booking journey past', async ({ page, bookingPage }) => {
        await expect(page).toHaveURL(routes.bookings);
        await bookingPage.doBooking(bookingDateHelper.date2);
        await expect(page.getByText('Booking date cannot be in the past')).toBeVisible();
    });
})

test.describe('Registering without a slug', { tag: '@defect',
    annotation: {
        type: 'defect',
        description: 'DEF-007 Registering without a slug - dashboard does not show up '
    }
}, () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test.beforeEach(async ({ page}) => {
        await page.goto(routes.home);
        await page.waitForLoadState();
    });
    test('Register no slug', async ({ page, homePage, registerPage, loginPage }) => {
        const regEmail = faker.internet.email();
        const regPassword = faker.internet.password();
        await homePage.clickRegisterButton();
        await registerPage.fillRegisterNoSlug(regEmail, regPassword);
        await registerPage.clickRegister();
        await loginPage.doLogin(regEmail, regPassword);
        await page.getByRole('button', { name: 'L Lakeview Bowls Club Act as' }).click();
        await expect(page).toHaveURL(routes.lakeview);
    });
})

