import { Locator, Page } from '@playwright/test';

export class PdpPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page
    }

    get addToBagButton(): Locator {
        return this.page.getByRole('button', { name: 'Add to shopping bag' });
    }

    get addedToBagContextCard(): Locator {
        return this.page.locator('div[aria-label$="added to your shopping bag."]');
    }

    get closeContextCardButton(): Locator {
        return this.page.getByRole('button', { name: 'Close', exact: true });
    }

    async navigateToProductPage(productCode: string): Promise<void> {
        await this.page.goto(`/de/en/p/${productCode}`);
    }
}
