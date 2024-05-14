import { expect, test } from '@playwright/test';
import * as dataEditFactory from '../../utils/data/factory/edit-factory-data.json';
import { LoginPage } from '../../src/page/Login/login';
import {
  EditItemOfFactory,
  checkSelectedOption,
} from '../../src/page/Factory/edit-with-avaiable-item';
import dotenv from 'dotenv';
import { SearchItemOfFactory } from '../../src/page/Factory/search-item';
import {
  hours_locator,
  material_text_locator,
  mins_locator,
  name_text_locator,
  save_button_locator,
  section_locator,
  uom_text_locator,
} from '../../src/locator/factory-locator/edit-item';
dotenv.config();
test.skip('FAC02: Edit Item With Available Item', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD),
    );
    await page.waitForTimeout(2000);
  });
  test('Edit Item With Available Item', async ({ page }) => {
    const editItem = new EditItemOfFactory(page);
    await editItem.locatorFactory();
    const randomOption = await randomIndexSection(editItem.section_locator);
    await test.step('Check edit item avaiable', async () => {
      await editItem.edit(
        randomOption,
        dataEditFactory.uom,
        dataEditFactory.name,
        dataEditFactory.material_rate,
        dataEditFactory.part_no,
        dataEditFactory.hours,
        dataEditFactory.mins,
      );
      await page.locator(save_button_locator).click();
      await page.reload();
    });
    await test.step('Search Item after create', async () => {
      const search = new SearchItemOfFactory(page);
      await search.search(dataEditFactory.name);
      // const countTenderDoc = await page.$$('tbody > tr');
      // const count = countTenderDoc.length; // Sử dụng .length để đếm số lượng phần tử
      // expect(count).toBeGreaterThanOrEqual(1);
    });
    await editItem.editClick();
    await test.step('Check input uom', async () => {
      const uomCheck = await getValueInput(page, uom_text_locator);
      expect(uomCheck).toBe(dataEditFactory.uom);
    });
    await test.step('Check input name', async () => {
      const nameCheck = await getValueInput(page, name_text_locator);
      expect(nameCheck).toBe(dataEditFactory.name);
    });
    await test.step('Check input material rate', async () => {
      const materialTest = await getValueInput(page, material_text_locator);
      expect(materialTest).toBe(dataEditFactory.material_rate);
    });
    await test.step('Check input part no', async () => {
      const nameCheck = await getValueInput(page, name_text_locator);
      expect(nameCheck).toBe(dataEditFactory.name);
    });
    await test.step('Check input section', async () => {
      const isOptionSelected = await checkSelectedOption(
        page,
        section_locator,
        randomOption,
      );
      expect(isOptionSelected).toBe(true);
    });
    await test.step('Check input hours', async () => {
      const hoursValue = await getValueInput(page, hours_locator);
      expect(dataEditFactory.hours).toBe(hoursValue);
    });
    await test.step('Check input mins', async () => {
      const minsValue = await getValueInput(page, mins_locator);
      expect(dataEditFactory.mins).toBe(minsValue);
    });
  });
});
export async function getValueInput(page: any, locator: any) {
  const inputElement = await page.$(locator);
  if (inputElement) {
    const inputValue = await inputElement.evaluate(
      (input: { value: any }) => input.value,
    );
    return inputValue;
  }
}
export async function randomIndexSection(element: any) {
  const options = await element.evaluate(() => {
    const options = Array.from(document.querySelectorAll('option'));
    return options.map((option) => option.value);
  });
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
