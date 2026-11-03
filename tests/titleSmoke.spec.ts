import { test } from './fixtures';

test('Page title and heading', { tag: '@smoke' }, async ({page, homePage}) => {
  await page.goto('/');
  await homePage.checkHomePage();
})