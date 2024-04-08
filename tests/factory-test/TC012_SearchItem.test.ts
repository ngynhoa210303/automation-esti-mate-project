import { test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import * as dataSearch from "../../utils/data/factory/factory-data.json";
import { LoginPage } from "../../src/page/Login/login";
import { SearchItemOfFactory } from "../../src/page/Factory/search-item";
test.describe("TC012: Search item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Search item", async ({ page }) => {
    delay(2000);
    const search = new SearchItemOfFactory(page);
    await search.search(dataSearch.search);
  });
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
