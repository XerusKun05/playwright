import { expect, Locator, Page } from '@playwright/test';

export class FieldAssertions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async assertField(
        label: string,
        expectedValue: string
    ): Promise<void> {
        const fieldLabel = this.page
            .locator('.field-label')
            .filter({
                hasText: new RegExp(`^\\s*${label}\\s*$`)
            });

        await expect(
            fieldLabel.locator('..').locator('.field-value')
        ).toContainText(expectedValue);
    }

    async assertFields(
        fields: [string, string][]
    ): Promise<void> {

        for (const [label, expectedValue] of fields) {
            await this.assertField(label, expectedValue);
        }
    }

    async assertTableField(
        table: Locator,
        label: string,
        expectedValue: string
    ): Promise<void> {

        const header = table
            .locator('thead th')
            .filter({
                hasText: new RegExp(`^\\s*${label}\\s*$`)
            });

        const columnIndex = await header.evaluate(
            element =>
                Array.from(element.parentElement!.children)
                    .indexOf(element)
        );

        const value = table
            .locator('tbody tr')
            .first()
            .locator('td')
            .nth(columnIndex);

        await expect(value).toContainText(expectedValue);
    }
}