import test from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import * as dataSection from "../../utils/data/factory/add-item-in-factory.json";
import { LoginPage } from "../../src/page/Login/login";
import { CreateItemOnFactoryTab } from "../../src/page/Factory/create-item-on-factory";
import { SearchItemOfFactory } from "../../src/page/Factory/search-item";
import { DeleteItemOfFactory } from "../../src/page/Factory/delete-item";

test.describe("TC014: Create Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    await delay(2000);
  });
  test("Create Item", async ({ page }) => {
    const createItem = new CreateItemOnFactoryTab(page);
    await createItem.fillToInformation(
      dataSection.name,
      dataSection.material_rate,
      dataSection.part_no,
      dataSection.labour_unit_rate_hour,
      dataSection.labour_unit_rate_mins
    );
    await delay(3000);
    const search = new SearchItemOfFactory(page);
    await search.search(dataSection.name);
    const deleteItem = new DeleteItemOfFactory(page);
    await deleteItem.delete();
  });
});

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
