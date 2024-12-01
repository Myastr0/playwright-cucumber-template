import type { Locator, Page } from '@playwright/test';

import { Given, When } from '../internal-bdd';

Given('I am on the home page ', async ({ page }) => {
  await page.goto('/');
});

When(
  'I fill the input {string} with value {string}',
  async ({ page }, label, value) => {
    await page.getByLabel(label).fill(value);
  },
);

When('I click {string}', async ({ page }, text) => {
  await page.waitForLoadState('domcontentloaded');

  const waitForLocator = async (
    locator: Locator,
  ): Promise<Locator | undefined> => {
    await locator.waitFor({ timeout: 1000 });
    return locator;
  };

  const parentLocator: Locator | Page = page;

  const textLocator = await waitForLocator(
    parentLocator.getByText(text, { exact: true }),
  );
  const locator =
    (await Promise.race([
      waitForLocator(
        parentLocator.getByRole('button', { exact: true, name: text }),
      ),
      waitForLocator(
        parentLocator.getByRole('link', { exact: true, name: text }),
      ),
      waitForLocator(
        parentLocator.getByRole('menuitem', { exact: true, name: text }),
      ),
    ])) || textLocator;

  if (locator === undefined) {
    throw new Error(`Could not find element with text "${text}"`);
  }

  await locator.click();
});
