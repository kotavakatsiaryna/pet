import {expect, Locator, Page} from '@playwright/test';
import {HeaderComponent} from './headerComponent';

export class SearchResultsPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page
  }

  get searchResultsHeading(): Locator {
    return this.page.locator('h1.search-summary__heading');
  }

  get foundProductsList(): Locator {
    return this.page.locator('#product-list');
  }

  get productCards(): Locator {
    return this.page.locator('div[data-product-compact]');
  }

  get loadMoreProductsButton(): Locator {
    return this.page.getByLabel('Show more products');
  }

  async submitSearchQuery(searchQuery: string): Promise<void> {
    await new HeaderComponent(this.page).searchBox.fill(searchQuery);
    await this.page.keyboard.press('Enter');
    await expect(this.searchResultsHeading).toBeVisible();
  }
}
