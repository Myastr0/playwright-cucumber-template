import { devices, PlaywrightTestConfig } from '@playwright/test';

/**
 * See https://playwright.dev/docs/browsers for more information.
 */
const browsersConfig: Partial<PlaywrightTestConfig> = {
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

export default browsersConfig;
