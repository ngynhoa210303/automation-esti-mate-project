import { Page, test } from "@playwright/test";
import * as dataGenenral from "../../utils/data/tender/general-information-data.cred.json";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { FillToInputText } from "../../src/page/Tender/create-tender/fill-general-information";
import { LoginPage } from "../../src/page/Login/login";
import { FilterTender } from "../../src/page/Tender/action/filter";
import { DeleteTender } from "../../src/page/Tender/action/delete-tender";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC002: Fill all create Tender", () => {
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
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await page.waitForTimeout(2000);
  });
  test("Fill all input text", async ({ page }) => {
    await fillAll(page);
  });
  test.afterEach(async ({ page }) => {
    const save = new ClickTender(page);
    await save.save();
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    const searchOnly = new FilterTender(page);
    await searchOnly.searchOnly(dataGenenral[0].title);
    const deleteElement = new DeleteTender(page);
    await deleteElement.deleteRandomElement();
  });
});

export async function fillAll(page: Page) {
  const newInput = new FillToInputText(page);
  await newInput.fillInput(
    dataGenenral[0].title,
    dataGenenral[0].city,
    dataGenenral[0].take_off,
    dataGenenral[0].quote_by,
    dataGenenral[0].contact_name,
    dataGenenral[0].description,
    dataGenenral[0].notes,
    dataGenenral[0].reference_no,
    dataGenenral[0].tags
  );
}
