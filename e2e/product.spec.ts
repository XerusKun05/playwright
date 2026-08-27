import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test('user can access create product page', async ({ page }) => {

    const productPage = new ProductPage(page);

    await productPage.goto();

    await expect(productPage.productName).toBeVisible();
    await productPage.enterProductName('Test Product 1');
    await productPage.selectStockType('regular');
    await productPage.selectProductType(true, true);

    await expect(productPage.regularStock).toBeChecked();
    await expect(productPage.forBuying).toBeChecked();
    await expect(productPage.forSelling).toBeChecked();

    await productPage.unit.fancySelect('Piece (pc)');
    await productPage.inventoryAccount.fancySelect('Merchandise Inventory');
    await productPage.revenueAccountName.fancySelect('Sales');

    await productPage.enterSKU('TEST-001');
    await productPage.enterBuyingPrice('100');
    await productPage.enterSellingPrice('150');

    await productPage.save();

    // await productPage.assertions
    //     .assertField('Name', 'Test Product 1')
    //     .assertField('Stock Type', 'Regular')
    //     .assertField('Buying', 'Yes')
    //     .assertField('Selling', 'Yes')
    //     .assertField('Unit', 'Piece (pc)')
    //     .assertField('Inventory Account', 'Merchandise Inventory')
    //     .assertField('Revenue Account Name', 'Sales')
    //     .assertField('SKU', 'TEST-001')
    //     .assertField('Buying Price', '100.00')
    //     .assertField('Selling Price', '150.00');

    await productPage.assertions.assertFields([
        ['Name', 'Test Product 1'],
        ['Stock Type', 'Regular'],
        ['Product Type', 'For Buying, For Selling'],
        //  ['Selling', 'Yes'],
        ['Unit', 'Piece (pc)'],
        ['Inventory Account Name', 'Merchandise Inventory'],
        ['Revenue Account Name', 'Sales'],
        //   ['SKU', 'TEST-001'],
        //  ['Buying Price', '100.00'],
        //  ['Selling Price', '150.00'],
    ]);

    await productPage.assertions.assertTableField(
        productPage.productDetailsTable,
        'SKU',
        'TEST-001'
    );

});