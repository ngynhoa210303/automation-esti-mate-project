import { Page, expect, test } from '@playwright/test';
import * as dataGenenral from '../../utils/data/tender/general-information-data.cred.json';
import { ClickTender } from '../../src/page/Tender/create-tender/add-tender';
import {
  FillToInputText,
} from '../../src/page/Tender/create-tender/fill-general-information';
import { LoginPage } from '../../src/page/Login/login';
import { FilterTender } from '../../src/page/Tender/action/filter';
import { DeleteTender } from '../../src/page/Tender/action/delete-tender';
import dotenv from 'dotenv';
import {
  builder_status_locator,
  city_locator,
  contact_name_locator,
  createdatePicker_locator,
  description_locator,
  dueDatePicker_locator,
  note_locator,
  quote_by_locator,
  reference_no_locator,
  take_off_locator,
  title_locator,
  your_status_locator,
} from '../../src/locator/tender-locator/create-tender-locator';
import { checkSelectedOption } from '../../src/page/Factory/edit-with-avaiable-item';
import { nodata_text_locator } from '../../src/locator/factory-locator/search-item-locator';
import { getValueInput, getValueTag, randomValueInOption } from '../../src/base/get-value';
dotenv.config();
test.skip('Create -> Search -> Delete Tender', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD),
    );
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await page.waitForTimeout(2000);
  });
  test('Action with tender', async ({ page }) => {
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
    await test.step('Edit information tender', async () => {
      await newInput.fillInput(
        dataGenenral[0].title,
        dataGenenral[0].city,
        dataGenenral[0].take_off,
        dataGenenral[0].quote_by,
        dataGenenral[0].contact_name,
        randomOption,
        statusOption,
        dataGenenral[0].description,
        dataGenenral[0].notes,
        dataGenenral[0].reference_no,
        dataGenenral[0].tags,
        year,
        month,
        day
      );
      const save = new ClickTender(page);
      await save.save();
      await page.reload();
      await page.waitForTimeout(5000);
    });
    await test.step('Check name input', async () => {
      const inputCheck = await getValueInput(page, title_locator);
      expect(inputCheck).toBe(dataGenenral[0].title);
    });
    await test.step('Check city input', async () => {
      const inputCheck = await getValueInput(page, city_locator);
      expect(inputCheck).toBe(dataGenenral[0].city);
    });
    await test.step('Check take off input', async () => {
      const inputCheck = await getValueInput(page, take_off_locator);
      expect(inputCheck).toBe(dataGenenral[0].take_off);
    });
    await test.step('Check contact input', async () => {
      const titleCheck = await getValueInput(page, contact_name_locator);
      expect(titleCheck).toBe(dataGenenral[0].contact_name);
    });
    await test.step('Check builder status select', async () => {
      const isOptionSelected = await checkSelectedOption(
        page,
        builder_status_locator,
        randomOption,
      );
      expect(isOptionSelected).toBe(true);
    });
    await test.step('Check your status select', async () => {
      const isOptionSelected = await checkSelectedOption(
        page,
        your_status_locator,
        statusOption,
      );
      expect(isOptionSelected).toBe(true);
    });
    await test.step('Check quote by input', async () => {
      const titleCheck = await getValueInput(page, quote_by_locator);
      expect(titleCheck).toBe(dataGenenral[0].quote_by);
    });
    await test.step('Check reference no input', async () => {
      const titleCheck = await getValueInput(page, reference_no_locator);
      expect(titleCheck).toBe(dataGenenral[0].reference_no);
    });
    await test.step('Check creation date input', async () => {
      const titleCheck = await getValueInput(page, createdatePicker_locator);
      expect(titleCheck).toBe(String(currentMonth + 1) + "/" + day + "/" + currentYear);
    });
    await test.step('Check due date input', async () => {
      const titleCheck = await getValueInput(page, dueDatePicker_locator);
      expect(titleCheck).toBe(String(currentMonth + 1) + "/" + day + "/" + currentYear);
    });
    await test.step('Check tag', async () => {
      const titleCheck = await getValueTag(page, "//div[@class='taginput control']//span[@class='tag']//span");
      expect(titleCheck).toStrictEqual(dataGenenral[0].tags);
    });
    await test.step('Check description input', async () => {
      const titleCheck = await getValueInput(page, description_locator);
      expect(titleCheck).toBe(dataGenenral[0].description);
    });
    await test.step('Check notes input', async () => {
      const titleCheck = await getValueInput(page, note_locator);
      expect(titleCheck).toBe(dataGenenral[0].notes);
    });

    await test.step('Clear data Tender', async () => {
      const createNewTender = new ClickTender(page);
      await createNewTender.clickTender();
      const filter = new FilterTender(page);
      await filter.filterAndSearch(statusOption, dataGenenral[0].title);
      const inputLoopValue = page.locator(nodata_text_locator);
      expect(!inputLoopValue.isVisible());
      const deleteElement = new DeleteTender(page);
      await deleteElement.deleteRandomElement();
      const nodata = page.locator(nodata_text_locator);
      expect(nodata.isVisible());
    })
  });
});
