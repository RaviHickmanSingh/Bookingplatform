import { test, expect } from './fixtures';
// import Email from 'next-auth/providers/email';


test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.waitForLoadState();
});

test.describe('Login Tests', { tag: '@smoke' }, () => {
    test.use({ storageState: 'playwright/.auth/user.json' });

    test.beforeEach(async ({page}) => {
        await page.getByRole('link', { name: 'L Lakeview Bowls Club' }).click();
});
    test('Login valid', async ({page, loginPage}) => {
        await loginPage.checkedLoggedIn();
        await page.getByRole('button', { name: 'Sign Out' }).click();
    });
    test('Sign out', async ({page, loginPage, homePage}) => {
        await loginPage.checkedLoggedIn();
        await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
        await page.getByRole('button', { name: 'Sign Out' }).click();
        await expect(page).toHaveURL('/');
        await homePage.checkHomePage();

    })
});

test('invalid Login Test', { tag: '@smoke' }, async({ page, homePage, loginPage }) => {
    await homePage.clickLoginButton();
    await loginPage.doLogin('playwright@test.com', 'invalid');
    await expect(page.getByText("Invalid email or password", {exact: true})).toBeVisible();
});