import { Page, Locator } from '@playwright/test';

export class OverviewPage {
    readonly page: Page;
    readonly greeting: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.greeting = page.locator('.overview-greetings');
        this.logoutButton = page.locator('.logout-button');
    }

    async goto() {
        await this.page.goto('/');
    }
}