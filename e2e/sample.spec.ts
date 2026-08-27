import { test, expect } from '@playwright/test';

test('authenticated user can access the application', async ({ page }) => {
  await page.goto('/');

  console.log('URL:', page.url());

  await expect(page.locator('.overview-greetings'))
    .toHaveText('Good evening, Administrator.');
});