import { test, expect } from './fixtures';
import { routes } from './utils/routes';


test.beforeEach(async ({page}) => {
    await page.goto(routes.home);
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
        await expect(page).toHaveURL(routes.home);
        await homePage.checkHomePage();

    })
});

test('Invalid login test', { tag: '@smoke' }, async({ page, homePage, loginPage }) => {
    await homePage.clickLoginButton();
    await loginPage.doLogin('playwright@test.com', 'invalid');
    await loginPage.checkInvalidError();
});