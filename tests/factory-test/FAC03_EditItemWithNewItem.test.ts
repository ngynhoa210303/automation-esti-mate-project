import { expect, test } from "@playwright/test";
import * as dataEditFactory from "../../utils/data/factory/edit-factory-data.json";
import { LoginPage } from "../../src/page/Login/login";
import * as dataSection from "../../utils/data/factory/add-item-in-factory.json";
import dotenv from "dotenv";
import { CreateItemOnFactoryTab } from "../../src/page/Factory/create-item-on-factory";
import { SearchItemOfFactory } from "../../src/page/Factory/search-item";
import { EditWithNewItemOfFactory } from "../../src/page/Factory/edit-with-new-item";
import {
  hours_locator,
  material_text_locator,
  mins_locator,
  part_no_locator,
  uom_text_locator,
} from "../../src/locator/factory-locator/edit-item";
dotenv.config();
test.describe("FAC03: Edit Item With New Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(2000);
  });
  test("Edit Item With New Item", async ({ page }) => {
    await test.step("Create item", async () => {
      const createItem = new CreateItemOnFactoryTab(page);
      await createItem.fillToInformation(
        dataSection.name,
        dataSection.material_rate,
        dataSection.part_no,
        dataSection.labour_unit_rate_hour,
        dataSection.labour_unit_rate_mins
      );
      await page.waitForTimeout(3000);
    });
    await test.step("Search item", async () => {
      const search = new SearchItemOfFactory(page);
      await search.search(dataSection.name);
    });
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
    await test.step("Check detail item", async () => {
      const editItem = new EditWithNewItemOfFactory(page);
      await editItem.check();
      const uomValue = await getValueInput(page, uom_text_locator);
      const materialValue = await getValueInput(page, material_text_locator);
      const partNoValue = await getValueInput(page, part_no_locator);
      const hoursValue = await getValueInput(page, hours_locator);
      const minsValue = await getValueInput(page, mins_locator);

      await editItem.saveData();
      // console.log(uomValue);
      // console.log(materialValue);
      // console.log(partNoValue);
      // console.log(hoursValue);
      // console.log(minsValue);
      const uom = await page
        .locator(
          `//td[@data-label='UOM']//span[contains(text(),'${uomValue}')]`
        )
        .isVisible();
      expect(uom).toBe(true);
      console.log("day la " + partNoValue);
      const material = await page
        .locator(
          `//td[@data-label='Material rate']//span[contains(text(),'$${materialValue}.00')]`
        )
        .isVisible();

      expect(material).toBe(true);
      console.log(partNoValue);
      const partNo = await page
        .locator(
          `//td[@data-label='Part no.']//span[contains(text(),'${partNoValue}')]`
        )
        .isVisible();
      console.log(partNo);
      expect(partNo).toBe(true);
      const hourmins = await page
        .locator(`//p[normalize-space()='${hoursValue}h ${minsValue}m']`)
        .isVisible();
      expect(hourmins).toBe(true);
    });
  });
});
export async function getValueInput(page: any, locator: any) {
  const inputElement = await page.$(locator);
  if (inputElement) {
    const inputValue = await inputElement.evaluate(
      (input: { value: any }) => input.value
    );
    return inputValue;
  }
}
