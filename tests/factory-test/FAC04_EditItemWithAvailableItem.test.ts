import { test } from "@playwright/test";
import * as dataEditFactory from "../../utils/data/factory/edit-factory-data.json";
import { LoginPage } from "../../src/page/Login/login";
import { EditItemOfFactory } from "../../src/page/Factory/edit-with-avaiable-item";
import dotenv from "dotenv";
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
    const editItem = new EditItemOfFactory(page);
    await editItem.edit(
      dataEditFactory.uom,
      dataEditFactory.name,
      dataEditFactory.material_rate,
      dataEditFactory.part_no,
      dataEditFactory.hours,
      dataEditFactory.mins
    );
  });
});
