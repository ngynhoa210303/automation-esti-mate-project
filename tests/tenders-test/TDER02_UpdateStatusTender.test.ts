import { test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { StatusLocator } from "../../src/page/Tender/update-tender/update-status";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC003: Update status tender", () => {
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
  test("Update status", async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await page.waitForTimeout(2000);
    const update = new StatusLocator(page);
    await update.selectFirstProduct();
  });
});
