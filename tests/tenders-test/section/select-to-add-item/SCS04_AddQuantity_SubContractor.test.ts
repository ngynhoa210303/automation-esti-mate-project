import test, { Page, expect } from "@playwright/test";
import * as dataSection from "../../../../utils/data/section/create-item-data.cred.json";
import * as dataGenenral from "../../../../utils/data/tender/general-information-data.cred.json";
import { LoginPage } from "../../../../src/page/Login/login";
import { ClickTender } from "../../../../src/page/Tender/create-tender/add-tender";
import { CreateItem } from "../../../../src/page/Tender/section/add-item-section/create-item";
import { SearchItemOfFactory } from "../../../../src/page/Factory/search-item";
import { DeleteItemOfFactory } from "../../../../src/page/Factory/delete-item";
import { FillToInputText } from "../../../../src/page/Tender/create-tender/fill-general-information";
import { FilterTender } from "../../../../src/page/Tender/action/filter";
import { DeleteTender } from "../../../../src/page/Tender/action/delete-tender";
import { SelectItemSubContractors } from "../../../../src/page/Tender/section/add-quantity-for-item/sub-contractors/add-quantity-sub-contractor";
import dotenv from "dotenv";
import { LocatorCommunicationTab } from "../../../../src/page/Tender/section/add-quantity-for-item/consumer-mains-and-submains/locator-consumer-mains-and-submains";
dotenv.config();
test.describe("TC032: Create Item", () => {
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
  test("Create Item", async ({ page }) => {
    const locatorSub = new LocatorCommunicationTab(page);
    await locatorSub.locatorCommunicationTab();
    await createItemP1(page);
    await createItemP2(page);
    await checkisVisible(page);
    const search = new SearchItemOfFactory(page);
    await search.search(dataSection.name);
    const deleteItem = new DeleteItemOfFactory(page);
    await deleteItem.delete();
  });

  test.afterEach(async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    const searchOnly = new FilterTender(page);
    await searchOnly.searchOnly(dataGenenral[2].title);
    await page.waitForTimeout(2000);
    const deleteElement = new DeleteTender(page);
    await deleteElement.deleteRandomElement();
  });
});
export async function checkisVisible(page: Page) {
  let totalSum = 0;
  const selectItem = new SelectItemSubContractors(page);
  for (let i = 1; i <= 2; i++) {
    totalSum = await selectItem.chooseItem(i, totalSum);
    await page.waitForTimeout(2000);
  }
  const total =
    "$" + totalSum.toLocaleString("en-US", { minimumFractionDigits: 2 });
  const isVisible = await page
    .locator(
      "//span[contains(text(),'Sub-contractors')]//following-sibling::span//span[contains(text(),'" +
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
export async function createItemP1(page: Page) {
  const createItem = new CreateItem(page, dataSection.name, 14);
  await createItem.fillToInformation(
    dataSection.name,
    dataSection.material_rate,
    dataSection.part_no,
    dataSection.labour_unit_rate_hour,
    dataSection.labour_unit_rate_mins
  );
}
export async function createItemP2(page: Page) {
  const createItem = new CreateItem(page, "TEST2", 14);
  await createItem.fillToInformation(
    "TEST2",
    dataSection.material_rate,
    dataSection.part_no,
    dataSection.labour_unit_rate_hour,
    dataSection.labour_unit_rate_mins
  );
}
