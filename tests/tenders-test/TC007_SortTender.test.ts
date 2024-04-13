import test from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { SortTender } from "../../src/page/Tender/action/sort-tender-list";
test.describe("TC007: Sort tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await page.waitForTimeout(2000);
  });
  test("Sort tender", async ({ page }) => {
    const sortTender = new SortTender(page);
    await sortTender.sort();
  });
});
