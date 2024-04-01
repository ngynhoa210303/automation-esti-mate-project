import test from "@playwright/test";
import * as data from "../../../../utils/data/login/logindata.cred.json";
import * as dataSection from "../../../../utils/data/section/create-item-data.cred.json";
import { ClickTender } from "../../../../src/page/Tender/create-tender/add-tender";
import { LoginPage } from "../../../../src/page/Login/login";
import { CreateItem } from "../../../../src/page/Tender/section/exclude-derived-item-section/create-item";
import { SearchItemOfFactory } from "../../../../src/page/Factory/search-item";
import { DeleteItemOfFactory } from "../../../../src/page/Factory/delete-item";
test.describe("TC009: Create Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await delay(2000);
  });
  test("Create Item", async ({ page }) => {
    for (let i = 0; i <= 7; i++) {
      const createItem = new CreateItem(page, i);
      await createItem.fillToInformation(
        dataSection.name,
        dataSection.material_rate,
        dataSection.part_no,
        dataSection.labour_unit_rate_hour,
        dataSection.labour_unit_rate_mins
      );
    }
    delay(5000);
    for (let i = 0; i <= 7; i++) {
      const search = new SearchItemOfFactory(page);
      await search.search(dataSection.name);
      const deleteItem = new DeleteItemOfFactory(page);
      await deleteItem.delete();
    }
  });
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
