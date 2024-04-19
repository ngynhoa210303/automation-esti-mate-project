import { test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import * as status from "../../utils/data/tender/data-test-action.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { MakeCopyTender } from "../../src/page/Tender/action/make-a-copy";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC005: Make a copy tender", () => {
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
  test("Make a copy tender", async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await page.waitForTimeout(2000);
    const deleteElement = new MakeCopyTender(page);
    await deleteElement.makeACopyElementOfPagination(status.pagination);
  });
});
