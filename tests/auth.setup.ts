import { test as setup, expect } from './fixtures';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, homePage, loginPage, dashboardPage }) => {
    await page.goto('/');
    await homePage.clickLoginButton();
    await expect(page).toHaveURL('/auth/login');
    await loginPage.doLogin('playwright@test.com', 'playwright');
    await dashboardPage.checkLoggedIn();
    await page.context().storageState({ path: authFile });
})