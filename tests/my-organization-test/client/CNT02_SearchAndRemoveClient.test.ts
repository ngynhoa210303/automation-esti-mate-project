import { test } from "@playwright/test";
import { LoginPage } from "../../../src/page/Login/login";
import { LocatorToClient } from "../../../src/page/My-Organization/client/locator-to-client-tab";
import { SearchClient } from "../../../src/page/My-Organization/client/search-client";
import { CreateClient } from "../../../src/page/My-Organization/client/create-client";
import * as dataCreateClient from "../../../utils/data/my-organization/client/create-client.json";
import dotenv from "dotenv";
import { DeleteClient } from "../../../src/page/My-Organization/client/remove-client";
dotenv.config();
test.describe("CNT02: Create Client --> Search --> Delete", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const EMAIL = process.env.EMAIL;
    const PASSWORD = process.env.PASSWORD;
    if (!EMAIL || !PASSWORD) {
      throw new Error(
        "Email and/or Password environment variables are not defined."
      );
    }
    await loginPage.login(EMAIL, PASSWORD);
    await page.waitForTimeout(3000);
  });
  test("Create Client --> Search --> Delete", async ({ page }) => {
    const locator = new LocatorToClient(page);
    await locator.locatorToClient();
    const create = new CreateClient(page);
    await create.createClient(
      dataCreateClient[2].name,
      dataCreateClient[2].company,
      dataCreateClient[2].address,
      dataCreateClient[2].city,
      dataCreateClient[2].abn
    );
    const search = new SearchClient(page);
    await search.search(dataCreateClient[2].name);
    const deleteItem = new DeleteClient(page);
    await deleteItem.deleteRandomElement();
  });
});
