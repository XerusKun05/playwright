import { test, expect } from '@playwright/test';
import { OverviewPage } from '../pages/OverviewPage';

test('authenticated user can access the overview', async ({ page }) => {

    const overviewPage = new OverviewPage(page);

    await overviewPage.goto();

    await expect(overviewPage.greeting)
        .toContainText('Administrator');
});