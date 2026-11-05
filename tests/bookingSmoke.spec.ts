import { test, expect } from './fixtures';
import { routes } from './utils/routes';
import { bookingDateHelper } from './utils/helpers';

test.beforeEach(async ({ page, dashboardPage }) => {
    await page.goto(routes.lakeview);
    await dashboardPage.clickBook();
});

test.describe('Booking journey', { tag: '@smoke' }, () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    test('Booking journey', async ({ page, bookingPage }) => {
        await expect(page).toHaveURL(routes.bookings);
        await bookingPage.doBooking(bookingDateHelper.date1);
        await bookingPage.checkBooking();
    });
})