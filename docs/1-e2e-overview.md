# Comprehensive Overview of the End-to-End Testing Framework

---

<img src="./img/banner.png" style="border-radius: 15px"/>

---

## Introduction

This document provides a technical guide for the end-to-end testing process of a web based application project.

---

## Table of Contents

1. [What tools are used for end-to-end testing?](#1-what-tools-are-used-for-end-to-end-testing)  
   1.1 [Why Choose Playwright?](#11-why-choose-playwright)  
   1.2 [Why Use Cucumber?](#12-why-use-cucumber)
2. [Core Principles of Behaviour-Driven Development (BDD)](#2-core-principles-of-behaviour-driven-development-bdd)  
   2.1 [Feature](#21-feature)  
   2.2 [Scenario](#22-scenario)  
   2.3 [Steps: Given, When, Then](#23-steps-given-when-then)
3. [What is Covered by End-to-End Tests?](#3-what-is-covered-by-end-to-end-tests)
4. [When Are End-to-End Tests Executed?](#4-when-are-end-to-end-tests-executed)
5. [How Are End-to-End Tests Organized?](#5-how-are-end-to-end-tests-organized)

---

## 1. What tools are used for end-to-end testing?

The testing process leverages [Playwright](https://playwright.dev/) and [Cucumber](https://cucumber.io/) to ensure robust end-to-end coverage.

### 1.1 Why Choose [Playwright](https://playwright.dev/)?

Playwright is a Node.js library designed to automate Chromium, WebKit, and Firefox browsers using a unified API. It supports cross-browser automation that is fast, reliable, and keeps pace with browser updates.

### 1.2 Why Use [Cucumber](https://cucumber.io/)?

Cucumber supports Behaviour-Driven Development (BDD), a methodology aimed at improving software quality and maintaining efficiency. It enables writing test cases in a format understandable by technical and non-technical stakeholders.

For instance, a test case in Cucumber might resemble the following:

<details>
<summary>
<i>Example of a <b>login.feature</b> file</i>
</summary>

```gherkin
# login.feature
Feature: Login
  As a user
  I want to log in to the system
  So that I can access my dashboard

  Scenario: Login with valid credentials
    Given I am on the login page
    When I submit my valid credentials
    Then I should see the dashboard page
```

</details>

---

## 2. Core Principles of Behaviour-Driven Development (BDD)

### 2.1 Feature

A feature provides a high-level description of a functionality that the software offers, serving as the basis for testing.

### 2.2 Scenario

A scenario defines a specific instance or example of how a feature should behave under certain conditions.

_For additional guidance, refer to the [Better Gherkin documentation](https://cucumber.io/docs/bdd/better-gherkin/)._

### 2.3 Steps: Given, When, Then

The **Given**, **When**, and **Then** structure is fundamental to Cucumber scenarios, making them clear and systematic.

_For more details, see the [Cucumber syntax guide](https://cucumber.io/docs/gherkin/reference/)._

---

## 3. What is covered by end-to-end tests?

End-to-end tests are designed to validate the main user workflows of the application, commonly referred to as "happy paths."

Developers should ensure that new features include comprehensive tests for their primary workflows.

---

## 4. When Are End-to-End Tests Executed?

The end-to-end test suite is automatically triggered in the CI/CD pipeline during pull requests for branches that are neither `develop` nor `master`.

> [!NOTE]
>
> The testing process described here applies specifically to the web application project. For information on the mobile application, refer to its dedicated documentation.

Although the process does not currently block merges, addressing failing tests promptly is highly recommended to prevent regressions.

---

## 5. How Are End-to-End Tests Organized?

The tests are located in the `e2e` folder at the root level of the project, with a structure that allows feature teams to maintain their specific test files.

<details>
<summary>
<i><b>e2e</b> folder structure</i>
</summary>

```
src/
├── <team-folder>/
│   ├── <feature-folder>/
│   │   ├── steps/
│   │   │   ├── <feature>.steps.ts
│   │   ├── <feature>.feature
```

</details>

For each `.feature` file, there is an equivalent `.steps.ts` file in the `steps` folder, containing the implementation of the defined steps.

For example:

<details>
<summary>
<i>Example of a <b>login.steps.ts</b> file</i>
</summary>

```ts
// login.steps.ts

import { Given, When, Then } from '../utils/internal-bdd';

Given('I am on the login page', async ({ page }) => {
  await page.goto('https://example.com/login');
});

When('I submit my valid credentials', async ({ page }) => {
  await page.fill('input[name="username"]', 'user');
  await page.fill('input[name="password"]', 'password');
  await page.click('button[type="submit"]');
});

Then('I should see the dashboard page', async ({ page }) => {
  await page.waitForNavigation();
  expect(page.url()).toBe('https://example.com/dashboard');
});
```

</details>

The `src/utils` folder contains common utilities and [Playwright fixtures](https://playwright.dev/docs/test-fixtures).

<details>
<summary>
<i><b>src/utils</b> folder structure</i>
</summary>

```
src/
├── utils/
│   ├── fixtures/
│   │   ├── <fixture>.fixture.ts
│   ├── libs/
│   │   ├── <lib>.ts # shared libraries
│   ├── steps/
│   │   ├── <step>.steps.ts
```

</details>

---

## Learn More 🚀

Dive into the [How to Run End-to-End Tests](./2-how-to-run-e2e-tests.md) guide for step-by-step instructions on running the test suite.
