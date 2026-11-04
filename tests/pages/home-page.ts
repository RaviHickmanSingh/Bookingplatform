import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page:Page;
    readonly loginButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('link', { name: 'Sign In' });
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }
}

export default HomePage;