import { test } from "@playwright/test";
import * as data from "../../../utils/data/login/logindata.cred.json";
import * as dataClient from "../../../utils/data/my-organization/client/edit-client.json";
import { LoginPage } from "../../../src/page/Login/login";
import { EditClient } from "../../../src/page/My-Organization/client/edit-client";
import { LocatorToClient } from "../../../src/page/My-Organization/client/locator-to-client-tab";

test.describe("TC024: Edit Client", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Edit Client", async ({ page }) => {
    await page.waitForTimeout(2000);
    const locatorClient = new LocatorToClient(page);
    await locatorClient.locatorToClient();
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
