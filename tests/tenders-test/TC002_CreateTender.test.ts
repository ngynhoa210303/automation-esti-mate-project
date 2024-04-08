import { Page, test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import * as dataGenenral from "../../utils/data/tender/general-information-data.cred.json";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { FillToInputText } from "../../src/page/Tender/create-tender/fill-general-information";
import { LoginPage } from "../../src/page/Login/login";
test.describe("TC002: Fill all create Tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await delay(2000);
  });
  test("Fill all input text", async ({ page }) => {
    await fillAll(page);
  });
  test.afterEach(async ({ page }) => {
    const save = new ClickTender(page);
    await save.save();
  });
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
