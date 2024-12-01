import { expect } from '@playwright/test';

import { Given, Then } from '../internal-bdd';

Given('I am on the home page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
});

Then('I should see the title {string}', async ({ page }, title) => {
  await expect(page).toHaveTitle(title);
});

Then('I should see a button with the text {string}', async ({ page }, text) => {
  await expect(page.getByRole('button', { name: text })).toBeVisible();
});

Then(
  'I should see a heading with the text {string}',
  async ({ page }, text) => {
    await expect(page.getByRole('heading', { name: text })).toBeVisible();
  },
);

Then(
  'I should see a heading with the text {string} with delay {int}',
  async ({ page }, text, delay) => {
    await expect(page.getByRole('heading', { name: text })).toBeVisible({
      timeout: delay,
    });
  },
);
