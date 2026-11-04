import { test, expect } from './fixtures';
// import Email from 'next-auth/providers/email';


test.beforeEach(async ({page}) => {
    await page.goto('/');
    await page.waitForLoadState();
});

test.describe('Login Tests', { tag: '@smoke' }, () => {
    test.use({ storageState: 'playwright/.auth/user.json' });

    test.beforeEach(async ({homePage }) => {
        await homePage.openLakeview();
});
    test('Login valid', async ({dashboardPage}) => {
        await dashboardPage.checkLoggedIn();
        await dashboardPage.clickSignOut();
    });
    test('Sign out', async ({page, homePage, dashboardPage}) => {
        await dashboardPage.checkLoggedIn();
        await dashboardPage.clickSignOut();
        await expect(page).toHaveURL('/');
        await homePage.checkHomePage();

    })
});

test('invalid Login Test', { tag: '@smoke' }, async({ page, homePage, loginPage }) => {
    await homePage.clickLoginButton();
    await loginPage.doLogin('playwright@test.com', 'invalid');
    await expect(page.getByText("Invalid email or password", {exact: true})).toBeVisible();
});