import { test, expect } from './fixtures';

test.beforeEach(async ({ page, dashboardPage }) => {
    await page.goto('/lakeview-bowls');
    await dashboardPage.clickBook();
});

test.describe('Booking journey', { tag: '@smoke' }, () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    test('Booking journey', async ({ page, bookingPage, dashboardPage }) => {
        await expect(page).toHaveURL('/dashboard/bookings');
        await bookingPage.doBooking('2026-11-27');
        await bookingPage.checkBooking();
        await dashboardPage.dashCheckBooking();
    });
})