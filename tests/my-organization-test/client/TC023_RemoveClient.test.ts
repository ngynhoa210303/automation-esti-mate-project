import { Page, test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import * as dataSearch from "../../utils/data/factory/factory-data.json";
import { LoginPage } from "../../src/page/Login/login";
import { SearchItemOfFactory } from "../../src/page/Factory/search-item";
import { DeleteItemOfFactory } from "../../src/page/Factory/delete-item";

test.describe("TC023: Remove client", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Delete item", async ({ page }) => {
    delay(2000);
    const search = new SearchItemOfFactory(page);
    await search.search(dataSearch.search);
    const deleteItem = new DeleteItemOfFactory(page);
    await deleteItem.delete();
  });
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
