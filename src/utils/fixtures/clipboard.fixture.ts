import { type Page } from 'playwright/test';

export class ClipboardFixture {
  constructor(public page: Page) {}

  async writeText(text: string) {
    await this.page.evaluate((txt) => {
      navigator.clipboard.writeText(txt);
    }, text);
  }
  async getText() {
    return await this.page.evaluate(() => navigator.clipboard.readText());
  }
}

export const clipboardFixtureConfig = {
  clipboard: async ({ page }, use) => {
    await use(new ClipboardFixture(page));
  },
  context: async ({ context }, use) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await use(context);
  },
};
