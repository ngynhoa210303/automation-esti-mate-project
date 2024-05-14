import test, { Page, expect } from "@playwright/test";
import { LoginPage } from "../../../src/page/Login/login";
import * as data from "../../../utils/data/factory/test-tender.json";
import dotenv from "dotenv";
import { SetDefaultConfigItem } from "../../../src/page/Factory/default-config-item/set-default";
import { ClickTender } from "../../../src/page/Tender/create-tender/add-tender";
import { FillToInputText } from "../../../src/page/Tender/create-tender/fill-general-information";
import { FilterTender } from "../../../src/page/Tender/action/filter";
import { DeleteTender } from "../../../src/page/Tender/action/delete-tender";
import { LabourSellRate } from "../../../src/page/Factory/default-config-item/labour-sell-rate";
import {
  labour_sell_rate_locator,
  labour_sell_rate_text_locator,
} from "../../../src/locator/factory-locator/set-default";
import { checkDisableInput, randomValueInOption } from "../../../src/base/get-value";
dotenv.config();
test.skip("FAC06: Labour sell rates", () => {
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
  test("Labour sell rates", async ({ page }) => {
    await labourSetting(page);
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

export async function labourSetting(page: Page) {
  const inputDisable = await checkDisableInput(page, labour_sell_rate_locator);
  await createTender(page);
  await fillAllTender(page);
  await checkExsist(page, inputDisable);
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
    data[0].title,
    data[0].city,
    data[0].take_off,
    data[0].quote_by,
    data[0].contact_name,
    randomOption,
    statusOption,
    data[0].description,
    data[0].notes,
    data[0].reference_no,
    data[0].tags,
    year,
    month,
    day
  );
}

export async function checkExsist(page: any, inputDisable: any) {
  const defaultValue = new LabourSellRate(page);
  await defaultValue.clickViewSummary();
  const inputElement = await page.$(labour_sell_rate_text_locator);
  if (inputElement) {
    const inputDisableLabourValue = await inputElement.evaluate(
      (input: { value: any }) => input.value
    );
    expect(inputDisable).toBe(inputDisableLabourValue);
  }
}
