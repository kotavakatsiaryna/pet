import { test, expect } from '@playwright/test';
import { App } from '../pageObjects/baseApp';
import { products } from '../fixtures/products';
import _ = require('lodash');

test.describe('test scenarios to verify wishlist functionality', async () => {
  let app, page;
  test.beforeEach(
    'set up DE location and accept cookies',
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
  test('verify user is able to add product to the wishlist', async () => {
    const targetProduct = _.sample(products.noSizeNoColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.addToFavouritesButton.click();
    await app.productDetailsPage.waitForRemoveFromFavouritesButton();
    await expect(app.productDetailsPage.addedToWishlistToast).toBeVisible();
    await app.favouritesPage.navigateToFavouritesPage();
    await app.favouritesPage.openWishlistButton.click();
    await expect(
      await app.favouritesPage.getWishlistedProduct(targetProduct.title)
    ).toBeVisible();
  });
  test('verify user is able to remove product from the wishlist', async () => {
    const targetProduct = _.sample(products.noSizeNoColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.addToFavouritesButton.click();
    await app.productDetailsPage.waitForRemoveFromFavouritesButton();
    await app.favouritesPage.navigateToFavouritesPage();
    const navigationPromise = page.waitForNavigation();
    await app.favouritesPage.openWishlistButton.click();
    await navigationPromise;
    await expect(app.favouritesPage.wishlistHeader).toBeVisible();
    await expect(
      await app.favouritesPage.getWishlistedProduct(targetProduct.title)
    ).toBeVisible();
    await app.favouritesPage.removeProductFromWishlist(targetProduct.title);
    await expect(
      await app.favouritesPage.getWishlistedProduct(targetProduct.title)
    ).not.toBeVisible();
  });
  test('verify user is able to add product to the bag being on the wishlist page', async () => {
    const targetProduct = _.sample(products.noSizeNoColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.addToFavouritesButton.click();
    await app.productDetailsPage.waitForRemoveFromFavouritesButton();
    await app.favouritesPage.navigateToFavouritesPage();
    const navigationPromise = page.waitForNavigation();
    await app.favouritesPage.openWishlistButton.click();
    await navigationPromise;
    await expect(app.favouritesPage.wishlistHeader).toBeVisible();
    await app.favouritesPage.addWishlistedProductToBag(targetProduct.title);
    await app.bagPage.navigateToBagPage();
    await expect(
      await app.bagPage.getAddedItem(targetProduct.title)
    ).toBeVisible();
  });
});
