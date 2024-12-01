import { test as base } from 'playwright-bdd';

import {
  type ClipboardFixture,
  clipboardFixtureConfig,
} from './clipboard.fixture';
import {
  type LocalStorageFixture,
  localStorageFixtureConfig,
} from './localStorage.fixture';
import {
  type SessionStorageFixture,
  sessionStorageFixtureConfig,
} from './sessionStorage.fixture';

/**
 * Add your Fixture class definition inside the Fixtures interface
 * to help typescript to type the fixture inside the steps.
 */
interface Fixtures {
  sessionStorage: SessionStorageFixture;
  localStorage: LocalStorageFixture;
  clipboard: ClipboardFixture;
}

/**
 * Inject all fixtures into the global fixture test context.
 */
const fixtureConfig = {
  ...sessionStorageFixtureConfig,
  ...localStorageFixtureConfig,
  ...clipboardFixtureConfig,
};

export const test = base.extend<Fixtures>(fixtureConfig);
