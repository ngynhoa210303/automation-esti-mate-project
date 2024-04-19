import { test } from "@playwright/test";
import * as dataSearch from "../../utils/data/tender/data-test-action.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { FilterTender } from "../../src/page/Tender/action/filter";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC006: Search tender", () => {
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
  });
  test("Search tender", async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await page.waitForTimeout(2000);
    const filter = new FilterTender(page);
    await filter.search(dataSearch.search, page);
    await page.waitForTimeout(3000);
  });
});