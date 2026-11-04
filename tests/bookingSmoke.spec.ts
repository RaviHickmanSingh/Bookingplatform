import { test, expect } from './fixtures';
import { routes } from './utils/routes';

test.beforeEach(async ({ page, dashboardPage }) => {
    await page.goto(routes.lakeview);
    await dashboardPage.clickBook();
});

test.describe('Booking journey', { tag: '@smoke' }, () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    test('Booking journey', async ({ page, bookingPage, dashboardPage }) => {
        await expect(page).toHaveURL(routes.bookings);
        await bookingPage.doBooking('2026-11-27');
        await bookingPage.checkBooking();
        await dashboardPage.dashCheckBooking();
    });
})