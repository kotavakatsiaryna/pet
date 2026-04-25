import { test, expect } from '@playwright/test';
import { App } from '../pageObjects/baseApp';
import { products } from '../fixtures/products';
import _ = require('lodash');

test.describe('test scenarios to verify PDP functionality', async () => {
  let app, page;
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
  test('verify user is able to switch between different product colours', async () => {
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
  test('verify user is able to switch between different product sizes', async () => {
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
  test('verify user is able to view product information', async () => {
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
