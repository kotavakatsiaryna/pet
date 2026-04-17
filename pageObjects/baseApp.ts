import { Page } from '@playwright/test';
import { BagPage } from './bagPage';
import { PdpPage } from './pdpPage';
import { ProductListPage } from './productListPage';
import { HeaderComponent } from './headerComponent';
import { SearchResultsPage } from './searchResultsPage';
import {expect} from '@playwright/test';

export class App {
    private page: Page;
    bagPage: BagPage;
    productDetailsPage: PdpPage;
    productListPage: ProductListPage;
    headerBar: HeaderComponent;
    searchResultsPage: SearchResultsPage;

    constructor(page: Page) {
        this.page = page;
        this.bagPage = new BagPage(page);
        this.productDetailsPage = new PdpPage(page);
        this.productListPage = new ProductListPage(page);
        this.headerBar = new HeaderComponent(page);
        this.searchResultsPage = new SearchResultsPage(page);
    }

    async acceptCookies(): Promise<void> {
        await this.page.locator('#onetrust-accept-btn-handler').click();
        await expect(this.page.locator('#onetrust-policy-title')).not.toBeVisible();
    }
}
