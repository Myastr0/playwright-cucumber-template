# How to Write End-to-End Tests

---

<img src="./img/banner.png" style="border-radius: 15px"/>

---

## ☝️ Introduction

This guide will teach you how to write end-to-end tests using Playwright and Cucumber for your project.

## Prerequisites

To enhance your development workflow, install a Cucumber extension in your IDE for Gherkin autocompletion and syntax highlighting in `.feature` files.

### WebStorm

Install [this extension](https://www.jetbrains.com/help/webstorm/running-cucumber-js-unit-tests.html).

### VSCode

- Install [the official Cucumber extension](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official).
- Ensure the [Workspace Config+ extension](https://marketplace.visualstudio.com/items?itemName=swellaby.workspace-config-plus) is installed.

This extension applies shared VSCode settings from `.vscode/settings.shared.json`, which include configurations for the Cucumber extension.

## 📖 Guide

---

### 1. Create a New Feature File

Add a new feature file to your team's folder inside the `e2e` directory.

For instance, if you are working on a specific feature, create the file in the `src/<my-team>` directory:

```bash
/e2e
  /<my-team>
    /<my-feature>
      <my-feature-1>.feature
```

> [!NOTE]
>
> Please avoid adding extra team directories. Existing ones are structured to accommodate all scenarios and are linked to the `.github/CODEOWNERS` file, ensuring the correct team reviews the pull request.

### 2. Write Your Scenario

Draft a new scenario within the feature file.

```gherkin
Feature: <my-feature>

  Scenario: <my-scenario>
    Given I am on the <my-page> page
    When I click on the button <string>
    Then I should see a heading with the text <string>
```

You can reuse pre-configured steps from the `src/utils/steps` directory.

### 3. Implement New Steps

In many cases, you will need to write custom steps to interact with the application.

For example, to implement the step:

```gherkin
Given I am on the <my-page> page
```

You would write:

```typescript
import { Given, When, Then } from '../utils/internal-bdd';

Given('I am on the <my-page> page', async ({ page }) => {
  await page.goto('/<my-page>');
});
```

> [!TIP]
>
> Use the Playwright recorder to simplify step creation. Run `yarn e2e:record`, navigate the application in the browser, and let the recorder generate boilerplate code for your steps.

Some steps may require working with browser state or querying APIs beyond the application's scope. These utilities, called fixtures, are accessible as step parameters:

Example using a fixture:

```typescript
Given('I am on the <my-page> page', async ({ account, page }) => {
  const users = await account.getUser();

  /**
   * Perform operations with the retrieved users
   */
});
```

Check the [list of available fixtures](./6-list-of-e2e-utils) for more details. For creating new fixtures, refer to the [How to Contribute to End-to-End Utils](./4-how-to-contribute-to-e2e-utils) guide.

### 4. Test Your Scenario

Follow the [How to Run End-to-End Tests](./2-how-to-run-e2e-tests.md) guide to execute your new scenario.

---

## Going Further 🚀

After mastering end-to-end test creation, explore the [How to Contribute to End-to-End Utils](./4-how-to-contribute-to-e2e-utils) guide to enhance shared testing utilities.
