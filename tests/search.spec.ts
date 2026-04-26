import { test, expect } from '../pageObjects/fixtures';

test.describe('test scenarios to verify search functionality', async () => {
  test('verify predictive search dropdown appears when user enters search query', async ({ app }) => {
    await app.headerBar.searchBox.fill('cha');
    await expect(app.headerBar.searchPredictiveDropdown).toBeVisible();
  });
  test('verify user gets search results when searching for some item', async ({ app }) => {
    await app.searchResultsPage.submitSearchQuery('chair');
    await expect(app.searchResultsPage.searchResultsHeading).toContainText(
      'chair'
    );
    await expect(app.searchResultsPage.foundProductsList).toBeVisible();
  });
  test('verify user can load more search results when being on SRP', async ({ app, page}) => {
    await app.searchResultsPage.submitSearchQuery('chair');
    expect(await app.searchResultsPage.productCards.count()).toEqual(22);
    await app.searchResultsPage.loadMoreProductsButton.click();
    await page.waitForTimeout(500); // waiting until newly loaded product get rendered
    expect(await app.searchResultsPage.productCards.count()).toEqual(46);
  });
});
