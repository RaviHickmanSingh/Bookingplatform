import { test, expect } from './utils/fixtures';
import { routes } from './utils/routes';
import { credentials } from './utils/credentials';

test.beforeEach(async ({page}) => {
    await page.goto(routes.home);
    await page.waitForLoadState();
});

test.describe('Login Tests', { tag: '@smoke' }, () => {

    test.beforeEach(async ({homePage }) => {
        await homePage.openLakeview();
});
    test('Login valid and Sign out', async ({page, homePage, dashboardPage}) => {
        await dashboardPage.checkLoggedIn();
        await dashboardPage.clickSignOut();
        await expect(page).toHaveURL(routes.home);
        await homePage.checkHomePage();
    })
});
test.describe('Invalid login', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Invalid login test', { tag: '@smoke' }, async({ homePage, loginPage }) => {
    await homePage.clickLoginButton();
    await loginPage.doLogin(credentials.email, credentials.invalidPassword);
    await loginPage.checkInvalidError();
});
})

