import test from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { SortTender } from "../../src/page/Tender/action/sort-tender-list";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC007: Sort tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const EMAIL = process.env.EMAIL;
    const PASSWORD = process.env.PASSWORD;
    await loginPage.login(String(EMAIL), String(PASSWORD));
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await page.waitForTimeout(2000);
  });
  test("Sort tender", async ({ page }) => {
    const sortTender = new SortTender(page);
    await sortTender.sort();
  });
});
