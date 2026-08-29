import productData from '../data/product.json';
import { test, expect } from '../fixtures/api.fixture';
import { ProductPage } from '../pages/ProductPage';

test('user can create a product', async ({ page, apiRequest }) => {

    const product = productData.data;
    const variant = product.variants['0'];
    const productPage = new ProductPage(page);

    await test.step('Check that the product name is available', async () => {
        const response = await apiRequest.get('/product', {
            params: {
                searchQuery: product.name,
            },
        });

        expect(response.ok()).toBeTruthy();

        const result = await response.json();
        expect(result.rows).toHaveLength(0);
        expect(result.count).toBe(0);
    });

    await test.step('Open the create product page', async () => {
        await productPage.goto();
        await expect(productPage.productName).toBeVisible();
    });

    await test.step('Enter the product details', async () => {
        await productPage.enterProductName(product.name);
        await productPage.selectStockType('regular');
        await productPage.selectProductType(true, true);

        await productPage.unit.fancySelect('Piece (pc)');
        await productPage.inventoryAccount.fancySelect('Merchandise Inventory');
        await productPage.revenueAccountName.fancySelect('Sales');

        await productPage.enterSKU(variant.sku);
        await productPage.enterBuyingPrice(variant.buyingPrice);
        await productPage.enterSellingPrice(variant.sellingPrice);
    });

    await test.step('Verify the selected product options', async () => {
        await expect(productPage.regularStock).toBeChecked();
        await expect(productPage.forBuying).toBeChecked();
        await expect(productPage.forSelling).toBeChecked();
    });

    await test.step('Save and verify the created product', async () => {
        await productPage.save();

        await productPage.assertions.assertFields([
            ['Name', product.name],
            ['Stock Type', 'Regular'],
            ['Product Type', 'For Buying, For Selling'],
            ['Unit', 'Piece (pc)'],
            ['Inventory Account Name', 'Merchandise Inventory'],
            ['Revenue Account Name', 'Sales'],
        ]);

        await productPage.assertions.assertTableField(
            productPage.productDetailsTable,
            'SKU',
            variant.sku
        );
    });

});