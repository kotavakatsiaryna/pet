import { test, expect } from '../pageObjects/fixtures';
import { products } from '../fixtures/products';
import _ = require('lodash');

test.describe('test scenarios to verify wishlist functionality', async () => {
  let targetProduct: { sku: string; title: string };
  test.beforeEach(async ({ app }) => {
    targetProduct = _.sample(products.noSizeNoColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.addToFavouritesButton.click();
    await app.productDetailsPage.waitForRemoveFromFavouritesButton();
    await expect(app.productDetailsPage.addedToWishlistToast).toBeVisible();
    await app.favouritesPage.navigateToFavouritesPage();
    await app.favouritesPage.openWishlistButton.click();
    await expect(app.favouritesPage.wishlistHeader).toBeVisible();
  });
  test('verify user is able to add product to the wishlist', async ({ app }) => {
    await expect(
      await app.favouritesPage.getWishlistedProduct(targetProduct.title)
    ).toBeVisible();
  });
  test('verify user is able to remove product from the wishlist', async ({ app }) => {
    await app.favouritesPage.removeProductFromWishlist(targetProduct.title);
    await expect(
      await app.favouritesPage.getWishlistedProduct(targetProduct.title)
    ).not.toBeVisible();
  });
  test('verify user is able to add product to the bag being on the wishlist page', async ({ app }) => {
    await app.favouritesPage.addWishlistedProductToBag(targetProduct.title);
    await app.bagPage.navigateToBagPage();
    await expect(
      await app.bagPage.getAddedItem(targetProduct.title)
    ).toBeVisible();
  });
});
