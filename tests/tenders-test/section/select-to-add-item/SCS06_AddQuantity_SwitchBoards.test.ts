import test, { Page, expect } from "@playwright/test";
import * as dataSection from "../../../../utils/data/section/create-item-data.cred.json";
import * as dataGenenral from "../../../../utils/data/tender/general-information-data.cred.json";
import { LoginPage } from "../../../../src/page/Login/login";
import { ClickTender } from "../../../../src/page/Tender/create-tender/add-tender";
import { CreateItem } from "../../../../src/page/Tender/section/add-item-section/create-item";
import { SearchItemOfFactory } from "../../../../src/page/Factory/search-item";
import { DeleteItemOfFactory } from "../../../../src/page/Factory/delete-item";
import { SelectItemSwitchBoards } from "../../../../src/page/Tender/section/add-quantity-for-item/switchboards/add-quantity-switchboards";
import { FillToInputText } from "../../../../src/page/Tender/create-tender/fill-general-information";
import { FilterTender } from "../../../../src/page/Tender/action/filter";
import { DeleteTender } from "../../../../src/page/Tender/action/delete-tender";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC031: Create Item", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const EMAIL = process.env.EMAIL;
    const PASSWORD = process.env.PASSWORD;
    if (!EMAIL || !PASSWORD) {
      throw new Error(
        "Email and/or Password environment variables are not defined."
      );
    }
    await loginPage.login(EMAIL, PASSWORD);
    await page.waitForTimeout(3000);
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await fillAll(page);
    await page.waitForTimeout(2000);
  });
  test("Create Item", async ({ page }) => {
    const createItem = new CreateItem(page, dataSection.name, 7);
    await createItem.fillToInformation(
      dataSection.name,
      dataSection.material_rate,
      dataSection.part_no,
      dataSection.labour_unit_rate_hour,
      dataSection.labour_unit_rate_mins
    );
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
  const selectItem = new SelectItemSwitchBoards(page);
  for (let i = 1; i <= 1; i++) {
    totalSum = await selectItem.chooseItem(i, totalSum);
    await page.waitForTimeout(2000);
  }
  const total =
    "$" + totalSum.toLocaleString("en-US", { minimumFractionDigits: 2 });
  const isVisible = await page
    .locator(
      "//span[contains(text(),'Switchboards')]//following-sibling::span//span[contains(text(),'" +
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
