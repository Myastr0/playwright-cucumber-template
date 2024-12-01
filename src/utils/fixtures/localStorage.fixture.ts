import { type Page } from '@playwright/test';

export class LocalStorageFixture {
  protected static readonly page: Page;
  constructor(public page: Page) {
    this.page = page;
  }

  async removeItem(key: string): Promise<void> {
    await this.page.evaluate(
      ([_key]) => {
        localStorage.removeItem(_key);
      },
      [key],
    );
  }

  async setItem(key: string, value: string): Promise<void> {
    await this.page.evaluate(
      ([_key, _value]) => {
        localStorage.setItem(_key, _value);
      },
      [key, value],
    );
  }

  async getItem(key: string): Promise<string> {
    return await this.page.evaluate(
      ([_key]) => {
        return localStorage.getItem(_key);
      },
      [key],
    );
  }
}

export const localStorageFixtureConfig = {
  localStorage: async ({ page }, use) => {
    await use(new LocalStorageFixture(page));
  },
};
