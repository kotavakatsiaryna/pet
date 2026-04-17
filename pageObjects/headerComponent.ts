import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
    private page: Page;
    constructor(page: Page) {
        this.page = page
    }

    get searchBox(): Locator {
        return this.page.locator('#ikea-search-input');
    }

    get searchPredictiveDropdown(): Locator {
        return this.page.getByRole('dialog', { name: 'Search suggestions' });
    }
}
