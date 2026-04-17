import { Locator, Page, expect } from '@playwright/test';

export class BagPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page
    }

    get listOfAddedProducts(): Locator {
        return this.page.locator('div[itemscope]');
    }

    get increaseProductQtyButton(): Locator {
        return this.page.locator('button[aria-label^="Increase quantity"]');
    }

    get decreaseProductQtyButton(): Locator {
        return this.page.locator('button[aria-label^="Decrease quantity"]');
    }

    get productQtyIndicator(): Locator {
        return this.page.locator('input[aria-label^="Enter quantity"]');
    }

    get removeItemButton(): Locator {
        return this.page.locator('button[aria-label^="Remove"]');
    }

    get itemRemovedToast(): Locator {
        return this.page.locator('.cart-ingka-toast');
    }

    get emptyBagHeader(): Locator {
        return this.page.locator('h1').getByText('Your shopping bag is empty');
    }

    async navigateToBagPage(): Promise<void> {
        await this.page.goto('/de/en/shoppingcart/');
        await expect(this.page.locator('h1').getByText('Shopping bag')).toBeVisible();
        await this.page.waitForTimeout(500);
    }

    async getBagTotalSum(): Promise<number> {
        const bagTotalText = await this.page.getByTestId('order-subtotal-primary-price')
          .locator('span.notranslate').textContent();
        return +bagTotalText.slice(-1);
    }

    async getAddedItem(itemTitle: string): Promise<Locator> {
        return this.page.locator('a').getByText(itemTitle).first();
    }
}
