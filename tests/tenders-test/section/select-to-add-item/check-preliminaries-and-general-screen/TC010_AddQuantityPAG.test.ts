import test, { Page, expect } from "@playwright/test";
import * as data from "../../../../../utils/data/login/logindata.cred.json";
import * as dataGenenral from "../../../../../utils/data/tender/general-information-data.cred.json";
import { ClickTender } from "../../../../../src/page/Tender/create-tender/add-tender";
import { LoginPage } from "../../../../../src/page/Login/login";
import { SelectItem } from "../../../../../src/page/Tender/section/add-quantity-for-item/preliminaries-and-general/add-quantity";
import { LocatorPreliminaries } from "../../../../../src/page/Tender/section/add-quantity-for-item/preliminaries-and-general/locator-preliminaries";
import { checkCompareTotalSum } from "../../../../../src/locator/section-locator/preliminaries-and-general/fill-quantity-and-check-locator";
import { FillToInputText } from "../../../../../src/page/Tender/create-tender/fill-general-information";
import { FilterTender } from "../../../../../src/page/Tender/action/filter";
import { DeleteTender } from "../../../../../src/page/Tender/action/delete-tender";
test.describe("TC010: Select Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await fillAll(page);
    await page.waitForTimeout(2000);
  });
  test("Select Item", async ({ page }) => {
    const newLocator = new LocatorPreliminaries(page);
    await newLocator.locatorPreliminariesTab();
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
  const selectItem = new SelectItem(page);
  for (let i = 1; i <= 3; i++) {
    totalSum = await selectItem.chooseItem(i, totalSum);
    await page.waitForTimeout(2000);
  }
  const total =
    "$" + totalSum.toLocaleString("en-US", { minimumFractionDigits: 2 });
  const isVisible = await page
    .locator(checkCompareTotalSum + `[contains(text(),'${total}')]`)
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
