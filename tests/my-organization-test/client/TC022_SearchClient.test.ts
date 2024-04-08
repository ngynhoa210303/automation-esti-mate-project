import { test } from "@playwright/test";
import * as data from "../../../utils/data/login/logindata.cred.json";
import { LoginPage } from "../../../src/page/Login/login";
import { LocatorToClient } from "../../../src/page/My-Organization/client/locator-to-client";
import { SearchClient } from "../../../src/page/My-Organization/client/search-client";
test.describe("TC021: Fill all create Tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    await delay(3000);
  });
  test("Create Client", async ({ page }) => {
    const locator = new LocatorToClient(page);
    await locator.locatorToClient();
    const search = new SearchClient(page);
    await search.search("Mr.Wick");
  });
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
