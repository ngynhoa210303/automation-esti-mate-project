import test from "@playwright/test";
import * as data from "../../../../utils/data/login/logindata.cred.json";
import { ClickTender } from "../../../../src/page/Tender/create-tender/add-tender";
import { LoginPage } from "../../../../src/page/Login/login";
import { SelectItem } from "../../../../src/page/Tender/section/add-quantity-for-item/preliminaries-and-general/select-item-to-add";
test.describe("TC015: Select Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await delay(2000);
  });
  test("Select Item", async ({ page }) => {
    const selectItem = new SelectItem(page);
    await selectItem.chooseItem();
    await delay(2000);
  });
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
