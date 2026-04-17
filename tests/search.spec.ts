import { test, expect, Page} from '@playwright/test';
import {App} from '../pageObjects/baseApp';

test.describe('test scenarios to verify search functionality', async () => {
  let app: App, page: Page;
  test.beforeEach(
    'set up PL location and accept cookies',
    async ({ browser }) => {
      const context = await browser.newContext();
      await context.addCookies([
        {
          name: 'ikea_geo',
          value: 'DE',
          url: 'https://ikea.com',
        },
      ]);
      page = await context.newPage();
      await page.goto('');
      app = new App(page);
      await app.acceptCookies();
    }
  );
  test('verify predictive search dropdown appears when user enters search query', async () => {
    await app.headerBar.searchBox.fill('cha');
    await expect(app.headerBar.searchPredictiveDropdown).toBeVisible();
  });
  test('verify user gets search results when searching for some item', async () => {
    await app.searchResultsPage.submitSearchQuery('chair');
    await expect(app.searchResultsPage.searchResultsHeading).toContainText(
      'chair'
    );
    await expect(app.searchResultsPage.foundProductsList).toBeVisible();
  });
  test('verify user can load more search results when being on SRP', async () => {
    await app.searchResultsPage.submitSearchQuery('chair');
    expect(await app.searchResultsPage.productCards.count()).toEqual(22);
    await app.searchResultsPage.loadMoreProductsButton.click();
    await page.waitForTimeout(500); // waiting until newly loaded product get rendered
    expect(await app.searchResultsPage.productCards.count()).toEqual(46);
  });
});
