import { test, expect } from '../pageObjects/fixtures';
import {products} from '../fixtures/products';
import {categories} from '../fixtures/categories';
import _ = require('lodash');

test.describe('test scenarios to verify bag functionality', async () => {
  test('verify user is able to add any item to the bag being on PDP', async ({ app }) => {
    const targetProduct = _.sample(products.noSizeNoColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.addToBagButton.click();
    await expect(app.productDetailsPage.addedToBagContextCard).toBeVisible();
    await app.productDetailsPage.closeContextCardButton.click();
    await expect(app.headerBar.bagCounter).toHaveText('1');
    await app.bagPage.navigateToBagPage();
    expect(await app.bagPage.listOfAddedProducts.count()).toEqual(1);
    await expect(
      await app.bagPage.getAddedItem(targetProduct.title)
    ).toBeVisible();
  });
  test('verify user is able to add any item to the bag being on PLP', async ({ app }) => {
    await app.productListPage.navigateToCategory(_.sample(categories));
    await app.productListPage.addToCartButton.click();
    await expect(app.productListPage.addedToBagToast).toBeVisible();
    await expect(app.productListPage.addedToBagToast).toContainText(
      'was added to your shopping bag'
    );
    await expect(app.headerBar.bagCounter).toHaveText('1');
    await app.bagPage.navigateToBagPage();
    expect(await app.bagPage.listOfAddedProducts.count()).toEqual(1);
  });
  test('verify user is able to increase product amount in the bag', async ({ app, page }) => {
    const targetProduct = _.sample(products.noSizeNoColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.addToBagButton.click();
    await expect(app.productDetailsPage.addedToBagContextCard).toBeVisible();
    await app.bagPage.navigateToBagPage();
    const startBagSum = await app.bagPage.getBagTotalSum();
    await app.bagPage.increaseProductQtyButton.click();
    await page.waitForTimeout(1000);
    await expect(app.bagPage.productQtyIndicator).toHaveValue('2');
    await expect(app.headerBar.bagCounter).toHaveText('2');
    const finalBagSum = await app.bagPage.getBagTotalSum();
    expect(finalBagSum).toEqual(startBagSum * 2);
  });
  test('verify user is able to decrease product amount in the bag', async ({ app, page }) => {
    const targetProduct = _.sample(products.noSizeNoColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.addToBagButton.click();
    await expect(app.productDetailsPage.addedToBagContextCard).toBeVisible();
    await app.productDetailsPage.closeContextCardButton.click();
    await app.productDetailsPage.addToBagButton.click();
    await expect(app.productDetailsPage.addedToBagContextCard).toBeVisible();
    await app.bagPage.navigateToBagPage();
    const startBagSum = await app.bagPage.getBagTotalSum();
    await app.bagPage.decreaseProductQtyButton.click();
    await page.waitForTimeout(1000);
    await expect(app.bagPage.productQtyIndicator).toHaveValue('1');
    await expect(app.headerBar.bagCounter).toHaveText('1');
    const finalBagSum = await app.bagPage.getBagTotalSum();
    expect(finalBagSum).toEqual(startBagSum / 2);
  });
  test('verify user is able to remove product from the bag', async ({ app }) => {
    const targetProduct = _.sample(products.noSizeNoColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.addToBagButton.click();
    await expect(app.productDetailsPage.addedToBagContextCard).toBeVisible();
    await app.bagPage.navigateToBagPage();
    await app.bagPage.removeItemButton.click();
    await expect(app.bagPage.itemRemovedToast).toBeVisible();
    await expect(app.bagPage.itemRemovedToast).toContainText(
      'was removed from your shopping bag'
    );
    await expect(app.headerBar.bagCounter).not.toBeVisible();
    await expect(app.bagPage.emptyBagHeader).toBeVisible();
  });
  test('verify user is able to add several different products to the bag', async ({ app }) => {
    const targetProduct1 = products.noSizeNoColour[0];
    const targetProduct2 = products.noSizeNoColour[1];
    await app.productDetailsPage.navigateToProductPage(targetProduct1.sku);
    await app.productDetailsPage.addToBagButton.click();
    await expect(app.productDetailsPage.addedToBagContextCard).toBeVisible();
    await app.productDetailsPage.navigateToProductPage(targetProduct2.sku);
    await app.productDetailsPage.addToBagButton.click();
    await expect(app.productDetailsPage.addedToBagContextCard).toBeVisible();
    await app.bagPage.navigateToBagPage();
    expect(await app.bagPage.listOfAddedProducts.count()).toEqual(2);
    await expect(
      await app.bagPage.getAddedItem(targetProduct1.title)
    ).toBeVisible();
    await expect(
      await app.bagPage.getAddedItem(targetProduct2.title)
    ).toBeVisible();
  });
  test('verify user can go to PDP from bag', async ({ app, page }) => {
    const targetProduct = _.sample(products.noSizeNoColour);
    await app.productDetailsPage.navigateToProductPage(targetProduct.sku);
    await app.productDetailsPage.addToBagButton.click();
    await expect(app.productDetailsPage.addedToBagContextCard).toBeVisible();
    await app.bagPage.navigateToBagPage();
    await (await app.bagPage.getAddedItem(targetProduct.title)).click();
    await expect(app.productDetailsPage.addToBagButton).toBeVisible();
    expect(page.url()).toContain(targetProduct.sku);
  });
});
