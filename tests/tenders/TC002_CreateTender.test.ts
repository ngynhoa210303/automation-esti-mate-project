import { LoginPage } from "../../page/login";
import { FillToInputText } from "../../page/create-tender/fill-to-input";

import { Page, test } from "@playwright/test";
import * as data from "../../utils/data/logindata.cred.json";
import * as dataGenenral from "../../utils/data/general-information-data.cred.json";
import { CreateNewTender } from "../../page/create-tender/add-tender";
import { AllDatePicker } from "../../page/create-tender/fill-to-datePicker";
import { SelectBox } from "../../page/create-tender/fill-to-select";
import { FillTag } from "../../page/create-tender/fill-to-tag";
test.describe("TC002 Fill all create Tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    const createNewTender = new CreateNewTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    await delay(2000);
  });
  test("Fill all input text", async ({ page }) => {
    await fillAllInputText(page);
    await fillAllInputDatePicker(page);
    await fillAllSelectBox(page);
    await fillTag(page);
  });
  test.afterEach(async ({ page }) => {
    const save = new CreateNewTender(page);
    await save.save();
  });
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function fillAllInputDatePicker(page: Page) {
  const newDueDatePicker = new AllDatePicker(
    page,
    dataGenenral.creation_date_year,
    dataGenenral.creation_date_month,
    dataGenenral.due_date_year,
    dataGenenral.due_date_month
  );
  await newDueDatePicker.chooseDate(dataGenenral.creation_date_day);
  await newDueDatePicker.chooseDateDue(dataGenenral.due_date_day);
}
export async function fillAllInputText(page: Page) {
  const newInput = new FillToInputText(page);
  await newInput.fillFieldByText(page, "Title", dataGenenral.title);
  await newInput.fillFieldByText(page, "City", dataGenenral.city);
  await newInput.fillFieldByText(page, "Take off", dataGenenral.take_off);
  await newInput.fillFieldByText(page, "Quote by", dataGenenral.quote_by);
  await newInput.fillFieldByText(
    page,
    "Contact name",
    dataGenenral.contact_name
  );
  await newInput.fillFieldByText(page, "Description", dataGenenral.description);

  await newInput.fillFieldByText(page, "Notes", dataGenenral.notes);
  await newInput.fillFieldByText(
    page,
    "Reference no.",
    dataGenenral.reference_no
  );
}
export async function fillAllSelectBox(page: Page) {
  const selectBox = new SelectBox(page);
  await selectBox.checkSelectOptions(
    dataGenenral.builder_status,
    dataGenenral.your_status
  );
}
export async function fillTag(page: Page) {
  const tag = new FillTag(page);
  await tag.checkFillTag(dataGenenral.tags);
}
