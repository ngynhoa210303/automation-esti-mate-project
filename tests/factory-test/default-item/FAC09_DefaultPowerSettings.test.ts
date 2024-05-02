import test, { Page } from "@playwright/test";
import { LoginPage } from "../../../src/page/Login/login";
import * as dataSetDefault from "../../../utils/data/factory/default-factory.json";
import * as data from "../../../utils/data/factory/test-tender.json";
import dotenv from "dotenv";
import { SetDefaultConfigItem } from "../../../src/page/Factory/default-config-item/set-default";
import { PowerSettings } from "../../../src/page/Factory/default-config-item/power-settings";
import { ClickTender } from "../../../src/page/Tender/create-tender/add-tender";
import { FillToInputText } from "../../../src/page/Tender/create-tender/fill-general-information";
import { FilterTender } from "../../../src/page/Tender/action/filter";
import { DeleteTender } from "../../../src/page/Tender/action/delete-tender";
dotenv.config();
test.describe("FAC05: Power Default", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(2000);
    const defaultTab = new SetDefaultConfigItem(page);
    await defaultTab.setDefault();
  });
  test("Save Default", async ({ page }) => {
    await powerSetting(page);
  });
  test.afterEach(async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    const searchOnly = new FilterTender(page);
    await searchOnly.searchOnly(data[0].title);
    const deleteElement = new DeleteTender(page);
    await deleteElement.deleteRandomElement();
  });
});
export async function createTender(page: Page) {
  const createNewTender = new ClickTender(page);
  await createNewTender.clickTender();
  await createNewTender.clickCreate();
  await page.waitForTimeout(2000);
}

export async function powerSetting(page: Page) {
  const powerSetting = new PowerSettings(page);
  await powerSetting.fillTextPower(
    dataSetDefault[2].average_feed_lenght_in_M,
    dataSetDefault[2].average_loop_lenght_in_M
  );
  await createTender(page);
  await fillAllTender(page);
  await powerSetting.checkExsist(
    dataSetDefault[2].average_feed_lenght_in_M,
    dataSetDefault[2].average_loop_lenght_in_M
  );
}

export async function fillAllTender(page: Page) {
  const newInput = new FillToInputText(page);
  await newInput.fillInput(
    data[0].title,
    data[0].city,
    data[0].take_off,
    data[0].quote_by,
    data[0].contact_name,
    data[0].description,
    data[0].notes,
    data[0].reference_no,
    data[0].tags
  );
}
