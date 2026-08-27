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