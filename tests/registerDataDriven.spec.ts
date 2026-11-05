import { test, expect } from './utils/fixtures';
import { routes } from './utils/routes';
import { randomRegisterDetails } from './utils/helpers';

const invalidRegistrations = [
    { case: 'empty email',
        email: '',
        password: 'password',
        field: 'email',
        error: 'valueMissing'
    },
    { case: 'empty password',
        email: 'email@test.com',
        password: '',
        field: 'password',
        error: 'valueMissing'
    },
    { case: 'invalid email format',
        email: 'email',
        password: 'password',
        field: 'email',
        error: 'typeMismatch'
    },
];

test.beforeEach(async ({page}) => {
    await page.goto(routes.home);
    await page.waitForLoadState();
});
for (const{ case: name, email, password, field, error } of invalidRegistrations){
    test(`registration fails with ${name}`, async ({ page, registerPage, homePage }) => {
        const input = field === 'email' ? registerPage.email : registerPage.password;
        await homePage.clickRegisterButton();
        await registerPage.fillRegister(email, password, randomRegisterDetails.slug);
        await registerPage.clickRegister();
        //error pops up in a html box that playwright cannot see so have to do error as page url does not change
        await expect(input).toHaveJSProperty(`validity.${error}`, true);
        await expect(page).toHaveURL(routes.register);
    });
}