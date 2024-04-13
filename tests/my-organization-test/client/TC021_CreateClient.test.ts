import { Page, test } from "@playwright/test";
import * as data from "../../../utils/data/login/logindata.cred.json";
import { LoginPage } from "../../../src/page/Login/login";
import { CreateClient } from "../../../src/page/My-Organization/client/create-client";
import { LocatorToClient } from "../../../src/page/My-Organization/client/locator-to-client-tab";
import * as dataCreateClient from "../../../utils/data/my-organization/client/create-client.json";

test.describe("TC021: Fill all create Tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    await page.waitForTimeout(3000);
  });
  test("Create Client", async ({ page }) => {
    const locator = new LocatorToClient(page);
    await locator.locatorToClient();
    const create = new CreateClient(page);
    await create.createClient(
      dataCreateClient.name,
      dataCreateClient.company,
      dataCreateClient.address,
      dataCreateClient.city,
      dataCreateClient.abn
    );
  });
});
