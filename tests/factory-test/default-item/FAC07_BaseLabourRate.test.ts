import test, { Page, expect } from "@playwright/test";
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
import { BaseLabourRate } from "../../../src/page/Factory/default-config-item/base-labour-rate";
import {
  apprirentice_cost_locator,
  qualified_electricians_cost_locator,
  view_summary_button_locator,
} from "../../../src/locator/factory-locator/set-default";
import { getValueInput, randomValueInOption } from "../../../src/base/get-value";
dotenv.config();
test.skip("FAC07: Base Labour Rate", () => {
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
  test(" Base Labour Rate", async ({ page }) => {
    await makupRate(page);
  });
  test.afterEach(async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    const searchOnly = new FilterTender(page);
    await searchOnly.searchOnly(data[3].title);
    const deleteElement = new DeleteTender(page);
    await deleteElement.deleteRandomElement();
  });
});
export async function createTender(page: Page) {
  const createNewTender = new ClickTender(page);
  await createNewTender.clickTender();
  await createNewTender.clickCreate();
  await page.waitForTimeout(3000);
}

export async function makupRate(page: Page) {
  const fillTextPower = new BaseLabourRate(page);
  await fillTextPower.fillTextBase(
    dataSetDefault[0].average_quanlitified,
    dataSetDefault[0].average_apprentice
  );
  await createTender(page);
  await fillAllTender(page);
  await checkExsist(
    page,
    dataSetDefault[0].average_quanlitified,
    dataSetDefault[0].average_apprentice
  );
}
export async function fillAllTender(page: Page) {
  const newInput = new FillToInputText(page);
  const randomOption = await randomValueInOption(
    newInput.builder_status_locator,
  );
  const statusOption = await randomValueInOption(
    newInput.your_status_locator,
  );
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear()
  const currentMonth = (currentDate.getMonth() + 1)
  const year = { value: (currentYear.toString()) };
  const month = { value: (currentMonth.toString()) };
  const day = currentDate.getDate().toString();

  await newInput.fillInput(
    data[3].title,
    data[3].city,
    data[3].take_off,
    data[3].quote_by,
    data[3].contact_name,
    randomOption,
    statusOption,
    data[3].description,
    data[3].notes,
    data[3].reference_no,
    data[3].tags,
    year,
    month,
    day
  );
}
export async function checkExsist(
  page: any,
  quantified: any,
  apprirentice: any
) {
  await page.locator(view_summary_button_locator).click();
  const getValue = await getValueInput(
    page,
    qualified_electricians_cost_locator
  );
  expect(quantified).toBe(getValue);
  const getValueApprirentice = await getValueInput(
    page,
    apprirentice_cost_locator
  );
  expect(apprirentice).toBe(getValueApprirentice);
}
