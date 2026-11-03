import { test, expect } from './fixtures';

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.waitForLoadState();
});

test.describe('Booking journey', { tag: '@smoke' }, () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    test('Booking journey', async ({ page, bookingPage }) => {
        await page.goto('/lakeview-bowls');
        await page.getByRole('link', { name: 'Book Now' }).click();
        await expect(page).toHaveURL('/dashboard/bookings');
        await bookingPage.doBooking('2026-11-27');
        await bookingPage.checkBooking();
    });
})