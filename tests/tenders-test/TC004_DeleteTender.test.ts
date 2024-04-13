import { Page, test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { DeleteTender } from "../../src/page/Tender/action/delete-tender";

test.describe("TC004: Delete tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
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
