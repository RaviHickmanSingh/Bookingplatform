import { type Page, type Locator , expect } from '@playwright/test';
import { bookingHelper } from '../utils/helpers';

class BookingPage {
    readonly page: Page;
    readonly dateSelect: Locator;
    readonly bookingSelect: Locator;
    readonly bookingRequest: Locator;
    readonly dashboardNav: Locator;
    readonly bookings: Locator;
    readonly confirmationMessage: Locator;
    private bookingCount = 0;

    constructor(page:Page){
        this.page = page;
        this.dateSelect = page.locator('input[type="date"]');
        this.bookingSelect = page.getByRole('button', { name: bookingHelper.rink1.name});
        this.bookingRequest = page.getByRole('button', { name: 'Request Booking' });
        this.dashboardNav = page.getByRole('link', { name: 'Dashboard' })
        this.bookings = page.getByTestId('booking-item');
        this.confirmationMessage = page.getByText('Booking requested for you')
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

    async gotoDashboard(){
        await this.dashboardNav.click();
    }
    
    async checkBooking() {
        await this.page.waitForLoadState();
        await expect(this.bookings).toHaveCount(this.bookingCount + 1);
        await expect(this.confirmationMessage).toBeVisible();
    }
}

export default BookingPage;
