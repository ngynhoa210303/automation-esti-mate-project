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
import { nodata_text_locator } from '../../src/locator/factory-locator/search-item-locator';
import { InformationInListTender } from '../../src/page/Tender/update-tender/compare-information-with-list-tender';
import { checkSelectedOption } from '../../src/page/Factory/edit-with-avaiable-item';
import { getValueTag, randomValueInOption } from '../../src/base/get-value';
dotenv.config();
test.skip('Check information after create Tender', () => {
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
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = (currentDate.getMonth() + 1).toString();
    const year = { value: currentYear };
    const month = { value: currentMonth };
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
    });
    await test.step('Search by name Tender', async () => {
      const createNewTender = new ClickTender(page);
      await createNewTender.clickTender();
      const filter = new FilterTender(page);
      await filter.filterAndSearch(statusOption, dataGenenral[0].title);
      const inputLoopValue = page.locator(nodata_text_locator);
      expect(!inputLoopValue.isVisible());
      await page.waitForTimeout(2000);
    });
    await test.step('Check information job name in list Tender', async () => {
      const findTitle = new InformationInListTender(page);
      const findName = await findTitle.findTitle(dataGenenral[0].title);
      expect(findName).toBe(dataGenenral[0].title)
    });
    await test.step('Check information take-off in list Tender', async () => {
      const findTakeOff = new InformationInListTender(page);
      const find = await findTakeOff.findTakeOff(dataGenenral[0].take_off);
      expect(find).toBe(dataGenenral[0].take_off)
    });
    await test.step('Check information contact in list Tender', async () => {
      const findContact = new InformationInListTender(page);
      const find = await findContact.findContact(dataGenenral[0].contact_name);
      expect(find).toBe(dataGenenral[0].contact_name)
    });
    await test.step('Check information buider stt in list Tender', async () => {
      const findContact = new InformationInListTender(page);
      const find = await findContact.findBuiderStatus();
      expect(find).toBe(randomOption)
    });
    await test.step('Check tag', async () => {
      const titleCheck = await getValueTag(page, "//tr[1]//td[11]//span[@class='tag']//span");
      expect(titleCheck).toStrictEqual(dataGenenral[0].tags);
    });
    await test.step('Check information tender contact in list Tender', async () => {
      const findContact = new InformationInListTender(page);
      const find = await findContact.findBuiderStatus();
      expect(find).toBe(randomOption)
    });
    await page.waitForTimeout(3000)
    await test.step('Check information your stt in list Tender', async () => {
      const isOptionSelected = await checkSelectedOption(
        page,
        "(//tr//td//span//select)[1]",
        statusOption,
      );
      expect(isOptionSelected).toBe(true);
    });
    await test.step('Check information comment in list Tender', async () => {
      const findNotes = new InformationInListTender(page);
      const find = await findNotes.findComment(dataGenenral[0].notes)
      expect(find).toBe(dataGenenral[0].notes)
    });
    await test.step('Delete Tender', async () => {
      const deleteElement = new DeleteTender(page);
      await deleteElement.deleteRandomElement();
      const inputLoopValue = page.locator(nodata_text_locator);
      expect(inputLoopValue.isVisible());
    });
  });
});
