import test, { Page, expect } from "@playwright/test";
import * as data from "../../../../utils/data/login/logindata.cred.json";
import * as dataGenenral from "../../../../utils/data/tender/general-information-data.cred.json";
import { ClickTender } from "../../../../src/page/Tender/create-tender/add-tender";
import { LoginPage } from "../../../../src/page/Login/login";
import { FillToInputText } from "../../../../src/page/Tender/create-tender/fill-general-information";
import { FilterTender } from "../../../../src/page/Tender/action/filter";
import { DeleteTender } from "../../../../src/page/Tender/action/delete-tender";
import { SelectItemInspectionsAndCompliance } from "../../../../src/page/Tender/section/add-quantity-for-item/inspections-and-compliance/add-quantity";
import { LocatorPre } from "../../../../src/page/Tender/section/add-quantity-for-item/inspections-and-compliance/locator-inspection-and-compliance";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC030: Select Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(3000);
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await fillAll(page);
    await page.waitForTimeout(2000);
  });
  test("Select Item", async ({ page }) => {
    const newLocator = new LocatorPre(page);
    await newLocator.locatorPreTab();
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
  const selectItem = new SelectItemInspectionsAndCompliance(page);
  for (let i = 1; i <= 3; i++) {
    totalSum = await selectItem.chooseItem(i, totalSum);
    await page.waitForTimeout(2000);
  }
  const total =
    "$" + totalSum.toLocaleString("en-US", { minimumFractionDigits: 2 });
  const isVisible = await page
    .locator(
      "//span[contains(text(),'Inspections and Compliance')]//following-sibling::span//span[contains(text(),'" +
        total +
        "')]"
    )
    .isVisible();
  expect(isVisible).toBe(true);
}
export async function fillAll(page: Page) {
  const newInput = new FillToInputText(page);
  await newInput.fillInput(
    dataGenenral[2].title,
    dataGenenral[2].city,
    dataGenenral[2].take_off,
    dataGenenral[2].quote_by,
    dataGenenral[2].contact_name,
    dataGenenral[2].description,
    dataGenenral[2].notes,
    dataGenenral[2].reference_no,
    dataGenenral[2].tags
  );
}
