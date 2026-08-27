//run debug mode
npx playwright test --debug

//run specific browser
npx playwright test --

| Command                                       | What you get                  |
| --------------------------------------------- | ----------------------------- |
| `npx playwright test --ui`                    | Playwright Test UI            |
| `npx playwright test --ui --project=chromium` | Playwright UI, Chromium tests |
| `npx playwright test --headed`                | Actual browser window         |
| `npx playwright test --ui --headed`           | UI Mode + headed browser      |


Setup based on auth.setup.ts

setup project
    │
    │ runs first
    ▼
auth.setup.ts
    │
    │ creates admin.json
    ▼
chromium project
    │
    ▼
sample.spec.ts


A good mental model is:

Components = reusable UI behavior.
Utils = reusable non-UI helper logic.
Pages = page-specific UI behavior.


That gives you a very clear separation:

pages/

How do I interact with this specific page?

components/

How do I interact with this reusable UI component?

utils/

What generic helper functionality do I need?