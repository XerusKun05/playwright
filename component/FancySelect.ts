import { Page, Locator } from '@playwright/test';

export class FancySelect {
    readonly page: Page;
    readonly select: Locator;

    constructor(page: Page, name: string) {
        this.page = page;
        this.select = page.locator(`fancy-select[name="${name}"]`);
    }

    async fancySelect(option: string) {
        await this.select.click();

        await this.page
            .getByRole('treeitem', { name: option, exact: true })
            .click();
    }
}