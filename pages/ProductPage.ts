import { Page, Locator } from '@playwright/test';
import { FancySelect } from '../component/FancySelect';
import { FieldAssertions } from '../utils/assertions/FieldAssertions';

export class ProductPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly regularStock: Locator;
    readonly serializedStock: Locator;
    readonly batchStock: Locator;
    readonly forBuying: Locator;
    readonly forSelling: Locator;
    readonly unit: FancySelect;
    readonly sku: Locator;
    readonly barcode: Locator;
    readonly buyingPrice: Locator;
    readonly sellingPrice: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;
    readonly skuTable: Locator;
    readonly inventoryAccount: FancySelect;
    readonly revenueAccountName: FancySelect;
    readonly assertions: FieldAssertions;
    readonly productDetailsTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.assertions = new FieldAssertions(page);

        this.productName = page.getByPlaceholder('Enter product name');

        this.regularStock = page.locator('[id="StockTrackingType.None"]');
        this.serializedStock = page.locator('[id="StockTrackingType.Serial"]');
        this.batchStock = page.locator('[id="StockTrackingType.Batch"]');

        this.forBuying = page.locator('input[name="isForBuying"]');
        this.forSelling = page.locator('input[name="isForSelling"]');

        this.unit = new FancySelect(page, 'unit');
        this.inventoryAccount = new FancySelect(page, 'accountName');
        this.revenueAccountName = new FancySelect(page, 'revenueAccountName');


        this.sku = page.getByPlaceholder('Enter SKU');
        this.barcode = page.getByPlaceholder('Enter barcode');

        this.skuTable = page.locator('table.table.table-striped');


        this.buyingPrice = this.skuTable
            .locator('numeric-input[type="money"]')
            .nth(0)
            .locator('input');

        this.sellingPrice = this.skuTable
            .locator('numeric-input[type="money"]')
            .nth(1)
            .locator('input');

        // this.buyingPrice = page
        //     .locator('table.table.table-striped')
        //     .locator('numeric-input[type="money"]')
        //     .nth(0)
        //     .locator('input');

        // this.sellingPrice = page
        //     .locator('table.table.table-striped')
        //     .locator('numeric-input[type="money"]')
        //     .nth(1)
        //     .locator('input');


        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.cancelButton = page.getByRole('link', { name: 'Cancel' });

        this.productDetailsTable = page
            .locator('table.table.table-striped')
            .filter({
                has: page.getByRole('columnheader', { name: 'SKU' })
            });
    }

    async goto() {
        await this.page.goto('/product/new');
    }

    async enterProductName(name: string) {
        await this.productName.fill(name);
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

    // async openUnitDropdown() {
    //     await this.unit.click();
    // }

    // async selectUnit(unit: string) {
    //     await this.openUnitDropdown();

    //     await this.page
    //         .getByRole('treeitem', { name: unit })
    //         .click();
    // }

    async enterSKU(sku: string) {
        await this.sku.fill(sku);
    }

    async enterBuyingPrice(price: string) {
        await this.buyingPrice.fill(price);
    }

    async enterSellingPrice(price: string) {
        await this.sellingPrice.fill(price);
    }

    async save() {
        await this.saveButton.click();
        // await this.page.getByRole('button', { name: 'Save' }).click();
    }
}