import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
    readonly page:Page;
    readonly loginButton: Locator;
    readonly lakeviewLink: Locator;

    constructor (page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('link', { name: 'Sign In' });
        this.lakeviewLink = page.getByRole('link', { name: 'L Lakeview Bowls Club' })
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async checkHomePage(){
        await expect(this.page).toHaveTitle(/Club Management Platform/);
        await expect(this.page.getByText("Multi-tenant bowling club platform", {exact: true})).toBeVisible();
    }

    async openLakeview() {
         await this.lakeviewLink.click();
    }
}

export default HomePage;