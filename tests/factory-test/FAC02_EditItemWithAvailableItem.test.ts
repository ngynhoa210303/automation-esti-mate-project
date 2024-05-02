import { test } from "@playwright/test";
import * as dataEditFactory from "../../utils/data/factory/edit-factory-data.json";
import { LoginPage } from "../../src/page/Login/login";
import { EditItemOfFactory } from "../../src/page/Factory/edit-with-avaiable-item";
import dotenv from "dotenv";
dotenv.config();
test.describe("FAC02: Edit Item With Available Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(2000);
  });
  test("Edit Item With Available Item", async ({ page }) => {
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
export async function getValueInput(page: any, locator: any) {
  const inputElement = await page.$(locator);
  if (inputElement) {
    const inputValue = await inputElement.evaluate(
      (input: { value: any }) => input.value
    );
    return inputValue;
  }
}
