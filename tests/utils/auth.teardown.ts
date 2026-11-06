import { test as teardown } from '@playwright/test';
import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const authFile = resolve(process.cwd(), 'playwright/.auth/user.json');

teardown('remove saved authentication state', async () => {
  await rm(authFile, { force: true });
});