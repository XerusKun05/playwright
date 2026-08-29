import {
    APIRequestContext,
    request,
    test as base,
} from '@playwright/test';

type ApiFixtures = {
    apiRequest: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
    apiRequest: async ({}, use) => {
        const apiRequest = await request.newContext({
            baseURL: process.env.API_URL,
            storageState: 'auth/admin.json',
        });

        await use(apiRequest);
        await apiRequest.dispose();
    },
});

export { expect } from '@playwright/test';
