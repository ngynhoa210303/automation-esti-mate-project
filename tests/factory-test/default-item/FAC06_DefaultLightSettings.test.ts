import test, { Page } from "@playwright/test";
import { LoginPage } from "../../../src/page/Login/login";
import * as dataSetDefault from "../../../utils/data/factory/default-factory.json";
import dotenv from "dotenv";
import { SetDefaultConfigItem } from "../../../src/page/Factory/default-config-item/set-default";
import { ClickTender } from "../../../src/page/Tender/create-tender/add-tender";
import { LightSettings } from "../../../src/page/Factory/default-config-item/light-settings";
import { FilterTender } from "../../../src/page/Tender/action/filter";
import { FillToInputText } from "../../../src/page/Tender/create-tender/fill-general-information";
import * as data from "../../../utils/data/factory/test-tender.json";
import { DeleteTender } from "../../../src/page/Tender/action/delete-tender";
dotenv.config();
test.describe("FAC04: Light setting default", () => {
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
  test("Light setting default", async ({ page }) => {
    await lightSetting(page);
  });
  test.afterEach(async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    const searchOnly = new FilterTender(page);
    await searchOnly.searchOnly(data[1].title);
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

export async function lightSetting(page: Page) {
  const lightSetting = new LightSettings(page);
  await lightSetting.fillTextLight(
    dataSetDefault[3].average_feed_lenght_in_M,
    dataSetDefault[3].average_loop_lenght_in_M
  );
  await createTender(page);
  await fillAllTender(page);
  await lightSetting.checkExsist(
    dataSetDefault[3].average_feed_lenght_in_M,
    dataSetDefault[3].average_loop_lenght_in_M
  );
}
export async function fillAllTender(page: Page) {
  const newInput = new FillToInputText(page);
  await newInput.fillInput(
    data[1].title,
    data[1].city,
    data[1].take_off,
    data[1].quote_by,
    data[1].contact_name,
    data[1].description,
    data[1].notes,
    data[1].reference_no,
    data[1].tags
  );
}
