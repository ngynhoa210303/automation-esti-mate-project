import { test } from "@playwright/test";
import * as dataEditFactory from "../../utils/data/factory/edit-factory-data.json";
import { LoginPage } from "../../src/page/Login/login";
import { EditItemOfFactory } from "../../src/page/Factory/edit-with-avaiable-item";
import * as dataSection from "../../utils/data/factory/add-item-in-factory.json";
import dotenv from "dotenv";
import { CreateItemOnFactoryTab } from "../../src/page/Factory/create-item-on-factory";
import { SearchItemOfFactory } from "../../src/page/Factory/search-item";
import { EditWithNewItemOfFactory } from "../../src/page/Factory/edit-with-new-item";
dotenv.config();
test.describe("TC013: Edit item", () => {
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
    await page.waitForTimeout(2000);
  });
  test("Edit item", async ({ page }) => {
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
    const editItem = new EditWithNewItemOfFactory(page);
    await editItem.edit(
      dataEditFactory.uom,
      dataEditFactory.material_rate,
      dataEditFactory.part_no,
      dataEditFactory.hours,
      dataEditFactory.mins
    );
  });
});
