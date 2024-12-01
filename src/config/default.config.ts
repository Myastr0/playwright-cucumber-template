import { PlaywrightTestConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-use-options for more information.
 */
const defaultConfig: Partial<PlaywrightTestConfig> = {
  use: {
    baseURL: 'https://www.airbnb.com/', // <- Change this to your app URL
    video: 'on',
  },
};

export default defaultConfig;
