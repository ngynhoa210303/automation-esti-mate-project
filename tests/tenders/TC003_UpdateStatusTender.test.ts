import { test } from "@playwright/test";
import { LoginPage } from "../../page/login";
import * as data from "../../utils/data/logindata.cred.json";
import * as status from "../../utils/data/data-test-action.cred.json";
import { LoginPage } from "../../src/page/login/login/login";
import { ClickTender } from "../../src/page/tender/create-tender/add-tender";
import { StatusLocator } from "../../src/page/tender/update-tender/update-status";

test.describe("TC003: Update status tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Update status", async ({ page }) => {
    const createNewTender = new CreateNewTender(page);
    await createNewTender.clickTender();
    await delay(2000);
    const update = new StatusLocator(page);
    await update.selectFirstProduct(status.status);
    await delay(3000);
  });
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
