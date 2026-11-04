import { test, expect, type Page } from '@playwright/test';
import { HomePage } from './pages/home-page';
import  LoginPage  from './pages/login-page';
import Email from 'next-auth/providers/email';

let homePage: HomePage;
let loginPage: LoginPage;

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.waitForLoadState();
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
});

test.describe('Login Tests', { tag: '@smoke' }, () => {
    test.use({ storageState: 'playwright/.auth/user.json' });
    test('Login valid', async ({page}) => {
        await page.getByRole('link', { name: 'L Lakeview Bowls Club' }).click();
        await loginPage.checkedLoggedIn();
        await page.getByRole('button', { name: 'Sign Out' }).click();
    });
    test('Sign out', async ({page}) => {
        await page.getByRole('link', { name: 'L Lakeview Bowls Club' }).click();
        await loginPage.checkedLoggedIn();
        await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
        await page.getByRole('button', { name: 'Sign Out' }).click();
        await expect(page).toHaveURL('/');
        await expect(page).toHaveTitle(/Club Management Platform/);
        await expect(page.getByText("Multi-tenant bowling club platform", {exact: true})).toBeVisible();

    })
});

test('invalid Login Test', { tag: '@smoke' }, async({ page }) => {
    await homePage.clickLoginButton();
    await loginPage.doLogin('playwright@test.com', 'invalid');
    await expect(page.getByText("Invalid email or password", {exact: true})).toBeVisible();
});