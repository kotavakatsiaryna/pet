import { Locator, Page, expect } from '@playwright/test';

export class FavouritesPage {
    private page: Page;
    constructor(page) {
        this.page = page
    }

    get listOfAddedProducts(): Locator {
        return this.page.locator('div[itemscope]');
    }

    get openWishlistButton(): Locator {
        return this.page.locator('button[data-testid="select-list-item"]');
    }

    get wishlistHeader(): Locator {
        return this.page.locator('h1[data-testid="list-detail-header"]');
    }

    getRemoveProductFromWishlistButton(productTitle: string): Locator {
        return this.page.locator('div', { has: this.page.getByText(productTitle) }).locator('[data-testid^="retail-remove"]');
    }

    async navigateToFavouritesPage(): Promise<void> {
        await this.page.goto('/de/en/favourites');
        await this.page.waitForTimeout(3000);
    }

    async getWishlistedProduct(productTitle: string): Promise<Locator> {
        return this.page.locator('li[data-testid^="item"]').getByText(productTitle).first();
    }

    async removeProductFromWishlist(productTitle: string): Promise<void> {
        await this.getRemoveProductFromWishlistButton(productTitle).click();
    }

    async addWishlistedProductToBag(productTitle: string): Promise<void> {
        await this.getRemoveProductFromWishlistButton(productTitle).locator('..').locator('button').first().click();
        await expect(this.page.locator('span').getByText('Show', { exact: true })).toBeVisible();
    }
}
