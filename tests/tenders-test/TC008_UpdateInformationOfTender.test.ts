import test from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { DetailTender } from "../../src/page/Tender/update-tender/detail-and-update-tender";
import { FillToInputText } from "../../src/page/Tender/create-tender/fill-general-information";
import * as dataGenenral from "../../utils/data/tender/update-tenders.cred.json";

test.describe("TC008: Update tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await delay(6000);
  });
  test("Update tender", async ({ page }) => {
    const detail = new DetailTender(page);
    await detail.findTitle();
    await page.waitForTimeout(6000);
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
  });
  test.afterEach(async ({ page }) => {
    const save = new ClickTender(page);
    await save.save();
    await page.reload();
    await page.waitForTimeout(5000);
  });
  async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
});
