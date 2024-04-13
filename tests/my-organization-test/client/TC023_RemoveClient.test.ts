import { test } from "@playwright/test";
import * as data from "../../../utils/data/login/logindata.cred.json";
import { LoginPage } from "../../../src/page/Login/login";
import { DeleteClient } from "../../../src/page/My-Organization/client/remove-client";
import { LocatorToClient } from "../../../src/page/My-Organization/client/locator-to-client-tab";

test.describe("TC023: Remove client", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Remove client", async ({ page }) => {
    await page.waitForTimeout(2000);
    const locatorClient = new LocatorToClient(page);
    await locatorClient.locatorToClient();
    const deleteItem = new DeleteClient(page);
    await deleteItem.deleteRandomElement();
  });
});
