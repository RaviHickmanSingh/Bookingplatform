import { test } from './utils/fixtures';
import { routes } from './utils/routes';
import { randomRegisterDetails } from './utils/helpers';

test.beforeEach(async ({page}) => {
    await page.goto(routes.home);
    await page.waitForLoadState();
});

test('Randomly generated user register', { tag: '@smoke' }, async({ page, homePage, registerPage, loginPage}) => {
    await homePage.clickRegisterButton();
    await registerPage.fillRegister(randomRegisterDetails.email, randomRegisterDetails.password, randomRegisterDetails.slug);
    await registerPage.clickRegister();
    await page.waitForLoadState();
    await loginPage.checkRegister();
});