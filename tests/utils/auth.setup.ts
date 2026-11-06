import { test as setup, expect } from './fixtures';
import { routes } from './routes';
import { credentials } from './credentials';


const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, homePage, loginPage, dashboardPage }) => {
    await page.goto(routes.home);
    await homePage.clickLoginButton();
    await expect(page).toHaveURL(routes.login);
    await loginPage.doLogin(credentials.email, credentials.password);
    await dashboardPage.checkLoggedIn();
    await page.context().storageState({ path: authFile });
})