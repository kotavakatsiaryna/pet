import { Page } from '@playwright/test';
import { HeaderComponent } from './headerComponent';
import { SearchResultsPage } from './searchResultsPage';
import {expect} from '@playwright/test';

export class App {
    private page: Page;
    headerBar: HeaderComponent;
    searchResultsPage: SearchResultsPage;

    constructor(page: Page) {
        this.page = page;
        this.headerBar = new HeaderComponent(page);
        this.searchResultsPage = new SearchResultsPage(page);
    }

    async acceptCookies(): Promise<void> {
        await this.page.locator('#onetrust-accept-btn-handler').click();
        await expect(this.page.locator('#onetrust-policy-title')).not.toBeVisible();
    }
}
