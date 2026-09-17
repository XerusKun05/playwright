// auth/auth.setup.ts

import { test as setup, expect } from '@playwright/test';


setup('authenticate', async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/login`, {
        data: {
            username: process.env.USER_NAME,
            password: process.env.PASS_WORD,
        },
        headers: {
            'X-CSRF-Protection': '1',
        },
    });

    console.log('Status:', response.status());
    console.log('Response:', await response.text());    

    console.log('Status:', response.status());
    expect(response.ok()).toBeTruthy();

    await request.storageState({
        path: 'auth/admin.json',
    });
});