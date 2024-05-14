import { expect, test } from '@playwright/test';
import * as dataUpdateInfor from '../../utils/data/my-organization/organization/organization.json';
import { LoginPage } from '../../src/page/Login/login';
import {
  OrganizationInformation,
  randomIndexCountry,
} from '../../src/page/My-Organization/organization/update-information';
import dotenv from 'dotenv';
import {
  address_line1_text_locator,
  address_line2_text_locator,
  email_text_locator,
  name_organization_locator,
  phone_text_locator,
  city_text_locator,
  zip_code_locator,
  abn_locator,
  country_select_locator,
} from '../../src/locator/my-organization-locator/organization/information-organization';
dotenv.config();
test.skip('TC026: Update information of organization', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD),
    );
    await page.waitForTimeout(3000);
  });
  test('Update information of organization', async ({ page }) => {
    await test.step('Update information of organization', async () => {
      const organizationInformation = new OrganizationInformation(page);
      const country = await randomIndexCountry(
        organizationInformation.countryRandom,
      );
      await organizationInformation.uploadInformation(
        dataUpdateInfor.name,
        dataUpdateInfor.email,
        dataUpdateInfor.phone,
        dataUpdateInfor.address_line_1,
        dataUpdateInfor.address_line_2,
        dataUpdateInfor.city,
        country,
        dataUpdateInfor.zip_code,
        dataUpdateInfor.abn,
      );
      await page.reload();
      await test.step('Check input name', async () => {
        const nameCheck = await getValueInput(page, name_organization_locator);
        expect(nameCheck).toBe(dataUpdateInfor.name);
      });
      await test.step('Check input email', async () => {
        const emailCheck = await getValueInput(page, email_text_locator);
        expect(emailCheck).toBe(dataUpdateInfor.email);
      });
      await test.step('Check input phone', async () => {
        const phoneCheck = await getValueInput(page, phone_text_locator);
        expect(phoneCheck).toBe(dataUpdateInfor.phone);
      });
      await test.step('Check input address line 1', async () => {
        const addLine1Check = await getValueInput(
          page,
          address_line1_text_locator,
        );
        expect(addLine1Check).toBe(dataUpdateInfor.address_line_1);
      });
      await test.step('Check input address line 2', async () => {
        const addLine2Check = await getValueInput(
          page,
          address_line2_text_locator,
        );
        expect(addLine2Check).toBe(dataUpdateInfor.address_line_2);
      });
      await test.step('Check input city', async () => {
        const cityCheck = await getValueInput(page, city_text_locator);
        expect(cityCheck).toBe(dataUpdateInfor.city);
      });
      await test.step('Check input country', async () => {
        const isOptionSelected = await checkSelectedOption(
          page,
          country_select_locator,
          country,
        );
        expect(isOptionSelected).toBe(true);
      });

      await test.step('Check input zipcode', async () => {
        const zipCodeCheck = await getValueInput(page, zip_code_locator);
        expect(zipCodeCheck).toBe(dataUpdateInfor.zip_code);
      });
      await test.step('Check input abn', async () => {
        const abnCheck = await getValueInput(page, abn_locator);
        expect(abnCheck).toBe(dataUpdateInfor.abn);
      });
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
export async function checkSelectedOption(
  page: any,
  selectLocator: any,
  expectedValue: string,
) {
  // Lấy danh sách tất cả các tùy chọn trong ô select
  const selectElement = await page.$(selectLocator);
  const options = await selectElement.$$eval('option', (options: any[]) =>
    options.map((option) => ({
      value: option.value,
      selected: option.selected,
    })),
  );
  // Duyệt qua từng tùy chọn và kiểm tra
  let selectedOptionValue = null;
  for (const option of options) {
    if (option.selected) {
      selectedOptionValue = option.value;
      break;
    }
  }
  // So sánh giá trị của tùy chọn đã chọn với giá trị mong đợi
  if (selectedOptionValue === expectedValue) {
    return true;
  } else {
    return false;
  }
}
