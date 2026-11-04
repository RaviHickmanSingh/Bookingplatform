import { type Page, type Locator , expect } from '@playwright/test';

class DashboardPage {
    readonly page: Page;
    readonly signOutButton: Locator;
    readonly bookButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
        this.bookButton = page.getByRole('link', { name: 'Book Now' });
    }

    async clickSignOut(){
        await this.signOutButton.click();
    }

    async clickBook(){
        await this.bookButton.click();
    }

     async checkLoggedIn(){
        await this.page.waitForLoadState();
        await expect(this.signOutButton).toBeVisible();
    }

    async dashCheckBooking(){
        await expect(this.page.getByText('Fri 27 NovRink 6 @ 16:00REQUESTED').first()).toBeVisible();
        await this.clickSignOut();
    }
}

export default DashboardPage;
