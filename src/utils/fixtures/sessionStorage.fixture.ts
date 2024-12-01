import { type Page } from '@playwright/test';

export class SessionStorageFixture {
  protected static readonly page: Page;
  constructor(public page: Page) {
    this.page = page;
  }

  async setItem(key: string, value: string): Promise<void> {
    await this.page.evaluate(
      ([_key, _value]) => {
        sessionStorage.setItem(_key, _value);
      },
      [key, value],
    );
  }

  async getItem(key: string): Promise<string> {
    return await this.page.evaluate(
      ([_key]) => {
        return sessionStorage.getItem(_key);
      },
      [key],
    );
  }
}

export const sessionStorageFixtureConfig = {
  sessionStorage: async ({ page }, use) => {
    await use(new SessionStorageFixture(page));
  },
};
