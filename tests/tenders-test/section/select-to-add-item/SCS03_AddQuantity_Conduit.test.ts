import test, { Page, expect } from "@playwright/test";
import * as data from "../../../../utils/data/login/logindata.cred.json";
import * as dataGenenral from "../../../../utils/data/tender/general-information-data.cred.json";
import { ClickTender } from "../../../../src/page/Tender/create-tender/add-tender";
import { LoginPage } from "../../../../src/page/Login/login";
import { FillToInputText } from "../../../../src/page/Tender/create-tender/fill-general-information";
import { FilterTender } from "../../../../src/page/Tender/action/filter";
import { DeleteTender } from "../../../../src/page/Tender/action/delete-tender";
import { LocatorConduitsTab } from "../../../../src/page/Tender/section/add-quantity-for-item/conduits/locator-conduits";
import { checkCompareTotalSumConduits } from "../../../../src/locator/section-locator/conduits/fill-quantity-and-check-locator";
import { SelectItemConduits } from "../../../../src/page/Tender/section/add-quantity-for-item/conduits/add-quantity";
import { randomValueInOption } from "../../../../src/base/get-value";
test.skip("SCS03: Add Quantity item of Conduit", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    await page.waitForTimeout(2000);
  });
  test("Add quantity", async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await fillAll(page);
    const newLocator = new LocatorConduitsTab(page);
    await newLocator.locatorConduitsTab();
    await checkisVisible(page);
  });
  test.afterEach(async ({ page }) => {
    const save = new ClickTender(page);
    await save.save();
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    const searchOnly = new FilterTender(page);
    await searchOnly.searchOnly(dataGenenral[2].title);
    const deleteElement = new DeleteTender(page);
    await deleteElement.deleteRandomElement();
  });
});
export async function checkisVisible(page: Page) {
  let totalSum = 0;
  const selectItem = new SelectItemConduits(page);
  for (let i = 1; i <= 3; i++) {
    totalSum = await selectItem.chooseItem(i, totalSum);
    await page.waitForTimeout(2000);
  }
  const total =
    "$" + totalSum.toLocaleString("en-US", { minimumFractionDigits: 2 });
  const isVisible = await page
    .locator(checkCompareTotalSumConduits + `[contains(text(),'${total}')])[1]`)
    .isVisible();
  expect(isVisible).toBe(true);
}
export async function fillAll(page: Page) {
  const createNewTender = new ClickTender(page);
  const newInput = new FillToInputText(page);
  await createNewTender.clickTender();
  await createNewTender.clickCreate();
  await page.waitForTimeout(2000);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear()
  const currentMonth = (currentDate.getMonth() + 1)
  const year = { value: (currentYear.toString()) };
  const month = { value: (currentMonth.toString()) };
  const day = currentDate.getDate().toString();
  const randomOption = await randomValueInOption(
    newInput.builder_status_locator,
  );
  const statusOption = await randomValueInOption(
    newInput.your_status_locator,
  );
  await newInput.fillInput(
    dataGenenral[2].title,
    dataGenenral[2].city,
    dataGenenral[2].take_off,
    dataGenenral[2].quote_by,
    dataGenenral[2].contact_name,
    randomOption,
    statusOption,
    dataGenenral[2].description,
    dataGenenral[2].notes,
    dataGenenral[2].reference_no,
    dataGenenral[2].tags,
    year,
    month,
    day
  );
}
