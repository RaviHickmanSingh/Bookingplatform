import { type Page, type Locator , expect } from '@playwright/test';

class LoginPage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly email: Locator;
    readonly password: Locator;

    constructor(page:Page){
        this.page = page;
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
    }
    async fillEmail(email: string) {
        await this.email.fill(email);
    }
    async fillPassword(password: string) {
        await this.password.fill(password);
    }

    async doLogin(email: string, password: string){
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.signInButton.click();
    }

    async checkedLoggedIn(){
        await this.page.waitForLoadState();
        await expect(this.page).toHaveURL('/lakeview-bowls');
        await expect(this.page.getByRole('heading', { name: 'Lakeview Bowls Club' })).toBeVisible();
    }

}

export default LoginPage;