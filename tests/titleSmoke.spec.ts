import { test } from './utils/fixtures';
import { routes } from './utils/routes';

test.use({ storageState: { cookies: [], origins: [] } });

test('Page title and heading', { tag: '@smoke' }, async ({page, homePage}) => {
  await page.goto(routes.home);
  await homePage.checkHomePage();
})