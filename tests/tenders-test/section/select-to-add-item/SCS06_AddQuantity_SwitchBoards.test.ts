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
import { randomValueInOption } from "../../../../src/base/get-value";
dotenv.config();
test.skip("TC031: Create Item", () => {
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
    const createItem = new CreateItem(page, dataSection[7].name, 7);
    await createItem.fillToInformation(
      dataSection[7].name,
      dataSection[7].material_rate,
      dataSection[7].part_no,
      dataSection[7].labour_unit_rate_hour,
      dataSection[7].labour_unit_rate_mins,
    );
    await checkisVisible(page);
    const search = new SearchItemOfFactory(page);
    await search.search(dataSection[7].name);
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
