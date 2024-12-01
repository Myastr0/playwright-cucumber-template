# How to Contribute to End-to-End Utilities

---

<img src="./img/banner.png" style="border-radius: 15px"/>

---

## ☝️ Introduction

This guide explains how to contribute to the common utilities used in the end-to-end testing framework for the web application.

## 📖 Guide

---

You can contribute by creating two types of utilities:

1. [Add a New Fixture](#1-add-a-new-fixture)
2. [Add a New Shared Step](#2-add-a-new-shared-step)

### 1. Add a New Fixture

#### 1.1 Define Your Fixture

Create a new fixture in the `src/utils/fixtures` directory. For example, to manage the browser's local storage, create a file like this:

```typescript
// src/utils/fixtures/localStorage.fixture.ts

// 1. Fixture class
export class LocalStorage {
  async setItem(key: string, value: any) {
    await page.evaluate(
      (key, value) => {
        localStorage.setItem(key, value);
      },
      key,
      value,
    );
  }

  async getItem(key: string) {
    return await page.evaluate((key) => {
      return localStorage.getItem(key);
    }, key);
  }
}

export const localStorageFixture = {
  localStorage: async ({ page }, use) => {
    await use(new LocalStorage());
  },
};
```

Here’s what is defined:

1. `LocalStorage` class to manage local storage and assist TypeScript with typing.
2. `localStorageFixture` for utilizing the `LocalStorage` class in test steps. Fixtures are injected into the global test context.

#### 1.2 Add the Fixture to the Global Test Context

Integrate the fixture into the global Fixture interface.

```typescript
// src/utils/fixtures/index.ts

import { LocalStorage } from './localStorage.fixture';

interface Fixtures {
  localStorage: LocalStorage;
}
```

Include the new fixture in the `fixtures` object:

```typescript
// src/utils/fixtures/index.ts

import { localStorageFixture } from './localStorage.fixture';

export const fixtures = {
  ...localStorageFixture,
};
```

#### 1.3 Use Your Fixture in Test Steps

The new fixture can now be used in your steps:

```typescript
// src/<my-team>/<my-feature>/steps/<my-feature>.steps.ts

import { Given, When, Then } from '../utils/internal-bdd';

Given('I have a new account', async ({ localStorage }) => {
  await localStorage.setItem('token', 'my-token');
  await localStorage.setItem('user', { name: 'Jane Doe' });
});

Then('I should see the user name', async ({ localStorage }) => {
  const user = await localStorage.getItem('user');
  expect(user.name).toBe('Jane Doe');
});
```

#### 1.4 Document the Fixture

Add the fixture to the [list of available fixtures - Fixtures section](./5-list-of-e2e-utils.md#fixtures) in the documentation.

Follow this format:

#### . `My New Fixture`

_Located in `src/utils/fixtures/<my-new-fixture>.fixture.ts`_

Details on when to use the fixture.

```typescript
Given('I have a new account', async ({ myNewFixture }) => {
  await myNewFixture.doSomething();
});
```

Refer to [My New Fixture](../../src/utils/fixtures/<my-new-fixture>.fixture.ts) for more details.

---

### 2. Add a New Shared Step

#### 2.1 Define the Step Context

If the step interacts with the browser, place it in `src/utils/steps/interaction`. If no existing folder fits, create a new directory and explain the context.

#### 2.2 Write the Shared Step

Make the step reusable for various scenarios.

Tips for writing shared steps:

- Use generic locators that accept parameters:

```typescript
// ✅ Correct Approach

Given('I click on the button with label {string}', async ({ page }, label) => {
  await page.getByRole('button', { name: label }).click();
});

// ❌ Avoid Hardcoding

Given('I click on the login button', async ({ page }) => {
  await page.getByRole('button', { name: 'Login' }).click();
});
```

- Use data tables for complex objects (more than 2 variables):

```typescript
// ✅ Correct Approach

import { DataTable } from '@cucumber/cucumber';

Given('I create a new entry', async ({ page }, datatable: DataTable) => {
  const entryData = datatable.rowsHash();

  if (!entryData) {
    throw new Error('Missing entry data');
  }

  await page.fill('input[name="entryNumber"]', entryData.entryNumber);
  await page.fill('input[name="entryDate"]', entryData.entryDate);
  await page.fill('input[name="entryAmount"]', entryData.entryAmount);
});
```

#### 2.3 Document the Step

Add the shared step to the [list of available steps - Steps section](./5-list-of-e2e-utils.md#steps) in the documentation.

````markdown
#### . `My New Shared Step`

_Located in `src/utils/steps/<my-new-shared-step>.steps.ts`_

Details on when to use the step.

```gherkin
Given my new shared step
```
````

Refer to [My New Shared Step](../../src/utils/steps/<my-new-shared-step>.steps.ts) for more details.

```

---

### Going Further 🚀

Learn how to execute the test suite by following the [How to Run End-to-End Tests](./2-how-to-run-e2e-tests.md) guide.
```
