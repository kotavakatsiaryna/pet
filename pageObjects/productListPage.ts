import { Locator, Page } from '@playwright/test';

export class ProductListPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page
  }

  get addedToBagToast(): Locator {
    return this.page.locator('.hnf-toast--show');
  }

  get addToCartButton(): Locator {
    return this.page.locator('button[aria-label*="to cart"]').nth(1);
  }

  async navigateToCategory(category: string): Promise<void> {
    await this.page.goto(`/de/en/cat/${category}`);
  }
}
