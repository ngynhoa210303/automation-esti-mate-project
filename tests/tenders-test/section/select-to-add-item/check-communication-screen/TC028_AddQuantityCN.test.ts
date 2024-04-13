import test, { Page, expect } from "@playwright/test";
import * as data from "../../../../../utils/data/login/logindata.cred.json";
import * as dataGenenral from "../../../../../utils/data/tender/general-information-data.cred.json";
import { ClickTender } from "../../../../../src/page/Tender/create-tender/add-tender";
import { LoginPage } from "../../../../../src/page/Login/login";
import {
  checkCompareTotalSum,
  checkCompareTotalSumCMAS,
} from "../../../../../src/locator/section-locator/preliminaries-and-general/fill-quantity-and-check-locator";
import { FillToInputText } from "../../../../../src/page/Tender/create-tender/fill-general-information";
import { FilterTender } from "../../../../../src/page/Tender/action/filter";
import { DeleteTender } from "../../../../../src/page/Tender/action/delete-tender";
import { LocatorCommunicationTab } from "../../../../../src/page/Tender/section/add-quantity-for-item/consumer-mains-and-submains/locator-consumer-mains-and-ubmains";
import { SelectItemCMAS } from "../../../../../src/page/Tender/section/add-quantity-for-item/consumer-mains-and-submains/add-quantity";
// import { LocatorCommunicationTab } from "../../../../../src/page/Tender/section/add-quantity-for-item/communication&nbn/locator-communication&nbn";
test.describe("TC028: Add quantity ", () => {
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
    const newLocator = new LocatorCommunicationTab(page);
    await newLocator.locatorCommunicationTab();
    await checkisVisible(page);
  });
  test.afterEach(async ({ page }) => {
    const save = new ClickTender(page);
    await save.save();
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    const searchOnly = new FilterTender(page);
    await searchOnly.searchOnly(dataGenenral.title);
    const deleteElement = new DeleteTender(page);
    await deleteElement.deleteRandomElement();
  });
});
export async function checkisVisible(page: Page) {
  let totalSum = 0;
  const selectItem = new SelectItemCMAS(page);
  for (let i = 1; i <= 3; i++) {
    totalSum = await selectItem.chooseItem(i, totalSum);
    await page.waitForTimeout(2000);
  }
  const total =
    "$" + totalSum.toLocaleString("en-US", { minimumFractionDigits: 2 });
  const isVisible = await page
    .locator(checkCompareTotalSumCMAS + `[contains(text(),'${total}')])[1]`)
    .isVisible();
  expect(isVisible).toBe(true);
}
export async function fillAll(page: Page) {
  const newInput = new FillToInputText(page);
  await newInput.fillInput(
    dataGenenral.title,
    dataGenenral.city,
    dataGenenral.take_off,
    dataGenenral.quote_by,
    dataGenenral.contact_name,
    dataGenenral.description,
    dataGenenral.notes,
    dataGenenral.reference_no,
    dataGenenral.tags
  );
}
