import { test, expect } from '@playwright/test';

test('Page title and heading', { tag: '@smoke' }, async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Club Management Platform/);
  await expect(page.getByText("Multi-tenant bowling club platform", {exact: true})).toBeVisible();
})