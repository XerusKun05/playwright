# Playwright E2E Test Suite

This project contains end-to-end browser tests for the application under test, built with Playwright and TypeScript.

## Overview

The suite is organized around a clear separation of responsibilities:

- `e2e/` contains the actual test specs
- `pages/` contains page object classes for page-specific UI behaviors
- `component/` contains reusable UI component logic
- `utils/` contains reusable helpers and assertion utilities
- `fixtures/` contains shared test fixtures
- `auth/` contains authentication state used by the setup flow

This structure keeps tests readable, reusable, and easier to maintain.

## Prerequisites

Before running the tests, make sure you have:

- Node.js installed
- npm installed

## Installation

```bash
npm install
```

## Running tests

Run the full suite:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test e2e/overview.spec.ts
```

Run a specific browser project:

```bash
npx playwright test --project=chromium
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Debug a test:

```bash
npx playwright test --debug
```

Open the HTML report:

```bash
npx playwright show-report
```

## Auth setup flow

Authentication is handled through the setup flow defined in `e2e/auth.setup.ts`.

The setup process runs first and prepares an authenticated session, which is then reused by browser projects during test execution.

Example flow:

```text
setup project
  -> auth.setup.ts
  -> creates auth state (for example, admin.json)
  -> chromium project runs tests using that auth state
```

## Key Terminology

Understanding these terms helps when working with Playwright fixtures and tests:

### Framework & Testing
- **`test`** — The Playwright test framework/runner. This is the object you call to define and execute tests. In this project, it's extended with custom fixtures.
- **`expect`** — An assertion library (not a framework). Used within tests to validate that results match expectations.
  ```ts
  test('my test', async () => {
      expect(value).toBe(true);  // expect validates the result
  });
  ```

### Fixtures
- **Fixture** — A reusable setup/teardown mechanism for tests. Fixtures run before each test and clean up after.
  - **Setup phase** — Runs before the test to prepare resources
  - **Use phase** — The test itself runs here
  - **Teardown phase** — Runs after the test to clean up resources

### Type System
- **Type** — A TypeScript definition that describes the shape of an object. Example: `type ApiFixtures = { apiRequest: APIRequestContext }`
- **Generic** — A placeholder for a type. Example: `base.extend<ApiFixtures>` — the `<ApiFixtures>` is a generic specifying what type of fixtures are being added
- **Property** — A named item within a type. Example: in `type ApiFixtures = { apiRequest: ... }`, `apiRequest` is the property name

### Contexts
- **Context** — An isolated browser or API session with its own cookies, storage, and state. Multiple contexts can run simultaneously without interfering.
  - **Browser context** — Isolated session for browser automation (like an incognito window)
  - **API request context** — Isolated session for HTTP API requests with its own authentication and base URL

### Key Matching Rule
When defining fixtures, the **property name in the type must match the property name in the implementation**:
```ts
type ApiFixtures = {
    apiRequest: APIRequestContext;  // Property name
};

export const test = base.extend<ApiFixtures>({
    apiRequest: async ({}, use) => {  // MUST match the type property name
        // implementation
    },
});
```

## Project structure

```text
.
├── auth/                 # Stored auth/session state
├── component/            # Reusable UI component helpers
├── e2e/                  # End-to-end test specs
├── fixtures/             # Shared fixtures and setup utilities
├── pages/                # Page Object Model classes
├── utils/                # Assertion helpers and generic utilities
├── playwright.config.ts  # Playwright configuration
├── package.json          # Project scripts and dependencies
├── readme.md             # Project documentation
├── tsconfig.json         # TypeScript configuration
└── playwright-report/    # Generated Playwright HTML reports
```

## Testing conventions

A good mental model for this repo is:

- `pages/` = how to interact with a specific page
- `component/` = how to interact with reusable UI components
- `utils/` = generic helper logic and assertion utilities
- `e2e/` = the business workflows being validated

This separation helps keep tests maintainable and reduces duplication.

## Playwright locator reference

### `locator.filter()`

`filter()` narrows an existing locator. It returns another locator, so it can be chained with other locator methods.

```ts
const emailHeader = table
  .locator('thead th')
  .filter({ hasText: /^\s*Email\s*$/ });
```

The available filter options are:

| Option | Purpose | Example |
| --- | --- | --- |
| `hasText` | Keeps elements containing the given text or matching regular expression | `.filter({ hasText: 'Active' })` |
| `hasNotText` | Keeps elements that do not contain the given text | `.filter({ hasNotText: 'Archived' })` |
| `has` | Keeps elements containing a matching descendant locator | `.filter({ has: page.getByRole('button', { name: 'Edit' }) })` |
| `hasNot` | Keeps elements that do not contain a matching descendant locator | `.filter({ hasNot: page.locator('.error') })` |
| `visible` | Keeps visible or hidden elements | `.filter({ visible: true })` |

Example using `has` to find the correct card before clicking its button:

```ts
const productCard = page
  .locator('.product-card')
  .filter({ hasText: 'Laptop' });

await productCard.getByRole('button', { name: 'Add to cart' }).click();
```

Filters can be chained:

```ts
const activeUser = page
  .locator('tr')
  .filter({ hasText: 'John' })
  .filter({ hasText: 'Active' });
```

### `locator.evaluate()`

`evaluate()` runs a JavaScript function in the browser page using the element matched by the locator. It is useful for reading DOM information that does not have a direct Playwright locator method.

```ts
const button = page.getByRole('button', { name: 'Save' });

const className = await button.evaluate(element => element.className);
const tagName = await button.evaluate(element => element.tagName);
const testId = await button.evaluate(element =>
  element.getAttribute('data-testid')
);
```

It can also calculate values from the DOM:

```ts
const width = await button.evaluate(element =>
  element.getBoundingClientRect().width
);
```

Values can be passed into the browser function as the second argument:

```ts
const expectedClass = 'primary';

const hasClass = await button.evaluate(
  (element, className) => element.classList.contains(className),
  expectedClass
);
```

In `utils/assertions/FieldAssertions.ts`, `evaluate()` finds a table header's position so the matching cell can be selected from the first data row.

For normal checks, prefer Playwright's built-in locators and assertions because they automatically wait and retry:

```ts
await expect(button).toHaveText('Save');
await expect(button).toBeDisabled();
```

Use `evaluate()` when custom browser-side DOM logic is genuinely needed. The callback should return values that can be transferred from the browser, such as strings, numbers, booleans, arrays, or plain objects.

Official documentation:

- [Locator filtering](https://playwright.dev/docs/locators#filtering-locators)
- [Locator API: `filter()`](https://playwright.dev/docs/api/class-locator#locator-filter)
- [Locator API: `evaluate()`](https://playwright.dev/docs/api/class-locator#locator-evaluate)
- [Evaluating JavaScript](https://playwright.dev/docs/evaluating)

## Troubleshooting

If a test fails unexpectedly:

- confirm the app is running and reachable
- verify the auth state is valid
- check the browser/project configuration in `playwright.config.ts`
- review the Playwright trace and HTML report for failed runs

## Notes

This project uses Playwright's test runner with a structured layout for page objects, authentication, utilities, and reusable assertions. The goal is to make test flows clear, modular, and easy to extend as the application grows.

## Quick reference

| Command | What it does |
| --- | --- |
| `npx playwright test --ui` | Opens Playwright UI mode |
| `npx playwright test --ui --project=chromium` | UI mode for Chromium tests |
| `npx playwright test --headed` | Runs tests in a visible browser window |
| `npx playwright test --debug` | Debug a test interactively |
| `npx playwright show-report` | Opens the generated HTML report |