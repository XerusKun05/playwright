import { Page, Locator } from '@playwright/test';
import { FancySelect } from '../component/FancySelect';

export class ProductPage {
    readonly page: Page;
    readonly regularStock: Locator;
    readonly serializedStock: Locator;
    readonly batchStock: Locator;
    readonly forBuying: Locator;
    readonly forSelling: Locator;

    readonly skuTable: Locator;

    readonly unit: FancySelect;
    readonly inventoryAccount: FancySelect;
    readonly revenueAccountName: FancySelect;


    constructor(page: Page) {
        this.page = page;

        this.regularStock = page.locator('[id="StockTrackingType.None"]');
        this.serializedStock = page.locator('[id="StockTrackingType.Serial"]');
        this.batchStock = page.locator('[id="StockTrackingType.Batch"]');

        this.forBuying = page.locator('input[name="isForBuying"]');
        this.forSelling = page.locator('input[name="isForSelling"]');

        this.unit = new FancySelect(page, 'unit');
        this.inventoryAccount = new FancySelect(page, 'accountName');
        this.revenueAccountName = new FancySelect(page, 'revenueAccountName');

        this.skuTable = page.locator('table.table.table-striped');
    }

    async goto() {
        await this.page.goto('/product/new');
    }

    async enterProductName(name: string) {
        await this.page.getByPlaceholder('Enter product name').fill(name);
    }

    async selectStockType(type: 'regular' | 'serialized' | 'batch') {
        switch (type) {
            case 'regular':
                await this.regularStock.check();
                break;

            case 'serialized':
                await this.serializedStock.check();
                break;

            case 'batch':
                await this.batchStock.check();
                break;
        }
    }

    async selectProductType(buying: boolean, selling: boolean) {
        if (buying) {
            await this.forBuying.check();
        }

        if (selling) {
            await this.forSelling.check();
        }
    }

    async enterSKU(sku: string) {
        await this.page.getByPlaceholder('Enter SKU').fill(sku);
    }

    async enterBuyingPrice(price: string) {
        await this.skuTable
            .locator('numeric-input[type="money"]')
            .nth(0)
            .locator('input')
            .fill(price);
    }

    async enterSellingPrice(price: string) {
        await this.skuTable
            .locator('numeric-input[type="money"]')
            .nth(1)
            .locator('input')
            .fill(price);
    }

    async save() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async cancel() {
        await this.page.getByRole('link', { name: 'Cancel' }).click();
    }
}