import { Locator, Page } from '@playwright/test';
import _ = require('lodash');

export class PdpPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page
    }

    get addToBagButton(): Locator {
        return this.page.getByRole('button', { name: 'Add to shopping bag' }).first();
    }

    get addedToBagContextCard(): Locator {
        return this.page.locator('div[aria-label$="added to your shopping bag."]');
    }

    get closeContextCardButton(): Locator {
        return this.page.getByRole('button', { name: 'Close', exact: true });
    }

    get productDetailsSection(): Locator {
        return this.page.locator('span').getByText('Product details');
    }

    get listOfAvailableAdditionalColours(): Locator {
        return this.page.getByLabel('Choose colour')
          .locator('li > a.pipf-product-style-picker__link');
    }

    get listOfAvailableAdditionalSizes(): Locator {
        return this.page.locator('a.pipf-choice-item__action');
    }

    get selectedColourByline(): Locator {
        return this.page.locator('span.pipf-list-view-item__addon').first();
    }

    get selectedSizeByline(): Locator {
        return this.page.getByText('Choose size').locator('..').locator('..').locator('span').last();
    }

    get selectSizeButton(): Locator {
        return this.page.locator('button[aria-controls=pipf-product-variation-size]');
    }

    get productDetailsInformation(): Locator {
        return this.page.getByLabel('Product details');
    }

    get closePDPInformationButton(): Locator {
        return this.page.getByLabel('Close modal');
    }

    async navigateToProductPage(productCode: string): Promise<void> {
        await this.page.goto(`/de/en/p/${productCode}`);
    }

    get addedToWishlistToast(): Locator {
        return this.page.locator('div[role=alertdialog]')
    }

    get addToFavouritesButton(): Locator {
        return this.page.getByLabel('Save to shopping list');
    }

    async waitForRemoveFromFavouritesButton(): Promise<void> {
        await this.page.waitForSelector('[aria-label="Remove from shopping list"]:visible');
    }

    async selectDifferentColourOption(): Promise<string> {
        const randomIndex = _.random(0, await this.listOfAvailableAdditionalColours.count() - 1)
        const pickedColour = await this.listOfAvailableAdditionalColours.nth(randomIndex).getAttribute('aria-label');
        await this.listOfAvailableAdditionalColours.nth(randomIndex).click();
        await this.page.waitForTimeout(2000);
        return pickedColour;
    }

    async selectDifferentSizeOption(): Promise<string> {
        const randomIndex = _.random(0, await this.listOfAvailableAdditionalSizes.count() - 1)
        const pickedSize = await this.listOfAvailableAdditionalSizes
          .nth(randomIndex)
          .locator('.pipf-choice-item__title')
          .textContent();
        await this.listOfAvailableAdditionalSizes.nth(randomIndex).click();
        await this.page.waitForTimeout(2000);
        return pickedSize;
    }
}
