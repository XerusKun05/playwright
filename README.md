# Playwright E2E Automation

TypeScript end-to-end tests for authenticated overview and product-management workflows.

**App under test:** Zayls web application, configured through `BASE_URL`.

## CI status

[![Playwright Tests](https://github.com/XerusKun05/playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/XerusKun05/playwright/actions/workflows/playwright.yml)

## Highlights

- **Page Object Model:** `OverviewPage` and `ProductPage` keep page locators and interactions out of the test flows.
- **Reusable component:** `FancySelect` centralizes interaction with the application's custom select controls.
- **Custom assertions:** `FieldAssertions` verifies labeled fields and values in product tables.
- **Authentication state reuse:** A setup test logs in once and saves `auth/admin.json`, which the browser projects reuse.
- **Custom API fixture:** Provides an authenticated API request context for product availability checks.
- **CI:** A GitHub Actions workflow installs dependencies and browsers, then runs the suite on every push to `main`.

## Tech stack

| Technology | Use |
| --- | --- |
| TypeScript | Strictly typed test and page-object code |
| Playwright Test (`@playwright/test` `^1.61.1`) | E2E runner, browser automation, and assertions |
| Node.js 20 | Runtime configured in GitHub Actions |
| dotenv (`^17.4.2`) | Loads local environment variables |
| Chromium, Firefox, WebKit | Configured Playwright browser projects |
| GitHub Actions | Continuous integration |

## What's covered

The suite currently contains **2 spec files and 2 functional E2E test cases**. A separate authentication setup test prepares the shared session.

- **Overview** (`e2e/overview.spec.ts`): An authenticated user opens the overview and sees the Administrator greeting.
- **Product creation** (`e2e/product.spec.ts`): Checks a generated product name through the API, creates a regular-stock product for buying and selling, and verifies its saved fields and SKU.

## Project structure

```text
.
├── .github/workflows/    GitHub Actions test workflow
├── auth/                 Generated authenticated browser state (ignored by Git)
├── component/            Reusable UI component interactions
├── data/                 Product test data
├── e2e/                  Authentication setup and end-to-end specs
├── fixtures/             Extended Playwright API fixture
├── pages/                Page Object Model classes
├── utils/assertions/     Reusable field and table assertions
├── playwright.config.ts  Browser projects and test-runner settings
├── package.json          Dependencies and package metadata
└── tsconfig.json         TypeScript compiler options
```

## Design decisions

The specs focus on user-visible workflows, while page objects own page-specific locators and actions. This separation keeps test intent readable and provides a single place to update UI interactions when a page changes.

Repeated UI behavior and verification are extracted into `FancySelect` and `FieldAssertions`. Product input data lives in JSON, while a timestamp is added to the product name and SKU so the creation flow can check name availability and submit distinct values.

Authentication is handled by a setup project that saves storage state for the browser projects. The shared API fixture loads that same state, allowing the product test to check availability through the API before using the UI.

## Getting started

### Prerequisites

- Node.js 20 and npm
- Access to the application and API under test
- Test account credentials

### Install

```bash
npm ci
npx playwright install
```

Create a local `.env` file in the repository root. `dotenv/config` loads it when Playwright starts; `.env` files are excluded from Git.

```dotenv
BASE_URL=<application URL>
API_URL=<API URL>
USER_NAME=<test username>
PASS_WORD=<test password>
```

The authentication setup uses `API_URL`, `USER_NAME`, and `PASS_WORD` to log in. `BASE_URL` is used for browser navigation. Provide valid values locally; do not commit credentials.

## Running tests

Run the complete suite:

```bash
npx playwright test
```

Run one spec:

```bash
npx playwright test e2e/overview.spec.ts
npx playwright test e2e/product.spec.ts
```

Run a browser project:

```bash
npx playwright test --project=chromium
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## Continuous integration

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on pushes to `main`. It uses Node.js 20, installs dependencies with `npm ci`, installs Playwright browsers with system dependencies, and runs `npx playwright test`. Configure these repository secrets for the workflow: `BASE_URL`, `API_URL`, `USER_NAME`, and `PASS_WORD`.

## Example

From `e2e/overview.spec.ts`:

```ts
test('authenticated user can access the overview', async ({ page }) => {

    const overviewPage = new OverviewPage(page);

    await overviewPage.goto();

    await expect(overviewPage.greeting)
        .toContainText('Administrator');
});
```

## Possible improvements

- Expand coverage with negative and validation scenarios
- Add API-only tests
- Upload the HTML report as a CI artifact
- Shard test runs in CI as the suite grows

## Author

- **Name:** Raniel