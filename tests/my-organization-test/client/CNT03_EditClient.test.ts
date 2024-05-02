import { test } from "@playwright/test";
import * as data from "../../../utils/data/login/logindata.cred.json";
import * as dataClient from "../../../utils/data/my-organization/client/edit-client.json";
import { LoginPage } from "../../../src/page/Login/login";
import { EditClient } from "../../../src/page/My-Organization/client/edit-client";
import { LocatorToClient } from "../../../src/page/My-Organization/client/locator-to-client-tab";
import { CreateClient } from "../../../src/page/My-Organization/client/create-client";
import * as dataCreateClient from "../../../utils/data/my-organization/client/create-client.json";
import { SearchClient } from "../../../src/page/My-Organization/client/search-client";

test.describe("TC024: Edit Client", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(3000);
  });
  test("Edit Client", async ({ page }) => {
    const locatorClient = new LocatorToClient(page);
    await locatorClient.locatorToClient();
    const create = new CreateClient(page);
    await create.createClient(
      dataCreateClient[0].name,
      dataCreateClient[0].company,
      dataCreateClient[0].address,
      dataCreateClient[0].city,
      dataCreateClient[0].abn
    );
    const search = new SearchClient(page);
    await search.search(dataCreateClient[0].name);
    const editItem = new EditClient(page);
    await editItem.editClient(
      dataClient.name,
      dataClient.company,
      dataClient.address,
      dataClient.city,
      dataClient.abn
    );
  });
});
