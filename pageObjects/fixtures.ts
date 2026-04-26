import { test as base } from '@playwright/test';
import { App } from './baseApp';

type MyFixtures = {
  app: App;
};

export const test = base.extend<MyFixtures>({
  app: async ({ context, page }, use) => {
    await context.addCookies([
      {
        name: 'ikea_geo',
        value: 'DE',
        url: 'https://ikea.com',
      },
    ]);
    page = await context.newPage();
    await page.goto('');
    const app = new App(page);
    await app.acceptCookies();

    await use(app);
  },
});

export { expect } from '@playwright/test';