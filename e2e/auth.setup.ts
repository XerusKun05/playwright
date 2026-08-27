// auth/auth.setup.ts

import { test as setup, expect } from '@playwright/test';


setup('authenticate', async ({ request }) => {
    const response = await request.post(`${process.env.API_URL}/login`, {
        data: {
            username: process.env.user_name,
            password: process.env.pass_word,
        },
        headers: {
            'X-CSRF-Protection': '1',
        },
    });

    console.log('Status:', response.status());
    expect(response.ok()).toBeTruthy();

    await request.storageState({
        path: 'auth/admin.json',
    });
});