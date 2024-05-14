import test, { Page, expect } from "@playwright/test";
import { LoginPage } from "../../../src/page/Login/login";
import * as dataSetDefault from "../../../utils/data/factory/default-factory.json";
import dotenv from "dotenv";
import { SetDefaultConfigItem } from "../../../src/page/Factory/default-config-item/set-default";
import { ClickTender } from "../../../src/page/Tender/create-tender/add-tender";
import { FilterTender } from "../../../src/page/Tender/action/filter";
import { FillToInputText } from "../../../src/page/Tender/create-tender/fill-general-information";
import * as data from "../../../utils/data/factory/test-tender.json";
import { DeleteTender } from "../../../src/page/Tender/action/delete-tender";
import {
  markup_on_light_fittings_locator,
  markup_on_subcontractors_locator,
  material_markup_locator,
  sundries_locator,
  temp_light_and_power_locator,
  view_summary_button_locator,
} from "../../../src/locator/factory-locator/set-default";
import { MakupRate } from "../../../src/page/Factory/default-config-item/markup-rate";
import { getValueInput, randomValueInOption } from "../../../src/base/get-value";
dotenv.config();
test.skip("FAC08: Default Makup rates", () => {
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
  test("Default Makup rates", async ({ page }) => {
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
  await page.waitForTimeout(2000);
}

export async function makupRate(page: Page) {
  const fillTextPower = new MakupRate(page);
  await fillTextPower.fillTextMakupRate(
    dataSetDefault[4].material_mark_up,
    dataSetDefault[4].material_on_light_fittings,
    dataSetDefault[4].markup_on_subcontractors,
    dataSetDefault[4].temp_light_and_power,
    dataSetDefault[4].sundries,
    dataSetDefault[4].lost_time
  );
  await createTender(page);
  await fillAllTender(page);
  await checkExsist(
    page,
    dataSetDefault[4].material_mark_up,
    dataSetDefault[4].material_on_light_fittings,
    dataSetDefault[4].markup_on_subcontractors,
    dataSetDefault[4].temp_light_and_power,
    dataSetDefault[4].sundries,
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
  materialMarkup: any,
  markupOnLight: any,
  markupOnSubcontractors: any,
  tempLightAndPower: any,
  sundries: any,
) {
  await page.locator(view_summary_button_locator).click();
  const getValueMaterialMarkup = await getValueInput(
    page,
    material_markup_locator
  );
  expect(materialMarkup).toBe(getValueMaterialMarkup);
  const getValueMarkupOnLight = await getValueInput(
    page,
    markup_on_light_fittings_locator
  );
  expect(markupOnLight).toBe(getValueMarkupOnLight);
  const getValueMarkupOnSubcontractors = await getValueInput(
    page,
    markup_on_subcontractors_locator
  );
  expect(markupOnSubcontractors).toBe(getValueMarkupOnSubcontractors);
  const getValueTempLightAndPower = await getValueInput(
    page,
    temp_light_and_power_locator
  );
  expect(tempLightAndPower).toBe(getValueTempLightAndPower);
  const getValueSundries = await getValueInput(page, sundries_locator);
  expect(sundries).toBe(getValueSundries);
}
