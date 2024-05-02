import test, { expect } from "@playwright/test";
import * as dataSection from "../../utils/data/factory/add-item-in-factory.json";
import { LoginPage } from "../../src/page/Login/login";
import { CreateItemOnFactoryTab } from "../../src/page/Factory/create-item-on-factory";
import { SearchItemOfFactory } from "../../src/page/Factory/search-item";
import { DeleteItemOfFactory } from "../../src/page/Factory/delete-item";
import dotenv from "dotenv";
import { nodata_text_locator } from "../../src/locator/factory-locator/search-item-locator";
dotenv.config();
test.describe("FAC01: Create Item --> Search item --> Delete Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(2000);
  });
  test("Action Item of Factory", async ({ page }) => {
    const createItem = new CreateItemOnFactoryTab(page);
    await createItem.fillToInformation(
      dataSection.name,
      dataSection.material_rate,
      dataSection.part_no,
      dataSection.labour_unit_rate_hour,
      dataSection.labour_unit_rate_mins
    );
    await page.waitForTimeout(3000);
    const search = new SearchItemOfFactory(page);
    await search.search(dataSection.name);
    const deleteItem = new DeleteItemOfFactory(page);
    await deleteItem.delete();
    const inputLoopValue = page.locator(nodata_text_locator);
    expect(inputLoopValue.isVisible());
  });
});
