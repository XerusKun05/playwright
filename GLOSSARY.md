# Playwright Terminology Glossary

A comprehensive reference for important terms used in this Playwright test suite.

## Framework & Testing

### `test`
The Playwright test framework/runner object. This is what you use to define and execute tests.

**Example:**
```ts
import { test } from './fixtures/api.fixture';

test('my test name', async ({ apiRequest }) => {
    // test runs this function
});
```

In this project, `test` is extended with custom fixtures, so it's more powerful than the base Playwright test.

### `expect`
An assertion library (NOT a framework) used to validate test results. It checks if things are as expected.

**Example:**
```ts
expect(response.status).toBe(200);
expect(response.body).toContain('data');
```

## Fixtures

### Fixture
A reusable setup/teardown mechanism for tests. Fixtures automatically run before and after each test.

**Three phases:**
1. **Setup** — Prepare resources before the test runs
2. **Use** — The test itself runs
3. **Teardown** — Clean up resources after the test finishes

**Example:**
```ts
apiRequest: async ({}, use) => {
    // SETUP: Create API context
    const apiRequest = await request.newContext({...});
    
    // USE: Test runs here with apiRequest available
    await use(apiRequest);
    
    // TEARDOWN: Clean up
    await apiRequest.dispose();
}
```

### Context (Fixture Property)
The individual setup/teardown implementation for one fixture property.

## Type System

### Type
A TypeScript definition that describes the shape of an object. Provides type safety.

**Example:**
```ts
type ApiFixtures = {
    apiRequest: APIRequestContext;
};
```

This says: "An `ApiFixtures` object has a property called `apiRequest` of type `APIRequestContext`"

### Generic (Type Parameter)
A placeholder for a type, written with angle brackets `<>`. Tells TypeScript what type of fixtures are being added.

**Example:**
```ts
base.extend<ApiFixtures>({...})
```

The `<ApiFixtures>` is a generic — it specifies that we're extending the test with `ApiFixtures` type fixtures.

### Property
A named item within a type or object.

**Example:**
In `type ApiFixtures = { apiRequest: APIRequestContext }`, `apiRequest` is the property name.

## Contexts

### Context
An isolated session (browser or API) with its own cookies, storage, and state. Multiple contexts can run simultaneously without interfering.

### Browser Context
An isolated session for browser automation — like an incognito/private window. Each context has its own state.

**Example:**
```ts
const context = await browser.newContext();
const page = await context.newPage();
```

### API Request Context
An isolated session for making HTTP API requests. Manages connection pooling, authentication, and base URL configuration.

**Example:**
```ts
const apiRequest = await request.newContext({
    baseURL: 'https://api.example.com',
    storageState: 'auth/admin.json',  // loads cookies/tokens
});
```

## Important Rules

### Property Name Matching
When defining fixtures, **the property name in the type must match the property name in the implementation**:

```ts
type ApiFixtures = {
    apiRequest: APIRequestContext;  // Property name: "apiRequest"
};

export const test = base.extend<ApiFixtures>({
    apiRequest: async ({}, use) => {  // MUST be "apiRequest" to match
        // implementation
    },
});
```

If they don't match, Playwright will throw an error.

### Variable Names vs Property Names
The **local variable name inside the function** can be anything — only the **property name** matters:

```ts
apiRequest: async ({}, use) => {
    // This variable name can be anything
    const ctx = await request.newContext({...});
    await use(ctx);
    await ctx.dispose();
},
```

But the property name (`apiRequest:`) must match the type.

## Exports

### `export`
Makes code available to other files. Without it, only the current file can use it.

**Example:**
```ts
export const test = base.extend<ApiFixtures>({...});
```

Now other files can import and use this `test`:
```ts
import { test } from './fixtures/api.fixture';
```

### Re-export
Re-exporting something from another module for convenience.

**Example:**
```ts
export { expect } from '@playwright/test';
```

This lets tests import both `test` and `expect` from the same place:
```ts
import { test, expect } from './fixtures/api.fixture';
```

Instead of:
```ts
import { test } from './fixtures/api.fixture';
import { expect } from '@playwright/test';
```
