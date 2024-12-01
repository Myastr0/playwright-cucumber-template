import { createBdd } from 'playwright-bdd';

import { test } from './fixtures';

const internalBdd = createBdd(test);

export const { After, AfterAll, Before, BeforeAll, Given, Step, Then, When } =
  internalBdd;
