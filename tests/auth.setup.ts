import { test as setup, expect } from '@playwright/test';
import { HomePage } from '../tests/pages/home-page';
import LoginPage from '../tests/pages/login-page';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    await page.goto('/');
    await new HomePage(page).clickLoginButton();
    await expect(page).toHaveURL('/auth/login');
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('playwright@test.com', 'playwright');
    await loginPage.checkedLoggedIn();
    await page.context().storageState({ path: authFile });
})