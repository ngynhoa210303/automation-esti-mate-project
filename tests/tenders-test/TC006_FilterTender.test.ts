import { test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import * as dataSearch from "../../utils/data/tender/data-test-action.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { FilterTender } from "../../src/page/Tender/action/filter";
test.describe("TC006: Search tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Search tender", async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await page.waitForTimeout(2000);
    const filter = new FilterTender(page);
    await filter.search(dataSearch.search);
    await page.waitForTimeout(3000);
  });
});
