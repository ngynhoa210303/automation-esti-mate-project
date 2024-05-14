import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/page/Login/login';
import { LocatorToClient } from '../../src/page/My-Organization/client/locator-to-client-tab';
import { SearchClient } from '../../src/page/My-Organization/client/search-client';
import { CreateClient } from '../../src/page/My-Organization/client/create-client';
import * as dataCreateClient from '../../utils/data/my-organization/client/create-client.json';
import dotenv from 'dotenv';
import { DeleteClient } from '../../src/page/My-Organization/client/remove-client';
import { remove_button_locator } from '../../src/locator/my-organization-locator/client-locator/remove-and-search-client-locator';
import { EditClient } from '../../src/page/My-Organization/client/edit-client';
import * as dataClient from '../../utils/data/my-organization/client/edit-client.json';
dotenv.config();
test.skip('CNT01: Check Create Client --> Search --> Delete', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD),
    );
    await page.waitForTimeout(3000);
  });
  test('Check Client screen', async ({ page }) => {
    const locator = new LocatorToClient(page);
    await locator.locatorToClient();
    await test.step("Create Client", async () => {
      const create = new CreateClient(page);
      await create.createClient(
        dataCreateClient[2].name,
        dataCreateClient[2].company,
        dataCreateClient[2].address,
        dataCreateClient[2].city,
        dataCreateClient[2].abn,
      );
    })
    const search = new SearchClient(page);
    await test.step("Search Client after create client", async () => {
      await search.search(dataCreateClient[2].name);
    })
    await test.step("Edit client", async () => {
      const editItem = new EditClient(page);
      await editItem.editClient(
        dataClient.name,
        dataClient.company,
        dataClient.address,
        dataClient.city,
        dataClient.abn,
      );
    })
    await test.step("Search Client after edit client", async () => {
      await search.search(dataClient.name);
    })
    await test.step("Delete Client", async () => {
      const deleteItem = new DeleteClient(page);
      await deleteItem.deleteRandomElement();
      const inputLoopValue = page.locator(remove_button_locator);
      expect(!inputLoopValue);
    })
  });
});
