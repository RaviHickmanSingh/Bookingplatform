//   await page.getByRole('link', { name: 'Register' }).click();
//   await page.getByRole('textbox', { name: 'Name' }).click();
//   await page.getByRole('textbox', { name: 'Email' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Club slug (optional)' }).click();
//   await page.getByRole('button', { name: 'Register' }).click();
// });

import { type Page, type Locator , expect } from '@playwright/test';

class RegisterPage {
    readonly page: Page;
    readonly registerButton: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly slug: Locator;

    constructor(page:Page){
        this.page = page;
        this.registerButton = page.getByRole('button', { name: 'Register' })
        this.email = page.getByRole('textbox', { name: 'Email' })
        this.password = page.getByRole('textbox', { name: 'Password' })
        this.slug = page.getByRole('textbox', { name: 'Club slug (optional)' })
    }
    async fillRegister(email: string, password: string, slug: string){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.slug.fill(slug);
    }    
    async clickRegister(){
        await this.registerButton.click();
    }
}

export default RegisterPage;