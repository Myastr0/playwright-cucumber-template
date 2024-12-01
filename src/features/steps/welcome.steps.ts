import { Then, When } from '@/utils/internal-bdd';
import { expect } from '@playwright/test';

When('I search for {string}', async ({ page }, searchText) => {
  await page.locator('#bigsearch-query-location-input').fill(searchText);
  await page.locator('#bigsearch-query-location-input').press('Enter');
});

When('I click on the search button', async ({ page }) => {
  await page
    .locator('[data-testid="structured-search-input-search-button"]')
    .click();

  await page.waitForTimeout(5000);
});

Then(
  'I should see the search results of {string}',
  async ({ page }, search) => {
    await expect(
      page.locator(`[data-testid="stays-page-heading"]`),
    ).toContainText(`places in ${search}`);
  },
);
