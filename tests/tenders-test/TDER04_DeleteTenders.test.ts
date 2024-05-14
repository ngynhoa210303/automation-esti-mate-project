import { test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { DeleteTender } from "../../src/page/Tender/action/delete-tender";
import dotenv from "dotenv";
dotenv.config();
test.skip("TC004: Delete tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
  });
  test("Delete tender", async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await page.waitForTimeout(2000);
    for (let i = 0; i <= 9; i++) {
      const deleteElement = new DeleteTender(page);
      await deleteElement.deleteRandomElement();
    }
  });
});
