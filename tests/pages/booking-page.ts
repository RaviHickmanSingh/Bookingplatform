import { type Page, type Locator , expect } from '@playwright/test';

class BookingPage {
    readonly page: Page;
    readonly dateSelect: Locator;
    readonly bookingSelect: Locator;
    readonly bookingRequest: Locator;
    readonly dashboardNav: Locator;
    readonly bookings: Locator;
    private bookingCount = 0;

    constructor(page:Page){
        this.page = page;
        this.dateSelect = page.locator('input[type="date"]');
        this.bookingSelect = page.getByRole('button', { name: 'Book Rink 6 at 16:' });
        this.bookingRequest = page.getByRole('button', { name: 'Request Booking' });
        this.dashboardNav = page.getByRole('link', { name: 'Dashboard' })
        this.bookings = page.getByTestId('booking-item');
    }
    async fillDate(date: string) {
        await this.dateSelect.fill(date);
    }

    async doBooking(date: string) {
        await this.fillDate(date);
        await this.bookingSelect.click();
        await this.page.waitForLoadState();
        this.bookingCount = await this.bookings.count();
        await this.bookingRequest.click();    
    }
    async checkBooking() {
        await this.page.waitForLoadState();
        await expect(this.bookings).toHaveCount(this.bookingCount + 1);
        await this.page.getByRole('link', { name: 'Dashboard' }).click();
        await expect(this.page.getByText('Fri 27 NovRink 6 @ 16:00REQUESTED').first()).toBeVisible();
        await this.page.getByRole('button', { name: 'Sign Out' }).click();
    }
}

export default BookingPage;
