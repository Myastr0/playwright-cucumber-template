# 2. How to Run End-to-End Tests

---

<img src="./img/banner.png" style="border-radius: 15px"/>

---

## ☝️ Introduction

This guide provides instructions for running the end-to-end test suite using the local version of your web application and the staging environment.

## 📖 Guide

---

### 0. Prerequisites

To set up the testing environment, follow these steps:

```bash
yarn install
yarn e2e:configure
```

### 1. Set Up the Local Development Environment

Ensure that the web application is running locally, including the development proxy and GraphQL server, as part of your usual development setup.

Once everything is ready, the test suite can be executed in two modes:

2. [UI Mode 🌄](#2-ui-mode-)
3. [CLI Mode 🖥](#3-cli-mode-)

### 2. UI Mode 🌄

---

#### 2.1 Open Playwright Studio

```bash
yarn e2e:test:ui
```

#### 2.2 Execute Tests in Playwright Studio

After Playwright Studio launches in your browser (Chromium), you can proceed to run the tests.

### 3. CLI Mode 🖥

---

#### 3.1 Run the Test Suite in CLI Mode

Execute the following command to run the tests in CLI mode:

```bash
yarn e2e:test
```

---

## Going Further 🚀

Now that you know how to execute the end-to-end tests, you can explore the [How to Write End-to-End Tests](./3-how-to-write-e2e-test.md) guide to learn about creating new test cases.
