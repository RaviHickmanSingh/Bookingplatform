import { type Page, type Locator , expect } from '@playwright/test';

class LoginPage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly invalidError: Locator;

    constructor(page:Page){
        this.page = page;
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.invalidError = page.getByText("Invalid email or password", {exact: true})
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
    async checkInvalidError(){
        await expect(this.invalidError).toBeVisible();
    }

}

export default LoginPage;