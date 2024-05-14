import { expect, test } from '@playwright/test';
import * as dataAddInfor from '../../utils/data/account/person.json';
import { LoginPage } from '../../src/page/Login/login';
import dotenv from 'dotenv';
import { Persontab } from '../../src/page/Account/person-tab';
import {
  address_line1_text_locator,
  address_line2_text_locator,
  city_text_locator,
  company_title_text_locator,
  phone_text_locator,
  your_name_text_locator,
  zip_code_locator,
} from '../../src/locator/account-locator/person-locator';
import { getValueInput } from '../../src/base/get-value';
dotenv.config();
test.skip('TC026: Update information of organization', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(3000);
  });
  test('Update information of account', async ({ page }) => {
    await test.step('Update information of account', async () => {
      const persontab = new Persontab(page);
      await persontab.addInformation(
        dataAddInfor.your_name,
        dataAddInfor.phone,
        dataAddInfor.address_line1,
        dataAddInfor.address_line2,
        dataAddInfor.city,
        dataAddInfor.company,
        dataAddInfor.zipCode
      );
      await page.reload();
    })
    await test.step('Check input name', async () => {
      const yourNameCheck = await getValueInput(page, your_name_text_locator);
      expect(yourNameCheck).toBe(dataAddInfor.your_name);
    })
    await test.step('Check input phone', async () => {
      const phoneCheck = await getValueInput(page, phone_text_locator);
      expect(phoneCheck).toBe(dataAddInfor.phone);
    })
    await test.step('Check address line 1', async () => {
      const address1Check = await getValueInput(page, address_line1_text_locator);
      expect(address1Check).toBe(dataAddInfor.address_line1);
    })
    await test.step('Check address line 2', async () => {
      const address2Check = await getValueInput(page, address_line2_text_locator);
      expect(address2Check).toBe(dataAddInfor.address_line2);
    })
    await test.step('Check input city', async () => {
      const cityCheck = await getValueInput(page, city_text_locator);
      expect(cityCheck).toBe(dataAddInfor.city);
    })
    await test.step('Check input company', async () => {
      const companyCheck = await getValueInput(page, company_title_text_locator);
      expect(companyCheck).toBe(dataAddInfor.company);
    })
    await test.step('Check input zipcode', async () => {
      const zipcodeCheck = await getValueInput(page, zip_code_locator);
      expect(zipcodeCheck).toBe(dataAddInfor.zipCode);
    })
  });
});
