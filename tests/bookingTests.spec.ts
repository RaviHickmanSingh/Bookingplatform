import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../tests/pages/home-page';
import BookingPage from '../tests/pages/booking-page';


let homePage: HomePage;
let bookingPage: BookingPage;

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.waitForLoadState();
    homePage = new HomePage(page);
    bookingPage = new BookingPage(page);
});

async function submitBooking(page:Page, date = '2026-11-27'){
    await page.goto('/lakeview-bowls');
    await page.getByRole('link', { name: 'Book Now' }).click();
    await bookingPage.doBooking(date);
};

async function fullCheckBooking(page:Page){
    await bookingPage.checkBooking();
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page.getByText('Fri 27 NovRink 6 @ 16:00REQUESTED').first()).toBeVisible();
    await page.getByRole('button', { name: 'Sign Out' }).click();
};

test.describe('Booking journey', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    test('Booking journey', async ({ page }) => {
        await page.goto('/lakeview-bowls');
        await page.getByRole('link', { name: 'Book Now' }).click();
        await bookingPage.doBooking('2026-11-27');
        await bookingPage.checkBooking();
    });
})