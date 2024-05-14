import test, { Page, expect } from '@playwright/test';
import { LoginPage } from '../../../src/page/Login/login';
import * as dataSetDefault from '../../../utils/data/factory/default-factory.json';
import * as data from '../../../utils/data/factory/test-tender.json';
import dotenv from 'dotenv';
import { SetDefaultConfigItem } from '../../../src/page/Factory/default-config-item/set-default';
import { PowerSettings } from '../../../src/page/Factory/default-config-item/power-settings';
import { ClickTender } from '../../../src/page/Tender/create-tender/add-tender';
import { FillToInputText } from '../../../src/page/Tender/create-tender/fill-general-information';
import { FilterTender } from '../../../src/page/Tender/action/filter';
import { DeleteTender } from '../../../src/page/Tender/action/delete-tender';
import {
  avg_feed_power_locator,
  avg_loop_power_locator,
  power_locator,
} from '../../../src/locator/factory-locator/set-default';
import { getValueInput, randomValueInOption } from '../../../src/base/get-value';
dotenv.config();
test.skip('FAC05: Power Default', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD),
    );
    await page.waitForTimeout(2000);
    const defaultTab = new SetDefaultConfigItem(page);
    await defaultTab.setDefault();
  });
  test('Save Default', async ({ page }) => {
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
    dataSetDefault[2].average_loop_lenght_in_M,
  );
  await createTender(page);
  await fillAllTender(page);
  await checkExsist(
    page,
    dataSetDefault[2].average_feed_lenght_in_M,
    dataSetDefault[2].average_loop_lenght_in_M,
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
export async function checkExsist(page: any, feed: any, loop: any) {
  await page.locator(power_locator).click();
  const inputFeedValue = await getValueInput(page, avg_feed_power_locator);
  expect(feed).toBe(inputFeedValue);
  const inputLoopValue = await getValueInput(page, avg_loop_power_locator);
  expect(loop).toBe(inputLoopValue);
}
