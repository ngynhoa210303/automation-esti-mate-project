import test from "@playwright/test";
import * as dataSection from "../../utils/data/factory/add-item-in-factory.json";
import { LoginPage } from "../../src/page/Login/login";
import { CreateItemOnFactoryTab } from "../../src/page/Factory/create-item-on-factory";
import { SearchItemOfFactory } from "../../src/page/Factory/search-item";
import { DeleteItemOfFactory } from "../../src/page/Factory/delete-item";
import dotenv from "dotenv";
dotenv.config();
test.describe("FAC01: Create Item --> Search item --> Delete Item", () => {
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
  });
});
