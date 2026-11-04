import { test as setup, expect } from './fixtures';
import { routes } from './utils/routes';


const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, homePage, loginPage, dashboardPage }) => {
    await page.goto(routes.home);
    await homePage.clickLoginButton();
    await expect(page).toHaveURL(routes.login);
    await loginPage.doLogin('playwright@test.com', 'playwright');
    await dashboardPage.checkLoggedIn();
    await page.context().storageState({ path: authFile });
})