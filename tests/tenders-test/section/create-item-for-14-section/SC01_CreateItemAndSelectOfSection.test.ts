import test from "@playwright/test";
import * as data from "../../../../utils/data/login/logindata.cred.json";
import * as dataSection from "../../../../utils/data/section/create-item-data.cred.json";
import { LoginPage } from "../../../../src/page/Login/login";
import { CreateItem } from "../../../../src/page/Tender/section/add-item-section/create-item";
import { SearchItemOfFactory } from "../../../../src/page/Factory/search-item";
import { DeleteItemOfFactory } from "../../../../src/page/Factory/delete-item";
import { ClickTender } from "../../../../src/page/Tender/create-tender/add-tender";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC009: Create Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(3000);
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await page.waitForTimeout(2000);
  });
  test("Create Item", async ({ page }) => {
    for (let i = 0; i <= 15; i++) {
      if (i == 13) {
        const createItem = new CreateItem(page, dataSection.name_PAsys, i);
        await createItem.fillToInformation(
          dataSection.name_PAsys,
          dataSection.material_rate,
          dataSection.part_no,
          dataSection.labour_unit_rate_hour,
          dataSection.labour_unit_rate_mins
        );
        await createItem.selectClick(dataSection.name_PAsys);
        await createItem.hideClick();
      } else {
        const createItem = new CreateItem(page, dataSection.name, i);
        await createItem.fillToInformation(
          dataSection.name,
          dataSection.material_rate,
          dataSection.part_no,
          dataSection.labour_unit_rate_hour,
          dataSection.labour_unit_rate_mins
        );
        await createItem.selectClick(dataSection.name);
        await createItem.hideClick();
      }
    }
    for (let i = 0; i <= 14; i++) {
      const search = new SearchItemOfFactory(page);
      await search.search(dataSection.name);
      const deleteItem = new DeleteItemOfFactory(page);
      await deleteItem.delete();
    }
    const search = new SearchItemOfFactory(page);
    await search.search(dataSection.name_PAsys);
    const deleteItem = new DeleteItemOfFactory(page);
    await deleteItem.delete();
  });
});
