import { test, expect, type Page } from '@playwright/test';
import { HomePage } from './pages/home-page';
import BookingPage from './pages/booking-page';


let homePage: HomePage;
let bookingPage: BookingPage;

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.waitForLoadState();
    homePage = new HomePage(page);
    bookingPage = new BookingPage(page);
});

test.describe('Booking journey', { tag: '@smoke' }, () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    test('Booking journey', async ({ page }) => {
        await page.goto('/lakeview-bowls');
        await page.getByRole('link', { name: 'Book Now' }).click();
        await expect(page).toHaveURL('/dashboard/bookings');
        await bookingPage.doBooking('2026-11-27');
        await bookingPage.checkBooking();
    });
})