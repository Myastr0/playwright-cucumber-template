# How-To Setup your own configuration

---

<img src="./img/banner.png" style="border-radius: 15px"/>

---

## ☝️ Introduction

This guide will help you to setup the configuration to target your own website/web-application project.

---

## 📖 Guide

Define your own configuration by following these steps:

Replace the properties configured in the [default.config.ts](../src/config/default.config.ts) file with your own web-app property.

```typescript
// src/config/default.config.ts

import { PlaywrightTestConfig } from '@playwright/test';

const myOwnConfig: Partial<PlaywrightTestConfig> = {
  use: {
    baseURL: '<my-web-app-url>',
    video: 'on',
  },
};

export default myOwnConfig;
```

> [!NOTE]
> Default browser configurations
>
> By default the test suite will run on Chromium browser. You can change the browser configuration by updating the `projects` property in the [browsers/index.ts](../src/config/browsers/index.ts) file.
