import { test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { DeleteTender } from "../../src/page/Tender/action/delete-tender";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC004: Delete tender", () => {
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
  test("Delete tender", async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await page.waitForTimeout(2000);
    // for (let i = 0; i <= 9; i++) {
    const deleteElement = new DeleteTender(page);
    await deleteElement.deleteRandomElement();
    // }
  });
});
