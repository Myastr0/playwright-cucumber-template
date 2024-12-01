import { defineConfig, PlaywrightTestConfig } from '@playwright/test';
import { merge } from 'lodash';
import * as path from 'path';
import { defineBddConfig } from 'playwright-bdd';

import defaultConfig from './default.config';
import browsersConfig from '@/config/browsers';

const ROOT_DIR = path.join(__dirname, '..', '..');
const SRC_DIR_PATH = path.resolve(ROOT_DIR, 'src');

const testDir = defineBddConfig({
  paths: [path.join(SRC_DIR_PATH, '/**/*.feature')],
  require: [path.join(SRC_DIR_PATH, '/**/*.steps.ts')],
  featuresRoot: SRC_DIR_PATH,
  outputDir: path.join(SRC_DIR_PATH, '/__generated__'),
  importTestFrom: path.join(SRC_DIR_PATH, '/utils/fixtures/index.ts'),
});

const outputReporterDirectory = path.join(ROOT_DIR, 'output', '__reporters__');
const outputTestsResultsDirectory = path.join(
  ROOT_DIR,
  'output',
  '__test-results__',
);

// Devide configuration into multiple object (dev, ci, staging)
const baseConfig: PlaywrightTestConfig = {
  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      'html',
      {
        outputFolder: path.join(outputReporterDirectory, '/playwright-report'),
      },
    ],
  ],

  /* Timeout for each test */
  timeout: 120000,
  expect: {
    timeout: 20000,
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
    locale: 'en-US',
  },

  outputDir: outputTestsResultsDirectory,

  /* Configure projects for major browsers */
};

const config = merge(baseConfig, defaultConfig, browsersConfig);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(config);
