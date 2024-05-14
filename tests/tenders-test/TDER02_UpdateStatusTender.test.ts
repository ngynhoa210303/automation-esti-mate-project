import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import * as dataGenenral from '../../utils/data/tender/general-information-data.cred.json';

import dotenv from "dotenv";
import { FillToInputText } from "../../src/page/Tender/create-tender/fill-general-information";
import { FilterTender } from "../../src/page/Tender/action/filter";
import { nodata_text_locator } from "../../src/locator/factory-locator/search-item-locator";
import { StatusLocator } from "../../src/page/Tender/update-tender/update-status";
import { checkSelectedOption } from "../../src/page/Factory/edit-with-avaiable-item";
import { randomValueInOption } from "../../src/base/get-value";
dotenv.config();
test.skip("TC003: Update status tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
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
      await test.step('Search element after create', async () => {
        const createNewTender = new ClickTender(page);
        await createNewTender.clickTender();
        const filter = new FilterTender(page);
        await filter.filterAndSearch(statusOption, dataGenenral[0].title);
        const inputLoopValue = page.locator(nodata_text_locator);
        expect(!inputLoopValue.isVisible());
      });
    });
    await test.step('Update status', async () => {
      await page.waitForTimeout(2000);
      const update = new StatusLocator(page);
      const randomCBB = Math.floor(Math.random() * update.sttOptions.length);
      const randomOption = update.sttOptions[randomCBB];
      await update.selectFirstProduct(randomOption);
      const isOptionSelected = await checkSelectedOption(
        page,
        "(//tr//td//span//select)[1]",
        randomOption,
      );
      expect(isOptionSelected).toBe(true);
    });
  });
});
