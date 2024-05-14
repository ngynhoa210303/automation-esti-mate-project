import test, { expect } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import * as dataEditFactory from "../../utils/data/factory/edit-factory-data.json";
import * as dataSection from "../../utils/data/factory/add-item-in-factory.json";
import { CreateItemOnFactoryTab } from "../../src/page/Factory/create-item-on-factory";
import { SearchItemOfFactory } from "../../src/page/Factory/search-item";
import { DeleteItemOfFactory } from "../../src/page/Factory/delete-item";
import dotenv from "dotenv";
import {
  hours_locator,
  material_text_locator,
  mins_locator,
  part_no_locator,
  uom_text_locator,
} from "../../src/locator/factory-locator/edit-item";
import { nodata_text_locator } from "../../src/locator/factory-locator/search-item-locator";
import { EditWithNewItemOfFactory } from "../../src/page/Factory/edit-with-new-item";
import { getValueInput } from "../../src/base/get-value";
dotenv.config();
test.skip("FAC01: Create Item --> Edit item--> Search item --> Delete Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(2000);
  });
  test("Action Item of Factory", async ({ page }) => {
    await test.step("Create Item", async () => {
      const createItem = new CreateItemOnFactoryTab(page);
      await createItem.fillToInformation(
        dataSection.name,
        dataSection.material_rate,
        dataSection.part_no,
        dataSection.labour_unit_rate_hour,
        dataSection.labour_unit_rate_mins
      );
      await page.waitForTimeout(3000);
    })
    await test.step("Search Item after create", async () => {
      const search = new SearchItemOfFactory(page);
      await search.search(dataSection.name);
    })
    await test.step("Check edit item", async () => {
      const editItem = new EditWithNewItemOfFactory(page);
      await editItem.edit(
        dataEditFactory.uom,
        dataEditFactory.material_rate,
        dataEditFactory.part_no,
        dataEditFactory.hours,
        dataEditFactory.mins
      );
      await editItem.check();
      const uomValue = await getValueInput(page, uom_text_locator);
      expect(dataEditFactory.uom).toBe(uomValue);
      const materialValue = await getValueInput(page, material_text_locator);
      expect(dataEditFactory.material_rate).toBe(materialValue);
      const partNoValue = await getValueInput(page, part_no_locator);
      expect(dataEditFactory.part_no).toBe(partNoValue);
      const hoursValue = await getValueInput(page, hours_locator);
      expect(dataEditFactory.hours).toBe(hoursValue);
      const minsValue = await getValueInput(page, mins_locator);
      expect(dataEditFactory.mins).toBe(minsValue);
      await editItem.saveData();
    });
    await test.step("Delete Item after create", async () => {
      const deleteItem = new DeleteItemOfFactory(page);
      await deleteItem.delete();
      const inputLoopValue = page.locator(nodata_text_locator);
      expect(inputLoopValue.isVisible());
    })
  });
});

