import { test, expect } from '../pageObjects/fixtures';
import { products } from '../fixtures/products';
import _ = require('lodash');

test.describe('test scenarios to verify PDP functionality', async () => {
  test('verify user is able to switch between different product colours', async ({ app, page }) => {
    const targetProduct = _.sample(products.withColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    const newColour =
      await app.productDetailsPage.selectDifferentColourOption();
    expect(page.url()).not.toContain(targetProduct.sku);
    await expect(app.productDetailsPage.selectedColourByline).toHaveText(
      newColour
    );
    await app.productDetailsPage.addToBagButton.click();
    await expect(app.productDetailsPage.addedToBagContextCard).toBeVisible();
    await app.bagPage.navigateToBagPage();
    await expect(page.getByText(newColour).first()).toBeVisible();
  });
  test('verify user is able to switch between different product sizes', async ({ app, page }) => {
    const targetProduct = _.sample(products.withSize);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.selectSizeButton.click();
    const newSize = await app.productDetailsPage.selectDifferentSizeOption();
    await expect(app.productDetailsPage.selectedSizeByline).toHaveText(newSize);
    expect(page.url()).not.toContain(targetProduct.sku);
    await app.productDetailsPage.addToBagButton.click();
    await expect(app.productDetailsPage.addedToBagContextCard).toBeVisible();
    await app.bagPage.navigateToBagPage();
    await expect(page.getByText(newSize).first()).toBeVisible();
  });
  test('verify user is able to view product information', async ({ app }) => {
    const targetProduct = _.sample(products.noSizeNoColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.productDetailsSection.click();
    await expect(
      app.productDetailsPage.productDetailsInformation
    ).toBeVisible();
    await app.productDetailsPage.closePDPInformationButton.click();
    await expect(
      app.productDetailsPage.productDetailsInformation
    ).not.toBeVisible();
  });
});
