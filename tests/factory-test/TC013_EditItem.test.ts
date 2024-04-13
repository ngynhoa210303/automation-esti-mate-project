import { test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import * as dataEditFactory from "../../utils/data/factory/edit-factory-data.json";
import { LoginPage } from "../../src/page/Login/login";
import { EditItemOfFactory } from "../../src/page/Factory/edit-item";
test.describe("TC013: Edit item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
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
