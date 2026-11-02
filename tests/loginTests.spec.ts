import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../tests/pages/home-page';
import  LoginPage  from '../tests/pages/login-page';
import Email from 'next-auth/providers/email';

let homePage: HomePage;
let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.waitForLoadState();
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
});

test.describe('Valid Login Tests', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    test('Login valid', async ({page}) => {
        await page.getByRole('link', { name: 'L Lakeview Bowls Club' }).click();
        await loginPage.checkedLoggedIn();
        await page.getByRole('button', { name: 'Sign Out' }).click();
    });
});

test('invalid Login Test', async({ page }) => {
    await homePage.clickLoginButton();
    await loginPage.doLogin('playwright@test.com', 'invalid');
    await expect(page.getByText("Invalid email or password", {exact: true})).toBeVisible();
});